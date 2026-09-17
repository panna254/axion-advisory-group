# About Specification

Section 6 in the approved sequence, layout family **text-led with single
portrait**. `IA_CRITIQUE.md` calls this "the highest-value non-service
section on the page" but places it after the offer and the method: the buyer
arrives with a problem, not curiosity about the firm, so Services and
Approach precede it.

## Overview
- **Target file:** `src/components/sections/about.tsx`
- **Design reference:** none. Authored from `IA_CRITIQUE.md`'s About discussion and `CONTENT.md` §7.
- **Interaction model:** static, aside from one text link at the end
- **Server/Client:** Server Component.

## DOM Structure

```
<section id="about" className="py-band">
  <div>                                  max-w-page mx-auto px-md
    <div>                                grid, asymmetric split (mirrors hero, reversed)
      <div>                              visual column, ~38%
        <div>                            portrait placeholder, aspect 4:5
      <div>                              content column, ~62%
        <h2>                             ABOUT-H2
        <p>                              ABOUT-LEAD
        <p>                              ABOUT-BODY-1, gated
        <p>                              ABOUT-BODY-2, gated
        <a>                              ABOUT-CTA
```

## DESIGN SPECIFICATION

### Section
- Band: `py-band` (64 → 112px)
- Surface: paper

### Grid
- `grid grid-cols-1 lg:grid-cols-12 gap-2xl items-start`
- Visual column: `lg:col-span-4`, **on the left** — this is the hero's split mirrored, not repeated, so the two asymmetric-split sections on the page do not read as the same layout family twice (the taste skill's no-repeated-family rule, and `IA_CRITIQUE.md`'s own per-section layout-family list, both require this)
- Content column: `lg:col-span-8`

### Visual column
- `relative overflow-hidden rounded-xl bg-muted`, `aspect-[3/2]` while stacked, `lg:aspect-[4/5]` beside the content column.
- **Image (2026-09-17):** `public/images/about.jpg`, client-supplied, 6016 x 4000 landscape, the hero's view of Nairobi at night. Passed as the `image` prop from `ABOUT_IMAGE` in `src/lib/site-content.ts`; alt text is `ABOUT-IMG-ALT`. This replaces the earlier intent of a portrait of a named individual, at the client's direction.
  - `next/image` with `fill` and `object-cover`. Lazy (the default): the section is below the fold, so no `preload`.
  - `lg:object-[62%_50%]`: the 4:5 crop keeps the middle 53% of the photograph's width, and 62% sets it on the lit towers.
  - `sizes="(min-width: 1024px) 680px, 100vw"`. At lg the frame is at most 362 x 452px, but `object-cover` scales the 3:2 photograph to the frame's height, so it renders 452 x 1.5 = 678px wide. Sizing to the frame width (362px) made the browser fetch a 640px file and upscale it. Stacked, the 3:2 frame matches the photograph, so it renders at frame width.
  - Why 3:2 when stacked: in a full-width 4:5 frame the photograph was 720 x 899px at 768px, mostly night sky, before the heading. At 3:2 it shows whole at 720 x 480px.
- **Placeholder:** when `image` is omitted, the frame shows the low-opacity mark on flat `bg-muted`, per `hero.spec.md`'s placeholder rule. No stock substitute.

### Content column
- `h2`: `text-h2 font-display font-normal text-foreground mb-md`
- `ABOUT-LEAD`: `text-lead text-foreground max-w-[52ch] mb-lg` — set in `text-foreground`, not muted, since this is the section's thesis statement and should read with the same weight as body copy elsewhere, not as a subdued subtitle
- `ABOUT-BODY-1` / `ABOUT-BODY-2`: `text-body text-muted-foreground max-w-[65ch] mb-md` each, using `--container-prose` (65ch) as the measure — this is the longest-form prose block on the page, so it is the one place the token exists specifically for
- `ABOUT-CTA`: `text-body font-sans font-medium text-action-text hover:underline underline-offset-4 inline-flex items-center gap-2xs mt-sm`, `IconArrowRight size="sm"` trailing

