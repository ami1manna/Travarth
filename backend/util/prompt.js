

export function getPrompt(
  source,
  destination,
  departureDate,
  returnDate,
  travelers,
  duration,
  budget,
  accommodationType,
  travelClass,
  activities,
  mealPreferences,
  transportModes
) {
  return `
You are a travel planning assistant. Based on the user's input, generate a complete travel itinerary that includes:

1. Flight information for outbound and inbound journeys.
2. Hotel/accommodation recommendations.
3. Local transport options during the trip.
4. A day-wise itinerary covering attractions, activities, meals, transport, and accommodation.
5. A detailed budget breakdown.
6. Travel tips and weather forecast.

Return your response strictly in the following JSON format, which follows the exact structure provided below.

### USER INPUT
{
  "source": "${source}",
  "destination": "${destination}",
  "departureDate": "${departureDate}", // YYYY-MM-DD
  "returnDate": "${returnDate}", // YYYY-MM-DD
  "travelers": ${travelers},
  "duration": ${duration},
  "budget": ${budget},
  "preferences": {
    "accommodationType": "${accommodationType}",
    "travelClass": "${travelClass}",
    "activities": ${JSON.stringify(activities)},
    "mealPreferences": ${JSON.stringify(mealPreferences)},
    "transportModes": ${JSON.stringify(transportModes)}
  }
}

### RETURN THE ITINERARY IN THIS STRUCTURE:
{
  overview: {
    source: String,          // Starting point
    destination: String,     // Destination
    duration: Number,        // Trip duration in days
    totalBudget: {
      amount: Number,        // Total estimated cost
      currency: String       // Currency code
    },
    startDate: Date,         // YYYY-MM-DD format
    endDate: Date            // YYYY-MM-DD format
  },
  transportation: {
    outbound: [Flight],      // Outbound flight details
    inbound: [Flight],       // Return flight details (if applicable)
    localTransport: [LocalTransport] // Local transportation options
  },
  accommodation: [Hotel],    // Selected hotels
  itinerary: [{
    day: Number,             // Day number
    date: Date,              // Date for this day
    activities: [{
      time: String,          // Time for activity
      description: String,   // What to do
      location: String,      // Where to go
      cost: {
        amount: Number,
        currency: String
      },
      duration: String,      // How long it takes
      notes: String          // Additional information
    }],
    meals: [{
      type: String,          // "breakfast", "lunch", "dinner"
      recommendation: String, // Restaurant or food recommendation
      estimatedCost: {
        amount: Number,
        currency: String
      }
    }],
    transport: [LocalTransport], // Transport for this specific day
    accommodation: Hotel     // Where to stay this night
  }],
  budgetBreakdown: {
    transportation: Number,  // Total transport costs
    accommodation: Number,   // Total accommodation costs
    activities: Number,      // Total activities costs
    food: Number,            // Estimated food costs
    miscellaneous: Number,   // Extra/buffer amount
    total: Number            // Total estimated cost
  },
  travelTips: [String],      // Travel tips for the destination
  weatherForecast: [{
    date: Date,              // Date for forecast
    condition: String,       // Weather condition
    temperature: {
      high: Number,          // High temperature
      low: Number            // Low temperature
    }
  }]
}

The 'Flight', 'Hotel', 'LocalTransport', 'Attraction', and 'Itinerary' sections must match the following schema templates exactly:

Flight:
{
  airline: String,           // Airline name
  flightNumber: String,      // Flight number
  departure: {
    airport: String,         // Departure airport code
    terminal: String,        // Terminal information
    time: String,            // HH:MM format
    date: Date               // YYYY-MM-DD format
  },
  arrival: {
    airport: String,         // Arrival airport code
    terminal: String,        // Terminal information
    time: String,            // HH:MM format
    date: Date               // YYYY-MM-DD format
  },
  duration: String,          // Flight duration (HH:MM)
  stops: Number,             // Number of stops
  layovers: [{
    airport: String,         // Layover airport
    duration: String         // Layover duration
  }],
  price: {
    amount: Number,          // Price amount
    currency: String         // Currency code (INR, USD, etc.)
  },
  cabinClass: String,        // Class of travel
  baggageAllowance: String,  // Baggage information
  refundable: Boolean        // Is the ticket refundable
}

Hotel:
{
  name: String,              // Hotel name
  location: {
    address: String,         // Full address
    coordinates: {           // For mapping
      latitude: Number,
      longitude: Number
    },
    proximity: String        // Distance from city center or attractions
  },
  rating: {
    stars: Number,           // Hotel star rating
    userRating: Number,      // User rating (out of 5)
    reviews: Number          // Number of reviews
  },
  price: {
    amount: Number,          // Price per night
    currency: String,        // Currency code
    totalForStay: Number     // Total price for the stay
  },
  amenities: [String],       // ["pool", "spa", "gym", "restaurant", etc.]
  roomTypes: [{
    type: String,            // "deluxe", "standard", etc.
    beds: String,            // "1 king bed", "2 twin beds", etc.
    capacity: Number,        // Number of guests
    price: Number            // Price for this room type
  }],
  images: [String],          // URLs to hotel images
  availability: Boolean      // Is the hotel available for selected dates
}

LocalTransport:
{
  type: String,              // "bus", "train", "taxi", "car rental", etc.
  // For buses and trains:
  operator: String,          // Service operator name
  departure: {
    station: String,         // Departure station/terminal
    time: String,            // HH:MM format
    date: Date               // YYYY-MM-DD format
  },
  arrival: {
    station: String,         // Arrival station/terminal
    time: String,            // HH:MM format
    date: Date               // YYYY-MM-DD format
  },
  duration: String,          // Travel duration
  // For rentals:
  provider: String,          // Rental provider
  vehicle: String,           // Vehicle type/model
  pickupLocation: String,    // Where to get the vehicle
  dropoffLocation: String,   // Where to return the vehicle
  // Common fields:
  price: {
    amount: Number,          // Price amount
    currency: String         // Currency code
  },
  availability: Boolean,     // Is this option available
  features: [String]         // ["AC", "sleeper", "food", "wifi", etc.]
}

Attraction:
{
  name: String,              // Attraction name
  type: String,              // "museum", "park", "monument", etc.
  location: {
    address: String,         // Full address
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  description: String,       // Short description
  timings: {
    open: String,            // Opening time
    close: String,           // Closing time
    daysOpen: [String]       // Days when open
  },
  entryFee: {
    amount: Number,          // Fee amount
    currency: String         // Currency code
  },
  
  rating: Number,            // User rating
  estimatedTimeRequired: String, // Time needed to visit
  images: [String]           // URLs to attraction images
}

**Constraints**:
- Dates, transport modes, and accommodation should match the user input.
- The plan must stay within the given budget.
- Meals should reflect user preferences (e.g. vegetarian).
- All cost fields must include currency ('INR').
- Include realistic weather forecasts for the destination.
- Structure must be clean, valid JSON — no additional text outside of JSON.
- The LocalTransport and Flight, and accomodation must be realistic, with all the real data.

Only respond with the completed JSON document. Do not include explanations or extra commentary.
`;
}

