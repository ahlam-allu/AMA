"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { Cloud, Menu, X, User } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const pathname = usePathname();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get("/api/user/profile");
                setUser(res.data);
            } catch (error) {
                setUser(null);
            }
        };
        fetchUser();
    }, [pathname]);

    return (
        <nav className="fixed w-full z-50 top-0 start-0 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Cloud className="text-sky-500" size={32} strokeWidth={2.5} />
                    <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-white tracking-tight">
                        AMA Weather
                    </span>
                </Link>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                >
                    <span className="sr-only">Open main menu</span>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Desktop Menu */}
                <div
                    className={`${isOpen ? "block" : "hidden"
                        } w-full md:block md:w-auto`}
                    id="navbar-default"
                >
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:border-gray-700 items-center">
                        <li>
                            <Link
                                href="/"
                                className="block py-2 px-3 text-white bg-sky-500 rounded md:bg-transparent md:text-sky-500 md:p-0 dark:text-white md:dark:text-sky-400"
                                aria-current="page"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/dashboard"
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-sky-500 md:p-0 dark:text-white md:dark:hover:text-sky-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/about"
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-sky-500 md:p-0 dark:text-white md:dark:hover:text-sky-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >
                                About
                            </Link>
                        </li>
                        <li className="flex items-center md:ml-4 gap-4 mt-4 md:mt-0">
                            <ThemeToggle />
                        </li>
                        <li className="mt-4 md:mt-0">
                            {user ? (
                                <Link href="/profile" className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-sky-500">
                                        {user.image ? (
                                            <img src={user.image} alt="User" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                                <User size={20} className="text-gray-500" />
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            ) : (
                                <Link href="/login" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-sky-600 rounded-lg hover:bg-sky-700 focus:ring-4 focus:ring-sky-300 dark:bg-sky-600 dark:hover:bg-sky-700 focus:outline-none dark:focus:ring-sky-800 transition-colors">
                                    <User size={16} />
                                    Login
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
