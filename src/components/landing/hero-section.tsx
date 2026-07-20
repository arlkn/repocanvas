"use client";

import { UrlForm } from "@/features/url-form/url-form";
import { SpectrumPrism } from "@/components/layout/logo";
import { Badge } from "@/components/ui/badge";
import { APP_TAGLINE } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28 lg:py-36">
      {/* Background gradient decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary/10 via-accent/5 to-transparent blur-3xl" />
        <div className="absolute top-1/3 left-1/4 h-[300px] w-[300px] rounded-full bg-spectrum-cyan/5 blur-3xl" />
        <div className="absolute top-1/2 right-1/4 h-[300px] w-[300px] rounded-full bg-spectrum-violet/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <Badge
          variant="secondary"
          className="mb-6 inline-flex items-center gap-2 px-4 py-1.5"
        >
          <SpectrumPrism className="h-3.5 w-3.5" />
          <span className="text-xs font-medium">AI-Powered Website Analysis</span>
        </Badge>

        <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          <span className="bg-gradient-to-r from-primary via-accent to-spectrum-violet bg-clip-text text-transparent">
            Inspectra
          </span>
        </h1>

        <p className="mt-4 text-xl font-medium text-muted-foreground sm:text-2xl">
          {APP_TAGLINE}
        </p>

        <p className="mx-auto mt-4 max-w-2xl text-balance text-base text-muted-foreground/80">
          Get comprehensive analysis of performance, SEO, accessibility, content
          quality, UX, and more — powered by real technical tools and
          AI-powered insights.
        </p>

        <div className="mx-auto mt-10 max-w-xl">
          <UrlForm />
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground/60">
          <span>No sign-up required</span>
          <span className="hidden sm:inline">&middot;</span>
          <span>Free analysis</span>
          <span className="hidden sm:inline">&middot;</span>
          <span>Instant results</span>
        </div>
      </div>
    </section>
  );
}
