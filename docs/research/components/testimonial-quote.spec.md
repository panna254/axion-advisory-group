# TestimonialQuote Specification

The second of two children of `proof-section.spec.md`. Renders `QUOTE-01-TEXT`,
`QUOTE-01-NAME`, and `QUOTE-01-ROLE`. Every slot is `NEEDS-CLIENT-INPUT`.

## Overview
- **Target file:** `src/components/sections/testimonial-quote.tsx`
- **Design reference:** none. Authored from `CONTENT.md` §9.
- **Interaction model:** static
- **Server/Client:** Server Component. Returns `null` if any required slot is missing.

## DOM Structure

```
<figure>
  <blockquote>
    <p>                                  QUOTE-01-TEXT
  <figcaption>
    <p>                                  QUOTE-01-NAME
    <p>                                  QUOTE-01-ROLE
```

## DESIGN SPECIFICATION

### Container
- `<figure>` / `<blockquote>` / `<figcaption>` — semantic quotation markup, not
  three `<div>`s, since this is content correctly described by those elements
  and a screen reader announces a blockquote distinctly

### Quote text
- `text-h3 font-display font-normal italic text-foreground max-w-[42ch]`
- **Italic, in the display serif.** `layout.tsx`'s font-loading comment notes italic is loaded specifically so the taste skill's "in-family italic for emphasis" rule can be used instead of a second typeface — this is that rule's one use on the page. The quote is the single moment of display-serif italic type on the site; it should not be reused elsewhere for generic emphasis, which would dilute what makes it distinctive here.
- No decorative quotation-mark glyph (no giant `"` character floated behind or beside the text) — the italic treatment plus the `<blockquote>` semantics already signal "this is a quotation" without adding a graphic element

### Attribution
- `mt-lg flex items-center gap-sm`
- No portrait photo of the person quoted — `CONTENT.md` does not supply one, and per the zero-fabrication rule this component does not source or generate one
- Name: `text-body font-sans font-semibold text-foreground`
- Role: `text-body text-muted-foreground` — rendered as `Name, Role and company` on one line at `sm` and up (name and role in the same `<p>` separated by a comma) rather than as two stacked lines, since `QUOTE-01-ROLE`'s budget already combines role and company into one short phrase

## States & Behaviors

### Component-level gating
- **Trigger:** any of `QUOTE-01-TEXT`, `QUOTE-01-NAME`, `QUOTE-01-ROLE` still `NEEDS-CLIENT-INPUT`
- **State:** returns `null`. An anonymous or attributed-to-initials-only quote does not render as a fallback — `CONTENT.md` requires "written permission to publish" attached to the full attribution, not to the words alone, so a quote with no name is not a lesser-but-shippable version of this component.

## Per-State Content
Covered above.

## Assets
None. No portrait, no employer logo.

## COPY

| Slot | Status | Text |
|---|---|---|
| `QUOTE-01-TEXT` | NEEDS-CLIENT-INPUT | `[CLIENT TO SUPPLY: testimonial, max 3 lines, with written permission to publish]` |
| `QUOTE-01-NAME` | NEEDS-CLIENT-INPUT | `[CLIENT TO SUPPLY: full name]` |
| `QUOTE-01-ROLE` | NEEDS-CLIENT-INPUT | `[CLIENT TO SUPPLY: role and company]` |

None of this ships. Quoted so a builder knows the exact shape once real
content clears.

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
- **No decorative giant quotation-mark glyph.** Covered under Design Specification — the semantic markup and italic treatment already carry the meaning.
- **No stock headshot standing in for the named person.** None is supplied; none is invented.
- **No star rating attached to the quote.** Nothing in the register supplies one.
