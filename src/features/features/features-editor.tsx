"use client";

import { useReadmeStore } from "@/store/readme-store";
import type { Section, FeaturesData, FeatureItem, FeatureColumns, FeatureIconSize } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
      {/* Layout Settings */}
      <div className="space-y-3 rounded-lg border border-border p-3">
        <Label className="text-xs font-medium uppercase text-muted-foreground">
          Layout
        </Label>

        <div className="space-y-2">
          <Label className="text-xs">Columns</Label>
          <Select
            value={data.columns.toString()}
            onValueChange={(v) =>
              updateSectionData(section.id, {
                ...data,
                columns: parseInt(v) as FeatureColumns,
              })
            }
          >
            <SelectTrigger className="h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 column</SelectItem>
              <SelectItem value="2">2 columns</SelectItem>
              <SelectItem value="3">3 columns</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-xs">Icon Size</Label>
          <Select
            value={data.iconSize}
            onValueChange={(v) =>
              updateSectionData(section.id, {
                ...data,
                iconSize: v as FeatureIconSize,
              })
            }
          >
            <SelectTrigger className="h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Small</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="large">Large</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-xs" htmlFor="show-desc">Show Descriptions</Label>
          <Switch
            id="show-desc"
            checked={data.showDescriptions}
            onCheckedChange={(checked) =>
              updateSectionData(section.id, { ...data, showDescriptions: checked })
            }
          />
        </div>
      </div>

      {/* Feature Items */}
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

          {data.showDescriptions && (
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
          )}
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
