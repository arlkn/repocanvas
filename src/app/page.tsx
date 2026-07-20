"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { TopBar } from "@/components/layout/top-bar";
import { SectionEditor } from "@/components/editor/section-editor";
import { ReadmePreview } from "@/components/preview/readme-preview";
import { CommandPalette } from "@/components/layout/command-palette";
import { useReadmeStore } from "@/store/readme-store";

export default function HomePage() {
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const selectedSectionId = useReadmeStore((s) => s.selectedSectionId);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar onCommandPalette={() => setShowCommandPalette(true)} />

        <div className="flex flex-1 overflow-hidden">
          {/* Editor Panel */}
          <div className="flex w-full flex-col overflow-hidden border-r border-border lg:w-[420px]">
            {selectedSectionId ? (
              <SectionEditor />
            ) : (
              <div className="flex flex-1 items-center justify-center p-8 text-center">
                <div className="space-y-3">
                  <p className="text-lg font-medium text-muted-foreground">
                    No section selected
                  </p>
                  <p className="text-sm text-muted-foreground/70">
                    Add a section from the sidebar or select an existing one to start editing.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Preview Panel */}
          <div className="hidden flex-1 overflow-hidden lg:block">
            <ReadmePreview />
          </div>
        </div>
      </div>

      <CommandPalette
        open={showCommandPalette}
        onClose={() => setShowCommandPalette(false)}
      />
    </div>
  );
}
