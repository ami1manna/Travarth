import { Info, Edit2 } from "lucide-react"

export default function AboutPlace() {
  return (
    <div className="bg-[#0f1320] rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Info size={20} className="text-gray-400" />
          <h2 className="text-xl font-bold">About the Place</h2>
        </div>
        <button className="text-gray-400 hover:text-white">
          <Edit2 size={18} />
        </button>
      </div>
      <p className="text-gray-300 leading-relaxed">
        Goa, located on the western coast of India, is renowned for its stunning beaches, vibrant nightlife, and rich
        cultural heritage. Known for its Portuguese colonial architecture, visitors can explore churches and spice
        plantations. The unique fusion of Indian and Western cultures is evident in its cuisine, music, and festivals.
        Goa offers a plethora of activities ranging from water sports to yoga retreats, making it a paradise for both
        adventure seekers and relaxation enthusiasts. The laid-back atmosphere, picturesque landscapes, and warm
        hospitality of the locals contribute to its popularity as a tourist destination.
      </p>
    </div>
  )
}
