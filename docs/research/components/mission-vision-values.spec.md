# Mission, Vision and Values Specification

Section 8a in the page sequence ("What we stand for"), layout family
**stepped statement pair over an axis-aligned index**. Added 2026-09-16,
client-directed. It supersedes the "purpose triptych, cut" judgement in
`IA_CRITIQUE.md` Part 2: the content ships, but not as three equal panels,
which was the substance of that objection.

Revised 2026-09-17. The first build set Mission and Vision as two ruled 6/6
columns, which repeated the buyer fork's composition, and ran seven values
through a two-column grid, which left the eighth cell empty. Both are fixed
below.

## Overview
- **Target file:** `src/components/sections/mission-vision-values.tsx`
- **Content source:** `MISSION`, `VISION`, `CORE_VALUES` in `src/lib/site-content.ts`, registered in `CONTENT.md` §8a
- **Rhythm entry:** `values` in `HOMEPAGE_RHYTHM`, `src/types/section.ts`
- **Interaction model:** static
- **Server/Client:** Server Component. No state, no effects, no client JS.

## Placement

After Credibility, before Proof.

- **Not before About.** The section answers "what does the firm stand for", which presumes the reader has just met the firm. About introduces it.
- **Not between Services and Approach.** Approach is the method behind the offer, and the hero's "See how we work" sends buyers straight to it. A section between them would break that pair, and would put principles in front of a buyer who is still reading the offer.
- **Not between About and Credibility.** `credibility.spec.md` defines that strip as About's closing line, rendered with no visible break. Inserting a section there would orphan it.
- **Before Proof on purpose.** Values state what the work answers to; the testimonial band directly after it shows clients describing that work. The claim is made, then evidenced.
- **Out of the conversion path.** Hero, fork, services and method all precede it, so it never stands between a buyer and the offer.

Rhythm: `about` (standard), `credibility` (tight), `values` (standard), `proof` (anchor). No run of three standard bands, and no tight band after an anchor.

Navigation is unchanged. `CONTENT.md` §2 caps the bar at five items, so the section is not linked from the header.

## DOM Structure

```
<section id="values" aria-labelledby="values-heading" className="py-band">
  <div>                                  max-w-page mx-auto px-md
    <h2 id="values-heading">             MVV-H2
    <div>                                statements: 1 col, 2 col at md, 12 col at lg
      <div>                              mission, full width at md, span 8 at lg
        <h3>                             MVV-MISSION-LABEL
        <p>                              MVV-MISSION
      <div>                              vision, on the axis from md
        <h3>                             MVV-VISION-LABEL
        <p>                              MVV-VISION
    <div>                                values group, hairline rule, 2 col grid at md
      <h3 id="core-values-heading">      MVV-VALUES-LABEL, cell 1
      <ul aria-labelledby=...>           spans both columns on a subgrid
        <li> x7                          first item starts in column 2
          <span aria-hidden>             01 to 07
          <div>
            <h4>                         VALUE-0n-NAME
            <p>                          VALUE-0n-DESC
```

Values are a `<ul>`, not an `<ol>`: the order is the client's, not a ranking or a sequence. Numerals are visual index marks and are hidden from assistive technology. Each value name is an `<h4>` so the section outline reads Mission, Vision, Core values, then the seven values.

The values group renders only when `values` is non-empty, so the heading is never left over an empty list.

## DESIGN SPECIFICATION

### Section
- Band: `py-band` (standard). Surface: paper. Proof directly after is the page's one navy band, so this section must stay paper.

### Header
- `h2` at `text-h2 text-foreground mb-xl lg:mb-2xl`. Headline only. No standfirst: the three labels below already say what the section contains.

### The axis
The composition hangs on one vertical line: the split between the values index's two columns. From `md`, Vision's left edge sits on it too, so Vision and the numerals 01, 03, 05, 07 share an x.

This holds because the statement grid and the values grid both use `gap-x-lg`. A 2-column grid splits at `W/2 + gap/2`, and so does column 7 of a 12-column grid. Change either gap and the axis breaks.

### Statements
- Grid: `grid-cols-1 gap-y-xl`, `md:grid-cols-2 md:gap-x-lg`, `lg:grid-cols-12`
- Mission: `md:col-span-full lg:col-span-8`. Statement `mt-sm max-w-[52ch] font-heading text-h3 text-foreground text-pretty`, the pull-statement role `globals.css` assigns to `h3` size.
- Vision: `md:col-start-2 lg:col-span-6 lg:col-start-7`. Statement `mt-sm max-w-[46ch] text-lead text-foreground text-pretty`, body face.
- Mission runs past the axis. Vision steps down onto it. Present purpose, then the future it points at.
- Hierarchy is carried by three things at once, never by colour alone: face and size (serif `h3` against sans `lead`), measure (Mission wide, Vision narrower), and position (Vision below and to the right).
- No rule above either statement at `md` and up. Two ruled columns side by side is the buyer fork.
- Below `md` the statements stack. Vision takes `border-t border-border pt-lg` there, since the step is gone and something has to mark the change of subject.

