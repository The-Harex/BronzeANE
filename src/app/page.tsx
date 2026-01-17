import Link from "next/link";
import { getSettings } from "@/lib/settings";

export default function Home() {
  const settings = getSettings();

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center bg-stone-950 text-white p-6 overflow-hidden">
        {/* Background Image & Vignette */}
        <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[url('/hero-map.jpg')] bg-cover bg-center opacity-60"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0c0a09_100%)]"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-yellow-600 drop-shadow-sm">
            {settings.siteName}
          </h1>
          <p className="text-xl md:text-2xl text-stone-300 mb-8 max-w-2xl mx-auto">
            {settings.siteDescription}
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link 
              href="/history" 
              className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-semibold transition shadow-lg shadow-amber-900/50"
            >
              Start Learning
            </Link>
            <Link 
              href="/library" 
              className="px-8 py-3 bg-transparent border border-amber-500 hover:bg-amber-900/30 text-amber-100 rounded-full font-semibold transition"
            >
              Browse Library
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-amber-50 text-stone-800">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <Link href="/history" className="group p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition duration-300 border border-amber-200">
            <h2 className="text-2xl font-bold mb-4 text-amber-800 group-hover:text-amber-600">History</h2>
            <p className="text-stone-600">Trace the timeline of civilization from Uruk to the late Bronze Age collapse.</p>
          </Link>
           <Link href="/religion" className="group p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition duration-300 border border-amber-200">
            <h2 className="text-2xl font-bold mb-4 text-amber-800 group-hover:text-amber-600">Religion</h2>
            <p className="text-stone-600">Explore the gods, myths, and rituals that defined the spiritual landscape.</p>
          </Link>
           <Link href="/culture" className="group p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition duration-300 border border-amber-200">
            <h2 className="text-2xl font-bold mb-4 text-amber-800 group-hover:text-amber-600">Culture</h2>
            <p className="text-stone-600">Understand the daily life, art, and societal structures of the ancients.</p>
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 bg-stone-900 text-stone-400 text-center">
        <p>&copy; {new Date().getFullYear()} Ryan Finney. Dedicated to the study of the Ancient Near East.</p>
      </footer>
    </div>
  );
}
