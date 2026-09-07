# ServicesSection Specification

Section 4 in the approved sequence, layout family **bento with uneven
rhythm**. This is the section `IA_CRITIQUE.md` §3.2 restructures hardest:
seven practice lines will not sit in one grid — past the taste skill's
five-tile threshold (§4.9) and unable to form an even grid regardless — so
they group into four clusters, echoing the two doors in `buyer-fork.spec.md`.

**Split across four files**, on structural role rather than one file per
practice line:
- **This file** — the section wrapper: headline, subtext, the four-cell grid, and how it links back to the fork above it.
- `cluster-card.spec.md` — the one repeating cell component.
- `practice-line-row.spec.md` — the row inside a cluster card that names one practice line.
- `services-data.spec.md` — the cluster→line mapping, icon assignments, hrefs, and the gating logic for the unconfirmed seventh line. Not a visual spec; a data contract the other three files depend on.

A builder implementing this section receives all four files together.

## Overview
- **Target file:** `src/components/sections/services-section.tsx`
- **Design reference:** none. Authored from `IA_CRITIQUE.md` §3.2 and `CONTENT.md` §5.1.
- **Interaction model:** static section frame. Interactivity lives inside `cluster-card.spec.md`.
- **Server/Client:** Server Component. Reads the static array from `services-data.spec.md`; no client state at the section level.

## DOM Structure

```
<section id="services" className="py-band">
  <div>                                  max-w-page mx-auto px-md
    <div>                                header, max-w-[42ch]
      <h2>                               SVC-H2
      <p>                                SVC-SUB
    <div>                                bento grid, 4 cells
      <ClusterCard />  x4                one per CLUSTERS entry in services-data.spec.md
```

## DESIGN SPECIFICATION

### Section
- Band: `py-band` (64 → 112px)
- Surface: paper
- Per `globals.css`'s sequencing rule, Services is the second of exactly two consecutive `standard` bands, with the buyer fork (section 3) as the first — the fork cannot itself take a tight band, since it sits directly after the hero's anchor band and a tight band may never immediately follow an anchor. Approach (section 5), immediately after Services, breaks the run with a tight band rather than a third standard band; see `approach.spec.md` for why that section is the one that yields.

### Header
- `max-w-[42ch] mb-xl`
- `h2`: `text-h2 font-display font-normal text-foreground mb-sm`
- `p` (`SVC-SUB`): `text-lead text-muted-foreground`

### Bento grid
- `grid grid-cols-1 sm:grid-cols-2 gap-lg`
- **Uneven rhythm, not four identical tiles.** `IA_CRITIQUE.md` §3.2 explicitly notes the clusters are deliberately uneven (two lines in three of them, one line — or two once confirmed — in Protect) and that this "rules out four identical tiles." Implement as: Grow and Fund at `sm:col-span-1` each on row one; Protect and People at `sm:col-span-1` each on row two. All four cells are the same grid footprint — the unevenness lives in each cell's **internal** content density (one line row vs. two), not in the cells' outer dimensions. Do not stretch a two-line cluster's card to visually dominate a one-line cluster's card; `cluster-card.spec.md`'s `h-full` plus internal padding handles the height difference without changing the grid geometry.

## States & Behaviors

This wrapper has no interactive states of its own. Hover, focus, and active
states belong to `cluster-card.spec.md` and, inside it, `practice-line-row.spec.md`.

### Deep-linking from the buyer fork
- **Trigger:** arrival at `#services` with a data attribute set by `buyer-fork.spec.md` (`data-open-cluster="fund"` or `"protect"`)
- **State:** no visual highlight or auto-scroll-within-section beyond the browser's native anchor jump to `#services`. This section does not implement a "flash" or "pulse" highlight on the target cluster — a static page anchor is sufficient, and an attention-grabbing highlight on arrival is the kind of motion effect `MOTION_INTENSITY 4` reserves for content entering view on scroll, not for a jump destination.

## Per-State Content
N/A at this level.

## Assets
Covered per-cluster in `services-data.spec.md`. No assets belong to the wrapper itself.

## COPY

| Slot | Text |
|---|---|
| `SVC-H2` | What we do |
| `SVC-SUB` | Seven practice lines in four groups. Each line is scoped on its own, and they can be combined in one engagement. |

Cluster names and bodies (`CLU-01` through `CLU-04`) render inside
`ClusterCard` and are listed in `cluster-card.spec.md`'s COPY block, not
repeated here.

## Responsive Behavior
- **Desktop (1440px):** 2×2 grid
- **Tablet (768px):** 2×2 grid holds at `sm` (640px), so tablet matches desktop geometry
- **Mobile (390px):** single column, four cells stacked, cluster order Grow, Fund, Protect, People (matching the fork order: Grow/Fund answer `FORK-01`, Protect answers `FORK-02`, People is reachable from both and sits last)
- **Breakpoint:** grid splits to two columns at `sm` (640px) — earlier than most of this page's other grids, since a bento cell here is content-dense enough to justify two columns even at a narrower width than the buyer fork's cards

## CONTRAST CHECK
Covered per-element in `cluster-card.spec.md` and `practice-line-row.spec.md`. The header text pairings match every other section: navy H2 on paper (17.07:1), slate subtext on paper (5.74:1).

## ANTI-SLOP CONSTRAINTS

- **No seven-tile grid.** This is the entire reason the section is restructured; a builder must not "simplify" back to one card per practice line.
- **No four identical square tiles.** Covered above — the rhythm must read as uneven internally even though the outer grid footprint is regular.
- **No icon-only cluster summary.** Every cluster needs its name and body sentence; an icon grid with tooltips is not an acceptable substitute for read­able copy on a page whose whole argument is "here is specifically what we do."
- **No fifth "and more" or "custom solutions" tile.** Four clusters, fixed, matching `services-data.spec.md` exactly.
