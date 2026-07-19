"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { fetchGitHubRepo, parseGitHubUrl } from "./github-service";
import { useReadmeStore } from "@/store/readme-store";
import { TECHNOLOGIES } from "@/lib/constants";
import type { GitHubRepo } from "@/types";
import { GitFork, Search, Loader2, Star, ExternalLink } from "lucide-react";
import { toast } from "sonner";

export function GitHubImportModal() {
  const [open, setOpen] = React.useState(false);
  const [url, setUrl] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [repo, setRepo] = React.useState<GitHubRepo | null>(null);
  const [error, setError] = React.useState("");

  const { config, updateSection } = useReadmeStore();

  const handleFetch = async () => {
    const parsed = parseGitHubUrl(url);
    if (!parsed) {
      setError("Invalid GitHub URL. Use format: owner/repo or full URL");
      return;
    }

    setLoading(true);
    setError("");
    setRepo(null);

    try {
      const fetchedRepo = await fetchGitHubRepo(parsed.owner, parsed.repo);
      setRepo(fetchedRepo);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch repository");
    } finally {
      setLoading(false);
    }
  };

  const handleImport = () => {
    if (!repo) return;

    const headerSection = config.sections.find((s) => s.type === "header");
    if (headerSection) {
      updateSection(headerSection.id, {
        ...headerSection.data,
        name: repo.name,
        bio: repo.description,
      });
    }

    const techSection = config.sections.find((s) => s.type === "tech-stack");
    if (techSection) {
      const matchedTech = repo.languages
        .map((lang) => TECHNOLOGIES.find((t) => t.name.toLowerCase() === lang.toLowerCase()))
        .filter((t): t is typeof TECHNOLOGIES[number] => t !== undefined);
      updateSection(techSection.id, {
        ...techSection.data,
        selectedTech: matchedTech,
      });
    }

    toast.success(`Imported "${repo.name}" repository data`);
    setOpen(false);
    setUrl("");
    setRepo(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <GitFork className="h-4 w-4" />
          Import from GitHub
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GitFork className="h-5 w-5" />
            Import from GitHub
          </DialogTitle>
          <DialogDescription>
            Fetch repository data to auto-populate your README fields
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="repo-url">Repository URL or owner/repo</Label>
            <div className="flex gap-2">
              <Input
                id="repo-url"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setError("");
                }}
                placeholder="arlkn/detach or https://github.com/arlkn/detach"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleFetch();
                }}
              />
              <Button
                onClick={handleFetch}
                disabled={loading || !url.trim()}
                size="icon"
                className="shrink-0"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </Button>
            </div>
            {error && <p className="text-xs text-destructive">{error}</p>}
          </div>

          {repo && (
            <div className="rounded-lg border border-border p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold">{repo.name}</h4>
                  <p className="text-sm text-muted-foreground">{repo.description}</p>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="h-4 w-4" />
                  {repo.stars}
                </div>
              </div>

              {repo.languages.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {repo.languages.map((lang) => (
                    <Badge key={lang} variant="secondary" className="text-[10px]">
                      {lang}
                    </Badge>
                  ))}
                </div>
              )}

              {repo.topics.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {repo.topics.map((topic) => (
                    <Badge key={topic} variant="outline" className="text-[10px]">
                      {topic}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                {repo.license !== "None" && <span>License: {repo.license}</span>}
                {repo.homepage && (
                  <a
                    href={repo.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-foreground transition-colors"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Website
                  </a>
                )}
              </div>

              <Button onClick={handleImport} className="w-full">
                Import Repository Data
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
