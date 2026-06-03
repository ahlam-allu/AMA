import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { CloudRain, Droplets, Wind, Calendar } from "lucide-react-native";
import clsx from "clsx";

export default function WeatherCard({ current, location }) {
    if (!current) {
        return (
            <View className="w-full h-64 bg-gray-100 dark:bg-gray-800 rounded-3xl" />
        );
    }

    // Map weather codes to descriptions (consistent with web)
    const getWeatherDesc = (code) => {
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
        <LinearGradient
            colors={['#38bdf8', '#0284c7']} // sky-400 to sky-600 approx
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="w-full rounded-[2rem] p-8 shadow-2xl relative overflow-hidden"
        >
            {/* Background Decor - utilizing opacity views */}
            <View className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
            <View className="absolute bottom-0 left-0 w-32 h-32 bg-sky-300/20 rounded-full" />

            <View className="z-10 flex-col gap-8">
                <View>
                    <View className="flex-row items-center gap-2 mb-2 opacity-90">
                        <Calendar size={18} color="white" />
                        <Text className="text-white text-sm font-medium">
                            {new Date().toLocaleDateString("en-US", {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                            })}
                        </Text>
                    </View>
                    <Text className="text-white text-3xl font-bold tracking-wide mb-1">
                        {location}
                    </Text>
                    <Text className="text-sky-100 text-lg">{condition}</Text>

                    <View className="mt-8">
                        <Text className="text-white text-8xl font-black tracking-tighter shadow-lg">
                            {Math.round(temp)}°
                        </Text>
                    </View>
                </View>

                {/* Stats Grid */}
                <View className="flex-row flex-wrap gap-4 bg-white/10 p-4 rounded-2xl border border-white/10">
                    <View className="flex-1 items-center p-2 min-w-[100px]">
                        <Wind className="mb-2 opacity-80" size={24} color="white" />
                        <Text className="text-white text-sm opacity-70">Wind</Text>
                        <Text className="text-white text-lg font-bold">
                            {current.wind_speed_10m} km/h
                        </Text>
                    </View>
                    <View className="flex-1 items-center p-2 min-w-[100px]">
                        <Droplets className="mb-2 opacity-80" size={24} color="white" />
                        <Text className="text-white text-sm opacity-70">Humidity</Text>
                        <Text className="text-white text-lg font-bold">
                            {current.relative_humidity_2m}%
                        </Text>
                    </View>
                    <View className="w-full items-center p-2 border-t border-white/10 mt-2 pt-4">
                        <CloudRain className="mb-2 opacity-80" size={24} color="white" />
                        <Text className="text-white text-sm opacity-70">Precipitation</Text>
                        <Text className="text-white text-lg font-bold">
                            {current.precipitation} mm
                        </Text>
                    </View>
                </View>
            </View>
        </LinearGradient>
    );
}
