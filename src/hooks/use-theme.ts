"use client";

import { useEffect, useMemo } from "react";
import { useReadmeStore } from "@/store/readme-store";

export function useTheme() {
  const { config, setTheme } = useReadmeStore();

  const resolvedTheme = useMemo<"light" | "dark">(() => {
    if (config.theme === "system") {
      if (typeof window !== "undefined") {
        return window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      }
      return "dark";
    }
    return config.theme;
  }, [config.theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");

    if (config.theme === "system") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      root.classList.add(prefersDark ? "dark" : "light");
    } else {
      root.classList.add(config.theme);
    }
  }, [config.theme]);

  return { theme: config.theme, resolvedTheme, setTheme };
}
