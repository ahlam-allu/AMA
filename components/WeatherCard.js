"use client";

import { CloudRain, Droplets, Wind, Thermometer, Calendar } from "lucide-react";

export default function WeatherCard({ current, location }) {
    if (!current) {
        return (
            <div className="w-full h-64 bg-gray-100 dark:bg-gray-800 rounded-3xl animate-pulse"></div>
        )
    }

    // Map weather codes to descriptions/icons (Simplified)
    const getWeatherDesc = (code) => {
        // 0: Clear, 1-3: Partly Cloudy, 45,48: Fog, 51-55: Drizzle, 61-65: Rain, 71-77: Snow, 80-82: Showers, 95: Thunderstorm
        if (code === 0) return "Clear Sky";
        if (code <= 3) return "Partly Cloudy";
        if (code <= 48) return "Foggy";
        if (code <= 67) return "Rainy";
        if (code <= 77) return "Snowy";
        if (code <= 82) return "Showers";
        if (code >= 95) return "Thunderstorm";
        return "Unknown";
    };

    const code = current.weather_code;
    const temp = current.temperature_2m;
    const condition = getWeatherDesc(code);

    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-sky-400 to-sky-600 dark:from-sky-700 dark:to-sky-900 rounded-[2rem] p-8 text-white shadow-2xl hover:scale-[1.01] transition-transform duration-300">
            {/* Background Decor */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-sky-300/20 rounded-full blur-2xl"></div>

            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
                <div>
                    <div className="flex items-center gap-2 mb-2 opacity-90">
                        <Calendar size={18} />
                        <span className="text-sm font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
                    </div>
                    <h2 className="text-3xl font-bold tracking-wide mb-1">{location}</h2>
                    <p className="text-sky-100 text-lg">{condition}</p>

                    <div className="mt-8">
                        <div className="text-8xl font-black tracking-tighter drop-shadow-lg">
                            {Math.round(temp)}°
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                    <div className="flex flex-col items-center p-3">
                        <Wind className="mb-2 opacity-80" size={24} />
                        <span className="text-sm opacity-70">Wind</span>
                        <span className="text-lg font-bold">{current.wind_speed_10m} km/h</span>
                    </div>
                    <div className="flex flex-col items-center p-3">
                        <Droplets className="mb-2 opacity-80" size={24} />
                        <span className="text-sm opacity-70">Humidity</span>
                        <span className="text-lg font-bold">{current.relative_humidity_2m}%</span>
                    </div>
                    <div className="flex flex-col items-center p-3 col-span-2">
                        <CloudRain className="mb-2 opacity-80" size={24} />
                        <span className="text-sm opacity-70">Precipitation</span>
                        <span className="text-lg font-bold">{current.precipitation} mm</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
