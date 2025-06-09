import {
  Lightbulb,
  Info,
  Cloud,
  Compass,
  MapPin,
  Route,
  Utensils,
  CheckSquare,
  Clock,
  DollarSign,
  Users,
  Settings,
} from "lucide-react"
import Link from "next/link"

export default function Sidebar() {
  return (
    <aside className="w-80 border-r border-[#1a1f2e] flex flex-col">
      <div className="p-4 border-b border-[#1a1f2e]">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 bg-blue-500 rounded-full flex items-center justify-center">
              <MapPin className="text-white" size={20} />
            </div>
          </div>
          <div>
            <div className="font-bold text-xl text-white">Travel</div>
            <div className="font-bold text-xl text-white flex items-center">
              Planner<span className="text-blue-500 ml-1">AI</span>
            </div>
          </div>
        </Link>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Your Plan</h2>
          <nav className="space-y-2">
            <SidebarItem icon={<Lightbulb size={18} />} label="Your Imagination" />
            <SidebarItem icon={<Info size={18} />} label="About the Place" active />
            <SidebarItem icon={<Cloud size={18} />} label="Weather" />
            <SidebarItem icon={<Compass size={18} />} label="Top Activities" />
            <SidebarItem icon={<MapPin size={18} />} label="Top places to visit" />
            <SidebarItem icon={<Route size={18} />} label="Itinerary" />
            <SidebarItem icon={<Utensils size={18} />} label="Local Cuisines" />
            <SidebarItem icon={<CheckSquare size={18} />} label="Packing Checklist" />
            <SidebarItem icon={<Clock size={18} />} label="Best time to visit" />
          </nav>
        </div>

        <div className="p-4 border-t border-[#1a1f2e]">
          <h2 className="text-xl font-bold mb-4">Control Center</h2>
          <nav className="space-y-2">
            <SidebarItem icon={<DollarSign size={18} />} label="Expense Tracker" />
            <SidebarItem icon={<Users size={18} />} label="Collaborate" />
            <SidebarItem icon={<Settings size={18} />} label="Settings" />
          </nav>
        </div>
      </div>
    </aside>
  )
}

function SidebarItem({ icon, label, active = false }) {
  return (
    <Link
      href="#"
      className={`flex items-center gap-3 px-2 py-2 rounded-md transition-colors ${
        active ? "text-white" : "text-gray-400 hover:text-white hover:bg-[#1a1f2e]"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  )
}
