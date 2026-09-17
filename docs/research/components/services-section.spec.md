# ServicesSection Specification

Section 4 in the approved sequence, layout family **ruled practice index**.
This is the section `IA_CRITIQUE.md` §3.2 restructures hardest: seven practice
lines will not sit in one grid, so they group into four clusters, echoing the
two doors in `buyer-fork.spec.md`.

**Revised 2026-09-16 (anti-slop pass).** The previous build was a 2×2 grid of
rounded, bordered cards, each holding an icon + bold title + paragraph + caret
row per practice line. It repeated the buyer fork's card treatment directly
above, left the one-line People card visibly half empty, and on phones card
padding plus an icon column squeezed each summary to about 200px. The section
is now an index: four full-width cluster rows separated by single rules, with
the cluster's name and reason on the left and its practice lines on the right.
Uneven clusters now read as intended, because each row takes the height its
content needs. Cluster membership, anchors and the disclosure are unchanged.
`SVC-SUB` and three practice-line summaries were rewritten in the same pass;
see the register summary in `CONTENT.md`.

**Split across four files**, on structural role rather than one file per
practice line:
- **This file**: the section wrapper, its header, and the index container.
- `cluster-row.spec.md`: the repeating cluster row.
- `practice-line-row.spec.md`: the disclosure row that names one practice line.
- `services-data.spec.md`: the cluster→line mapping, hrefs, and the gating logic for the unconfirmed seventh line.

A builder implementing this section receives all four files together.

## Overview
- **Target file:** `src/components/sections/services-section.tsx`
- **Design reference:** none. Authored from `IA_CRITIQUE.md` §3.2 and `CONTENT.md` §5.1.
- **Interaction model:** static section frame. Interactivity lives inside `practice-line-row.spec.md`.
- **Server/Client:** Server Component.

## DOM Structure

```
<section id="services" className="py-band">
  <div>                                  max-w-page mx-auto px-md
    <div>                                header
      <h2>                               SVC-H2
      <p>                                SVC-SUB
    <div>                                index, border-b
      <ClusterRow />  x4                 one per CLUSTERS entry, each with its own border-t
```

## DESIGN SPECIFICATION

### Section
- Band: `py-band` (64 → 112px)
- Surface: paper
- Per `globals.css`'s sequencing rule, Services is the second of exactly two consecutive `standard` bands, with the buyer fork as the first. Approach, immediately after, takes a tight band.

### Header
- Wrapper `mb-2xl`. The header-to-index step is deliberately larger than heading-to-standfirst (`mb-sm`), so the header reads as introducing the whole index rather than sitting on its first rule.
- `h2`: `text-h2 text-foreground mb-sm`
- `p` (`SVC-SUB`): `max-w-[56ch] text-lead text-muted-foreground`. States the engagement model, not the layout: no count of lines or groups, which the page cannot guarantee while `SVC-07` is gated.

### Index container
- `border-b border-border`. Each cluster row carries `border-t border-border`, so four rows plus this closing rule give five hairlines in total: one per group boundary, never one per practice line.
- **Why a light rule here and a navy rule on the fork:** the fork is a decision point and takes the strong rule; the index is reference material and takes the quiet one. Adjacent sections should not share a rule weight.

## States & Behaviors

No interactive states at this level.

### Deep-linking from the buyer fork
- `FORK-01` lands on `#services` (section top). `FORK-02` lands on `#services-protect`, which carries `scroll-mt-24` (see `cluster-row.spec.md`) so the Risk heading clears the 72px sticky header.
- No flash, pulse or highlight on arrival.

## COPY

| Slot | Text |
|---|---|
| `SVC-H2` | What we do |
| `SVC-SUB` | Each practice line is scoped on its own, and several can be combined in one engagement. |

Cluster names and bodies render inside `ClusterRow`; see `cluster-row.spec.md`.

## Responsive Behavior
- **Desktop (1440px / 1280px / 1024px):** side-head rows (cluster in columns 1–4, lines in columns 6–12).
- **Tablet (768px):** stacked rows, full width. A 4/12 side-head at 768px would squeeze the cluster sentence to about 230px.
- **Mobile (≤ 430px):** stacked rows, full width, cluster order Growth, Funding, Risk, People.

## CONTRAST CHECK
Header pairings match every other paper section: navy H2 (17.07:1), slate standfirst (5.74:1). Row pairings are in `cluster-row.spec.md` and `practice-line-row.spec.md`.

## ANTI-SLOP CONSTRAINTS

- **No seven-tile grid.** Seven lines always group into four clusters.
- **No card grid.** No bordered, rounded or filled box per cluster. The rules carry the grouping.
- **No icons.** See `services-data.spec.md`, "Icon assignment".
- **No rule under every practice line.** One rule per cluster boundary.
- **No fifth "and more" or "custom solutions" row.**
