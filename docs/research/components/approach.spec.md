# Approach Specification

Section 5 in the approved sequence ("How we work"), layout family
**horizontal stepped sequence**. Answers the objection `IA_CRITIQUE.md` §3.3
names as the hole in the reference topology: an advisory buyer's real
question is not "can you do this" but "what will the next eight weeks
actually look like."

## Overview
- **Target file:** `src/components/sections/approach.tsx`
- **Design reference:** none. Authored from `IA_CRITIQUE.md` §3.3 and `CONTENT.md` §6.
- **Interaction model:** static. Four stages, no expand/collapse — unlike the services detail rows, each stage's body already fits its full text at a glance (140-character budget), so a disclosure would add a click for no space saved.
- **Server/Client:** Server Component.

## DOM Structure

```
<section id="approach" className="py-band-tight">
  <div>                                  max-w-page mx-auto px-md
    <div>                                header, max-w-[42ch]
      <h2>                               APP-H2
      <p>                                APP-SUB
    <ol>                                 the sequence, semantic list = order matters
      <li>  x4                           one per stage
        <div>                            connector + number
          <span>                         01 / 02 / 03 / 04
          <div>                          connector line (omitted after item 4)
        <p>                              APP-0n-NAME
        <p>                              APP-0n-DESC
    <div>                                APP-START, conditionally rendered
      <p>
```

## DESIGN SPECIFICATION

### Section
- Band: `py-band-tight` (40 → 64px), **not** `py-band`. The approved sequence
  (`IA_CRITIQUE.md`) runs Fork → Services → Approach → About with no tight or
  anchor band between them, and Fork cannot take the tight band itself — it
  sits directly after the hero's anchor band, and `globals.css`'s rule
  forbids a tight band immediately after an anchor. That leaves Fork and
  Services as a fixed pair of two consecutive `standard` bands, which is
  already at the rule's limit. Approach is the section that breaks the run:
  it reads as answering "and how does that work actually happen", a coda to
  Services rather than a fully separate topic, so a tight band suits it
  correctly rather than merely satisfying a rule. About then stands alone as
  its own single `standard` band, capped in turn by Credibility's tight band
  immediately after it.
- Surface: paper.

### Header
- Same treatment as `services-section.spec.md`'s header: `max-w-[42ch] mb-xl`, `h2` at `text-h2 font-display font-normal`, subtext at `text-lead text-muted-foreground`

### Sequence container
- `<ol>` — a semantic ordered list, since stage order is load-bearing content, not just a visual arrangement
- Desktop (`lg` and up): `grid grid-cols-4 gap-lg`, four stages side by side
- Below `lg`: `flex flex-col gap-lg`, stacked

### Stage item
- Number: `text-h3 font-display font-normal text-stroke-systems` (cyan-deep) — a numeral, not an icon, since four sequential stages are better told apart by ordinal position than by a set of four unrelated glyphs that would need inventing
- Connector (desktop only, omitted after the fourth item): `h-px flex-1 bg-border ml-sm`, sitting inline beside the number so the row reads `01 ──────`, then wraps to the name and body beneath
- Stage name: `text-h3 font-display font-normal text-foreground mt-sm`. **Rendered as the verb itself** — "Diagnose", not "Stage 1: Diagnose" — per `CONTENT.md`'s explicit instruction that stage labels carry no numeric prefix in the copy (the numeral is a separate design element, not baked into the string)
- Stage body: `text-body text-muted-foreground mt-xs`

### Below `lg`
- Connector line rotates to vertical, `w-px h-lg bg-border ml-[calc(var(--spacing-h3-approx)/2)]` positioned between a stage's number and the next stage's number — simplest correct implementation is a `border-l border-border` on the stacked container with stage content indented, rather than computing an exact centred vertical line per item

## States & Behaviors

Static content only. No hover/focus/active states — no element in this
section is interactive. `APP-START`'s conditional rendering is the only
behavior worth naming:

