"use client";

import { useReadmeStore } from "@/store/readme-store";
import type { Section, AboutData } from "@/types";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AboutEditorProps {
  section: Section;
}

export function AboutEditor({ section }: AboutEditorProps) {
  const updateSectionData = useReadmeStore((s) => s.updateSectionData);
  const data = section.data as AboutData;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="about-content">Content</Label>
        <Textarea
          id="about-content"
          placeholder="Tell the world about your project..."
          rows={10}
          value={data.content}
          onChange={(e) =>
            updateSectionData(section.id, { ...data, content: e.target.value })
          }
        />
        <p className="text-xs text-muted-foreground">
          Markdown is supported. Use **bold**, *italic*, and [links](url).
        </p>
      </div>
    </div>
  );
}
