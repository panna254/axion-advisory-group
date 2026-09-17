# TestimonialCarousel Specification

The quote half of `proof-section.spec.md`. Holds the slide set, the controls
and all the behaviour; `testimonial-quote.spec.md` specifies what one slide
looks like.

Added 2026-09-16, client-directed. This section previously carried a single
static quote, and `proof-section.spec.md` carried an explicit rule against a
carousel here. That rule is now overridden; the reasoning on both sides is
recorded under OVERRIDDEN RULES in that file rather than deleted.

## Overview
- **Target file:** `src/components/sections/testimonial-carousel.tsx`
- **Design reference:** none. Authored from the client's carousel brief against the existing Proof band.
- **Interaction model:** time-driven and click-driven, with keyboard and touch
- **Server/Client:** **Client Component.** The only one in this section. `ProofSection` and the slide itself stay server-rendered.

## DOM Structure

```
<div>                          role=group, aria-roledescription=carousel, aria-label
  <div>                        the track: `grid`, aria-live, touch-action: pan-y
    <div> x N                  role=group, aria-roledescription=slide,
                               aria-label="Testimonial n of m", col-start-1 row-start-1
      <TestimonialQuote />
  <div>                        controls row, only when N > 1
    <div>                      pagination: N <button>, aria-current on the active one
    <div>                      <button> Previous, <button> Next
```

## DESIGN SPECIFICATION

### The track
- `grid`, with every slide in `col-start-1 row-start-1` so all slides occupy one cell
- **This is the layout-stability mechanism and it is the main reason the component is built this way.** The track is always as tall as the longest quote, so advancing a slide never changes the section's height. Rendering only the active slide reflows the page on every advance, and the defect scales with how much the quote lengths differ. The cost is six short strings in the DOM instead of one.
- Inactive slides: `opacity-0 pointer-events-none` plus `aria-hidden`. Invisible, unclickable, unreadable to assistive tech, still holding the box open. Nothing inside a slide is focusable, so no hidden slide can trap the keyboard.

### Controls row
- `mt-2xl flex flex-wrap items-center justify-between gap-lg` — pagination left, prev/next right. `flex-wrap` is what keeps the row from overflowing at 375px.
- Hidden entirely when there is only one renderable quote. One dot and two arrows around a single slide is chrome advertising a function that does not exist.

### Pagination
- Each indicator is a `<button>` with a 44px-tall hit area (`h-11`) wrapping a 2px rule, so the control reads as restrained without becoming a sub-target-size tap.
- Active: `w-8 bg-primary`. Inactive: `w-3 bg-muted-foreground/50`.
- **The active state is carried by WIDTH, not only by colour** (WCAG 1.4.1). `aria-current="true"` carries the same fact to assistive tech.
- Crimson is correct for the active indicator under `BRAND.md`'s colour law: "if it is crimson it is clickable or it is the thing you are on."

### Previous / Next
- `size-11 rounded-lg border border-stroke-systems`, hover `bg-secondary`, focus ring matching `cta-button.spec.md`
- **Cyan outline, not a crimson fill.** Crimson is reserved for the action the visitor came to take. Stepping through quotes is navigation chrome, and cyan is the systems colour.
- Never disabled: the carousel wraps in both directions.

## States & Behaviors

### Autoplay
- **Interval:** 7000ms. Longer than a typical 5s slider because each slide is two sentences of serif and the reader has to actually finish one.
- **Pauses on:** `mouseenter`, and `focusin` anywhere in the component (`onFocusCapture`). Resumes on `mouseleave` / `focusout`.
- **Does not run at all** when `prefers-reduced-motion: reduce`, when there is one slide, or while paused.
- **Resets on every change**, manual or automatic, because `activeIndex` is a dependency of the timer effect. Without that, clicking Next is followed by an automatic advance a fraction of a second later.

### Reduced motion
- Two separate mechanisms, because they solve two different problems. `globals.css` collapses the cross-fade to near-zero (the animation). `useReducedMotion` stops the timer (the content changing underneath the reader). CSS cannot do the second, which is why the hook exists.

### Keyboard
- `ArrowLeft` / `ArrowRight` on the component move one slide, with `preventDefault`.
- All controls are native `<button>`s, so Tab, Enter and Space work without help.

### Touch
- Pointer events, no dependency. A horizontal drag over `SWIPE_THRESHOLD_PX` (48) advances; `mouse` pointers are ignored so a text selection is not read as a swipe, and a drag whose vertical delta dominates is left alone so page scrolling still works. `touch-action: pan-y` keeps vertical scroll native.

### Screen-reader announcement
- The track is the live region. `aria-live="off"` while auto-rotating, `"polite"` once paused or manually controlled. Announcing an unrequested change every seven seconds is noise; announcing the result of a button the reader just pressed is the answer to their action.

### Gating
- Records failing `isRenderableTestimonial` (missing quote, name or role) are filtered out before anything renders, so the dot count and every "n of m" label describe what is actually present.
- Zero renderable quotes returns `null`, and `ProofSection` then falls back to its own gating.

## Responsive Behavior
- **Desktop / tablet:** quote capped at `max-w-[42ch]` inside the section's `max-w-[52rem]` column
- **Mobile:** the controls row wraps if it must; the quote reflows on `text-h3`'s existing clamp. No separate mobile component and no breakpoint of its own.
- Track height is set by the longest quote at the current width, so there is no layout jump at any viewport.

## CONTRAST CHECK

| Pairing | Ratio | Source | Verdict |
|---|---|---|---|
| Paper quote text on navy | 17.07:1 | `globals.css` derived | Pass |
| Muted blue-grey attribution on navy | 8.49:1 | `globals.css` derived | Pass |
| Cyan control outline on navy | 6.98:1 | `BRAND.md` contrast law | Pass (3:1 floor for UI) |
| Crimson active indicator on navy | 3.86:1 | `BRAND.md` contrast law | Pass as non-text UI (1.4.11); it carries no text |

## ANTI-SLOP CONSTRAINTS

- **No giant quotation glyph**, per `testimonial-quote.spec.md`.
- **No portraits, avatars, star ratings or client logos.** None exist; none are invented.
- **Cross-fade only.** No horizontal translate, no scale, no 3D flip, no parallax.
- **No oversized controls.** 44px is the touch-target floor, not a size target, and the indicator itself is a 2px rule.
- **No slide counter shouting "1 / 6"** in display type. The dots already say it and the labels say it to assistive tech.
- **No dependency** for swipe, autoplay or animation. Pointer events, `setInterval` and one CSS transition.
