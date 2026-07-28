import { Sun, Moon } from "lucide-react";
export default function ThemeToggle({ isDark, onToggle }) {
  return <button
    onClick={onToggle}
    aria-label="Toggle dark mode"
    className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-stone-600 dark:text-slate-300 transition-colors"
  >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>;
}
