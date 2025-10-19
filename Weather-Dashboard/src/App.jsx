import { useState, useEffect } from "react";
import { LocationSearch } from "./components/LocationSearch";
import { CloudSun } from "lucide-react";
import { ForecastCard } from "./components/ForcastCard";
import { WeatherCard } from "./components/current-weather";
import { PlantingRecommendation } from "./components/PlantinRecommendation";


const API_KEY = "0e9a7e9b1981f479308e4e72fe0cfea6";

export default function App() {
  const [location, setLocation] = useState("San Francisco");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Fetch live weather data when location changes
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError("");

        // 🌍 1. Get latitude & longitude of location
        const geoRes = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`
        );
        const geoData = await geoRes.json();
        if (!geoData || geoData.length === 0) {
          throw new Error("Location not found");
        }
        const { lat, lon } = geoData[0];

        // 🌦 2. Fetch weather and 7-day forecast
        const weatherRes = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly,alerts&appid=${API_KEY}`
        );
        const data = await weatherRes.json();

        // ✅ Validate data before accessing
        if (!data.current || !data.daily) {
          throw new Error("Weather data unavailable");
        }

        // 🛠 3. Format data to match UI components
        const formatted = {
          current: {
            temperature: Math.round(data.current.temp),
            condition: data.current.weather?.[0]?.description || "N/A",
            humidity: data.current.humidity,
            windSpeed: data.current.wind_speed,
            visibility: (data.current.visibility || 0) / 1000, // km
            pressure: data.current.pressure,
          },
          forecast: data.daily.slice(0, 7).map((day) => ({
            date: new Date(day.dt * 1000).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            }),
            day: new Date(day.dt * 1000).toLocaleDateString("en-US", {
              weekday: "short",
            }),
            high: Math.round(day.temp.max),
            low: Math.round(day.temp.min),
            condition: day.weather?.[0]?.main || "N/A",
            precipitation: Math.round((day.pop || 0) * 100),
          })),
        };

        setWeatherData(formatted);
      } catch (err) {
        setError(err.message || "Error fetching weather data");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location]);

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="text-center space-y-4 py-8">
          <div className="flex items-center justify-center gap-3">
            <CloudSun className="w-12 h-12 text-blue-600" />
            <h1 className="text-4xl text-gray-900">Weather & Planting Forecast</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get live weather forecasts and smart planting suggestions based on real data.
          </p>
          <div className="flex justify-center pt-4">
            <LocationSearch
              onLocationChange={handleLocationChange}
              currentLocation={location}
            />
          </div>
        </div>

        {/* LOADING & ERROR */}
        {loading && <p className="text-center text-gray-500">Loading data...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* WEATHER DISPLAY */}
        {weatherData && (
          <>
            <WeatherCard
              temperature={weatherData.current.temperature}
              condition={weatherData.current.condition}
              humidity={weatherData.current.humidity}
              windSpeed={weatherData.current.windSpeed}
              visibility={weatherData.current.visibility}
              pressure={weatherData.current.pressure}
              location={location}
            />

            <div className="grid lg:grid-cols-2 gap-6">
              <ForecastCard forecast={weatherData.forecast} />
              <PlantingRecommendation
                forecast={weatherData.forecast}
                currentTemp={weatherData.current.temperature}
              />
            </div>
          </>
        )}

        {/* FOOTER */}
        <div className="text-center text-sm text-gray-500 py-4">
          <p>Powered by OpenWeatherMap – now using live weather data.</p>
        </div>
      </div>
    </div>
  );
}
