import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import axios from "../services/axios";
import LoadingScreen from "../components/LoadingScreen";

import {
  Globe,
  Sun,
  User,
  Calendar,
  MapPin,
  Clock,
  FileText,
  Share2,
  Edit,
  Plus,
  Download,
  ChevronDown,
  Phone,
  Mail,
  Plane,
  Bus,
  Cloud,
  Droplets,
  Wind,
  Umbrella,
  X,
  ChevronRight,
} from "lucide-react";
import { useParams } from "react-router-dom";
import FloatingChatButton from "../components/ChatBot.jsx/FloatingChatButton";
import Map from "../components/Map";

// Type definitions
const WeatherBadgeProps = {
  // weather: string;
  // weatherData: {
  //   condition: string;
  //   temp: number;
  //   humidity: number;
  //   windSpeed: number;
  // } | null; // Allow null if no data
  // expanded: boolean;
  // toggleExpanded: () => void;
};

export default function Itinerary({ }) {
  const { id } = useParams();
  console.log("Itinerary ID:", id);
  // console.log(id);

  const [showSustainableAlternatives, setShowSustainableAlternatives] = useState(false);
  const [weatherExpanded, setWeatherExpanded] = useState({});
  const [expandedDay, setExpandedDay] = useState(null)
  const [showLocationDialog, setShowLocationDialog] = useState(false)
  const [activeTab, setActiveTab] = useState("itinerary");
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [itinerary, setItinerary] = useState(null);
  const [showDocumentsDropdown, setShowDocumentsDropdown] = useState(false)
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedLat, setSelectedLat] = useState(null);
  const [selectedLong, setSelectedLong] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchItinerary = async () => {
    // console.log("Fetching itinerary with ID:", id);
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`/api/travelplans/get/${id}`);

      

      const itineraryData = await response.data;
      setItinerary(itineraryData);
      // console.log("ItineraryData", itineraryData);
      // console.log("Itinerary", itinerary);

      // Add a small delay to ensure smooth transition
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);

    } catch (error) {
      console.error("Error fetching itinerary:", error);
      setError("Failed to fetch itinerary details");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItinerary();
  }, [id]); // Only re-fetch if the id changes

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

  if (!itinerary) {
    return (
      <div className="pt-2 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-4">
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
            No itinerary found
          </div>
        </div>
      </div>
    );
  }

  // Enhanced weather data from the original JSON
  const weatherData = {
    "2024-06-15": { condition: "Sunny", temp: 28, humidity: 65, windSpeed: 8 },
    "2024-06-16": { condition: "Partly Cloudy", temp: 26, humidity: 70, windSpeed: 10 },
    "2024-06-17": { condition: "Rainy", temp: 24, humidity: 85, windSpeed: 15 },
    "2024-06-18": { condition: "Sunny", temp: 29, humidity: 60, windSpeed: 7 },
    "2024-06-19": { condition: "Cloudy", temp: 25, humidity: 75, windSpeed: 12 },
    "2024-06-20": { condition: "Sunny", temp: 30, humidity: 55, windSpeed: 5 },
    "2024-06-21": { condition: "Sunny", temp: 28, humidity: 60, windSpeed: 6 },
  };


  const downloadItinerary = () => {
    // Create an HTML document in memory
    const printWindow = window.open('', '_blank');
    
    if (!printWindow) {
      alert("Please allow pop-ups to download your itinerary");
      return;
    }
    
    // Set up the HTML document
    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${itinerary.title} - TravelEaseAI</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          
          body {
            font-family: 'Inter', sans-serif;
            color: #1f2937;
            background-color: #f9fafb;
            line-height: 1.5;
          }
          
          .page-break {
            page-break-after: always;
            margin-bottom: 1.5rem;
          }
          
          .print-header {
            position: fixed;
            top: 0;
            width: 100%;
            background-color: white;
            border-bottom: 1px solid #e5e7eb;
            z-index: 1000;
          }
          
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
          }
          
          .header {
            padding: 1.5rem 0;
            border-bottom: 2px solid #27ae60;
          }
          
          .itinerary-card {
            background-color: white;
            border-radius: 0.5rem;
            box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
            margin-bottom: 1.5rem;
            overflow: hidden;
          }
          
          .day-header {
            background-color: #27ae60;
            color: white;
            padding: 0.75rem 1rem;
            font-weight: 600;
          }
          
          .activity {
            border-bottom: 1px solid #f3f4f6;
            padding: 1rem;
          }
          
          .activity:last-child {
            border-bottom: none;
          }
          
          .time-badge {
            background-color: #ecfdf5;
            color: #047857;
            padding: 0.25rem 0.5rem;
            border-radius: 1rem;
            font-size: 0.875rem;
            font-weight: 500;
          }
          
          .cost-badge {
            background-color: #f3f4f6;
            padding: 0.25rem 0.5rem;
            border-radius: 1rem;
            font-size: 0.875rem;
          }
          
          .sustainable-alt {
            background-color: #ecfdf5;
            border: 1px solid #d1fae5;
            border-radius: 0.375rem;
            padding: 0.75rem;
            margin-top: 0.75rem;
          }
          
          .eco-score {
            display: inline-flex;
            align-items: center;
            background-color: #27ae60;
            color: white;
            padding: 0.25rem 0.5rem;
            border-radius: 1rem;
            font-weight: 500;
          }
          
          .location-pin {
            color: #6b7280;
            display: inline-flex;
            align-items: center;
          }
          
          .weather-badge {
            display: inline-flex;
            align-items: center;
            background-color: #f3f4f6;
            padding: 0.25rem 0.5rem;
            border-radius: 1rem;
            font-size: 0.875rem;
          }
          
          .cost-table {
            width: 100%;
            border-collapse: collapse;
          }
          
          .cost-table th, .cost-table td {
            padding: 0.75rem 1rem;
            text-align: left;
            border-bottom: 1px solid #e5e7eb;
          }
          
          .cost-table th {
            background-color: #f9fafb;
            font-weight: 600;
          }
          
          .cost-table tr:last-child td {
            border-bottom: none;
            font-weight: 600;
          }
          
          .section-title {
            color: #27ae60;
            font-weight: 600;
            font-size: 1.25rem;
            margin: 1.5rem 0 0.75rem 0;
            border-bottom: 1px solid #e5e7eb;
            padding-bottom: 0.5rem;
          }
          
          .packing-item {
            background-color: #f9fafb;
            padding: 0.5rem 0.75rem;
            border-radius: 0.375rem;
            font-size: 0.875rem;
            margin-right: 0.5rem;
            margin-bottom: 0.5rem;
            display: inline-block;
          }
          
          .flight-card {
            border: 1px solid #e5e7eb;
            border-radius: 0.5rem;
            padding: 1rem;
            margin-bottom: 1rem;
          }
          
          .accommodation-card {
            border: 1px solid #e5e7eb;
            border-radius: 0.5rem;
            padding: 1rem;
          }
          
          .flight-timeline {
            display: flex;
            align-items: center;
            margin: 1rem 0;
          }
          
          .timeline-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: #27ae60;
          }
          
          .timeline-line {
            flex-grow: 1;
            height: 2px;
            background-color: #27ae60;
            margin: 0 0.5rem;
          }
          
          .weather-icon {
            font-size: 1.25rem;
            margin-right: 0.25rem;
          }
          
          @media print {
            body {
              background-color: white;
            }
            
            .container {
              max-width: 100%;
              padding: 0;
            }
            
            .no-print {
              display: none !important;
            }
            
            .page-content {
              margin-top: 2rem;
            }
          }
        </style>
      </head>
      <body>
        <div class="print-header no-print">
          <div class="container">
            <div class="flex justify-between items-center">
              <div class="flex items-center">
                <div class="mr-3 bg-green-500 text-white p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 2a10 10 0 1 0 10 10H12V2z"/>
                    <path d="M21 12a9 9 0 0 0-9-9v9h9z"/>
                    <path d="M12 12 2.1 12.5"/>
                    <path d="m4.5 15 5 5"/>
                    <path d="m4.5 9 5-5"/>
                  </svg>
                </div>
                <h1 class="text-xl font-bold">TravArth Ai Your itinerary is ready!</h1>
              </div>
              <div class="flex gap-2">
                <button onclick="window.print()" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Print / Save as PDF
                </button>
                <button onclick="window.close()" class="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="container page-content">
          <!-- Header -->
          <header class="header flex justify-between items-center">
            <div class="flex items-center">
              <div class="mr-3 bg-green-500 text-white p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2a10 10 0 1 0 10 10H12V2z"/>
                  <path d="M21 12a9 9 0 0 0-9-9v9h9z"/>
                  <path d="M12 12 2.1 12.5"/>
                  <path d="m4.5 15 5 5"/>
                  <path d="m4.5 9 5-5"/>
                </svg>
              </div>
              <div>
                <h1 class="text-3xl font-bold">TravelEaseAI</h1>
                <p class="text-gray-500">${itinerary.destination} • ${itinerary.dates}</p>
              </div>
            </div>
            <div class="flex items-center">
              <div class="eco-score mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <span>${itinerary.ecoScore}/100</span>
              </div>
              <div class="text-sm text-gray-500">Duration: ${itinerary.duration}</div>
            </div>
          </header>
          
          <!-- Overview Section -->
          <section class="itinerary-card p-4 mt-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 class="section-title">Trip Highlights</h2>
                <ul class="list-disc list-inside text-gray-700">
                  <li>Explore the beautiful ${itinerary.destination}</li>
                  <li>${itinerary.days.length} days of adventures</li>
                  <li>Stay at ${itinerary.accommodation.name}</li>
                  <li>${itinerary.days.reduce((count, day) => count + day.activities.length, 0)} planned activities</li>
                  <li>Total estimated budget: ${itinerary.estimatedCost.total}</li>
                </ul>
              </div>
              <div>
                <h2 class="section-title">Weather Overview</h2>
                <div class="grid grid-cols-3 gap-2 text-center">
                  ${itinerary.days.map(day => {
                    let weatherIcon = "☀️";
                    if (day.weather.toLowerCase().includes("cloud")) weatherIcon = "⛅";
                    if (day.weather.toLowerCase().includes("rain")) weatherIcon = "🌧️";
                    
                    return `
                      <div class="p-2 border rounded">
                        <div class="text-sm font-medium">Day ${day.day}</div>
                        <div class="text-2xl my-1">${weatherIcon}</div>
                        <div class="text-xs">${day.weather}</div>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            </div>
          </section>
          
          <!-- Daily Itinerary -->
          <h2 class="section-title mt-8">Daily Itinerary</h2>
          ${itinerary.days.map(day => {
            let weatherIcon = "☀️";
            if (day.weather.toLowerCase().includes("cloud")) weatherIcon = "⛅";
            if (day.weather.toLowerCase().includes("rain")) weatherIcon = "🌧️";
            
            return `
              <div class="itinerary-card">
                <div class="day-header flex justify-between items-center">
                  <span>Day ${day.day} - ${day.date}</span>
                  <span class="weather-badge">${weatherIcon} ${day.weather}</span>
                </div>
                <div class="p-2">
                  ${day.activities.map(activity => {
                    return `
                      <div class="activity">
                        <div class="flex justify-between items-start">
                          <div class="time-badge">${activity.time}</div>
                          <div class="cost-badge">${activity.cost}</div>
                        </div>
                        <h3 class="font-medium text-lg mt-2">${activity.title}</h3>
                        <p class="text-gray-700 mt-1">${activity.description}</p>
                        <div class="location-pin mt-2">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          ${activity.location}
                        </div>
                        
                        ${activity.sustainableAlternative ? `
                          <div class="sustainable-alt">
                            <div class="flex items-center text-green-700 font-medium mb-1">
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                              </svg>
                              Sustainable Alternative
                            </div>
                            <h4 class="font-medium">${activity.sustainableAlternative.title}</h4>
                            <p class="text-sm text-gray-700">${activity.sustainableAlternative.description}</p>
                            <div class="flex items-center justify-between mt-2 text-sm">
                              <span>Cost: ${activity.sustainableAlternative.cost}</span>
                              <span class="text-green-600">${activity.sustainableAlternative.ecoImpact}</span>
                            </div>
                          </div>
                        ` : ''}
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            `;
          }).join('')}
          
          <div class="page-break"></div>
          
          <!-- Travel Details -->
          <h2 class="section-title">Travel Details</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flight-card">
              <div class="flex justify-between">
                <h3 class="font-medium">Departure Flight</h3>
                <span class="text-sm bg-gray-100 px-2 py-1 rounded">${itinerary.travelDetails.departureFlight.flightNumber}</span>
              </div>
              <div class="flight-timeline">
                <div>
                  <div class="text-sm text-gray-500">From</div>
                  <div class="font-medium">${itinerary.travelDetails.departureFlight.from.split(',')[0]}</div>
                  <div class="text-sm">${new Date(itinerary.travelDetails.departureFlight.departure).toLocaleString()}</div>
                </div>
                <div class="timeline-dot"></div>
                <div class="timeline-line"></div>
                <div class="flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </div>
                <div class="timeline-line"></div>
                <div class="timeline-dot"></div>
                <div class="text-right">
                  <div class="text-sm text-gray-500">To</div>
                  <div class="font-medium">${itinerary.travelDetails.departureFlight.to.split(',')[0]}</div>
                  <div class="text-sm">${new Date(itinerary.travelDetails.departureFlight.arrival).toLocaleString()}</div>
                </div>
              </div>
              <div class="text-sm text-gray-700">
                <span class="font-medium">Airline:</span> ${itinerary.travelDetails.departureFlight.airline}
              </div>
            </div>
            
            <div class="flight-card">
              <div class="flex justify-between">
                <h3 class="font-medium">Return Flight</h3>
                <span class="text-sm bg-gray-100 px-2 py-1 rounded">${itinerary.travelDetails.returnFlight.flightNumber}</span>
              </div>
              <div class="flight-timeline">
                <div>
                  <div class="text-sm text-gray-500">From</div>
                  <div class="font-medium">${itinerary.travelDetails.returnFlight.from.split(',')[0]}</div>
                  <div class="text-sm">${new Date(itinerary.travelDetails.returnFlight.departure).toLocaleString()}</div>
                </div>
                <div class="timeline-dot"></div>
                <div class="timeline-line"></div>
                <div class="flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </div>
                <div class="timeline-line"></div>
                <div class="timeline-dot"></div>
                <div class="text-right">
                  <div class="text-sm text-gray-500">To</div>
                  <div class="font-medium">${itinerary.travelDetails.returnFlight.to.split(',')[0]}</div>
                  <div class="text-sm">${new Date(itinerary.travelDetails.returnFlight.arrival).toLocaleString()}</div>
                </div>
              </div>
              <div class="text-sm text-gray-700">
                <span class="font-medium">Airline:</span> ${itinerary.travelDetails.returnFlight.airline}
              </div>
            </div>
          </div>
          
          <div class="mt-6">
            <h3 class="font-medium mb-2">Local Transportation</h3>
            <div class="p-4 border rounded-lg bg-white">
              <div class="flex items-center gap-3 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                </svg>
                <span class="font-medium">${itinerary.travelDetails.localTransport.mode}</span>
              </div>
              <p class="text-sm text-gray-700">${itinerary.travelDetails.localTransport.details}</p>
            </div>
          </div>
          
          <!-- Accommodation -->
          <h2 class="section-title mt-8">Accommodation</h2>
          <div class="accommodation-card bg-white">
            <h3 class="font-medium text-lg">${itinerary.accommodation.name}</h3>
            <p class="text-gray-700">${itinerary.accommodation.address}</p>
            <div class="grid grid-cols-2 gap-4 mt-4">
              <div>
                <div class="text-sm text-gray-500">Check-in</div>
                <div class="font-medium">${itinerary.accommodation.checkIn}</div>
              </div>
              <div>
                <div class="text-sm text-gray-500">Check-out</div>
                <div class="font-medium">${itinerary.accommodation.checkOut}</div>
              </div>
            </div>
            <div class="mt-4">
              <div class="text-sm text-gray-500 mb-2">Amenities</div>
              <div class="flex flex-wrap gap-2">
                ${itinerary.accommodation.amenities.map(amenity => `
                  <span class="bg-gray-100 px-2 py-1 rounded text-sm">${amenity}</span>
                `).join('')}
              </div>
            </div>
          </div>
          
          <!-- Packing List -->
          <h2 class="section-title mt-8">Packing Suggestions</h2>
          <div class="bg-white p-4 rounded-lg border">
            <div class="flex flex-wrap">
              ${itinerary.packingSuggestions.map(item => `
                <div class="packing-item">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  ${item}
                </div>
              `).join('')}
            </div>
          </div>
          
          <!-- Cost Breakdown -->
          <h2 class="section-title mt-8">Cost Breakdown</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-lg border p-4">
            <div>
              <table class="cost-table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Flights</td>
                    <td>${itinerary.estimatedCost.flights}</td>
                  </tr>
                  <tr>
                    <td>Accommodation</td>
                    <td>${itinerary.estimatedCost.accommodation}</td>
                  </tr>
                  <tr>
                    <td>Activities</td>
                    <td>${itinerary.estimatedCost.activities}</td>
                  </tr>
                  <tr>
                    <td>Meals</td>
                    <td>${itinerary.estimatedCost.meals || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>Transport</td>
                    <td>${itinerary.estimatedCost.transport || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>Miscellaneous</td>
                    <td>${itinerary.estimatedCost.misc || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td>${itinerary.estimatedCost.total}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div>
              <h3 class="text-lg font-medium mb-4 text-center">Expense Distribution</h3>
              <div style="height: 250px;">
                <canvas id="costChart"></canvas>
              </div>
            </div>
          </div>
          
          <!-- Emergency Contact -->
          <h2 class="section-title mt-8">Emergency Contact</h2>
          <div class="bg-white p-4 rounded-lg border">
            <h3 class="font-medium">${itinerary.emergencyContact.name}</h3>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>${itinerary.emergencyContact.phone}</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>${itinerary.emergencyContact.email}</span>
              </div>
            </div>
          </div>
          
          <!-- Daily Activities Distribution -->
          <h2 class="section-title mt-8">Activity Distribution</h2>
          <div class="bg-white rounded-lg border p-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 class="text-lg font-medium mb-4 text-center">Activities by Day</h3>
                <div style="height: 250px;">
                  <canvas id="activitiesChart"></canvas>
                </div>
              </div>
              <div>
                <h3 class="text-lg font-medium mb-4 text-center">Sustainability Impact</h3>
                <div class="p-4 bg-green-50 rounded-lg border border-green-100">
                  <div class="flex items-center justify-between mb-2">
                    <span class="font-medium">Eco-Score</span>
                    <span class="font-bold text-green-700">${itinerary.ecoScore}/100</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-4">
                    <div class="bg-green-500 h-4 rounded-full" style="width: ${itinerary.ecoScore}%"></div>
                  </div>
                  
                  <div class="mt-4">
                    <h4 class="font-medium mb-2">Sustainable Alternatives Available</h4>
                    <div class="flex items-center justify-between">
                      <span>Activities with alternatives</span>
                      <span class="font-medium">${itinerary.days.reduce((count, day) => {
                        return count + day.activities.filter(activity => activity.sustainableAlternative).length;
                      }, 0)} of ${itinerary.days.reduce((count, day) => count + day.activities.length, 0)}</span>
                    </div>
                    
                    <div class="mt-2 text-sm text-gray-600">
                      <p>By choosing sustainable alternatives, you can reduce your environmental impact and support local communities.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <script>
            // Setup activities chart
            document.addEventListener('DOMContentLoaded', function() {
              const actCtx = document.getElementById('activitiesChart').getContext('2d');
              
              // Extract day numbers and activity counts
              const dayNumbers = [${itinerary.days.map(day => day.day).join(', ')}];
              const activityCounts = [${itinerary.days.map(day => day.activities.length).join(', ')}];
              
              new Chart(actCtx, {
                type: 'bar',
                data: {
                  labels: dayNumbers.map(day => 'Day ' + day),
                  datasets: [{
                    label: 'Number of Activities',
                    data: activityCounts,
                    backgroundColor: '#10B981', // green-500
                    borderColor: '#059669', // green-600
                    borderWidth: 1
                  }]
                },
                options: {
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        stepSize: 1
                      }
                    }
                  },
                  plugins: {
                    legend: {
                      display: false
                    }
                  }
                }
              });
            });
          </script>
          
          <!-- Thank you note -->
          <div class="mt-12 p-6 bg-green-50 rounded-lg border border-green-100 text-center">
            <h2 class="text-2xl font-bold text-green-700 mb-2">Thank You for Choosing TravelEaseAI</h2>
            <p class="text-green-800">We hope you have a wonderful journey and create amazing memories. Safe travels!</p>
            <div class="mt-4 flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          <!-- Footer -->
          <footer class="mt-12 text-center text-gray-500 text-sm">
            <p>© ${new Date().getFullYear()} TravelEaseAI. All rights reserved.</p>
            <p class="mt-1">Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
          </footer>
        </div>
        
        <script>
          // Extract numeric values from cost strings
          function extractCostValue(costString) {
            if (!costString || costString === 'N/A') return 0;
            return parseFloat(costString.replace(/[^0-9.]/g, '')) || 0;
          }
          
          // Setup spending chart
          document.addEventListener('DOMContentLoaded', function() {
            const ctx = document.getElementById('costChart').getContext('2d');
            
            // Extract costs
            const flightsCost = extractCostValue('${itinerary.estimatedCost.flights}');
            const accommodationCost = extractCostValue('${itinerary.estimatedCost.accommodation}');
            const activitiesCost = extractCostValue('${itinerary.estimatedCost.activities}');
            const mealsCost = extractCostValue('${itinerary.estimatedCost.meals || "0"}');
            const transportCost = extractCostValue('${itinerary.estimatedCost.transport || "0"}');
            const miscCost = extractCostValue('${itinerary.estimatedCost.misc || "0"}');
            
            new Chart(ctx, {
              type: 'pie',
              data: {
                labels: ['Flights', 'Accommodation', 'Activities', 'Meals', 'Transport', 'Misc'],
                datasets: [{
                  data: [flightsCost, accommodationCost, activitiesCost, mealsCost, transportCost, miscCost],
                  backgroundColor: [
                    '#34D399', // green-400
                    '#10B981', // green-500
                    '#059669', // green-600
                    '#047857', // green-700
                    '#065F46', // green-800
                    '#064E3B'  // green-900
                  ],
                  borderColor: '#ffffff',
                  borderWidth: 1
                }]
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right',
                    labels: {
                      boxWidth: 15,
                      padding: 15
                    }
                  },
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                        return label + ': ' + percentage + '% (' + value + ')';
                      }
                    }
                  }
                }
              }
            });
          });
        </script>
      </body>
      </html>
    `);
    
    printWindow.document.close();
  };


  const toggleWeatherExpanded = (date) => {
    setWeatherExpanded(prev => ({
      ...prev,
      [date]: !prev[date]
    }));
  };
  const toggleDay = (day) => {
    setExpandedDay(expandedDay === day ? null : day)
  }


  const toggleAccordion = (dayId) => {
    setActiveAccordion(activeAccordion === dayId ? null : dayId);
  };

  const openLocationDialog = (location, lat, long) => {
    setSelectedLocation(location)
    setSelectedLat(lat)
    setSelectedLong(long)
    console.log(location,lat,long)
    setShowLocationDialog(true)
  }
  const formatDateRange = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)

    const options = { month: "short", day: "numeric", year: "numeric" }
    return `${start.toLocaleDateString("en-US", options)} - ${end.toLocaleDateString("en-US", options)}`
  }

  const cleanedDestination = itinerary.title.split(' ')[0];
  // console.log(cleanedDestination)

  return (
    <div className="pt-2">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="md:w-2/3">
            <div className="mb-6">
              <Link
                to="/my-trip"
                className="text-sm text-gray-500  hover:text-gray-900  mb-2 inline-block"
              >
                ← Back to Dashboard
              </Link>
              <h1 className="text-3xl font-bold mb-2">{itinerary.title}</h1>
              <div className="flex flex-wrap gap-4 text-gray-500 ">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{itinerary.destination}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{itinerary.dates}</span>
                </div>
              </div>
            </div>

            <div className="relative h-64 md:h-96 w-full rounded-lg overflow-hidden mb-6">
              <img
                src={itinerary.image || "fallback.jpg"}
                alt={itinerary.title || "Travel Image"}
                className="object-cover w-full h-full"
              />
              <div className="absolute top-3 right-3 bg-green-500 text-white text-sm font-medium px-2 py-1 rounded-full flex items-center">
                <LeafIcon className="w-3 h-3 mr-1" />
                {itinerary.ecoScore}
              </div>
            </div>

            {/* Trip Details Tabs */}
            <div className="mb-6">
              <div className="border-b">
                <div className="flex -mb-px">
                  <button
                    className={`py-2 px-4 font-medium ${activeTab === "itinerary"
                      ? "border-b-2 border-green-500 text-green-600 "
                      : "text-gray-500  hover:text-gray-700 "
                      }`}
                    onClick={() => setActiveTab("itinerary")}
                  >
                    Itinerary
                  </button>
                  <button
                    className={`py-2 px-4 font-medium ${activeTab === "travel"
                      ? "border-b-2 border-green-500 text-green-600 "
                      : "text-gray-500  hover:text-gray-700 "
                      }`}
                    onClick={() => setActiveTab("travel")}
                  >
                    Travel Details
                  </button>
                  <button
                    className={`py-2 px-4 font-medium ${activeTab === "accommodation"
                      ? "border-b-2 border-green-500 text-green-600 "
                      : "text-gray-500  hover:text-gray-700 "
                      }`}
                    onClick={() => setActiveTab("accommodation")}
                  >
                    Accommodation
                  </button>
                </div>
              </div>

              {activeTab === "itinerary" && (
                <div className="py-4">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={showSustainableAlternatives}
                          onChange={() => setShowSustainableAlternatives(!showSustainableAlternatives)}
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-green-600"></div>
                        <span className="ms-3 text-sm font-medium">Show Sustainable Alternatives</span>
                      </label>
                    </div>

                    <div className="flex gap-2">
                    <button
                        className="px-3 py-1.5 text-sm border border-gray-300  rounded-md hover:bg-gray-100  flex items-center"
                        onClick={downloadItinerary}
                      >
                        <Download className="w-4 h-4 mr-2" /> Export PDF
                      </button>

                      <button className="px-3 py-1.5 text-sm border border-gray-300  rounded-md hover:bg-gray-100  flex items-center">
                        <Share2 className="w-4 h-4 mr-2" /> Share
                      </button>
                      <button className="px-3 py-1.5 text-sm border border-gray-300  rounded-md hover:bg-gray-100  flex items-center">
                        <Edit className="w-4 h-4 mr-2" /> Edit
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {itinerary.days.map((day) => (
                      <div key={day.day} className="border rounded-lg overflow-hidden">
                        <div
                          className={`px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-50  ${expandedDay === day.day ? "bg-gray-50 " : ""
                            }`}
                          onClick={() => toggleDay(day.day)}
                        >
                          <div className="flex items-center text-left">
                            <div className="bg-green-100  text-green-800  rounded-full w-10 h-10 flex items-center justify-center mr-4">
                              <span className="font-semibold">{day.day}</span>
                            </div>
                            <div>
                              <h3 className="font-semibold">Day {day.day}</h3>
                              <p className="text-sm text-gray-500 ">{day.date}</p>
                            </div>
                          </div>
                          <WeatherBadge
                            weather={day.weather}
                            weatherData={weatherData[day.date]}
                            expanded={weatherExpanded[day.date]}
                            toggleExpanded={() => toggleWeatherExpanded(day.date)}
                          />
                          <ChevronRight
                            className={`w-5 h-5 transition-transform ${expandedDay === day.day ? "rotate-90" : ""}`}
                          />
                        </div>

                        {expandedDay === day.day && (
                          <div className="border-t">
                            {day.activities.map((activity, index) => (
                              <div key={index} className="border-b last:border-b-0">
                                <div className="px-6 py-4">
                                  <div className="flex items-start gap-4">
                                    <div className="text-sm font-medium text-gray-500  w-20 pt-1 flex-shrink-0">
                                      {activity.time}
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="font-medium">{activity.title}</h4>
                                      <p className="text-sm text-gray-500  mb-2">
                                        {activity.description}
                                      </p>
                                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 ">
                                        <button
                                          className="flex items-center hover:text-gray-900 "
                                          onClick={() => openLocationDialog(activity.location, activity.lat, activity.long)}

                                        >
                                          <MapPin className="w-3.5 h-3.5 mr-1" />
                                          <span className="underline">{activity.location}</span>
                                        </button>

                                        <div className="flex items-center">
                                          <span>{activity.cost}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {showSustainableAlternatives && activity.sustainableAlternative && (
                                    <div className="mt-3 ml-24 p-3 bg-green-50  rounded-md border border-green-100 ">
                                      <div className="flex items-center gap-2 mb-1">
                                        <LeafIcon className="w-4 h-4 text-green-600 " />
                                        <h5 className="font-medium text-green-800 ">
                                          Sustainable Alternative
                                        </h5>
                                      </div>
                                      <h5 className="font-medium mb-1">{activity.sustainableAlternative.title}</h5>
                                      <p className="text-sm text-gray-500  mb-2">
                                        {activity.sustainableAlternative.description}
                                      </p>
                                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 ">
                                        <div className="flex items-center">
                                          <span>{activity.sustainableAlternative.cost}</span>
                                        </div>
                                        <div className="flex items-center">
                                          <LeafIcon className="w-3.5 h-3.5 mr-1" />
                                          <span>{activity.sustainableAlternative.ecoImpact}</span>
                                        </div>
                                      </div>
                                      <div className="mt-2">
                                        <button className="px-2 py-1 text-xs border border-gray-300  rounded-md hover:bg-gray-100 ">
                                          Switch to This Option
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex justify-center">
                    <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md flex items-center">
                      <Plus className="w-4 h-4 mr-2" /> Add New Day
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "travel" && (
                <div className="py-4">
                  <div className="bg-white  border rounded-lg shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b">
                      <h2 className="text-xl font-semibold">Travel Details</h2>
                      <p className="text-sm text-gray-500 ">
                        Your flight and transportation information
                      </p>
                    </div>
                    <div className="p-6 space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-3">Flights</h3>
                        <div className="space-y-4">
                          <div className="p-4 border rounded-lg">
                            <div className="flex justify-between items-start mb-4">
                              <h4 className="font-medium">Outbound Flight</h4>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100  text-gray-800 ">
                                {itinerary.travelDetails.departureFlight.flightNumber}
                              </span>
                            </div>
                            <div className="flex flex-col md:flex-row justify-between gap-4 mb-3">
                              <div>
                                <p className="text-sm text-gray-500 ">From</p>
                                <p className="font-medium">{itinerary.travelDetails.departureFlight.from}</p>
                                <p className="text-sm">
                                  {new Date(itinerary.travelDetails.departureFlight.departure).toLocaleString()}
                                </p>
                              </div>
                              <div className="hidden md:flex items-center">
                                <div className="w-5 h-5 rounded-full border-2 border-green-500"></div>
                                <div className="h-0.5 w-24 bg-green-500"></div>
                                <Plane className="w-4 h-4 text-green-500" />
                                <div className="h-0.5 w-24 bg-green-500"></div>
                                <div className="w-5 h-5 rounded-full border-2 border-green-500"></div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-gray-500 ">To</p>
                                <p className="font-medium">{itinerary.travelDetails.departureFlight.to}</p>
                                <p className="text-sm">
                                  {new Date(itinerary.travelDetails.departureFlight.arrival).toLocaleString()}
                                </p>
                              </div>
                            </div>
                            <div className="mt-2 text-sm">
                              <span className="font-medium">Airline:</span>{" "}
                              {itinerary.travelDetails.departureFlight.airline}
                            </div>
                          </div>

                          <div className="p-4 border rounded-lg">
                            <div className="flex justify-between items-start mb-4">
                              <h4 className="font-medium">Return Flight</h4>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100  text-gray-800 ">
                                {itinerary.travelDetails.returnFlight.flightNumber}
                              </span>
                            </div>
                            <div className="flex flex-col md:flex-row justify-between gap-4 mb-3">
                              <div>
                                <p className="text-sm text-gray-500 ">From</p>
                                <p className="font-medium">{itinerary.travelDetails.returnFlight.from}</p>
                                <p className="text-sm">
                                  {new Date(itinerary.travelDetails.returnFlight.departure).toLocaleString()}
                                </p>
                              </div>
                              <div className="hidden md:flex items-center">
                                <div className="w-5 h-5 rounded-full border-2 border-green-500"></div>
                                <div className="h-0.5 w-24 bg-green-500"></div>
                                <Plane className="w-4 h-4 text-green-500" />
                                <div className="h-0.5 w-24 bg-green-500"></div>
                                <div className="w-5 h-5 rounded-full border-2 border-green-500"></div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-gray-500 ">To</p>
                                <p className="font-medium">{itinerary.travelDetails.returnFlight.to}</p>
                                <p className="text-sm">
                                  {new Date(itinerary.travelDetails.returnFlight.arrival).toLocaleString()}
                                </p>
                              </div>
                            </div>
                            <div className="mt-2 text-sm">
                              <span className="font-medium">Airline:</span>{" "}
                              {itinerary.travelDetails.returnFlight.airline}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-3">Local Transportation</h3>
                        <div className="p-4 border rounded-lg">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="bg-green-100  p-2 rounded-full">
                              <Bus className="w-5 h-5 text-green-600 " />
                            </div>
                            <div className="font-medium">{itinerary.travelDetails.localTransport.mode}</div>
                          </div>
                          <p className="text-sm text-gray-500 ">
                            {itinerary.travelDetails.localTransport.details}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-3">Emergency Contact</h3>
                        <div className="p-4 border rounded-lg">
                          <p className="font-medium">{itinerary.emergencyContact.name}</p>
                          <div className="flex flex-col space-y-2 mt-2">
                            <div className="flex items-center">
                              <Phone className="w-4 h-4 mr-2 text-gray-500 " />
                              <span>{itinerary.emergencyContact.phone}</span>
                            </div>
                            <div className="flex items-center">
                              <Mail className="w-4 h-4 mr-2 text-gray-500 " />
                              <span>{itinerary.emergencyContact.email}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "accommodation" && (
                <div className="py-4">
                  <div className="bg-white  border rounded-lg shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b">
                      <h2 className="text-xl font-semibold">Accommodation Details</h2>
                      <p className="text-sm text-gray-500 ">Information about your stay</p>
                    </div>
                    <div className="p-6 space-y-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/2">
                          <div className="relative h-48 w-full rounded-lg overflow-hidden mb-4">
                            <img
                              src="/placeholder.svg?text=Hotel+La+Paz+Gardens+Vasco"
                              alt="Hotel La Paz Gardens Vasco"
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <h3 className="text-lg font-medium">{itinerary.accommodation.name}</h3>
                          <p className="text-sm text-gray-500 ">{itinerary.accommodation.address}</p>
                        </div>

                        <div className="md:w-1/2">
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-sm font-medium text-gray-500 ">Check-in</h4>
                              <p className="font-medium">{itinerary.accommodation.checkIn}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-500 ">Check-out</h4>
                              <p className="font-medium">{itinerary.accommodation.checkOut}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-500 ">Amenities</h4>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {itinerary.accommodation.amenities.map((amenity, index) => (
                                  <span
                                    key={index}
                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100  text-green-800 "
                                  >
                                    <LeafIcon className="w-3 h-3 mr-1 text-green-600 " />
                                    {amenity}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-2">Map Location</h3>
                        <div className="relative w-full h-64 rounded-lg overflow-hidden bg-gray-200  flex items-center justify-center">
                          <MapPin className="w-8 h-8 text-gray-400 " />
                          <p className="absolute">Map of {itinerary.accommodation.name}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="md:w-1/3">
            <div className="sticky top-24 bg-white  border rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b">
                <h2 className="text-xl font-semibold">Trip Summary</h2>
                <p className="text-sm text-gray-500 ">Overview of your itinerary</p>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-medium text-sm mb-2">Trip Duration</h3>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-gray-500 " />
                    <span>
                      {itinerary.duration} ({formatDateRange(itinerary.startDate, itinerary.endDate)})
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-sm mb-2">Total Activities</h3>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-gray-500 " />
                    <span>
                      {itinerary.days.reduce((total, day) => total + day.activities.length, 0)} planned activities
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-sm mb-2">Estimated Budget</h3>
                  <div className="flex items-center mb-2">
                    <span>{itinerary.estimatedCost.total} total</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="p-2 bg-gray-100  rounded">
                      <p className="text-gray-500 ">Flights</p>
                      <p className="font-medium">{itinerary.estimatedCost.flights}</p>
                    </div>
                    <div className="p-2 bg-gray-100  rounded">
                      <p className="text-gray-500 ">Lodging</p>
                      <p className="font-medium">{itinerary.estimatedCost.accommodation}</p>
                    </div>
                    <div className="p-2 bg-gray-100  rounded">
                      <p className="text-gray-500 ">Activities</p>
                      <p className="font-medium">{itinerary.estimatedCost.activities}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-sm mb-2">Eco-Score</h3>
                  <div className="flex items-center">
                    <LeafIcon className="w-4 h-4 mr-2 text-green-600 " />
                    <span className="font-medium">{itinerary.ecoScore}/10</span>
                  </div>
                  <div className="w-full bg-gray-200  rounded-full h-2 mt-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${itinerary.ecoScore*10}%` }}></div>
                  </div>
                  <p className="text-xs text-gray-500  mt-1">
                    Great! 7 sustainable alternatives available
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-sm mb-2">Packing Suggestions</h3>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {itinerary.packingSuggestions.map((item, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100  text-gray-800 "
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 border-t">
                <div className="relative">
                  {/* <button
                    className="w-full px-4 py-2 border border-gray-300  rounded-md flex items-center justify-between"
                    onClick={() => setShowDocumentsDropdown(!showDocumentsDropdown)}
                  >
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 mr-2" /> Trip Documents
                    </div>
                    <ChevronDown className="w-4 h-4" />
                  </button> */}

                  {showDocumentsDropdown && (
                    <div className="absolute right-0 mt-2 w-full bg-white  border rounded-md shadow-lg z-10">
                      <div className="py-1">
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100 ">
                          Flight Confirmations
                        </button>
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100 ">
                          Hotel Reservations
                        </button>
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100 ">
                          Tour Vouchers
                        </button>
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100 ">
                          Travel Insurance
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Location Dialog */}
      {showLocationDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white  rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-semibold">{selectedLocation}</h2>
              <button
                className="p-1 rounded-full hover:bg-gray-100 "
                onClick={() => setShowLocationDialog(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <div className="relative w-full h-80 rounded-md overflow-hidden bg-gray-200  mb-4 flex items-center justify-center">
                <Map lat={selectedLat} long={selectedLong} location={selectedLocation} />
                {/* <MapPin className="w-12 h-12 text-gray-400 " /> */}
                <p className="absolute">Map of {selectedLocation}</p>

              </div>
              <div>
                <h3 className="font-medium mb-2">Nearby Points of Interest</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {["Restaurant", "Hotel", "Park", "Museum"].map((poi, i) => (
                    <div key={i} className="flex items-center p-2 border rounded-md">
                      <div className="w-10 h-10 bg-green-100  rounded-md flex items-center justify-center mr-3">
                        <MapPin className="w-5 h-5 text-green-600 " />
                      </div>
                      <div>
                        <p className="font-medium">
                          {poi} {i + 1}
                        </p>
                        <p className="text-sm text-gray-500 ">0.{i + 1} km away</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <FloatingChatButton />
      {/* Feedback and Chat buttons would go here */}
    </div>
  )
}

// Helper component for interactive weather display
const WeatherBadge = ({ weather, weatherData, expanded, toggleExpanded }) => {
  if (!weatherData) return null

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return <Sun className="w-4 h-4" />
      case "partly cloudy":
        return <Cloud className="w-4 h-4" />
      case "cloudy":
        return <Cloud className="w-4 h-4" />
      case "rainy":
        return <Umbrella className="w-4 h-4" />
      default:
        return <Sun className="w-4 h-4" />
    }
  }

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation()
          toggleExpanded()
        }}
        className={`flex items-center px-2 py-1 rounded-md ${expanded ? "bg-green-100 " : "hover:bg-gray-100 "
          }`}
      >
        {getWeatherIcon(weatherData.condition)}
        <span className="ml-1">{weather}</span>
      </button>

      {expanded && (
        <div className="absolute right-0 top-full mt-2 bg-white  rounded-md shadow-lg border p-3 z-10 w-48">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">Weather Details</span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleExpanded()
              }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 ">Temperature</span>
              <span className="font-medium">{weatherData.temp}°C</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500 ">
                <Droplets className="w-3 h-3 mr-1" />
                <span>Humidity</span>
              </div>
              <span className="font-medium">{weatherData.humidity}%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500 ">
                <Wind className="w-3 h-3 mr-1" />
                <span>Wind</span>
              </div>
              <span className="font-medium">{weatherData.windSpeed} km/h</span>
            </div>

            {/* Animated weather indicator */}
            <div className="h-4 overflow-hidden">
              {weatherData.condition.toLowerCase() === "rainy" && (
                <div className="flex">
                  {Array(8)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="text-blue-500 animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
                        |
                      </div>
                    ))}
                </div>
              )}

              {weatherData.condition.toLowerCase() === "sunny" && (
                <div className="flex justify-center">
                  <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
                </div>
              )}

              {(weatherData.condition.toLowerCase() === "partly cloudy" ||
                weatherData.condition.toLowerCase() === "cloudy") && (
                  <div className="flex">
                    {Array(3)
                      .fill(0)
                      .map((_, i) => (
                        <div key={i} className="text-gray-300 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}>
                          ●
                        </div>
                      ))}
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  )

}

const LeafIcon = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  )
}




