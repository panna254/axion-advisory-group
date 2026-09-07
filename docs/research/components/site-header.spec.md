# SiteHeader Specification

## Overview
- **Target file:** `src/components/layout/site-header.tsx`
- **Design reference:** none. Authored from `BRAND.md` and the chrome slot in the approved sequence, `IA_CRITIQUE.md` item 1.
- **Interaction model:** scroll-driven surface change, plus a click-driven mobile menu. The menu itself is specified separately in `mobile-nav-drawer.spec.md`; this file covers the bar only.
- **Server/Client:** Client Component (`"use client"`). It watches a sentinel and owns the drawer's open/closed boolean. Keep it a thin shell: `AagLogo`, the nav list, `CtaButton`, and the hamburger button that opens `MobileNavDrawer`.

**No new tokens.** The bar's height is `h-18`, which is Tailwind's default spacing scale at 18 × 0.25rem = 4.5rem = 72px — the same default-scale mechanism the existing specs already use for `min-h-11` and `min-h-32`. Nothing custom needed. Elevation on the scrolled state is a hairline plus the navy surface tint, per the house rule in `cta-button.spec.md`: **this system never uses a drop shadow for elevation.** A `box-shadow` under this header would be the first one on the site and would contradict every other spec.

## DOM Structure

```
<div id="top-sentinel" aria-hidden />   1px, absolute at document top, observed
<header>                                sticky top-0 z-40 h-18
  <div>                                 rail, max-w-page mx-auto px-md, h-full, flex
    <a href="/">  <AagLogo variant="mark-and-wordmark" />
    <nav>                               hidden below lg
      <ul> <li><a> x5                   NAV-01..05
    <CtaButton variant="primary">       NAV-CTA
    <button aria-haspopup="dialog">     hamburger, hidden at lg and up
      <IconMenu />
```

## DESIGN SPECIFICATION

### Header element
- Position: `sticky top-0 z-40`
- Height: `h-18` (72px, fixed at every breakpoint and in both surface states — nothing beneath it may reflow on scroll)
- Rail: inner `div` at `max-w-page mx-auto px-md h-full flex items-center justify-between gap-lg`
- Transition: `transition-[background-color,border-color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]` — colour only, matching the 200ms figure used everywhere else in the system. No property here benefits from the slower 300ms band-level transitions.

### Rest state (`data-scrolled="false"`)
- Background: `bg-background` (paper)
- Border: `border-b border-transparent`

### Scrolled state (`data-scrolled="true"`)
- Adds `band-navy` to the header element, which re-points every colour token in the subtree through the `@theme inline` mapping in `globals.css`. The logo, nav items, and CTA need no `data-scrolled` variant of their own; they already resolve correctly inside `.band-navy`.
- Background: `bg-background` (now navy, via the token re-point)
- Border: `border-b border-border` (the navy-band hairline, `oklch(0.33 0.08 270.6)`, decorative and exempt from the 3:1 floor)
- **No shadow, at rest or scrolled.** The hairline is the only edge this component draws.

### Nav list (`lg` and up)
- Layout: `hidden lg:flex items-center gap-lg` (24 → 28px between items)
- Item type: `text-body font-sans font-medium`
- Item colour: `text-foreground` (navy on paper 17.07:1; paper on navy 17.07:1 once scrolled)
- Item hit area: `px-2xs py-xs rounded-sm`, sized so the clickable region is 44px tall inside the 72px bar
- Current-page marker: `relative after:absolute after:inset-x-2xs after:-bottom-px after:h-0.5 after:bg-primary`, rendered only when the item matches the route, paired with `aria-current="page"`. Crimson, because crimson marks the thing you are on — never cyan; cyan on this site never signals state.

### Hamburger (below `lg`)
- `lg:hidden inline-flex items-center justify-center size-11 rounded-lg` (44px square touch target)
- Glyph: `IconMenu` at `size="md"` (24px), `text-foreground`
- `aria-label="Open menu"` (flips to `"Close menu"` when the drawer is open — same button drives both), `aria-expanded`, `aria-controls="mobile-nav-drawer"`, `aria-haspopup="dialog"`

## States & Behaviors

### Scroll-triggered surface change
- **Trigger:** `IntersectionObserver` on `#top-sentinel`, a 1px element at the top of the document, `threshold: 0`. When the sentinel leaves the viewport, `data-scrolled` flips to `true`.
- **`window.addEventListener("scroll")` is banned** — it fires every frame, which the taste skill prohibits outright. The observer is the only mechanism.
- **Cleanup:** `observer.disconnect()` in the effect's return function. Missing this is a build failure, not a style nit.

