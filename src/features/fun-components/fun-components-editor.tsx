"use client";

import { useReadmeStore } from "@/store/readme-store";
import type { Section, FunComponentsData, FunContentType, Alignment } from "@/types";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FunComponentsEditorProps {
  section: Section;
}

export function FunComponentsEditor({ section }: FunComponentsEditorProps) {
  const updateSectionData = useReadmeStore((s) => s.updateSectionData);
  const data = section.data as FunComponentsData;

  const update = (updates: Partial<FunComponentsData>) => {
    updateSectionData(section.id, { ...data, ...updates });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Content Type</Label>
        <Select
          value={data.contentType}
          onValueChange={(v) => update({ contentType: v as FunContentType })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="both">Both (Memes + Quotes)</SelectItem>
            <SelectItem value="memes">Memes Only</SelectItem>
            <SelectItem value="quotes">Quotes Only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Alignment</Label>
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

      <p className="text-xs text-muted-foreground">
        Adds fun content to your profile. Memes use memegen.link and quotes use quotes-github-readme.vercel.app.
      </p>
    </div>
  );
}
