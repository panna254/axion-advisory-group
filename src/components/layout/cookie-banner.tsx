"use client";

import { useState } from "react";
import { IconCheck } from "@/components/icons";
import { cn } from "@/lib/utils";

interface CookieBannerProps {
  notice?: string;
}

/**
 * CookieBanner — demonstration/evaluation consent notification.
 *
 * Implements Step 8 for evaluating layout, wrapping, and spacing of COOKIE-BODY copy.
 * Uses local state for dismissal. Renders null if notice is omitted.
 */
export function CookieBanner({ notice }: CookieBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (!notice || dismissed) {
    return null;
  }

  return (
    <aside
      role="region"
      aria-label="Cookie and data protection notice"
      className={cn(
        "fixed bottom-0 inset-x-0 z-50 border-t border-border bg-card/95 backdrop-blur-sm p-md",
        "transition-transform duration-200"
      )}
    >
      <div className="max-w-page mx-auto flex flex-col items-start justify-between gap-md sm:flex-row sm:items-center">
        <p className="text-caption text-muted-foreground max-w-prose">
          {notice}
        </p>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className={cn(
            "inline-flex items-center gap-2xs rounded-lg border border-stroke-systems px-md py-xs",
            "text-caption font-sans font-medium text-foreground whitespace-nowrap",
            "transition-colors duration-200 hover:bg-muted active:translate-y-px",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          )}
        >
          <IconCheck size="sm" className="text-stroke-systems" />
          <span>Acknowledge</span>
        </button>
      </div>
    </aside>
  );
}

