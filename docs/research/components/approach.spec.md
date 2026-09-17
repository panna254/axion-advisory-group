# Approach Specification

Section 5 in the approved sequence ("How we work"), layout family
**phased rubric on a sequence track**. Answers the objection `IA_CRITIQUE.md`
§3.3 names: an advisory buyer's real question is not "can you do this" but
"what happens after I get in touch, and what do I get at each point."

Rewritten 2026-09-17. The four-stage sequence (Diagnose, Prioritise, Build,
Hand over) became six stages in two phases, each with the client's question,
a purpose, typical work, and an output. The previous "Build" stage listed
"filings", which reads as a regulated service the firm has not confirmed; the
rewrite names none.

## Overview
- **Target file:** `src/components/sections/approach.tsx`
- **Data:** `APPROACH_PHASES` in `src/lib/approach-data.ts`, typed by `src/types/approach.ts`. Mirrors the `services-data.ts` pattern: structured stage copy in `lib/`, section headline and labels in the component.
- **Content register:** `CONTENT.md` §6
- **Interaction model:** static. Everything is visible without a click.
- **Server/Client:** Server Component. No client JS.

## Research basis

The method is Axion's own, not a copy of any firm's. Its structure is the logic that recurs across the professional frameworks for advisory, risk, and compliance engagements:

| Source | What it contributes |
|---|---|
| ILO, *Management Consulting: A guide to the profession* (Kubr) | The consulting cycle: entry, diagnosis, action planning, implementation, termination. Diagnosis and action are separate phases. |
| IIA Global Internal Audit Standards (2024), Domain V | Plan, conduct (evidence, findings), communicate results and agree recommendations or action plans with management, monitor those action plans. Applies to advisory as well as assurance work. |
| ISO 31000:2018 | Establish scope, context and criteria, then assess (identify, analyse, evaluate), treat, and monitor and review. Criteria come before assessment. |
| ISO 37301:2021 | Identify compliance obligations from the organisation's context, assess compliance risk, operate controls, evaluate performance, improve continually. |
| IIA Three Lines Model (2020) | Management owns risk decisions and actions; an adviser supports without taking management's responsibility, and does not give assurance over its own work. |

What the six stages take from that:

| Stage | Principle |
|---|---|
| 01 Understand | Agree the criteria before assessing: a gap is only meaningful against a stated obligation or objective (ISO 31000 criteria, ISO 37301 obligations). |
| 02 Assess | Facts from evidence, with documented practice checked against actual practice, confirmed with management (IIA conducting engagements). |
| 03 Identify gaps | Evaluate against the criteria and rank by likelihood and impact (ISO 31000 evaluation). Unconfirmed matters are marked for further review, not called breaches. |
| 04 Prioritise | Recommendations become action plans with owners and dates agreed with management (IIA Standard 15; Kubr action planning). Management decides. |
| 05 Implement | The organisation owns the change; the adviser supports (Three Lines Model). Conditional on scope. |
| 06 Monitor | Follow up action plans and reassess when circumstances change (IIA monitoring; ISO 31000 monitoring and review; ISO 37301 continual improvement). Conditional on scope. |

None of these frameworks is named on the page, and the copy claims no conformity with any of them.

## Placement

Unchanged: after Services, before About.

- The method answers "how would this work for us", which a buyer asks straight after reading the offer.
- The hero's secondary CTA ("See how we work") and the nav's "Approach" both link here. Moving it further down would lengthen the jump and put the biography between the offer and the method.
- About follows, because the buyer arrives with a problem, not with curiosity about the firm (`IA_CRITIQUE.md`, reading order rationale).

## Band

`py-band-tight`, and `scroll-mt-header`.

The section is no longer a short coda, so the tight band is held by the rhythm rule rather than by size: fork and services are already two consecutive standard bands, and a standard approach would make three (`src/types/section.ts`). Separation comes from the rule under the services index and this section's own phase rules.

`scroll-mt-header` exists because a tight band's top padding (40 to 64px) is shorter than the 72px sticky header, and both links into this section otherwise land the heading under the bar. Measured at 1440: heading top at 61px under a 72px header before, 133px after.

## DOM Structure

