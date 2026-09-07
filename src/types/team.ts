import type { ContentStatus, ImageAsset } from "./content";

/**
 * A named advisor.
 *
 * Note that `CONTENT.md` has no team section yet. The nearest slot is
 * `ABOUT-BODY-2`, which is `NEEDS-CLIENT-INPUT` and asks the client for team
 * size, qualifications held, and professional bodies the firm or its advisors
 * belong to. Until that arrives there is no sourced material for this type,
 * so nothing built on it may render.
 *
 * Credentials are the sharp edge here: a fabricated qualification is a
 * liability, not a copy error.
 */
export interface TeamMember {
  id: string;
  /** Full name, as the person spells it. */
  name: string;
  /** Role at the firm. */
  role: string;
  /**
   * Professional qualifications and memberships. Exact legal names only,
   * supplied by the client. Never inferred from a role, never abbreviated
   * into something the person does not actually hold.
   */
  credentials?: string[];
  /** Short biography. Voice rules in `BRAND.md` apply: under 25 words a sentence. */
  bio?: string;
  photo?: ImageAsset;
  status: ContentStatus;
}
