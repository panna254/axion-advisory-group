import { cn } from "@/lib/utils";
import type { StatItem } from "@/types/stat";

export type { StatItem as Stat };

export type CredibilityProps = {
  /** Up to 3 stats. Every figure is a verifiable claim; see `CONTENT.md` §8. */
  stats?: readonly StatItem[];
  /** Prose sentence or comma-joined list. `CERT-LIST`, `CONTENT.md` §8. */
  certifications?: string;
};

/* One column per figure from md, so the row always spans the full rail
   whether one, two or three figures are supplied. Complete literal strings,
   because Tailwind reads source text. */
const COLUMNS: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
};

/* A figure with a currency code, e.g. "KES 4.8B+". */
const CURRENCY_FIGURE = /^(KES)\s+(.+)$/;

/**
 * Section 7 — a full-width figure row plus a certifications line.
 *
 * Figures are set in cyan-deep: `BRAND.md` makes cyan the data colour, and
 * plain cyan is forbidden as text on paper. At `text-h1` (30px and up, weight
 * 700) cyan-deep's 3.92:1 is large text at every viewport, clearing the 3:1
 * floor. Crimson is deliberately absent: on this site crimson means
 * "clickable", and a crimson figure would read as a link.
 *
 * Returns null unless data is supplied: no placeholder numbers, no bracketed
 * stand-ins, no empty section wrapper.
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
          <div
            className={cn(
              "grid grid-cols-1 divide-y divide-border md:divide-x md:divide-y-0",
              COLUMNS[statList.length] ?? "md:grid-cols-3",
            )}
          >
            {statList.map((stat) => {
              const currency = CURRENCY_FIGURE.exec(stat.value);

              return (
                <div
                  key={stat.id}
                  className="flex flex-col gap-2xs py-md first:pt-0 last:pb-0 md:px-xl md:py-0 md:first:pl-0 md:last:pr-0"
                >
                  {/* `text-h1` carries weight 700 from the type scale, so no
                      separate bold class. */}
                  <p data-numeric className="text-h1 text-stroke-systems">
                    {currency ? (
                      <>
                        {/* The currency code is navy and smaller, so the
                            number itself is what the eye lands on. The
                            space stays in the text so it reads "KES 4.8B+". */}
                        <span className="text-h3 font-semibold text-foreground">
                          {currency[1]}
                        </span>{" "}
                        {currency[2]}
                      </>
                    ) : (
                      stat.value
                    )}
                  </p>
                  <p className="text-body text-muted-foreground">{stat.label}</p>
                </div>
              );
            })}
          </div>
        )}
        {hasCertifications && (
          <p
            className={cn(
              "text-body text-muted-foreground",
              hasStats && "mt-xl border-t border-border pt-md",
            )}
          >
            {certifications}
          </p>
        )}
      </div>
    </section>
  );
}
