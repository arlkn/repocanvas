"use client";

import { useReadmeStore } from "@/store/readme-store";
import type { Section, LicenseData, LicenseType } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LicenseEditorProps {
  section: Section;
}

const LICENSE_TYPES: { value: LicenseType; label: string }[] = [
  { value: "MIT", label: "MIT" },
  { value: "Apache-2.0", label: "Apache 2.0" },
  { value: "GPL-3.0", label: "GPL 3.0" },
  { value: "BSD-2-Clause", label: "BSD 2-Clause" },
  { value: "Unlicense", label: "Unlicense" },
];

export function LicenseEditor({ section }: LicenseEditorProps) {
  const updateSectionData = useReadmeStore((s) => s.updateSectionData);
  const data = section.data as LicenseData;

  const update = (updates: Partial<LicenseData>) => {
    updateSectionData(section.id, { ...data, ...updates });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>License Type</Label>
        <Select
          value={data.type}
          onValueChange={(v) => update({ type: v as LicenseType })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {LICENSE_TYPES.map((l) => (
              <SelectItem key={l.value} value={l.value}>
                {l.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="year">Year</Label>
        <Input
          id="year"
          value={data.year}
          onChange={(e) => update({ year: e.target.value })}
          placeholder={new Date().getFullYear().toString()}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="holder">Copyright Holder</Label>
        <Input
          id="holder"
          value={data.copyrightHolder}
          onChange={(e) => update({ copyrightHolder: e.target.value })}
          placeholder="Your name or organization"
        />
      </div>
    </div>
  );
}
