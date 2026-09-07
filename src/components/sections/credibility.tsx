import type { StatItem } from "@/types/stat";

export type { StatItem as Stat };

export type CredibilityProps = {
  /** Up to 3 stats. Currently always empty/undefined — no figures are sourced yet. */
  stats?: StatItem[];
  /** Prose sentence or comma-joined list. Currently always undefined — unsourced. */
  certifications?: string;
};

/**
 * Section 7 — inline figure row of verifiable stats plus a certifications
 * line. Every field here is currently entirely unsourced, so this component
 * returns null unless real data is supplied. This is the expected, normal
 * state today: no placeholder numbers, no bracketed stand-ins, no empty
 * section wrapper.
 */
export function Credibility({ stats, certifications }: CredibilityProps) {
  const statList = stats ?? [];
  const hasStats = statList.length > 0;
  const hasCertifications = Boolean(certifications && certifications.length > 0);

  if (!hasStats && !hasCertifications) {
    return null;
  }

  return (
    <section id="credibility" className="py-band-tight">
      <div className="mx-auto max-w-page px-md">
        {hasStats && (
          <div className="flex flex-col flex-wrap justify-start gap-2xl sm:flex-row">
            {statList.map((stat) => (
              <div key={`${stat.label}-${stat.value}`} className="flex flex-col gap-2xs">
                <p data-numeric className="text-h2 font-display font-normal text-foreground">
                  {stat.value}
                </p>
                <p className="text-caption uppercase tracking-wide text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        )}
        {hasCertifications && (
          <p className="mt-lg border-t border-border pt-md text-body text-muted-foreground">
            {certifications}
          </p>
        )}
      </div>
    </section>
  );
}
