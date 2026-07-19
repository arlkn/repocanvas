"use client";

import React from "react";
import dynamic from "next/dynamic";
import { TopBar } from "@/components/layout/top-bar";
import { MobileTabs } from "@/components/layout/mobile-tabs";
import { CommandPalette } from "@/components/layout/command-palette";
import { SectionEditor } from "@/components/editor/section-editor";
import { ReadmePreview } from "@/components/preview/readme-preview";
import { useReadmeStore } from "@/store/readme-store";
import { useTheme } from "@/hooks/use-theme";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";

const Sidebar = dynamic(
  () => import("@/components/layout/sidebar").then((mod) => mod.Sidebar),
  {
    ssr: false,
    loading: () => (
      <aside className="h-full w-72 border-r border-sidebar-border bg-sidebar flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">RC</span>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-sidebar-foreground">Sections</h2>
              <p className="text-[11px] text-muted-foreground">7 of 7 enabled</p>
            </div>
          </div>
        </div>
        <div className="flex-1 p-2 space-y-1">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm animate-pulse"
            >
              <div className="w-3.5 h-3.5 bg-muted rounded" />
              <div className="h-4 w-4 bg-muted rounded shrink-0" />
              <div className="h-3 bg-muted rounded w-20" />
            </div>
          ))}
        </div>
      </aside>
    ),
  }
);

export default function Home() {
  const { viewMode } = useReadmeStore();
  useTheme();
  useKeyboardShortcuts();

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <TopBar />

      <div className="flex flex-1 overflow-hidden">
        <div className="hidden md:flex">
          <Sidebar />
        </div>

        <main className="flex-1 flex overflow-hidden">
          {viewMode === "editor" && (
            <div className="w-full overflow-hidden">
              <SectionEditor />
            </div>
          )}

          {viewMode === "split" && (
            <>
              <div className="w-1/2 overflow-hidden border-r border-border">
                <SectionEditor />
              </div>
              <div className="w-1/2 overflow-hidden">
                <ReadmePreview />
              </div>
            </>
          )}

          {viewMode === "preview" && (
            <div className="w-full overflow-hidden">
              <ReadmePreview />
            </div>
          )}
        </main>
      </div>

      <div className="md:hidden">
        <MobileTabs />
      </div>

      <CommandPalette />
    </div>
  );
}
