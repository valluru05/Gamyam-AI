import { Plane, MapPin, Compass } from "lucide-react";
export default function Hero({ onStart }) {
  return <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="absolute top-20 left-10 w-72 h-72 bg-amber-200/40 dark:bg-amber-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-200/30 dark:bg-teal-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 left-[8%] opacity-20 dark:opacity-10 rotate-12">
        <Compass size={48} className="text-amber-600" />
      </div>
      <div className="absolute top-1/3 right-[8%] opacity-20 dark:opacity-10 -rotate-12">
        <MapPin size={40} className="text-teal-600" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-amber-100 dark:bg-amber-900/40 border border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300 px-4 py-1.5 rounded-full mb-8">
          <Plane size={14} className="fill-current" />
          <span className="text-sm tracking-wide">AI-Powered Trip Planning</span>
        </div>

        <h1
    className="text-5xl md:text-7xl text-stone-900 dark:text-white mb-6 leading-tight"
    style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700 }}
  >
          Plan Your Perfect
          <br />
          <span className="text-amber-600 dark:text-amber-400 italic">Trip with AI</span>
        </h1>

        <p className="text-lg md:text-xl text-stone-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          Describe your dream destination and let Gamyam AI craft a day-by-day itinerary — complete with stops, timing, and a full budget breakdown.
        </p>

        <button
    onClick={onStart}
    className="group inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-amber-200 dark:hover:shadow-amber-900/50 hover:-translate-y-0.5 active:translate-y-0"
  >
          <Plane size={20} className="group-hover:translate-x-1 transition-transform" />
          <span className="tracking-wide">Start Planning Your Trip</span>
        </button>

        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-stone-500 dark:text-slate-400">
          {["Tokyo", "Paris", "Bali", "New York", "Rome", "London"].map((city) => <span key={city} className="flex items-center gap-1.5">
              <MapPin size={12} className="text-amber-500" />
              {city}
            </span>)}
          <span className="text-stone-400 dark:text-slate-600">& everywhere</span>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stone-400 dark:text-slate-500 animate-bounce">
        <span className="text-xs tracking-widest uppercase">Scroll to plan</span>
        <div className="w-px h-6 bg-current" />
      </div>
    </section>;
}
