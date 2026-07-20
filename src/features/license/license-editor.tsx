"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useReadmeStore } from "@/store/readme-store";
import type { LicenseData, LicenseType } from "@/types";
import { cn } from "@/lib/utils";

const LICENSE_OPTIONS: { value: LicenseType; label: string }[] = [
  { value: "MIT", label: "MIT" },
  { value: "Apache-2.0", label: "Apache 2.0" },
  { value: "GPL-3.0", label: "GPL 3.0" },
  { value: "BSD-3-Clause", label: "BSD 3-Clause" },
  { value: "Unlicense", label: "Unlicense" },
];

export function LicenseEditor() {
  const { config, activeSection, updateSection } = useReadmeStore();
  const section = config.sections.find((s) => s.id === activeSection);

  if (!section || section.type !== "license") return null;

  const data = section.data as LicenseData;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>License Type</Label>
        <div className="grid grid-cols-3 gap-2">
          {LICENSE_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => updateSection(section.id, { ...data, licenseType: option.value })}
              className={cn(
                "px-3 py-2 rounded-lg text-xs font-medium border transition-all",
                data.licenseType === option.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border hover:border-primary/50 text-muted-foreground"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="license-year">Year</Label>
        <Input
          id="license-year"
          value={data.year}
          onChange={(e) => updateSection(section.id, { ...data, year: e.target.value })}
          placeholder="2026"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="license-name">Copyright Holder Name</Label>
        <Input
          id="license-name"
          value={data.copyrightName}
          onChange={(e) => updateSection(section.id, { ...data, copyrightName: e.target.value })}
          placeholder="Your Name or Organization"
        />
        <p className="text-xs text-muted-foreground">
          Leave empty to use your GitHub username from the Header section.
        </p>
      </div>
    </div>
  );
}
