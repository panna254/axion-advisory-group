# PracticeLineRow Specification

The line-item component inside `cluster-card.spec.md`. One row per practice
line: icon, name, one-sentence summary, and a link into that line's detail
content. This is the file that actually surfaces each of the seven `SVC-0n-*`
slots from `CONTENT.md` §5.2.

## Overview
- **Target file:** `src/components/sections/practice-line-row.tsx`
- **Design reference:** none.
- **Interaction model:** the whole row is a link (to an anchor holding `SVC-0n-DETAIL`, rendered as a disclosure — see States & Behaviors)
- **Server/Client:** Client Component, because it owns the expand/collapse state for the detail block. Everything else about it could be a Server Component, but the disclosure needs client state, so the whole row is one small client boundary rather than splitting an interactive control out of an otherwise-static row.

## DOM Structure

```
<li>
  <button aria-expanded aria-controls={detailId}>   the row itself is the trigger
    <Icon />                                         SERVICE_ICONS[slug]
    <div>
      <p>                                            SVC-0n-NAME
      <p>                                            SVC-0n-SUMMARY
    <IconCaretDown />                                rotates on expand
  <div id={detailId} hidden={!expanded}>
    <p>                                              SVC-0n-DETAIL
```

## DESIGN SPECIFICATION

### Row trigger
- `w-full flex items-start gap-sm text-left rounded-lg p-xs -mx-xs` (negative margin cancels the padding so the hit area is larger than the visual row without shifting the row's visible left edge)
- Icon: `SERVICE_ICONS[slug]` at `size="md"` (24px), `text-stroke-systems` (cyan-deep on paper) — per `icons.tsx`'s own header comment, icons are never crimson, since crimson means clickable and would compete with the row itself being the actual clickable element
- Name: `text-body font-sans font-semibold text-foreground`
- Summary: `text-body text-muted-foreground`
- Trailing glyph: `IconCaretDown size="sm" text-muted-foreground`, `transition-transform duration-200`, rotates 180° when expanded (`rotate-180`)

### Detail block (expanded content)
- `pl-[2.75rem] pr-xs pb-xs pt-2xs` — left padding matches the icon's width plus the row's gap, so the detail paragraph's left edge lines up under the name/summary text, not under the icon
- Type: `text-body text-muted-foreground`
- No border, no background change — the detail reads as a continuation of the row, not a separate card

## States & Behaviors

### Expand / collapse (disclosure pattern)
- **Trigger:** click or `Enter`/`Space` on the row
- **State:** `aria-expanded` toggles; detail block height animates from `0` to its content height
- **Only one row open at a time within a card is NOT enforced** — each row is an independent disclosure (an accordion that force-closes siblings would penalise a visitor comparing two lines in the same cluster, e.g. Financial Management against Loans & Financing under Fund)
- **Transition:** height animates via a CSS grid-rows trick (`grid-template-rows: 0fr` → `1fr`) or an equivalent measured-height animation, 300ms, `ease-[cubic-bezier(0.16,1,0.3,1)]` — **never `max-height` with an arbitrary large value**, which either clips fast content or introduces a visible pause on short content as it animates through unused height
- Reduced motion: collapses to the global `0.01ms` rule; content simply appears/disappears

### Hover
- **Trigger:** pointer over the row
- **State:** `hover:bg-muted` on the trigger only (not the expanded detail block)
- **Transition:** 200ms

### Focus-visible (mandatory)
- `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background` on the `<button>` trigger

### Active
- `active:bg-secondary` (a slightly deeper tint than hover, held only while pressed) rather than `translate-y-px` — this is a disclosure toggle, not a navigating button, so a physical "press down" motion is the wrong affordance; a deeper fill communicates "this is being actuated" without implying travel to a new destination

### Disabled / gated
- **Trigger:** the line's `status` in `services-data.spec.md` is `NEEDS-CLIENT-INPUT`
- **State:** the row does not render at all. This is the mechanism by which `SVC-07` (Legal & Regulatory Advisory) is absent from Protect until confirmed — there is no disabled or greyed-out row, per `CONTENT.md`'s instruction that a blocked slot ships as an absence, not a visible placeholder.

## Per-State Content
Covered under Expand/collapse above.

## Assets
- Icons: one of `IconBusinessConsultancy`, `IconFinancialManagement`, `IconTrainingHr`, `IconLoansFinancing`, `IconRiskManagement`, `IconMarketEntry`, `IconLegalRegulatory` per `SERVICE_ICONS[slug]` in `icons.tsx`, plus `IconCaretDown`, all from `src/components/icons.tsx`
- Image slots: none

## COPY

All seven `SVC-0n-NAME` / `SVC-0n-SUMMARY` / `SVC-0n-DETAIL` triples from
`CONTENT.md` §5.2 render through this component. They are not restated here —
this spec is the template; `services-data.spec.md` is the source of which
slug renders which slot and in which cluster. The one exception worth naming
directly: `SVC-07` (Legal & Regulatory Advisory) is `NEEDS-CLIENT-INPUT` on
all three of its slots and must not render via this component until the
client confirms the practice line's name.

## Responsive Behavior
- **Desktop (1440px) / Tablet (768px):** unchanged, icon and two-line text block side by side
- **Mobile (390px):** unchanged — the row does not need a distinct mobile layout; it was already designed narrow enough to sit inside a single-column card
- **Breakpoint:** none of its own

## CONTRAST CHECK

| Pairing | Ratio | Source | Verdict |
|---|---|---|---|
| Navy line name on `--card` | 17.87:1 | `globals.css` derived | Pass |
| Slate summary/detail on `--card` | ~5.6:1 | `globals.css` derived | Pass |
| Cyan-deep icon on `--card` | ~3.9:1 | `globals.css` derived | Pass, clears the 3:1 meaningful-graphic floor |
| Muted caret on `--card` | decorative directional glyph | `globals.css` | Exempt, but legible well above 3:1 in practice |

## ANTI-SLOP CONSTRAINTS

- **No `+` icon that swaps to `−`.** The rotating caret is the one expand indicator this system uses (matching `form-field.spec.md`'s select caret in spirit); a plus/minus swap is a second visual language for the same idea appearing nowhere else on the site.
- **No accordion that force-closes sibling rows.** Covered above.
- **No card-in-a-card.** The expanded detail is typographically continuous with the row, not a nested bordered box.
- **No line rendered in a disabled/greyed state while gated.** Absence, not a visible "coming soon" row — covered under Disabled/gated above.
- **No icon colour deviating to crimson "for emphasis."** Cyan-deep, always, per `icons.tsx`'s own house rule.
