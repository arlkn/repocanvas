"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/landing/hero-section";
import { FeatureGrid } from "@/components/landing/feature-grid";
import { CategoryGrid } from "@/components/landing/category-grid";
import { HowItWorks } from "@/components/landing/how-it-works";
import { UrlForm } from "@/features/url-form/url-form";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <HeroSection />
        <FeatureGrid />
        <CategoryGrid />
        <HowItWorks />

        {/* Bottom CTA */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to analyze your website?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Get actionable insights in seconds. No account required.
            </p>
            <div className="mx-auto mt-8 max-w-xl">
              <UrlForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
