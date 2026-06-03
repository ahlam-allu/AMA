"use client";

import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun, Laptop } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-full p-1 border border-gray-200 dark:border-gray-700">
            <button
                onClick={() => setTheme("light")}
                className={`p-2 rounded-full transition-all ${theme === "light"
                        ? "bg-white text-sky-500 shadow-md"
                        : "text-gray-500 hover:text-sky-500"
                    }`}
                aria-label="Light Mode"
            >
                <Sun size={18} />
            </button>
            <button
                onClick={() => setTheme("system")}
                className={`p-2 rounded-full transition-all ${theme === "system"
                        ? "bg-white dark:bg-gray-600 text-sky-500 shadow-md"
                        : "text-gray-500 hover:text-sky-500"
                    }`}
                aria-label="System Mode"
                title="System"
            >
                <Laptop size={18} />
            </button>
            <button
                onClick={() => setTheme("dark")}
                className={`p-2 rounded-full transition-all ${theme === "dark"
                        ? "bg-gray-700 text-sky-400 shadow-md"
                        : "text-gray-500 hover:text-sky-400"
                    }`}
                aria-label="Dark Mode"
            >
                <Moon size={18} />
            </button>
        </div>
    );
}
