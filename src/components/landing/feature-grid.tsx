"use client";

import {
  Zap,
  Brain,
  Layers,
  CheckCircle,
  Download,
  Clock,
} from "lucide-react";
import { FEATURES } from "@/lib/constants";

const iconMap = {
  Zap,
  Brain,
  Layers,
  CheckCircle,
  Download,
  Clock,
} as const;

export function FeatureGrid() {
  return (
    <section className="py-20 sm:py-28" id="features">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to analyze a website
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Real technical analysis, not just surface-level checks.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap] ?? Zap;
            return (
              <div
                key={feature.title}
                className="group rounded-xl border bg-card p-6 transition-colors hover:border-primary/30 hover:bg-card/80"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
