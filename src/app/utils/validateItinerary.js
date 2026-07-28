export function validateItinerary(data) {
  if (!data || typeof data !== "object") {
    return { valid: false, error: "Invalid response: not an object." };
  }
  if (!Array.isArray(data.days) || data.days.length === 0) {
    return { valid: false, error: "No itinerary days found in the response." };
  }
  for (const day of data.days) {
    if (!day || typeof day !== "object") {
      return { valid: false, error: "Malformed day data in itinerary." };
    }
    if (!Array.isArray(day.stops)) {
      return { valid: false, error: `Day ${day.dayNumber ?? "?"} is missing stops.` };
    }
  }
  const budget = data.estimatedBudget;
  const hasBudget = budget && typeof budget.total === "number" && budget.breakdown && typeof budget.breakdown === "object";
  return { valid: true, noBudget: !hasBudget };
}