## States & Behaviors

### Gated body paragraphs
- **Trigger:** `CONTENT.md` §7 status for `ABOUT-BODY-1` (founding story) and `ABOUT-BODY-2` (team size, qualifications, professional bodies) — both `NEEDS-CLIENT-INPUT`
- **State:** each paragraph renders independently; if one clears client review before the other, it ships alone. If neither has cleared, the content column ends at `ABOUT-LEAD` plus `ABOUT-CTA` — the section still reads as complete with only the thesis statement and the link, since `ABOUT-LEAD` alone states what the firm does and who it serves.
- No bracketed placeholder ships in either paragraph's place; an absent paragraph is simply not rendered, per the site-wide gating rule.

### Link hover / focus-visible / active (`ABOUT-CTA`)
- Hover: `hover:underline` (already default via the class, transition on `text-decoration-thickness` not needed here since the link starts undecorated and gains the underline, rather than thickening an existing one)
- Focus-visible: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:rounded-sm`
- Active: `active:translate-y-px`

## Per-State Content
Covered above.

## Assets
- Icons: `IconArrowRight` (`size="sm"`), one instance, on `ABOUT-CTA`
- Image slots: one, visual column. Filled by `public/images/about.jpg` (see Visual column); 3:2 stacked, 4:5 at lg.

## COPY

| Slot | Status | Text |
|---|---|---|
| `ABOUT-H2` | DRAFT | Who we are |
| `ABOUT-LEAD` | DRAFT | Axion Advisory Group advises businesses across Kenya on the decisions that move a balance sheet. Strategy, finance, people, and risk sit in one practice. |
| `ABOUT-BODY-1` | NEEDS-CLIENT-INPUT | `[CLIENT TO SUPPLY: founding story. Year established, who founded the firm, why.]` |
| `ABOUT-BODY-2` | NEEDS-CLIENT-INPUT | `[CLIENT TO SUPPLY: team size, qualifications held, professional bodies the firm or its advisers belong to.]` |
| `ABOUT-CTA` | DRAFT | Read about the firm |

`ABOUT-CTA` links to a future `/about` route if one exists, or stays an
in-page anchor if About is never split to its own page — this decision is
outside this spec's scope and belongs to routing, not to this component; both
render identically.

## Responsive Behavior
- **Desktop (1440px):** 4/8 split, image left at 4:5 (361 x 452px), content right
- **Tablet (768px):** columns stack, image **above** content at 3:2 (720 x 480px)
- **Mobile (390px):** same stacked order, image at 343 x 229px
- **Breakpoint:** `lg` (1024px)

## CONTRAST CHECK

| Pairing | Ratio | Source | Verdict |
|---|---|---|---|
| Navy H2 on paper | 17.07:1 | `BRAND.md` | Pass |
| Navy lead paragraph on paper | 17.07:1 | `BRAND.md` | Pass |
| Slate body paragraphs on paper | 5.74:1 | `globals.css` derived | Pass |
| Crimson-deep CTA text on paper | 6.16:1 | `BRAND.md` | Pass |
| Crimson ring on paper (focus) | 4.42:1 | `globals.css` derived | Pass |

## ANTI-SLOP CONSTRAINTS

- **No stock "diverse team in a modern office" photograph.** Per the zero-asset rule in `AGENTS.md`, and per this section's own framing as a biography, not a lifestyle shot. Placeholder until real photography.
- **No fabricated founding year, founder name, or credential to fill the gated paragraphs.** They render absent rather than invented, per `CONTENT.md`'s content rules.
- **No repeat of the hero's exact split direction.** Covered under Design Specification — the visual column sits left here, right in the hero.
- **No pull-quote or "founder's message in italics" treatment invented to fill space** while the body paragraphs are gated. `ABOUT-LEAD` alone is allowed to be the whole section; it is not padded with an unsourced quote to look less sparse.
