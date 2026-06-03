import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import axios from "axios";
import WeatherCard from "../components/WeatherCard";
import { StatusBar } from "expo-status-bar";

// Replace with your machine's IP if testing on physical device
// For iOS Simulator, localhost is fine.
const API_URL = "http://localhost:3000/api/weather";

export default function Home() {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchWeather();
    }, []);

    const fetchWeather = async () => {
        try {
            setLoading(true);
            setError(null);
            // Default to Colombo, Sri Lanka (same as backend default)
            const response = await axios.get(API_URL);
            setWeatherData(response.data);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch weather data. Ensure backend is running.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
            <StatusBar style="auto" />
            <ScrollView contentContainerClassName="p-6 pb-20">
                <View className="mb-6">
                    <Text className="text-3xl font-bold text-gray-900 dark:text-white">
                        AMA Weather
                    </Text>
                    <Text className="text-gray-500 dark:text-gray-400">
                        Mobile Edition
                    </Text>
                </View>

                {loading ? (
                    <View className="items-center justify-center py-20">
                        <ActivityIndicator size="large" color="#0ea5e9" />
                        <Text className="mt-4 text-gray-500">Loading forecast...</Text>
                    </View>
                ) : error ? (
                    <View className="items-center justify-center py-20 bg-red-50 rounded-3xl p-6">
                        <Text className="text-red-500 text-center mb-4">{error}</Text>
                        <TouchableOpacity onPress={fetchWeather} className="bg-white px-4 py-2 rounded-xl shadow-sm">
                            <Text className="font-bold text-gray-700">Retry</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View>
                        {weatherData && (
                            <WeatherCard
                                current={weatherData.current}
                                location="Colombo, LK"
                            />
                        )}

                        {/* Future: Add daily forecast list here */}
                        {weatherData?.daily && (
                            <View className="mt-8">
                                <Text className="text-xl font-bold text-gray-800 dark:text-white mb-4">7-Day Forecast</Text>
                                {/* Placeholder for list */}
                                <Text className="text-gray-500">Coming soon in next update...</Text>
                            </View>
                        )}
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