export function getPrompt2(
  source,
  destination,
  departureDate,
  returnDate,
  travelers,
  duration,
  budgetMin,
  budgetMax,
  mealPreferences,
  arrivalTime
) {
  return `
You are a travel planning assistant. Based on the user's input, generate a complete travel itinerary that includes:

1. A day-wise itinerary covering attractions, activities, meals, transport, and accommodation.
2. A detailed budget breakdown.
3. Travel tips and weather forecast.

Return your response strictly in the following JSON format, which follows the exact structure provided below.

### USER INPUT
{
  "source": "${source}",
  "destination": "${destination}",
  "departureDate": "${departureDate}", // YYYY-MM-DD
  "returnDate": "${returnDate}", // YYYY-MM-DD
  "travelers": ${travelers},
  "duration": ${duration},
  "budget": {"min": ${budgetMin}, "max": ${budgetMax}},
  "preferences": {
    "mealPreferences": ${JSON.stringify(mealPreferences)},
  }
}

### RETURN THE ITINERARY IN THIS STRUCTURE:
{
  overview: {
    source: String,          // Starting point
    destination: String,     // Destination
    duration: Number,        // Trip duration in days
    totalBudget: {
      amount: Number,        // Total estimated cost
      currency: String       // Currency code
    },
    startDate: Date,         // YYYY-MM-DD format
    endDate: Date            // YYYY-MM-DD format
  },
  itinerary: [{
    day: Number,             // Day number
    date: Date,              // Date for this day
    location: String         // The place where the traveler is on that day
    activities: [{
      time: String,          // Time for activity
      description: String,   // What to do
      location: String,      // Where to go
      coordinates: {
        lat: Number,         // Exact latitude of the location till 6 decimal places
        long: Number         // Exact longitude of the location till 6 decimal places
      },
      cost: {
        amount: Number,
        currency: String
      },
      duration: String,      // How long it takes
      notes: String          // Additional information
    }],
  }],
  budgetBreakdown: {
    transportation: Number,  // Total transport costs
    accommodation: Number,   // Total accommodation costs
    activities: Number,      // Total activities costs
    food: Number,            // Estimated food costs
    miscellaneous: Number,   // Extra/buffer amount
    total: Number            // Total estimated cost
  },
  travelTips: [String],      // Travel tips for the destination
  weatherForecast: [{
    date: Date,              // Date for forecast
    condition: String,       // Weather condition 
    temperature: {
      high: Number,          // High temperature
      low: Number            // Low temperature
    }
  }]
}

The 'Attraction', and 'Itinerary' sections must match the following schema templates exactly:

Attraction:
{
  name: String,              // Attraction name
  type: String,              // "museum", "park", "monument", etc.
  location: {
    address: String,         // Full address
    coordinates: {
      latitude: Number,      // Proper latitude of the location
      longitude: Number      // Proper longitude of the location
    }
  },
  description: String,       // Short description
  timings: {
    open: String,            // Opening time
    close: String,           // Closing time
    daysOpen: [String]       // Days when open
  },
  entryFee: {
    amount: Number,          // Fee amount
    currency: String         // Currency code
  },
  rating: Number,            // User rating
  estimatedTimeRequired: String, // Time needed to visit
  images: [String]           // URLs to attraction images
}

**Constraints**:
- The plan must stay within the given budget.
- All cost fields must include currency ('INR').
- Include realistic weather forecasts for the destination.
- Structure must be clean, valid minified JSON — no additional text outside of JSON.
- All the latitude and longitude coordinates must be of the accurate location and have 6 digits after decimal
- The itinerary should not contain any activity regarding the inbound and outbound
- The itinerary of the first day must start after ${arrivalTime} time, as the user lands to the destination at that time

Only respond with the completed minified JSON document. Do not include explanations or extra commentary.
`;
}


