# Hero Specification

Section 2 in the approved sequence, layout family **full-bleed cinematic**.
Rejects the reference's three-slide carousel per `IA_CRITIQUE.md` item 2: one
firm, one proposition, one `<h1>`.

> **2026-09-14 pivot.** This section was previously layout family **asymmetric
> split** — a 58/42 two-column division with the copy left and a framed 4:5
> image right. The client directed a full-bleed redesign: image edge to edge
> behind the content, 80–100vh, with a cinematic load-in. That reverses four
> decisions recorded in earlier versions of this file, listed under
> OVERRIDDEN RULES at the bottom. The carousel rejection and the one-`<h1>`
> rule are **not** among them and still bind.

## Overview
- **Target file:** `src/components/sections/hero.tsx`
- **Design reference:** none. Authored from `BRAND.md` and `CONTENT.md` §3.
- **Interaction model:** static. No carousel, no auto-advance, no client state at all. The entrance animation is CSS-only and runs once on load.
- **Server/Client:** Server Component.

## DOM Structure

```
<section id="hero">                      band-navy relative isolate flex pt-header
                                         min-h-[calc(85vh+var(--spacing-header))]
                                         lg:min-h-[calc(92vh+var(--spacing-header))]
                                         items-center overflow-hidden
  <div aria-hidden>                      background layer, -z-20
    <div>                                image / placeholder, hero-bg-in
    <p>                                  placeholder disclosure label
  <div aria-hidden>                      legibility overlay, -z-10
  <div>                                  max-w-page mx-auto px-md, z-10
    <div>                                content block, max-w-[700px]
      <p>                                HERO-EYEBROW
      <h1>                               HERO-H1
      <p>                                HERO-SUB
      <div>                              CTA row
        <CtaButton variant="primary">      HERO-CTA-1
        <CtaButton variant="secondary">    HERO-CTA-2
  <div aria-hidden>                      scroll cue, z-10
```

## DESIGN SPECIFICATION

### Section
- `band-navy bg-background relative isolate flex min-h-[calc(85vh+var(--spacing-header))] items-center overflow-hidden pt-header lg:min-h-[calc(92vh+var(--spacing-header))]`
- **Sits under the glass header (2026-09-16).** The homepage renders `<SiteHeader overlay />`, which pulls this section up beneath the bar so the photograph shows through the glass. `pt-header` and the added `--spacing-header` give that 72px strip back: the visible hero is still exactly 85vh / 92vh below the bar, and the content still centres in that visible area. See `site-header.spec.md`.
- **`band-navy` must be paired with `bg-background`.** The class only re-points colour custom properties; it never paints a surface (commit `c7302bb`). The background layer covers the section today, so omitting it would *look* fine and fail the moment that layer is swapped — paper text on a paper ground.
- Surface: navy band. `.band-navy` is applied to the section, which re-points `--foreground`, `--muted-foreground`, `--secondary` and `--stroke-systems` to their navy-safe values in one move — so the eyebrow, headline, subtext and both CTA variants inherit correct-on-dark colours with no per-element overrides. This is the mechanism `globals.css` §2b exists for; do not hand-roll `text-white/70`-style classes here.
- No `py-band-anchor`. Height is viewport-driven (85vh, 92vh at `lg`) rather than padding-driven, which is the point of the pivot. The section still counts against `HOMEPAGE_RHYTHM`'s anchor-band budget.
- `isolate` creates the stacking context the two background layers sit in, so their negative z-indices stay local to the hero and never slide under the page background.

### Background layer (`-z-20`)
- **Current state: placeholder.** A flat `bg-gradient-to-br from-aag-navy-700 via-aag-navy-800 to-aag-ink` field carrying a small "Photography pending" disclosure label, low-opacity, bottom-left.
- The label is deliberate, per `CONTENT.md`'s "a placeholder that ships is a bug" — this state must be unmistakable as unfinished. Remove the label in the same commit that adds the real photograph, not before.
- **When the photograph lands**, replace the placeholder div with `next/image`: `fill`, `priority` (above the fold), `alt=""` (decorative — it carries no information the copy does not), `sizes="100vw"`, `className="object-cover object-[75%_center] [animation:hero-bg-in_1.8s_cubic-bezier(0.22,1,0.36,1)_both]"`. The `75%` horizontal focal point pushes the subject right, clear of the left-anchored text column; re-check it against the actual image rather than assuming.

