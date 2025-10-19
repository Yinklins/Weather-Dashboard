import { CloudRain, Cloud, Sun, CloudSnow, CloudDrizzle } from "lucide-react";

const getWeatherIcon = (condition = "") => {
  const lowerCondition = condition?.toLowerCase() || "";

  if (lowerCondition.includes("rain")) return CloudRain;
  if (lowerCondition.includes("snow")) return CloudSnow;
  if (lowerCondition.includes("drizzle")) return CloudDrizzle;
  if (lowerCondition.includes("cloud")) return Cloud;

  return Sun;
};

export function ForecastCard({ forecast = [] }) {
  if (!Array.isArray(forecast) || forecast.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h2 className="text-2xl mb-6 text-gray-900">7-Day Forecast</h2>
        <p className="text-gray-500">No forecast data available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <h2 className="text-2xl mb-6 text-gray-900">7-Day Forecast</h2>
      <div className="space-y-3">
        {forecast.map((day, index) => {
          const WeatherIcon = getWeatherIcon(day?.condition);

          return (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="w-20">
                  <p className="text-gray-900">{day?.day}</p>
                  <p className="text-sm text-gray-500">{day?.date}</p>
                </div>

                {WeatherIcon && <WeatherIcon className="w-6 h-6 text-blue-500" />}

                <p className="text-sm flex-1 text-gray-700">{day?.condition}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-gray-500">High / Low</p>
                  <p className="text-gray-900">
                    {day?.high}° / {day?.low}°
                  </p>
                </div>

                <div className="w-16 text-right">
                  <p className="text-sm text-gray-500">Rain</p>
                  <p className="text-blue-500">{day?.precipitation}%</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
