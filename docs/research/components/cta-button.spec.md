# CtaButton Specification

Shared primitive. Four sections consume it, so it is specified once here and
referenced rather than restated. **Dispatch note:** any builder whose section
contains a button receives this file inline alongside its own spec.

## Overview
- **Target file:** `src/components/ui/cta-button.tsx`
- **Design reference:** none. Authored from `BRAND.md`, not traced from a target.
- **Interaction model:** static (hover, focus, active, disabled only)
- **Server/Client:** Server Component. It renders an `<a>` or `<button>` and holds no state. The pending state is driven by a prop from a client parent.

## DOM Structure

```
<a|button>                      variant root, inline-flex
  <span>                        label text
  <Icon>                        optional trailing glyph, size sm (20px)
```

Never a `<div>` with a click handler. A navigating CTA is `<a>`, a submitting
one is `<button type="submit">`.

## DESIGN SPECIFICATION

### Shared across all variants
- Layout: `inline-flex items-center justify-center gap-xs` (gap 0.5rem)
- Padding: `px-lg py-sm` (24 -> 28px horizontal, 12px vertical)
- Radius: `rounded-lg` (`--radius-lg` = `--radius` = 0.25rem). Not a pill. The whole site runs one near-sharp ladder.
- Type: `text-body font-sans font-medium` (16 -> 18px). **Minimum 16px is load-bearing:** white on crimson measures 4.74:1, which passes AA only at 16px and above. A 14px crimson button is a contrast failure.
- Label: single line always. `whitespace-nowrap`.
- Transition: `transition-[background-color,border-color,color,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]`
- Box-shadow: **none.** This system expresses elevation with a hairline and a surface tint, never a drop shadow. See ANTI-SLOP CONSTRAINTS.
- Min touch target: `min-h-11` (44px) so the mobile target clears the WCAG 2.5.8 floor.

