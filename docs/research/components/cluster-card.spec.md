# ClusterCard Specification

One of the four repeating cells in `services-section.spec.md`. Renders a
cluster name, its body sentence, and one or two `PracticeLineRow` children —
see `practice-line-row.spec.md` for the row itself and `services-data.spec.md`
for which lines belong to which cluster.

## Overview
- **Target file:** `src/components/sections/cluster-card.tsx`
- **Design reference:** none. Authored from `IA_CRITIQUE.md` §3.2.
- **Interaction model:** the card itself is static (not a link — unlike `buyer-fork`'s doors, a cluster is a grouping label, not a single destination); each practice-line row inside it is independently interactive, per `practice-line-row.spec.md`.
- **Server/Client:** Server Component.

## DOM Structure

```
<article id={`services-${clusterSlug}`}>   e.g. #services-fund, matches fork deep-links
  <div>                                     rounded-xl border bg-card p-lg h-full flex flex-col gap-md
    <p>                                     cluster label, e.g. CLU-02-NAME
    <p>                                     cluster body, e.g. CLU-02-BODY
    <div>                                   divider
    <ul>                                    1-2 items
      <li> <PracticeLineRow />              one per line in this cluster
```

## DESIGN SPECIFICATION

### Card container
- `rounded-xl border border-border bg-card p-lg h-full flex flex-col gap-md`
- Same `rounded-xl` and border treatment as the buyer-fork doors, deliberately — it is the visual echo `IA_CRITIQUE.md` §3.2 calls for between the fork and the clusters ("the clusters and the buyer fork reinforce each other instead of competing")
- `h-full` so all four cards match height within their grid row regardless of whether the cluster holds one line or two

### Cluster label
- `text-h3 font-display font-normal text-foreground`

### Cluster body
- `text-body text-muted-foreground`
- This sentence **never names a practice line directly** — confirmed by `CONTENT.md`: "`CLU-03-BODY` names no practice line, so the Risk cluster renders correctly whether `SVC-07` clears or not." All four bodies follow this pattern, not just Protect's, so gating any single line never leaves a body sentence contradicting what is actually listed below it.

### Divider
- `h-px bg-border w-full my-2xs` — a plain hairline between the cluster description and its line list, not a section rule (which would suggest a new sub-section rather than a division inside one card)

### Line list
- `flex flex-col gap-sm`
- Renders one `<PracticeLineRow>` per entry `services-data.spec.md` assigns to this cluster, in the order given there

## States & Behaviors

The card itself has no hover/focus/active state — it is not a click target.
Interaction lives entirely in the child rows; see `practice-line-row.spec.md`.

### One-line vs. two-line rendering
- **Trigger:** `services-data.spec.md`'s cluster membership plus each line's `status`
- **State:** the card renders however many rows resolve. Protect renders one row (Risk Management) until `SVC-07` (Legal & Regulatory Advisory) clears `NEEDS-CLIENT-INPUT`, then renders two. No placeholder row, no "coming soon" row, no empty second slot held open for it — `cluster-card.spec.md`'s `gap-md` and `h-full` mean a one-row Protect card simply has more breathing room above its divider than a two-row card, not a visibly empty space where a second row was expected.

## Per-State Content
Covered above under States & Behaviors.

## Assets
None directly — icons belong to `practice-line-row.spec.md`.

## COPY

| Slot | Cluster | Text |
|---|---|---|
| `CLU-01-NAME` / `CLU-01-BODY` | Growth | Growth / Where the next shilling of revenue comes from, and whether a new market is worth entering. |
| `CLU-02-NAME` / `CLU-02-BODY` | Fund | Funding / Books that close, forecasts that hold, and a lender file that stands up to a credit committee. |
| `CLU-03-NAME` / `CLU-03-BODY` | Protect | Risk / The exposures that would stop the business, ranked and owned, with the compliance work that follows. |
| `CLU-04-NAME` / `CLU-04-BODY` | People | People / Training built around the roles you are hiring for, and the HR structure underneath them. |

## Responsive Behavior
- **Desktop (1440px) / Tablet (768px):** `p-lg` padding, `h-full` within its grid row
- **Mobile (390px):** unchanged; the card is already full-width in the section's single-column mobile grid
- **Breakpoint:** none of its own — inherits the section's `sm` grid split

## CONTRAST CHECK

| Pairing | Ratio | Source | Verdict |
|---|---|---|---|
| Navy cluster label on `--card` | 17.87:1 | `globals.css` derived | Pass |
| Slate cluster body on `--card` | ~5.6:1 | `globals.css` derived | Pass |
| `--border` divider and card outline | decorative | `globals.css` | Exempt from 3:1 |

## ANTI-SLOP CONSTRAINTS

- **No icon badge on the cluster itself.** One icon per practice line (inside `PracticeLineRow`) is enough visual variety per card; a second icon representing the cluster as a whole is decorative doubling.
- **No coloured top border or coloured card background per cluster.** Same reasoning as the buyer fork: four colour-coded cards is a generated-palette tell, and `BRAND.md` gives crimson and cyan one job each, neither of which is "distinguish cluster four from cluster two."
- **No held-open empty row for the ungated `SVC-07`.** Covered above — the card resizes to its actual content rather than reserving a visibly blank slot.
- **No card-level `box-shadow`.** Border and fill-tint only, matching every other card on the site.
