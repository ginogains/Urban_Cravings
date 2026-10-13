import { useState, useEffect } from "react";

// Custom hook: sync state with localStorage so it persists across page reloads.
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Silently ignore storage errors (e.g., private mode quota)
    }
  }, [key, value]);

  return [value, setValue];
}
