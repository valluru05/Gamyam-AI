import { AlertTriangle, RefreshCw } from "lucide-react";
export default function ErrorState({ error, onRetry }) {
  return <div className="flex flex-col items-center justify-center py-20 gap-6 text-center max-w-md mx-auto">
      <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
        <AlertTriangle size={28} className="text-red-500" />
      </div>
      <div>
        <h3 className="text-stone-800 dark:text-slate-200 mb-2">Something went wrong</h3>
        <p className="text-stone-500 dark:text-slate-400 text-sm leading-relaxed">{error}</p>
      </div>
      <button
    onClick={onRetry}
    className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-2.5 rounded-xl transition-colors"
  >
        <RefreshCw size={16} />
        Try Again
      </button>
    </div>;
}