export const travelImageCategories = [
    { category: "Nature", url: "https://www.pixelstalk.net/wp-content/uploads/2016/06/Nature-Wallpaper.jpg" },
    { category: "Beaches", url: "https://www.traveloffpath.com/wp-content/uploads/2023/05/These-Are-6-Of-The-Worlds-Top-Beaches-resized.jpg" },
    { category: "Mountains", url: "https://images.hdqwalls.com/download/mountain-range-blue-5k-yf-3840x2160.jpg" },
    { category: "Cityscape", url: "https://images.hdqwalls.com/wallpapers/cityscape-colorful-buildings-2m.jpg" },
    { category: "Cultural Heritage", url: "https://tse2.mm.bing.net/th?id=OIP.E0bE9TEcXZFaEhfuoNxG0gHaE8&pid=Api&P=0&h=180" },
    { category: "Adventure Sports", url: "https://tse4.mm.bing.net/th?id=OIP.iL_bok76nXuQ8gLh0He9rgHaE8&pid=Api&P=0&h=180" },
    { category: "Food & Cuisine", url: "https://tse4.mm.bing.net/th?id=OIP.8j3vOHM5HGL6RlsAFlA3bgHaFD&pid=Api&P=0&h=180" },
    { category: "Wildlife", url: "https://tse1.mm.bing.net/th?id=OIP.9xkyJ_Sl7KsvzLQcwDyZhAHaE7&pid=Api&P=0&h=180" },
    { category: "Nightlife", url: "https://tse2.mm.bing.net/th?id=OIP.6m7mdTkbr210Gi3NZM85-AHaE7&pid=Api&P=0&h=180" },
    { category: "Lakes & Rivers", url: "https://tse2.mm.bing.net/th?id=OIP.pKA631Xr0d2e4dZBwGrp6QHaEK&pid=Api&P=0&h=180" },
    { category: "Deserts", url: "https://tse3.mm.bing.net/th?id=OIP.FRuW6GZJxYmyJpLDp_YncQHaE6&pid=Api&P=0&h=180" },
    { category: "Forests", url: "https://tse2.mm.bing.net/th?id=OIP.17lWCrtrBK638gH7CcdlzAHaE8&pid=Api&P=0&h=180" },
    { category: "Historical Sites", url: "https://www.worldatlas.com/r/w1200/upload/39/92/9f/shutterstock-382653559.jpg" },
    { category: "Luxury Resorts", url: "https://tse3.mm.bing.net/th?id=OIP.FLi0tFDHC26xbwqXQ3dcRgHaEf&pid=Api&P=0&h=180" },
    { category: "Islands", url: "https://a.cdn-hotels.com/gdcs/production140/d960/a59ead52-dddb-42ad-920d-8ce493f8db96.jpg" },
    { category: "Road Trips", url: "https://source.unsplash.com/featured/?roadtrip,car" },
    { category: "Waterfalls", url: "https://source.unsplash.com/featured/?waterfall" },
    { category: "Temples & Religious Sites", url: "https://source.unsplash.com/featured/?temple,church,mosque" },
    { category: "Winter & Snow", url: "https://source.unsplash.com/featured/?snow,winter" },
    { category: "Camping Sites", url: "https://source.unsplash.com/featured/?camping,tent" }
  ];
  



