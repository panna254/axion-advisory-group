import { APPROACH_PHASES } from "@/lib/approach-data";
import type { ApproachStage } from "@/types/approach";

/**
 * Approach, "How we work".
 *
 * Server Component. The engagement method as six stages in two phases,
 * Diagnosis (01 to 03) and Action (04 to 06). Each phase is an `<ol>`, since
 * stage order is content; the second list starts at 4 so the numbering runs
 * through.
 *
 * Every stage shows its question, purpose, typical work and output. Nothing is
 * behind a click: the output line is the answer to "what do I get", and a
 * buyer should not have to open six panels to find it.
 *
 * - Desktop (lg): three stages per row on the site's sequence device, a
 *   numeral and a connector rule, with the stage's verb on the rule. The five
 *   parts of each stage sit on a shared subgrid, so track, question, purpose,
 *   work and output line up across the row and the phase reads as a rubric,
 *   not as three cards.
 * - Tablet (md): a vertical spine, each stage split into what it is (left)
 *   and what it involves (right).
 * - Mobile: the same spine, single column.
 *
 * Data: `src/lib/approach-data.ts`. See
 * `docs/research/components/approach.spec.md` for the full contract.
 */

type ApproachProps = {
  /**
   * `APP-START`. What a first engagement involves and whether the first
   * meeting is chargeable. A commercial commitment, so it renders only when
   * supplied.
   */
  closingNote?: string;
  /**
   * `APP-SCOPE`. Which regulated professional work (statutory audit, legal
   * opinions, tax agency) the firm does or does not carry out.
   * `NEEDS-CLIENT-INPUT`: the method copy names no regulated service, and
   * this line is where that boundary is stated once the client confirms it.
   */
  scopeNote?: string;
};

/* Row labels inside a stage. Sentence case in the body face: `CONTENT.md`
   makes the hero's the page's only eyebrow. */
const LABEL_CLASSES = "text-small font-medium text-muted-foreground";

/** First stage number of each phase, so numbering runs on across phases. */
const PHASE_STARTS = APPROACH_PHASES.map((_, phaseIndex) =>
  APPROACH_PHASES.slice(0, phaseIndex).reduce(
    (count, phase) => count + phase.stages.length,
    1,
  ),
);

