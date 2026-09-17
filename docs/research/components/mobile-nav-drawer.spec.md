# MobileNavDrawer Specification

Opened by the menu button in `site-header.spec.md`, below `lg`.

**Revised 2026-09-16, client-directed.** Previously a full-height navy panel
sliding in from the right, 360px wide, with the CTA pinned to the bottom of an
otherwise empty column. That read as an app drawer. It is now a sheet that
drops from the top edge in the header's own glass, sized to its content, so
opening the menu reads as the header extending downward.

## Overview
- **Target file:** `src/components/layout/mobile-nav-drawer.tsx` (name kept; it is still a drawer, from the top)
- **Interaction model:** modal dialog: focus trap, scroll lock, Escape and outside press close, focus returns to the menu button.
- **Server/Client:** Client Component on Base UI's Dialog (`@base-ui/react/dialog`). No hand-rolled trap or scroll lock.

## DOM Structure

```
<Dialog.Root>
  <Dialog.Portal>
    <Dialog.Backdrop />                                   scrim
    <Dialog.Popup id="mobile-nav-drawer" aria-label="Menu">  glass-navy glass-sheet band-navy, top sheet
      <div>                                               max-w-page mx-auto px-md
        <div>  h-header                                   repeats the bar
          <AagLogo variant="wordmark" />
          <Dialog.Close aria-label="Close menu">          same position as the menu button
        <nav aria-label="Primary">                        border-t
          <ul> divide-y, <li><a> x5                       NAV-01..05 from src/lib/navigation.ts
        <div>                                             border-t, CTA block
          <CtaButton variant="primary" className="w-full">  NAV-CTA
```

## DESIGN SPECIFICATION

### Scrim
- `fixed inset-0 z-50 bg-aag-ink/55`, fade 200ms. No blur on the scrim: one blurred layer at a time.

### Sheet
- `fixed inset-x-0 top-0 z-50 max-h-dvh overflow-y-auto border-b`
- Material: `glass-navy glass-sheet` (`globals.css` §7): navy at 95%, blur 16px, paper-9% bottom edge. Denser than the scrolled bar because it sits over a scrim and carries the whole menu.
- Height is content height (about 457px on a phone). No empty column.
- Enter: fade plus `slide-in-from-top-2` (8px), 200ms, `cubic-bezier(0.16,1,0.3,1)`. Exit mirrors it. Reduced motion collapses both.

### Top row
- `h-header`, same rail as the bar. Logo left, close button right at `-mr-xs`, the exact position of the menu button, so the glyph appears to change in place.

### Nav list
- A ruled list: `border-t` under the top row, `divide-y` between items, `border-t` above the CTA block. Five short rows, the same ruled language as the Services index, not a card stack.
- Row: `flex min-h-14 items-center text-lead font-medium text-foreground` (56px rows).
- Hover: 1px paper-50% underline, offset 8px. No fill.
- Current page: 2px crimson underline, matching the desktop bar's marker.
- Focus-visible: crimson-light ring.

### CTA
- Full-width primary `CtaButton`, `pt-lg`, bottom padding `max(--spacing-lg, safe-area-inset-bottom)`.

## States & Behaviors
- **Open:** focus to the close button (`initialFocus`), background scroll locked, sheet and scrim animate in.
- **Close:** close button, Escape, scrim press, or any nav or CTA link (`handleNavigate`). Focus returns to the menu button (`finalFocus`).
- **Focus trap:** close, five links, CTA.

## COPY
Same set as `site-header.spec.md`, from `src/lib/navigation.ts`. Dialog name: `Menu`. Close button: `Close menu`.

## Responsive Behavior
- Below `lg` only. Full width at every phone and tablet width; the rail inside keeps content aligned with the bar and the page.

## CONTRAST CHECK

| Pairing | Ratio | Verdict |
|---|---|---|
| Paper nav text on 95% navy glass | > 15:1 | Pass |
| Crimson current-page underline on navy | 3.86:1 | Pass as a graphic |
| Crimson-light focus ring on navy | 7.00:1 | Pass |
| White on crimson (CTA) | 4.74:1 | Pass at 16px+ |

## ANTI-SLOP CONSTRAINTS
- **No full-height side drawer** and no CTA pinned to the bottom of an empty column.
- **No row fills, pills or icons per item.** Five text rows.
- **No second blur layer** on the scrim.
- **No nested accordion.** Five flat links, matching the bar.
- **No auto-focus on a nav item.** Focus lands on Close, so an accidental Enter cannot navigate away.
- **No scroll-lock omission.**
