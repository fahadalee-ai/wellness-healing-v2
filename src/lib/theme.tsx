import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { readStorage, writeStorage } from "./storage";

export type ThemeMode = "light" | "dark";

type ThemeStore = {
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
};

const ThemeCtx = createContext<ThemeStore | null>(null);

function applyTheme(mode: ThemeMode) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", mode === "dark");
  document.documentElement.style.colorScheme = mode;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", mode === "dark" ? "#1A1E1C" : "#F6F3EC");
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>("light");

  useEffect(() => {
    const stored = readStorage("theme");
    const next: ThemeMode = stored === "dark" ? "dark" : "light";
    setThemeState(next);
    applyTheme(next);
  }, []);

  const value = useMemo<ThemeStore>(() => {
    const setTheme = (mode: ThemeMode) => {
      setThemeState(mode);
      writeStorage("theme", mode);
      applyTheme(mode);
    };
    return {
      theme,
      setTheme,
      toggleTheme: () => setTheme(theme === "dark" ? "light" : "dark"),
    };
  }, [theme]);

  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
