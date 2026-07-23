"use client";

import { useReadmeStore } from "@/store/readme-store";
import type { Section, VisitorCounterData, Alignment } from "@/types";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface VisitorCounterEditorProps {
  section: Section;
}

export function VisitorCounterEditor({ section }: VisitorCounterEditorProps) {
  const updateSectionData = useReadmeStore((s) => s.updateSectionData);
  const data = section.data as VisitorCounterData;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Alignment</Label>
        <Select
          value={data.alignment}
          onValueChange={(v) =>
            updateSectionData(section.id, { ...data, alignment: v as Alignment })
          }
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
        Displays a visitor counter badge using komarev.com. Requires your GitHub username to be set.
      </p>
    </div>
  );
}
