/**
 * Approach — "How we work" section.
 *
 * Server Component. A static four-stage sequence (Diagnose, Prioritise,
 * Build, Hand over) rendered as a semantic `<ol>` since the stage order is
 * load-bearing content, not just a visual arrangement. No expand/collapse,
 * no interactivity — every stage's copy already fits at a glance.
 *
 * See `docs/research/components/approach.spec.md` for the full contract.
 */

type Stage = {
  name: string;
  body: string;
};

const STAGES: readonly Stage[] = [
  {
    name: "Diagnose",
    body: "We read the accounts, talk to your people, and write down what we find. No recommendations yet.",
  },
  {
    name: "Prioritise",
    body: "We rank what we found by cost of inaction, then agree the order of work with you.",
  },
  {
    name: "Build",
    body: "Models, systems, filings, training. The work itself, on an agreed schedule.",
  },
  {
    name: "Hand over",
    body: "Your team runs it without us. We document the process and stay reachable.",
  },
] as const;

type ApproachProps = {
  /**
   * Closing note beneath the sequence — a commercial commitment about what
   * a first engagement involves and whether it's chargeable. No source
   * exists for this copy yet, so it is omitted entirely (no placeholder)
   * until the client supplies it. See spec's States & Behaviors.
   */
  closingNote?: string;
};

export function Approach({ closingNote }: ApproachProps = {}) {
  return (
    <section id="approach" className="py-band-tight">
      <div className="max-w-page mx-auto px-md">
        <div className="max-w-[42ch] mb-xl">
          <h2 className="text-h2 font-display font-normal">How we work</h2>
          <p className="text-lead text-muted-foreground">
            Four stages. You get a written position at the end of each one.
          </p>
        </div>

        <ol className="flex flex-col gap-lg border-l border-border lg:grid lg:grid-cols-4 lg:border-l-0">
          {STAGES.map((stage, index) => {
            const isLast = index === STAGES.length - 1;
            const number = String(index + 1).padStart(2, "0");

            return (
              <li key={stage.name} className="pl-lg lg:pl-0">
                <div className="flex items-center">
                  <span className="text-h3 font-display font-normal text-stroke-systems">
                    {number}
                  </span>
                  {!isLast && (
                    <div
                      aria-hidden="true"
                      className="ml-sm hidden h-px flex-1 bg-border lg:block"
                    />
                  )}
                </div>
                <p className="text-h3 font-display font-normal text-foreground mt-sm">
                  {stage.name}
                </p>
                <p className="text-body text-muted-foreground mt-xs">{stage.body}</p>
              </li>
            );
          })}
        </ol>

        {closingNote && (
          <div className="mt-xl pt-lg border-t border-border">
            <p className="text-body text-muted-foreground">{closingNote}</p>
          </div>
        )}
      </div>
    </section>
  );
}
