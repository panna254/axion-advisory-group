import Image from "next/image";

import { IconCaretDown } from "@/components/icons";
import { CtaButton } from "@/components/ui/cta-button";
import { cn } from "@/lib/utils";

/**
 * Hero — section 2 in the approved sequence, full-bleed cinematic layout.
 *
 * One firm, one proposition, one `<h1>`, set over a full-bleed background
 * image with a load-in entrance sequence. This supersedes the previous
 * asymmetric-split layout by explicit client direction — see the
 * "2026-09-14 pivot" note in `docs/research/components/hero.spec.md` for
 * what changed, why, and which anti-slop rules it knowingly overrides.
 */

/* The entrance stagger, in one place, mirroring the table in hero.spec.md.
   Keyframes are defined in globals.css §6; reduced motion is handled there
   too, globally, so nothing here opts out per-element.

   Each value is a COMPLETE literal string. Tailwind's scanner reads source
   text, so building these by interpolating a delay would silently produce no
   CSS at all. */
const ENTRANCE = {
  background: "[animation:hero-bg-in_1.8s_cubic-bezier(0.22,1,0.36,1)_both]",
  overlay: "[animation:hero-overlay-in_1.4s_ease-out_both]",
  eyebrow: "[animation:hero-rise-in_0.7s_cubic-bezier(0.22,1,0.36,1)_0.5s_both]",
  headline: "[animation:hero-rise-in_0.8s_cubic-bezier(0.22,1,0.36,1)_0.65s_both]",
  subtext: "[animation:hero-rise-in_0.8s_cubic-bezier(0.22,1,0.36,1)_0.8s_both]",
  ctaRow: "[animation:hero-rise-in_0.8s_cubic-bezier(0.22,1,0.36,1)_0.95s_both]",
  scrollCue: "[animation:hero-rise-in_0.8s_cubic-bezier(0.22,1,0.36,1)_1.2s_both]",
} as const;

export function Hero() {
  return (
    <section
      id="hero"
      /* band-navy only re-points colour tokens; it never paints a surface, so
         bg-background is required alongside it (commit c7302bb).

         The homepage header overlays this section (`<SiteHeader overlay />`),
         so the photograph runs up under the glass bar. `pt-header` and the
         `+ var(--spacing-header)` on each min-height give that strip back,
         keeping the visible hero exactly 85vh / 92vh below the bar. */
      className="band-navy bg-background relative isolate flex min-h-[calc(85vh+var(--spacing-header))] items-center overflow-hidden pt-header lg:min-h-[calc(92vh+var(--spacing-header))]"
    >
      {/* Background layer. Nairobi skyline, client-supplied. object-center
          keeps the KICC tower in frame at every crop, including the narrow
          mobile one. */}
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        <Image
          src="/images/hero-visuals.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className={cn("object-cover object-center", ENTRANCE.background)}
        />
      </div>

      {/* Legibility overlay, in two measured variants — see the contrast
          table in hero.spec.md. Both are built from --aag-ink, not black.

          Below lg the copy spans nearly the full width, so a horizontal ramp
          would leave its decayed end under live text (measured 1.00:1). A
          flat scrim is the only thing that holds there. */}
      <div
        aria-hidden="true"
        className={cn("absolute inset-0 -z-10 bg-aag-ink/82 lg:hidden", ENTRANCE.overlay)}
      />
      {/* At lg the copy is confined to a 700px column, so the ramp can stay
          dark under it and clear to 12% on the right, where the photograph
          carries the section. */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 -z-10 hidden bg-gradient-to-r from-aag-ink/85 from-0% via-aag-ink/80 via-58% to-aag-ink/12 to-100% lg:block",
          ENTRANCE.overlay
        )}
      />

      <div className="max-w-page relative z-10 mx-auto w-full px-md">
        <div className="max-w-[700px]">
          <p
            className={cn(
              "mb-sm font-body text-small font-medium uppercase tracking-wide text-muted-foreground",
              ENTRANCE.eyebrow
            )}
          >
            Nairobi, Kenya
          </p>
          <h1
            className={cn(
              "mb-md text-balance font-heading text-h1 text-foreground",
              ENTRANCE.headline
            )}
          >
            We advise organisations on strategy, finance, and risk.
          </h1>
          <p
            className={cn(
              "mb-lg max-w-[46ch] text-lead text-muted-foreground",
              ENTRANCE.subtext
            )}
          >
            We help organizations navigate regulatory complexity, strengthen governance, manage risk, and turn strategic priorities into practical, sustainable action.
  
          </p>
          <div className={cn("flex flex-col gap-sm sm:flex-row", ENTRANCE.ctaRow)}>
            <CtaButton
              variant="primary"
              href="#contact"
              className="w-full sm:w-auto"
            >
              Book a consultation
            </CtaButton>
            <CtaButton
              variant="secondary"
              href="#approach"
              className="w-full sm:w-auto"
            >
              See how we work
            </CtaButton>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className={cn(
          "absolute bottom-lg left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2xs text-white/60",
          ENTRANCE.scrollCue
        )}
      >
        <span className="h-8 w-px bg-white/30" />
        <IconCaretDown size="sm" />
      </div>
    </section>
  );
}
