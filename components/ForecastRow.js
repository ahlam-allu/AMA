"use client";

import { motion } from "framer-motion";

export default function ForecastRow({ daily }) {
    if (!daily) return null;

    // daily object contains arrays: time[], weather_code[], temperature_2m_max[], temperature_2m_min[]
    // We need to slice or map them.

    const days = daily.time.slice(0, 7).map((dateStr, i) => {
        return {
            date: new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short' }),
            max: Math.round(daily.temperature_2m_max[i]),
            min: Math.round(daily.temperature_2m_min[i]),
            code: daily.weather_code[i]
        };
    });

    return (
        <div className="w-full">
            <h3 className="text-xl font-bold mb-4 dark:text-white">7-Day Forecast</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {days.map((day, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{day.date}</span>
                        {/* Simple icon logic based on code implies we'd usually use an icon lib mapping here. For now, simple text or generic icon */}
                        <div className="text-sky-500 font-bold text-lg mb-2">{/* Icon placeholder or weather code mapped */}
                            {day.code <= 3 ? '☀️' : day.code <= 60 ? '☁️' : '🌧️'}
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-lg font-bold dark:text-white">{day.max}°</span>
                            <span className="text-sm text-gray-400">{day.min}°</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
