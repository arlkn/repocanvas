"use client";

import { create } from "zustand";
import type { AnalysisProgress, AnalysisReport } from "@/types";

interface AnalysisStore {
  url: string;
  progress: AnalysisProgress[];
  report: AnalysisReport | null;
  error: string | null;
  isAnalyzing: boolean;

  setUrl: (url: string) => void;
  setProgress: (progress: AnalysisProgress[]) => void;
  addProgress: (stage: AnalysisProgress) => void;
  setReport: (report: AnalysisReport | null) => void;
  setError: (error: string | null) => void;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
  reset: () => void;
}

export const useAnalysisStore = create<AnalysisStore>()((set) => ({
  url: "",
  progress: [],
  report: null,
  error: null,
  isAnalyzing: false,

  setUrl: (url) => set({ url }),
  setProgress: (progress) => set({ progress }),
  addProgress: (stage) =>
    set((state) => ({ progress: [...state.progress, stage] })),
  setReport: (report) => set({ report }),
  setError: (error) => set({ error }),
  setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
  reset: () =>
    set({
      url: "",
      progress: [],
      report: null,
      error: null,
      isAnalyzing: false,
    }),
}));
