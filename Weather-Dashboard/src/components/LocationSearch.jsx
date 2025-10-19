import { MapPin, Search, LocateFixed, Loader } from "lucide-react";
import { useState } from "react";

export function LocationSearch({ onLocationChange, currentLocation }) {
  const [inputValue, setInputValue] = useState(currentLocation);
  const [loading, setLoading] = useState(false);

  // Handle manual search
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onLocationChange(inputValue.trim());
    }
  };

  // AUTO-DETECT USER LOCATION
  const detectLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // Reverse geocode (OpenWeatherMap API example)
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=YOUR_API_KEY&units=metric`
          );
          const data = await res.json();
          const cityName = data.name;

          if (cityName) {
            setInputValue(cityName);
            onLocationChange(cityName);
          } else {
            alert("Unable to detect city name.");
          }
        } catch (err) {
          console.error(err);
          alert("Error fetching location details.");
        }

        setLoading(false);
      },
      () => {
        alert("Permission denied or unable to retrieve your location.");
        setLoading(false);
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-md">
      {/* Input Box */}
      <div className="relative flex-1">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Enter location (e.g., New York, London)"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-500"
        />
      </div>

      {/* Manual Search Button */}
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
        flex items-center gap-2 transition-colors"
      >
        <Search className="w-4 h-4" />
        Search
      </button>

      {/* Auto Detect Button */}
      <button
        type="button"
        onClick={detectLocation}
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 
        flex items-center gap-2 transition-colors"
      >
        {loading ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <LocateFixed className="w-4 h-4" />
        )}
        Use My Location
      </button>
    </form>
  );
}
