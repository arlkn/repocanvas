"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Copy, Download, Code, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useReadmeStore } from "@/store/readme-store";
import { generateMarkdown } from "@/lib/markdown-engine";
import { copyToClipboard, downloadFile } from "@/lib/utils";
import { toast } from "sonner";

function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none
      prose-headings:font-bold prose-headings:tracking-tight
      prose-h1:text-3xl prose-h1:mb-4
      prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:border-b prose-h2:pb-2 prose-h2:border-border
      prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3
      prose-p:text-muted-foreground prose-p:leading-relaxed
      prose-a:text-blue-500 prose-a:no-underline hover:prose-a:underline
      prose-strong:text-foreground
      prose-code:text-pink-500 prose-code:font-mono prose-code:text-sm prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
      prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:rounded-lg
      prose-img:rounded-lg prose-img:shadow-md
      prose-li:text-muted-foreground
      prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground
      prose-table:text-sm
      prose-th:text-foreground prose-td:text-muted-foreground
      prose-hr:border-border
    ">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}

function CodeView({ content }: { content: string }) {
  return (
    <pre className="text-sm font-mono text-muted-foreground whitespace-pre-wrap break-words p-4 bg-muted/30 rounded-lg border border-border overflow-auto">
      <code>{content}</code>
    </pre>
  );
}

export function ReadmePreview() {
  const { config } = useReadmeStore();
  const [activeTab, setActiveTab] = React.useState("preview");

  const markdown = generateMarkdown(config);

  const handleCopy = async () => {
    await copyToClipboard(markdown);
    toast.success("Markdown copied to clipboard!");
  };

  const handleDownload = () => {
    downloadFile(markdown, "README.md");
    toast.success("README.md downloaded!");
  };

  return (
    <div className="h-full flex flex-col bg-card border-l border-border">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border shrink-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex items-center justify-between">
            <TabsList className="h-8">
              <TabsTrigger value="preview" className="text-xs gap-1.5 px-3">
                <Eye className="h-3 w-3" />
                Preview
              </TabsTrigger>
              <TabsTrigger value="code" className="text-xs gap-1.5 px-3">
                <Code className="h-3 w-3" />
                Source
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleCopy}>
                <Copy className="h-3.5 w-3.5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleDownload}>
                <Download className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </Tabs>
      </div>

      <ScrollArea className="flex-1">
        {activeTab === "preview" ? (
          <div className="p-6 bg-white dark:bg-[#0d1117] min-h-full">
            <MarkdownRenderer content={markdown} />
          </div>
        ) : (
          <div className="p-4">
            <CodeView content={markdown} />
          </div>
        )}
      </ScrollArea>
    </div>
  );
}