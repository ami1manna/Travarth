import React, { useState, useEffect } from 'react';
import { ArrowRight, Calendar, MapPin, Clock, Shield, Leaf, RefreshCw, Filter, Plus, ChevronRight, Info } from 'lucide-react';
import axios from './../services/axios';
import LoadingScreen from '../components/LoadingScreen';
import { Link } from 'react-router-dom';

const CustomerDashboard = () => {
  const [travelPlans, setTravelPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('date'); // 'date', 'duration', 'ecoScore'
  const [viewMode, setViewMode] = useState('all'); // 'all', 'upcoming', 'past'

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get('/api/travelplans/get-all-travel-plans');
        setTravelPlans(response.data);
        // Add a small delay to ensure smooth transition
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        setError('Failed to fetch trips');
        setIsLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const addPlan = () => {
    // Navigate to the plan trip page
    window.location.href = '/create-trip';
  };
  
  const goToTripDetails = (tripId) => {
    // Navigate to the trip details page
    window.location.href = `/iterinary/${tripId}`;
  };

  // Calculate days until trip
  const calculateDaysUntil = (startDate) => {
    const today = new Date();
    const tripDate = new Date(startDate);
    const timeDiff = tripDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff > 0 ? daysDiff : 0;
  };

  // Filter travel plans based on viewMode
  const filterTravelPlans = (plans) => {
    const today = new Date();
    
    if (viewMode === 'upcoming') {
      return plans.filter(plan => new Date(plan.startDate) > today);
    } else if (viewMode === 'past') {
      return plans.filter(plan => new Date(plan.endDate) < today);
    }
    return plans;
  };

  // Sort travel plans based on selected criteria
  const sortedTravelPlans = [...travelPlans].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(a.startDate) - new Date(b.startDate);
    } else if (sortBy === 'duration') {
      const getDuration = (plan) => parseInt(plan.duration.split(' ')[0]);
      return getDuration(a) - getDuration(b);
    } else if (sortBy === 'ecoScore') {
      return b.ecoScore - a.ecoScore;
    }
    return 0;
  });

  // Get filtered plans
  const filteredPlans = filterTravelPlans(sortedTravelPlans);

  // Get upcoming trips
  const upcomingTrips = sortedTravelPlans.filter(
    plan => new Date(plan.startDate) > new Date()
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div className="pt-2 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (travelPlans.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-sm text-center border border-gray-100">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <MapPin className="w-10 h-10 text-green-500" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-3">No Travel Plans Found</h2>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">You don't have any travel plans yet. Create your first eco-friendly adventure to get started!</p>
        <button 
          onClick={addPlan}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-sm flex items-center mx-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Travel Plan
        </button>
      </div>
    );
  }

  return (
    <div className="pt-2 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Trips</h1>
            <p className="text-gray-600 mt-1">Manage and view your travel plans</p>
          </div>
          <Link
            to="/create-trip"
            className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center gap-2"
          >
            <span>Plan New Trip</span>
          </Link>
        </div>

        {upcomingTrips.length > 0 && (
          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
              {/* <h2 className="text-xl font-semibold text-gray-800">Next Adventure</h2> */}
             
            </div>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
              <div className="md:flex">
                <div className="md:w-1/3 h-56 md:h-auto overflow-hidden relative">
                  <img 
                    src={upcomingTrips[0].image || "https://flaxtongardens.com.au/wp-content/uploads/2017/04/btx-placeholder-04.jpg"} 
                    alt={upcomingTrips[0].destination} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="bg-green-600 text-white rounded-lg px-3 py-1 text-sm font-medium flex items-center shadow-sm">
                      <Leaf className="w-4 h-4 mr-1" />
                      Eco Score: {upcomingTrips[0].ecoScore}/10
                    </div>
                  </div>
                </div>
                <div className="p-6 md:w-2/3">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{upcomingTrips[0].title}</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5 mt-4">
                    <div className="flex items-center text-gray-700">
                      <MapPin className="w-5 h-5 mr-2 text-green-600" />
                      <span>{upcomingTrips[0].destination}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-700">
                      <Calendar className="w-5 h-5 mr-2 text-green-600" />
                      <span>{formatDate(upcomingTrips[0].startDate)} - {formatDate(upcomingTrips[0].endDate)}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-700">
                      <Clock className="w-5 h-5 mr-2 text-green-600" />
                      <span>{upcomingTrips[0].duration}</span>
                    </div>
                    
                    {upcomingTrips[0].emergencyContact && (
                      <div className="flex items-center text-gray-700">
                        <Shield className="w-5 h-5 mr-2 text-green-600" />
                        <span>{upcomingTrips[0].emergencyContact.name}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-6">
                    <div className="inline-flex items-center bg-green-50 px-4 py-2 rounded-full text-green-700 font-medium border border-green-100">
                      <Calendar className="w-4 h-4 mr-2" />
                      {calculateDaysUntil(upcomingTrips[0].startDate)} days until departure
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => goToTripDetails(upcomingTrips[0]._id)} 
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-sm flex items-center"
                  >
                    View Itinerary
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div className="flex items-center space-x-4">
                <h2 className="text-lg font-semibold text-gray-800">Travel Plans</h2>
                <div className="bg-green-50 text-green-700 text-sm px-3 py-1 rounded-full">
                  {filteredPlans.length} {filteredPlans.length === 1 ? 'trip' : 'trips'}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Filter className="w-4 h-4 text-gray-400" />
                  </div>
                  <select 
                    className="bg-white border border-gray-300 text-gray-700 rounded-lg pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-auto"
                    value={viewMode}
                    onChange={(e) => setViewMode(e.target.value)}
                  >
                    <option value="all">All Trips</option>
                    <option value="upcoming">Upcoming Trips</option>
                    <option value="past">Past Trips</option>
                  </select>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Filter className="w-4 h-4 text-gray-400" />
                  </div>
                  <select 
                    className="bg-white border border-gray-300 text-gray-700 rounded-lg pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-auto"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="date">Sort by Date</option>
                    <option value="duration">Sort by Duration</option>
                    <option value="ecoScore">Sort by Eco Score</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {filteredPlans.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center border border-gray-200">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <Info className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">No trips found</h3>
              <p className="text-gray-600 mb-4">Try changing your filter settings or create a new trip plan.</p>
              <button 
                onClick={addPlan}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center mx-auto"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create New Plan
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlans.map((plan) => (
                <Link
                  key={plan._id}
                  to={`/iterinary/${plan._id}`}
                  className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative">
                    <img
                      src={plan.image || "https://via.placeholder.com/400x225"}
                      alt={plan.title}
                      className="w-full h-48 object-cover"
                    />
                    {plan.ecoScore && (
                      <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                        <Leaf className="w-4 h-4" />
                        <span>Eco Score: {plan.ecoScore}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      {plan.title}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 text-green-500" />
                        <span>{plan.destination}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2 text-green-500" />
                        <span>{formatDate(plan.startDate)} - {formatDate(plan.endDate)}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2 text-green-500" />
                        <span>{plan.duration}</span>
                      </div>
                    </div>
                    {plan.emergencyContact && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center text-gray-600">
                          <Shield className="w-4 h-4 mr-2 text-green-500" />
                          <span className="text-sm">Emergency Contact: {plan.emergencyContact.name}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;