export function getPrompt3(
  source,
  destination,
  departureDate,
  returnDate,
  travelers,
  duration,
  budgetMin,
  budgetMax,
  mealPreferences,
  arrivalTime
) {
  return `
You are a professional travel agent. Based on the user's request, create a detailed travel itinerary in strict JSON format.

Adjust currency to Indian Rupees (₹) for all costs.

Show cost values with the proper currency symbol according to the source country. Example: "₹1500"

Assume the traveler prefers non-vegetarian meals.

Include accurate weather conditions for each day in the weather field.

Assign days of the week (e.g., "Monday", "Tuesday") to each day in the plan.

Provide verifiable data — real place names, 
For each destination or stop, select an image URL based on its category from the following travelImageCategories list

${JSON.stringify(travelImageCategories, null, 2)}


Include sustainable alternatives (if available) for any activity, but only where meaningful.

The ecoScore should be out of 100.
### USER INPUT
{
  "source": "${source}",
  "destination": "${destination}",
  "departureDate": "${departureDate}", // YYYY-MM-DD
  "returnDate": "${returnDate}", // YYYY-MM-DD
  "travelers": ${travelers},
  "duration": ${duration},
  "budget": {"min": ${budgetMin}, "max": ${budgetMax}},
  "preferences": {
    "mealPreferences": ${JSON.stringify(mealPreferences)}
  }
}

### RETURN THE ITINERARY IN THIS STRUCTURE:
{
  "title": "[TRIP_TITLE]", // Example: "Goa Getaway for Two"
  "destination": "[DESTINATION_CITY], [DESTINATION_COUNTRY]", // Example: "Goa, India"
  "dates": "[START_DATE_FORMATTED]-[END_DATE_FORMATTED], [YEAR]", // Example: "20th April-25th April, 2025"
  "duration": "[NUMBER_OF_DAYS] days", // Example: "6 days"
  "startDate": "[YEAR]-[MONTH]-[DAY]", // Example: "2025-04-20"
  "endDate": "[YEAR]-[MONTH]-[DAY]", // Example: "2025-04-25"
  "image": "/placeholder.svg?height=400&width=600",
  "ecoScore": [ECO_SCORE_NUMBER], // Example: 3 (rate from 1-10 based on sustainability)
  "emergencyContact": {
    "name": "[EMERGENCY_CONTACT_NAME]", // Example: "Local Tourism Office"
    "phone": "[EMERGENCY_CONTACT_PHONE]", // Example: "+91-XXXX-XXXXXX"
    "email": "[EMERGENCY_CONTACT_EMAIL]" // Example: "emergency@example.com"
  },
  "travelDetails": {
    "departureFlight": {
      "airline": "[AIRLINE_NAME]", // Example: "IndiGo"
      "flightNumber": "[FLIGHT_CODE]", // Example: "6E 123"
      "departure": "[YEAR]-[MONTH]-[DAY]T[HOUR]:[MINUTE]:[SECOND]", // Example: "2025-04-20T08:00:00"
      "arrival": "[YEAR]-[MONTH]-[DAY]T[HOUR]:[MINUTE]:[SECOND]", // Example: "2025-04-20T09:15:00"
      "from": "${source} Airport, ${source}", // Uses the provided source
      "to": "[ARRIVAL_AIRPORT], ${destination}, [ARRIVAL_COUNTRY]" // Example: "Dabolim Airport, Goa, India"
    },
    "returnFlight": {
      "airline": "[AIRLINE_NAME]", // Example: "SpiceJet"
      "flightNumber": "[FLIGHT_CODE]", // Example: "SG 456"
      "departure": "[YEAR]-[MONTH]-[DAY]T[HOUR]:[MINUTE]:[SECOND]", // Example: "2025-04-25T18:00:00"
      "arrival": "[YEAR]-[MONTH]-[DAY]T[HOUR]:[MINUTE]:[SECOND]", // Example: "2025-04-25T19:15:00"
      "from": "[DEPARTURE_AIRPORT], ${destination}, [DEPARTURE_COUNTRY]", // Example: "Dabolim Airport, Goa, India"
      "to": "${source} Airport, ${source}" // Uses the provided source
    },
    "localTransport": {
      "mode": "[TRANSPORT_MODE]", // Example: "Pre-booked Taxi/Scooter Rentals"
      "details": "[TRANSPORT_DETAILS]" // Example: "Arrange for a pre-booked taxi from the airport to your accommodation."
    }
  },
  "accommodation": {
    "name": "[ACCOMMODATION_NAME]", // Example: "The Park Calangute Goa"
    "address": "[ACCOMMODATION_ADDRESS]", // Example: "Lane Opposite Calangute Mall, Calangute, Bardez, Goa 403516, India"
    "checkIn": "${departureDate}", // Uses the provided departure date
    "checkOut": "${returnDate}", // Uses the provided return date
    "amenities": ["[AMENITY_1]", "[AMENITY_2]", "[AMENITY_3]"] // Example: ["Swimming Pool", "Free Wi-Fi", "Restaurant"]
  },
  "estimatedCost": {
    "flights": "$[COST_FLIGHTS]", // Example: "$250"
    "accommodation": "$[COST_ACCOMMODATION]", // Example: "$400"
    "activities": "$[COST_ACTIVITIES]", // Example: "$150"
    "meals": "$[COST_MEALS]", // Example: "$200"
    "transport": "$[COST_TRANSPORT]", // Example: "$100"
    "misc": "$[COST_MISC]", // Example: "$50"
    "total": "$[COST_TOTAL]" // Example: "$1150"
  },
  "packingSuggestions": [
    "[PACKING_ITEM_1]", // Example: "Light cotton clothes"
    "[PACKING_ITEM_2]", // Example: "Swimwear"
    "[PACKING_ITEM_3]", // Example: "Sunscreen (high SPF)"
    "[PACKING_ITEM_4]", // Example: "Hat or cap"
    "[PACKING_ITEM_5]", // Example: "Sunglasses"
    "[PACKING_ITEM_6]", // Example: "Comfortable footwear"
    "[PACKING_ITEM_7]", // Example: "Insect repellent"
    "[PACKING_ITEM_8]" // Example: "Basic toiletries"
  ],
  "days": [
    {
      "day": 1,
      "date": "${departureDate}", // Uses the provided departure date
      "weather": "[WEATHER_CONDITION]", // Example: "Rainy or Sunny" in one Word 
      "activities": [
        {
          "time": "[HOUR]:[MINUTE]", // Example: "09:15"
          "title": "[ACTIVITY_TITLE]", // Example: "Arrival in Goa & Transfer to Calangute"
          "description": "[ACTIVITY_DESCRIPTION]", // Example: "Arrive at Dabolim Airport. Meet your pre-booked taxi and transfer to hotel."
          "location": "[ACTIVITY_LOCATION]", // Example: "Dabolim Airport (GOI) to Calangute"
          "lat": [LATITUDE], // Example: 15.5523
          "long": [LONGITUDE], // Example: 73.7518
          "cost": "$[ACTIVITY_COST]", // Example: "$30"
          "sustainableAlternative": null
        },
        {
          "time": "[HOUR]:[MINUTE]", // Example: "14:00"
          "title": "[ACTIVITY_TITLE]", // Example: "Relax at Beach"
          "description": "[ACTIVITY_DESCRIPTION]", // Example: "Spend the afternoon relaxing on the beach."
          "location": "[ACTIVITY_LOCATION]", // Example: "Calangute Beach, Goa"
          "lat": [LATITUDE], // Example: 15.5523
          "long": [LONGITUDE], // Example: 73.7518
          "cost": "$[ACTIVITY_COST]", // Example: "$0"
          "sustainableAlternative": {
            "title": "[ALTERNATIVE_TITLE]", // Example: "Nature Walk"
            "description": "[ALTERNATIVE_DESCRIPTION]", // Example: "Take a guided nature walk to learn about local ecosystems"
            "cost": "$[ALTERNATIVE_COST]", // Example: "$15"
            "ecoImpact": "[ECO_IMPACT_DESCRIPTION]" // Example: "Supports conservation education while reducing beach crowding"
          }
        }
      ]
    }
  ]
}

**Constraints**:
- The plan must stay within the given budget.
- All cost fields must include dollar amounts ('$').
- Include realistic weather conditions for the destination.
- Structure must be clean, valid minified JSON — no additional text outside of JSON.
- The itinerary of the first day must start after ${arrivalTime || '12:00'} time, as the user lands at the destination at that time.
- You should generate an appropriate ecoScore rating between 1-10 based on the sustainability of the travel options.
- Include at least one sustainable alternative for an activity each day.
- Generate a full itinerary for all days of the trip, following the format of the first day example.

### EXAMPLE ITINERARY (For a trip to Goa, India):
{
  "title": "Goa Getaway for Two",
  "destination": "Goa, India",
  "dates": "20th April-25th April, 2025",
  "duration": "6 days",
  "startDate": "2025-04-20",
  "endDate": "2025-04-25",
  "image": "/placeholder.svg?height=400&width=600",
  "ecoScore": 3,
  "emergencyContact": {
    "name": "Inform your emergency contact",
    "phone": "+91-XXXX-XXXXXX",
    "email": "emergency@example.com"
  },
  "travelDetails": {
    "departureFlight": {
      "airline": "IndiGo",
      "flightNumber": "6E XXX",
      "departure": "2025-04-20T08:00:00",
      "arrival": "2025-04-20T09:15:00",
      "from": "Mumbai Airport, Mumbai",
      "to": "Dabolim Airport, Goa, India"
    },
    "returnFlight": {
      "airline": "SpiceJet",
      "flightNumber": "SG YYY",
      "departure": "2025-04-25T18:00:00",
      "arrival": "2025-04-25T19:15:00",
      "from": "Dabolim Airport, Goa, India",
      "to": "Mumbai Airport, Mumbai"
    },
    "localTransport": {
      "mode": "Pre-booked Taxi/Scooter Rentals",
      "details": "Arrange for a pre-booked taxi from the airport to your accommodation. Consider renting scooters for local travel."
    }
  },
  "accommodation": {
    "name": "The Park Calangute Goa",
    "address": "Lane Opposite Calangute Mall, Calangute, Bardez, Goa 403516, India",
    "checkIn": "2025-04-20",
    "checkOut": "2025-04-25",
    "amenities": [
      "Swimming Pool",
      "Free Wi-Fi",
      "Restaurant",
      "Bar",
      "Spa",
      "Beach Access"
    ]
  },
  "estimatedCost": {
    "flights": "$250",
    "accommodation": "$400",
    "activities": "$150",
    "meals": "$200",
    "transport": "$100",
    "misc": "$50",
    "total": "$1150"
  },
  "packingSuggestions": [
    "Light cotton clothes",
    "Swimwear",
    "Sunscreen (high SPF)",
    "Hat or cap",
    "Sunglasses",
    "Comfortable footwear",
    "Insect repellent",
    "Basic toiletries"
  ],
  "days": [
    {
      "day": 1,
      "date": "2025-04-20",
      "weather": "Sunny and Rainy",
      "activities": [
        {
          "time": "09:15",
          "title": "Arrival in Goa & Transfer to Calangute",
          "description": "Arrive at Dabolim Airport (GOI). Meet your pre-booked taxi and transfer to The Park Calangute in North Goa. Check in and freshen up.",
          "location": "Dabolim Airport (GOI) to Calangute",
          "lat": 15.5523,
          "long": 73.7518,
          "cost": "$30",
          "sustainableAlternative": null
        },
        {
          "time": "14:00",
          "title": "Relax at Calangute Beach",
          "description": "Spend the afternoon relaxing on the famous Calangute Beach. Enjoy the sun, sand, and sea.",
          "location": "Calangute Beach, Goa",
          "lat": 15.5523,
          "long": 73.7518,
          "cost": "$0",
          "sustainableAlternative": null
        },
        {
          "time": "19:00",
          "title": "Dinner at a Beach Shack",
          "description": "Enjoy fresh seafood and local Goan cuisine at one of the many beach shacks along Calangute Beach.",
          "location": "Calangute Beach Shacks",
          "lat": 15.5523,
          "long": 73.7518,
          "cost": "$30",
          "sustainableAlternative": {
            "title": "Dinner at Local Family Restaurant",
            "description": "Dine at a family-owned restaurant that sources ingredients locally and supports the community",
            "cost": "$25",
            "ecoImpact": "Reduces waste from commercial establishments and supports local economy"
          }
        }
      ]
    }
  ]
}

Only respond with the completed minified JSON document. Do not include explanations or extra commentary.
`;
}
