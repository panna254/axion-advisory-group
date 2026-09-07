# Services Data Specification

Not a visual spec. This is the data contract `services-section.spec.md`,
`cluster-card.spec.md`, and `practice-line-row.spec.md` all read from, kept in
one place so cluster membership is decided once rather than re-derived per
component. Mirrors `CONTENT.md` §5.1's cluster table and `src/types/service.ts`'s
`ServiceSlug` union exactly — this file does not introduce any slug, cluster,
or status value that those two sources do not already define.

## Target file
`src/lib/services-data.ts` (or co-located in `src/components/sections/` if the
project's convention keeps section-specific data next to its components —
either is fine; there is exactly one array here, not a module worth its own
top-level `lib` entry on size grounds alone).

## Cluster membership

| Cluster slug | `CLU-0n` | Practice lines (in render order) |
|---|---|---|
| `growth` | `CLU-01` | `business-consultancy`, `market-entry` |
| `fund` | `CLU-02` | `financial-management`, `loans-financing` |
| `protect` | `CLU-03` | `risk-management`, `legal-regulatory` |
| `people` | `CLU-04` | `training-hr` |

This is `IA_CRITIQUE.md` §3.2's grouping table, cross-checked against
`CONTENT.md` §5.1's prose statement of the same mapping — the two sources
agree exactly, so there is no reconciliation needed, only this one written-down
copy for components to import.

## Gating

`legal-regulatory` carries `status: "needs-client-input"` (see
`src/types/service.ts` and `src/types/content.ts` for the `ContentStatus`
union this should satisfy). Every other slug is `"approved"` at the name
level — `SVC-0n-NAME` values are the client's own material — even though the
summary and detail copy attached to each one is separately `DRAFT` in the
content register. **The gate that matters for rendering is the slug's own
`status` field, not the copy's editorial status**: `DRAFT` copy ships,
`NEEDS-CLIENT-INPUT` copy does not.

`practice-line-row.spec.md` reads this field to decide whether to render the
row at all. `cluster-card.spec.md` never checks it directly — it renders
whatever rows resolve and lets its `h-full` layout absorb the count
difference.

## Icon assignment

Reference only — the authoritative mapping is `SERVICE_ICONS` in
`src/components/icons.tsx`, already implemented:

| Slug | Icon |
|---|---|
| `business-consultancy` | `IconBusinessConsultancy` (Strategy) |
| `financial-management` | `IconFinancialManagement` (ChartLineUp) |
| `training-hr` | `IconTrainingHr` (UsersThree) |
| `loans-financing` | `IconLoansFinancing` (HandCoins) |
| `risk-management` | `IconRiskManagement` (Gauge) |
| `market-entry` | `IconMarketEntry` (GlobeHemisphereEast) |
| `legal-regulatory` | `IconLegalRegulatory` (Scales) |

No component should hardcode an icon per slug independently of
`SERVICE_ICONS` — importing the map keeps a future eighth practice line (or a
resolved `legal-regulatory`) a type error until it has an icon, per
`icons.tsx`'s own comment on that map.

## Hrefs

Each practice line's row target is an in-page anchor, `#svc-{slug}`, used only
as an `aria-controls`/`id` pair for the disclosure in `practice-line-row.spec.md`
— it is not a route and does not need to resolve on its own if JavaScript is
disabled (the disclosure degrades to a plain expanded list in that case, per
standard `<details>`-adjacent disclosure behaviour if the component is built
on top of it rather than fully hand-rolled).

Cluster-level anchors (`#services-growth`, `#services-fund`,
`#services-protect`, `#services-people`) are real navigation targets, used by
`buyer-fork.spec.md` and `site-footer.spec.md`'s Services column.

## Interest-form alignment

`CONTENT.md` §11 notes `FORM-INTEREST-OPTIONS` mirrors the four clusters
exactly (`Growth, Funding, Risk, People, Not sure yet`), so an enquiry arrives
pre-routed to the door the visitor came through. The cluster slugs above
(`growth`, `fund`, `protect`, `people`) are the values `contact.spec.md`'s
form should use for that field — note `fund` (data slug) vs. `Funding` (form
label) and `protect` (data slug) vs. `Risk` (form label): the data slugs
follow this file's naming, the visible labels follow `CONTENT.md` verbatim,
and `contact.spec.md` is responsible for mapping between the two.

## What this file does not decide

Visual treatment (`cluster-card.spec.md`, `practice-line-row.spec.md`), the
section wrapper and grid (`services-section.spec.md`), and the actual
`SVC-0n-SUMMARY` / `SVC-0n-DETAIL` copy (`CONTENT.md` §5.2, quoted inline by
`practice-line-row.spec.md`'s consuming builder, not restated in this file).
