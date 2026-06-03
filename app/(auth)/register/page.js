"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        age: "",
        phone: "",
        image: ""
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await axios.post("/api/auth/register", formData);
            setSuccess(true);
        } catch (err) {
            setError(err.response?.data?.error || "Registration failed");
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <div className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 text-center">
                    <h2 className="text-3xl font-bold mb-4 text-green-500">Registration Successful!</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                        We have sent a verification email to <strong>{formData.email}</strong>.
                        Please check your inbox and click the link to verify your account.
                    </p>
                    <Link href="/login" className="text-sky-500 hover:underline">
                        Go to Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center py-10">
            <div className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800">
                <h2 className="text-3xl font-bold mb-6 text-center dark:text-white">Create Account</h2>

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
                        <label className="block text-sm font-medium mb-1 dark:text-gray-300">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-sky-500 outline-none transition-all"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Age</label>
                            <input
                                type="number"
                                required
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-sky-500 outline-none transition-all"
                                value={formData.age}
                                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
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
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-gray-300">Phone</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-sky-500 outline-none transition-all"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-gray-300">Profile Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-sky-500 outline-none transition-all"
                            onChange={handleImageChange}
                        />
                        {formData.image && (
                            <img src={formData.image} alt="Preview" className="mt-2 h-20 w-20 object-cover rounded-full mx-auto" />
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-sky-500/30 disabled:opacity-50"
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-500">
                    Already have an account? <Link href="/login" className="text-sky-500 hover:underline">Sign In</Link>
                </p>
            </div>
        </div>
    );
}
