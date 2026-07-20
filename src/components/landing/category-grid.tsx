"use client";

import {
  Zap,
  Search,
  Eye,
  Smartphone,
  FileText,
  Layout,
  Target,
  Shield,
  Code,
} from "lucide-react";
import { CATEGORY_LIST } from "@/lib/constants";

const iconMap = {
  Zap,
  Search,
  Eye,
  Smartphone,
  FileText,
  Layout,
  Target,
  Shield,
  Code,
} as const;

export function CategoryGrid() {
  return (
    <section className="py-20 sm:py-28 bg-secondary/30" id="categories">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            9 analysis categories
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Every angle of your website, evaluated systematically.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORY_LIST.map((cat) => {
            const Icon = iconMap[cat.icon as keyof typeof iconMap] ?? Zap;
            return (
              <div
                key={cat.id}
                className="flex items-start gap-3 rounded-xl border bg-background/50 p-4 transition-colors hover:border-primary/30"
              >
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">{cat.label}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {cat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
