/**
 * Section rhythm.
 *
 * Sections must not all share the same vertical padding. Uniform rhythm is one
 * of the clearest signals that a page was generated rather than composed, and
 * it flattens the reading order: everything looks equally important, so nothing
 * is. Three bands, defined in `globals.css` as `--spacing-band-*`.
 */
export type SectionBand = "tight" | "standard" | "anchor";

/**
 * Tailwind class for each band. Use these rather than writing `py-*` by hand,
 * so the rhythm stays auditable from one place.
 *
 *   anchor    96 -> 168px   hero, closing CTA, the one mid-page navy band
 *   standard  64 -> 112px   the working sections
 *   tight     40 ->  64px   a strip that belongs to the section above it
 */
export const BAND_CLASS: Record<SectionBand, string> = {
  tight: "py-band-tight",
  standard: "py-band",
  anchor: "py-band-anchor",
};

/**
 * A section's surface. `navy` renders the section as a dark band by applying
 * `.band-navy`, which re-points the colour tokens for that subtree only.
 *
 * `BRAND.md`: "Paper is the default canvas. Most of the site is paper. Dark
 * bands are punctuation, not the ground state." At most one mid-page navy band.
 */
export type SectionSurface = "paper" | "navy";

/**
 * The page sequence, from the approved sequence in `docs/research/IA_CRITIQUE.md`
 * and the section order note in `CONTENT.md`. That sequence supersedes an
 * earlier draft order which put About and Credibility ahead of Services; this
 * union and the rhythm below were previously stale against that supersession
 * (no `fork` id existed at all) and have been corrected to match.
 */
export type SectionId =
  | "hero"
  | "fork"
  | "services"
  | "approach"
  | "about"
  | "credibility"
  | "proof"
  | "cta"
  | "contact"
  | "footer";

export interface PageSection {
  id: SectionId;
  band: SectionBand;
  surface: SectionSurface;
}

/**
 * The composed rhythm for the homepage.
 *
 * It satisfies the two sequencing rules stated in `globals.css`:
 *
 *   1. Never more than two consecutive `standard` bands. `fork` and `services`
 *      are one such pair; `about` and `contact` each stand alone. Note that
 *      `fork` cannot itself be the tight band that would otherwise cap that
 *      pair early: it sits directly after `hero`'s anchor band, and rule 2
 *      forbids a tight band there. `approach`, immediately after `services`,
 *      is the section that breaks the run instead — it reads as a coda to
 *      `services` ("what we do", then "how that work runs"), so a tight band
 *      suits it on its own terms, not only to satisfy this rule. See
 *      `docs/research/components/approach.spec.md` for the full reasoning.
 *   2. A `tight` band never directly follows an `anchor` band. `approach`
 *      follows `services` (standard), `credibility` follows `about`
 *      (standard), and `footer` follows `contact` (standard) — never `hero`,
 *      `proof`, or `cta`.
 *
 * Three anchors, which is the maximum: the hero opens, `proof` is the single
 * mid-page navy band, and the closing CTA is the full stop.
 */
export const HOMEPAGE_RHYTHM: readonly PageSection[] = [
  { id: "hero", band: "anchor", surface: "paper" },
  { id: "fork", band: "standard", surface: "paper" },
  { id: "services", band: "standard", surface: "paper" },
  { id: "approach", band: "tight", surface: "paper" },
  { id: "about", band: "standard", surface: "paper" },
  { id: "credibility", band: "tight", surface: "paper" },
  { id: "proof", band: "anchor", surface: "navy" },
  { id: "cta", band: "anchor", surface: "paper" },
  { id: "contact", band: "standard", surface: "paper" },
  { id: "footer", band: "tight", surface: "navy" },
];
