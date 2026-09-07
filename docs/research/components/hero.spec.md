# Hero Specification

Section 2 in the approved sequence, layout family **asymmetric split**.
Rejects the reference's three-slide carousel per `IA_CRITIQUE.md` item 2: one
firm, one proposition, one `<h1>`.

## Overview
- **Target file:** `src/components/sections/hero.tsx`
- **Design reference:** none. Authored from `BRAND.md` and `CONTENT.md` §3.
- **Interaction model:** static. No carousel, no auto-advance, no client state at all.
- **Server/Client:** Server Component.

## DOM Structure

```
<section id="hero" className="py-band-anchor">
  <div>                                  max-w-page mx-auto px-md
    <div>                                grid, asymmetric split
      <div>                              content column, ~58%
        <p>                              HERO-EYEBROW
        <h1>                             HERO-H1
        <p>                              HERO-SUB
        <div>                            CTA row
          <CtaButton variant="primary">    HERO-CTA-1
          <CtaButton variant="secondary">  HERO-CTA-2
      <div>                              visual column, ~42%
        <div>                            portrait/graphic placeholder, aspect 4:5
```

## DESIGN SPECIFICATION

### Section
- Band: `py-band-anchor` (96 → 168px). This is one of the page's three anchor bands, per `HOMEPAGE_RHYTHM`'s budget — the other two are the closing CTA and the single mid-page navy band.
- Surface: paper. The hero does not use `.band-navy`; navy is reserved for the single mid-page band per `BRAND.md`'s "dark bands are punctuation, not the ground state."

### Grid
- `grid grid-cols-1 lg:grid-cols-12 gap-2xl items-center`
- Content column: `lg:col-span-7`
- Visual column: `lg:col-span-5`
- This is the asymmetric split named in `IA_CRITIQUE.md`'s layout-family list for this section — a 58/42 division, not a 50/50 mirror, so the hero reads as content-led rather than as a poster.

### Eyebrow
- `text-caption font-sans font-medium uppercase tracking-wide text-muted-foreground`
- A single line, `mb-sm`

### H1
- `text-h1 font-display font-normal text-foreground mb-md`
- **Font weight is 400, not 600.** `layout.tsx`'s comment is explicit: filling in a Didone's hairlines at 600 destroys the stroke contrast that is the entire reason Bodoni Moda was chosen. Weight 600 is reserved for the small letterspaced lockup.
- Max width: `max-w-[16ch]` at `lg` and up only (removed below `lg`, where the column is already full-bleed) — `HERO-H1` is capped at 55 characters / two lines in `CONTENT.md`, and an unconstrained measure at desktop would let it run to one long line instead of the intended two.

### Subtext
- `text-lead text-muted-foreground max-w-[42ch] mb-lg`
- `CONTENT.md` caps this at 20 words / 4 lines; `max-w-[42ch]` at `text-lead` keeps it inside that at every breakpoint above mobile, where the column width itself becomes the constraint.

### CTA row
- `flex flex-col sm:flex-row gap-sm`
- Below `sm`: both buttons `w-full`, primary first (top), secondary second
- `sm` and up: intrinsic width, primary first (left)

### Visual column
- `aspect-[4/5] rounded-xl bg-muted overflow-hidden relative`
- This is a **placeholder slot**, not a downloaded asset — see ANTI-SLOP CONSTRAINTS on the zero-asset rule. Until real photography exists, it renders a flat `bg-muted` field with the `AagLogo` mark (shields only, no wordmark) centred at low opacity (`opacity-15`) as a compositional placeholder, never stock photography and never a gradient mesh standing in for a real image.
- Radius: `rounded-xl` (`--radius` × 1.4), the one place on the page a larger radius than the button/card `rounded-lg` is used, marking this as an image frame rather than a UI control.

## States & Behaviors

This section has no interactive states of its own beyond the two CTAs, which
inherit hover, focus-visible, active, and disabled entirely from
`cta-button.spec.md`. Nothing here needs restating.

## Per-State Content
N/A — a single static state.

## Assets
- `AagLogo`, mark-only variant, for the placeholder visual (see above)
- Image slots: one, 4:5 aspect ratio, visual column, no crop guidance needed until a real asset exists
- Icons: none directly; the CTAs may carry their own per `cta-button.spec.md`

## COPY

| Slot | Text |
|---|---|
| `HERO-EYEBROW` | Nairobi, Kenya |
| `HERO-H1` | We advise Kenyan firms on strategy, finance, and risk. |
| `HERO-SUB` | Seven practice lines, from business consultancy to market entry. Work starts with reading your accounts. |
| `HERO-CTA-1` (primary) | Book a consultation |
| `HERO-CTA-2` (secondary) | See how we work |

`HERO-CTA-2` links to `#approach` (the "How we work" section), not `#services`
— the buyer fork immediately below the hero already routes to Services, so a
second CTA pointing there would duplicate that path. `HERO-CTA-1` links
`#contact`, matching `NAV-CTA` and `CTA-BTN` — one label, one destination,
three places it appears.

## Responsive Behavior
- **Desktop (1440px):** 58/42 split, side by side, content vertically centred against the visual
- **Tablet (768px):** columns stack, visual column moves **below** the content column (order is not reversed — the proposition reads before the image on a device where both cannot be seen together)
- **Mobile (390px):** same stacked order; CTA row stacks vertically, both buttons full width
- **Breakpoint:** grid splits at `lg` (1024px)

## CONTRAST CHECK

| Pairing | Ratio | Source | Verdict |
|---|---|---|---|
| Slate eyebrow on paper | 5.74:1 | `globals.css` derived | Pass |
| Navy H1 on paper | 17.07:1 | `BRAND.md` | Pass |
| Slate subtext on paper | 5.74:1 | `globals.css` derived | Pass |
| White on crimson (primary CTA) | 4.74:1 | `BRAND.md` | Pass at 16px+ |
| Navy on paper (secondary CTA label) | 17.07:1 | `BRAND.md` | Pass |
| Cyan-deep border (secondary CTA outline) | 3.92:1 | `globals.css` derived | Pass |

## ANTI-SLOP CONSTRAINTS

- **No carousel, no auto-advancing slides, no second or third `<h1>`.** This is the specific failure `IA_CRITIQUE.md` item 2 names in the reference: three slides means the firm could not decide what it does.
- **No stock photography of generic handshakes, skylines, or laptop-and-coffee compositions.** Per the precedence rules in `AGENTS.md`, zero images are downloaded from the reference site, and nothing is substituted from a stock library either until the client supplies real photography. The placeholder is a flat, honestly-a-placeholder field, not a fake-real image.
- **No gradient mesh or blurred-blob background.** The paper canvas stays flat; texture is not manufactured to fill empty space.
- **No animated headline (letter-by-letter reveal, typewriter, word-swap loop).** `MOTION_INTENSITY` governs entrance motion for content that scrolls into view; a hero is on screen at load, and animating the one sentence the whole page rests on delays the read rather than enhancing it.
- **No trust-badge row wedged under the CTAs.** Every credibility slot in `CONTENT.md` §8 is gated and unresolved; a row of placeholder logos or star ratings here would be exactly the fabricated-credibility failure `AGENTS.md` prohibits.
