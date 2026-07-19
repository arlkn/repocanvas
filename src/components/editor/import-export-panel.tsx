"use client";

import React from "react";
import { Download, Upload, FileJson, FileText, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useReadmeStore } from "@/store/readme-store";
import { generateMarkdown } from "@/lib/markdown-engine";
import { copyToClipboard, downloadFile } from "@/lib/utils";
import { toast } from "sonner";

export function ImportExportPanel() {
  const { config, exportConfig, importFromJson } = useReadmeStore();
  const [importText, setImportText] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  const markdown = generateMarkdown(config);

  const handleCopyMarkdown = async () => {
    await copyToClipboard(markdown);
    setCopied(true);
    toast.success("Markdown copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    downloadFile(markdown, "README.md");
    toast.success("README.md downloaded!");
  };

  const handleExportJson = () => {
    const json = exportConfig();
    downloadFile(json, "repocanvas-config.json");
    toast.success("Configuration exported!");
  };

  const handleImportJson = () => {
    if (importFromJson(importText)) {
      toast.success("Configuration imported!");
      setImportText("");
    } else {
      toast.error("Invalid JSON configuration");
    }
  };

  const handleImportFile = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json,.md";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const content = ev.target?.result as string;
        if (file.name.endsWith(".json")) {
          if (importFromJson(content)) {
            toast.success("Configuration imported!");
          } else {
            toast.error("Invalid configuration file");
          }
        } else {
          setImportText(content);
          toast.info("Markdown loaded. Edit and import as needed.");
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <div className="p-4 space-y-6">
      <h3 className="text-sm font-semibold">Import / Export</h3>

      <div className="space-y-3">
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Export</h4>

        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" className="gap-2 h-auto py-3 flex-col" onClick={handleDownloadMarkdown}>
            <FileText className="h-5 w-5" />
            <span className="text-xs">README.md</span>
          </Button>
          <Button variant="outline" className="gap-2 h-auto py-3 flex-col" onClick={handleExportJson}>
            <FileJson className="h-5 w-5" />
            <span className="text-xs">JSON Config</span>
          </Button>
        </div>

        <Button variant="outline" className="w-full gap-2" onClick={handleCopyMarkdown}>
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied!" : "Copy Markdown"}
        </Button>
      </div>

      <div className="space-y-3">
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Import</h4>

        <Button variant="outline" className="w-full gap-2" onClick={handleImportFile}>
          <Upload className="h-4 w-4" />
          Import File
        </Button>

        <Textarea
          value={importText}
          onChange={(e) => setImportText(e.target.value)}
          placeholder="Paste JSON configuration here..."
          className="h-32 text-xs font-mono"
        />

        <Button
          variant="default"
          className="w-full"
          onClick={handleImportJson}
          disabled={!importText.trim()}
        >
          Import Configuration
        </Button>
      </div>
    </div>
  );
}
