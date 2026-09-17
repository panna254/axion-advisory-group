# SiteHeader Specification

**Revised 2026-09-16, client-directed: navy glass header.** The previous
version was a paper bar that switched to a solid navy band on scroll, and this
spec banned both `backdrop-blur` and any drop shadow. The client asked for a
restrained glass header. The two bans are recorded as overridden below, with
what they were protecting against and how this version answers it.

## Overview
- **Target file:** `src/components/layout/site-header.tsx`
- **Material:** `globals.css` §7, "HEADER GLASS" (`.glass-navy`, `.site-header`). The component only sets data attributes; every tint, blur, edge, shadow and fallback value lives there.
- **Interaction model:** scroll-driven material change plus a click-driven mobile menu (`mobile-nav-drawer.spec.md`).
- **Server/Client:** Client Component. Watches a sentinel and owns the menu's open state.

## DOM Structure

```
<a href="#main-content">Skip to content</a>   sr-only until focused
<div id="top-sentinel" aria-hidden />          header-height tall, absolute at document top, observed
<header data-overlay data-scrolled>            site-header glass-navy band-navy, sticky top-0 z-40 h-header
  <div>                                        rail, max-w-page mx-auto px-md, flex
    <a href="/"> <AagLogo variant="wordmark" />
    <nav aria-label="Primary">                 hidden below lg, ml-auto
      <ul> <li><a> x5                          NAV-01..05 from src/lib/navigation.ts
    <div>                                      ml-auto (lg: ml-md)
      <CtaButton variant="primary">            NAV-CTA, hidden below sm
      <button aria-haspopup="dialog">          menu button, hidden at lg and up
```

## DESIGN SPECIFICATION

### Material and states

The header is always navy glass. `BRAND.md` makes navy the header's colour; a
bar that swaps from paper to navy mid-scroll reads as two different objects.

| State | When | Tint | Blur | Edge | Shadow |
|---|---|---|---|---|---|
| top | `data-overlay="true"` and not scrolled (homepage, over the hero) | navy 38% | 10px | paper 6% | none |
| raised | scrolled, or any page without `overlay` | navy 92% | 16px | paper 9% | only once scrolled |

- No `saturate()`. It made crimson content passing under the bar bloom into a neon halo.
- Transitions: tint, edge, shadow and blur radius, 250ms, `cubic-bezier(0.16,1,0.3,1)`. Height never changes.
- Shadow (scrolled only): `0 18px 32px -28px` in ink at 80%. The negative spread keeps it a shade under the glass rather than a floating card.

### Overlay (homepage)
- `<SiteHeader overlay />` adds `-mb-header`, so the hero starts under the bar and the photograph shows through the glass.
- The hero adds `pt-header` and `+ var(--spacing-header)` to both min-heights, so the visible hero stays exactly 85vh / 92vh below the bar. See `hero.spec.md`.
- Other routes render `<SiteHeader />` in flow, raised from the start.

### Height
- `h-header` = `--spacing-header` = 72px, at every breakpoint and in every state. The token is shared with the hero's padding and the menu sheet's top row.

### Rail and composition
- `max-w-page mx-auto px-md`, the same rail as every section, so the logo aligns with the hero headline and section headings.
- Logo left; nav and CTA grouped right (`ml-auto` on the nav). The centre stays clear over the hero.
- Logo link is `flex items-center`; as an inline box its line box pushed the mark 5px above centre.

### Nav items (`lg` and up)
- `relative inline-flex h-11 items-center px-xs text-body font-medium`, `gap-md` between items.
- Rest: `text-foreground/80` (paper at 80%).
- Hover: full `text-foreground` plus a 1px paper-50% rule (`after:`) fading in, 200ms. No movement, no fill.
- Current page (`aria-current="page"`): full `text-foreground` plus a 2px crimson rule in the same position. Crimson marks the thing you are on.
- Focus-visible: crimson-light ring (`--ring` inside `.band-navy`), offset against navy.
- Active state is route-based only: hash anchors have no scroll-spy, so only Insights can be current (`isNavItemActive`).

### CTA
- Existing `CtaButton variant="primary"`, unchanged style. `hidden sm:inline-flex`.

