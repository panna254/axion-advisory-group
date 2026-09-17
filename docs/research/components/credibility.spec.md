# Credibility Specification

Section 7 in the approved sequence, layout family **full-width figure row**.

Revised 2026-09-17 at the client's direction: the figures now span the full
rail on desktop, in bold, in the brand's data colour. This supersedes the
earlier start-aligned row and its reasoning below.
Every slot in this section is a verifiable claim per `CONTENT.md` §8 and is
currently `NEEDS-CLIENT-INPUT` in full. This spec exists so the section is
ready to render the moment the client supplies figures — it must not, on its
own, invent a placeholder look that then has to be redesigned when real
numbers arrive.

## Overview
- **Target file:** `src/components/sections/credibility.tsx`
- **Design reference:** none. Authored from `IA_CRITIQUE.md` §3.4 and §3.5, and `CONTENT.md` §8.
- **Interaction model:** static
- **Server/Client:** Server Component. Returns `null` entirely if every slot is still gated — see States & Behaviors.

## DOM Structure

```
<section id="credibility" className="py-band-tight">      only if not fully gated
  <div>                                  max-w-page mx-auto px-md
    <div>                                grid, one column per figure from md, dividers
      <div>  x1-3                        one per STAT-0n
        <p>                              STAT-0n-VALUE
        <p>                              STAT-0n-LABEL
    <div>                                CERT-LIST, own row below the figures
      <p>
```

## DESIGN SPECIFICATION

### Section
- Band: `py-band-tight` (40 → 64px) — **not** a standalone `standard` band. `CONTENT.md`'s section-order note and `globals.css`'s own definition of a tight band both point the same way here: this strip "belongs to the section above it and reads as part of it" (`globals.css`), and it directly follows About, a `standard` band, which is legal under the sequencing rule (a tight band may follow a standard band; it may not follow an *anchor* band). Rendered as visually continuous with About — no visible section break, no distinct background, so it reads as About's closing line rather than a new topic.
- Surface: paper (same as About, reinforcing the "belongs to the section above" relationship — this section never becomes a navy band)

### Figures row
- `grid grid-cols-1 divide-y divide-border`; from `md`, `divide-x divide-y-0` and one column per supplied figure (`md:grid-cols-1` / `-2` / `-3`). The row spans the full rail whatever the count, so there is never an empty column held open for a figure that has not been supplied.
- Each figure: `flex flex-col gap-2xs py-md first:pt-0 last:pb-0`; from `md`, `px-xl py-0 first:pl-0 last:pr-0`, so the outer figures sit on the rail edges and the hairlines fall between them.
  - Value: `text-h1 text-stroke-systems`, `data-numeric`. `text-h1` carries weight 700 from the type scale, so no separate bold class. Tabular figures come from `[data-numeric]` in `globals.css`.
  - Currency code: a value of the form `KES <figure>` renders the code in a `text-h3 font-semibold text-foreground` span, followed by a real space, so the number is what the eye lands on and a screen reader still reads "KES 4.8B+".
  - Label: `text-body text-muted-foreground`, sentence case, directly under the value. Not uppercase: small tracked caps were the least readable text in the strip.

### Colour
- Figures are cyan-deep because `BRAND.md` makes cyan the data colour. Plain cyan is forbidden as text on paper (2.45:1); cyan-deep measures 3.92:1, which passes as large text because every figure is at least 30px and weight 700.
- Navy carries the currency code and the rest of the strip.
- **No crimson.** `BRAND.md`: crimson means clickable, or the thing you are on. A crimson figure would read as a link, and crimson beside cyan in one component is the peer weighting reserved for the logo mark.

### Certifications line
- `mt-lg pt-md border-t border-border`
- `text-body text-muted-foreground`
- Rendered as prose (a sentence or a comma-joined list), not as a row of logo badges — `CONTENT.md`'s instruction is "exact legal names only," which is a text fact, not a mark the firm has supplied artwork for. Inventing a badge/seal graphic per certification would be fabricating a visual credential the client has not provided.

## States & Behaviors

