# BuyerFork Specification

Section 3 in the approved sequence, layout family **two-up, deliberately not
a three-card row**. This is the single highest-value structural decision in
`IA_CRITIQUE.md` (§3.1): two doors, labelled by need rather than by service
name, resolving the two-buyer problem (owner-operator raising capital vs.
finance/compliance lead answering a board) at the earliest point the page can
resolve it.

## Overview
- **Target file:** `src/components/sections/buyer-fork.tsx`
- **Design reference:** none. Authored from `IA_CRITIQUE.md` §3.1 and `CONTENT.md` §4.
- **Interaction model:** static — two linked cards, no expand/collapse, no tab switching between them
- **Server/Client:** Server Component.

## DOM Structure

```
<section id="fork" className="py-band">
  <div>                                  max-w-page mx-auto px-md
    <div>                                header, max-w-[38ch]
      <h2>                               FORK-H2
      <p>                                FORK-SUB
    <div>                                grid-cols-2, the two doors
      <a>  door 1                        FORK-01
        <p>                              FORK-01-LABEL
        <p>                              FORK-01-BODY
        <span>                           FORK-01-CTA, rendered as text+icon, not a nested CtaButton
      <a>  door 2                        FORK-02
        <p>                              FORK-02-LABEL
        <p>                              FORK-02-BODY
        <span>                           FORK-02-CTA
```

## DESIGN SPECIFICATION

### Section
- Band: `py-band` (64 → 112px), the standard working-section band
- Surface: paper

### Header
- `max-w-[38ch] mb-xl`
- `h2`: `text-h2 font-display font-normal text-foreground mb-sm`
- `p` (`FORK-SUB`): `text-lead text-muted-foreground`
- Not centred. Left-aligned against the same rail the doors below sit in, keeping the section reading as an argument rather than a poster header.

### Doors grid
- `grid grid-cols-1 md:grid-cols-2 gap-lg`
- **Exactly two cells.** `IA_CRITIQUE.md`: "Two doors, not three. A third would turn the fork into a card row and undo the point of it." Do not add a third "not sure yet" door here — that role belongs to the contact form's `FORM-INTEREST-OPTIONS` select, not to this section.