### Menu button (below `lg`)
- `size-11`, `IconMenu size="md"`, `hover:bg-foreground/10`, `-mr-xs` so the glyph sits on the rail edge.
- `aria-label` Open menu / Close menu, `aria-expanded`, `aria-controls="mobile-nav-drawer"`, `aria-haspopup="dialog"`.

### Skip link
- First focusable element on every page. `sr-only` until focused, then a crimson button fixed top-left above the bar (`z-50`), targeting `#main-content`.

## States & Behaviors

### Scroll state
- IntersectionObserver on `#top-sentinel`, `threshold: 0`; `data-scrolled` flips when it leaves the viewport. Cleanup with `observer.disconnect()`.
- The sentinel is header-height tall (was 1px): the bar changes once the page has moved under it, and iOS overscroll bounce at the top cannot flicker it.
- `window.addEventListener("scroll")` remains banned.

### Fallbacks
- No `backdrop-filter` support: tint rises to 97% (raised) and 72% (top), so text never sits over sharp image detail.
- `prefers-reduced-transparency: reduce`: solid navy, no blur, in every state.
- `prefers-reduced-motion: reduce`: the global rule collapses all transitions.

### Layering
- Bar `z-40`. Menu backdrop and sheet `z-50`, portalled to the end of `body`. Cookie banner `z-50`, fixed to the bottom edge. Skip link `z-50` while focused. No other z-index values in the chrome.

## COPY

| Slot | Label | Href |
|---|---|---|
| `NAV-01` | Services | `/#services` |
| `NAV-02` | Approach | `/#approach` |
| `NAV-03` | About | `/#about` |
| `NAV-04` | Insights | `/insights` |
| `NAV-05` | Contact | `/#contact` |
| `NAV-CTA` | Book a consultation | `/#contact` |

Defined once in `src/lib/navigation.ts` and shared with the mobile menu. Skip link: `Skip to content`.

## Responsive Behavior
- **1440 / 1280 / 1024:** logo, five nav items, CTA on one line.
- **768:** logo, CTA, menu button.
- **430 / 390 / 375:** logo and menu button only. **Overrides the previous rule that the CTA stays visible at every width.** At phone width the full crimson CTA crowded the bar and sat directly above the identical hero CTA; it remains one tap away as the menu sheet's primary action.

## CONTRAST CHECK

| Pairing | Ratio | Verdict |
|---|---|---|
| Paper nav text at 80% over top-state glass, brightest point of hero sky | 7.1:1 (measured) | Pass |
| Cyan wordmark over top-state glass | 6.3:1 (measured) | Pass |
| Paper nav text over raised glass on paper | > 12:1 | Pass |
| Crimson current-page rule on navy | 3.86:1 | Pass as a graphic only |
| Crimson-light focus ring on navy | 7.00:1 | Pass |
| White on crimson (CTA) | 4.74:1 | Pass at 16px+ |

## ANTI-SLOP CONSTRAINTS

- ~~**No `backdrop-blur` glass bar.**~~ **OVERRIDDEN 2026-09-16, client-directed.** The concern was a frosted bar over a flat canvas with no fallback. Answered by: glass that is only light where there is an image behind it (the homepage hero), near-opaque navy everywhere else, and explicit fallbacks for no `backdrop-filter` and for `prefers-reduced-transparency`.
- ~~**No drop shadow, ever.**~~ **OVERRIDDEN 2026-09-16, client-directed**, for the scrolled bar only. One ink-tinted shadow with negative spread. Every other surface still uses hairline plus tint.
- **No floating pill.** The bar is full-bleed, square-edged, and attached to the top of the viewport.
- **No saturate boost, no gradient fill, no glowing or bright border.** The edge is paper at 6 to 9%.
- **No shrinking header and no logo that shrinks on scroll.** 72px in every state.
- **No pill backgrounds behind nav items and no hover movement.**
- **No hamburger-to-X morph inside the bar.** The menu sheet draws its own close button in the same position.
- **No second CTA, no mega-menu, no locale or status strip.**
- **No `window.addEventListener("scroll")`.**
