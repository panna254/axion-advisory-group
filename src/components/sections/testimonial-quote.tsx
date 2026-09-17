import type { Testimonial } from "@/types/testimonial";

/**
 * TestimonialQuote — one slide of `TestimonialCarousel`.
 *
 * Presentation only: no state, no effects, no client boundary of its own. It
 * is rendered inside a Client Component, so it travels in that bundle, but it
 * stays a plain function of its props so the carousel owns all the behaviour
 * and this file stays reviewable as a piece of typography.
 *
 * Still gated. `CONTENT.md`'s zero-fabrication rule applies per record, not
 * per section: a quote missing its text or its attribution returns `null`
 * rather than render an anonymous or half-attributed version, because
 * permission to publish attaches to the attribution and not to the words
 * alone. The carousel filters on the same condition, so a gated record is
 * dropped from the slide count rather than becoming an empty slide.
 *
 * See `docs/research/components/testimonial-quote.spec.md` for the full
 * visual and behavioural contract this implements.
 */

type TestimonialQuoteProps = {
  testimonial: Testimonial;
};

/** The condition the carousel filters on. Kept here so the two cannot drift. */
export function isRenderableTestimonial(testimonial: Testimonial): boolean {
  return Boolean(
    testimonial.quote && testimonial.authorName && testimonial.authorRole
  );
}

export function TestimonialQuote({ testimonial }: TestimonialQuoteProps) {
  if (!isRenderableTestimonial(testimonial)) {
    return null;
  }

  const { quote, authorName, authorRole, authorCompany, category } =
    testimonial;

  return (
    <figure className="flex flex-col">
      {category ? (
        <p className="mb-md text-small font-body font-medium uppercase tracking-wide text-stroke-systems">
          {category}
        </p>
      ) : null}

      <blockquote>
        {/* No decorative quotation glyph and no italic: the blockquote
            semantics and the shift to the serif already say "quotation".
            See the spec's ANTI-SLOP CONSTRAINTS. */}
        <p className="max-w-[42ch] text-h3 font-heading text-foreground">
          {quote}
        </p>
      </blockquote>

      {/* No portrait. None is supplied, and none is invented. */}
      <figcaption className="mt-lg">
        <p className="text-body font-body font-semibold text-foreground">
          {authorName}
        </p>
        <p className="text-body text-muted-foreground">
          {authorCompany ? `${authorRole}, ${authorCompany}` : authorRole}
        </p>
      </figcaption>
    </figure>
  );
}
