# ClosingCta Specification

Section 9 in the approved sequence, layout family **full-width band**. Uses
the same `CtaButton` label as the header and hero — `IA_CRITIQUE.md`'s
sequence rationale is explicit that duplicate CTA intent under different
wording is a taste-skill failure, so this is a restatement, not a new offer.

## Overview
- **Target file:** `src/components/sections/closing-cta.tsx`
- **Design reference:** none. Authored from `CONTENT.md` §10.
- **Interaction model:** static, one button
- **Server/Client:** Server Component.

## DOM Structure

```
<section id="cta" className="py-band-anchor">
  <div>                                  max-w-page mx-auto px-md
    <div>                                centred column, max-w-[42ch]
      <h2>                               CTA-H2
      <p>                                CTA-SUB
      <CtaButton variant="primary">      CTA-BTN
```

## DESIGN SPECIFICATION

### Section
- Band: `py-band-anchor` (96 → 168px) — the third and final anchor band, matching the hero and Proof. `HOMEPAGE_RHYTHM`'s budget of three anchors per page is now spent; no later section may claim one.
- Surface: paper. Not navy — Proof, immediately before it, already used the page's one mid-page navy band, and `BRAND.md`'s rule against navy as anything but punctuation means two navy anchor bands back to back would make navy read as a second ground state rather than an exception.

### Column
- `flex flex-col items-center text-center max-w-[42ch] mx-auto gap-md`
- The one other centred-text section on the page besides Proof's headline — legal here because, like Proof, this section is genuinely single-column with nothing to align against, not a layout choice made for variety's own sake

### Headline
- `text-h2 font-display font-normal text-foreground`

### Subtext
- `text-lead text-muted-foreground`

### Button
- `CtaButton variant="primary"`, sized as its own spec defines — no override here

## States & Behaviors

Inherits all interactive states from `cta-button.spec.md`. Nothing else in
this section is interactive.

## Per-State Content
N/A — static, always renders (no slot here is gated).

## Assets
None beyond what `CtaButton` itself specifies.

## COPY

| Slot | Text |
|---|---|
| `CTA-H2` | Start with a conversation about the numbers. |
| `CTA-SUB` | Tell us what is in front of you. We will say whether we are the right firm for it. |
| `CTA-BTN` | Book a consultation |

`CTA-BTN` links `#contact`, identical destination and label to `NAV-CTA` and
`HERO-CTA-1` — one conversion intent, stated three times across the page,
never reworded.

## Responsive Behavior
- **Desktop (1440px):** centred column, headline and subtext on one to two lines each
- **Tablet (768px):** unchanged, column narrows with the viewport
- **Mobile (390px):** unchanged, `max-w-[42ch]` already wraps comfortably within the mobile gutter
- **Breakpoint:** none — this section has no grid to collapse

## CONTRAST CHECK

| Pairing | Ratio | Source | Verdict |
|---|---|---|---|
| Navy H2 on paper | 17.07:1 | `BRAND.md` | Pass |
| Slate subtext on paper | 5.74:1 | `globals.css` derived | Pass |
| White on crimson (button label) | 4.74:1 | `BRAND.md` | Pass at 16px+ |

## ANTI-SLOP CONSTRAINTS

- **No second navy band.** Covered under Design Specification — this section stays paper specifically so Proof's navy band remains the page's one exception.
- **No reworded CTA ("Get in touch today", "Let's talk").** The label is `Book a consultation`, verbatim, matching the header and hero. A different label here for "variety" is the duplicate-intent failure this section exists to avoid.
- **No secondary button added "for balance."** One button. A two-button pair belongs to the hero, which has a primary and secondary intent to offer; this section restates one intent only.
- **No background pattern, texture, or decorative shape behind the centred column.** The band is a plain paper surface, consistent with every other paper section on the page.
