"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  ReadmeConfig,
  Section,
  SectionType,
  Theme,
  ViewMode,
} from "@/types";
import { createDefaultConfig, createDefaultSection } from "@/lib/constants";
import { STORAGE_KEYS } from "@/lib/constants";

interface ReadmeStore {
  config: ReadmeConfig;
  viewMode: ViewMode;
  activeSection: string | null;
  history: ReadmeConfig[];
  historyIndex: number;
  commandPaletteOpen: boolean;

  setConfig: (config: ReadmeConfig) => void;
  updateSection: (sectionId: string, data: Section["data"]) => void;
  toggleSection: (sectionId: string) => void;
  addSection: (type: SectionType) => void;
  removeSection: (sectionId: string) => void;
  reorderSections: (fromIndex: number, toIndex: number) => void;
  setActiveSection: (sectionId: string | null) => void;
  setViewMode: (mode: ViewMode) => void;
  setTheme: (theme: Theme) => void;
  setUsername: (username: string) => void;
  loadTemplate: (config: ReadmeConfig) => void;
  importConfig: (config: ReadmeConfig) => void;
  exportConfig: () => string;
  importFromJson: (json: string) => boolean;
  undo: () => void;
  redo: () => void;
  setCommandPaletteOpen: (open: boolean) => void;
  resetConfig: () => void;
}

function cloneConfig(config: ReadmeConfig): ReadmeConfig {
  return JSON.parse(JSON.stringify(config));
}

export const useReadmeStore = create<ReadmeStore>()(
  persist(
    (set, get) => ({
      config: createDefaultConfig(),
      viewMode: "split",
      activeSection: "header",
      history: [createDefaultConfig()],
      historyIndex: 0,
      commandPaletteOpen: false,

      setConfig: (config) => {
        const state = get();
        const newHistory = state.history.slice(0, state.historyIndex + 1);
        newHistory.push(cloneConfig(config));
        set({
          config,
          history: newHistory,
          historyIndex: newHistory.length - 1,
        });
      },

      updateSection: (sectionId, data) => {
        const state = get();
        const newSections = state.config.sections.map((s) =>
          s.id === sectionId ? { ...s, data } : s
        );
        const newConfig = { ...state.config, sections: newSections };
        const newHistory = state.history.slice(0, state.historyIndex + 1);
        newHistory.push(cloneConfig(newConfig));
        set({
          config: newConfig,
          history: newHistory,
          historyIndex: newHistory.length - 1,
        });
      },

      toggleSection: (sectionId) => {
        const state = get();
        const newSections = state.config.sections.map((s) =>
          s.id === sectionId ? { ...s, enabled: !s.enabled } : s
        );
        const newConfig = { ...state.config, sections: newSections };
        const newHistory = state.history.slice(0, state.historyIndex + 1);
        newHistory.push(cloneConfig(newConfig));
        set({
          config: newConfig,
          history: newHistory,
          historyIndex: newHistory.length - 1,
        });
      },

      addSection: (type) => {
        const state = get();
        const section = createDefaultSection(type);
        const newConfig = {
          ...state.config,
          sections: [...state.config.sections, section],
        };
        const newHistory = state.history.slice(0, state.historyIndex + 1);
        newHistory.push(cloneConfig(newConfig));
        set({
          config: newConfig,
          activeSection: section.id,
          history: newHistory,
          historyIndex: newHistory.length - 1,
        });
      },

      removeSection: (sectionId) => {
        const state = get();
        const newSections = state.config.sections.filter(
          (s) => s.id !== sectionId
        );
        const newConfig = { ...state.config, sections: newSections };
        const newHistory = state.history.slice(0, state.historyIndex + 1);
        newHistory.push(cloneConfig(newConfig));
        set({
          config: newConfig,
          activeSection:
            state.activeSection === sectionId ? null : state.activeSection,
          history: newHistory,
          historyIndex: newHistory.length - 1,
        });
      },

      reorderSections: (fromIndex, toIndex) => {
        const state = get();
        const newSections = [...state.config.sections];
        const [moved] = newSections.splice(fromIndex, 1);
        newSections.splice(toIndex, 0, moved);
        const newConfig = { ...state.config, sections: newSections };
        const newHistory = state.history.slice(0, state.historyIndex + 1);
        newHistory.push(cloneConfig(newConfig));
        set({
          config: newConfig,
          history: newHistory,
          historyIndex: newHistory.length - 1,
        });
      },

      setActiveSection: (sectionId) => set({ activeSection: sectionId }),

      setViewMode: (mode) => set({ viewMode: mode }),

      setTheme: (theme) => {
        const state = get();
        set({ config: { ...state.config, theme } });
      },

      setUsername: (username) => {
        const state = get();
        set({ config: { ...state.config, username } });
      },

      loadTemplate: (config) => {
        const newConfig = cloneConfig(config);
        const state = get();
        const newHistory = state.history.slice(0, state.historyIndex + 1);
        newHistory.push(newConfig);
        set({
          config: newConfig,
          activeSection: newConfig.sections[0]?.id ?? null,
          history: newHistory,
          historyIndex: newHistory.length - 1,
        });
      },

      importConfig: (config) => {
        const newConfig = cloneConfig(config);
        const state = get();
        const newHistory = state.history.slice(0, state.historyIndex + 1);
        newHistory.push(newConfig);
        set({
          config: newConfig,
          history: newHistory,
          historyIndex: newHistory.length - 1,
        });
      },

      exportConfig: () => {
        return JSON.stringify(get().config, null, 2);
      },

      importFromJson: (json) => {
        try {
          const parsed = JSON.parse(json) as ReadmeConfig;
          if (parsed.sections && Array.isArray(parsed.sections)) {
            get().importConfig(parsed);
            return true;
          }
          return false;
        } catch {
          return false;
        }
      },

      undo: () => {
        const state = get();
        if (state.historyIndex > 0) {
          const newIndex = state.historyIndex - 1;
          set({
            config: cloneConfig(state.history[newIndex]),
            historyIndex: newIndex,
          });
        }
      },

      redo: () => {
        const state = get();
        if (state.historyIndex < state.history.length - 1) {
          const newIndex = state.historyIndex + 1;
          set({
            config: cloneConfig(state.history[newIndex]),
            historyIndex: newIndex,
          });
        }
      },

      setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),

      resetConfig: () => {
        const defaultConfig = createDefaultConfig();
        set({
          config: defaultConfig,
          activeSection: "header",
          history: [defaultConfig],
          historyIndex: 0,
        });
      },
    }),
    {
      name: STORAGE_KEYS.README_CONFIG,
      partialize: (state) => ({
        config: state.config,
        viewMode: state.viewMode,
      }),
    }
  )
);
