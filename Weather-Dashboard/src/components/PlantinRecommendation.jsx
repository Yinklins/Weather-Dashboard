import { Sprout, AlertTriangle, CheckCircle, Info } from "lucide-react";

export function PlantingRecommendation({ forecast, currentTemp }) {
  /**
   * WEATHER ANALYSIS ENGINE
   * =======================
   * Analyzes 7-day forecast + current temperature for planting suitability
   */
  const analyzePlantingConditions = () => {
    const avgTemp =
      forecast.reduce((sum, day) => sum + day.high, 0) / forecast.length;
    const minTemp = Math.min(...forecast.map((day) => day.low));
    const maxPrecipitation = Math.max(
      ...forecast.map((day) => day.precipitation)
    );

    // Use current temperature intelligently
    const tooColdToday = currentTemp < 5;
    const tooHotToday = currentTemp > 32;

    let status = "good";
    let recommendations = [];
    let warnings = [];

    // Frost risk
    if (minTemp < 5) {
      status = "poor";
      warnings.push(
        "Frost risk detected in the next 7 days. Avoid planting tender seedlings."
      );
    }

    // Low temperature today
    if (tooColdToday) {
      status = "poor";
      warnings.push("Today's temperature is too cold for planting.");
    } else if (minTemp < 10) {
      status = status === "poor" ? "poor" : "caution";
      warnings.push("Cool temperatures ahead. Consider hardy plants only.");
    }

    // High temperature today
    if (tooHotToday) {
      status = status === "poor" ? "poor" : "caution";
      warnings.push(
        "Today's weather is very hot. Water plants thoroughly if planting."
      );
    }

    // Rain analysis
    if (maxPrecipitation > 70) {
      status = status === "poor" ? "poor" : "caution";
      warnings.push("Heavy rain expected. Soil may become waterlogged.");
    } else if (maxPrecipitation < 20) {
      recommendations.push("Low rainfall expected. Plan for regular watering.");
    }

    // Ideal conditions
    if (avgTemp >= 15 && avgTemp <= 25 && !tooColdToday) {
      recommendations.push("Ideal temperature range for most crops.");
    }

    if (status === "good") {
      recommendations.push("Weather is favorable for planting.");
      recommendations.push("Great time to sow seeds and transplant seedlings.");
    }

    return {
      status,
      avgTemp,
      minTemp,
      maxPrecipitation,
      currentTemp,
      recommendations,
      warnings,
    };
  };

  const analysis = analyzePlantingConditions();

  /**
   * Get status badge styling
   */
  const getStatusStyle = () => {
    switch (analysis.status) {
      case "good":
        return "bg-green-500 text-white";
      case "caution":
        return "bg-yellow-500 text-white";
      case "poor":
        return "bg-red-500 text-white";
    }
  };

  /**
   * Get status icon
   */
  const getStatusIcon = () => {
    switch (analysis.status) {
      case "good":
        return <CheckCircle className="w-5 h-5" />;
      case "caution":
        return <Info className="w-5 h-5" />;
      case "poor":
        return <AlertTriangle className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl flex items-center gap-2 text-gray-900">
          <Sprout className="w-6 h-6 text-green-600" />
          Planting Recommendations
        </h2>

        <span
          className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${getStatusStyle()}`}
        >
          {getStatusIcon()}
          {analysis.status.toUpperCase()}
        </span>
      </div>

      {/* Weather Summary */}
      <div className="grid grid-cols-4 gap-3 p-4 bg-gray-50 rounded-lg">
        <div>
          <p className="text-sm text-gray-500">Current Temp</p>
          <p className="text-gray-900">{analysis.currentTemp}°C</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Avg Temp</p>
          <p className="text-gray-900">{analysis.avgTemp.toFixed(1)}°C</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Min Temp</p>
          <p className="text-gray-900">{analysis.minTemp}°C</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Max Rain</p>
          <p className="text-gray-900">{analysis.maxPrecipitation}%</p>
        </div>
      </div>

      {/* Warnings */}
      {analysis.warnings.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="flex items-center gap-2 text-orange-600">
            <AlertTriangle className="w-4 h-4" />
            Warnings
          </h4>
          {analysis.warnings.map((w, i) => (
            <div
              key={i}
              className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800"
            >
              {w}
            </div>
          ))}
        </div>
      )}

      {/* Recommendations */}
      {analysis.recommendations.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="flex items-center gap-2 text-green-600">
            <CheckCircle className="w-4 h-4" />
            Recommendations
          </h4>
          <ul className="space-y-2">
            {analysis.recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2" />
                <p className="text-sm flex-1 text-gray-700">{rec}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
