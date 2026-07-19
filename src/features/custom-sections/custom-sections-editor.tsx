"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useReadmeStore } from "@/store/readme-store";
import type { CustomSectionsData, CustomSection } from "@/types";
import { generateId } from "@/lib/utils";
import { Plus, Trash2, FileText } from "lucide-react";

export function CustomSectionsEditor() {
  const { config, activeSection, updateSection } = useReadmeStore();
  const section = config.sections.find((s) => s.id === activeSection);
  if (!section || section.type !== "custom") return null;

  const data = section.data as CustomSectionsData;

  const addSection = () => {
    const newSection: CustomSection = {
      id: generateId(),
      title: "New Section",
      content: "",
      enabled: true,
    };
    updateSection(section.id, {
      ...data,
      sections: [...data.sections, newSection],
    });
  };

  const updateCustomSection = (id: string, updates: Partial<CustomSection>) => {
    updateSection(section.id, {
      ...data,
      sections: data.sections.map((s) =>
        s.id === id ? { ...s, ...updates } : s
      ),
    });
  };

  const removeSection = (id: string) => {
    updateSection(section.id, {
      ...data,
      sections: data.sections.filter((s) => s.id !== id),
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {data.sections.map((customSection) => (
          <div
            key={customSection.id}
            className="rounded-lg border border-border p-3 space-y-3"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-1">
                <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                <Input
                  value={customSection.title}
                  onChange={(e) =>
                    updateCustomSection(customSection.id, { title: e.target.value })
                  }
                  placeholder="Section title"
                  className="h-8 text-xs"
                />
              </div>
              <div className="flex items-center gap-1">
                <Switch
                  checked={customSection.enabled}
                  onCheckedChange={(checked) =>
                    updateCustomSection(customSection.id, { enabled: checked })
                  }
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => removeSection(customSection.id)}
                >
                  <Trash2 className="h-3.5 w-3.5 text-destructive" />
                </Button>
              </div>
            </div>
            <Textarea
              value={customSection.content}
              onChange={(e) =>
                updateCustomSection(customSection.id, { content: e.target.value })
              }
              placeholder="Write your markdown content here..."
              className="h-24 text-xs font-mono"
            />
          </div>
        ))}
      </div>

      <Button variant="outline" className="w-full gap-2" onClick={addSection}>
        <Plus className="h-4 w-4" />
        Add Custom Section
      </Button>
    </div>
  );
}
