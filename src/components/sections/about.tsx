import Image from "next/image";

import { AagLogo } from "@/components/brand/AagLogo";
import { IconArrowRight } from "@/components/icons";
import type { ImageAsset } from "@/types/content";

interface AboutProps {
  /**
   * The section's image, from `ABOUT_IMAGE` in `src/lib/site-content.ts`.
   * When omitted, the frame shows the placeholder mark instead.
   */
  image?: Pick<ImageAsset, "src" | "alt">;
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
export function About({ image, bodyOne, bodyTwo }: AboutProps) {
  return (
    <section id="about" className="py-band">
      <div className="max-w-page mx-auto px-md">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-start gap-2xl">
          <div className="lg:col-span-4">
            {/* 3:2 while the section is stacked, so the landscape photograph
                shows whole above the heading instead of a tall panel of night
                sky. 4:5 at lg, where it stands beside the text column. */}
            <div className="relative aspect-[3/2] overflow-hidden rounded-xl bg-muted lg:aspect-[4/5]">
              {image ? (
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  /* `sizes` is the width the photograph renders at, not the
                     frame's. At lg the 4:5 frame is at most 362 x 452px, and
                     `object-cover` scales a 3:2 image to that height, so it
                     renders 452 x 1.5 = 678px wide. Stacked, the 3:2 frame
                     matches the photograph and it renders at frame width.
                     Below the fold, so it loads lazily, the default. */
                  sizes="(min-width: 1024px) 680px, 100vw"
                  /* The 4:5 crop keeps the middle half of the frame's width.
                     62% sets it on the lit towers rather than the dark left
                     edge. No effect at 3:2, where nothing is cropped. */
                  className="object-cover lg:object-[62%_50%]"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <AagLogo variant="mark" className="h-24 w-auto opacity-15" label="" />
                </div>
              )}
            </div>
          </div>
          <div className="lg:col-span-8">
            <h2 className="mb-md text-h2 font-heading text-foreground">
              Who we are
            </h2>
            <p className="mb-lg max-w-[52ch] text-lead text-foreground">
              Axion Advisory Group advises businesses and organisations across the globe on the
              decisions that move them forward. We help our clients navigate complex challenges, seize opportunities, and achieve their goals with confidence. Our team of experienced professionals brings a wealth of knowledge and expertise to every engagement, ensuring that our clients receive the highest level of service and support.
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
              className="mt-sm inline-flex items-center gap-2xs text-body font-body font-medium text-action-text underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-px"
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
