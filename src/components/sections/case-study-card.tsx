/**
 * CaseStudyCard
 *
 * Renders CASE-01-CLIENT, CASE-01-SECTOR, CASE-01-PROBLEM, and
 * CASE-01-OUTCOME as a problem/outcome pair.
 *
 * Every slot backing this component is currently NEEDS-CLIENT-INPUT in
 * CONTENT.md. Per project content-safety rules, this component never
 * fabricates placeholder copy: it renders nothing at all unless all four
 * fields arrive populated. That is the expected state today, not an edge
 * case — see docs/research/components/case-study-card.spec.md.
 *
 * Server Component. Designed to sit inside a `.band-navy` ancestor
 * (rendered by the ProofSection wrapper); the token re-point in
 * globals.css resolves the classes below correctly on that surface.
 */

type CaseStudyCardProps = {
  client?: string;
  sector?: string;
  problem?: string;
  outcome?: string;
};

export function CaseStudyCard({
  client,
  sector,
  problem,
  outcome,
}: CaseStudyCardProps) {
  if (!client || !sector || !problem || !outcome) {
    return null;
  }

  return (
    <article className="rounded-xl border border-border p-xl">
      <div className="flex items-center gap-2xs mb-lg">
        <p className="text-body font-sans font-semibold text-foreground">
          {client}
        </p>
        <span className="text-muted-foreground" aria-hidden="true">
          &middot;
        </span>
        <p className="text-body text-muted-foreground">{sector}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-lg">
        <div>
          <p className="text-caption font-sans font-medium uppercase tracking-wide text-stroke-systems mb-xs">
            The problem
          </p>
          <p className="text-body text-muted-foreground">{problem}</p>
        </div>
        <div>
          <p className="text-caption font-sans font-medium uppercase tracking-wide text-stroke-systems mb-xs">
            What changed
          </p>
          <p className="text-body text-muted-foreground">{outcome}</p>
        </div>
      </div>
    </article>
  );
}
