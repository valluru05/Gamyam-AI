# Gamyam AI — AI Travel & Trip Planner

Gamyam AI is an intelligent travel and trip planning platform that generates highly personalized, day-by-day itineraries using the Groq AI Llama-3.3 model.

---

## 1. Project Title
**Gamyam AI** (Your destination begins here)

---

## 2. Features
- **AI-Powered Itinerary Generation**: Day-by-day schedule generation tailored to destinations, durations, and preferences.
- **Customized Input Controls**: 
  - Destination input with auto-suggestions.
  - Duration sliders (1 to 14 days).
  - Multi-select interests (History, Food, Nature, etc.), travel styles (Solo, Friends, Family), and preferred transport methods.
  - Accommodate hotel preferences and special requirements (Vegetarian, Kid Friendly, Pet Friendly).
- **Flexible Budget Target & Scale**:
  - Direct budget amount input (e.g., $1500 limit).
  - Automatic category breakdown scaling (Accommodation, Food, Transport, Activities, Shopping).
- **Dynamic Expenditure Tracker**:
  - Live budget analysis progress bar showing stops' cumulative cost vs total budget.
  - Automatic recalculation and visual remaining budget or over-budget alerts.
- **Interactive Stop Control**: Add, remove, update notes, or reorder daily stops directly.
- **Saved Trips Panel**: Save, rename, load, and delete multiple planned trips locally.
- **Modern Theme System**: Fluid light & dark mode theme switching.

---

## 3. Tech Stack
- **Library**: React 18.3 (Clean React JSX / JS)
- **Bundler & Tooling**: Vite 6.3, PostCSS
- **Styling**: Tailwind CSS v4, Vanilla CSS variables
- **Icons**: Lucide React
- **LLM Endpoint**: Groq Developer API (llama-3.3-70b-versatile)
- **Client Storage**: Browser LocalStorage

---

## 4. Project Structure
```text
├── index.html                  # Main entry page structure
├── vite.config.js              # Vite React & Tailwind plugin configs
├── package.json                # Project dependencies and run scripts
├── src/
│   ├── main.jsx                # Application rendering bootstrap
│   ├── App.jsx                 # Core app page wrapper & layout
│   ├── components/             # Functional React UI components
│   │   ├── ui/                 # Accessible Radix UI primitives
│   │   ├── BudgetChart.jsx     # Dynamic circular chart and spent-bar logic
│   │   ├── DayCard.jsx         # Multi-day list rendering & actions
│   │   ├── EmptyState.jsx      # Placeholder screen showing examples
│   │   ├── ErrorState.jsx      # User-friendly request recovery actions
│   │   ├── Hero.jsx            # Premium introductory section
│   │   ├── ImageWithFallback.jsx
│   │   ├── ItineraryView.jsx   # Top-level loaded trip viewer
│   │   ├── LoadingState.jsx    # Smooth status messages during AI generation
│   │   ├── SavedTripsPanel.jsx # Sidebar for local saved trips
│   │   ├── StopItem.jsx        # Stop info card with edit & drag control
│   │   ├── ThemeToggle.jsx     # Dark mode trigger button
│   │   └── TripInputForm.jsx   # Core multi-parameter search form
│   ├── hooks/                  # State custom react hooks
│   │   ├── useApiKey.js        # Supplies Groq authorization credentials
│   │   ├── useSavedTrips.js    # LocalStorage loader and saver
│   │   ├── useTheme.js         # Theme management state controller
│   │   └── useTripPlanner.js   # Trip planning action reducer and request controller
│   ├── utils/                  # Core helpers
│   │   ├── groqApi.js          # Direct endpoint integration request
│   │   └── validateItinerary.js# JSON Schema confirmation checker
│   └── styles/                 # Tailwind & typography configs
│       ├── index.css
│       ├── fonts.css
│       ├── tailwind.css
│       └── theme.css
```

---

## 5. Installation
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server locally:
   ```bash
   npm run dev
   ```
3. Build for production distribution:
   ```bash
   npm run build
   ```

---

## 6. Environment Variables
To override default key configurations, create a `.env` file in the root directory:
```env
VITE_GROQ_API_KEY=your_groq_api_key
```

---

## 7. AI Usage
Gamyam AI interacts directly with the Groq API completion endpoint using `llama-3.3-70b-versatile`.
- **System instructions** constrain the LLM behavior to execute purely formatted JSON data matching the app's internal interfaces.
- Custom user forms are mapped directly into a descriptive query prompt representing destinations, duration, styles, transport choices, and budget levels.

---

## 8. JSON Response Format
The model responds strictly with the following structured JSON format:
```json
{
  "tripTitle": "A Magical 4-Day Cherry Blossom Tour",
  "destination": "Tokyo, Japan",
  "durationDays": 4,
  "estimatedBudget": {
    "currency": "USD",
    "total": 1500,
    "breakdown": {
      "accommodation": 525,
      "food": 375,
      "transport": 225,
      "activities": 300,
      "shopping": 75
    }
  },
  "days": [
    {
      "id": "day-1",
      "dayNumber": 1,
      "theme": "Historical Temples & Local Eats",
      "stops": [
        {
          "id": "day-1-stop-1",
          "name": "Senso-ji Temple",
          "type": "sight",
          "time": "09:00 AM",
          "durationMinutes": 90,
          "estimatedCost": 0,
          "description": "Tokyo's oldest and most iconic Buddhist temple in Asakusa.",
          "notes": ""
        }
      ]
    }
  ]
}
```

---

## 9. Error Handling
- **API Response Check**: Validates model responses for format compliance.
- **Race Condition Prevention**: Prevents concurrent request states using a combined `AbortController` and state key checks.
- **Failure UI alerts**: Handles key invalidations, offline connection errors, and rate limits gracefully.

---

## 10. Limitations
- **Browser limits**: Saved trips are subject to the local storage memory limits (~5MB).
- **Client exposure**: Direct client-to-API communication exposes request schemas on web inspector utilities.
- **Content Drift**: Freeform model responses can occasionally generate minor chronological spacing discrepancies.

---

## 11. Future Improvements
- **Server Database**: Migrating saved itineraries to PostgreSQL / Supabase for cross-device synchronization.
- **Interactive Maps**: Integrate Google Maps / Mapbox to plot stop routing.
- **Exporting Options**: Download clean PDF itineraries or sync directly to Google Calendar.

---

## 12. ⏱️ Time Spent

The project was completed in approximately **10 hours**, distributed as follows:

- **Project Setup (1 hour):** Configured React (Vite), Tailwind CSS, Express.js, and project structure.
- **UI Development (3 hours):** Designed and implemented the responsive user interface, including the landing page, trip input form, itinerary display, and theme styling.
- **Backend Development (2 hours):** Developed the Express backend, configured API routes, and integrated the Groq Llama-3.3 model.
- **AI Integration & JSON Parsing (2 hours):** Created prompts for structured JSON responses, validated AI outputs, and rendered the generated itinerary dynamically.
- **Testing & Error Handling (1 hour):** Implemented loading states, input validation, error handling, and tested various response scenarios.
- **Documentation & Final Refinements (1 hour):** Prepared the README, optimized the codebase, and performed final UI and functionality improvements.

**Total Development Time:** **~10 hours**  

---

## 13. Author
**Revanth Nag**  
B.Tech in Computer Science and Engineering (AI & ML)  
SRM University AP, Andhra Pradesh, India
