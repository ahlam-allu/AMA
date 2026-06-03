import { NextResponse } from 'next/server';
import axios from 'axios';

const WEATHER_API = process.env.NEXT_PUBLIC_WEATHER_API || 'https://api.open-meteo.com/v1';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');

    // Default to Colombo, Sri Lanka if not provided
    const latitude = lat || '6.9271';
    const longitude = lon || '79.8612';

    try {
        // Current Weather + 7 Day Forecast
        // Open-Meteo params:
        // current: temperature_2m, relative_humidity_2m, is_day, precipitation, weather_code, wind_speed_10m
        // daily: weather_code, temperature_2m_max, temperature_2m_min, sunrise, sunset
        // timezone: auto
        const forecastResponse = await axios.get(`${WEATHER_API}/forecast`, {
            params: {
                latitude,
                longitude,
                current: 'temperature_2m,relative_humidity_2m,is_day,precipitation,weather_code,wind_speed_10m',
                daily: 'weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset',
                timezone: 'auto',
            },
        });

        // 30 Day History (Approximate using past_days on forecast API if supported or archive API)
        // Open-Meteo allows `past_days` on forecast API up to 92 days.
        // We will use `past_days=30` to get history on the same call if possible, 
        // or we might need a separate call if we want "archive" data which is more accurate.
        // For simplicity and speed, we use past_days on forecast endpoint if suitable.
        // Let's checking docs... `past_days` fetches past forecast data. 
        // For actual observed history, we'd use the Archive API, but `forecast?past_days=30` is often close enough for "recent weather" logic or "what was the forecast".
        // However, the user wants "past 30 day weather condition".
        // I will use `past_days=30` on the forecast API for now. It returns the estimated past weather.
        const historyResponse = await axios.get(`${WEATHER_API}/forecast`, {
            params: {
                latitude,
                longitude,
                daily: 'weather_code,temperature_2m_max,temperature_2m_min',
                timezone: 'auto',
                past_days: 30,
                forecast_days: 0 // We strictly want history here, or we can mix.
                // Actually, let's just do one big call if possible, or separate.
                // Separate is cleaner to parse.
            }
        });

        return NextResponse.json({
            current: forecastResponse.data.current,
            daily: forecastResponse.data.daily, // This contains next 7 days
            history: historyResponse.data.daily // This contains past 30 days
        });

    } catch (error) {
        console.error('Weather API Error:', error.message);
        return NextResponse.json(
            { error: 'Failed to fetch weather data' },
            { status: 500 }
        );
    }
}
