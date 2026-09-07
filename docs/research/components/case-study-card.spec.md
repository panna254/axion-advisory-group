# CaseStudyCard Specification

One of two children of `proof-section.spec.md`. Renders `CASE-01-CLIENT`,
`CASE-01-SECTOR`, `CASE-01-PROBLEM`, and `CASE-01-OUTCOME` as a problem/outcome
pair. Every slot is `NEEDS-CLIENT-INPUT`; see the parent spec for section-level
gating. This component's own gating rule is narrower and stated below.

## Overview
- **Target file:** `src/components/sections/case-study-card.tsx`
- **Design reference:** none. Authored from `CONTENT.md` §9.
- **Interaction model:** static
- **Server/Client:** Server Component. Returns `null` if any required slot is missing — see States & Behaviors.

## DOM Structure

```
<article>
  <div>                                  eyebrow row
    <p>                                  CASE-01-CLIENT
    <span>                               separator
    <p>                                  CASE-01-SECTOR
  <div>                                  grid-cols-2 on the problem/outcome pair
    <div>
      <p class="label">                  "The problem"
      <p>                                CASE-01-PROBLEM
    <div>
      <p class="label">                  "What changed"
      <p>                                CASE-01-OUTCOME
```

## DESIGN SPECIFICATION

### Container
- `rounded-xl border border-border p-xl` — the border and radius resolve
  through `.band-navy`'s token re-point automatically (`--border` becomes the
  navy hairline, per `globals.css`), so this card needs no navy-specific
  override of its own
- No `bg-card` fill — this card sits directly on the navy band surface with a
  border only, rather than introducing a third tint step (background, card,
  card-inside-a-navy-band) that the rest of the site's two-step system
  (surface, card) does not otherwise use

### Eyebrow row
- `flex items-center gap-2xs mb-lg`
- Client name: `text-body font-sans font-semibold text-foreground`
- Separator: `text-muted-foreground`, a middle dot (`·`), not a pipe or slash
- Sector: `text-body text-muted-foreground`

### Problem/outcome grid
- `grid grid-cols-1 sm:grid-cols-2 gap-lg`
- Each column's label ("The problem" / "What changed"): `text-caption font-sans font-medium uppercase tracking-wide text-stroke-systems mb-xs` — cyan, since these labels are structural signposting (which half of the pair is which), exactly the job `BRAND.md` gives cyan, and never an action
- Body text: `text-body text-muted-foreground`

## States & Behaviors

### Component-level gating
- **Trigger:** any of `CASE-01-CLIENT`, `CASE-01-SECTOR`, `CASE-01-PROBLEM`, `CASE-01-OUTCOME` still `NEEDS-CLIENT-INPUT`
- **State:** returns `null`. A case study missing its outcome (or worse, its client's permission to be named) is not a partial render — all four fields are required together, unlike `credibility.spec.md`'s independent stats, because a case study with only a problem and no outcome is not a case study, it is a complaint.
- `CONTENT.md` §9 is explicit that `CASE-01-CLIENT` requires "written permission to name them" — this is a legal gate, not just a content gate, and this component has no mechanism to verify that permission itself; it trusts the register's status field entirely.

## Per-State Content
Covered above.

## Assets
None. No client logo, no photograph of the client's premises — none is
supplied in `CONTENT.md`, and none should be substituted.

## COPY

| Slot | Status | Text |
|---|---|---|
| `CASE-01-CLIENT` | NEEDS-CLIENT-INPUT | `[CLIENT TO SUPPLY: client name, and written permission to name them]` |
| `CASE-01-SECTOR` | NEEDS-CLIENT-INPUT | `[CLIENT TO SUPPLY: sector]` |
| `CASE-01-PROBLEM` | NEEDS-CLIENT-INPUT | `[CLIENT TO SUPPLY: the problem as the client described it]` |
| `CASE-01-OUTCOME` | NEEDS-CLIENT-INPUT | `[CLIENT TO SUPPLY: measured outcome. Figures must be ones the client will stand behind.]` |

None of this ships. Quoted so a builder knows the exact shape once real
content clears.

## Responsive Behavior
- **Desktop (1440px) / Tablet (768px, `sm` and up):** problem and outcome side by side
- **Mobile (390px):** stacks to one column, problem above outcome
- **Breakpoint:** `sm` (640px)

## CONTRAST CHECK

| Pairing | Ratio | Source | Verdict |
|---|---|---|---|
| Paper client name/sector on navy | 17.07:1 | `globals.css` derived | Pass |
| Cyan section labels on navy | 6.98:1 | `BRAND.md` | Pass, well above the 3:1 floor even as small caption text |
| Muted blue-grey body on navy | 8.49:1 | `globals.css` derived | Pass |
| `--border` card outline on navy | decorative | `globals.css` | Exempt |

## ANTI-SLOP CONSTRAINTS

- **No invented client name, sector, figure, or outcome.** This is the component `AGENTS.md`'s prohibition on fabricated case-study outcomes is most directly aimed at.
- **No "results may vary" disclaimer invented to hedge an unsourced number.** If the number is not sourced, it is not rendered — the fix is absence, not a caveat.
- **No before/after bar chart or invented percentage-improvement graphic.** A data visualisation implies measured data; none exists until the client supplies it, and inventing a chart shape to imply precision around an unsourced figure is worse than a plain sentence.
- **No client logo placeholder ("logo coming soon").** Either the logo and the permission to use it exist, or nothing renders.
