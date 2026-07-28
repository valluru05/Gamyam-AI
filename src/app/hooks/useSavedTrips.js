import { useState, useCallback } from "react";
const STORAGE_KEY = "gamyam-saved-trips";
function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function persist(trips) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
  } catch {
  }
}
export function useSavedTrips() {
  const [savedTrips, setSavedTrips] = useState(load);
  const saveTrip = useCallback((name, itinerary) => {
    const newTrip = { id: `trip-${Date.now()}`, name, savedAt: (/* @__PURE__ */ new Date()).toISOString(), itinerary };
    setSavedTrips((prev) => {
      const updated = [newTrip, ...prev];
      persist(updated);
      return updated;
    });
  }, []);
  const deleteTrip = useCallback((id) => {
    setSavedTrips((prev) => {
      const updated = prev.filter((t) => t.id !== id);
      persist(updated);
      return updated;
    });
  }, []);
  const renameTrip = useCallback((id, newName) => {
    setSavedTrips((prev) => {
      const updated = prev.map((t) => t.id === id ? { ...t, name: newName } : t);
      persist(updated);
      return updated;
    });
  }, []);
  return { savedTrips, saveTrip, deleteTrip, renameTrip };
}