### variant="primary"
- Rest: `bg-primary text-primary-foreground` (crimson fill, white label)
- Border: none
- Hover: `hover:bg-aag-crimson-deep`
- Active: `active:translate-y-px`
- Focus-visible: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background`
- Disabled: `disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed disabled:translate-y-0`. No opacity trick: opacity on crimson lands on an unmeasured colour.

### variant="secondary"
- Rest: `bg-transparent text-foreground border border-stroke-systems`
- The outline is cyan. This is the only job cyan has on a button. **A cyan fill is forbidden:** it would put cyan and crimson at equal weight in the same button row, which `BRAND.md` prohibits.
- Hover: `hover:bg-secondary` (fill arrives, border holds)
- Active: `active:translate-y-px`
- Focus-visible: same ring as primary
- Disabled: `disabled:border-border disabled:text-muted-foreground disabled:cursor-not-allowed`

### variant="link"
- Rest: `text-action-text underline underline-offset-4 decoration-1 p-0 min-h-0`
- `--action-text` resolves to crimson-deep on paper and crimson-light inside `.band-navy`, so one class is correct on both surfaces.
- Hover: `hover:decoration-2` (thickness, not colour: there is no legal darker crimson on paper)
- Active: `active:translate-y-px`
- Focus-visible: same ring, plus `focus-visible:rounded-sm` so the ring has a shape to trace
- Disabled: not applicable. A disabled text link is a defect; omit the link.

### state="pending" (submit buttons only)
- Label is replaced by `<IconSpinner size="sm" className="animate-spin" />` plus the same label text, `aria-busy="true"`
- Button width does not change between rest and pending. Reserve the width with `min-w-[--spinner-reserve]` computed from the label, or keep the label visible beside the spinner. A button that shrinks mid-submit is a layout bug.

## States & Behaviors

### Hover
- **Trigger:** pointer over the element
- **primary:** `background-color` crimson -> crimson-deep, transition 200ms
- **secondary:** `background-color` transparent -> `--secondary`, transition 200ms
- **link:** `text-decoration-thickness` 1px -> 2px, transition 200ms

### Focus-visible (mandatory)
- **Trigger:** keyboard focus only. `:focus-visible`, never `:focus`.
- **State:** 2px ring in `--ring` with a 2px offset in `--background`
- `--ring` is crimson: 4.42:1 on paper, and crimson-light at 7.00:1 inside a navy band. Both clear the 3:1 floor for a focus indicator.
- **`outline: none` without a replacement ring is a build failure.** The `outline-none` in the class list is only legal because a ring follows it on the same element.

### Active
- **Trigger:** pointer down / key down
- **State:** `transform: translateY(1px)`. Downward, simulating a physical press.
- **Transition:** 200ms, same easing. Suppressed under `prefers-reduced-motion` by the global rule in `globals.css`.

### Disabled
- **Trigger:** `disabled` attribute
- **State:** muted fill, muted-foreground label, `cursor-not-allowed`, no hover or active response
- Disabled controls are exempt from WCAG contrast, but slate on muted still measures 5.20:1, so the label stays readable rather than becoming a grey smear.

## Per-State Content
N/A. Content arrives as props.

## Assets
- Icons: `IconArrowRight`, `IconArrowUpRight`, `IconSpinner` from `src/components/icons.tsx`, all at `size="sm"` (20px)
- Icons inherit `currentColor`. Do not colour them separately.
- Image slots: none.

## COPY

Labels are passed in. These are the only labels in the register that render as a CtaButton:

- `Book a consultation` (primary, used in header, hero, and closing CTA, deliberately one label for one intent)
- `See how we work` (secondary, hero)
- `See funding and growth` (secondary, buyer fork)
- `See risk and compliance` (secondary, buyer fork)
- `Read about the firm` (link, about)
- `Send enquiry` (primary submit, contact form)
- `Go to the homepage` (primary, 404)

## Responsive Behavior
- **Desktop (1440px):** intrinsic width, `px-lg py-sm`
- **Tablet (768px):** unchanged
- **Mobile (390px):** unchanged in style. In stacked CTA pairs the parent sets `w-full`; the button itself never hard-codes a width.
- **Breakpoint:** none of its own. The consuming section owns the stack point.

## CONTRAST CHECK

| Pairing | Ratio | Source | Verdict |
|---|---|---|---|
| White on crimson (primary label) | 4.74:1 | `BRAND.md` | Pass at 16px+ only. Enforced by `text-body`. |
| Navy on paper (secondary label) | 17.07:1 | `BRAND.md` | Pass any size |
| Cyan-deep border on paper (secondary outline) | 3.92:1 | `globals.css` derived | Pass, clears 3:1 for a UI boundary |
| Navy on `--secondary` (secondary label, hover) | 14.33:1 | `globals.css` derived | Pass |
| Crimson-deep on paper (link) | 6.16:1 | `BRAND.md` | Pass |
| Crimson-light on navy (link in a band) | 7.00:1 | `BRAND.md` | Pass |
| Crimson ring on paper (focus) | 4.42:1 | `globals.css` derived | Pass, focus indicator floor is 3:1 |
| Crimson-light ring on navy (focus in a band) | 7.00:1 | `BRAND.md` | Pass |
| Slate on `--muted` (disabled label) | 5.20:1 | `globals.css` derived | Pass |

**Forbidden here:** crimson as label text on paper (4.43:1, fails AA), cyan as
label text on paper (2.45:1, fails at every size), crimson text on navy below
24px (3.86:1).

## ANTI-SLOP CONSTRAINTS

- **No pill radius.** `rounded-full` on a button while cards run at 0.25rem is the shape-inconsistency tell. One radius ladder, no exceptions.
- **No glow, no coloured drop shadow.** `shadow-lg shadow-primary/50` under a crimson button is the single most recognisable AI button treatment.
- **No gradient fill.** Especially no crimson-to-cyan gradient, which `BRAND.md` names as the most predictable move available with this palette.
- **No icon on every button.** A trailing arrow is for a button that navigates somewhere new. `Send enquiry` and `Book a consultation` do not take one.
- **No scale on hover.** `hover:scale-105` on a text button blurs the type mid-transition.
- **No label longer than three words.** Wrapping to two lines at desktop is a taste-skill Pre-Flight failure; every label above fits one line.
- **No `:focus` styling.** It fires on mouse click and puts a ring on a button the user just pressed. `:focus-visible` only.