### Legibility overlay (`-z-10`)
- `bg-gradient-to-r from-aag-ink/80 via-aag-ink/55 to-aag-ink/15`
- Layered ramp, not a flat scrim, so the image stays visible on the right while the text zone stays dark enough to read.
- Built from `--aag-ink` (#060B1E), **not** `rgba(0,0,0,…)`. Pure black is not in the palette; the footer, the mid-page band and this overlay all key off the same brand dark so the page reads as one system.
- The content column occupies the strong (80%) end of the ramp by construction. If the content block is ever widened past ~700px or moved right, the ramp has to be re-tuned with it.

### Content block
- Outer: `max-w-page mx-auto px-md`, `relative z-10`. Inner: `max-w-[700px]`.
- Left-anchored and vertically centred at every breakpoint, via the section's `flex items-center`. Not centre-aligned text at any width — a left rag holds the editorial register the pivot asked for, and centred text under a multi-line headline reads as a template.

### Eyebrow
- `text-caption font-sans font-medium uppercase tracking-wide text-muted-foreground`, `mb-sm`

### H1
- `text-display font-display font-normal text-foreground text-balance mb-md`
- **Type step:** `display`, step 5 of the existing scale (39.81 → 75.79px). The hero claims that step's documented "one moment per page, at most" budget; nothing else on the site used it, and nothing else should now.
- **No bespoke step.** The pivot originally shipped a custom step 6 at 88px. It was removed on 2026-09-15 when the headline was reduced — the scale's own step 5 was both the size wanted and already defined, so maintaining a seventh step to sit 12px above it earned nothing. If the headline ever needs to grow again, the question to answer first is why `display` is not enough.
- **Font weight is 400, not 600.** Weight 600 is reserved for the small letterspaced lockup, which needs the extra weight at its much smaller size; the H1 runs at display size and doesn't.
- `text-balance` distributes the wrap rather than leaving a one-word orphan on the last line.
- No `max-w-[Nch]` cap. The 700px content block is the measure; a second constraint on top of it only adds lines.

### Subtext
- `text-lead text-muted-foreground max-w-[46ch] mb-lg`

### CTA row
- `flex flex-col sm:flex-row gap-sm`
- Below `sm`: both buttons `w-full`, primary first (top), secondary second
- `sm` and up: intrinsic width, primary first (left)
- Both must remain above the fold at 900px viewport height unscrolled. This is the constraint that bounds the H1's type step: if the headline is ever enlarged past `display`, re-check that these stay on screen at 900px before accepting it.

### Scroll cue
- Bottom-centred, `bottom-lg`, `aria-hidden`: an 8px hairline over `IconCaretDown`, at `text-white/60` / `bg-white/30`.
- Decorative only. It is not a control, carries no label, and is not in the tab order. If it ever needs to *do* something, it becomes a button and gets an accessible name.

## ENTRANCE MOTION

Keyframes live in `globals.css` §6. Easing is `cubic-bezier(0.22, 1, 0.36, 1)`
throughout except the overlay, which is a plain `ease-out` opacity fade.

| Element | Keyframe | Duration | Delay |
|---|---|---|---|
| Background | `hero-bg-in` (scale 1.08 → 1) | 1.8s | 0 |
| Overlay | `hero-overlay-in` (opacity) | 1.4s | 0 |
| Eyebrow | `hero-rise-in` (opacity + 1rem rise) | 0.7s | 0.5s |
| H1 | `hero-rise-in` | 0.8s | 0.65s |
| Subtext | `hero-rise-in` | 0.8s | 0.8s |
| CTA row | `hero-rise-in` | 0.8s | 0.95s |
| Scroll cue | `hero-rise-in` | 0.8s | 1.2s |

- All use `both` fill mode, so each element holds its pre-state until its delay elapses and its post-state after.
- **Runs once.** Nothing here loops, and nothing re-triggers on scroll.
- **Reduced motion** is handled globally in `globals.css` `@layer base`, which collapses every duration site-wide to 0.01ms. No per-element opt-out is needed here, and adding one would diverge from how the rest of the site does it.

## States & Behaviors

No interactive states beyond the two CTAs, which inherit hover, focus-visible,
active and disabled entirely from `cta-button.spec.md`.

## Per-State Content
N/A — a single static state.

## Assets
- Image slots: one, full-bleed. **Currently unfilled** — see Background layer.
- Icons: `IconCaretDown` for the scroll cue. The CTAs may carry their own per `cta-button.spec.md`.

## COPY

| Slot | Text |
|---|---|
| `HERO-EYEBROW` | Nairobi, Kenya |
| `HERO-H1` | We advise organisations on strategy, finance, and risk. |
| `HERO-SUB` | Seven practice lines, from business consultancy to market entry. Work starts with reading your accounts. |
| `HERO-CTA-1` (primary) | Book a consultation |
| `HERO-CTA-2` (secondary) | See how we work |

Copy is unchanged by the pivot. `HERO-H1` remains the registered sentence in
`CONTENT.md` §3 — the redesign brief's mockup assumed a 2–3 word tagline
("Strategic Insight. Sustainable Growth."), which is not this firm's
registered copy and was not adopted. Changing it is a `CONTENT.md` decision,
not a layout one.

`HERO-CTA-2` links to `#approach` (the "How we work" section), not `#services`
— the buyer fork immediately below the hero already routes to Services, so a
second CTA pointing there would duplicate that path. `HERO-CTA-1` links
`#contact`, matching `NAV-CTA` and `CTA-BTN` — one label, one destination,
three places it appears.

## Responsive Behavior
- **Desktop (1440px):** full-bleed, 92vh, content left-anchored in a 700px block, vertically centred. H1 sets at 75.79px.
- **Tablet (768px):** identical structure at 85vh. H1 scales down the clamp; content block is viewport-width-bound rather than 700px-bound.
- **Mobile (390px):** **still full-bleed.** The image stays behind the content — it does not revert to image-above/text-below. CTA row stacks vertically, both buttons full width, `min-h-11` keeps tap targets legal.
- **Breakpoint:** the only one is `lg` (1024px), and it changes height alone (85vh → 92vh). There is no layout fork.

## CONTRAST CHECK

All pairings are text over the overlay's strong end (80% ink over the
background layer), which is at least as dark as navy — so `BRAND.md`'s
measured on-navy ratios are the floor, not the estimate.

