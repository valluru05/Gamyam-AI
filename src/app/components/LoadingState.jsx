import { Plane } from "lucide-react";
import { useEffect, useState } from "react";

const MESSAGES = [
  "Crafting your perfect itinerary…",
  "Finding the best local spots…",
  "Calculating your travel budget…",
  "Mapping out day-by-day adventures…",
  "Almost ready — finalizing your trip…"
];

export default function LoadingState() {
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setMsgIdx((i) => (i + 1) % MESSAGES.length), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-24 gap-6">
      <div className="relative">
        <div className="w-20 h-20 rounded-full border-4 border-amber-100 dark:border-amber-900/30 border-t-amber-500 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Plane size={24} className="text-amber-500" />
        </div>
      </div>
      <div className="text-center">
        <p className="text-stone-700 dark:text-slate-300 text-lg font-medium">{MESSAGES[msgIdx]}</p>
        <p className="text-amber-600 dark:text-amber-400 text-sm mt-1 font-medium">
          Powered by Groq AI (llama-3.3-70b)
        </p>
      </div>
    </div>
  );
}
