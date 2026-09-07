import type { ContentStatus } from "./content";

/**
 * One figure in the credibility strip.
 *
 * Every slot in this section is a verifiable claim and none may be drafted by
 * us. `CONTENT.md`: "If the client cannot supply these, the strip is cut from
 * the design. It is not filled with rounded guesses."
 *
 * That last sentence is the design constraint too. The strip is not laid out
 * to a fixed three-column grid that then needs filling; it renders the figures
 * that exist, or it does not render.
 */
export interface StatItem {
  /** `STAT-0n`. */
  id: string;
  /**
   * The figure as it prints, including its unit: `12`, `KES 1.2M`, `450`.
   * A string rather than a number because the unit is part of the claim, and
   * because rounding a supplied figure would change it. Budget 10.
   *
   * Render with `font-variant-numeric: tabular-nums` so a row of figures
   * aligns. The `[data-numeric]` attribute in `globals.css` does this.
   */
  value: string;
  /** `STAT-0n-LABEL`. What the figure counts. Budget 24. */
  label: string;
  status: ContentStatus;
}

/**
 * Registrations, licences and professional memberships. `CERT-LIST`, budget
 * 200, `NEEDS-CLIENT-INPUT`. Exact legal names only.
 */
export interface Certification {
  id: string;
  /** The registration or membership, spelled as the issuing body spells it. */
  name: string;
  /** Issuing body, where it is not already part of the name. */
  issuer?: string;
  status: ContentStatus;
}
