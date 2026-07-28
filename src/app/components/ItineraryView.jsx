import { Bookmark, RefreshCw, Calendar, MapPin, DollarSign } from "lucide-react";
import DayCard from "./DayCard";
import BudgetChart from "./BudgetChart";
export default function ItineraryView({ itinerary, onRemoveStop, onAddStop, onUpdateNotes, onReorderStops, onMoveStopUp, onMoveStopDown, onSave, onReset, noBudget }) {
  const spentTotal = itinerary.days.flatMap((d) => d.stops).reduce((sum, s) => sum + s.estimatedCost, 0);
  return <div className="space-y-8">
      {
    /* Trip header */
  }
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600 rounded-3xl p-8 text-white">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2
    className="text-white mb-2 leading-tight"
    style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 28 }}
  >
              {itinerary.tripTitle}
            </h2>
            <div className="flex flex-wrap gap-4 text-amber-100 text-sm">
              <span className="flex items-center gap-1.5"><MapPin size={14} /> {itinerary.destination}</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> {itinerary.durationDays} {itinerary.durationDays === 1 ? "day" : "days"}</span>
              <span className="flex items-center gap-1.5"><DollarSign size={14} /> {itinerary.estimatedBudget.currency} {itinerary.estimatedBudget.total.toLocaleString()} est.</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={onSave} className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl text-sm text-white transition-colors">
              <Bookmark size={15} /> Save Trip
            </button>
            <button onClick={onReset} className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl text-sm text-white transition-colors">
              <RefreshCw size={15} /> New Trip
            </button>
          </div>
        </div>
      </div>

      {!noBudget && <BudgetChart itinerary={itinerary} spentTotal={spentTotal} />}

      <div className="space-y-4">
        <h3 className="text-stone-700 dark:text-slate-300" style={{ fontFamily: "'Playfair Display', serif" }}>
          Your Day-by-Day Itinerary
        </h3>
        {itinerary.days.map((day) => <DayCard
    key={day.id}
    day={day}
    destination={itinerary.destination}
    onRemoveStop={(stopId) => onRemoveStop(day.id, stopId)}
    onAddStop={(stop) => onAddStop(day.id, stop)}
    onUpdateNotes={(stopId, notes) => onUpdateNotes(day.id, stopId, notes)}
    onReorderStops={(stops) => onReorderStops(day.id, stops)}
    onMoveStopUp={(stopId) => onMoveStopUp(day.id, stopId)}
    onMoveStopDown={(stopId) => onMoveStopDown(day.id, stopId)}
  />)}
      </div>
    </div>;
}
