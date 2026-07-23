"use client";

import { useState } from "react";
import { useReadmeStore } from "@/store/readme-store";
import { SECTION_TYPES } from "@/lib/constants";
import type { SectionType } from "@/types";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Rocket,
  FileText,
  Wrench,
  LayoutGrid,
  BarChart3,
  Users,
  Trophy,
  Heart,
  Sparkles,
} from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Rocket,
  FileText,
  Wrench,
  LayoutGrid,
  BarChart3,
  Users,
  Trophy,
  Heart,
  Sparkles,
};

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const { config, selectSection } = useReadmeStore();

  const handleOpenChange = (v: boolean) => {
    if (!v) {
      onClose();
    } else {
      setQuery("");
    }
  };

  const filteredSections = config.sections.filter((s) =>
    s.title.toLowerCase().includes(query.toLowerCase())
  );

  const existingTypes = new Set(config.sections.map((s) => s.type));
  const filteredTypes = (Object.entries(SECTION_TYPES) as [
    SectionType,
    (typeof SECTION_TYPES)[SectionType],
  ][]).filter(
    ([type, meta]) =>
      !existingTypes.has(type) &&
      (meta.label.toLowerCase().includes(query.toLowerCase()) ||
        meta.description.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md p-0">
        <div className="border-b border-border p-3">
          <Input
            placeholder="Search sections..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-0 focus-visible:ring-0"
            autoFocus
          />
        </div>

        <ScrollArea className="max-h-[300px]">
          {filteredSections.length > 0 && (
            <div className="p-2">
              <div className="mb-1 px-2 text-xs font-medium uppercase text-muted-foreground">
                Sections
              </div>
              {filteredSections.map((section) => {
                const meta = SECTION_TYPES[section.type];
                const Icon = ICON_MAP[meta.icon] ?? FileText;
                return (
                  <button
                    key={section.id}
                    className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-muted"
                    onClick={() => {
                      selectSection(section.id);
                      onClose();
                    }}
                  >
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span>{section.title}</span>
                  </button>
                );
              })}
            </div>
          )}

          {filteredTypes.length > 0 && (
            <div className="p-2">
              <div className="mb-1 px-2 text-xs font-medium uppercase text-muted-foreground">
                Add Section
              </div>
              {filteredTypes.map(([type, meta]) => {
                const Icon = ICON_MAP[meta.icon] ?? FileText;
                return (
                  <button
                    key={type}
                    className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-muted"
                    onClick={() => {
                      useReadmeStore.getState().addSection(type);
                      onClose();
                    }}
                  >
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <div className="text-left">
                      <div>{meta.label}</div>
                      <div className="text-xs text-muted-foreground">
                        {meta.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
