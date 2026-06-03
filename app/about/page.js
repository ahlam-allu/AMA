"use client";

import { Cloud, Target, Star, ShieldCheck, Mail, Linkedin, Github } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="relative py-12 md:py-20 overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-sky-200/40 dark:bg-sky-900/20 rounded-full blur-[80px] -z-10 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-200/30 dark:bg-blue-900/10 rounded-full blur-[80px] -z-10 animate-pulse-slow"></div>

            <div className="max-w-4xl mx-auto space-y-16">
                {/* Hero Section */}
                <div className="text-center space-y-6">
                    <div className="inline-block p-4 bg-sky-50 dark:bg-sky-900/30 rounded-3xl mb-4">
                        <Cloud size={48} className="text-sky-500 animate-bounce-slow" strokeWidth={1.5} />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold dark:text-white">
                        About <span className="text-sky-500">AMA Weather</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-light italic">
                        "Providing precision weather updates with a premium digital experience for every citizen of Sri Lanka."
                    </p>
                </div>

                {/* Mission & Vision */}
                <div className="grid md:grid-cols-2 gap-8 px-4">
                    <div className="p-8 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl hover:scale-[1.02] transition-transform">
                        <Target className="text-sky-500 mb-4" size={32} />
                        <h2 className="text-2xl font-bold dark:text-white mb-4">Our Mission</h2>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            To deliver the most accurate, real-time weather information across Sri Lanka, empowering individuals and businesses to make informed decisions daily.
                        </p>
                    </div>
                    <div className="p-8 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl hover:scale-[1.02] transition-transform">
                        <Star className="text-blue-500 mb-4" size={32} />
                        <h2 className="text-2xl font-bold dark:text-white mb-4">Our Vision</h2>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            To be the most trusted and technologically advanced weather platform in South Asia, blending modern aesthetics with robust meteorological data.
                        </p>
                    </div>
                </div>

                {/* Features / Why Us */}
                <div className="space-y-8 px-4">
                    <h2 className="text-3xl font-bold dark:text-white text-center">Why Choose AMA Weather?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex flex-col items-center text-center p-6">
                            <ShieldCheck className="text-sky-500 mb-4" size={40} />
                            <h3 className="text-xl font-bold dark:text-white mb-2">High Precision</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">Data sourced from multiple global and local meteorological API endpoints.</p>
                        </div>
                        <div className="flex flex-col items-center text-center p-6">
                            <Cloud size={40} className="text-sky-500 mb-4" />
                            <h3 className="text-xl font-bold dark:text-white mb-2">Sri Lanka Specific</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">Hyper-local tracking for Colombo, Kandy, Galle, and every district in-between.</p>
                        </div>
                        <div className="flex flex-col items-center text-center p-6">
                            <Target size={40} className="text-sky-500 mb-4" />
                            <h3 className="text-xl font-bold dark:text-white mb-2">Modern UI</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">A seamless, distraction-free interface designed for the best user experience.</p>
                        </div>
                    </div>
                </div>

                {/* Developer Info */}
                <div className="relative p-12 bg-gradient-to-br from-sky-500/10 to-blue-600/10 dark:from-sky-900/20 dark:to-blue-900/20 rounded-[3rem] border border-sky-100 dark:border-sky-800/50 overflow-hidden mx-4">
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-sky-500/10 rounded-full blur-[80px]"></div>

                    <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                        <div className="w-40 h-40 rounded-full bg-gradient-to-r from-sky-400 to-blue-600 p-1 flex-shrink-0">
                            <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center overflow-hidden">
                                <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">
                                    AS
                                </span>
                            </div>
                        </div>
                        <div className="space-y-4 text-center md:text-left">
                            <h2 className="text-3xl font-bold dark:text-white">Meet the Developer</h2>
                            <p className="text-xl text-sky-600 dark:text-sky-400 font-semibold tracking-wide">
                                Abdhul Salam Mohammadh Ahlam
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 max-w-lg">
                                Lead Designer and Software Architect dedicated to creating beautiful, high-performance web and mobile applications that solve real-world problems.
                            </p>

                            <div className="flex justify-center md:justify-start gap-6 pt-4">
                                <a href="#" className="p-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:scale-110 transition-transform">
                                    <Linkedin size={20} className="text-sky-600" />
                                </a>
                                <a href="#" className="p-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:scale-110 transition-transform">
                                    <Github size={20} className="text-gray-800 dark:text-white" />
                                </a>
                                <a href="mailto:contact@example.com" className="p-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:scale-110 transition-transform">
                                    <Mail size={20} className="text-red-500" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
