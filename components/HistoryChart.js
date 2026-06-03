"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function HistoryChart({ history }) {
    if (!history) return null;

    // Transform data for Recharts
    // daily object: time[], temperature_2m_max[], temperature_2m_min[]
    // We generally have 30 items or more.

    const data = history.time.map((date, i) => ({
        date: new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
        avg: Math.round((history.temperature_2m_max[i] + history.temperature_2m_min[i]) / 2),
        max: history.temperature_2m_max[i],
        min: history.temperature_2m_min[i]
    }));

    return (
        <div className="w-full bg-white dark:bg-gray-900 rounded-[2rem] p-6 shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="mb-6">
                <h3 className="text-xl font-bold dark:text-white">Past 30 Days Trend</h3>
                <p className="text-sm text-gray-500">Temperature History</p>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                        <XAxis
                            dataKey="date"
                            tick={{ fontSize: 12 }}
                            tickLine={false}
                            axisLine={false}
                            minTickGap={30}
                        />
                        <YAxis
                            tick={{ fontSize: 12 }}
                            tickLine={false}
                            axisLine={false}
                            unit="°"
                            domain={['auto', 'auto']}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="avg"
                            stroke="#0ea5e9"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorTemp)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
