import { useState } from "react";
import { Globe, Sun, User, Plus, Bell, Settings, Leaf as LeafIcon, TrendingUp, ChevronRight, Star } from "lucide-react";

export default function Provider() {
  const [notifications, setNotifications] = useState(3);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b sticky top-0 z-50 bg-white/80 backdrop-blur-md">
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
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Globe className="w-5 h-5" />
              <span className="sr-only">Change Language</span>
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Sun className="w-5 h-5" />
              <span className="sr-only">Toggle Theme</span>
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white">
                  {notifications}
                </span>
              )}
              <span className="sr-only">Notifications</span>
            </button>
            <div className="relative">
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
                <div className="px-4 py-2 text-sm font-medium text-gray-700">My Account</div>
                <div className="border-t border-gray-100"></div>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <div className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </div>
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <div className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </div>
                </a>
                <div className="border-t border-gray-100"></div>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <span>Log out</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Welcome, Mountain Eco Tours</h1>
            <p className="text-gray-500">Local Guide • Kathmandu, Nepal</p>
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center">
            <Plus className="mr-2 h-4 w-4" /> Add New Service
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="pb-2">
              <div className="text-sm font-medium text-gray-500">Eco-Score</div>
            </div>
            <div className="mt-2">
              <div className="flex items-center">
                <div className="mr-2 text-2xl font-bold">92</div>
                <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +4%
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Your eco-score is higher than 85% of providers</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="pb-2">
              <div className="text-sm font-medium text-gray-500">Bookings</div>
            </div>
            <div className="mt-2">
              <div className="flex items-center">
                <div className="mr-2 text-2xl font-bold">24</div>
                <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12%
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">8 upcoming, 16 completed this month</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="pb-2">
              <div className="text-sm font-medium text-gray-500">Revenue</div>
            </div>
            <div className="mt-2">
              <div className="flex items-center">
                <div className="mr-2 text-2xl font-bold">$3,240</div>
                <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +18%
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">$1,200 pending, $2,040 paid out</p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-gray-100/50 rounded-lg p-1 inline-flex">
            <button className="px-4 py-2 rounded-md bg-white text-green-700 shadow-sm">
              Services
            </button>
            <button className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100">
              Bookings
            </button>
            <button className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100">
              Insights
            </button>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ServiceCard
                title="Himalayan Eco Trek"
                description="3-day guided trek through pristine mountain trails with minimal environmental impact"
                price="$120"
                image="/placeholder.svg?height=400&width=600"
                rating={4.8}
                reviews={32}
                ecoScore={94}
                status="active"
              />
              <ServiceCard
                title="Local Village Tour"
                description="Full-day cultural immersion in traditional Nepali villages, supporting local communities"
                price="$65"
                image="/placeholder.svg?height=400&width=600"
                rating={4.9}
                reviews={47}
                ecoScore={96}
                status="active"
              />
              <ServiceCard
                title="Sustainable Farming Experience"
                description="Learn organic farming techniques from local farmers in the Kathmandu Valley"
                price="$45"
                image="/placeholder.svg?height=400&width=600"
                rating={4.7}
                reviews={18}
                ecoScore={98}
                status="draft"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function ServiceCard({
  title,
  description,
  price,
  image,
  rating,
  reviews,
  ecoScore,
  status,
}) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="relative h-48">
        <img src={image || "/placeholder.svg"} alt={title} className="object-cover w-full h-full" />
        <div className="absolute top-3 right-3 bg-green-500 text-white text-sm font-medium px-2 py-1 rounded-full flex items-center">
          <LeafIcon className="w-3 h-3 mr-1" />
          {ecoScore}
        </div>
        {status === "draft" && (
          <div className="absolute top-3 left-3 bg-amber-100 text-amber-800 text-xs font-medium px-2 py-1 rounded-full">
            Draft
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold">{title}</h3>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>
        <p className="text-sm text-gray-500 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <div className="font-semibold">
            {price} <span className="text-sm text-gray-500 font-normal">/ person</span>
          </div>
          <div className="text-sm text-gray-500">{reviews} reviews</div>
        </div>
      </div>
      <div className="p-4 flex gap-2 border-t">
        <button className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-50">
          Edit
        </button>
        <button className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-md px-4 py-2 text-sm font-medium">
          Manage
        </button>
      </div>
    </div>
  );
}

function BookingItem({
  name,
  service,
  date,
  guests,
  status,
  amount,
}) {
  const statusColors = {
    confirmed: "bg-green-100 text-green-800",
    pending: "bg-amber-100 text-amber-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg bg-white">
      <div className="flex-1">
        <div className="font-medium">{name}</div>
        <div className="text-sm text-gray-500">{service}</div>
      </div>
      <div className="flex-1 hidden md:block">
        <div className="text-sm">{date}</div>
        <div className="text-sm text-gray-500">{guests} guests</div>
      </div>
      <div className="flex items-center gap-4">
        <div className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[status]}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
        <div className="font-medium">{amount}</div>
        <button className="p-1 rounded-full hover:bg-gray-100">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}