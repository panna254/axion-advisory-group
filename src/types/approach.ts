/**
 * The engagement method, `CONTENT.md` §6.
 *
 * Six stages in two phases. The numeral a stage renders with is its position
 * in the method, not a field: `CONTENT.md` keeps ordinals out of the copy.
 */

export type ApproachPhaseSlug = "diagnosis" | "action";

export interface ApproachStage {
  /** `APP-0n`. Stable key; also scopes element ids. */
  id: string;
  /** `APP-0n-NAME`. The verb itself, no "Stage n" prefix. Budget 20. */
  name: string;
  /** `APP-0n-QUESTION`. The client's question the stage answers. Budget 60. */
  question: string;
  /** `APP-0n-PURPOSE`. Why the stage exists. Budget 140. */
  purpose: string;
  /**
   * `APP-0n-WORK`. Typical activities, three per stage. Keep the count equal
   * across a phase: the desktop rubric aligns its rows across stages, and an
   * uneven list leaves one column visibly short.
   */
  activities: readonly string[];
  /** `APP-0n-OUTPUT`. What the client has at the end of the stage. Budget 130. */
  output: string;
}

export interface ApproachPhase {
  slug: ApproachPhaseSlug;
  /** `APP-PHASE-0n-NAME`. Budget 16. */
  name: string;
  /** `APP-PHASE-0n-BODY`. One line summarising the phase. Budget 80. */
  summary: string;
  stages: readonly ApproachStage[];
}
