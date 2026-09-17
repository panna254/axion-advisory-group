import type { CoreValue } from "@/types/core-value";

/**
 * MissionVisionValues, "What we stand for".
 *
 * Sits after Credibility and before Proof. About and its credibility strip say
 * who the firm is; this section says what the work answers to; the testimonial
 * band that follows shows clients describing that work.
 *
 * Two parts, deliberately unlike each other:
 *
 * - Statements. Mission is the wide serif statement; Vision is the smaller
 *   sans statement, stepped down and to the right onto the column the values
 *   index splits on. Present purpose, then the future it points at. Neither
 *   sits on a rule: two ruled columns side by side is the buyer fork's
 *   composition, and this section must not echo it.
 * - Values index. Two columns from `md`, with the "Core values" heading in the
 *   first cell. Seven values plus the heading is eight cells, so no cell is
 *   left empty at any breakpoint.
 *
 * Server Component. Nothing here is interactive, so nothing takes a hover
 * state: on this site a hover change means "clickable".
 *
 * See `docs/research/components/mission-vision-values.spec.md` for the full
 * contract.
 */

export interface MissionVisionValuesProps {
  mission: string;
  vision: string;
  values: readonly CoreValue[];
}

/* Mission and Vision labels: sentence case, body face. Not an uppercase
   eyebrow, which CONTENT.md reserves for the hero. */
const LABEL_CLASSES = "font-body text-body font-semibold text-foreground";

export function MissionVisionValues({
  mission,
  vision,
  values,
}: MissionVisionValuesProps) {
  return (
    <section id="values" aria-labelledby="values-heading" className="py-band">
      <div className="max-w-page mx-auto px-md">
        <h2 id="values-heading" className="mb-xl text-h2 text-foreground lg:mb-2xl">
          What we stand for
        </h2>

        {/* The axis. From md, Vision starts on the line the values index below
            splits on: column 2 of 2 at md, column 7 of 12 at lg. Both grids
            use `gap-x-lg`, which is what puts those lines at the same x.
            Mission runs past the axis; Vision steps down onto it. */}
        <div className="grid grid-cols-1 gap-y-xl md:grid-cols-2 md:gap-x-lg lg:grid-cols-12">
          <div className="md:col-span-full lg:col-span-8">
            <h3 className={LABEL_CLASSES}>Mission</h3>
            <p className="mt-sm max-w-[52ch] text-pretty font-heading text-h3 text-foreground">
              {mission}
            </p>
          </div>

          {/* Stacked on a phone, so a hairline marks the change of subject.
              From md the step onto the axis does that job instead. */}
          <div className="border-t border-border pt-lg md:col-start-2 md:border-t-0 md:pt-0 lg:col-span-6 lg:col-start-7">
            <h3 className={LABEL_CLASSES}>Vision</h3>
            <p className="mt-sm max-w-[46ch] text-pretty text-lead text-foreground">
              {vision}
            </p>
          </div>
        </div>

        {values.length > 0 && (
          /* From md the heading and the list share one two-column grid. The
             list spans both columns on a subgrid, and its first item starts in
             column two, which leaves the first cell to the heading. The span
             must be `col-span-full`, not `col-span-2`: without a start line,
             auto-placement steps past the heading and opens a third column.
             `relative`
             paints the heading above the list's empty cell, so its text stays
             selectable. */
          <div className="mt-2xl border-t border-border pt-xl md:grid md:grid-cols-2 md:items-baseline md:gap-x-lg">
            <h3
              id="core-values-heading"
              className="text-h3 text-foreground md:relative md:col-start-1 md:row-start-1"
            >
              Core values
            </h3>
            <ul
              aria-labelledby="core-values-heading"
              className="mt-lg grid grid-cols-1 gap-y-lg md:col-span-full md:row-start-1 md:mt-0 md:grid-cols-subgrid md:gap-y-xl"
            >
              {values.map((value, index) => (
                <li
                  key={value.id}
                  className="grid grid-cols-[auto_1fr] items-baseline gap-x-sm md:first:col-start-2"
                >
                  <span
                    aria-hidden="true"
                    data-numeric
                    className="text-small text-muted-foreground"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h4 className="font-body text-lead font-semibold text-foreground">
                      {value.name}
                    </h4>
                    <p className="mt-2xs max-w-[48ch] text-pretty text-body text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
