"use client";

import { useEffect, useCallback } from "react";
import { useReadmeStore } from "@/store/readme-store";

export function useKeyboardShortcuts() {
  const { undo, redo, setCommandPaletteOpen } = useReadmeStore();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const isMod = e.metaKey || e.ctrlKey;

      if (isMod && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      }

      if (isMod && e.key === "z" && e.shiftKey) {
        e.preventDefault();
        redo();
      }

      if (isMod && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }

      if (e.key === "Escape") {
        setCommandPaletteOpen(false);
      }
    },
    [undo, redo, setCommandPaletteOpen]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}