### Full-section gating
- **Trigger:** build time. All four slots (`STAT-01` through `STAT-03`, `CERT-LIST`) are `NEEDS-CLIENT-INPUT` as of the current register.
- **State:** the component returns `null` — **the entire section is absent**, not rendered with bracketed placeholders. This is the specific instruction in `CONTENT.md` §8: "If the client cannot supply these, the section is cut from the design. It is not filled with rounded guesses," and `IA_CRITIQUE.md` §3.4's sequencing constraint that "the page must be persuasive with every proof section removed, and must accept them later without restructuring."
- **Consequence for `HOMEPAGE_RHYTHM` sequencing:** with this section absent, About's `standard` band is followed directly by Proof's `anchor` band. An anchor may follow any band, so the page's rhythm stays legal with Credibility cut — this is, in fact, the easiest gate in the sequence to satisfy, since removing a tight band never creates a same-band collision the way removing a standard or anchor band could.

### Partial gating
- **Trigger:** some but not all of `STAT-01`–`03` supplied, `CERT-LIST` still gated (or vice versa)
- **State:** render only what has cleared. Two stats and no certifications is a legal render (figures row with two children, certifications block omitted). One stat alone is also legal, though visually thin — this spec does not impose a minimum count, since the content rule already blocks anything not sourced; a thin-but-true section is correct, a padded-but-false one is not.

## Per-State Content
Covered above.

## Assets
None. No icon accompanies a stat figure — the number is the whole statement, per the plain-inline-row layout family `IA_CRITIQUE.md` names for this section (explicitly not cards, explicitly not the reference's buried-footer-strip treatment).

## COPY

| Slot | Status | Text |
|---|---|---|
| `STAT-01-VALUE` / `STAT-01-LABEL` | NEEDS-CLIENT-INPUT | `[CLIENT TO SUPPLY: years in operation]` / `[CLIENT TO SUPPLY: label]` |
| `STAT-02-VALUE` / `STAT-02-LABEL` | NEEDS-CLIENT-INPUT | `[CLIENT TO SUPPLY: clients advised]` / `[CLIENT TO SUPPLY: label]` |
| `STAT-03-VALUE` / `STAT-03-LABEL` | NEEDS-CLIENT-INPUT | `[CLIENT TO SUPPLY: value advised, in KES]` / `[CLIENT TO SUPPLY: label]` |
| `CERT-LIST` | NEEDS-CLIENT-INPUT | `[CLIENT TO SUPPLY: registrations, licences, professional memberships. Exact legal names only.]` |

**None of this copy ships.** It is quoted here only so a builder knows the
exact shape (a value plus a label, three of them, plus one certifications
line) to build against once real figures land. Until then this component
renders nothing.

## Responsive Behavior
- **Desktop (1440px):** three 404px columns across the full rail, figures at 40px, hairline dividers between columns.
- **Tablet (768px):** as desktop, figures at about 33px. "KES 4.8B+" fits its column on one line.
- **Mobile (390px):** figures stack, one per row, at 30px, with a hairline between each.
- **Breakpoint:** `md` (768px) for the switch from stacked to columns.

## CONTRAST CHECK

| Pairing | Ratio | Source | Verdict |
|---|---|---|---|
| Cyan-deep stat value on paper | 3.92:1 | `globals.css` derived | Pass, large text only: 30px+ at weight 700 at every viewport. Do not shrink the value below `text-h1` or drop its weight |
| Navy currency code on paper | 17.07:1 | `BRAND.md` | Pass |
| Slate stat label on paper | 5.74:1 | `globals.css` derived | Pass |
| `--border` dividers between figures | decorative | `globals.css` | Exempt |
| Slate certifications text on paper | 5.74:1 | `globals.css` derived | Pass |
| `--border` divider above certifications | decorative | `globals.css` | Exempt |

## ANTI-SLOP CONSTRAINTS

- **No placeholder numbers ("10+", "500+", "KES 1M+") standing in for real figures.** This is the single most direct route to a fabricated-credential failure `AGENTS.md` names explicitly. The section is absent, not approximated.
- **No logo-badge wall for certifications.** Text only, per Design Specification — a row of invented seal graphics would itself be a fabricated visual credential.
- **No crimson figures and no crimson-to-cyan treatment.** See Colour.
- **No card treatment.** `IA_CRITIQUE.md` is specific that this renders as a plain row, not cards, and not the reference's footer-buried strip either — it needs the prominence `IA_CRITIQUE.md` §3.5 calls for once content exists.
- **No counting-up animation on the figures.** A number that animates from 0 on scroll-into-view is exactly the kind of decorative motion `MOTION_INTENSITY 4` does not license for a plain data statement; the stats are read once and are not a dashboard.