### `APP-START` gating
- **Trigger:** build time, from `CONTENT.md` §6's status for that slot
- **State:** `APP-START` is `NEEDS-CLIENT-INPUT` (it commits the firm to a
  statement about whether a first meeting is chargeable, which is not ours to
  draft). When absent, this block does not render at all — no placeholder
  sentence, no empty `<div>`. `CONTENT.md` confirms the section "reads
  correctly without it": the four stages already answer "what happens", and
  `APP-START` only adds "how it begins."
- **When present:** renders as `text-body text-muted-foreground mt-xl pt-lg
  border-t border-border`, visually closing the sequence rather than sitting
  as a fifth stage in the `<ol>` — it is a footnote to the process, not a
  fifth step in it.

## Per-State Content
Covered above.

## Assets
Icons: none — the numeral itself is the visual mark for each stage,
deliberately, per Design Specification above. Image slots: none.

## COPY

| Slot | Text |
|---|---|
| `APP-H2` | How we work |
| `APP-SUB` | Four stages. You get a written position at the end of each one. |
| `APP-01-NAME` / `APP-01-DESC` | Diagnose / We read the accounts, talk to your people, and write down what we find. No recommendations yet. |
| `APP-02-NAME` / `APP-02-DESC` | Prioritise / We rank what we found by cost of inaction, then agree the order of work with you. |
| `APP-03-NAME` / `APP-03-DESC` | Build / Models, systems, filings, training. The work itself, on an agreed schedule. |
| `APP-04-NAME` / `APP-04-DESC` | Hand over / Your team runs it without us. We document the process and stay reachable. |
| `APP-START` | `[CLIENT TO SUPPLY: what a first engagement involves, whether the first meeting is chargeable, and the smallest scope the firm will take on.]` — `NEEDS-CLIENT-INPUT`, omit until supplied |

## Responsive Behavior
- **Desktop (1440px):** four columns, one row, numeral-and-connector reading left to right as a single visual line above the four name/body pairs
- **Tablet (768px):** stacks below `lg` (1024px) rather than at the more common `md` — four stage names plus bodies genuinely need the extra width `lg` provides to read as four short side-by-side blocks rather than four cramped ones; below that, stacked is the honest choice
- **Mobile (390px):** stacked, vertical connector per the note above
- **Breakpoint:** `lg` (1024px)

## CONTRAST CHECK

| Pairing | Ratio | Source | Verdict |
|---|---|---|---|
| Navy H2 on paper | 17.07:1 | `BRAND.md` | Pass |
| Slate subtext on paper | 5.74:1 | `globals.css` derived | Pass |
| Cyan-deep numeral on paper | 3.92:1 | `globals.css` derived | Pass — a numeral is display text at `text-h3` size (32px at desktop, 23px at mobile floor), so it clears the large-text 3:1 floor even before considering the 3.92:1 actual figure; **do not shrink the numeral below `text-h3`**, since a smaller cyan numeral would fall back to the stricter small-text threshold and fail |
| Navy stage name on paper | 17.07:1 | `BRAND.md` | Pass |
| Slate stage body on paper | 5.74:1 | `globals.css` derived | Pass |
| `--border` connector line | decorative | `globals.css` | Exempt |

## ANTI-SLOP CONSTRAINTS

- **No numbered-circle-with-icon-inside per stage.** A bare numeral in the display serif is enough; a circular badge containing a generic icon (a magnifying glass for "Diagnose", a checklist for "Build") is the single most common process-section pattern and each icon would need inventing rather than sourcing from an existing set.
- **No "Stage 1 / Stage 2" prefix baked into the copy.** Covered under Design Specification — the ordinal is a design element applied to the numeral, never typed into the name string.
- **No progress bar or percentage-complete affordance.** This is a description of how engagements run, not a live tracker a client logs into; a progress indicator implies real-time state that does not exist here.
- **No horizontal scroll-snap carousel for the four stages at mobile.** They stack vertically in full, per Responsive Behavior — a swipeable carousel would hide three of the four stages behind a gesture on a section whose entire point is showing the whole process at once.
- **No placeholder sentence standing in for `APP-START` while it is gated.** Omit the block entirely, per States & Behaviors.
