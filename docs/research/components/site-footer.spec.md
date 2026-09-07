# SiteFooter Specification

Section 11 in the approved sequence (`IA_CRITIQUE.md`), layout family
**grid-4**. Renders as a navy band per `HOMEPAGE_RHYTHM`'s `footer` entry (see
the note under ANTI-SLOP CONSTRAINTS about that file's current staleness).

## Overview
- **Target file:** `src/components/layout/site-footer.tsx`
- **Design reference:** none. Authored from `CONTENT.md` section 12.
- **Interaction model:** static — text links only, no client state
- **Server/Client:** Server Component. Nothing here needs interactivity beyond native anchor behaviour.

## DOM Structure

```
<footer className="band-navy">
  <div>                              py-band-tight, max-w-page mx-auto px-md
    <div>                            grid-4 upper block
      <div>                          col 1: identity
        <AagLogo variant="full" />
        <p>                          FOOT-BLURB
      <div>                          col 2: FOOT-COL-1 (Services)
        <p class="heading">
        <ul> <li><a> x4              one per cluster, not per practice line
      <div>                          col 3: FOOT-COL-2 (Firm)
        <p class="heading">
        <ul> <li><a>                 About, Approach, Insights
      <div>                          col 4: FOOT-COL-3 (Contact)
        <p class="heading">
        <ul>                         address, phone, email — each gated
    <div>                            lower block, border-t border-border
      <p>                            FOOT-LEGAL
      <p>                            FOOT-REG, gated
      <a>                            FOOT-PRIVACY
```

## DESIGN SPECIFICATION