export function Approach({ closingNote, scopeNote }: ApproachProps = {}) {
  return (
    /* `scroll-mt-header`: the nav's Approach link and the hero's "See how we
       work" both land here, and a tight band's top padding (40 to 64px) is
       shorter than the 72px sticky header, so the heading landed under it. */
    <section
      id="approach"
      aria-labelledby="approach-heading"
      className="scroll-mt-header py-band-tight"
    >
      <div className="max-w-page mx-auto px-md">
        <div className="mb-2xl max-w-[56ch]">
          <h2 id="approach-heading" className="text-h2 text-foreground">
            How we work
          </h2>
          <p className="mt-sm text-pretty text-lead text-muted-foreground">
            We establish what your organisation must meet and how it actually
            runs, then advise on what to change. Every recommendation traces
            back to evidence.
          </p>
        </div>

        <div className="flex flex-col gap-2xl">
          {APPROACH_PHASES.map((phase, phaseIndex) => {
            const headingId = `approach-${phase.slug}-heading`;
            const start = PHASE_STARTS[phaseIndex];

            return (
              <div key={phase.slug}>
                <div className="flex flex-col gap-2xs border-t border-border pt-md md:flex-row md:items-baseline md:gap-md">
                  <h3
                    id={headingId}
                    className="font-body text-body font-semibold text-foreground"
                  >
                    {phase.name}
                  </h3>
                  <p className="text-pretty text-body text-muted-foreground">
                    {phase.summary}
                  </p>
                </div>

                {/* Below lg the list's left border is the spine. At lg it
                    becomes a three-column grid with five explicit rows (track,
                    question, purpose, work, output), which each stage adopts
                    as a subgrid. */}
                <ol
                  start={start}
                  aria-labelledby={headingId}
                  className="mt-lg flex flex-col gap-xl border-l border-border md:gap-2xl lg:grid lg:grid-cols-3 lg:grid-rows-[repeat(5,auto)] lg:gap-x-lg lg:gap-y-0 lg:border-l-0"
                >
                  {phase.stages.map((stage, index) => (
                    <StageItem
                      key={stage.id}
                      stage={stage}
                      number={start + index}
                      showConnector={index < phase.stages.length - 1}
                    />
                  ))}
                </ol>
              </div>
            );
          })}
        </div>

        {(closingNote || scopeNote) && (
          <div className="mt-2xl flex flex-col gap-xs border-t border-border pt-lg">
            {closingNote && (
              <p className="text-body text-muted-foreground">{closingNote}</p>
            )}
            {scopeNote && (
              <p className="text-body text-muted-foreground">{scopeNote}</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

interface StageItemProps {
  stage: ApproachStage;
  number: number;
  /** The connector points at the next stage, so the last in a row has none. */
  showConnector: boolean;
}

/**
 * One stage. Two wrappers group it for the tablet split: what the stage is,
 * and what it involves. At lg both become `contents`, which hands their six
 * children to the stage's subgrid rows. They are plain divs with no role, so
 * `display: contents` costs nothing in the accessibility tree.
 */
function StageItem({ stage, number, showConnector }: StageItemProps) {
  const nameId = `${stage.id.toLowerCase()}-name`;
  const workLabelId = `${stage.id.toLowerCase()}-work`;

  return (
    <li className="pl-md md:grid md:grid-cols-2 md:gap-x-lg md:pl-lg lg:row-span-5 lg:grid-cols-1 lg:grid-rows-subgrid lg:pl-0">
      <div className="lg:contents">
        {/* The track. The verb rides on it beside its numeral, and the
            connector runs across the column gap to stop one `sm` short of
            the next numeral, mirroring the `gap-sm` after its own. */}
        <div className="flex items-baseline gap-sm">
          <span
            aria-hidden="true"
            data-numeric
            className="text-lead text-muted-foreground"
          >
            {String(number).padStart(2, "0")}
          </span>
          <h4
            id={nameId}
            className="font-body text-lead font-semibold text-foreground"
          >
            {stage.name}
          </h4>
          {showConnector && (
            <span
              aria-hidden="true"
              className="hidden h-px flex-1 self-center bg-stroke-systems lg:-mr-[calc(var(--spacing-lg)-var(--spacing-sm))] lg:block"
            />
          )}
        </div>
        {/* The client's question is the stage's headline: scanned in order,
            the six read as the course of an engagement. */}
        <p className="mt-sm text-pretty font-heading text-h3 text-foreground">
          {stage.question}
        </p>
        <p className="mt-sm text-pretty text-body text-muted-foreground">
          {stage.purpose}
        </p>
      </div>

      <div className="mt-lg md:mt-0 lg:contents">
        <div className="lg:mt-lg">
          <p id={workLabelId} className={LABEL_CLASSES}>
            Typical work
          </p>
          {/* Named "Typical work, Understand" and so on: six lists called
              only "Typical work" are indistinguishable in a list navigator. */}
          <ul
            aria-labelledby={`${workLabelId} ${nameId}`}
            className="mt-xs flex list-disc flex-col gap-2xs pl-md text-body text-muted-foreground marker:text-stroke-systems"
          >
            {stage.activities.map((activity) => (
              <li key={activity} className="text-pretty">
                {activity}
              </li>
            ))}
          </ul>
        </div>
        {/* One rule per stage, above the output. On the desktop subgrid the
            three rules share a y, so a phase's deliverables read as a band. */}
        <div className="mt-lg border-t border-border pt-md">
          <p className={LABEL_CLASSES}>What you get</p>
          <p className="mt-2xs text-pretty text-body text-foreground">
            {stage.output}
          </p>
        </div>
      </div>
    </li>
  );
}
