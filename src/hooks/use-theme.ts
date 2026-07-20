"use client";

import { useEffect, useMemo } from "react";
import { useUIStore } from "@/store/ui-store";

export function useTheme() {
  const { theme, setTheme } = useUIStore();

  const resolvedTheme = useMemo<"light" | "dark">(() => {
    if (theme === "system") {
      if (typeof window !== "undefined") {
        return window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      }
      return "dark";
    }
    return theme;
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      root.classList.add(prefersDark ? "dark" : "light");
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  return { theme, resolvedTheme, setTheme };
}
