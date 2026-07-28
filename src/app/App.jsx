import { useState, useRef, useCallback } from "react";
import { Plane, BookMarked, Key, Check } from "lucide-react";
import Hero from "./components/Hero";
import TripInputForm from "./components/TripInputForm";
import LoadingState from "./components/LoadingState";
import ErrorState from "./components/ErrorState";
import EmptyState from "./components/EmptyState";
import ItineraryView from "./components/ItineraryView";
import SavedTripsPanel from "./components/SavedTripsPanel";
import ThemeToggle from "./components/ThemeToggle";
import { useTripPlanner } from "./hooks/useTripPlanner";
import { useSavedTrips } from "./hooks/useSavedTrips";
import { useTheme } from "./hooks/useTheme";
import { useApiKey } from "./hooks/useApiKey";

export default function App() {
  const { isDark, toggle } = useTheme();
  const { apiKey } = useApiKey();
  const { state, submitTrip, reset, loadTrip, removeStop, addStop, updateStopNotes, reorderStops, moveStopUp, moveStopDown } = useTripPlanner();
  const { savedTrips, saveTrip, deleteTrip, renameTrip } = useSavedTrips();
  const [showSaved, setShowSaved] = useState(false);
  const [lastFormData, setLastFormData] = useState(null);
  const [exampleDest, setExampleDest] = useState("");
  const [exampleText, setExampleText] = useState("");
  const formRef = useRef(null);

  const handleSubmit = useCallback(
    (data) => {
      setLastFormData(data);
      submitTrip(data, apiKey);
      setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    },
    [submitTrip, apiKey]
  );

  const handleHeroStart = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleExample = (dest, text) => {
    setExampleDest(dest);
    setExampleText(text);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  const handleSave = () => {
    if (!state.data) return;
    const name = `${state.data.destination} — ${state.data.durationDays}d`;
    saveTrip(name, state.data);
  };

  const handleReset = () => {
    reset();
    setExampleDest("");
    setExampleText("");
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-slate-950 text-stone-800 dark:text-slate-100 transition-colors">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-stone-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center shadow-sm">
              <Plane size={16} className="text-white fill-white" />
            </div>
            <div>
              <span
                className="text-stone-900 dark:text-white leading-none"
                style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 17 }}
              >
                Gamyam AI
              </span>
              <span className="hidden sm:block text-xs text-stone-400 dark:text-slate-500 leading-none">
                Your destination begins here.
              </span>
            </div>
          </div>

          {/* Nav */}
          <div className="flex items-center gap-2">

            <button
              onClick={() => setShowSaved(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm text-stone-600 dark:text-slate-400 hover:bg-stone-100 dark:hover:bg-slate-800 transition-colors"
            >
              <BookMarked size={15} />
              <span className="hidden sm:inline">Saved</span>
              {savedTrips.length > 0 && (
                <span className="bg-amber-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center leading-none">
                  {savedTrips.length}
                </span>
              )}
            </button>

            <ThemeToggle isDark={isDark} onToggle={toggle} />
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <Hero onStart={handleHeroStart} />

        {/* Plan section */}
        <section ref={formRef} className="max-w-5xl mx-auto px-4 sm:px-6 py-16 space-y-10">
          <div className="text-center">
            <p className="text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-2 font-semibold">AI Trip Planner</p>
            <h2
              className="text-stone-800 dark:text-slate-100 mb-3"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 34 }}
            >
              Where do you want to go?
            </h2>
            <p className="text-stone-500 dark:text-slate-400 max-w-md mx-auto">
              Tell us about your dream trip and <span className="text-amber-600 dark:text-amber-400 font-medium">Gamyam AI</span> will craft a personalized itinerary powered by Groq AI.
            </p>
          </div>

          {/* Form */}
          <TripInputForm
            onSubmit={handleSubmit}
            isLoading={state.status === "loading"}
            initialDestination={exampleDest}
            initialFreeText={exampleText}
            key={`${exampleDest}-${exampleText}`}
          />

          {/* Results */}
          <div>
            {state.status === "idle" && <EmptyState onSelectExample={handleExample} />}
            {state.status === "loading" && <LoadingState />}
            {state.status === "error" && (
              <ErrorState
                error={state.error ?? "An unexpected error occurred."}
                onRetry={() => {
                  if (lastFormData) {
                    submitTrip(lastFormData, apiKey);
                  }
                }}
              />
            )}
            {state.status === "success" && state.data && (
              <ItineraryView
                itinerary={state.data}
                onRemoveStop={removeStop}
                onAddStop={addStop}
                onUpdateNotes={updateStopNotes}
                onReorderStops={reorderStops}
                onMoveStopUp={moveStopUp}
                onMoveStopDown={moveStopDown}
                onSave={handleSave}
                onReset={handleReset}
              />
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-100 dark:border-slate-800 py-8 text-center text-xs text-stone-400 dark:text-slate-600">
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 14 }}>Gamyam AI</p>
        <p className="mt-1">Your destination begins here.</p>
      </footer>

      {/* Overlays */}
      {showSaved && (
        <SavedTripsPanel
          trips={savedTrips}
          onLoad={loadTrip}
          onDelete={deleteTrip}
          onRename={renameTrip}
          onClose={() => setShowSaved(false)}
        />
      )}

    </div>
  );
}
