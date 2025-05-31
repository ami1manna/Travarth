import { Cloud, Wind, Droplets, Thermometer, ArrowDown, ArrowUp, Waves, Eye } from "lucide-react"

export default function WeatherSection() {
  return (
    <div className="bg-[#0f1320] rounded-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Cloud size={20} className="text-gray-400" />
        <h2 className="text-xl font-bold">Weather</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#151928] rounded-lg p-6">
          <div className="text-center">
            <h3 className="text-lg text-gray-400 mb-4">Goa</h3>
            <div className="flex justify-center mb-2">
              <div className="w-16 h-16 bg-gray-700 rounded-full"></div>
            </div>
            <div className="text-5xl font-bold mb-2">25°</div>
            <div className="text-gray-400">Clear Sky</div>
          </div>
        </div>

        <div className="bg-[#151928] rounded-lg p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-white">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M40 10C40 4.477 44.477 0 50 0V0C55.523 0 60 4.477 60 10V70C60 75.523 55.523 80 50 80V80C44.477 80 40 75.523 40 70V10Z"
                  fill="#FFFFFF"
                  fillOpacity="0.2"
                />
                <path
                  d="M20 30C20 24.477 24.477 20 30 20V20C35.523 20 40 24.477 40 30V70C40 75.523 35.523 80 30 80V80C24.477 80 20 75.523 20 70V30Z"
                  fill="#FFFFFF"
                  fillOpacity="0.2"
                />
                <path
                  d="M0 50C0 44.477 4.477 40 10 40V40C15.523 40 20 44.477 20 50V70C20 75.523 15.523 80 10 80V80C4.477 80 0 75.523 0 70V50Z"
                  fill="#FFFFFF"
                  fillOpacity="0.2"
                />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Wind size={16} className="text-gray-400" />
                <span className="text-sm text-gray-300">Wind Speed: 1.25 m/s</span>
              </div>
              <div className="flex items-center gap-2">
                <Wind size={16} className="text-gray-400" />
                <span className="text-sm text-gray-300">Wind Direction: 128°</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#151928] rounded-lg p-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Droplets size={16} className="text-gray-400" />
                <span className="text-sm text-gray-300">Humidity</span>
              </div>
              <span className="font-medium">74%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ArrowUp size={16} className="text-gray-400" />
                <span className="text-sm text-gray-300">Max Temperature</span>
              </div>
              <span className="font-medium">25°</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ArrowDown size={16} className="text-gray-400" />
                <span className="text-sm text-gray-300">Min Temperature</span>
              </div>
              <span className="font-medium">25°</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Thermometer size={16} className="text-gray-400" />
                <span className="text-sm text-gray-300">Feels like</span>
              </div>
              <span className="font-medium">26°</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Waves size={16} className="text-gray-400" />
                <span className="text-sm text-gray-300">Sea Level</span>
              </div>
              <span className="font-medium">1012 hPa</span>
            </div>
          </div>
        </div>

        <div className="bg-[#151928] rounded-lg p-6">
          <div className="mb-4">
            <h3 className="text-lg mb-2">Visibility</h3>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div className="flex items-center">
                  <Eye size={16} className="text-gray-400 mr-2" />
                  <span className="text-xs font-semibold inline-block text-gray-400">10km</span>
                </div>
                <div>
                  <Eye size={16} className="text-gray-400" />
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-700">
                <div
                  style={{ width: "100%" }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-white"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
