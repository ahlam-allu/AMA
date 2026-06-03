"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
    theme: "system",
    setTheme: (theme) => { },
});

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("system");

    useEffect(() => {
        // Initial load
        const savedTheme = localStorage.getItem("theme") || "system";
        setTheme(savedTheme);
        applyTheme(savedTheme);
    }, []);

    const applyTheme = (newTheme) => {
        const root = window.document.documentElement;
        const isDark =
            newTheme === "dark" ||
            (newTheme === "system" &&
                window.matchMedia("(prefers-color-scheme: dark)").matches);

        if (isDark) {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    };

    const updateTheme = (newTheme) => {
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        applyTheme(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme: updateTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
