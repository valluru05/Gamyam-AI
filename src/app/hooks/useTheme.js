import { useState, useEffect } from "react";
export function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    try {
      const stored = localStorage.getItem("gamyam-theme");
      if (stored) return stored === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch {
      return false;
    }
  });
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem("gamyam-theme", isDark ? "dark" : "light");
    } catch {
    }
  }, [isDark]);
  const toggle = () => setIsDark((prev) => !prev);
  return { isDark, toggle };
}
