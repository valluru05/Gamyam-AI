const COLORS = ["#f59e0b", "#14b8a6", "#6366f1", "#ec4899", "#22c55e"];
const LABELS = {
  accommodation: "Accommodation",
  food: "Food",
  transport: "Transport",
  activities: "Activities",
  shopping: "Shopping"
};

export default function BudgetChart({ itinerary, spentTotal }) {
  const { breakdown, total, currency } = itinerary.estimatedBudget;
  const entries = Object.entries(breakdown);
  
  const isOverBudget = spentTotal > total;
  const remainingOrOver = isOverBudget ? spentTotal - total : total - spentTotal;
  const pctSpent = Math.min(100, Math.round((spentTotal / total) * 100));

  const cx = 80, cy = 80, R = 60, circumference = 2 * Math.PI * R;
  let cumulative = 0;
  
  const slices = entries.map(([key, value], i) => {
    const pct = value / total;
    const dasharray = `${pct * circumference} ${circumference}`;
    const offset = circumference * (1 - cumulative);
    cumulative += pct;
    return { key, value, color: COLORS[i % COLORS.length], dasharray, offset };
  });

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-stone-100 dark:border-slate-700 p-6 space-y-6">
      <h3 className="text-stone-700 dark:text-slate-300 font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
        Budget Analysis
      </h3>

      {/* Visual comparison of budget vs spent */}
      <div className="bg-stone-50 dark:bg-slate-900/50 p-4 rounded-xl space-y-3">
        <div className="flex justify-between text-xs font-medium">
          <span className="text-stone-500 dark:text-slate-400">Total Stop-by-Stop Expenditure</span>
          <span className={`font-semibold ${isOverBudget ? "text-red-500" : "text-amber-600 dark:text-amber-400"}`}>
            {currency} {spentTotal.toLocaleString()} / {currency} {total.toLocaleString()} ({pctSpent}%)
          </span>
        </div>
        <div className="w-full bg-stone-200 dark:bg-slate-750 h-2.5 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${isOverBudget ? "bg-red-500" : "bg-amber-500"}`}
            style={{ width: `${pctSpent}%` }}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-8">
        <div className="relative flex-shrink-0">
          <svg width={160} height={160}>
            {slices.map((slice) => (
              <circle
                key={slice.key}
                cx={cx}
                cy={cy}
                r={R}
                fill="none"
                stroke={slice.color}
                strokeWidth={36}
                strokeDasharray={slice.dasharray}
                strokeDashoffset={slice.offset}
                transform={`rotate(-90 ${cx} ${cy})`}
              />
            ))}
            <text x={cx} y={cy - 6} textAnchor="middle" fill="currentColor" className="text-stone-400" style={{ fontSize: 11 }}>Total Budget</text>
            <text x={cx} y={cy + 10} textAnchor="middle" fill="currentColor" className="text-stone-700 dark:text-slate-200" style={{ fontSize: 13, fontWeight: 700 }}>
              {currency} {total.toLocaleString()}
            </text>
          </svg>
        </div>
        <div className="flex-1 w-full space-y-3">
          {slices.map((slice) => {
            const pct = Math.round((slice.value / total) * 100);
            return (
              <div key={slice.key} className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: slice.color }} />
                <span className="flex-1 text-sm text-stone-600 dark:text-slate-400">{LABELS[slice.key] ?? slice.key}</span>
                <span className="text-sm text-stone-800 dark:text-slate-200 font-mono">{currency} {slice.value.toLocaleString()}</span>
                <span className="text-xs text-stone-400 dark:text-slate-500 w-8 text-right">{pct}%</span>
              </div>
            );
          })}
          <div className="pt-3 border-t border-stone-100 dark:border-slate-700 flex items-center justify-between">
            <span className="text-sm text-stone-500 dark:text-slate-400">
              {isOverBudget ? "Over Budget" : "Remaining Budget"}
            </span>
            <span className={`text-sm font-semibold ${isOverBudget ? "text-red-500" : "text-emerald-600 dark:text-emerald-400"}`}>
              {isOverBudget ? "+" : ""}{currency} {remainingOrOver.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
