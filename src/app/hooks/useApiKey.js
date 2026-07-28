export function useApiKey() {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY || "";
  
  return {
    apiKey,
    hasKey: apiKey.length > 0
  };
}
