const GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";
const SYSTEM_PROMPT = `You are a JSON API for trip planning. Respond ONLY with a single valid JSON object \u2014 no markdown, no code fences, no text before or after.

The JSON must match this exact schema:
{
  "tripTitle": "string",
  "destination": "string",
  "durationDays": 4,
  "estimatedBudget": {
    "currency": "USD",
    "total": 1200,
    "breakdown": {
      "accommodation": 400,
      "food": 300,
      "transport": 200,
      "activities": 250,
      "shopping": 50
    }
  },
  "days": [
    {
      "id": "day-1",
      "dayNumber": 1,
      "theme": "string",
      "stops": [
        {
          "id": "day-1-stop-1",
          "name": "string",
          "type": "sight",
          "time": "09:00 AM",
          "durationMinutes": 90,
          "estimatedCost": 25,
          "description": "1-2 sentence description of this stop.",
          "notes": ""
        }
      ]
    }
  ]
}

Rules:
- type must be exactly one of: food, sight, activity, transport, lodging
- Include 4-5 stops per day with realistic local names
- Costs must be realistic for the destination and stated budget level
- estimatedCost: 0 for free attractions
- All stop ids must be unique (e.g. day-1-stop-1, day-1-stop-2, day-2-stop-1)
- If the user request is vague, make sensible assumptions and fill in a complete trip`;
function buildPrompt(formData) {
  const { destination, duration, budget, maxBudget, style, interests, transport, requirements, hotel, freeText } = formData;
  let prompt = `Plan a ${duration}-day trip to ${destination}. Budget level: ${budget}.`;
  if (maxBudget) prompt += ` Maximum total budget is $${maxBudget}. Keep overall costs and stop costs aligned within this limit.`;
  if (style) prompt += ` Travel style: ${style}.`;
  if (interests && interests.length) prompt += ` Interests: ${interests.join(", ")}.`;
  if (transport) prompt += ` Preferred transportation: ${transport}.`;
  if (hotel) prompt += ` Hotel preference: ${hotel}.`;
  if (requirements && requirements.length) prompt += ` Special requirements: ${requirements.join(", ")}.`;
  if (freeText && freeText.trim()) prompt += ` Additional details: ${freeText.trim()}`;
  return prompt;
}
function parseJsonSafely(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    const stripped = raw.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "").trim();
    return JSON.parse(stripped);
  }
}
export async function planTripWithAI(formData, apiKey, signal) {
  const response = await fetch(GROQ_ENDPOINT, {
    method: "POST",
    signal,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildPrompt(formData) }
      ],
      temperature: 0.7,
      max_tokens: 4096
    })
  });
  if (!response.ok) {
    let msg = `Groq API error ${response.status}`;
    try {
      const err = await response.json();
      if (err.error?.message) msg = err.error.message;
    } catch {
    }
    throw new Error(msg);
  }
  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("Empty response from AI. Please try again.");
  return parseJsonSafely(content);
}
