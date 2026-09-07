# MobileNavDrawer Specification

Opened by the hamburger in `site-header.spec.md`. Specified separately because
a dialog with a focus trap is a distinct interaction contract from the bar
that triggers it, and folding both into one file would blow the ~150-line
budget.

## Overview
- **Target file:** `src/components/layout/mobile-nav-drawer.tsx`
- **Design reference:** none. Authored from `BRAND.md`.
- **Interaction model:** modal dialog (traps focus, closes on Escape, closes on backdrop click, restores focus to the hamburger on close)
- **Server/Client:** Client Component. Built on the Radix Dialog primitive already vendored under `src/components/ui/` (shadcn's `Dialog`), not a hand-rolled implementation — focus trapping and `aria-modal` wiring are exactly what that primitive exists to get right.

## DOM Structure

```
<Dialog>
  <DialogPortal>
    <DialogOverlay />                        backdrop
    <DialogContent id="mobile-nav-drawer">   panel, slides from the right
      <div>                                  header row inside the panel
        <AagLogo variant="mark-and-wordmark" />
        <DialogClose>  <IconClose />         close button
      <nav>
        <ul> <li><a> x5                      same NAV-01..05 as the bar
      <CtaButton variant="primary" className="w-full">  NAV-CTA
```

## DESIGN SPECIFICATION

### Overlay
- `fixed inset-0 z-50 bg-aag-ink/60`
- The one deliberate departure from "no black": this is a scrim over the whole viewport, not a surface or a text pairing, so the 3:1 graphic floor and the no-pure-black-surface rule do not apply to it. `--aag-ink` at 60% keeps the tint navy rather than neutral black.
- Transition: `data-[state=open]:animate-in data-[state=open]:fade-in data-[state=closed]:animate-out data-[state=closed]:fade-out duration-200`

### Panel
- `fixed inset-y-0 right-0 z-50 h-full w-full max-w-[22.5rem] bg-background band-navy flex flex-col gap-2xl p-lg`
- Panel renders as a navy band (`.band-navy`), matching the scrolled header it was opened from and giving the full-screen mobile menu the same authority-colour treatment the desktop bar takes on scroll.
- Slide-in: `data-[state=open]:animate-in data-[state=open]:slide-in-from-right data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]`
- Width caps at 360px even on a wider phone in landscape, so the panel never reads as a full page replacing the site rather than a menu over it.

### Header row (inside panel)
- `flex items-center justify-between`
- Logo: `AagLogo variant="mark-and-wordmark"`, resolves through `.band-navy` tokens automatically
- Close button: `inline-flex items-center justify-center size-11 rounded-lg`, glyph `IconClose` `size="md"` `text-foreground`

### Nav list
- `flex flex-col gap-xs`, each item `flex items-center h-11 px-xs rounded-lg text-lead font-sans font-medium text-foreground`
- Deliberately larger than the desktop nav (`text-lead`, not `text-body`): five stacked links in a full-height panel are the dominant content, and full-height touch rows read better at the next size step up.
- Current-page marker: `bg-secondary` fill behind the active row rather than the desktop underline — a fill reads correctly at this scale where an underline would look like stray punctuation. `--secondary` inside `.band-navy` is the lifted navy-700 tint, so this stays a tint step, not a shadow or a new colour.

### CTA
- `CtaButton variant="primary" className="w-full"`, placed at the bottom of the panel, pinned there with `mt-auto` so it holds position regardless of how many nav items render.

## States & Behaviors

### Open
- **Trigger:** hamburger click in `site-header.spec.md`
- **State:** overlay fades in, panel slides in from the right, focus moves to the panel's first focusable element (the close button), `aria-modal="true"`, background scroll is locked (Radix Dialog's default `body` scroll lock)
- Reduced motion: both animations collapse to the global `0.01ms` rule in `globals.css`; the panel simply appears.

### Close
- **Triggers, all equivalent:** close-button click, Escape key, backdrop click, or clicking a nav item (a navigation is an implicit close)
- **State:** reverse of open; focus returns to the hamburger button that opened the drawer, per Radix Dialog's default focus-return behaviour. **This must not be disabled** — losing the return-focus point is a keyboard trap.

### Focus trap
- **Trigger:** while open, `Tab` and `Shift+Tab` cycle only through the panel's focusable elements: close button, five nav links, CTA
- Radix Dialog provides this. Do not add a second, hand-rolled trap on top of it.

### Nav item hover / focus-visible / active
- Hover: `hover:bg-secondary/60` (a lighter step than the current-page fill, so hover and "current" stay visually distinct)
- Focus-visible: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background` — `--ring` inside `.band-navy` is crimson-light at 7.00:1, so the ring stays legible on the navy panel
- Active: `active:translate-y-px`

### Close-button hover / focus-visible / active
- Same pattern as above, applied to the `size-11` hit area rather than a full-width row

## Per-State Content
N/A — content is identical to the desktop nav.

## Assets
- `AagLogo` from `src/components/brand/AagLogo.tsx`
- Icons: `IconClose` (`size="md"`) from `src/components/icons.tsx`
- Image slots: none

## COPY

Identical set to `site-header.spec.md`: `NAV-01` through `NAV-05`, plus `NAV-CTA`. Close-button accessible name: `Close menu`.

## Responsive Behavior
- **Desktop (1440px) / Tablet, `lg` and up:** never rendered. The header's nav list is visible and the hamburger that triggers this component does not exist above `lg`.
- **Tablet (768px, below `lg`) and Mobile (390px):** full behaviour as specified, panel width capped at 360px
- **Breakpoint:** mirrors the header's `lg` collapse exactly. There is no state where both the desktop nav and this drawer can be triggered.

## CONTRAST CHECK

| Pairing | Ratio | Source | Verdict |
|---|---|---|---|
| Paper nav item on navy panel | 17.07:1 | `globals.css` derived | Pass |
| Paper nav item on `--secondary` current-page fill (navy-700) | 12.72:1 | `globals.css` derived | Pass |
| Crimson-light ring on navy (focus) | 7.00:1 | `BRAND.md` | Pass |
| White on crimson (CTA label) | 4.74:1 | `BRAND.md` | Pass at 16px+ |
| Ink scrim over page content behind it | decorative overlay | — | Exempt; no text renders on the scrim itself |

## ANTI-SLOP CONSTRAINTS

- **No hamburger-to-X icon morph animation inside the bar.** The close control lives inside the panel, specified once, rather than animating the trigger icon — one less motion effect competing for attention during the slide-in.
- **No full-bleed, edge-to-edge panel.** Capped at 360px so the menu reads as an overlay, not a page swap.
- **No nested accordion of sub-items.** Five flat links, matching the desktop bar exactly. This drawer does not grow a hierarchy the desktop nav does not have.
- **No auto-focus on a nav item.** Focus lands on the close button first, per Radix Dialog default and standard dialog-focus practice — landing on the first nav link would let an accidental Enter navigate away before the user has read anything.
- **No scroll-lock omission.** Background scroll must be locked while open; a drawer that lets the page scroll behind it is a common accessibility miss.
