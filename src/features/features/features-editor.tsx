"use client";

import { useReadmeStore } from "@/store/readme-store";
import type { Section, FeaturesData, FeatureItem } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface FeaturesEditorProps {
  section: Section;
}

export function FeaturesEditor({ section }: FeaturesEditorProps) {
  const updateSectionData = useReadmeStore((s) => s.updateSectionData);
  const data = section.data as FeaturesData;

  const updateItem = (index: number, updates: Partial<FeatureItem>) => {
    const items = [...data.items];
    items[index] = { ...items[index], ...updates };
    updateSectionData(section.id, { ...data, items });
  };

  const addItem = () => {
    updateSectionData(section.id, {
      ...data,
      items: [...data.items, { icon: "✨", title: "", description: "" }],
    });
  };

  const removeItem = (index: number) => {
    updateSectionData(section.id, {
      ...data,
      items: data.items.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-4">
      {data.items.map((item, index) => (
        <div
          key={index}
          className="space-y-2 rounded-lg border border-border p-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              Feature {index + 1}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => removeItem(index)}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>

          <div className="grid grid-cols-[40px_1fr] gap-2">
            <div className="space-y-1">
              <Label className="text-xs">Icon</Label>
              <Input
                value={item.icon}
                onChange={(e) => updateItem(index, { icon: e.target.value })}
                className="h-8 text-center text-lg"
                maxLength={2}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Title</Label>
              <Input
                value={item.title}
                onChange={(e) => updateItem(index, { title: e.target.value })}
                placeholder="Feature name"
                className="h-8"
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-xs">Description</Label>
            <Textarea
              value={item.description}
              onChange={(e) =>
                updateItem(index, { description: e.target.value })
              }
              placeholder="What does this feature do?"
              rows={2}
              className="text-sm"
            />
          </div>
        </div>
      ))}

      <Button
        variant="outline"
        size="sm"
        className="w-full gap-2"
        onClick={addItem}
      >
        <Plus className="h-4 w-4" />
        Add Feature
      </Button>
    </div>
  );
}
