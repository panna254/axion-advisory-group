import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
   Axion Advisory Group identity.

   The mark is constructed, not traced. Two forms sit side by side, each one a
   flat-bottomed rectangle whose top is a full semicircle: the arc radius (25)
   is exactly half the form width (50), so the top is fully round rather than
   merely rounded. Nothing here is derived from a photograph or from any
   reference site.

   Geometry, in the 128 x 112 viewBox:
     form width      50      gap between forms   12
     side margins     8      top / bottom        12
     arc radius      25      arc centre y        37
     flat bottom  y=100      straight sides run y=37 -> y=100

   Colour comes from tokens, so the type flips correctly inside a .band-navy
   section without the component knowing which surface it is on. The shields
   are crimson and cyan on every surface; only the type changes. See the logo
   token block in globals.css for why.
--------------------------------------------------------------------------- */

const MARK_VIEW_BOX = "0 0 128 112";
const SHIELD_LEFT = "M8 100 L8 37 A25 25 0 0 1 58 37 L58 100 Z";
const SHIELD_RIGHT = "M70 100 L70 37 A25 25 0 0 1 120 37 L120 100 Z";

export type AagLogoVariant = "full" | "mark" | "wordmark";

export interface AagLogoProps {
  /**
   * `mark` renders the two forms alone.
   * `wordmark` adds AAG, for the header and any tight horizontal slot.
   * `full` adds the AXION ADVISORY GROUP lockup beneath the wordmark.
   */
  variant?: AagLogoVariant;
  /**
   * Renders both forms and all type in `currentColor`. For the footer, and
   * anywhere the identity has to sit inside a single-colour context.
   */
  mono?: boolean;
  /** Accessible name. Only used by the `mark` variant, which carries no text. */
  label?: string;
  className?: string;
}

interface ShieldMarkProps {
  mono?: boolean;
  title?: string;
  className?: string;
}

function ShieldMark({ mono, title, className }: ShieldMarkProps) {
  return (
    <svg
      viewBox={MARK_VIEW_BOX}
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <path
        d={SHIELD_LEFT}
        className={mono ? "fill-current" : "fill-logo-shield-start"}
      />
      <path
        d={SHIELD_RIGHT}
        className={mono ? "fill-current" : "fill-logo-shield-end"}
      />
    </svg>
  );
}

/**
 * The identity lockup.
 *
 * Scale is taken from the element's own font size, so the mark and the type
 * always move together. Set the overall size with a font-size utility on
 * `className`, not by sizing the svg.
 *
 * Do not render below `text-base`. The wordmark is 1.65em, which puts AAG at
 * 26.4px when the root is 16px. On paper the wordmark is cyan-deep at 3.92:1,
 * which clears AA as large text (>=24px) but not as body text. Shrinking the
 * root below 1rem drops it under that line.
 */
export function AagLogo({
  variant = "full",
  mono = false,
  label = "Axion Advisory Group",
  className,
}: AagLogoProps) {
  if (variant === "mark") {
    return (
      <ShieldMark
        mono={mono}
        title={label}
        className={cn("h-[2em] w-auto", className)}
      />
    );
  }

  return (
    <span
      className={cn("inline-flex items-center gap-[0.55em] text-base", className)}
    >
      <ShieldMark mono={mono} className="h-[2em] w-auto shrink-0" />

      <span className="flex flex-col justify-center gap-[0.22em]">
        {/* Wordmark and lockup are separate nodes so each takes its own
            tracking, size and colour. On `full` the wordmark is hidden from
            assistive tech, since the lockup below already says the name. */}
        {/* 400 at display size, 600 for the small lockup — the lockup runs at
            0.62em against the wordmark's 1.65em, and the extra weight keeps
            it legible at that size and tracking. */}
        <span
          aria-hidden={variant === "full" ? true : undefined}
          className={cn(
            "font-display text-[1.65em] leading-none font-normal tracking-wordmark",
            mono ? "text-current" : "text-logo-wordmark",
          )}
        >
          AAG
        </span>

        {variant === "full" ? (
          <span
            className={cn(
              "font-display text-[0.62em] leading-none font-semibold whitespace-nowrap tracking-lockup",
              mono ? "text-current" : "text-logo-lockup",
            )}
          >
            AXION ADVISORY GROUP
          </span>
        ) : null}
      </span>
    </span>
  );
}
