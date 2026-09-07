/**
 * The content register, in the type system.
 *
 * `CONTENT.md` is the source of truth for every string on this site. Its rule
 * is absolute: no agent invents client names, testimonials, outcomes, contract
 * values, staff counts, founding dates, certifications, awards, office
 * locations, or regulatory registrations. A placeholder that ships is a bug.
 *
 * Modelling status here rather than leaving it in the markdown means a section
 * can refuse to render a blocked slot instead of quietly printing
 * "[CLIENT TO SUPPLY: ...]" into production.
 */

/** Mirrors the status column of the register in `CONTENT.md`. */
export type ContentStatus = "DRAFT" | "NEEDS-CLIENT-INPUT" | "APPROVED";

/**
 * A slot ID as written in `CONTENT.md`, e.g. `HERO-H1`, `SVC-03-DESC`.
 * Kept as a string rather than a union: the register runs to 94 slots and
 * grows, and a stale union would block a copy edit on a type error.
 */
export type ContentSlotId = string;

/**
 * One row of the register. Anything rendered to the page should be traceable
 * back to one of these.
 */
export interface ContentSlot {
  id: ContentSlotId;
  status: ContentStatus;
  /**
   * Current text. For a `NEEDS-CLIENT-INPUT` slot this still holds the
   * bracketed placeholder, which is exactly why `isPublishable` exists.
   */
  text: string;
  /** Character budget from the register. A maximum set by layout, not a target. */
  budget: number;
}

/**
 * The release gate: `NEEDS-CLIENT-INPUT` never reaches a built page.
 *
 * `CONTENT.md`: "grep this file for NEEDS-CLIENT-INPUT and for
 * [CLIENT TO SUPPLY. Both must return zero rows before launch."
 */
export function isPublishable(status: ContentStatus): boolean {
  return status === "DRAFT" || status === "APPROVED";
}

/**
 * An image sourced for this build. Nothing here may originate from
 * mandraxconsultinggroup.co.ke, which is an information-architecture
 * reference only.
 */
export interface ImageAsset {
  src: string;
  /** Required. An empty string is only correct for a purely decorative image. */
  alt: string;
  width: number;
  height: number;
}
