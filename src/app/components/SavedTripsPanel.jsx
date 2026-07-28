import { useState } from "react";
import { X, Trash2, Edit2, Check, ExternalLink, MapPin, Calendar } from "lucide-react";
export default function SavedTripsPanel({ trips, onLoad, onDelete, onRename, onClose }) {
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const startEdit = (trip) => {
    setEditingId(trip.id);
    setEditName(trip.name);
  };
  const commitEdit = () => {
    if (editingId && editName.trim()) onRename(editingId, editName.trim());
    setEditingId(null);
  };
  return <>
      <div className="fixed inset-0 bg-black/40 dark:bg-black/60 z-40 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-slate-900 shadow-2xl z-50 flex flex-col">
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100 dark:border-slate-700">
          <div>
            <h3 className="text-stone-800 dark:text-slate-100" style={{ fontFamily: "'Playfair Display', serif" }}>
              Saved Trips
            </h3>
            <p className="text-xs text-stone-400 dark:text-slate-500">{trips.length} saved itinerar{trips.length === 1 ? "y" : "ies"}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-stone-400 hover:text-stone-600 dark:text-slate-500 dark:hover:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-800 transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {trips.length === 0 && <div className="text-center py-16 text-stone-400 dark:text-slate-500">
              <MapPin size={32} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">No saved trips yet.</p>
              <p className="text-xs mt-1">Generate an itinerary and click "Save Trip".</p>
            </div>}

          {trips.map((trip) => <div key={trip.id} className="rounded-xl border border-stone-100 dark:border-slate-700 p-4 hover:border-amber-300 dark:hover:border-amber-700 transition-colors group">
              {editingId === trip.id ? <div className="flex gap-2 mb-3">
                  <input
    value={editName}
    onChange={(e) => setEditName(e.target.value)}
    onKeyDown={(e) => e.key === "Enter" && commitEdit()}
    className="flex-1 px-3 py-1.5 text-sm rounded-lg border border-amber-300 dark:border-amber-600 bg-white dark:bg-slate-800 text-stone-800 dark:text-slate-100 focus:outline-none"
    autoFocus
  />
                  <button onClick={commitEdit} className="p-1.5 rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition-colors">
                    <Check size={14} />
                  </button>
                </div> : <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="text-stone-800 dark:text-slate-200 leading-snug">{trip.name}</h4>
                  <button onClick={() => startEdit(trip)} className="p-1 text-stone-300 dark:text-slate-600 hover:text-amber-500 transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0">
                    <Edit2 size={13} />
                  </button>
                </div>}

              <div className="flex items-center gap-3 text-xs text-stone-400 dark:text-slate-500 mb-3">
                <span className="flex items-center gap-1"><MapPin size={10} />{trip.itinerary.destination}</span>
                <span className="flex items-center gap-1"><Calendar size={10} />{trip.itinerary.durationDays}d</span>
                <span>{new Date(trip.savedAt).toLocaleDateString()}</span>
              </div>

              <div className="flex gap-2">
                <button
    onClick={() => {
      onLoad(trip.itinerary);
      onClose();
    }}
    className="flex-1 flex items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white py-1.5 rounded-lg text-xs transition-colors"
  >
                  <ExternalLink size={12} /> Load Trip
                </button>
                <button
    onClick={() => onDelete(trip.id)}
    className="p-1.5 rounded-lg border border-stone-200 dark:border-slate-600 text-stone-400 hover:text-red-500 hover:border-red-300 dark:hover:border-red-700 transition-colors"
  >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>)}
        </div>
      </div>
    </>;
}