```
<section id="approach" aria-labelledby="approach-heading" className="scroll-mt-header py-band-tight">
  <div>                                   max-w-page mx-auto px-md
    <div>                                 header, max-w-[56ch] mb-2xl
      <h2 id="approach-heading">          APP-H2
      <p>                                 APP-SUB
    <div>  x2 phases                      flex-col gap-2xl
      <div>                               phase header, hairline above
        <h3 id="approach-{phase}-heading">  APP-PHASE-0n-NAME
        <p>                               APP-PHASE-0n-BODY
      <ol start={1|4} aria-labelledby>    spine below lg, 3-col grid with 5 rows at lg
        <li>  x3                          subgrid, 5 rows at lg; 2 cols at md
          <div>                           "what it is": contents at lg
            <div>                         the track
              <span aria-hidden>          01 to 06
              <h4 id>                     APP-0n-NAME
              <span aria-hidden>          connector, lg only, not on the last stage in a phase
            <p>                           APP-0n-QUESTION
            <p>                           APP-0n-PURPOSE
          <div>                           "what it involves": contents at lg
            <div>
              <p id>                      APP-LABEL-WORK
              <ul aria-labelledby="work name">  APP-0n-WORK, 3 items
            <div>                         hairline above
              <p>                         APP-LABEL-OUTPUT
              <p>                         APP-0n-OUTPUT
    <div>                                 APP-START and APP-SCOPE, each conditional
```

- Two `<ol>`s, the second with `start={4}`, so numbering runs through and each list is named by its phase.
- Headings: h2 section, h3 phase, h4 stage. The outline reads How we work, Diagnosis, Understand, Assess, Identify gaps, Action, Prioritise, Implement, Monitor.
- Numerals and connectors are `aria-hidden`: the ordered list already carries position.
- Each activity list is labelled by its row label and its stage name ("Typical work Understand"). Six lists all called "Typical work" are indistinguishable in a screen reader's list navigator.
- The wrapper divs have no role, so `display: contents` at lg costs nothing in the accessibility tree.

## DESIGN SPECIFICATION

### Header
- `h2` at `text-h2 text-foreground`. Headline only, no eyebrow: `CONTENT.md` makes the hero's the page's only eyebrow.
- `APP-SUB` at `mt-sm text-lead text-muted-foreground`, `max-w-[56ch]`. It states the method's stance (obligations and facts first, advice second, evidence throughout), not the layout.

### Phase header
- `border-t border-border pt-md`. Name `font-body text-body font-semibold text-foreground`; summary `text-body text-muted-foreground`.
- Stacked below md; on one baseline from md (`md:flex-row md:items-baseline md:gap-md`).
- List follows at `mt-lg`.

### The track
- `flex items-baseline gap-sm`: numeral, stage name, connector.
- Numeral: `text-lead text-muted-foreground`, `data-numeric`.
- Stage name (h4): `font-body text-lead font-semibold text-foreground`. The verb sits on the track; it labels the stage rather than headlining it.
- Connector (lg only): `h-px flex-1 self-center bg-stroke-systems`, with `lg:-mr-[calc(var(--spacing-lg)-var(--spacing-sm))]`. It crosses the column gap and stops `sm` short of the next numeral, mirroring the `gap-sm` after its own, so 01, 02 and 03 read as one line. Measured at 1440: connector ends 12px before the next numeral.
- Cyan-deep because the connector is a diagram stroke, which is cyan's job in `BRAND.md`.

### Stage body
- Question: `mt-sm font-heading text-h3 text-foreground text-pretty`. The stage's visual headline. Scanned in order, the six questions read as the course of an engagement. Merriweather here is the pull-statement role `globals.css` assigns to `h3` size.
- Purpose: `mt-sm text-body text-muted-foreground text-pretty`.
- Row labels ("Typical work", "What you get"): `text-small font-medium text-muted-foreground`, sentence case.
- Work: label, then `ul` at `mt-xs flex flex-col gap-2xs list-disc pl-md text-body text-muted-foreground marker:text-stroke-systems`.
- Output: `mt-lg border-t border-border pt-md`, label, then `mt-2xs text-body text-foreground`. Navy, not slate: the deliverable is the line the buyer is looking for.

### Desktop (lg and up)
- `ol`: `grid grid-cols-3 grid-rows-[repeat(5,auto)] gap-x-lg gap-y-0`, no spine.
- `li`: `row-span-5 grid grid-cols-1 grid-rows-subgrid`. Both wrapper divs are `contents`, so the five parts (track, question, purpose, work, output) are the five subgrid rows.
- Result: every part starts at the same y across a phase's three stages, so a phase reads as a rubric. The three output rules share a y and read as one broken band of deliverables.
- The work block takes `lg:mt-lg`, since its wrapper's margin disappears under `contents`.

### Tablet (md to lg)
- `ol`: `flex flex-col gap-2xl border-l border-border`, the spine.
- `li`: `grid grid-cols-2 gap-x-lg pl-lg`. Left: track, question, purpose. Right: work and output.

### Mobile
- Spine as tablet at `gap-xl`, `li` at `pl-md`, single column. Work follows purpose at `mt-lg`.

