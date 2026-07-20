"use client";

import { useMemo } from "react";
import { useReadmeStore } from "@/store/readme-store";
import { generateMarkdown } from "@/lib/markdown-engine";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function ReadmePreview() {
  const config = useReadmeStore((s) => s.config);

  const markdown = useMemo(() => generateMarkdown(config), [config]);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center border-b border-border px-4 py-2">
        <span className="text-xs font-medium uppercase text-muted-foreground">
          Preview
        </span>
      </div>

      <ScrollArea className="flex-1">
        <div className="prose prose-invert max-w-none p-6">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {markdown}
          </ReactMarkdown>
        </div>
      </ScrollArea>
    </div>
  );
}
