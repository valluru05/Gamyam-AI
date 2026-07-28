import { useState, useRef } from "react";
import { ChevronDown, ChevronUp, Plus, DollarSign } from "lucide-react";
import StopItem from "./StopItem";
const STOP_TYPES = ["sight", "food", "activity", "transport", "lodging"];
export default function DayCard({ day, destination, onRemoveStop, onAddStop, onUpdateNotes, onReorderStops, onMoveStopUp, onMoveStopDown }) {
  const [expanded, setExpanded] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStop, setNewStop] = useState({ name: "", type: "sight", time: "10:00 AM", estimatedCost: 0 });
  const dragSrcIdx = useRef(null);
  const dayTotal = day.stops.reduce((sum, s) => sum + s.estimatedCost, 0);
  const stopCount = day.stops.length;
  const handleDragStart = (e, idx) => {
    dragSrcIdx.current = idx;
    e.dataTransfer.effectAllowed = "move";
  };
  const handleDrop = (e, targetIdx) => {
    e.preventDefault();
    const src = dragSrcIdx.current;
    if (src === null || src === targetIdx) return;
    const updated = [...day.stops];
    const [moved] = updated.splice(src, 1);
    updated.splice(targetIdx, 0, moved);
    onReorderStops(updated);
    dragSrcIdx.current = null;
  };
  const handleAddStop = () => {
    if (!newStop.name.trim()) return;
    onAddStop({
      id: `${day.id}-stop-${Date.now()}`,
      name: newStop.name.trim(),
      type: newStop.type,
      time: newStop.time,
      durationMinutes: 60,
      estimatedCost: Number(newStop.estimatedCost) || 0,
      description: "",
      notes: ""
    });
    setNewStop({ name: "", type: "sight", time: "10:00 AM", estimatedCost: 0 });
    setShowAddForm(false);
  };
  return <div className="bg-white dark:bg-slate-800 rounded-2xl border border-stone-100 dark:border-slate-700 overflow-hidden">
      <button
    type="button"
    onClick={() => setExpanded((v) => !v)}
    className="w-full flex items-center gap-4 p-5 text-left hover:bg-stone-50 dark:hover:bg-slate-700 transition-colors"
  >
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
          <span className="text-amber-700 dark:text-amber-400" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 18 }}>
            {day.dayNumber}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs uppercase tracking-widest text-stone-400 dark:text-slate-500">Day {day.dayNumber}</p>
          <h3 className="text-stone-800 dark:text-slate-200 truncate" style={{ fontFamily: "'Playfair Display', serif" }}>
            {day.theme}
          </h3>
        </div>
        <div className="flex-shrink-0 flex items-center gap-3 text-sm text-stone-400 dark:text-slate-500">
          <span>{stopCount} stop{stopCount !== 1 ? "s" : ""}</span>
          {dayTotal > 0 && <span className="flex items-center gap-0.5"><DollarSign size={12} />{dayTotal}</span>}
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>

      {expanded && <div className="px-5 pb-5 space-y-3">
          <div className="relative pl-2">
            <div className="absolute left-5 top-0 bottom-0 w-px border-l-2 border-dashed border-amber-200 dark:border-amber-900/40" />
            <div className="space-y-3">
              {day.stops.map((stop, idx) => <StopItem
    key={stop.id}
    stop={stop}
    dayId={day.id}
    isFirst={idx === 0}
    isLast={idx === day.stops.length - 1}
    onRemove={() => onRemoveStop(stop.id)}
    onNotesChange={(notes) => onUpdateNotes(stop.id, notes)}
    onMoveUp={() => onMoveStopUp(stop.id)}
    onMoveDown={() => onMoveStopDown(stop.id)}
    onDragStart={(e) => handleDragStart(e, idx)}
    onDragOver={(e) => e.preventDefault()}
    onDrop={(e) => handleDrop(e, idx)}
    destination={destination}
  />)}
            </div>
          </div>

          {showAddForm ? <div className="mt-2 p-4 rounded-xl border border-dashed border-amber-300 dark:border-amber-700 bg-amber-50/50 dark:bg-amber-900/10 space-y-3">
              <p className="text-sm text-stone-600 dark:text-slate-400">Add a stop</p>
              <input
    type="text"
    value={newStop.name}
    onChange={(e) => setNewStop((p) => ({ ...p, name: e.target.value }))}
    placeholder="Stop name"
    className="w-full px-3 py-2 text-sm rounded-lg border border-stone-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-stone-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-300"
  />
              <div className="grid grid-cols-3 gap-2">
                <select
    value={newStop.type}
    onChange={(e) => setNewStop((p) => ({ ...p, type: e.target.value }))}
    className="px-3 py-2 text-sm rounded-lg border border-stone-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-stone-800 dark:text-slate-100 focus:outline-none"
  >
                  {STOP_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                <input
    type="text"
    value={newStop.time}
    onChange={(e) => setNewStop((p) => ({ ...p, time: e.target.value }))}
    placeholder="10:00 AM"
    className="px-3 py-2 text-sm rounded-lg border border-stone-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-stone-800 dark:text-slate-100 focus:outline-none"
  />
                <input
    type="number"
    value={newStop.estimatedCost}
    onChange={(e) => setNewStop((p) => ({ ...p, estimatedCost: Number(e.target.value) }))}
    placeholder="Cost $"
    className="px-3 py-2 text-sm rounded-lg border border-stone-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-stone-800 dark:text-slate-100 focus:outline-none"
  />
              </div>
              <div className="flex gap-2">
                <button onClick={handleAddStop} className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg text-sm transition-colors">Add Stop</button>
                <button onClick={() => setShowAddForm(false)} className="flex-1 border border-stone-200 dark:border-slate-600 text-stone-600 dark:text-slate-400 py-2 rounded-lg text-sm hover:bg-stone-50 dark:hover:bg-slate-700 transition-colors">Cancel</button>
              </div>
            </div> : <button
    type="button"
    onClick={() => setShowAddForm(true)}
    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-stone-200 dark:border-slate-700 text-stone-400 dark:text-slate-500 hover:border-amber-400 hover:text-amber-600 dark:hover:text-amber-400 text-sm transition-colors"
  >
              <Plus size={14} /> Add a Stop
            </button>}
        </div>}
    </div>;
}
