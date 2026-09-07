# ProofSection Specification

Section 8 in the approved sequence, layout family **quote-led, single
column**. Renders as the page's one mid-page navy band, per `HOMEPAGE_RHYTHM`
and `BRAND.md`'s "dark bands are punctuation, not the ground state" — the hero
and closing CTA are paper; this is the exception, and the only one.

Every content slot beneath this wrapper is `NEEDS-CLIENT-INPUT`
(`CONTENT.md` §9), so — like `credibility.spec.md` — this file specifies a
section that must be fully removable without restructuring anything above or
below it, per `IA_CRITIQUE.md` §3.4.

**Split across three files**: this wrapper (band, header, gating), plus
`case-study-card.spec.md` and `testimonial-quote.spec.md` for the two
distinct content types it can hold. They are structurally different (a
problem/outcome pair vs. a quote and an attribution), so they are specified
separately rather than as variants of one card.

## Overview
- **Target file:** `src/components/sections/proof-section.tsx`
- **Design reference:** none. Authored from `IA_CRITIQUE.md`'s Proof discussion and §3.4, and `CONTENT.md` §9.
- **Interaction model:** static wrapper; no interactivity of its own
- **Server/Client:** Server Component. Returns `null` if fully gated.

## DOM Structure

```
<section id="proof" className="band-navy py-band-anchor">   only if not fully gated
  <div>                                  max-w-page mx-auto px-md
    <p>                                  PROOF-H2
    <div>                                flex flex-col gap-2xl, single column
      <CaseStudyCard />                  rendered only if CASE-01-* has cleared
      <TestimonialQuote />               rendered only if QUOTE-01-* has cleared
```

## DESIGN SPECIFICATION

### Section
- Band: `py-band-anchor` (96 → 168px) — one of the page's three anchor bands (with the hero and the closing CTA), and the only one that is also a navy band. `IA_CRITIQUE.md`'s per-section layout-family list marks this an anchor specifically because it is punctuation: the one place on the page the reader is asked to stop and read a client's own words.
- Surface: `.band-navy`
- Sequencing: per `globals.css`, an anchor band gives "the eye its air," and the rule that a tight band must never directly follow an anchor is why `credibility.spec.md` (a tight band) sits *before* this section rather than after it — Proof is followed by the closing CTA, itself an anchor, so no tight-after-anchor violation occurs on either side.

### Header
- `PROOF-H2`: `text-h2 font-display font-normal text-foreground mb-xl text-center` — the one centred headline on the page. Every other section header is left-aligned against the content rail; this one is centred because the column beneath it is genuinely single-column and centred, unlike every other section's asymmetric or grid layout, so a left-aligned headline above a centred column would look like a mistake rather than a choice.

### Column
- `flex flex-col gap-2xl max-w-[52rem] mx-auto` — capped narrower than the full rail and centred, since a case study and a testimonial both read as long-form content best kept to a measure well under 1248px

## States & Behaviors

### Full-section gating
- **Trigger:** build time. Every slot in `CONTENT.md` §9 (`CASE-01-*`, `QUOTE-01-*`) is `NEEDS-CLIENT-INPUT`.
- **State:** returns `null`. `CONTENT.md` is explicit: "Testimonials and case studies are the highest-liability slots on the site... If the client supplies nothing, this section does not ship." No placeholder quote, no "client stories coming soon" banner — full absence.

### Partial gating
- **Trigger:** the case study clears review but the testimonial does not, or the reverse
- **State:** render whichever child has cleared. A section holding one case study and no testimonial (or the reverse) is a legal, complete render — `PROOF-H2` ("Client work") already frames the section generically enough to cover either.

### Multiple case studies or testimonials (future)
- Not in scope for the current content register, which carries exactly one of each (`CASE-01`, `QUOTE-01`). If a second case study or testimonial is added later, this wrapper's `flex flex-col gap-2xl` already accommodates more children without restructuring — noted so a future content addition does not require a new layout family, only new data.

## Per-State Content
Covered above.

## Assets
None at the wrapper level — assets belong to the two child components.

## COPY

| Slot | Text |
|---|---|
| `PROOF-H2` | Client work |

This is the only slot this wrapper owns directly. `CASE-01-*` and `QUOTE-01-*`
belong to `case-study-card.spec.md` and `testimonial-quote.spec.md`
respectively and are listed there.

## Responsive Behavior
- **Desktop (1440px):** single centred column, capped at `52rem`
- **Tablet (768px):** unchanged, column narrows naturally with the viewport before the cap takes over
- **Mobile (390px):** unchanged, full-bleed within the page gutter
- **Breakpoint:** none of its own — this is the one section on the page with no responsive grid to collapse, by design, since it was never a grid

## CONTRAST CHECK

| Pairing | Ratio | Source | Verdict |
|---|---|---|---|
| Paper `PROOF-H2` on navy | 17.07:1 | `globals.css` derived | Pass |

Remaining pairings belong to the two child components and are listed there.

## ANTI-SLOP CONSTRAINTS

- **No fabricated case study or testimonial to avoid shipping an empty section.** Covered under States & Behaviors — this is the section where that failure would be most damaging, since `CONTENT.md` calls these the highest-liability slots on the site.
- **No carousel across multiple testimonials** even once more than one exists. A single column that a reader scrolls past, per the layout family named above, not an auto-advancing slider repeating the hero's rejected mechanism in a different section.
- **No star rating, "5.0 average" figure, or review-aggregator badge.** Nothing in `CONTENT.md` supplies one, and a star rating with no sourced data behind it is a fabricated metric.
- **No stock "team celebrating" photograph filling space beside the quote.** The words carry the section; no image is specified because none is needed and none is available uninvented.
