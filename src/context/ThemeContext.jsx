import { createContext, useContext, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false);
  const toggleTheme = () => setDark((current) => !current);
  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      <div className={dark ? "app theme-dark" : "app"}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}