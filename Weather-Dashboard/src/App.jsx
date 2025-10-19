import React from 'react'
import LocationSearch from './components/LocationSearch'
import Temperature from './components/Temperature'
import Spinner from './components/Spinner'
import ErrorMessage from './components/ErrorMessage'
import WeatherCard from './components/WeatherCard'
import ForcastCard from './components/ForcastCard'
import { useWeather } from './hooks/useWeather'

function App() {
  const{
    currentWeather,
    forecast,
    loading,
    error,
    unit,
    fetchWeatherByCity,
    fetchWeatherByLocation,
    toggleUnit,
  } = useWeather ();

  return (
    <div className='bg-gray-500 h-screen relative overflow-hidden'>
      <div className="max-w7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-2xl tracking-tight">Weather<span className='bg-gradient-to-r from-blue-400 to purple-400 bg-clip-text text-transparent'>Dashboard</span></h1>
            <p className='text-white text-lg md:text-xl mb-8 max-w-2xl mx-auto'>Experience weather with realtime data</p>
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-center space-y-6 lg:space-y-0 lg:space-x-6 mb12">
            <LocationSearch 
            onSearch = {fetchWeatherByCity}
            onLocationSearch = {fetchWeatherByLocation}
            loading = {loading} 
            />
            <Temperature />
          </div>
        </div>
        {/* Main Content */}
        <div className='space-y-8'>
          {/* conditional rendering */}
          {/* {loading && (
            <div className='flex justify-center'>
          <div className='bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20'>
          <Spinner />
          <p className='text-white/80 text-center mt-4 font-medium'>
          Fetchin latest weather data...........
          </p>
          </div>
        </div>
          )} */}

          {/* Condition Rendering */}
          {/* {error && !loading && (
            <div className='max-w-2xl mx-auto'>
        <ErrorMessage />
      </div>
          )} */}

          {/* Conditional Rendering for Weather card */}
          {currentWeather && !loading && (
            <div className='grid grid-cols-1 xl:grid-cols-3 gap-8'>
            <div className='xl:col-span-2'>
              <WeatherCard />
            </div>
            <div className='xl:col-span-1'>
              {/* conditional rendering */}
              {forecast && <ForcastCard />}
            </div>
          </div>
          )}
        </div>
      </div>
    </div>

  )
}

export default App
