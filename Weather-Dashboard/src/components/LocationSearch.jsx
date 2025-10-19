import React, { useEffect, useState, useRef } from 'react'
import { MapPin, Search, X } from 'lucide-react'
import { searchCities } from '../Services/WeatherApi';

function LocationSearch({ onSearch, onLocationSearch, loading }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  const searchRef = useRef(null);

  // ✅ Hide suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Fetch suggestions when typing
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length > 2) {
        setSearchLoading(true);
        try {
          const result = await searchCities(query);
          setSuggestions(result || []);
          setShowSuggestions(true);
        } catch (err) {
          console.error("Search Failed:", err);
        } finally {
          setSearchLoading(false);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery("");
      setShowSuggestions(false);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (city) => {
    const cityName = city.state ? `${city.name}, ${city.state}` : city.name;
    onSearch(cityName);
    setQuery("");
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full max-w-2xl" ref={searchRef}>
      <form className="relative" onSubmit={handleSubmit}>
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter the city name"
            className="w-full pl-12 pr-24 p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-300 hover:bg-white/15"
          />

          {/* ✅ Clear button */}
          {query && (
            <button
              type="button"
              className="absolute right-14 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-1 rounded-full hover:bg-white/10"
              onClick={clearSearch}
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* ✅ Location button */}
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-1 rounded-full hover:bg-white/10"
            onClick={onLocationSearch}
            disabled={loading}
          >
            <MapPin className="w-5 h-5" />
          </button>
        </div>
      </form>

      {/* ✅ Show dropdown only if needed */}
      {showSuggestions && (suggestions.length > 0 || searchLoading) && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-50">
          {searchLoading ? (
            <div className="p-6 text-center text-white/70">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-white/30 border-t-white mx-auto"></div>
              <p>Searching cities...</p>
            </div>
          ) : (
            suggestions.map((city, index) => (
              <button
                key={`${city.name}-${city.country}-${index}`}
                className="w-full px-6 py-4 flex justify-between items-center hover:bg-white/20 border-b border-white/10 last:border-b-0 text-white text-left"
                onClick={() => handleSuggestionClick(city)}
              >
                <span>
                  {city.name}
                  {city.state && <span>, {city.state}</span>}
                </span>
                <span className="text-sm text-white/60">{city.country}</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default LocationSearch;
