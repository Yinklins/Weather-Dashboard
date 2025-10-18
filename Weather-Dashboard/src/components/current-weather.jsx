import { Cloud, Droplets, Wind, Eye, Gauge } from "lucide-react";

export function WeatherCard({
  temperature,
  condition,
  humidity,
  windSpeed,
  visibility,
  pressure,
  location,
}) {
  return (
    // Custom card container
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      {/* ========== CARD HEADER ========== */}
      <h2 className="text-2xl mb-6 text-gray-900">
        Current Weather - {location}
      </h2>
      
      {/* ========== MAIN TEMPERATURE DISPLAY ========== */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Cloud className="w-16 h-16 text-blue-500" />
          <div>
            <div className="text-5xl text-gray-900">{temperature}°C</div>
            <p className="text-gray-600">{condition}</p>
          </div>
        </div>
      </div>

      {/* ========== WEATHER METRICS GRID ========== */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* HUMIDITY */}
        <div className="flex items-center gap-2">
          <Droplets className="w-5 h-5 text-blue-400" />
          <div>
            <p className="text-sm text-gray-500">Humidity</p>
            <p className="text-gray-900">{humidity}%</p>
          </div>
        </div>

        {/* WIND SPEED */}
        <div className="flex items-center gap-2">
          <Wind className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500">Wind Speed</p>
            <p className="text-gray-900">{windSpeed} km/h</p>
          </div>
        </div>

        {/* VISIBILITY */}
        <div className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-purple-400" />
          <div>
            <p className="text-sm text-gray-500">Visibility</p>
            <p className="text-gray-900">{visibility} km</p>
          </div>
        </div>

        {/* PRESSURE */}
        <div className="flex items-center gap-2">
          <Gauge className="w-5 h-5 text-orange-400" />
          <div>
            <p className="text-sm text-gray-500">Pressure</p>
            <p className="text-gray-900">{pressure} hPa</p>
          </div>
        </div>
      </div>
    </div>
  );
}
