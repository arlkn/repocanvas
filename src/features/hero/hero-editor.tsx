"use client";

import { useReadmeStore } from "@/store/readme-store";
import type { Section, HeroData, Alignment } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HeroEditorProps {
  section: Section;
}

export function HeroEditor({ section }: HeroEditorProps) {
  const updateSectionData = useReadmeStore((s) => s.updateSectionData);
  const data = section.data as HeroData;

  const update = (updates: Partial<HeroData>) => {
    updateSectionData(section.id, { ...data, ...updates });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="tagline">Tagline</Label>
        <Input
          id="tagline"
          placeholder="Your project tagline"
          value={data.tagline}
          onChange={(e) => update({ tagline: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subtitle">Subtitle</Label>
        <Input
          id="subtitle"
          placeholder="A brief description of what you do"
          value={data.subtitle}
          onChange={(e) => update({ subtitle: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Text Alignment</Label>
        <Select
          value={data.alignment}
          onValueChange={(v) => update({ alignment: v as Alignment })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="left">Left</SelectItem>
            <SelectItem value="center">Center</SelectItem>
            <SelectItem value="right">Right</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="branding">Show branding</Label>
        <Switch
          id="branding"
          checked={data.showBranding}
          onCheckedChange={(checked) => update({ showBranding: checked })}
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="divider">Show divider</Label>
        <Switch
          id="divider"
          checked={data.showDivider}
          onCheckedChange={(checked) => update({ showDivider: checked })}
        />
      </div>
    </div>
  );
}
