
import { CloudSun } from 'lucide-react'
import './App.css'
import Search from './components/LocationSearch'
import { WeatherCard } from './components/current-weather';

function App() {

  const handleOnSearchChange = (searchData) => {
    console.log(searchData);
  }
  

  return (
    <div class=' min-h-screen bg-gradient-to-br from-blue-50 to-green-50'>
      <div class='max-w-7xl mx-auto space-y-6'>
        {/* ================= HEADER SECTION ============= */}
        <div className="text-center space-y-4 py-8">
          <div className="flex items-center justigy-center gap-3">
            <CloudSun className="w-12 h-12 text-blue-600" />
            <h1 className='text-4xl'>Weather Forecast</h1>
          </div>
          {/* app discription */}
          <p className="text-mutedd-forground max-w-2xl mx-auto">Get weather forcasts and intelligent planting recommendation based on upcoming weather conditions.</p>
          <Search onSearchChange={handleOnSearchChange} />
          <WeatherCard />

        </div>

      </div>

    </div>
  )
}

export default App
