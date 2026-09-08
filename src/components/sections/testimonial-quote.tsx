/**
 * TestimonialQuote — the second child of `ProofSection`.
 *
 * Server Component: renders a quote plus its attribution (name, role and
 * company). Every field is currently `NEEDS-CLIENT-INPUT` — per
 * `CONTENT.md`'s zero-fabrication rule, this component returns `null` rather
 * than render a composite, anonymised, or placeholder testimonial when any
 * required field is missing. That is its normal state today.
 *
 * See `docs/research/components/testimonial-quote.spec.md` for the full
 * visual and behavioural contract this implements.
 */

type TestimonialQuoteProps = {
  quote?: string;
  name?: string;
  /** Role and company, already combined, e.g. "Finance Director, Company Name". */
  role?: string;
};

export function TestimonialQuote({ quote, name, role }: TestimonialQuoteProps) {
  if (!quote || !name || !role) {
    return null;
  }

  return (
    <figure>
      <blockquote>
        <p className="text-h3 font-display font-normal text-foreground max-w-[42ch]">
          {quote}
        </p>
      </blockquote>
      <figcaption className="mt-lg flex items-center gap-sm">
        <p className="text-body font-sans font-semibold text-foreground">{name},</p>
        <p className="text-body text-muted-foreground">{role}</p>
      </figcaption>
    </figure>
  );
}
