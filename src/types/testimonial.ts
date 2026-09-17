import type { ContentStatus } from "./content";

/**
 * The engagement a quote came out of, rendered as the eyebrow above it.
 *
 * Deliberately a closed union rather than free text. The label is there to
 * give the reader a frame ("this one is about operations"), not to let each
 * quote carry its own tagline, and a closed set keeps the carousel from
 * drifting into six differently-worded category labels.
 */
export type TestimonialCategory =
  | "Strategy"
  | "Operations"
  | "Growth"
  | "Transformation"
  | "Leadership"
  | "Advisory";

/**
 * Testimonials are the highest-liability slots on this site.
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
  /** Optional eyebrow. A quote with no category simply renders without one. */
  category?: TestimonialCategory;
  status: ContentStatus;
  /**
   * Written permission to publish the quote and to name the person.
   * `status` may not be set to `APPROVED` while this is false. This is a
   * separate flag from status on purpose: sign-off on the wording and
   * permission to publish are two different things.
   */
  permissionOnFile: boolean;
}
