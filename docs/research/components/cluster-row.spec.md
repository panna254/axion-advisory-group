# ClusterRow Specification

One of the four cluster rows in `services-section.spec.md`. Renders a cluster
name, its body sentence, and one or two `PracticeLineRow` children. See
`practice-line-row.spec.md` for the row and `services-data.spec.md` for which
lines belong to which cluster.

**Revised 2026-09-16 (anti-slop pass).** Previously a rounded, bordered card
with an internal hairline divider, named `ClusterCard` in `cluster-card.tsx`.
Now a side-head row with no box, renamed `ClusterRow` in `cluster-row.tsx`.

## Overview
- **Target file:** `src/components/sections/cluster-row.tsx`
- **Interaction model:** the row itself is static and not a link; each practice-line row inside it is independently interactive.
- **Server/Client:** Server Component.

## DOM Structure

```
<article id={`services-${slug}`} aria-labelledby={headingId}>   e.g. #services-protect, the fork's deep-link target
  <div>                                   side head
    <h3 id={headingId}>                   CLU-0n-NAME
    <p>                                   CLU-0n-BODY
  <ul>                                    1-2 items
    <li> <PracticeLineRow />
```

## DESIGN SPECIFICATION

### Row
- `grid grid-cols-1 gap-y-xl border-t border-border py-xl scroll-mt-24 lg:grid-cols-12 lg:gap-x-lg`
- `scroll-mt-24` (96px) clears the 72px sticky header on an anchor jump.
- `gap-y-xl` on the stacked layout is deliberately larger than the `gap-lg` between practice lines, so on phones the cluster sentence reads as introducing its lines rather than as another line.

### Side head
- `lg:col-span-4 lg:sticky lg:top-24 lg:self-start`. Sticky so that when a cluster's lines are expanded and run long, the cluster name stays in view.
- Name: `<h3>` `text-h3 text-foreground`. A real heading (it was a `<p>`).
- Body: `mt-xs max-w-[48ch] text-body text-muted-foreground`. The 48ch cap only binds at tablet width; on phones and in the desktop column the container is narrower.
- The body sentence **never names a practice line**, so gating any single line never leaves it contradicting the list.
- The body sentence and the summaries beside it **never share a phrase.** In this layout they sit on the same line of sight, so an echo reads as padding. Three summaries were rewritten on 2026-09-16 for exactly this.

### Line list
- `<ul>` `flex flex-col gap-lg lg:col-span-7 lg:col-start-6`. Column 5 is left empty as the gutter between the argument and the list.

## States & Behaviors

### One-line vs. two-line rendering
- The row renders however many lines resolve (`isPublishable`). Risk renders one line until `SVC-07` clears, then two. People renders one. With no box, a shorter row simply ends sooner; there is no empty cell to explain.

## COPY

| Slot | Cluster | Text |
|---|---|---|
| `CLU-01-NAME` / `CLU-01-BODY` | Growth | Growth / Where the next shilling of revenue comes from, and whether a new market is worth entering. |
| `CLU-02-NAME` / `CLU-02-BODY` | Fund | Funding / Books that close, forecasts that hold, and a lender file that stands up to a credit committee. |
| `CLU-03-NAME` / `CLU-03-BODY` | Protect | Risk / The exposures that would stop the business, ranked and owned, with the compliance work that follows. |
| `CLU-04-NAME` / `CLU-04-BODY` | People | People / Training built around the roles you are hiring for, and the HR structure underneath them. |

## Responsive Behavior
- **`lg` and up:** side head in columns 1–4, lines in 6–12, side head sticky.
- **Below `lg`:** stacked, full width, not sticky.

## CONTRAST CHECK

| Pairing | Ratio | Source | Verdict |
|---|---|---|---|
| Navy cluster name on paper | 17.07:1 | `BRAND.md` | Pass |
| Slate cluster body on paper | 5.74:1 | `globals.css` derived | Pass |
| `--border` row rule | decorative | `globals.css` | Exempt |

## ANTI-SLOP CONSTRAINTS

- **No box.** No radius, fill, border or shadow around a cluster.
- **No icon or coloured marker per cluster.** No coloured top rule, no tinted background.
- **No internal divider** between the cluster sentence and its lines. Spacing does that job.
- **No held-open empty line** for a gated practice line.
- **No summary that restates its cluster sentence.**
