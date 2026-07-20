"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  validateAndNormalizeUrl,
  UrlValidationError,
} from "@/lib/url-validation";
import { ArrowRight, Loader2, Globe } from "lucide-react";

const urlSchema = z.object({
  url: z
    .string()
    .min(1, "Please enter a URL")
    .max(2048, "URL is too long"),
});

type UrlFormValues = z.infer<typeof urlSchema>;

interface UrlFormProps {
  compact?: boolean;
}

export function UrlForm({ compact = false }: UrlFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UrlFormValues>({
    resolver: zodResolver(urlSchema),
  });

  const onSubmit = useCallback(
    async (data: UrlFormValues) => {
      setError(null);
      setIsSubmitting(true);

      try {
        const validated = validateAndNormalizeUrl(data.url);
        const encodedUrl = encodeURIComponent(validated.href);
        router.push(`/analyze?url=${encodedUrl}`);
      } catch (err) {
        if (err instanceof UrlValidationError) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
        setIsSubmitting(false);
      }
    },
    [router]
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full"
      noValidate
      aria-label="Website analysis form"
    >
      <div className={compact ? "flex gap-2" : "space-y-2"}>
        <div className={compact ? "flex-1" : ""}>
          <Label htmlFor="url-input" className="sr-only">
            Website URL
          </Label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="url-input"
              type="url"
              placeholder="example.com"
              autoComplete="url"
              spellCheck={false}
              disabled={isSubmitting}
              className={`${compact ? "h-12 pl-10" : "h-14 pl-10 text-base"} ${error ? "border-destructive" : ""}`}
              aria-invalid={!!error}
              aria-describedby={error ? "url-error" : undefined}
              {...register("url")}
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          size={compact ? "default" : "lg"}
          className={`${compact ? "h-12 px-6" : "h-14 w-full sm:w-auto px-8"} font-semibold`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              Analyze Website
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>

      {(error || errors.url) && (
        <p
          id="url-error"
          role="alert"
          className="mt-2 text-sm text-destructive"
        >
          {error || errors.url?.message}
        </p>
      )}

      {!compact && (
        <p className="mt-3 text-xs text-muted-foreground">
          Enter any public website URL. Supports HTTP and HTTPS.
        </p>
      )}
    </form>
  );
}
