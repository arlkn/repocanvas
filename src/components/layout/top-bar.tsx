"use client";

import { useReadmeStore } from "@/store/readme-store";
import { generateMarkdown } from "@/lib/markdown-engine";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { copyToClipboard, downloadFile } from "@/lib/utils";
import { toast } from "sonner";
import {
  Copy,
  Download,
  Search,
  RotateCcw,
} from "lucide-react";

interface TopBarProps {
  onCommandPalette: () => void;
}

export function TopBar({ onCommandPalette }: TopBarProps) {
  const { config, setUsername } = useReadmeStore();

  const handleCopy = async () => {
    const markdown = generateMarkdown(config);
    await copyToClipboard(markdown);
    toast.success("README copied to clipboard");
  };

  const handleDownload = () => {
    const markdown = generateMarkdown(config);
    downloadFile(markdown, "README.md", "text/markdown");
    toast.success("README.md downloaded");
  };

  return (
    <header className="flex items-center gap-3 border-b border-border bg-card px-4 py-2">
      {/* Username */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">github.com/</span>
        <Input
          placeholder="username"
          value={config.username}
          onChange={(e) => setUsername(e.target.value)}
          className="h-8 w-[140px] text-sm"
        />
      </div>

      <div className="flex-1" />

      {/* Actions */}
      <div className="flex items-center gap-1.5">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={onCommandPalette}
          title="Search sections"
        >
          <Search className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => {
            const store = useReadmeStore.getState();
            store.resetConfig();
            toast.success("Config reset");
          }}
          title="Reset"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={handleCopy}
          title="Copy to clipboard"
        >
          <Copy className="h-4 w-4" />
        </Button>

        <Button
          variant="default"
          size="sm"
          className="gap-2 h-8"
          onClick={handleDownload}
        >
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Download</span>
        </Button>
      </div>
    </header>
  );
}
