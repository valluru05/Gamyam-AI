import { useReducer, useRef, useCallback } from "react";
import { planTripWithAI } from "../utils/groqApi";
import { validateItinerary } from "../utils/validateItinerary";
function reducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return { status: "loading", data: null, error: null };
    case "FETCH_SUCCESS":
      return { status: "success", data: action.payload, error: null };
    case "FETCH_ERROR":
      return { status: "error", data: null, error: action.payload };
    case "RESET":
      return { status: "idle", data: null, error: null };
    case "LOAD_TRIP":
      return { status: "success", data: action.payload, error: null };
    case "REMOVE_STOP":
      if (!state.data) return state;
      return {
        ...state,
        data: {
          ...state.data,
          days: state.data.days.map(
            (day) => day.id === action.dayId ? { ...day, stops: day.stops.filter((s) => s.id !== action.stopId) } : day
          )
        }
      };
    case "ADD_STOP":
      if (!state.data) return state;
      return {
        ...state,
        data: {
          ...state.data,
          days: state.data.days.map(
            (day) => day.id === action.dayId ? { ...day, stops: [...day.stops, action.stop] } : day
          )
        }
      };
    case "UPDATE_STOP_NOTES":
      if (!state.data) return state;
      return {
        ...state,
        data: {
          ...state.data,
          days: state.data.days.map(
            (day) => day.id === action.dayId ? { ...day, stops: day.stops.map((s) => s.id === action.stopId ? { ...s, notes: action.notes } : s) } : day
          )
        }
      };
    case "REORDER_STOPS":
      if (!state.data) return state;
      return {
        ...state,
        data: {
          ...state.data,
          days: state.data.days.map((day) => day.id === action.dayId ? { ...day, stops: action.stops } : day)
        }
      };
    case "MOVE_STOP_UP":
    case "MOVE_STOP_DOWN": {
      if (!state.data) return state;
      const direction = action.type === "MOVE_STOP_UP" ? -1 : 1;
      return {
        ...state,
        data: {
          ...state.data,
          days: state.data.days.map((day) => {
            if (day.id !== action.dayId) return day;
            const idx = day.stops.findIndex((s) => s.id === action.stopId);
            if (idx < 0) return day;
            const newIdx = idx + direction;
            if (newIdx < 0 || newIdx >= day.stops.length) return day;
            const stops = [...day.stops];
            [stops[idx], stops[newIdx]] = [stops[newIdx], stops[idx]];
            return { ...day, stops };
          })
        }
      };
    }
    default:
      return state;
  }
}
const initialState = { status: "idle", data: null, error: null };
export function useTripPlanner() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const requestIdRef = useRef(0);
  const abortRef = useRef(null);
  const submitTrip = useCallback(async (formData, apiKey) => {
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const requestId = ++requestIdRef.current;
    dispatch({ type: "FETCH_START" });
    try {
      const keyToUse = (apiKey || "").trim();
      if (!keyToUse) {
        throw new Error("A Groq API Key is required to plan your trip. Please click 'Groq API Key' in the top right to add your key.");
      }
      const raw = await planTripWithAI(formData, keyToUse, controller.signal);
      const validation = validateItinerary(raw);
      if (!validation.valid) throw new Error(validation.error);
      const totalBudget = formData.maxBudget ? Number(formData.maxBudget) : (raw.estimatedBudget?.total || 1500);
      const originalBreakdown = raw.estimatedBudget?.breakdown || {
        accommodation: Math.round(totalBudget * 0.35),
        food: Math.round(totalBudget * 0.25),
        transport: Math.round(totalBudget * 0.15),
        activities: Math.round(totalBudget * 0.20),
        shopping: Math.round(totalBudget * 0.05)
      };

      let scaledBreakdown = { ...originalBreakdown };
      if (formData.maxBudget && raw.estimatedBudget?.breakdown) {
        const rawTotal = raw.estimatedBudget.total || Object.values(raw.estimatedBudget.breakdown).reduce((a, b) => a + b, 0) || 1;
        const scale = totalBudget / rawTotal;
        Object.entries(raw.estimatedBudget.breakdown).forEach(([key, val]) => {
          scaledBreakdown[key] = Math.round(val * scale);
        });
      }

      const itinerary = {
        ...raw,
        estimatedBudget: {
          currency: raw.estimatedBudget?.currency || "USD",
          total: totalBudget,
          breakdown: scaledBreakdown
        },
        days: raw.days.map((day, di) => ({
          ...day,
          id: day.id || `day-${di + 1}`,
          stops: day.stops.map((stop, si) => ({
            notes: "",
            ...stop,
            id: stop.id || `day-${di + 1}-stop-${si + 1}`
          }))
        }))
      };
      if (requestId !== requestIdRef.current || controller.signal.aborted) return;
      dispatch({ type: "FETCH_SUCCESS", payload: itinerary });
    } catch (err) {
      if (requestId !== requestIdRef.current || controller.signal.aborted) return;
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      dispatch({ type: "FETCH_ERROR", payload: msg });
    }
  }, []);
  const reset = useCallback(() => dispatch({ type: "RESET" }), []);
  const loadTrip = useCallback((itinerary) => dispatch({ type: "LOAD_TRIP", payload: itinerary }), []);
  const removeStop = useCallback((dayId, stopId) => dispatch({ type: "REMOVE_STOP", dayId, stopId }), []);
  const addStop = useCallback((dayId, stop) => dispatch({ type: "ADD_STOP", dayId, stop }), []);
  const updateStopNotes = useCallback((dayId, stopId, notes) => dispatch({ type: "UPDATE_STOP_NOTES", dayId, stopId, notes }), []);
  const reorderStops = useCallback((dayId, stops) => dispatch({ type: "REORDER_STOPS", dayId, stops }), []);
  const moveStopUp = useCallback((dayId, stopId) => dispatch({ type: "MOVE_STOP_UP", dayId, stopId }), []);
  const moveStopDown = useCallback((dayId, stopId) => dispatch({ type: "MOVE_STOP_DOWN", dayId, stopId }), []);
  return { state, submitTrip, reset, loadTrip, removeStop, addStop, updateStopNotes, reorderStops, moveStopUp, moveStopDown };
}
