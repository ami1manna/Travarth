import { Compass, Edit2 } from "lucide-react"

export default function TopActivities() {
  const activities = [
    "Parasailing at Baga Beach",
    "Scuba Diving at Grande Island",
    "Trekking in Dudhsagar Waterfalls",
    "Water Sports at Calangute Beach",
    "Ziplining at Mayem Lake",
  ]

  return (
    <div className="bg-[#0f1320] rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Compass size={20} className="text-gray-400" />
          <h2 className="text-xl font-bold">Top activities to look for</h2>
        </div>
        <button className="text-gray-400 hover:text-white">
          <Edit2 size={18} />
        </button>
      </div>

      <ol className="list-decimal list-inside space-y-3 pl-4">
        {activities.map((activity, index) => (
          <li key={index} className="text-gray-300">
            {activity}
          </li>
        ))}
      </ol>
    </div>
  )
}
