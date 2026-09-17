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
`testimonial-carousel.spec.md` (slide behaviour) and
`testimonial-quote.spec.md` (one slide's typography).

**Revised 2026-09-16.** The section used to hold two content types: a static
case-study card above the testimonial carousel. The card was removed, along
with `case-study-card.spec.md` and the four `CASE-01-*` slots in `CONTENT.md`,
so the band presents client proof in one consistent format. A fixed block
sitting over a rotating one read as two competing treatments of the same idea.

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
    <div>                                flex flex-col gap-lg, single column
      <TestimonialCarousel />            client boundary; see its own spec
      <p>                                illustrative-quotation note, conditional
```

## DESIGN SPECIFICATION

### Section
- Band: `py-band-anchor` (96 → 168px) — one of the page's three anchor bands (with the hero and the closing CTA), and the only one that is also a navy band. `IA_CRITIQUE.md`'s per-section layout-family list marks this an anchor specifically because it is punctuation: the one place on the page the reader is asked to stop and read a client's own words.
- Surface: `.band-navy`
- Sequencing: per `globals.css`, an anchor band gives "the eye its air," and the rule that a tight band must never directly follow an anchor is why `credibility.spec.md` (a tight band) sits *before* this section rather than after it — Proof is followed by the closing CTA, itself an anchor, so no tight-after-anchor violation occurs on either side.

### Header
- `PROOF-H2`: `text-h2 font-display font-normal text-foreground mb-xl text-center` — the one centred headline on the page. Every other section header is left-aligned against the content rail; this one is centred because the column beneath it is genuinely single-column and centred, unlike every other section's asymmetric or grid layout, so a left-aligned headline above a centred column would look like a mistake rather than a choice.

### Column
- `flex flex-col gap-lg max-w-[52rem] mx-auto` — capped narrower than the full rail and centred, since a serif testimonial reads as long-form content best kept to a measure well under 1248px

## States & Behaviors

### Full-section gating
- **Trigger:** build time. Every quote slot in `CONTENT.md` §9 (`QUOTE-01-*`) is `NEEDS-CLIENT-INPUT`, so no testimonial is renderable.
- **State:** returns `null`. `CONTENT.md` is explicit: "Testimonials are the highest-liability slots on the site... If the client supplies nothing, this section does not ship." No placeholder quote, no "client stories coming soon" banner — full absence.

### Partial gating
- **Trigger:** some quote records clear review and others do not.
- **State:** the carousel renders only the records that cleared. One cleared quote renders as a single quote with no carousel controls.

### Multiple testimonials
- **Superseded 2026-09-16, client-directed.** The register now carries six quote records rather than one, and they are presented as a carousel. See `testimonial-carousel.spec.md` and the OVERRIDDEN RULES note below.

### Illustrative-quotation note
- **Removed 2026-09-16, client-directed.** The client confirmed the quotes are real testimonials, so the note saying they are illustrative no longer renders.

## Per-State Content
Covered above.

## Assets
None at the wrapper level — assets belong to the carousel and quote components.

## COPY

| Slot | Text |
|---|---|
| `PROOF-H2` | Client work |

This is the only slot this wrapper owns directly. `QUOTE-01-*` belongs to
`testimonial-quote.spec.md` and is listed there.

## Responsive Behavior
- **Desktop (1440px):** single centred column, capped at `52rem`
- **Tablet (768px):** unchanged, column narrows naturally with the viewport before the cap takes over
- **Mobile (390px):** unchanged, full-bleed within the page gutter
- **Breakpoint:** none of its own — this is the one section on the page with no responsive grid to collapse, by design, since it was never a grid

## CONTRAST CHECK

| Pairing | Ratio | Source | Verdict |
|---|---|---|---|
| Paper `PROOF-H2` on navy | 17.07:1 | `globals.css` derived | Pass |

Remaining pairings belong to the carousel and quote components and are listed there.

## ANTI-SLOP CONSTRAINTS

- **No fabricated testimonial to avoid shipping an empty section.** Covered under States & Behaviors — this is the section where that failure would be most damaging, since `CONTENT.md` calls these the highest-liability slots on the site.
- ~~**No carousel across multiple testimonials.**~~ **OVERRIDDEN 2026-09-16, client-directed.** Recorded rather than deleted, because the original reasoning was sound about the hero and is worth not re-litigating.

  What the rule was protecting against: `IA_CRITIQUE.md` item 2 rejects the reference site's three-slide hero carousel on the grounds that "a firm that states three things above the fold has stated nothing," plus the three-`<h1>` problem it shipped. This rule extended that to Proof.

  Why the extension does not hold here: the hero argument is about the firm's OWN proposition, where rotation signals indecision. Six client quotes are not one proposition stated six ways; they are six different people, and a set is what a testimonial section actually is. The `<h1>` objection does not recur either, since this section has one `<h2>` and the quotes are `<blockquote>`, not headings.

  What survives of the original concern, and is handled in `testimonial-carousel.spec.md`: auto-advance is a real cost when it moves content a reader is part-way through. Hence a 7s interval rather than the reference's, pause on hover and on focus, no autoplay at all under `prefers-reduced-motion`, and manual controls that reset the timer.
- **No star rating, "5.0 average" figure, or review-aggregator badge.** Nothing in `CONTENT.md` supplies one, and a star rating with no sourced data behind it is a fabricated metric.
- **No stock "team celebrating" photograph filling space beside the quote.** The words carry the section; no image is specified because none is needed and none is available uninvented.
- **No static proof block above the carousel.** No case-study card, pull quote, or featured testimonial pinned over the rotating quotes. One format for client proof in this band.