### Footnote
- `mt-2xl flex flex-col gap-xs border-t border-border pt-lg`, rendered only if `closingNote` or `scopeNote` is supplied. Each is `text-body text-muted-foreground`.

## States & Behaviors

Static. No hover, focus or active states; nothing is interactive.

**Why not tabs or accordions.** The outputs answer the buyer's main question ("is this just a report?"), and the typical work is what shows the method is evidence-based. Hiding either behind a click would put the section's substance behind an interaction, and would make this the one section on the page that needs client JavaScript to read. Every stage is visible, in order, at every width.

**No motion.** No other mid-page section animates on entry, and a staggered reveal of six stages would slow reading without explaining anything.

### `APP-START` gating
- Rendered from `closingNote` when supplied, omitted otherwise. `CONTENT.md` still records the slot as `NEEDS-CLIENT-INPUT`; `src/lib/site-content.ts` currently supplies a value, so it renders.

### `APP-SCOPE` gating
- `scopeNote`, `NEEDS-CLIENT-INPUT`, not currently passed, so it does not render. It is the place to state which regulated professional work the firm does or does not carry out. The method copy names none, because the firm's licences and memberships are unconfirmed (`CERT-LIST`).

## Assets
None. No icons: six glyphs would need inventing, and the numeral and the client's question already tell stages apart.

## COPY

All stage and phase copy is in `src/lib/approach-data.ts` and mirrored in `CONTENT.md` §6, which is generated from it.

| Slot | Text |
|---|---|
| `APP-H2` | How we work |
| `APP-SUB` | We establish what your organisation must meet and how it actually runs, then advise on what to change. Every recommendation traces back to evidence. |
| `APP-LABEL-WORK` / `APP-LABEL-OUTPUT` | Typical work / What you get |
| `APP-PHASE-01` | Diagnosis: What applies to you, what actually happens, and where the two differ. |
| `APP-PHASE-02` | Action: What to change first, putting it in place, and checking that it holds. |
| `APP-01` to `APP-06` | See `CONTENT.md` §6 |

### Language rules for this section
- No statute, regulator, licence, certification, or regulated service is named. Which obligations apply is stated as depending on sector and structure.
- "Gap", "likely cause", "marked for further review". Never "breach", "non-compliant", or "violation", which are legal conclusions.
- No guarantee of compliance, no timeline, no fee.
- Stages 05 and 06 are conditional on scope ("where the engagement includes it", "at agreed points").
- Management decides and owns the change. The firm recommends and supports.

## Responsive Behavior
- **Desktop (1440px):** two phases of three stages on the track; five aligned rubric rows per phase. Section about 1770px.
- **Laptop (1280px):** as desktop. About 1730px.
- **Tablet (1024px):** as desktop, narrower columns. About 1860px.
- **Tablet (768px):** spine; each stage split into what it is and what it involves. About 2500px.
- **Mobile (390px / 375px):** spine, single column, one stage to roughly a screen. About 3620px / 3690px.
- **Breakpoints:** `md` for the stage split and phase-header baseline, `lg` for the rubric.
- Verified at every width above: no horizontal overflow, all text inside the 16px gutter, no text below 13px.

## CONTRAST CHECK

| Pairing | Ratio | Source | Verdict |
|---|---|---|---|
| Navy h2, phase names, stage names, questions, outputs on paper | 17.07:1 | `BRAND.md` | Pass |
| Slate subtext, phase summaries, numerals, purposes, labels, work items on paper | 5.74:1 | `globals.css` | Pass, AA at every size |
| Cyan-deep connector and list markers | 3.92:1 | `globals.css` | Non-text, decorative (order is carried by the list and numerals). Clears 3:1 regardless. |
| `--border` spine and hairlines | decorative | `globals.css` | Exempt |

The previous version set the numerals in cyan-deep at `text-h3`, which is 3.92:1 against a 4.5:1 requirement below 24px (every viewport under about 1080px). The numerals are now slate at 5.74:1, and cyan moved to the connector, which is a stroke.

No crimson anywhere in the section.

## ANTI-SLOP CONSTRAINTS

- **No six-card grid.** No boxes, no shadows, no radius. Stages share subgrid rows, so a phase reads as one rubric rather than three tiles.
- **No icon per stage.** No magnifying glass for Assess, no checklist for Implement.
- **No "Stage 1 / Step 1" labels.** The numeral is a design element; the name is the verb.
- **No generic Discover, Plan, Execute, Review.** Every stage says what is examined or produced.
- **No eyebrow above the headline.**
- **No tabs, accordion, carousel, or hover reveal.** See States & Behaviors.
- **No progress bar or completion affordance.** This describes how engagements run, not a live tracker.
- **No regulated-service claims, legal conclusions, or guarantees.** See Language rules.
- **No em-dash in any rendered string.**