### Labels (Mission, Vision)
- `font-body text-body font-semibold text-foreground`, sentence case.
- Not uppercase and not tracked. `CONTENT.md` §3 makes `HERO-EYEBROW` the page's only eyebrow.

### Values index
- Group: `mt-2xl border-t border-border pt-xl`. From `md`: `grid grid-cols-2 gap-x-lg items-baseline`.
- Heading: `text-h3 text-foreground`, serif. Heavier than the Mission and Vision labels on purpose: those caption large statements, this one heads a list of small items. From `md`: `col-start-1 row-start-1 relative`.
- List: `mt-lg grid grid-cols-1 gap-y-lg`. From `md`: `col-span-full row-start-1 mt-0 grid-cols-subgrid gap-y-xl`.
  - `col-span-full`, not `col-span-2`. With no start line, auto-placement steps past the heading and opens a third column.
  - First item `md:col-start-2`. The heading takes cell 1, so seven values plus the heading fill eight cells, four rows of two. No empty cell at any breakpoint.
  - The list's box overlaps the heading's cell. `relative` on the heading paints it above the list, so its text stays selectable. No z-index.
  - `items-baseline` on the group puts "Core values" on the same baseline as the first value name.
- Item: `grid grid-cols-[auto_1fr] items-baseline gap-x-sm`, a hanging numeral with the name and description aligned to one text edge
- Numeral: `text-small text-muted-foreground`, `data-numeric` for tabular figures
- Name: `font-body text-lead font-semibold text-foreground`
- Description: `mt-2xs max-w-[48ch] text-body text-muted-foreground text-pretty`
- No rule per item, no card, no icon. Seven items with a hairline under each is the spec-sheet pattern the taste skill bans.

## States & Behaviors

Static. No hover, focus or active states, because nothing is interactive. On this site a hover change or a crimson accent signals "clickable", so decorating these rows with one would be a false affordance.

No entrance or scroll animation. No other mid-page section reveals on scroll, and one that did would behave unlike its neighbours without explaining anything. The content is short statements and a list, so motion would add nothing to comprehension. The global `prefers-reduced-motion` rule in `globals.css` needs nothing from this section.

Empty `values`: the values group does not render. Mission and Vision are required props.

## Assets
Icons: none. Images: none. Seven values would need seven invented glyphs, and a numeral does the scanning job without inventing meaning.

## COPY

| Slot | Text |
|---|---|
| `MVV-H2` | What we stand for |
| `MVV-MISSION-LABEL` | Mission |
| `MVV-MISSION` | Empowering organisations through strategic advisory, compliance, and governance solutions that create measurable and sustainable value. |
| `MVV-VISION-LABEL` | Vision |
| `MVV-VISION` | To be a trusted partner in building compliant, resilient, and high-performing organisations. |
| `MVV-VALUES-LABEL` | Core values |
| `VALUE-01` to `VALUE-07` | See `CONTENT.md` §8a |

The short Mission and Vision were chosen over the longer alternates the client also supplied. Both alternates run past what a pull statement can carry at `h3` without turning into a paragraph.

## Responsive Behavior
- **Desktop (1440px):** Mission across eight columns, three lines. Vision below it on the axis at column 7, two lines. Values in two columns, "Core values" in the first cell, four rows.
- **Laptop (1024px):** as desktop. Mission wraps to three lines at the narrower measure.
- **Tablet (768px):** Mission full width. Vision on the axis at column 2 of 2, three lines. Values as desktop. One hairline in the section, above the values.
- **Mobile (390px):** single column throughout. Mission at the mobile end of `text-h3` (20px) remains the first thing read. Vision takes a hairline and keeps its sans face, so it stays distinct without the step. "Core values" sits above the list, and the values stack with hanging numerals, which keep the list scannable.
- **Breakpoints:** `md` (768px) for the axis and the values columns, `lg` (1024px) for the 12-column statement grid.

## CONTRAST CHECK

| Pairing | Ratio | Source | Verdict |
|---|---|---|---|
| Navy h2, labels, statements, value names on paper | 17.07:1 | `BRAND.md` | Pass |
| Slate numerals and descriptions on paper | 5.74:1 | `globals.css` | Pass, AA at every size |
| `--border` hairlines | decorative | `globals.css` | Exempt |

No cyan text and no crimson anywhere in the section.

## ANTI-SLOP CONSTRAINTS

- **No three equal panels, no Mission card beside a Vision card.** The two statements differ in face, size, measure and position.
- **No ruled side-by-side pair.** That is the buyer fork's composition.
- **No empty grid cell.** Seven values never sit alone in a two-column grid; the heading takes the first cell.
- **No icon per value.** No shield for Integrity, no target for Excellence.
- **No numeral on a connecting rule.** That is Approach's signature, the sequence track. Numerals here are small and muted, and do not imply a sequence.
- **No eyebrow.** Labels are sentence case.
- **No hover lift, glow or reveal on the values.** Static content, static presentation.
- **No filler standfirst under the h2.**
- **No em-dash in any rendered string.**
