# TestimonialQuote Specification

One slide of `testimonial-carousel.spec.md`, which owns the slide set and all
the behaviour. This file specifies the typography of a single quote and
nothing else.

Renders one `Testimonial` record: category, quote, name, role and
organisation. The register carries six as of 2026-09-16 (`QUOTE-01` through
`QUOTE-06`), all `DRAFT` with `permissionOnFile: false`.

## Overview
- **Target file:** `src/components/sections/testimonial-quote.tsx`
- **Design reference:** none. Authored from `CONTENT.md` §9.
- **Interaction model:** static. All motion and state belong to the carousel.
- **Server/Client:** no client boundary of its own. It is rendered inside a Client Component so it travels in that bundle, but it stays a pure function of its props. Returns `null` if any required slot is missing.

## DOM Structure

```
<figure>
  <p>                                    category eyebrow, omitted if absent
  <blockquote>
    <p>                                  quote
  <figcaption>
    <p>                                  authorName
    <p>                                  authorRole, authorCompany
```

## DESIGN SPECIFICATION

### Container
- `<figure>` / `<blockquote>` / `<figcaption>` — semantic quotation markup, not
  three `<div>`s, since this is content correctly described by those elements
  and a screen reader announces a blockquote distinctly

### Category eyebrow
- `mb-md text-small font-body font-medium uppercase tracking-wide text-stroke-systems`
- Same eyebrow treatment as the rest of the site. Cyan, because it labels structure rather than asking for a click.
- A closed union (`TestimonialCategory`), not free text, so six quotes cannot arrive with six differently-worded labels.

### Quote text
- `max-w-[42ch] text-h3 font-heading text-foreground` — weight 500 comes from the `text-h3` token, not from a class
- **Upright, not italic.** The heading face (Merriweather) does ship a true italic, and the project deliberately does not load it: italic serif at quotation size reads as editorial pastiche, which is the "styled, not structural" shortcut this project avoids elsewhere. The quote runs upright, and size plus the `<blockquote>` semantics carry "this is a quotation" on their own.
- No decorative quotation-mark glyph (no giant `"` character floated behind or beside the text) — the size treatment plus the `<blockquote>` semantics already signal "this is a quotation" without adding a graphic element

### Attribution
- `mt-lg`, two stacked lines
- No portrait photo of the person quoted — `CONTENT.md` does not supply one, and per the zero-fabrication rule this component does not source or generate one
- Name: `text-body font-body font-semibold text-foreground` on its own line
- Role and organisation: `text-body text-muted-foreground`, joined as `Role, Organisation` on the line below. Stacked rather than run together with the name, because `authorCompany` is now a separate field and three items on one line wraps badly at 375px.

## States & Behaviors

### Component-level gating
- **Trigger:** the record is missing `quote`, `authorName` or `authorRole`. Exposed as `isRenderableTestimonial`, which the carousel imports so the two cannot drift apart.
- **State:** returns `null`. An anonymous or attributed-to-initials-only quote does not render as a fallback — `CONTENT.md` requires "written permission to publish" attached to the full attribution, not to the words alone, so a quote with no name is not a lesser-but-shippable version of this component.

## Per-State Content
Covered above.

## Assets
None. No portrait, no employer logo.

## COPY

`QUOTE-01` through `QUOTE-06` hold client testimonials, confirmed by the
client as real on 2026-09-16 and defined in `src/lib/site-content.ts` as
`TESTIMONIALS`. They are `DRAFT` with `permissionOnFile: false`. The
mock-content layer and its production-mode gate were removed the same day.

The demo attribution tags, the page-level Demonstration Mode banner, and the
illustrative-quotation note under the carousel were removed on 2026-09-16. No
marker of any kind is appended to the quote text.

Real content replaces the array wholesale. `status: "APPROVED"` and
`permissionOnFile: true` only where written permission actually exists.

## Responsive Behavior
- **Desktop (1440px) / Tablet (768px):** quote at `text-h3`, capped `max-w-[42ch]`
- **Mobile (390px):** unchanged — `text-h3`'s clamp already scales the quote down at narrow viewports, and 42 characters per line still fits a 390px column comfortably at the mobile end of that clamp
- **Breakpoint:** none of its own

## CONTRAST CHECK

| Pairing | Ratio | Source | Verdict |
|---|---|---|---|
| Paper quote text on navy | 17.07:1 | `globals.css` derived | Pass |
| Paper attribution name on navy | 17.07:1 | `globals.css` derived | Pass |
| Muted blue-grey role text on navy | 8.49:1 | `globals.css` derived | Pass |

## ANTI-SLOP CONSTRAINTS

- **No composite or anonymised-but-plausible testimonial.** `CONTENT.md`'s own words: "No composite clients, no anonymised-but-plausible outcomes, no illustrative figures." Full absence over a softened substitute.
- **No decorative giant quotation-mark glyph.** Covered under Design Specification — the semantic markup and size treatment already carry the meaning.
- **No stock headshot standing in for the named person.** None is supplied; none is invented.
- **No star rating attached to the quote.** Nothing in the register supplies one.
