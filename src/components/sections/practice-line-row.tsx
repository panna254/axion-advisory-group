"use client";

import { useId, useState } from "react";

import { IconCaretDown } from "@/components/icons";
import { SERVICE_ICONS } from "@/lib/services-data";
import { cn } from "@/lib/utils";
import type { Service } from "@/types/service";

interface PracticeLineRowProps {
  service: Service;
}

/**
 * One practice line inside a `ClusterCard`: icon, name, and a one-sentence
 * summary, collapsed by default. The whole row is the disclosure trigger —
 * clicking (or Enter/Space) reveals `service.detail` underneath.
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
  const Icon = SERVICE_ICONS[service.slug];

  return (
    <li>
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={detailId}
        onClick={() => setExpanded((prev) => !prev)}
        className={cn(
          "w-full flex items-start gap-sm text-left rounded-lg p-xs -mx-xs",
          "transition-colors duration-200 hover:bg-muted active:bg-secondary",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        )}
      >
        <Icon size="md" className="shrink-0 text-stroke-systems" />
        <div className="min-w-0 flex-1">
          <p className="font-sans font-semibold text-body text-foreground">
            {service.name}
          </p>
          <p className="text-body text-muted-foreground">{service.summary}</p>
        </div>
        <IconCaretDown
          size="sm"
          className={cn(
            "shrink-0 text-muted-foreground transition-transform duration-200",
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
            className="pt-2xs pr-xs pb-xs pl-[2.75rem] text-body text-muted-foreground"
          >
            {service.detail}
          </p>
        </div>
      </div>
    </li>
  );
}
