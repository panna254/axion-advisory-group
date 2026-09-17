# BuyerFork Specification

Section 3 in the approved sequence, layout family **ruled two-column split,
deliberately not a card row**. This is the single highest-value structural
decision in `IA_CRITIQUE.md` (§3.1): two doors, labelled by need rather than by
service name, resolving the two-buyer problem (owner-operator raising capital
vs. finance/compliance lead answering a board) at the earliest point the page
can resolve it.

**Revised 2026-09-16 (anti-slop pass).** The previous build rendered the doors
as two rounded, bordered, filled cards with the whole card as the link, under a
headline plus a subtext that described the layout. That is the generic
"section header + feature cards" pattern, and it made this section structurally
identical to Services directly below it. The composition is now typographic:
one rule across the full width that divides into two equal columns. Each door
is its title (which is the link) and one sentence. `FORK-SUB` and both
`FORK-0n-CTA` slots were removed; see `CONTENT.md` §4.

## Overview
- **Target file:** `src/components/sections/buyer-fork.tsx`
- **Design reference:** none. Authored from `IA_CRITIQUE.md` §3.1 and `CONTENT.md` §4.
- **Interaction model:** static. Two stretched links, no expand/collapse, no tab switching.
- **Server/Client:** Server Component.

## DOM Structure

```
<section id="fork" className="py-band">
  <div>                                  max-w-page mx-auto px-md
    <h2>                                 FORK-H2
    <div>                                grid, 1 col -> 2 cols at md
      <article>  door 1                  relative, group
        <h3>
          <a>                            FORK-01-LABEL + IconArrowRight, ::after stretches over the door
        <p>                              FORK-01-BODY
      <article>  door 2
        <h3>
          <a>                            FORK-02-LABEL + IconArrowRight
        <p>                              FORK-02-BODY
```

## DESIGN SPECIFICATION

### Section
- Band: `py-band` (64 → 112px), the standard working-section band
- Surface: paper

### Header
- `h2`: `mb-xl text-h2 text-foreground` (Merriweather via the base `h2` rule; weight rides on the size token)
- **No subtext.** The headline and the two door titles already say what this section is. A sentence explaining that both routes reach the same firm described the layout, not the firm.
- Left-aligned on the same rail as the doors. Not centred.

### Doors grid
- `grid grid-cols-1 gap-y-xl md:grid-cols-2 md:gap-y-0`
- **Exactly two cells.** `IA_CRITIQUE.md`: "Two doors, not three. A third would turn the fork into a card row and undo the point of it."
- **Symmetrical on purpose.** The two buyers are peers. An asymmetric split would imply one of them is the primary audience.

### Door
- `<article>`: `group relative border-t border-foreground pt-lg`
- From `md`: first door `pr-xl`; second door `border-l border-l-border pl-xl`. The navy top rules join into one continuous rule and the light vertical divider meets it, so the pair draws the fork.
- No radius, no fill, no box.
- Title: `<h3>` `text-h3 text-foreground` wrapping the door's `<a>`. The heading stays reachable by heading navigation, and the link's accessible name is the door label alone.
- Link: `inline-flex items-center gap-xs`, with `IconArrowRight size="sm"` in `text-action-text` after the label. The crimson-deep arrow is what marks the title as a link at rest.
- Body: `mt-sm text-lead text-muted-foreground`. Lead size because this sentence is how a visitor recognises their own situation.

### Stretched link
- `after:absolute after:inset-0` on the `<a>` stretches its hit area over the whole door (the `<article>` is the positioning context).
- Do not wrap the door in an `<a>`, and do not add a separate CTA line or a `CtaButton`.

## States & Behaviors

### Hover (whole door)
- **State:** the title turns `text-action-text` (crimson-deep) and the arrow moves `translate-x-1`.
- The same hover idiom as the practice-line rows in Services and the footer links: a clickable title turns crimson-deep. One hover language across the page.
- **Transition:** colour 200ms; arrow `duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]`, transform only.
- Tailwind v4 `hover:` only applies on hover-capable pointers, so touch devices never get a stuck hover state.

### Focus-visible (mandatory)
- On the `<a>`: `focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-ring focus-visible:after:ring-offset-4 focus-visible:after:ring-offset-background`. The ring is drawn on the stretched `::after`, so it outlines the whole door.

### Active / Disabled
- No press transform. Both doors always route somewhere; neither is ever disabled.

### Reduced motion
- Collapses to instant via the global rule in `globals.css`.

## Assets
- Icons: `IconArrowRight` (`size="sm"`), one per door.
- Image slots: none, by design. This section should be resolved in one glance.

## COPY

| Slot | Text |
|---|---|
| `FORK-H2` | Two ways in |
| `FORK-01-LABEL` | Funding and growth |
| `FORK-01-BODY` | You need working capital, a lender who will say yes, or a plan for the next stage of the business. |
| `FORK-02-LABEL` | Risk and compliance |
| `FORK-02-BODY` | A board, a regulator, or a lender is asking questions about exposure, controls, and who signs off. |

`FORK-01` links `#services` (Growth is the first cluster, and Growth and Funding
together answer this door, per `CONTENT.md` §5.1). `FORK-02` links
`#services-protect`, which carries `scroll-mt-24` so the Risk heading lands
clear of the 72px sticky header.

## Responsive Behavior
- **Desktop (1440px / 1280px):** two columns; both bodies run to two lines.
- **Tablet (768px / 1024px):** two columns hold; bodies run to three lines.
- **Mobile (≤ 430px):** one column, doors in source order, each with its own navy top rule and `gap-y-xl` between them. No vertical divider.

## CONTRAST CHECK

| Pairing | Ratio | Source | Verdict |
|---|---|---|---|
| Navy H2 and door titles on paper | 17.07:1 | `BRAND.md` | Pass |
| Crimson-deep hovered title and arrow on paper | 6.16:1 | `BRAND.md` | Pass |
| Slate door body on paper | 5.74:1 | `globals.css` derived | Pass |
| Navy top rule | 17.07:1 | `BRAND.md` | Structural |
| `--border` vertical divider | decorative | `globals.css` | Exempt |
| Crimson focus ring on paper | 4.42:1 | `globals.css` derived | Pass |

## ANTI-SLOP CONSTRAINTS

- **No third door.** This section exists to split two buyers.
- **No cards.** No radius, fill, border box or shadow around a door. The rules carry the structure.
- **No subtext under the headline** and **no CTA line repeating the door title.**
- **No colour-coding the doors.** Both doors share one treatment; crimson-deep appears only on the link arrow and hover.
- **No icon-per-door illustration.** The link arrow is the only glyph.
- **No whole-door `<a>` and no nested button.** Stretched link only.
- **No drawn or animated rules on hover and no entrance animation.** The only motion is the arrow nudge.
