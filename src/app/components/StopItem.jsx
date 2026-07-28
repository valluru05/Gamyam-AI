import { useState } from "react";
import { Trash2, MapPin, Clock, DollarSign, ChevronUp, ChevronDown, GripVertical, StickyNote } from "lucide-react";
const TYPE_COLORS = {
  food: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  sight: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  activity: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  transport: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
  lodging: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
};
const TYPE_ICONS = { food: "\u{1F37D}\uFE0F", sight: "\u{1F3DB}\uFE0F", activity: "\u{1F3AF}", transport: "\u{1F686}", lodging: "\u{1F3E8}" };
export default function StopItem({ stop, isFirst, isLast, onRemove, onNotesChange, onMoveUp, onMoveDown, onDragStart, onDragOver, onDrop, destination }) {
  const [showNotes, setShowNotes] = useState(false);
  const [dragging, setDragging] = useState(false);
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${stop.name}, ${destination}`)}`;
  return <div
    draggable
    onDragStart={(e) => {
      setDragging(true);
      onDragStart(e);
    }}
    onDragEnd={() => setDragging(false)}
    onDragOver={onDragOver}
    onDrop={onDrop}
    className={`group relative flex gap-3 p-4 rounded-xl border transition-all ${dragging ? "opacity-40 border-amber-400 bg-amber-50 dark:bg-amber-900/10" : "border-stone-100 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 hover:border-stone-200 dark:hover:border-slate-600"}`}
  >
      <div className="flex-shrink-0 cursor-grab active:cursor-grabbing text-stone-300 dark:text-slate-600 pt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <GripVertical size={16} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-start gap-2 mb-1.5">
          <span className={`text-xs px-2 py-0.5 rounded-full ${TYPE_COLORS[stop.type] ?? TYPE_COLORS.activity}`}>
            {TYPE_ICONS[stop.type]} {stop.type}
          </span>
          <h4 className="text-stone-800 dark:text-slate-200 leading-snug flex-1">{stop.name}</h4>
        </div>

        <div className="flex flex-wrap gap-3 text-xs text-stone-400 dark:text-slate-500 mb-2">
          <span className="flex items-center gap-1"><Clock size={11} />{stop.time} · {stop.durationMinutes} min</span>
          {stop.estimatedCost > 0 ? <span className="flex items-center gap-1"><DollarSign size={11} />${stop.estimatedCost}</span> : <span className="text-teal-500 dark:text-teal-400">Free</span>}
        </div>

        {stop.description && <p className="text-sm text-stone-500 dark:text-slate-400 leading-relaxed mb-2">{stop.description}</p>}

        <button
    type="button"
    onClick={() => setShowNotes((v) => !v)}
    className="text-xs text-stone-400 dark:text-slate-500 hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1 transition-colors"
  >
          <StickyNote size={11} />
          {showNotes ? "Hide notes" : stop.notes ? "View notes" : "Add notes"}
        </button>

        {showNotes && <textarea
    value={stop.notes}
    onChange={(e) => onNotesChange(e.target.value)}
    placeholder="Add personal notes for this stop…"
    rows={2}
    className="mt-2 w-full text-sm px-3 py-2 rounded-lg border border-stone-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-stone-700 dark:text-slate-300 placeholder-stone-300 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-300 resize-none transition"
  />}
      </div>

      <div className="flex-shrink-0 flex flex-col items-end gap-1">
        <a
    href={mapUrl}
    target="_blank"
    rel="noopener noreferrer"
    title="View on Google Maps"
    className="p-1.5 rounded-lg text-stone-400 dark:text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors"
  >
          <MapPin size={14} />
        </a>
        <button
    type="button"
    onClick={onMoveUp}
    disabled={isFirst}
    className="p-1.5 rounded-lg text-stone-400 dark:text-slate-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
  >
          <ChevronUp size={14} />
        </button>
        <button
    type="button"
    onClick={onMoveDown}
    disabled={isLast}
    className="p-1.5 rounded-lg text-stone-400 dark:text-slate-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
  >
          <ChevronDown size={14} />
        </button>
        <button
    type="button"
    onClick={onRemove}
    className="p-1.5 rounded-lg text-stone-400 dark:text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
  >
          <Trash2 size={14} />
        </button>
      </div>
    </div>;
}
