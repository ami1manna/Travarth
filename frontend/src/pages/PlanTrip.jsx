import { useState, useEffect, useRef } from "react"
import { format, differenceInDays } from "date-fns"
import { useNavigate } from "react-router-dom";
import axios from "./../services/axios";

// Replace Lucide icons with emoji representations
const ICONS = {
  CalendarIcon: "📅",
  MapPin: "📍",
  Check: "✓"
}

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?"

const LocationSearch = ({ value, onChange, onSelect, placeholder }) => {
  const [searchText, setSearchText] = useState(value || "")
  const [listPlace, setListPlace] = useState([])
  const [isProgrammaticUpdate, setIsProgrammaticUpdate] = useState(false)

  useEffect(() => {
    setSearchText(value || "")
  }, [value])

  const handleSearch = () => {
    if (searchText.trim().length < 2) return
    
    const params = {
      q: searchText,
      format: "json",
      addressdetails: 1,
      polygon_geojson: 0,
    }

    const queryString = new URLSearchParams(params).toString()
    
    fetch(`${NOMINATIM_BASE_URL}${queryString}`)
      .then((response) => response.json())
      .then((result) => {
        setListPlace(result)
      })
      .catch((err) => console.log("err: ", err))
  }

  useEffect(() => {
    if (isProgrammaticUpdate) {
      setIsProgrammaticUpdate(false)
      return
    }
    
    const timer = setTimeout(() => {
      if (searchText.trim().length >= 2) {
        handleSearch()
      }
    }, 500)
    
    return () => clearTimeout(timer)
  }, [searchText])

  return (
    <div className="flex flex-col w-full">
      <div className="mb-2">
        <input
          type="text"
          value={searchText}
          placeholder={placeholder}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          onChange={(event) => {
            const value = event.target.value
            setSearchText(value)
            onChange(value)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch()
            }
          }}
        />
      </div>
      {listPlace.length > 0 && (
        <div className="mb-4 max-h-64 overflow-y-auto bg-white z-20 relative border border-gray-200 rounded-md">
          <div className="py-2">
            {listPlace.map((item) => (
              <div key={item?.place_id}>
                <button
                  className="w-full px-4 py-2 hover:bg-gray-100 text-left flex items-center"
                  onClick={() => {
                    setIsProgrammaticUpdate(true)
                    onSelect(item)
                    setListPlace([])
                  }}
                >
                  <span className="mr-3">{ICONS.MapPin}</span>
                  <span className="text-gray-700">{item?.display_name}</span>
                </button>
                <div className="border-t border-gray-200 my-1" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Simple date picker component to replace shadcn Calendar
const SimpleDatePicker = ({ selectedDate, onSelect, minDate, disabled = false }) => {
  return (
    <input
      type="date"
      value={selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''}
      onChange={(e) => {
        if (e.target.value) {
          onSelect(new Date(e.target.value))
        }
      }}
      min={minDate ? format(minDate, 'yyyy-MM-dd') : undefined}
      className="w-full px-4 py-2 border border-gray-300 rounded-md"
      disabled={disabled}
    />
  )
}

export default function PlanTripPage() {
  const navigate = useNavigate();
  // Initial state setup with provided JSON data
  const initialData = {
    source: "Thane",
    destination: "Cst",
    departureDate: "2025-04-15",
    returnDate: "2025-04-17",
    travelers: 1,
    duration: 2,
    budgetMin: 0,
    budgetMax: 10000,
    mealPreferences: ["vegetarian"],
    arrivalTime: ""
  }

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [startDate, setStartDate] = useState(new Date(initialData.departureDate))
  const [endDate, setEndDate] = useState(new Date(initialData.returnDate))
  const [sourceLocation, setSourceLocation] = useState(null)
  const [destinationLocation, setDestinationLocation] = useState(null)
  const [meal, setMeal] = useState(initialData.mealPreferences[0] || "vegetarian")
  const [travelers, setTravelers] = useState(initialData.travelers.toString())
  const [source, setSource] = useState(initialData.source)
  const [destination, setDestination] = useState(initialData.destination)
  const [token, setToken] = useState("")
  const [redirectToLogin, setRedirectToLogin] = useState(false)

  const [minBudget, setMinBudget] = useState(initialData.budgetMin)
  const [maxBudget, setMaxBudget] = useState(initialData.budgetMax)
  const [budgetError, setBudgetError] = useState('')
  const [dragging, setDragging] = useState(null) // 'min', 'max', or null
  const sliderRef = useRef(null)

  // Calculate duration based on start and end dates
  const duration = startDate && endDate ? differenceInDays(endDate, startDate) + 1 : initialData.duration

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken")
    if (!storedToken) {
      setRedirectToLogin(true)
      return
    }
    setToken(storedToken)
  }, [])

  // If redirect to login is needed, perform navigation
  useEffect(() => {
    if (redirectToLogin) {
      navigate('/login');
    }
  }, [redirectToLogin, navigate]);

  const handleMinInputChange = (e) => {
    const value = Number(e.target.value)
    if (value >= 0 && value <= maxBudget) {
      setMinBudget(value)
      setBudgetError('')
    } else {
      setBudgetError('Minimum budget must be between ₹0 and the maximum budget')
    }
  }

  const handleMaxInputChange = (e) => {
    const value = Number(e.target.value)
    if (value >= minBudget && value <= 100000) {
      setMaxBudget(value)
      setBudgetError('')
    } else {
      setBudgetError('Maximum budget must be between the minimum budget and ₹1,00,000')
    }
  }

  const handleSliderClick = (e) => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect()
      const clickPosition = e.clientX - rect.left
      const sliderWidth = rect.width
      const clickPercentage = clickPosition / sliderWidth
      const clickValue = Math.round(0 + clickPercentage * (100000 - 0))
      
      // Determine whether to move min or max handle based on which is closer
      const distanceToMin = Math.abs(clickValue - minBudget)
      const distanceToMax = Math.abs(clickValue - maxBudget)
      
      if (distanceToMin <= distanceToMax) {
        if (clickValue <= maxBudget) {
          setMinBudget(clickValue)
        }
      } else {
        if (clickValue >= minBudget) {
          setMaxBudget(clickValue)
        }
      }
    }
  }

  const handleMouseDown = (handle) => {
    setDragging(handle)
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (dragging && sliderRef.current) {
        const rect = sliderRef.current.getBoundingClientRect()
        const sliderWidth = rect.width
        let movePosition = e.clientX - rect.left
        
        // Constrain to slider bounds
        movePosition = Math.max(0, Math.min(movePosition, sliderWidth))
        
        const movePercentage = movePosition / sliderWidth
        const moveValue = Math.round(0 + movePercentage * (100000 - 0))
        
        if (dragging === 'min' && moveValue <= maxBudget) {
          setMinBudget(moveValue)
        } else if (dragging === 'max' && moveValue >= minBudget) {
          setMaxBudget(moveValue)
        }
      }
    }
    
    const handleMouseUp = () => {
      setDragging(null)
    }
    
    if (dragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.addEventListener('touchmove', handleMouseMove)
      document.addEventListener('touchend', handleMouseUp)
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('touchmove', handleMouseMove)
      document.removeEventListener('touchend', handleMouseUp)
    }
  }, [dragging, minBudget, maxBudget])

  // Calculate percentages for styling
  const minPercentage = ((minBudget - 0) / (100000 - 0)) * 100
  const maxPercentage = ((maxBudget - 0) / (100000 - 0)) * 100

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!startDate || !endDate || !source || !destination) {
      setError("Please fill in all required fields")
      return
    }
    
    setIsLoading(true)
    setError(null)
    
    // Creating data to send directly
    const dataToSend = {
      source: source,
      destination: destination,
      departureDate: format(startDate, "yyyy-MM-dd"),
      returnDate: format(endDate, "yyyy-MM-dd"),
      travelers: parseInt(travelers),
      duration: duration,
      budgetMin: minBudget,
      budgetMax: maxBudget,
      mealPreferences: meal,
      arrivalTime: ""
    };
    
    console.log("Data to be submitted:", dataToSend);
    
    try {
      // Directly store the trip data without showing flight options
      const response = await axios.post("/api/travelplans/store", dataToSend);

      const result = response.data;
      console.log("Server Response:", result);
      
      if (result && result.data && result.data._id) {
        // Extract the ID from the response data
        const itineraryId = result.data._id;
        console.log("Itinerary ID:", itineraryId);
        // Navigate to the itinerary page with the ID
        navigate(`/iterinary/${itineraryId}`);
      } else {
        setError(result.message || "Failed to store trip details. Please try again.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error sending data:", error);
      setError("Network error. Please check your connection and try again.");
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-700 mb-4">Plan Your Trip</h1>
          <p className="text-gray-600">Fill in the details below to start planning your perfect getaway</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-100 border border-red-200">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">
                <span className="mr-1">{ICONS.MapPin}</span>
                Departure Location
              </label>
              <LocationSearch 
                value={source}
                onChange={(value) => setSource(value)}
                onSelect={(location) => {
                  const shortName = location.display_name.split(',')[0].trim();
                  setSource(shortName);
                  setSourceLocation(location);
                }}
                placeholder="Where are you departing from?"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                <span className="mr-1">{ICONS.MapPin}</span>
                Destination
              </label>
              <LocationSearch 
                value={destination}
                onChange={(value) => setDestination(value)}
                onSelect={(location) => {
                  const shortName = location.display_name.split(',')[0].trim();
                  setDestination(shortName);
                  setDestinationLocation(location);
                }}
                placeholder="Where do you want to go?"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">Start Date</label>
                <SimpleDatePicker
                  selectedDate={startDate}
                  onSelect={(date) => {
                    setStartDate(date)
                  }}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">End Date</label>
                <SimpleDatePicker
                  selectedDate={endDate}
                  onSelect={(date) => {
                    setEndDate(date)
                  }}
                  minDate={startDate}
                  disabled={!startDate}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Number of Travelers</label>
              <select
                value={travelers}
                onChange={(e) => setTravelers(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num.toString()}>
                    {num} {num === 1 ? "Traveler" : "Travelers"}
                  </option>
                ))}
                <option value="10+">10+ Travelers</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Meal Preference</label>
              <select
                value={meal}
                onChange={(e) => setMeal(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="vegetarian">Vegetarian</option>
                <option value="non-vegetarian">Non-Vegetarian</option>
                <option value="vegan">Vegan</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Budget Range (INR)</label>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-gray-600">Min</span>
                <input
                  type="number"
                  value={minBudget}
                  onChange={handleMinInputChange}
                  className="w-32 px-3 py-1 border border-gray-300 rounded-md"
                />
                <span className="px-2">-</span>
                <span className="text-gray-600">Max</span>
                <input
                  type="number"
                  value={maxBudget}
                  onChange={handleMaxInputChange}
                  className="w-32 px-3 py-1 border border-gray-300 rounded-md"
                />
              </div>
              
              <div className="px-1 py-6">
                <div 
                  ref={sliderRef}
                  className="relative h-1 bg-gray-200 rounded-full cursor-pointer"
                  onClick={handleSliderClick}
                >
                  {/* Colored range track */}
                  <div 
                    className="absolute h-1 bg-blue-500 rounded-full"
                    style={{
                      left: `${minPercentage}%`,
                      right: `${100 - maxPercentage}%`
                    }}
                  />
                  
                  {/* Min handle */}
                  <div 
                    className={`absolute top-0 w-4 h-4 bg-blue-500 border-2 border-white rounded-full shadow transform -translate-y-1.5 -translate-x-2 ${dragging === 'min' ? 'cursor-grabbing' : 'cursor-grab'}`}
                    style={{ left: `${minPercentage}%` }}
                    onMouseDown={() => handleMouseDown('min')}
                    onTouchStart={() => handleMouseDown('min')}
                  />
                  
                  {/* Max handle */}
                  <div 
                    className={`absolute top-0 w-4 h-4 bg-blue-500 border-2 border-white rounded-full shadow transform -translate-y-1.5 -translate-x-2 ${dragging === 'max' ? 'cursor-grabbing' : 'cursor-grab'}`}
                    style={{ left: `${maxPercentage}%` }}
                    onMouseDown={() => handleMouseDown('max')}
                    onTouchStart={() => handleMouseDown('max')}
                  />
                </div>
              </div>
              
              {budgetError && (
                <p className="text-red-500 text-sm mt-1">{budgetError}</p>
              )}
            </div>

            <div className="border-t pt-4">
              <p className="text-sm text-gray-600 mb-2">Trip Summary:</p>
              <ul className="text-sm text-gray-800">
                <li>From: {source} to {destination}</li>
                <li>Dates: {startDate ? format(startDate, "MMM d, yyyy") : ""} - {endDate ? format(endDate, "MMM d, yyyy") : ""}</li>
                <li>Duration: {duration} days</li>
                <li>Travelers: {travelers}</li>
                <li>Budget: ₹{minBudget.toLocaleString()} - ₹{maxBudget.toLocaleString()}</li>
                <li>Meal Preference: {meal}</li>
              </ul>
            </div>

            <button 
              type="submit" 
              className={`w-full py-2 px-4 ${isLoading ? 'bg-gray-400' : 'bg-gray-300 hover:bg-gray-400'} text-gray-800 font-medium rounded-md ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Plan My Trip"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}