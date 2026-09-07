import type { ContentStatus } from "./content";

/**
 * Testimonials and case studies are the highest-liability slots on this site.
 *
 * `CONTENT.md`: "No composite clients, no anonymised-but-plausible outcomes,
 * no illustrative figures. If the client supplies nothing, this section does
 * not ship." Every field below starts `NEEDS-CLIENT-INPUT`.
 */
export interface Testimonial {
  id: string;
  /**
   * `QUOTE-01-TEXT`. Budget 180, and the taste skill caps a landing-page quote
   * at three rendered lines. Cut the source quote rather than let it run.
   */
  quote: string;
  /** `QUOTE-01-NAME`. Full name. Never a first name alone. */
  authorName: string;
  /** `QUOTE-01-ROLE`. Role and company. */
  authorRole: string;
  authorCompany?: string;
  status: ContentStatus;
  /**
   * Written permission to publish the quote and to name the person.
   * `status` may not be set to `APPROVED` while this is false. This is a
   * separate flag from status on purpose: sign-off on the wording and
   * permission to publish are two different things.
   */
  permissionOnFile: boolean;
}

/**
 * A named piece of client work. Same liability rules as a testimonial, plus
 * separate written permission to name the client at all.
 */
export interface CaseStudy {
  id: string;
  /** `CASE-01-CLIENT`. Requires written permission to name. */
  client: string;
  /** `CASE-01-SECTOR`. */
  sector: string;
  /** `CASE-01-PROBLEM`. The problem as the client described it, not as we frame it. */
  problem: string;
  /**
   * `CASE-01-OUTCOME`. Measured. Figures must be ones the client will stand
   * behind, in KES where currency applies.
   */
  outcome: string;
  status: ContentStatus;
  permissionOnFile: boolean;
}
