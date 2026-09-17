# PracticeLineRow Specification

The disclosure row inside `cluster-row.spec.md`. One row per practice line:
name, one-sentence summary, and the detail block revealed on demand. This is
the file that surfaces each of the seven `SVC-0n-*` slots from `CONTENT.md` §5.2.

**Revised 2026-09-16 (anti-slop pass).** The leading service icon is gone (see
`services-data.spec.md`, "Icon assignment"), the hover fill is replaced by a
colour change, and the markup inside the button is now phrasing content only
(`<span>`s). The previous `<div>`/`<p>` inside `<button>` was invalid HTML.

## Overview
- **Target file:** `src/components/sections/practice-line-row.tsx`
- **Interaction model:** the whole row is a disclosure button controlling the detail block.
- **Server/Client:** Client Component (owns the expand/collapse state).

## DOM Structure

```
<li>
  <button aria-expanded aria-controls={detailId}>   group
    <span>                                          flex-1
      <span>                                        SVC-0n-NAME
      <span>                                        SVC-0n-SUMMARY
    <IconCaretDown />                               rotates on expand
  <div id={detailId}>                               grid-rows 0fr -> 1fr
    <div overflow-hidden>
      <p aria-hidden={!expanded}>                   SVC-0n-DETAIL
```

## DESIGN SPECIFICATION

### Row trigger
- `group flex w-full items-start gap-md rounded-sm text-left`
- Name: `block text-lead font-medium text-foreground`. Lead size so the client's practice-line names are what the eye scans down the index; medium weight rather than semibold so they do not outweigh the serif cluster name beside them.
- Summary: `mt-2xs block text-body text-muted-foreground`
- Caret: `IconCaretDown size="sm"`, `mt-1 shrink-0 text-muted-foreground`, `rotate-180` when expanded.

### Detail block
- `pt-sm pr-[calc(var(--spacing-md)+1.25rem)] text-body text-foreground`
- The right padding equals the caret's width (20px) plus the row's `gap-md`, so the detail paragraph's right edge lines up exactly with the summary's.
- Navy, not slate: once a visitor asks for the detail, it is the thing they are reading.
- No border, no background. It continues the row.

## States & Behaviors

### Expand / collapse
- **Trigger:** click, `Enter` or `Space` on the row (native `<button>`).
- `aria-expanded` toggles; the detail animates `grid-template-rows` `0fr` → `1fr`, 300ms, `ease-[cubic-bezier(0.16,1,0.3,1)]`. Never `max-height`.
- Rows are independent. Opening one does not close its sibling, so a visitor can compare Financial Management with Loans & Financing.

### Hover
- Name and caret turn `text-action-text` (crimson-deep), 200ms colour transition. Same idiom as the footer links: crimson means clickable.
- No background fill. Without a card around it, a fill would draw a box on hover.

### Focus-visible (mandatory)
- `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background`

### Disabled / gated
- A line whose `status` is `NEEDS-CLIENT-INPUT` does not render at all (filtered in `ClusterRow`). No greyed-out row.

### Reduced motion
- Collapses to instant via the global rule in `globals.css`.

## Assets
- Icons: `IconCaretDown` only.

## COPY
All seven `SVC-0n-NAME` / `SVC-0n-SUMMARY` / `SVC-0n-DETAIL` triples from
`CONTENT.md` §5.2 render through this component. `SVC-07` (Legal & Regulatory
Advisory) renders as of 2026-09-16, with its `DRAFT` copy in
`src/lib/services-data.ts`.

## Responsive Behavior
- No layout change of its own. Row height is well above the 44px touch-target floor at every width (about 93px at 1440px with a two-line summary).

## CONTRAST CHECK

| Pairing | Ratio | Source | Verdict |
|---|---|---|---|
| Navy name and detail on paper | 17.07:1 | `BRAND.md` | Pass |
| Slate summary on paper | 5.74:1 | `globals.css` derived | Pass |
| Crimson-deep hover name on paper | 6.16:1 | `BRAND.md` | Pass |
| Slate caret on paper | 5.74:1 | `globals.css` derived | Pass |
| Crimson focus ring on paper | 4.42:1 | `globals.css` derived | Pass |

## ANTI-SLOP CONSTRAINTS

- **No leading icon.**
- **No `+` / `−` swap.** The rotating caret is the one expand indicator.
- **No accordion that force-closes siblings.**
- **No card-in-a-card and no hover fill.**
- **No block elements inside the `<button>`.**
- **No greyed "coming soon" row** for a gated line.
