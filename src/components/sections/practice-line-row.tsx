"use client";

import { useId, useState } from "react";

import { IconCaretDown } from "@/components/icons";
import { cn } from "@/lib/utils";
import type { Service } from "@/types/service";

interface PracticeLineRowProps {
  service: Service;
}

/**
 * One practice line inside a `ClusterRow`: name and a one-sentence summary,
 * collapsed by default. The whole row is the disclosure trigger — clicking
 * (or Enter/Space) reveals `service.detail` underneath.
 *
 * No icon. The name is the client's own and already says what the line is;
 * a glyph beside it only repeated that, and cost a column of width on phones.
 *
 * Height is animated with the CSS grid `0fr` -> `1fr` trick rather than
 * `max-height`, so the transition tracks the detail text's real height at
 * any viewport width instead of racing to an arbitrary cap. `grid-rows-*`
 * classes carry the animation; the inner `overflow-hidden` wrapper clips the
 * content while the row is collapsed.
 */
export function PracticeLineRow({ service }: PracticeLineRowProps) {
  const [expanded, setExpanded] = useState(false);
  const detailId = useId();

  return (
    <li>
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={detailId}
        onClick={() => setExpanded((prev) => !prev)}
        className="group flex w-full items-start gap-md rounded-sm text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      >
        <span className="min-w-0 flex-1">
          <span className="block text-lead font-medium text-foreground transition-colors duration-200 group-hover:text-action-text">
            {service.name}
          </span>
          <span className="mt-2xs block text-pretty text-body text-muted-foreground">
            {service.summary}
          </span>
        </span>
        <IconCaretDown
          size="sm"
          className={cn(
            "mt-1 shrink-0 text-muted-foreground transition-[transform,color] duration-200 group-hover:text-action-text",
            expanded && "rotate-180",
          )}
        />
      </button>
      <div
        id={detailId}
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <p
            aria-hidden={!expanded}
            className="pt-sm pr-[calc(var(--spacing-md)+1.25rem)] text-pretty text-body text-foreground"
          >
            {service.detail}
          </p>
        </div>
      </div>
    </li>
  );
}
