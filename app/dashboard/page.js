"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Search, MapPin } from "lucide-react";
import WeatherCard from "@/components/WeatherCard";
import ForecastRow from "@/components/ForecastRow";
import HistoryChart from "@/components/HistoryChart";

export default function Dashboard() {
    const [query, setQuery] = useState("");
    const [locationName, setLocationName] = useState("Colombo, Sri Lanka");
    // Default coords for Colombo
    const [coords, setCoords] = useState({ lat: 6.9271, lon: 79.8612 });
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch Weather Function
    const fetchWeather = async (lat, lon) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get('/api/weather', {
                params: { lat, lon }
            });
            setWeatherData(res.data);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch weather data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Search Location Function
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query) return;

        try {
            // Use Open-Meteo Geocoding
            const geoRes = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=1&language=en&format=json`);

            if (geoRes.data.results && geoRes.data.results.length > 0) {
                const result = geoRes.data.results[0];
                const newCoords = { lat: result.latitude, lon: result.longitude };
                const newName = `${result.name}, ${result.country}`;

                setCoords(newCoords);
                setLocationName(newName);
                fetchWeather(newCoords.lat, newCoords.lon);
            } else {
                setError("Location not found.");
            }
        } catch (err) {
            setError("Search failed.");
        }
    };

    useEffect(() => {
        // Initial fetch
        fetchWeather(coords.lat, coords.lon);
    }, []); // Run once on mount (could add coords dependency if we wanted auto-refetch but handleSearch calls it directly)

    return (
        <div className="space-y-8 pb-10">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-xl mx-auto relative group">
                <input
                    type="text"
                    placeholder="Search city (e.g., Kandy, Galle)..."
                    className="w-full px-6 py-4 pl-12 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all text-lg group-hover:shadow-md"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sky-500 transition-colors" size={24} />
                <button type="submit" className="hidden">Search</button>
            </form>

            {/* Error Message */}
            {error && (
                <div className="text-center p-4 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="w-12 h-12 border-4 border-sky-200 border-t-sky-500 rounded-full animate-spin"></div>
                </div>
            ) : weatherData ? (
                <div className="space-y-8 animate-fade-in">
                    {/* Current Weather */}
                    <WeatherCard current={weatherData.current} location={locationName} />

                    {/* Forecast */}
                    <ForecastRow daily={weatherData.daily} />

                    {/* History */}
                    <HistoryChart history={weatherData.history} />

                </div>
            ) : null}
        </div>
    );
}