### Footer element
- Surface: `.band-navy` (this is the one footer-level use of the navy authority colour named in `BRAND.md`'s colour usage law)
- Vertical padding: `py-band-tight` (40 → 64px) — a tight band is correct here because the footer is read as the tail end of Contact above it, not as its own topic. Per `globals.css`'s sequencing rule, a tight band never directly follows an anchor band; Contact (section 10) is a `standard` band in the approved sequence, so this is legal.
- Rail: `max-w-page mx-auto px-md`

### Upper block (grid-4)
- `grid grid-cols-2 lg:grid-cols-4 gap-xl` — two columns at tablet and below, four at `lg` and up
- Column 1 (identity) spans both columns of the mobile 2-up grid (`col-span-2 lg:col-span-1`), since a wordmark plus a blurb sentence reads poorly squeezed into a half-width mobile column
- Column heading (`FOOT-COL-1/2/3`): `text-caption font-sans font-medium uppercase tracking-wide text-muted-foreground mb-sm`
- Link list: `flex flex-col gap-xs`, each link `text-body text-foreground hover:text-action-text`

### Identity column
- `AagLogo` variant `full` (mark + wordmark + lockup), resolves through `.band-navy` tokens
- `FOOT-BLURB` directly under it: `text-body text-muted-foreground mt-sm max-w-[32ch]`

### Services column links
- Four entries, one per cluster (`#services-growth`, `#services-fund`, `#services-protect`, `#services-people`), **not** seven, matching the cluster grouping in `services-data.spec.md`. A seven-item footer list would reintroduce the menu problem `IA_CRITIQUE.md` §3.2 explicitly grouped away from.

### Contact column
- Three lines, each `flex items-start gap-xs`: `IconAddress` + `CON-ADDRESS`, `IconPhone` + `CON-PHONE`, `IconEmail` + `CON-EMAIL`
- Icon colour: `text-stroke-systems` (cyan family — these are informational glyphs, not clickable actions in their own right, so cyan is correct here even though the address/phone/email themselves may also be links)
- **Every line in this column is individually gated.** See States & Behaviors.

### Lower block
- `flex flex-col-reverse sm:flex-row items-center justify-between gap-sm mt-2xl pt-lg border-t border-border`
- `FOOT-LEGAL` and `FOOT-REG` (when present): `text-caption text-muted-foreground`
- `FOOT-PRIVACY`: `text-caption text-action-text hover:underline`, right-aligned at `sm` and up

## States & Behaviors

### Gated contact lines
- **Trigger:** build time, from each slot's status in `CONTENT.md`
- **State:** `CON-ADDRESS`, `CON-PHONE`, and `CON-EMAIL` are each `NEEDS-CLIENT-INPUT`. A gated line does not render its `<li>` at all — no bracketed placeholder ships, and no empty icon row sits with nothing beside it.
- **All three absent:** the Contact column still renders its heading, with a single fallback line pointing at the on-page contact form (`See the enquiry form above`, linking `#contact`), so the column is never a heading over empty space.

### Gated legal lines
- `FOOT-REG` is `NEEDS-CLIENT-INPUT` and, per its own row in `CONTENT.md`, may be omitted entirely rather than supplied — its absence renders no line, not a placeholder.
- `FOOT-LEGAL` interpolates `[CLIENT TO SUPPLY: registered entity name]` and `[CLIENT TO SUPPLY: year]`. **This is the one slot in the whole footer that cannot simply be omitted** — a copyright line with no entity name is worse than one that is visibly a placeholder mid-build. Render the bracketed text as-is until supplied; do not invent a plausible-looking entity name to avoid the bracket.

### Link hover
- **Trigger:** pointer over any footer link
- **State:** `hover:text-action-text` (crimson-light on navy, 7.00:1), colour only
- **Transition:** 200ms

### Link focus-visible (mandatory)
- `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background` on every anchor, including `FOOT-PRIVACY`

### Link active
- `active:translate-y-px`

## Per-State Content
Covered under States & Behaviors above — this section has no content variant beyond the gating already described.

## Assets
- `AagLogo` from `src/components/brand/AagLogo.tsx`, `variant="full"`
- Icons: `IconAddress`, `IconPhone`, `IconEmail` from `src/components/icons.tsx`, all `size="sm"`
- Image slots: none

## COPY

| Slot | Text |
|---|---|
| `FOOT-BLURB` | Business and financial advisory for Kenyan firms. |
| `FOOT-COL-1` | Services |
| `FOOT-COL-2` | Firm |
| `FOOT-COL-3` | Contact |
| `FOOT-PRIVACY` | Privacy notice |
| `FOOT-LEGAL` | © `[CLIENT TO SUPPLY: registered entity name]` `[CLIENT TO SUPPLY: year]`. All rights reserved. |
| `FOOT-REG` | `[CLIENT TO SUPPLY: company registration number, or omit this line entirely]` |

Contact column (each independently gated, see States & Behaviors):
`CON-ADDRESS`, `CON-PHONE`, `CON-EMAIL` — all `[CLIENT TO SUPPLY: ...]`.

Firm column links (not in the register as separate slots; these reuse the
section headlines already approved elsewhere): About (`#about`), Approach
(`#approach`), Insights (`/insights`).

## Responsive Behavior
- **Desktop (1440px):** four columns, one row
- **Tablet (768px):** two columns, identity spans both; two rows for the three content columns
- **Mobile (390px):** same two-column grid; lower block stacks legal text above the privacy link (`flex-col-reverse` puts the privacy link visually last, matching left-to-right reading order when it wraps)
- **Breakpoint:** grid collapses at `lg` (1024px), matching the header

## CONTRAST CHECK

| Pairing | Ratio | Source | Verdict |
|---|---|---|---|
| Paper heading/link text on navy | 17.07:1 | `globals.css` derived | Pass |
| Muted blue-grey caption on navy | 8.49:1 | `globals.css` derived | Pass |
| Crimson-light link hover on navy | 7.00:1 | `BRAND.md` | Pass |
| Cyan contact icons on navy | 6.98:1 | `BRAND.md` | Pass (icons carry no text at this size, but the pairing still clears body-text thresholds) |
| `--border` hairline on navy (lower-block divider) | decorative | `globals.css` | Exempt |

## ANTI-SLOP CONSTRAINTS

- **No newsletter signup field.** Not in `CONTENT.md`, not asked for, and a bare email-capture box at the foot of a services site with no stated purpose is a template default.
- **No social icon row.** No social handles exist in the content register. An icon row linking nowhere is worse than no row.
- **No seven-item services list.** Four cluster links only, matching `services-data.spec.md`. Restating all seven practice lines here reopens the menu problem the whole services section was restructured to solve.
- **No fabricated registration number or founding year to fill `FOOT-LEGAL`.** The bracketed placeholder ships exactly as written in `CONTENT.md` until the client supplies it.

**Note on `src/types/section.ts`:** `HOMEPAGE_RHYTHM` in that file currently
lists `footer` with `surface: "navy"`, which matches this spec. But the same
file's section order (`hero, about, credibility, services, approach, proof,
cta, contact, footer`) predates `IA_CRITIQUE.md` and puts About and
Credibility ahead of Services — the ordering `CONTENT.md` §"Section order"
explicitly says was superseded. That file also has no `SectionId` entry for
the buyer fork at all. This spec is written against the approved sequence in
`IA_CRITIQUE.md`, not against the stale type file. `section.ts` needs a
follow-up pass — adding a `fork` id and reordering `HOMEPAGE_RHYTHM` — before
a builder can wire section order from it.
