/**
 * Primary navigation.
 *
 * Two constraints ride on this type. `CONTENT.md`: "Nav must render on one
 * line at desktop. If a sixth item is added, drop NAV-04 first." The taste
 * skill: a two-line nav at desktop is broken design, and the bar caps at 80px.
 *
 * `dropPriority` encodes the first rule so the decision is not re-argued the
 * next time someone adds a link.
 */
export interface NavItem {
  /** `NAV-0n`. */
  id: string;
  /** Budget 12. Long labels are what push the bar onto a second line. */
  label: string;
  href: string;
  /**
   * Lower drops first when the bar runs out of room. `NAV-04` (Insights) is
   * priority 1 per the register. Omit for items that must never drop.
   */
  dropPriority?: number;
}

/**
 * The single navigation call to action.
 *
 * Its label deliberately matches the hero's primary CTA. Both carry the same
 * intent, and the taste skill's rule is one label per intent across the whole
 * page. Two different words for "book a consultation" would be the failure,
 * not the repetition.
 */
export interface NavCta {
  /** `NAV-CTA`. Budget 18. Must fit one line at desktop. */
  label: string;
  href: string;
}
