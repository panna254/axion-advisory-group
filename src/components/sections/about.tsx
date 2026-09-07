import { AagLogo } from "@/components/brand/AagLogo";
import { IconArrowRight } from "@/components/icons";

interface AboutProps {
  /**
   * Founding-story paragraph. Currently unsourced client content — every
   * caller today omits this, and the section renders correctly without it.
   */
  bodyOne?: string;
  /**
   * Team size / qualifications paragraph. Currently unsourced client
   * content — every caller today omits this, and the section renders
   * correctly without it.
   */
  bodyTwo?: string;
}

/**
 * Section 6, "Who we are". Text-led, single portrait, visual on the left —
 * the mirror of the hero's split, which puts its visual on the right.
 *
 * `bodyOne` and `bodyTwo` are both unsourced client content as of this
 * build. Each is gated independently: a paragraph renders only when its
 * text is supplied, and no bracketed placeholder ever ships in its place.
 * With both omitted, the content column ends at the lead paragraph and the
 * CTA link — that is the section's normal, expected state today.
 */
export function About({ bodyOne, bodyTwo }: AboutProps) {
  return (
    <section id="about" className="py-band">
      <div className="max-w-page mx-auto px-md">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-start gap-2xl">
          <div className="lg:col-span-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-muted">
              <div className="absolute inset-0 flex items-center justify-center">
                <AagLogo variant="mark" className="h-24 w-auto opacity-15" label="" />
              </div>
            </div>
          </div>
          <div className="lg:col-span-8">
            <h2 className="mb-md text-h2 font-display font-normal text-foreground">
              Who we are
            </h2>
            <p className="mb-lg max-w-[52ch] text-lead text-foreground">
              Axion Advisory Group advises businesses across Kenya on the
              decisions that move a balance sheet. Strategy, finance, people,
              and risk sit in one practice.
            </p>
            {bodyOne && (
              <p className="mb-md max-w-[65ch] text-body text-muted-foreground">
                {bodyOne}
              </p>
            )}
            {bodyTwo && (
              <p className="mb-md max-w-[65ch] text-body text-muted-foreground">
                {bodyTwo}
              </p>
            )}
            <a
              href="#about"
              className="mt-sm inline-flex items-center gap-2xs text-body font-sans font-medium text-action-text underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-px"
            >
              Read about the firm
              <IconArrowRight size="sm" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
