"use client";

import { useReadmeStore } from "@/store/readme-store";
import type { Section, HeroData } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

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

      <div className="flex items-center justify-between">
        <Label htmlFor="branding">Show branding</Label>
        <Switch
          id="branding"
          checked={data.showBranding}
          onCheckedChange={(checked) => update({ showBranding: checked })}
        />
      </div>
    </div>
  );
}