### Nav item hover
- **Trigger:** pointer over the anchor
- **State:** `hover:text-action-text` (crimson-deep on paper, crimson-light once scrolled). Colour only — no underline, no movement, so it reads as related to but distinct from the current-page marker.
- **Transition:** 200ms

### Nav item focus-visible (mandatory)
- `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background`
- Applies to all five nav anchors, the logo anchor, the CTA (inherits from `cta-button.spec.md`), and the hamburger.

### Nav item active
- `active:translate-y-px`

### Hamburger, open/closed
- **Trigger:** click
- **State:** toggles `MobileNavDrawer`'s open boolean; icon does not swap to a close glyph inside the bar itself, since the drawer draws its own close control per `mobile-nav-drawer.spec.md`
- **Focus-visible, active, disabled:** as above; the hamburger has no disabled state

## Per-State Content
N/A — the same five items and one CTA render in both surface states, and the drawer (below `lg`) carries the same set again.

## Assets
- `AagLogo` from `src/components/brand/AagLogo.tsx`, `variant="mark-and-wordmark"`
- Icons: `IconMenu` (`size="md"`) from `src/components/icons.tsx`
- Image slots: none

## COPY

| Slot | Label | Href |
|---|---|---|
| `NAV-01` | Services | `#services` |
| `NAV-02` | Approach | `#approach` |
| `NAV-03` | About | `#about` |
| `NAV-04` | Insights | `/insights` |
| `NAV-05` | Contact | `#contact` |
| `NAV-CTA` | Book a consultation | `#contact` |

Order is page order, per `src/types/navigation.ts`. `NAV-04` carries `dropPriority: 1` — it is the first item to drop if a sixth is ever added, since Insights has no content until `EMPTY-INSIGHTS` is retired. Hamburger accessible name: `Open menu` / `Close menu`.

## Responsive Behavior
- **Desktop (1440px):** logo left; five nav items and the CTA right; one line, 72px tall
- **Tablet (768px):** nav list hidden, hamburger visible, **CTA stays visible** beside it — the one conversion surface guaranteed to be on screen at every scroll position is the entire reason this header exists, per `IA_CRITIQUE.md` item 1
- **Mobile (390px):** same as tablet; row reads logo, CTA, hamburger with `gap-xs`. The CTA label does not shorten or lose its icon slot.
- **Breakpoint:** nav collapses at `lg` (1024px), one switch, no intermediate state

## CONTRAST CHECK

| Pairing | Ratio | Source | Verdict |
|---|---|---|---|
| Navy nav item on paper (rest) | 17.07:1 | `BRAND.md` | Pass |
| Paper nav item on navy (scrolled) | 17.07:1 | `globals.css` derived | Pass |
| Crimson-deep hover on paper | 6.16:1 | `BRAND.md` | Pass |
| Crimson-light hover on navy | 7.00:1 | `BRAND.md` | Pass |
| Crimson current-page rule on paper | 4.43:1 | `BRAND.md` | Pass as a graphic (3:1 floor); **never rendered as text** |
| Crimson current-page rule on navy | 3.86:1 | `BRAND.md` | Pass as a graphic only. Text at this pairing is forbidden below 24px. |
| White on crimson (CTA label) | 4.74:1 | `BRAND.md` | Pass at 16px+, enforced by `text-body` |
| `--border` hairline on navy | decorative | `globals.css` | Exempt from the 3:1 floor |

## ANTI-SLOP CONSTRAINTS

- **No shrinking header.** A bar that changes height on scroll reflows the whole page under it and is one of the most overused scroll tricks available. Height is fixed at 72px in both states; only the surface tint and the border change.
- **No drop shadow, ever.** This system's elevation language is a hairline plus a tint step, established in `cta-button.spec.md`. A shadow here would be the first exception on the site.
- **No `backdrop-blur` glass bar.** Frosted glass over a flat-colour canvas reads as a template default and breaks under `prefers-reduced-transparency` with no fallback typically written for it.
- **No logo that shrinks on scroll.**
- **No decorative status dot, locale switcher, or time/weather strip** in the bar. One office, one time zone; that information belongs in the footer and the contact section, not the chrome.
- **No mega-menu.** Five items, five destinations, no dropdowns.
- **No second CTA.** One conversion surface, one label, matching the hero and the closing band. A second, differently worded contact CTA in the same bar is a duplicate-intent failure the taste skill flags directly.
- **No `window.addEventListener("scroll")`.** IntersectionObserver on the sentinel, as specified above.
