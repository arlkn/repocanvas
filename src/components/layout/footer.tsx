import { APP_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t bg-background/50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">
              &copy; {new Date().getFullYear()} {APP_NAME}
            </span>
          </div>

          <p className="max-w-md text-center text-xs text-muted-foreground">
            {APP_NAME} provides automated website analysis and heuristic
            recommendations. It is not a substitute for a complete manual
            accessibility audit, penetration test, legal review, or professional
            SEO consultation.
          </p>
        </div>
      </div>
    </footer>
  );
}
