"use client";

import { useReadmeStore } from "@/store/readme-store";
import type { Section, SocialData, SocialLink, SocialStyle, Alignment } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";

interface SocialEditorProps {
  section: Section;
}

const PLATFORMS = [
  { value: "twitter", label: "Twitter/X", placeholder: "https://x.com/username" },
  { value: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/in/username" },
  { value: "website", label: "Website", placeholder: "https://yoursite.com" },
  { value: "email", label: "Email", placeholder: "mailto:you@example.com" },
  { value: "discord", label: "Discord", placeholder: "https://discord.gg/invite" },
  { value: "youtube", label: "YouTube", placeholder: "https://youtube.com/@username" },
];

export function SocialEditor({ section }: SocialEditorProps) {
  const updateSectionData = useReadmeStore((s) => s.updateSectionData);
  const data = section.data as SocialData;

  const updateItem = (index: number, updates: Partial<SocialLink>) => {
    const links = [...data.links];
    links[index] = { ...links[index], ...updates };
    updateSectionData(section.id, { ...data, links });
  };

  const addItem = () => {
    updateSectionData(section.id, {
      ...data,
      links: [
        ...data.links,
        { platform: "twitter", url: "", label: "Twitter" },
      ],
    });
  };

  const removeItem = (index: number) => {
    updateSectionData(section.id, {
      ...data,
      links: data.links.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-4">
      {/* Style Settings */}
      <div className="space-y-3 rounded-lg border border-border p-3">
        <Label className="text-xs font-medium uppercase text-muted-foreground">
          Style
        </Label>

        <div className="space-y-2">
          <Label className="text-xs">Display Style</Label>
          <Select
            value={data.style}
            onValueChange={(v) =>
              updateSectionData(section.id, {
                ...data,
                style: v as SocialStyle,
              })
            }
          >
            <SelectTrigger className="h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="links">Text Links</SelectItem>
              <SelectItem value="badges">Badge Buttons</SelectItem>
              <SelectItem value="cards">Card Table</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-xs">Alignment</Label>
          <Select
            value={data.alignment}
            onValueChange={(v) =>
              updateSectionData(section.id, {
                ...data,
                alignment: v as Alignment,
              })
            }
          >
            <SelectTrigger className="h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="left">Left</SelectItem>
              <SelectItem value="center">Center</SelectItem>
              <SelectItem value="right">Right</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Links */}
      {data.links.map((link, index) => (
        <div
          key={index}
          className="space-y-2 rounded-lg border border-border p-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              Link {index + 1}
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

          <div className="space-y-1">
            <Label className="text-xs">Platform</Label>
            <select
              value={link.platform}
              onChange={(e) => {
                const platform = e.target.value;
                const platformData = PLATFORMS.find((p) => p.value === platform);
                updateItem(index, {
                  platform,
                  label: platformData?.label ?? platform,
                });
              }}
              className="flex h-8 w-full rounded-md border border-input bg-background px-2 text-sm"
            >
              {PLATFORMS.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <Label className="text-xs">URL</Label>
            <Input
              value={link.url}
              onChange={(e) => updateItem(index, { url: e.target.value })}
              placeholder={
                PLATFORMS.find((p) => p.value === link.platform)?.placeholder ??
                "https://..."
              }
              className="h-8 text-sm"
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
        Add Link
      </Button>
    </div>
  );
}
