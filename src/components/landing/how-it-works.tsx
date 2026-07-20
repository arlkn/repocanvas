"use client";

import { Link, Play, BarChart3, Rocket } from "lucide-react";
import { HOW_IT_WORKS_STEPS } from "@/lib/constants";

const iconMap = { Link, Play, BarChart3, Rocket } as const;

export function HowItWorks() {
  return (
    <section className="py-20 sm:py-28" id="how-it-works">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How it works
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Four steps to a comprehensive website analysis.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {HOW_IT_WORKS_STEPS.map((step) => {
            const Icon = iconMap[step.icon as keyof typeof iconMap] ?? Play;
            return (
              <div key={step.step} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">
                  Step {step.step}
                </div>
                <h3 className="font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
