"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ReadmeConfig, Section, SectionType, SectionData } from "@/types";
import { createDefaultSection, STORAGE_KEY } from "@/lib/constants";

interface ReadmeStore {
  config: ReadmeConfig;
  selectedSectionId: string | null;

  setUsername: (username: string) => void;
  addSection: (type: SectionType) => void;
  removeSection: (id: string) => void;
  updateSection: (id: string, updates: Partial<Section>) => void;
  updateSectionData: (id: string, data: SectionData) => void;
  moveSection: (id: string, direction: "up" | "down") => void;
  toggleSectionVisibility: (id: string) => void;
  selectSection: (id: string | null) => void;
  loadConfig: (config: ReadmeConfig) => void;
  resetConfig: () => void;
}

const DEFAULT_CONFIG: ReadmeConfig = {
  username: "",
  sections: [],
};

export const useReadmeStore = create<ReadmeStore>()(
  persist(
    (set) => ({
      config: DEFAULT_CONFIG,
      selectedSectionId: null,

      setUsername: (username) =>
        set((state) => ({
          config: { ...state.config, username },
        })),

      addSection: (type) =>
        set((state) => {
          if (state.config.sections.some((s) => s.type === type)) return state;
          const section = createDefaultSection(type);
          return {
            config: {
              ...state.config,
              sections: [...state.config.sections, section],
            },
            selectedSectionId: section.id,
          };
        }),

      removeSection: (id) =>
        set((state) => ({
          config: {
            ...state.config,
            sections: state.config.sections.filter((s) => s.id !== id),
          },
          selectedSectionId:
            state.selectedSectionId === id ? null : state.selectedSectionId,
        })),

      updateSection: (id, updates) =>
        set((state) => ({
          config: {
            ...state.config,
            sections: state.config.sections.map((s) =>
              s.id === id ? { ...s, ...updates } : s
            ),
          },
        })),

      updateSectionData: (id, data) =>
        set((state) => ({
          config: {
            ...state.config,
            sections: state.config.sections.map((s) =>
              s.id === id ? { ...s, data } : s
            ),
          },
        })),

      moveSection: (id, direction) =>
        set((state) => {
          const sections = [...state.config.sections];
          const index = sections.findIndex((s) => s.id === id);
          if (index === -1) return state;

          const newIndex = direction === "up" ? index - 1 : index + 1;
          if (newIndex < 0 || newIndex >= sections.length) return state;

          [sections[index], sections[newIndex]] = [
            sections[newIndex],
            sections[index],
          ];

          return {
            config: { ...state.config, sections },
          };
        }),

      toggleSectionVisibility: (id) =>
        set((state) => ({
          config: {
            ...state.config,
            sections: state.config.sections.map((s) =>
              s.id === id ? { ...s, visible: !s.visible } : s
            ),
          },
        })),

      selectSection: (id) => set({ selectedSectionId: id }),

      loadConfig: (config) =>
        set({
          config,
          selectedSectionId: config.sections[0]?.id ?? null,
        }),

      resetConfig: () =>
        set({
          config: DEFAULT_CONFIG,
          selectedSectionId: null,
        }),
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({ config: state.config }),
    }
  )
);
