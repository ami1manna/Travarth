import mongoose from "mongoose";

const CostSchema = new mongoose.Schema(
  {
    amount: Number,
    currency: String,
  },
  { _id: false }
);

const SustainableAlternativeSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    cost: String,
    ecoImpact: String,
  },
  { _id: false }
);

const ActivitySchema = new mongoose.Schema(
  {
    time: String,
    title: String,
    description: String,
    location: String,
    lat: String,
    long: String,
    cost: String,
    sustainableAlternative: SustainableAlternativeSchema,
  },
  { _id: false }
);

const ItineraryDaySchema = new mongoose.Schema(
  {
    day: Number,
    date: String,
    weather: String,
    activities: [ActivitySchema],
  },
  { _id: false }
);

const BudgetBreakdownSchema = new mongoose.Schema(
  {
    transportation: Number,
    accommodation: Number,
    activities: Number,
    food: Number,
    miscellaneous: Number,
    total: Number,
  },
  { _id: false }
);

const WeatherForecastSchema = new mongoose.Schema(
  {
    date: String,
    condition: String,
    temperature: {
      high: Number,
      low: Number,
    },
  },
  { _id: false }
);

const EmergencyContactSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    email: String,
  },
  { _id: false }
);

const FlightSchema = new mongoose.Schema(
  {
    airline: String,
    flightNumber: String,
    departure: String,
    arrival: String,
    from: String,
    to: String,
  },
  { _id: false }
);

const LocalTransportSchema = new mongoose.Schema(
  {
    mode: String,
    details: String,
  },
  { _id: false }
);

const TravelDetailsSchema = new mongoose.Schema(
  {
    departureFlight: FlightSchema,
    returnFlight: FlightSchema,
    localTransport: LocalTransportSchema,
  },
  { _id: false }
);

const AccommodationSchema = new mongoose.Schema(
  {
    name: String,
    address: String,
    checkIn: String,
    checkOut: String,
    amenities: [String],
  },
  { _id: false }
);

const EstimatedCostSchema = new mongoose.Schema(
  {
    flights: String,
    accommodation: String,
    activities: String,
    meals: String,
    transport: String,
    misc: String,
    total: String,
  },
  { _id: false }
);

// Main Schema
const TravelPlanSchema = new mongoose.Schema({
  title: String,
  destination: String,
  dates: String,
  duration: String,
  startDate: String,
  endDate: String,
  image: String,
  ecoScore: Number,

  emergencyContact: EmergencyContactSchema,
  travelDetails: TravelDetailsSchema,
  accommodation: AccommodationSchema,
  estimatedCost: EstimatedCostSchema,
  packingSuggestions: [String],
  days: [ItineraryDaySchema],
  budgetBreakdown: BudgetBreakdownSchema,
  weatherForecast: [WeatherForecastSchema],
  travelTips: [String],
  owner: String,
});

const TravelPlan = mongoose.model("TravelPlan", TravelPlanSchema);
export default TravelPlan;