| Pairing | Ratio | Source | Verdict |
|---|---|---|---|
| Paper H1 on navy-or-darker | ≥17.07:1 | `BRAND.md` | Pass |
| Muted-foreground eyebrow / subtext on navy | ≥8.49:1 | `globals.css` §2b | Pass |
| White on crimson (primary CTA) | 4.74:1 | `BRAND.md` | Pass at 16px+ |
| Paper on navy (secondary CTA label) | 17.07:1 | `BRAND.md` | Pass |
| Cyan stroke (secondary CTA outline) on navy | 6.98:1 | `BRAND.md` | Pass |
| Scroll cue, white/60 on navy-or-darker | ~7:1 | derived | Pass — decorative regardless |

**Re-measure when the photograph lands.** These ratios hold against the flat
placeholder. A photograph with bright regions under the text column can break
them locally even with the overlay in place, and the fix is the overlay ramp
or the focal point, not lighter text.

## ANTI-SLOP CONSTRAINTS

- **No carousel, no auto-advancing slides, no second or third `<h1>`.** This is the specific failure `IA_CRITIQUE.md` item 2 names in the reference: three slides means the firm could not decide what it does. Unaffected by the pivot.
- **No stock photography of generic handshakes, skylines, or laptop-and-coffee compositions.** Per the precedence rules in `AGENTS.md`, zero images are downloaded from the reference site, and nothing is substituted from a stock library. This rule survived the pivot and is the reason the slot is still empty — see OVERRIDDEN RULES.
- **No trust-badge row wedged under the CTAs.** Every credibility slot in `CONTENT.md` §8 is gated and unresolved; a row of placeholder logos or star ratings here would be exactly the fabricated-credibility failure `AGENTS.md` prohibits.
- **The entrance runs once and only once.** No scroll-triggered replay, no looping ambient drift, no parallax that keeps moving after load. "Calm and intentional" was the brief; a hero that never settles is the opposite.
- **No headline word-swap, typewriter, or letter-by-letter reveal.** The pivot permits a whole-block fade-and-rise on the one headline. It does not permit animating the sentence a word or letter at a time — that still delays the read, which was the original objection.

## OVERRIDDEN RULES

Recorded so the reversals are traceable rather than silently lost.

1. **Layout family: asymmetric split → full-bleed cinematic.** `IA_CRITIQUE.md` item 124 named the split for this section. Client-directed change, 2026-09-14.
2. **Hero surface: paper → navy band.** Earlier versions of this file reserved `.band-navy` for the single mid-page band, per `BRAND.md`'s "dark bands are punctuation, not the ground state." The hero is now the page's opening dark surface. `BRAND.md` itself is unamended and still governs everywhere else; if the mid-page band now reads as redundant against a dark hero, that is a `HOMEPAGE_RHYTHM` question worth revisiting.
3. **No animated headline on load.** Previously banned outright. Now permitted as a single whole-block fade-and-rise, with the word/letter-level ban retained above.
4. **Placeholder-only visual slot.** The 2026-09-13 exception admitted a client-supplied abstract graphic into the old framed 4:5 slot. That asset is not in use in the full-bleed layout — see below.

**2026-09-13 decision (superseded).** The client supplied `hero-visuals.jpg`, a
cyan-on-black abstract line graphic, for the old framed 4:5 slot, overriding
the placeholder-only rule and `BRAND.md`'s "cyan is the systems colour" usage
law. That asset was subsequently replaced at the same path with a photograph
of a North American financial district carrying a visible third-party bank
mark. That photograph was **not** shipped: a visible competitor trademark and
a non-Kenyan skyline on a Nairobi firm's hero are a brand and legal exposure,
and it is also squarely the "stock skyline" the anti-slop rule names. The slot
is a disclosed placeholder pending photography the client has cleared. Neither
image is in the build.
