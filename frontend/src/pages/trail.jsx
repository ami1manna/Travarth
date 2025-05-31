import React, { useState, useEffect } from "react";
import {
  Globe,
  Sun,
  User,
  Calendar,
  MapPin,
  Clock,
  DollarSign,
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
} from "lucide-react";

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

 export default function Itinerary({ params }) {
  const [showSustainableAlternatives, setShowSustainableAlternatives] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [weatherExpanded, setWeatherExpanded] = useState({});
  const [activeTab, setActiveTab] = useState("itinerary");
  const [activeAccordion, setActiveAccordion] = useState(null);

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

  // Complete itinerary data would be fetched here
  const itinerary = {
    "title": "Goa Getaway for Two (Non-Vegetarian)",
    "destination": "Goa, India",
    "dates": "20th April - 24th April, 2025",
    "duration": "5 days",
    "startDate": "2025-04-20",
    "endDate": "2025-04-24",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Baga_Beach_Goa.jpg/800px-Baga_Beach_Goa.jpg",
    "ecoScore": 3,
    "emergencyContact": {
      "name": "Friend/Family Contact",
      "phone": "+91 XXXXXXXXXX",
      "email": "emergency@example.com"
    },
    "travelDetails": {
      "departureFlight": {
        "airline": "IndiGo",
        "flightNumber": "6E XXX",
        "departure": "2025-04-20T08:00:00",
        "arrival": "2025-04-20T09:15:00",
        "from": "Chhatrapati Shivaji Maharaj International Airport (BOM), Mumbai",
        "to": "Dabolim Airport (GOI), Goa, India"
      },
      "returnFlight": {
        "airline": "SpiceJet",
        "flightNumber": "SG YYY",
        "departure": "2025-04-24T18:00:00",
        "arrival": "2025-04-24T19:15:00",
        "from": "Dabolim Airport (GOI), Goa, India",
        "to": "Chhatrapati Shivaji Maharaj International Airport (BOM), Mumbai"
      },
      "localTransport": {
        "mode": "Pre-booked Taxi/Auto-rickshaw/Bus",
        "details": "Consider using GoaMiles app for taxis or pre-booking for better rates. Public buses are a budget-friendly and sustainable option for longer distances."
      }
    },
    "accommodation": {
      "name": "Hotel La Paz Gardens Vasco",
      "address": "Swatantra Path, Vasco Da Gama, Goa 403802, India",
      "checkIn": "2025-04-20",
      "checkOut": "2025-04-24",
      "amenities": ["Air conditioning", "Free Wi-Fi", "Swimming Pool"]
    },
    "estimatedCost": {
      "flights": "₹ 7000",
      "accommodation": "₹ 5000",
      "activities": "₹ 3500",
      "meals": "₹ 4000",
      "transport": "₹ 500",
      "misc": "₹ 0",
      "total": "₹ 20000"
    },
    "packingSuggestions": [
      "Light cotton clothes",
      "Swimwear",
      "Sunscreen (SPF 30 or higher)",
      "Hat or cap",
      "Sunglasses",
      "Comfortable footwear (flip-flops, sandals)",
      "Insect repellent",
      "Basic toiletries"
    ],
    "days": [
      {
        "day": 1,
        "date": "2025-04-20",
        "weather": "Hot and humid",
        "activities": [
          {
            "time": "09:15",
            "title": "Arrival at Dabolim Airport & Transfer to Vasco",
            "description": "Upon arrival, take a pre-booked taxi or a bus to your accommodation in Vasco (approx. 10 mins).",
            "location": "Dabolim Airport (GOI) to Hotel La Paz Gardens Vasco",
            "cost": "₹ 300 (taxi) / ₹ 50 (bus for two)",
            "sustainableAlternative": {
              "title": "Airport Bus to Vasco",
              "description": "Take the airport bus directly to Vasco. This is a more eco-friendly and budget-friendly option.",
              "cost": "₹ 50 for two",
              "ecoImpact": "Reduced carbon footprint compared to a private taxi."
            }
          },
          {
            "time": "10:30",
            "title": "Check-in & Relax",
            "description": "Check in to Hotel La Paz Gardens Vasco and take some time to relax and freshen up.",
            "location": "Hotel La Paz Gardens Vasco",
            "cost": "Included in accommodation",
            "sustainableAlternative": null
          },
          {
            "time": "13:00",
            "title": "Lunch at a Local Non-Vegetarian Restaurant",
            "description": "Enjoy authentic Goan non-vegetarian cuisine at a nearby local restaurant. Try Fish Thali or Chicken Cafreal.",
            "location": "Vasco Da Gama",
            "cost": "₹ 600",
            "sustainableAlternative": {
              "title": "Support a Local Eatery",
              "description": "Choose a smaller, locally-owned restaurant to directly support the local economy.",
              "cost": "₹ 550",
              "ecoImpact": "Supports local livelihoods."
            }
          },
          {
            "time": "16:00",
            "title": "Baina Beach Visit",
            "description": "Visit Baina Beach, located close to Vasco. Enjoy the sunset.",
            "location": "Baina Beach",
            "cost": "Free",
            "sustainableAlternative": null
          }
        ]
      },
      {
        "day": 2,
        "date": "2025-04-21",
        "weather": "Hot and humid",
        "activities": [
          {
            "time": "09:00",
            "title": "Travel to South Goa (Sustainable Bus)",
            "description": "Take a public bus to Margao (approx. 30 mins), the main city in South Goa. This is a sustainable and budget-friendly option.",
            "location": "Vasco to Margao",
            "cost": "₹ 50 (bus for two)",
            "sustainableAlternative": "Using public transport like the bus reduces carbon emissions."
          },
          {
            "time": "10:00",
            "title": "Explore Margao Market",
            "description": "Visit the bustling Margao Market for local spices, cashew nuts, and other Goan products. (Image: https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Margao_Municipal_Market.jpg/800px-Margao_Municipal_Market.jpg)",
            "location": "Margao Market",
            "cost": "Variable",
            "sustainableAlternative": {
              "title": "Buy Local Produce",
              "description": "Purchase directly from local vendors to support their livelihoods and reduce the environmental impact of transportation.",
              "cost": "Variable",
              "ecoImpact": "Supports local economy and reduces food miles."
            }
          },
          {
            "time": "13:00",
            "title": "Non-Vegetarian Lunch in Margao",
            "description": "Have lunch at a restaurant in Margao known for its Goan non-vegetarian dishes.",
            "location": "Margao",
            "cost": "₹ 700",
            "sustainableAlternative": null
          },
          {
            "time": "15:00",
            "title": "Colva Beach Relaxation",
            "description": "Take a local bus or auto-rickshaw to Colva Beach (approx. 15 mins from Margao) and relax by the sea.",
            "location": "Colva Beach",
            "cost": "₹ 100 (auto) / ₹ 30 (bus for two)",
            "sustainableAlternative": null
          }
        ]
      },
      {
        "day": 3,
        "date": "2025-04-22",
        "weather": "Hot and humid",
        "activities": [
          {
            "time": "09:30",
            "title": "Travel to North Goa (Bus)",
            "description": "Take a public bus from Margao to Panaji (approx. 1 hour) and then another bus to Calangute/Baga (approx. 30 mins).",
            "location": "Margao to Calangute/Baga",
            "cost": "₹ 100 (bus for two)",
            "sustainableAlternative": "Using public transport for longer distances is more eco-friendly."
          },
          {
            "time": "11:00",
            "title": "Check-in (if changing accommodation) & Explore Calangute Beach",
            "description": "If you prefer to experience North Goa, check into a budget-friendly guesthouse in Calangute/Baga area (adjust budget accordingly). Explore the popular Calangute Beach.",
            "location": "Calangute Beach",
            "cost": "N/A (if staying in Vasco) / ₹ 2000 (approx. for new accommodation)",
            "sustainableAlternative": null
          },
          {
            "time": "13:30",
            "title": "Non-Vegetarian Lunch at a Beach Shack",
            "description": "Enjoy a seafood lunch at one of the many beach shacks at Calangute or Baga.",
            "location": "Calangute/Baga Beach Shacks",
            "cost": "₹ 800",
            "sustainableAlternative": null
          },
          {
            "time": "16:00",
            "title": "Baga Beach Exploration",
            "description": "Walk over to Baga Beach, known for its lively atmosphere.",
            "location": "Baga Beach",
            "cost": "Free",
            "sustainableAlternative": null
          }
        ]
      },
      {
        "day": 4,
        "date": "2025-04-23",
        "weather": "Hot and humid",
        "activities": [
          {
            "time": "09:30",
            "title": "Anjuna Flea Market (Wednesday Market)",
            "description": "Visit the famous Anjuna Flea Market (held every Wednesday) for unique souvenirs and local crafts. (Image: https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Anjuna_Flea_Market.jpg/800px-Anjuna_Flea_Market.jpg)",
            "location": "Anjuna",
            "cost": "Variable",
            "sustainableAlternative": {
              "title": "Support Local Artisans",
              "description": "Prioritize buying handcrafted items directly from the artisans to support their skills and livelihoods.",
              "cost": "Variable",
              "ecoImpact": "Supports local economy and traditional crafts."
            }
          },
          {
            "time": "13:00",
            "title": "Non-Vegetarian Lunch in Anjuna",
            "description": "Have lunch at a restaurant in Anjuna.",
            "location": "Anjuna",
            "cost": "₹ 700",
            "sustainableAlternative": null
          },
          {
            "time": "15:00",
            "title": "Explore Anjuna Beach Further",
            "description": "Spend more time at Anjuna Beach, perhaps enjoy a swim or simply relax.",
            "location": "Anjuna Beach",
            "cost": "Free",
            "sustainableAlternative": null
          },
          {
            "time": "18:00",
            "title": "Sunset at Curlies (Optional)",
            "description": "Witness the sunset from the iconic Curlies beach shack at Anjuna (can be crowded).",
            "location": "Curlies, Anjuna Beach",
            "cost": "Variable (drinks/snacks)",
            "sustainableAlternative": {
              "title": "Sunset Walk on the Beach",
              "description": "Enjoy a peaceful sunset walk along the beach, avoiding crowded establishments.",
              "cost": "Free",
              "ecoImpact": "Reduces potential waste and noise pollution."
            }
          }
        ]
      },
      {
        "day": 5,
        "date": "2025-04-24",
        "weather": "Hot and humid",
        "activities": [
          {
            "time": "09:00",
            "title": "Breakfast & Check-out",
            "description": "Have breakfast at the accommodation and complete the check-out process.",
            "location": "Hotel La Paz Gardens Vasco (or alternate)",
            "cost": "Included in meals/accommodation",
            "sustainableAlternative": null
          },
          {
            "time": "10:00",
            "title": "Visit to Mormugao Fort (Optional)",
            "description": "If time permits, visit the historic Mormugao Fort near Vasco. (Image: https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Mormugao_Fort_Goa.jpg/800px-Mormugao_Fort_Goa.jpg)",
            "location": "Mormugao Fort",
            "cost": "Free",
            "sustainableAlternative": null
          },
          {
            "time": "13:00",
            "title": "Non-Vegetarian Lunch near Vasco",
            "description": "Have a final Goan non-vegetarian meal before heading to the airport.",
            "location": "Vasco Da Gama",
            "cost": "₹ 600",
            "sustainableAlternative": null
          },
          {
            "time": "16:00",
            "title": "Transfer to Dabolim Airport",
            "description": "Take a pre-booked taxi or a bus to Dabolim Airport for your return flight.",
            "location": "Vasco Da Gama to Dabolim Airport (GOI)",
            "cost": "₹ 300 (taxi) / ₹ 50 (bus for two)",
            "sustainableAlternative": {
              "title": "Bus to Airport",
              "description": "Take a direct bus from Vasco to the airport if available.",
              "cost": "₹ 50 for two",
              "ecoImpact": "Reduced carbon footprint."
            }
          },
          {
            "time": "18:00",
            "title": "Departure from Goa",
            "description": "Depart from Dabolim Airport (GOI) to Mumbai.",
            "location": "Dabolim Airport (GOI)",
            "cost": "Included in flight cost",
            "sustainableAlternative": null
          }
        ]
      }
    ]
  }



  const toggleWeatherExpanded = (date) => {
    setWeatherExpanded(prev => ({
      ...prev,
      [date]: !prev[date]
    }));
  };

  const toggleAccordion = (dayId) => {
    setActiveAccordion(activeAccordion === dayId ? null : dayId);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="border-b sticky top-0 z-50 bg-white dark:bg-gray-800 bg-opacity-80 backdrop-filter backdrop-blur-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-green-500 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white w-4 h-4"
                >
                  <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
                  <path d="M21 12a9 9 0 0 0-9-9v9h9z" />
                  <path d="M12 12 2.1 12.5" />
                  <path d="m4.5 15 5 5" />
                  <path d="m4.5 9 5-5" />
                </svg>
              </div>
            </div>
            <div className="font-bold text-lg">EcoTravelAI</div>
          </a>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <Globe className="w-5 h-5" />
              <span className="sr-only">Change Language</span>
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <Sun className="w-5 h-5" />
              <span className="sr-only">Toggle Theme</span>
            </button>
            <button className="p-2 rounded-full bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="md:w-2/3">
            <div className="mb-6">
              <a
                href="/dashboard/customer"
                className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-2 inline-block"
              >
                ← Back to Dashboard
              </a>
              <h1 className="text-3xl font-bold mb-2">{itinerary.title}</h1>
              <div className="flex flex-wrap gap-4 text-gray-500 dark:text-gray-400">
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
                src={itinerary.image || "/placeholder.svg"} 
                alt={itinerary.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 bg-green-500 text-white text-sm font-medium px-2 py-1 rounded-full flex items-center">
                <LeafIcon className="w-3 h-3 mr-1" />
                {itinerary.ecoScore}
              </div>
            </div>

            {/* Trip Details Tabs - replaced shadcn Tabs with custom tabs */}
            <div className="mb-6">
              <div className="grid grid-cols-3 mb-4 border-b">
                <button 
                  onClick={() => setActiveTab("itinerary")}
                  className={`py-2 font-medium text-sm ${activeTab === "itinerary" 
                    ? "border-b-2 border-green-600 text-green-600" 
                    : "text-gray-500 hover:text-gray-900"}`}
                >
                  Itinerary
                </button>
                <button 
                  onClick={() => setActiveTab("travel")}
                  className={`py-2 font-medium text-sm ${activeTab === "travel" 
                    ? "border-b-2 border-green-600 text-green-600" 
                    : "text-gray-500 hover:text-gray-900"}`}
                >
                  Travel Details
                </button>
                <button 
                  onClick={() => setActiveTab("accommodation")}
                  className={`py-2 font-medium text-sm ${activeTab === "accommodation" 
                    ? "border-b-2 border-green-600 text-green-600" 
                    : "text-gray-500 hover:text-gray-900"}`}
                >
                  Accommodation
                </button>
              </div>
              
              {activeTab === "itinerary" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      {/* Replace shadcn Switch with custom switch */}
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input
                          type="checkbox"
                          id="sustainable-alternatives"
                          checked={showSustainableAlternatives}
                          onChange={() => setShowSustainableAlternatives(!showSustainableAlternatives)}
                          className="opacity-0 absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                        />
                        <label
                          htmlFor="sustainable-alternatives"
                          className={`block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer ${
                            showSustainableAlternatives ? "bg-green-600" : ""
                          }`}
                        >
                          <span
                            className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out ${
                              showSustainableAlternatives ? "translate-x-4" : "translate-x-0"
                            }`}
                          ></span>
                        </label>
                      </div>
                      <label htmlFor="sustainable-alternatives" className="ml-2">
                        Show Sustainable Alternatives
                      </label>
                    </div>

                    <div className="flex gap-2">
                      <button className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                        <Download className="w-4 h-4 mr-2" /> Export PDF
                      </button>
                      <button className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                        <Share2 className="w-4 h-4 mr-2" /> Share
                      </button>
                      <button className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                        <Edit className="w-4 h-4 mr-2" /> Edit
                      </button>
                    </div>
                  </div>

                  {/* Custom accordion replacing shadcn Accordion */}
                  <div className="space-y-4">
                    {itinerary.days && itinerary.days.map((day) => (
                      <div key={day.day} className="border rounded-lg overflow-hidden">
                        <button 
                          className="w-full px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center text-left"
                          onClick={() => toggleAccordion(`day-${day.day}`)}
                        >
                          <div className="flex items-center flex-1">
                            <div className="bg-green-100 dark:bg-green-900/30 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                              <span className="font-semibold">{day.day}</span>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold">Day {day.day}</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{day.date}</p>
                            </div>
                            <WeatherBadge 
                              weather={day.weather} 
                              weatherData={weatherData[day.date]} 
                              expanded={weatherExpanded[day.date]}
                              toggleExpanded={() => toggleWeatherExpanded(day.date)}
                            />
                          </div>
                          <svg 
                            className={`h-5 w-5 text-gray-500 ml-2 transform transition-transform ${activeAccordion === `day-${day.day}` ? 'rotate-180' : ''}`} 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        
                        {activeAccordion === `day-${day.day}` && (
                          <div className="border-t">
                            {day.activities.map((activity, index) => (
                              <div key={index} className="border-b last:border-b-0">
                                <div className="px-6 py-4">
                                  <div className="flex items-start gap-4">
                                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400 w-20 pt-1 flex-shrink-0">
                                      {activity.time}
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="font-medium">{activity.title}</h4>
                                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{activity.description}</p>
                                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
                                        <LocationDialog location={activity.location} />
                                        <div className="flex items-center">
                                          <DollarSign className="w-3.5 h-3.5 mr-1" />
                                          <span>{activity.cost}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {showSustainableAlternatives && activity.sustainableAlternative && (
                                    <div className="mt-3 ml-24 p-3 bg-green-50 dark:bg-green-900/20 rounded-md border border-green-100 dark:border-green-900/30">
                                      <div className="flex items-center gap-2 mb-1">
                                        <LeafIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
                                        <h5 className="font-medium text-green-800 dark:text-green-300">
                                          Sustainable Alternative
                                        </h5>
                                      </div>
                                      <h5 className="font-medium mb-1">{activity.sustainableAlternative.title}</h5>
                                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                        {activity.sustainableAlternative.description}
                                      </p>
                                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
                                        <div className="flex items-center">
                                          <DollarSign className="w-3.5 h-3.5 mr-1" />
                                          <span>{activity.sustainableAlternative.cost}</span>
                                        </div>
                                        <div className="flex items-center">
                                          <LeafIcon className="w-3.5 h-3.5 mr-1" />
                                          <span>{activity.sustainableAlternative.ecoImpact}</span>
                                        </div>
                                      </div>
                                      <div className="mt-2">
                                        <button className="px-3 py-1 h-7 text-xs border border-gray-300 rounded-md font-medium text-gray-700 bg-white hover:bg-gray-50">
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
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                      <Plus className="w-4 h-4 mr-2" /> Add New Day
                    </button>
                  </div>
                </div>
              )}
              
              {activeTab === "travel" && (
                <div className="bg-white dark:bg-gray-800 border rounded-lg shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b">
                    <h2 className="text-lg font-medium">Travel Details</h2>
                    <p className="text-sm text-gray-500">Your flight and transportation information</p>
                  </div>
                  <div className="px-6 py-4 space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Flights</h3>
                      <div className="space-y-4">
                        <div className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="font-medium">Outbound Flight</h4>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                              {itinerary.travelDetails?.departureFlight?.flightNumber}
                            </span>
                          </div>
                          <div className="flex flex-col md:flex-row justify-between gap-4 mb-3">
                            <div>
                              <p className="text-sm text-gray-500">From</p>
                              <p className="font-medium">{itinerary.travelDetails?.departureFlight?.from}</p>
                              <p className="text-sm">
                                {itinerary.travelDetails?.departureFlight?.departure &&
                                  new Date(itinerary.travelDetails.departureFlight.departure).toLocaleString()}
                              </p>
                            </div>
                            <div className="hidden md:flex items-center">
                              <div className="w-5 h-5 rounded-full border-2 border-green-600"></div>
                              <div className="h-0.5 w-24 bg-green-600"></div>
                              <Plane className="w-4 h-4 text-green-600" />
                              <div className="h-0.5 w-24 bg-green-600"></div>
                              <div className="w-5 h-5 rounded-full border-2 border-green-600"></div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-500">To</p>
                              <p className="font-medium">{itinerary.travelDetails?.departureFlight?.to}</p>
                              <p className="text-sm">
                                {itinerary.travelDetails?.departureFlight?.arrival &&
                                  new Date(itinerary.travelDetails.departureFlight.arrival).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <div className="mt-2 text-sm">
                            <span className="font-medium">Airline:</span> {itinerary.travelDetails?.departureFlight?.airline}
                          </div>
                        </div>
                        
                        <div className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="font-medium">Return Flight</h4>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                              {itinerary.travelDetails?.returnFlight?.flightNumber}
                            </span>
                          </div>
                          <div className="flex flex-col md:flex-row justify-between gap-4 mb-3">
                            <div>
                              <p className="text-sm text-gray-500">From</p>
                              <p className="font-medium">{itinerary.travelDetails?.returnFlight?.from}</p>
                              <p className="text-sm">
                                {itinerary.travelDetails?.returnFlight?.departure &&
                                  new Date(itinerary.travelDetails.returnFlight.departure).toLocaleString()}
                              </p>
                            </div>
                            <div className="hidden md:flex items-center">
                              <div className="w-5 h-5 rounded-full border-2 border-green-600"></div>
                              <div className="h-0.5 w-24 bg-green-600"></div>
                              <Plane className="w-4 h-4 text-green-600" />
                              <div className="h-0.5 w-24 bg-green-600"></div>
                              <div className="w-5 h-5 rounded-full border-2 border-green-600"></div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-500">To</p>
                              <p className="font-medium">{itinerary.travelDetails?.returnFlight?.to}</p>
                              <p className="text-sm">
                                {itinerary.travelDetails?.returnFlight?.arrival &&
                                  new Date(itinerary.travelDetails.returnFlight.arrival).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <div className="mt-2 text-sm">
                            <span className="font-medium">Airline:</span> {itinerary.travelDetails?.returnFlight?.airline}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Local Transportation</h3>
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                            <Bus className="w-5 h-5" />
                          </div>
                          <div className="font-medium">{itinerary.travelDetails?.localTransport?.mode}</div>
                        </div>
                        <p className="text-sm text-gray-500">{itinerary.travelDetails?.localTransport?.details}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Emergency Contact</h3>
                      <div className="p-4 border rounded-lg">
                        <p className="font-medium">{itinerary.emergencyContact?.name}</p>
                        <div className="flex flex-col space-y-2 mt-2">
                          <div className="flex items-center">
                            <Phone className="w-4 h-4 mr-2" />
                            <span>{itinerary.emergencyContact?.phone}</span>
                          </div>
                          <div className="flex items-center">
                            <Mail className="w-4 h-4 mr-2" />
                            <span>{itinerary.emergencyContact?.email}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === "accommodation" && (
                <div className="bg-white dark:bg-gray-800 border rounded-lg shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b">
                    <h2 className="text-lg font-medium">Accommodation Details</h2>
                    <p className="text-sm text-gray-500">Information about your stay</p>
                  </div>
                  <div className="px-6 py-4 space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/2">
                        <div className="relative h-48 w-full rounded-lg overflow-hidden mb-4">
                          <img 
                            src="/api/placeholder/600/400?text=EcoLodge%20Costa%20Rica" 
                            alt="EcoLodge Costa Rica" 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <h3 className="text-lg font-medium">{itinerary.accommodation?.name}</h3>
                        <p className="text-sm text-gray-500">{itinerary.accommodation?.address}</p>
                      </div>
                      
                      <div className="md:w-1/2">
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Check-in</h4>
                            <p className="font-medium">{itinerary.accommodation?.checkIn}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Check-out</h4>
                            <p className="font-medium">{itinerary.accommodation?.checkOut}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Eco Amenities</h4>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {itinerary.accommodation?.amenities?.map((amenity, index) => (
                                <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                                  <LeafIcon className="w-3 h-3 mr-1 text-green-600 dark:text-green-400" />
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
                      <div className="relative w-full h-64 rounded-lg overflow-hidden">
                        <img 
                          src="/api/placeholder/800/400?text=Map%20of%20EcoLodge%20Costa%20Rica" 
                          alt="Map Location"
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="md:w-1/3">
            <div className="bg-white dark:bg-gray-800 border rounded-lg shadow-sm overflow-hidden sticky top-24">
              <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-medium">Trip Summary</h2>
                <p className="text-sm text-gray-500">Overview of your itinerary</p>
              </div>
              <div className="px-6 py-4 space-y-4">
                <div>
                  <h3 className="font-medium text-sm mb-2">Trip Duration</h3>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                    <span>
                      {itinerary.duration} ({formatDateRange(itinerary.startDate, itinerary.endDate)})
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-sm mb-2">Total Activities</h3>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-gray-500" />
                    <span>
                      {itinerary.days && itinerary.days.reduce((total, day) => total + day.activities.length, 0)} planned activities
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-sm mb-2">Estimated Budget</h3>
                  <div className="flex items-center mb-2">
                    <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{itinerary.estimatedCost?.total} total</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded">
                      <p className="text-gray-500 dark:text-gray-400">Flights</p>
                      <p className="font-medium">{itinerary.estimatedCost?.flights}</p>
                    </div>
                    <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded">
                      <p className="text-gray-500 dark:text-gray-400">Lodging</p>
                      <p className="font-medium">{itinerary.estimatedCost?.accommodation}</p>
                    </div>
                    <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded">
                      <p className="text-gray-500 dark:text-gray-400">Activities</p>
                      <p className="font-medium">{itinerary.estimatedCost?.activities}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-sm mb-2">Eco-Score</h3>
                  <div className="flex items-center">
                    <LeafIcon className="w-4 h-4 mr-2 text-green-600 dark:text-green-400" />
                    <span className="font-medium">{itinerary.ecoScore}/100</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 mt-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${itinerary.ecoScore}%` }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Great! 7 sustainable alternatives available</p>
                </div>

                <div>
                  <h3 className="font-medium text-sm mb-2">Packing Suggestions</h3>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {itinerary.packingSuggestions.map((item, index) => (
                      <div key={index} variant="secondary" className="text-xs">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4">
            <div className="relative">
              <select className="w-full px-3 py-2 border rounded-md text-sm bg-white">
                <option>Trip Documents</option>
                <option>Flight Confirmations</option>
                <option>Hotel Reservations</option>
                <option>Tour Vouchers</option>
                <option>Travel Insurance</option>
              </select>
              <div className="absolute right-3 top-2.5 pointer-events-none">
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
            </div>
          </div>
            </div>
          </div>
        </div>
      </main>

      {/* <FeedbackPanel />
      <ChatbotButton /> */}
    </div>
  )
}

// Helper component for interactive weather display
function WeatherBadge({ weather, weatherData, expanded, toggleExpanded }) {
    if (!weatherData) return null;
  
    const getWeatherIcon = (condition) => {
      switch (condition.toLowerCase()) {
        case 'sunny':
          return <Sun className="w-4 h-4" />;
        case 'partly cloudy':
          return <Cloud className="w-4 h-4" />;
        case 'cloudy':
          return <Cloud className="w-4 h-4" />;
        case 'rainy':
          return <Umbrella className="w-4 h-4" />;
        default:
          return <Sun className="w-4 h-4" />;
      }
    };
  
    return (
      <div className="relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleExpanded();
          }}
          className={`flex items-center px-2 py-1 rounded-md ${
            expanded ? 'bg-primary/10' : 'hover:bg-primary/5'
          }`}
        >
          {getWeatherIcon(weather)}
          <span className="ml-1">{weather}</span>
        </button>
  
        {expanded && (
          <div className="absolute right-0 top-full mt-2 bg-background rounded-md shadow-lg border p-3 z-10 w-48">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Weather Details</span>
              <button onClick={(e) => {
                e.stopPropagation();
                toggleExpanded();
              }}>
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Temperature</span>
                <span className="font-medium">{weatherData.temp}°C</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Droplets className="w-3 h-3 mr-1" />
                  <span>Humidity</span>
                </div>
                <span className="font-medium">{weatherData.humidity}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Wind className="w-3 h-3 mr-1" />
                  <span>Wind</span>
                </div>
                <span className="font-medium">{weatherData.windSpeed} km/h</span>
              </div>
  
              {/* Animated weather indicator */}
              <div className="h-4 overflow-hidden">
                {weather.toLowerCase() === 'rainy' && (
                  <div className="flex">
                    {Array(8).fill(0).map((_, i) => (
                      <div 
                        key={i} 
                        className="text-blue-500 animate-bounce" 
                        style={{ animationDelay: `${i * 0.1}s` }}
                      >
                        |
                      </div>
                    ))}
                  </div>
                )}
  
                {weather.toLowerCase() === 'sunny' && (
                  <div className="flex justify-center">
                    <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
                  </div>
                )}
  
                {(weather.toLowerCase() === 'partly cloudy' || weather.toLowerCase() === 'cloudy') && (
                  <div className="flex">
                    {Array(3).fill(0).map((_, i) => (
                      <div 
                        key={i} 
                        className="text-gray-300 animate-pulse" 
                        style={{ animationDelay: `${i * 0.2}s` }}
                      >
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
    );
  }

function LeafIcon(props) {
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
  
  // Helper function to format date range
  function formatDateRange(startDate, endDate) {
    const start = new Date(startDate)
    const end = new Date(endDate)
    
    const options = { month: 'short', day: 'numeric', year: 'numeric' }
    return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}`
  }