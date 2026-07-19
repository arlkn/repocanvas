"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { generateWithAI, configureAI, getAIConfig } from "./ai-service";
import type { AIRequest } from "@/types";
import { Sparkles, Loader2, Copy, Check, Settings2 } from "lucide-react";
import { toast } from "sonner";
import { copyToClipboard } from "@/lib/utils";

const AI_TYPES: { type: AIRequest["type"]; label: string; description: string }[] = [
  { type: "description", label: "Description", description: "Write a project description" },
  { type: "bio", label: "Bio", description: "Create a developer bio" },
  { type: "installation", label: "Installation", description: "Generate install instructions" },
  { type: "features", label: "Features", description: "Create a feature list" },
  { type: "contribution", label: "Contributing", description: "Write contribution guide" },
  { type: "documentation", label: "Documentation", description: "Improve documentation" },
];

export function AIAssistant({ onInsert }: { onInsert?: (content: string) => void }) {
  const [selectedType, setSelectedType] = React.useState<AIRequest["type"]>("description");
  const [context, setContext] = React.useState("");
  const [prompt, setPrompt] = React.useState("");
  const [result, setResult] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [showSettings, setShowSettings] = React.useState(false);
  const [apiKey, setApiKey] = React.useState("");

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const response = await generateWithAI({
        type: selectedType,
        context: context || "project",
        prompt,
      });

      if (response.error) {
        toast.error(response.error);
      } else {
        setResult(response.content);
      }
    } catch {
      toast.error("Failed to generate content");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    await copyToClipboard(result);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveApiKey = () => {
    configureAI({ apiKey, provider: apiKey ? "openai" : "local" });
    setShowSettings(false);
    toast.success("AI settings saved");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-purple-500" />
          <h3 className="text-sm font-semibold">AI Assistant</h3>
          <Badge variant="secondary" className="text-[10px]">
            {getAIConfig().provider === "local" ? "Local" : "OpenAI"}
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() => setShowSettings(!showSettings)}
        >
          <Settings2 className="h-3.5 w-3.5" />
        </Button>
      </div>

      {showSettings && (
        <div className="rounded-lg border border-border p-3 space-y-2">
          <Label className="text-xs">OpenAI API Key (optional)</Label>
          <div className="flex gap-2">
            <Input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              className="h-8 text-xs"
            />
            <Button size="sm" className="h-8" onClick={handleSaveApiKey}>
              Save
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground">
            Leave empty to use built-in templates. Add an API key for AI-powered generation.
          </p>
        </div>
      )}

      <div className="space-y-2">
        <Label className="text-xs">Generation Type</Label>
        <div className="flex flex-wrap gap-1.5">
          {AI_TYPES.map(({ type, label }) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                selectedType === type
                  ? "bg-purple-500/10 text-purple-500 border border-purple-500/30"
                  : "bg-muted text-muted-foreground hover:text-foreground border border-transparent"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-xs">Project / Context</Label>
        <Input
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="e.g. RepoCanvas, a README builder"
          className="h-8 text-xs"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs">Prompt</Label>
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe what you want to generate..."
          className="h-20 text-xs"
        />
      </div>

      <Button
        onClick={handleGenerate}
        disabled={loading || !prompt.trim()}
        className="w-full gap-2"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Sparkles className="h-4 w-4" />
        )}
        {loading ? "Generating..." : "Generate"}
      </Button>

      {result && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs">Generated Content</Label>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleCopy}>
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              </Button>
              {onInsert && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 text-[10px]"
                  onClick={() => onInsert(result)}
                >
                  Insert
                </Button>
              )}
            </div>
          </div>
          <div className="rounded-lg border border-border bg-muted/30 p-3 text-xs font-mono whitespace-pre-wrap max-h-48 overflow-y-auto">
            {result}
          </div>
        </div>
      )}
    </div>
  );
}
