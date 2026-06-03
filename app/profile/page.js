"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, Calendar, Camera } from "lucide-react";

export default function Profile() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await axios.get("/api/user/profile");
            setUser(res.data);
            setFormData({
                age: res.data.age,
                phone: res.data.phone,
                image: res.data.image
            });
            setLoading(false);
        } catch (err) {
            console.error(err);
            if (err.response?.status === 401) {
                router.push("/login");
            } else {
                setError("Failed to load profile");
                setLoading(false);
            }
        }
    };

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
        setSuccess("");
        try {
            const res = await axios.put("/api/user/profile", formData);
            setUser(res.data);
            setSuccess("Profile updated successfully");
            setEditing(false);
        } catch (err) {
            setError(err.response?.data?.error || "Update failed");
        }
    };

    if (loading) return <div className="flex justify-center items-center h-[80vh]">Loading...</div>;

    return (
        <div className="container mx-auto max-w-4xl py-12 px-4">
            <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-blue-600">
                Your Profile
            </h1>

            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row">

                {/* Left Side - Image & Basic Info */}
                <div className="md:w-1/3 p-8 bg-gradient-to-br from-sky-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 flex flex-col items-center text-center border-r border-gray-100 dark:border-gray-800">
                    <div className="relative mb-6 group">
                        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg">
                            {formData.image || user.image ? (
                                <img
                                    src={editing && formData.image ? formData.image : user.image}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                    <User size={64} className="text-gray-400" />
                                </div>
                            )}
                        </div>
                        {editing && (
                            <label className="absolute bottom-0 right-0 bg-sky-500 p-2 rounded-full cursor-pointer shadow-lg hover:bg-sky-600 transition-colors">
                                <Camera size={20} className="text-white" />
                                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                            </label>
                        )}
                    </div>

                    <h2 className="text-2xl font-bold mb-1 dark:text-white">{user.username}</h2>
                    <p className="text-gray-500 mb-4">{user.email}</p>

                    {!editing && (
                        <button
                            onClick={() => setEditing(true)}
                            className="px-6 py-2 bg-sky-500 text-white rounded-full font-semibold hover:bg-sky-600 transition-all shadow-md"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>

                {/* Right Side - Details Form */}
                <div className="md:w-2/3 p-8">
                    {success && <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-xl border border-green-200 dark:border-green-800">{success}</div>}
                    {error && <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-800">{error}</div>}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-500 mb-2">
                                    <Calendar size={16} /> Age
                                </label>
                                {editing ? (
                                    <input
                                        type="number"
                                        value={formData.age}
                                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-sky-500 outline-none"
                                    />
                                ) : (
                                    <p className="text-lg font-medium dark:text-gray-300">{user.age}</p>
                                )}
                            </div>
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-500 mb-2">
                                    <Phone size={16} /> Phone
                                </label>
                                {editing ? (
                                    <input
                                        type="text"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-sky-500 outline-none"
                                    />
                                ) : (
                                    <p className="text-lg font-medium dark:text-gray-300">{user.phone}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-500 mb-2">
                                <Mail size={16} /> Email
                            </label>
                            <p className="text-lg font-medium dark:text-gray-300 bg-gray-50 dark:bg-gray-800 px-4 py-3 rounded-xl border border-transparent">
                                {user.email}
                                {user.isVerified ? (
                                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        Verified
                                    </span>
                                ) : (
                                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                        Unverified
                                    </span>
                                )}
                            </p>
                        </div>

                        {editing && (
                            <div className="flex gap-4 mt-8 pt-4 border-t border-gray-100 dark:border-gray-800">
                                <button
                                    type="submit"
                                    className="flex-1 bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-sky-500/30"
                                >
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditing(false);
                                        setFormData({
                                            age: user.age,
                                            phone: user.phone,
                                            image: user.image
                                        });
                                    }}
                                    className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold py-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
