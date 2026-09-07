import { CaseStudyCard } from "./case-study-card";
import { TestimonialQuote } from "./testimonial-quote";

/**
 * ProofSection — Section 8, "Client work".
 *
 * Implements `docs/research/components/proof-section.spec.md`.
 * Renders as the page's single mid-page navy band (`.band-navy py-band-anchor`).
 *
 * Fully gated: returns `null` when neither a case study nor a testimonial is
 * supplied with valid, confirmed client data. Never fabricates placeholders.
 */

export interface ProofSectionProps {
  caseStudy?: {
    client: string;
    sector: string;
    problem: string;
    outcome: string;
  };
  testimonial?: {
    quote: string;
    name: string;
    role: string;
  };
}

export function ProofSection({
  caseStudy,
  testimonial,
}: ProofSectionProps = {}) {
  const hasValidCaseStudy = Boolean(
    caseStudy?.client &&
      caseStudy?.sector &&
      caseStudy?.problem &&
      caseStudy?.outcome
  );

  const hasValidTestimonial = Boolean(
    testimonial?.quote && testimonial?.name && testimonial?.role
  );

  if (!hasValidCaseStudy && !hasValidTestimonial) {
    return null;
  }

  return (
    <section id="proof" className="band-navy bg-background py-band-anchor">
      <div className="max-w-page mx-auto px-md">
        <h2 className="mb-xl text-center text-h2 font-display font-normal text-foreground">
          Client work
        </h2>
        <div className="mx-auto flex max-w-[52rem] flex-col gap-2xl">
          {hasValidCaseStudy && caseStudy && (
            <CaseStudyCard
              client={caseStudy.client}
              sector={caseStudy.sector}
              problem={caseStudy.problem}
              outcome={caseStudy.outcome}
            />
          )}
          {hasValidTestimonial && testimonial && (
            <TestimonialQuote
              quote={testimonial.quote}
              name={testimonial.name}
              role={testimonial.role}
            />
          )}
        </div>
      </div>
    </section>
  );
}

