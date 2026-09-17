import type { Testimonial } from "@/types/testimonial";

import { TestimonialCarousel } from "./testimonial-carousel";
import { isRenderableTestimonial } from "./testimonial-quote";

/**
 * ProofSection — Section 8, "Client work".
 *
 * Implements `docs/research/components/proof-section.spec.md`.
 * Renders as the page's single mid-page navy band (`.band-navy py-band-anchor`).
 *
 * One content type: the testimonial carousel. The static case-study card that
 * used to sit above it was removed on 2026-09-16, so the band presents client
 * proof in one consistent format rather than a fixed block over a rotating one.
 *
 * Fully gated: returns `null` when no testimonial is supplied with valid
 * client data. Never fabricates placeholders.
 *
 * Stays a Server Component. Only the carousel needs state, and it opens its
 * own client boundary, so the heading is still server-rendered.
 */

export interface ProofSectionProps {
  testimonials?: readonly Testimonial[];
}

export function ProofSection({ testimonials }: ProofSectionProps = {}) {
  const renderableTestimonials = (testimonials ?? []).filter(
    isRenderableTestimonial
  );

  if (renderableTestimonials.length === 0) {
    return null;
  }

  return (
    <section id="proof" className="band-navy bg-background py-band-anchor">
      <div className="max-w-page mx-auto px-md">
        <h2 className="mb-xl text-center text-h2 font-heading text-foreground">
          Client work
        </h2>
        <div className="mx-auto flex max-w-[52rem] flex-col gap-lg">
          <TestimonialCarousel testimonials={renderableTestimonials} />
        </div>
      </div>
    </section>
  );
}