### Door (the whole card is the link — `<a>`, not a card with a button inside it)
- Container: `block rounded-xl border border-border bg-card p-xl flex flex-col gap-md h-full`
- Radius: `rounded-xl` (`--radius` × 1.4) — one step up from the button/input `rounded-lg`, marking this as a larger structural block rather than a control
- Label: `text-h3 font-display font-normal text-foreground`
- Body: `text-body text-muted-foreground flex-1` (`flex-1` so both doors' CTAs align on the same baseline even when the two body copy blocks run to different lengths)
- CTA row (bottom of the card): `flex items-center gap-2xs text-body font-sans font-medium text-action-text mt-md`, followed by `IconArrowRight size="sm"`
- **The CTA is inline text plus an arrow, not a nested `<CtaButton>`.** A button inside a link inside a section that already reads as a large click target is a redundant interactive element and confuses the accessibility tree (an `<a>` should not contain a `<button>`). The arrow supplies the same affordance a button would.

### Distinguishing the two doors without a colour-coding gimmick
- Both doors share one visual treatment — same border, same fill, same type scale. They are told apart by their copy alone, not by tinting one door crimson and the other cyan. `BRAND.md`'s colour law reserves crimson for action/current-state and cyan for structure; colouring an entire card by "which buyer" would invent a third job for one of those colours and is exactly the kind of generated-looking move the hard rules warn against.

## States & Behaviors

### Hover (whole card)
- **Trigger:** pointer anywhere over the door
- **State:** `hover:border-stroke-systems hover:bg-muted`. The border takes the cyan-deep systems colour — this is the fork's one accent touch, and it reads as structural (this is a doorway) rather than as an action colour, keeping crimson free for the CTA text beneath it.
- **Transition:** `transition-[border-color,background-color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]`

### Focus-visible (mandatory)
- `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background`, applied to the `<a>` itself since the whole card is the link

### Active
- `active:translate-y-px` on the card

### Disabled
- Not applicable — both doors always route somewhere; neither is ever conditionally unavailable.

## Per-State Content
N/A — two fixed doors, no conditional variants.

## Assets
- Icons: `IconArrowRight` (`size="sm"`) from `src/components/icons.tsx`, one per door
- Image slots: none. This section is copy-only by design — `IA_CRITIQUE.md` frames it as the fastest possible fork, and an illustration per door would slow the read of a section meant to be resolved in one glance.

## COPY

| Slot | Text |
|---|---|
| `FORK-H2` | Two ways in |
| `FORK-SUB` | Both routes reach the same firm. They start in different places. |
| `FORK-01-LABEL` | Funding and growth |
| `FORK-01-BODY` | You need working capital, a lender who will say yes, or a plan for the next stage of the business. |
| `FORK-01-CTA` | See funding and growth |
| `FORK-02-LABEL` | Risk and compliance |
| `FORK-02-BODY` | A board, a regulator, or a lender is asking questions about exposure, controls, and who signs off. |
| `FORK-02-CTA` | See risk and compliance |

`FORK-01` links `#services-growth` and `#services-fund` — practically, to the
Services section's opening cluster, since Growth and Fund together answer
this door (`CONTENT.md` §5.1: "Growth and Funding sit behind FORK-01").
Implement as a single anchor to `#services` with a data attribute the Services
section reads to open on the right cluster, rather than two separate anchors
on one door. `FORK-02` links `#services-protect`.

## Responsive Behavior
- **Desktop (1440px):** two columns, equal width, equal height via `items-stretch` on the grid
- **Tablet (768px):** two columns still fit at `md` (768px is exactly the `md` breakpoint) — verify the door body text does not force a height mismatch at this width specifically, since it is the narrowest two-column state
- **Mobile (390px):** stacks to one column, full width, doors in source order (Funding and growth above Risk and compliance, matching the header narrative order)
- **Breakpoint:** two-up starts at `md` (768px), not `lg` — this section can afford to split a breakpoint earlier than the header/services grid because two cards, unlike five nav items or four cluster tiles, still read cleanly at 768px

## CONTRAST CHECK

| Pairing | Ratio | Source | Verdict |
|---|---|---|---|
| Navy H2 on paper | 17.07:1 | `BRAND.md` | Pass |
| Slate subtext on paper | 5.74:1 | `globals.css` derived | Pass |
| Navy door label on `--card` | 17.87:1 | `globals.css` derived | Pass |
| Slate door body on `--card` | ~5.6:1 | `globals.css` derived | Pass |
| Crimson-deep CTA text on `--card` | 6.16:1 | `BRAND.md` | Pass |
| Cyan-deep hover border on `--card` | 3.92:1 | `globals.css` derived | Pass, clears the 3:1 UI-boundary floor |
| Crimson ring on paper (focus) | 4.42:1 | `globals.css` derived | Pass |

## ANTI-SLOP CONSTRAINTS

- **No third door.** Covered above; this is the section's entire reason for existing, restated as a hard constraint so a later edit does not quietly turn it into a three-card row.
- **No colour-coding one door crimson and the other cyan.** Covered under Design Specification. Both doors carry the same neutral card treatment.
- **No icon-per-door illustration.** A generic "handshake" or "shield" icon floated above each label is decorative filler; the arrow beside the CTA text is the only glyph this section needs.
- **No nested button inside the card link.** An `<a>` wrapping a `<button>` is invalid nesting and a screen-reader confusion; the CTA is styled text plus an icon, not a component.
- **No nested-card box-shadow.** Elevation here, as everywhere on the site, is a border and a fill-tint step, never a `box-shadow`.
