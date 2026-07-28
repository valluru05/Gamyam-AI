import { MapPin, Sparkles } from "lucide-react";
const EXAMPLES = [
  { label: "\u{1F338} Cherry blossom Tokyo", dest: "Tokyo", text: "A romantic spring trip to see cherry blossoms in Ueno Park, visit temples in Kyoto, and eat amazing ramen." },
  { label: "\u{1F5FC} Romantic Paris", dest: "Paris", text: "A classic Parisian getaway \u2014 Eiffel Tower, croissants, Louvre, and long walks along the Seine." },
  { label: "\u{1F334} Bali Beach & Culture", dest: "Bali", text: "A soul-restoring week in Bali \u2014 rice terraces, ancient temples, Ubud yoga retreats, and Seminyak sunsets." },
  { label: "\u{1F355} Rome in a Weekend", dest: "Rome", text: "A fast-paced 3-day Roman holiday \u2014 Colosseum, Vatican, pasta, gelato, and tossing a coin in the Trevi Fountain." }
];
export default function EmptyState({ onSelectExample }) {
  return <div className="py-20 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-50 dark:bg-amber-900/20 mb-6">
        <MapPin size={28} className="text-amber-500" />
      </div>
      <h3
    className="text-stone-700 dark:text-slate-300 mb-2"
    style={{ fontFamily: "'Playfair Display', serif" }}
  >
        Your itinerary will appear here
      </h3>
      <p className="text-stone-400 dark:text-slate-500 text-sm mb-10">
        Fill in the form above and click <strong className="text-amber-600">Generate Itinerary</strong> to get started.
      </p>

      <div className="max-w-2xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-stone-400 dark:text-slate-500 mb-4 flex items-center justify-center gap-2">
          <Sparkles size={12} /> Try an example
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {EXAMPLES.map((ex) => <button
    key={ex.label}
    onClick={() => onSelectExample(ex.dest, ex.text)}
    className="text-left p-4 rounded-xl border border-stone-200 dark:border-slate-700 hover:border-amber-400 dark:hover:border-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/10 transition-all group"
  >
              <p className="text-sm text-stone-700 dark:text-slate-300 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                {ex.label}
              </p>
              <p className="text-xs text-stone-400 dark:text-slate-500 mt-1 line-clamp-2">{ex.text}</p>
            </button>)}
        </div>
      </div>
    </div>;
}
