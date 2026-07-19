"use client";

import React from "react";
import {
  Undo2,
  Redo2,
  Download,
  Copy,
  Moon,
  Sun,
  Monitor,
  Eye,
  PenLine,
  Columns2,
  Sparkles,
  Command,
  RotateCcw,
  Upload,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useReadmeStore } from "@/store/readme-store";
import { useTheme } from "@/hooks/use-theme";
import { copyToClipboard, downloadFile } from "@/lib/utils";
import { generateMarkdown } from "@/lib/markdown-engine";
import { toast } from "sonner";

export function TopBar() {
  const {
    config,
    viewMode,
    setViewMode,
    setCommandPaletteOpen,
    undo,
    redo,
    historyIndex,
    history,
    setUsername,
    importFromJson,
    exportConfig,
  } = useReadmeStore();

  const { theme, setTheme } = useTheme();
  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const handleCopy = async () => {
    const markdown = generateMarkdown(config);
    await copyToClipboard(markdown);
    toast.success("Markdown copied to clipboard!");
  };

  const handleDownload = () => {
    const markdown = generateMarkdown(config);
    downloadFile(markdown, "README.md");
    toast.success("README.md downloaded!");
  };

  const handleImportJson = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const json = ev.target?.result as string;
        if (importFromJson(json)) {
          toast.success("Configuration imported!");
        } else {
          toast.error("Invalid configuration file");
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handleExportJson = () => {
    const json = exportConfig();
    downloadFile(json, "repocanvas-config.json");
    toast.success("Configuration exported!");
  };

  const viewModes = [
    { mode: "editor" as const, icon: PenLine, label: "Editor" },
    { mode: "split" as const, icon: Columns2, label: "Split" },
    { mode: "preview" as const, icon: Eye, label: "Preview" },
  ];

  const themeOptions = [
    { value: "light" as const, icon: Sun, label: "Light" },
    { value: "dark" as const, icon: Moon, label: "Dark" },
    { value: "system" as const, icon: Monitor, label: "System" },
  ];

  return (
    <header className="h-14 border-b border-border bg-card/80 backdrop-blur-sm flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-[10px]">RC</span>
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight">RepoCanvas</h1>
            <p className="text-[10px] text-muted-foreground leading-none hidden sm:block">README Builder</p>
          </div>
        </div>

        <div className="h-6 w-px bg-border mx-1 hidden sm:block" />

        <div className="hidden sm:flex items-center gap-1">
          <Input
            value={config.username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="GitHub username"
            className="h-8 w-44 text-xs"
          />
        </div>
      </div>

      <div className="flex items-center gap-1">
        <div className="hidden md:flex items-center bg-muted rounded-lg p-1 gap-0.5">
          {viewModes.map(({ mode, icon: Icon, label }) => (
            <Tooltip key={mode}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setViewMode(mode)}
                  className={cn(
                    "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all",
                    viewMode === mode
                      ? "bg-background shadow-sm text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span className="hidden lg:inline">{label}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent>{label} view</TooltipContent>
            </Tooltip>
          ))}
        </div>

        <div className="h-6 w-px bg-border mx-1 hidden sm:block" />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={undo}
              disabled={!canUndo}
            >
              <Undo2 className="h-3.5 w-3.5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Undo (Ctrl+Z)</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={redo}
              disabled={!canRedo}
            >
              <Redo2 className="h-3.5 w-3.5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Redo (Ctrl+Shift+Z)</TooltipContent>
        </Tooltip>

        <div className="h-6 w-px bg-border mx-1 hidden sm:block" />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleCopy}>
              <Copy className="h-3.5 w-3.5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Copy Markdown</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleDownload}>
              <Download className="h-3.5 w-3.5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Download README.md</TooltipContent>
        </Tooltip>

        <div className="h-6 w-px bg-border mx-1 hidden sm:block" />

        <div className="hidden sm:block">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
              >
                {theme === "light" ? (
                  <Sun className="h-3.5 w-3.5" />
                ) : theme === "dark" ? (
                  <Moon className="h-3.5 w-3.5" />
                ) : (
                  <Monitor className="h-3.5 w-3.5" />
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" sideOffset={8} className="w-40 p-1">
              {themeOptions.map(({ value, icon: Icon, label }) => (
                <button
                  key={value}
                  className={cn(
                    "w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors text-left",
                    theme === value
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-accent/50"
                  )}
                  onClick={() => setTheme(value)}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </PopoverContent>
          </Popover>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCommandPaletteOpen(true)}
            >
              <Command className="h-3.5 w-3.5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Command Palette (Ctrl+K)</TooltipContent>
        </Tooltip>
      </div>
    </header>
  );
}
