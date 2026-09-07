import type { ContentStatus } from "./content";

/**
 * The seven practice lines, in the order `BRAND.md` lists them. The order is
 * the brand's, not a ranking, and components should not re-sort it.
 *
 * `legal-regulatory` is line seven and is `NEEDS-CLIENT-INPUT`: the name was
 * obscured in the source photo and is unconfirmed. It must not render until
 * the client confirms it.
 */
export type ServiceSlug =
  | "business-consultancy"
  | "financial-management"
  | "training-hr"
  | "loans-financing"
  | "risk-management"
  | "market-entry"
  | "legal-regulatory";

/** The seven slugs as a runtime array, in brand order. */
export const SERVICE_SLUGS = [
  "business-consultancy",
  "financial-management",
  "training-hr",
  "loans-financing",
  "risk-management",
  "market-entry",
  "legal-regulatory",
] as const satisfies readonly ServiceSlug[];

export interface Service {
  slug: ServiceSlug;
  /**
   * `SVC-0n-NAME`. These come from the client's own materials and are
   * `APPROVED` in the register, so they are not ours to reword. Budget 32.
   */
  name: string;
  /**
   * `SVC-0n-SUMMARY` (renamed from the register's old `SVC-0n-DESC`). Written
   * by us, so `DRAFT`, and subject to the banned-word list in `BRAND.md`.
   * Budget 12-18 words. Card-level copy — this is what `PracticeLineRow`
   * shows collapsed.
   */
  summary: string;
  /**
   * `SVC-0n-DETAIL`. Written by us, `DRAFT`, same banned-word list. Budget
   * 60-90 words. Shown only once `PracticeLineRow`'s disclosure is expanded.
   */
  detail: string;
  /** Governs whether this line may render at all. Line seven is blocked. */
  status: ContentStatus;
  /** Anchor or route for the practice line. */
  href: string;
}
