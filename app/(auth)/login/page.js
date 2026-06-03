"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
    const router = useRouter();
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await axios.post("/api/auth/login", formData);
            router.push("/dashboard");
            router.refresh();
        } catch (err) {
            setError(err.response?.data?.error || "Login failed");
        }
    };

    return (
        <div className="flex justify-center items-center h-[80vh]">
            <div className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800">
                <h2 className="text-3xl font-bold mb-6 text-center dark:text-white">Welcome Back</h2>

                {error && <div className="mb-4 text-red-500 text-sm text-center">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-gray-300">Username</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-sky-500 outline-none transition-all"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-gray-300">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-sky-500 outline-none transition-all"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-sky-500/30"
                    >
                        Sign In
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-500">
                    Don't have an account? <Link href="/register" className="text-sky-500 hover:underline">Register</Link>
                </p>
            </div>
        </div>
    );
}
