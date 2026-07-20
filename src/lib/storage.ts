import type { ReportHistoryEntry, AnalysisReport, AppSettings } from "@/types";
import { STORAGE_KEYS } from "./constants";

/**
 * Report history management using localStorage.
 */

export function getReportHistory(): ReportHistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveReportToHistory(entry: ReportHistoryEntry): void {
  if (typeof window === "undefined") return;
  const history = getReportHistory();
  const updated = [entry, ...history.filter((h) => h.id !== entry.id)].slice(0, 50);
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
}

export function removeReportFromHistory(id: string): void {
  if (typeof window === "undefined") return;
  const history = getReportHistory();
  const updated = history.filter((h) => h.id !== id);
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
}

export function clearReportHistory(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEYS.HISTORY);
}

/**
 * Full report storage for viewing reports.
 */
export function saveReport(report: AnalysisReport): void {
  if (typeof window === "undefined") return;
  try {
    const reports = getAllReports();
    const updated = [report, ...reports.filter((r) => r.id !== report.id)].slice(0, 20);
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(updated));
  } catch {
    // Storage full - silently fail
  }
}

export function getReport(id: string): AnalysisReport | null {
  if (typeof window === "undefined") return null;
  try {
    const reports = getAllReports();
    return reports.find((r) => r.id === id) ?? null;
  } catch {
    return null;
  }
}

export function getAllReports(): AnalysisReport[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.REPORTS);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

/**
 * Settings management.
 */
const DEFAULT_SETTINGS: AppSettings = {
  theme: "dark",
  aiProvider: "",
  aiModel: "",
  aiEnabled: false,
  reportDetail: "detailed",
  historyEnabled: true,
};

export function getSettings(): AppSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return stored ? { ...DEFAULT_SETTINGS, ...JSON.parse(stored) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: AppSettings): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
}

export function clearAllData(): void {
  if (typeof window === "undefined") return;
  Object.values(STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(key);
  });
}
