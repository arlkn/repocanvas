"use client";

import React from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { TopBar } from "@/components/layout/top-bar";
import { MobileTabs } from "@/components/layout/mobile-tabs";
import { CommandPalette } from "@/components/layout/command-palette";
import { SectionEditor } from "@/components/editor/section-editor";
import { ReadmePreview } from "@/components/preview/readme-preview";
import { useReadmeStore } from "@/store/readme-store";
import { useTheme } from "@/hooks/use-theme";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { cn } from "@/lib/utils";

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
