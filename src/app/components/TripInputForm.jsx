import { useState } from "react";
import { Plane, MapPin } from "lucide-react";
const STYLES = ["Solo", "Couple", "Family", "Friends", "Adventure"];
const INTERESTS = ["History", "Food", "Nightlife", "Nature", "Shopping", "Culture", "Art", "Sports"];
const TRANSPORTS = ["Flight", "Train", "Road Trip", "Walking"];
const REQUIREMENTS = ["Vegetarian", "Wheelchair Accessible", "Pet Friendly", "Kid Friendly"];
const HOTELS = ["Luxury", "Boutique", "Hostel", "Resort", "Apartment"];
const BUDGETS = ["Budget", "Mid-range", "Luxury"];
function Chip({ label, selected, onClick }) {
  return <button
    type="button"
    onClick={onClick}
    className={`px-3 py-1.5 rounded-full text-sm border transition-all ${selected ? "bg-amber-500 border-amber-500 text-white" : "border-stone-200 dark:border-slate-600 text-stone-600 dark:text-slate-400 hover:border-amber-400 hover:text-amber-700 dark:hover:border-amber-600 dark:hover:text-amber-400"}`}
  >
      {label}
    </button>;
}
export default function TripInputForm({ onSubmit, isLoading, initialDestination = "", initialFreeText = "" }) {
  const [destination, setDestination] = useState(initialDestination);
  const [duration, setDuration] = useState(5);
  const [budget, setBudget] = useState("Mid-range");
  const [maxBudget, setMaxBudget] = useState(1500);
  const [style, setStyle] = useState("Solo");
  const [interests, setInterests] = useState(["Food", "Culture"]);
  const [transport, setTransport] = useState("Flight");
  const [requirements, setRequirements] = useState([]);
  const [hotel, setHotel] = useState("Boutique");
  const [freeText, setFreeText] = useState(initialFreeText);
  const toggleInterest = (val) => setInterests((prev) => prev.includes(val) ? prev.filter((x) => x !== val) : [...prev, val]);
  const toggleReq = (val) => setRequirements((prev) => prev.includes(val) ? prev.filter((x) => x !== val) : [...prev, val]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!destination.trim()) return;
    onSubmit({ destination: destination.trim(), duration, budget, maxBudget, style, interests, transport, requirements, hotel, freeText });
  };
  return <form
    onSubmit={handleSubmit}
    className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-stone-100 dark:border-slate-700 p-8 max-w-3xl mx-auto"
  >
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
          <MapPin size={20} className="text-amber-600" />
        </div>
        <div>
          <h2 className="text-stone-800 dark:text-slate-100" style={{ fontFamily: "'Playfair Display', serif" }}>
            Plan Your Trip
          </h2>
          <p className="text-sm text-stone-400 dark:text-slate-500">Fill in the details and let AI do the rest</p>
        </div>
      </div>

      <div className="space-y-6">
        {
    /* Destination */
  }
        <div>
          <label className="block text-sm text-stone-600 dark:text-slate-400 mb-1.5">Destination *</label>
          <input
    type="text"
    value={destination}
    onChange={(e) => setDestination(e.target.value)}
    placeholder="e.g. Tokyo, Japan"
    required
    className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-slate-600 bg-stone-50 dark:bg-slate-700 text-stone-800 dark:text-slate-100 placeholder-stone-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
  />
        </div>

        {
    /* Duration + Budget */
  }
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-stone-600 dark:text-slate-400 mb-1.5">Duration (days)</label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setDuration((d) => Math.max(1, d - 1))}
                className="w-9 h-9 rounded-xl border border-stone-200 dark:border-slate-600 text-stone-600 dark:text-slate-400 hover:border-amber-400 hover:text-amber-600 transition flex items-center justify-center text-lg font-light"
              >−</button>
              <span className="flex-1 text-center text-stone-800 dark:text-slate-100 font-medium">{duration} {duration === 1 ? "day" : "days"}</span>
              <button
                type="button"
                onClick={() => setDuration((d) => Math.min(14, d + 1))}
                className="w-9 h-9 rounded-xl border border-stone-200 dark:border-slate-600 text-stone-600 dark:text-slate-400 hover:border-amber-400 hover:text-amber-600 transition flex items-center justify-center text-lg font-light"
              >+</button>
            </div>
          </div>
          <div>
            <label className="block text-sm text-stone-600 dark:text-slate-400 mb-1.5">Budget Level</label>
            <div className="flex gap-2">
              {BUDGETS.map((b) => <button
                key={b}
                type="button"
                onClick={() => setBudget(b)}
                className={`flex-1 py-2 rounded-xl text-sm border transition-all ${budget === b ? "bg-amber-500 border-amber-500 text-white" : "border-stone-200 dark:border-slate-600 text-stone-600 dark:text-slate-400 hover:border-amber-400"}`}
              >
                {b}
              </button>)}
            </div>
          </div>
          <div>
            <label className="block text-sm text-stone-600 dark:text-slate-400 mb-1.5">Trip Budget Amount ($)</label>
            <input
              type="number"
              min="10"
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              placeholder="e.g. 1500"
              className="w-full px-4 py-2 rounded-xl border border-stone-200 dark:border-slate-600 bg-stone-50 dark:bg-slate-700 text-stone-800 dark:text-slate-100 placeholder-stone-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
            />
          </div>
        </div>

        {
    /* Travel Style */
  }
        <div>
          <label className="block text-sm text-stone-600 dark:text-slate-400 mb-2">Travel Style</label>
          <div className="flex flex-wrap gap-2">
            {STYLES.map((s) => <Chip key={s} label={s} selected={style === s} onClick={() => setStyle(s)} />)}
          </div>
        </div>

        {
    /* Interests */
  }
        <div>
          <label className="block text-sm text-stone-600 dark:text-slate-400 mb-2">Interests</label>
          <div className="flex flex-wrap gap-2">
            {INTERESTS.map((i) => <Chip key={i} label={i} selected={interests.includes(i)} onClick={() => toggleInterest(i)} />)}
          </div>
        </div>

        {
    /* Transport + Hotel */
  }
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-stone-600 dark:text-slate-400 mb-2">Transportation</label>
            <div className="flex flex-wrap gap-2">
              {TRANSPORTS.map((t) => <Chip key={t} label={t} selected={transport === t} onClick={() => setTransport(t)} />)}
            </div>
          </div>
          <div>
            <label className="block text-sm text-stone-600 dark:text-slate-400 mb-2">Hotel Preference</label>
            <div className="flex flex-wrap gap-2">
              {HOTELS.map((h) => <Chip key={h} label={h} selected={hotel === h} onClick={() => setHotel(h)} />)}
            </div>
          </div>
        </div>

        {
    /* Special Requirements */
  }
        <div>
          <label className="block text-sm text-stone-600 dark:text-slate-400 mb-2">Special Requirements</label>
          <div className="flex flex-wrap gap-2">
            {REQUIREMENTS.map((r) => <Chip key={r} label={r} selected={requirements.includes(r)} onClick={() => toggleReq(r)} />)}
          </div>
        </div>

        {
    /* Free text */
  }
        <div>
          <label className="block text-sm text-stone-600 dark:text-slate-400 mb-1.5">Describe your dream trip</label>
          <textarea
    value={freeText}
    onChange={(e) => setFreeText(e.target.value)}
    rows={4}
    placeholder="e.g. A romantic cherry blossom trip with temple visits and authentic ramen in quiet back-street restaurants…"
    className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-slate-600 bg-stone-50 dark:bg-slate-700 text-stone-800 dark:text-slate-100 placeholder-stone-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent resize-none transition"
  />
        </div>
      </div>

      <button
    type="submit"
    disabled={isLoading || !destination.trim()}
    className="mt-8 w-full flex items-center justify-center gap-3 bg-amber-500 hover:bg-amber-600 disabled:bg-stone-200 dark:disabled:bg-slate-600 disabled:text-stone-400 dark:disabled:text-slate-400 text-white py-4 rounded-2xl transition-all font-medium shadow-md hover:shadow-amber-200 dark:hover:shadow-amber-900/40 hover:-translate-y-0.5 active:translate-y-0 disabled:translate-y-0 disabled:shadow-none"
  >
        <Plane size={18} />
        {isLoading ? "Generating Your Itinerary\u2026" : "Generate My Itinerary \u2708\uFE0F"}
      </button>
    </form>;
}
