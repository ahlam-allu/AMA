import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "AMA Weather - Sri Lanka",
  description: "Modern Professional Weather App for Sri Lanka",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen bg-white dark:bg-black transition-colors duration-300">
            <Navbar />
            <main className="flex-grow pt-20 px-4 md:px-8 max-w-7xl mx-auto w-full">
              {children}
            </main>
            <footer className="py-6 text-center text-gray-500 text-sm dark:text-gray-400 border-t border-gray-100 dark:border-gray-900">
              © 2025 AMA Weather. Designed by Abdhul Salam Mohammadh Ahlam.
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
