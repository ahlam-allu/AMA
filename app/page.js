import Link from "next/link";
import { ArrowRight, CloudLightning } from "lucide-react";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[85vh] text-center px-4 overflow-hidden">

      {/* Modern Background Effects (Aurora/Blobs) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-400/30 rounded-full blur-[100px] -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] -z-10 animate-pulse-slower"></div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="bg-white/80 dark:bg-sky-900/30 backdrop-blur-xl p-8 rounded-full mb-8 shadow-2xl ring-1 ring-sky-100 dark:ring-sky-800 animate-bounce-slow">
          <CloudLightning size={72} className="text-sky-500" strokeWidth={1.5} />
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 dark:text-white drop-shadow-sm">
          Weather, <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">Perfected.</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mb-12 leading-relaxed font-light">
          Experience the most professional and modern weather tracking for <span className="font-semibold text-sky-600 dark:text-sky-400">Sri Lanka</span> and beyond.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
          <Link
            href="/dashboard"
            className="group flex items-center justify-center gap-3 px-10 py-5 text-lg font-bold text-white bg-gradient-to-r from-sky-500 to-blue-600 rounded-full hover:scale-105 transition-all shadow-xl shadow-sky-500/30"
          >
            Get Started
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/login"
            className="flex items-center justify-center gap-3 px-10 py-5 text-lg font-bold text-gray-700 bg-white dark:bg-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-105 transition-all shadow-md"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
