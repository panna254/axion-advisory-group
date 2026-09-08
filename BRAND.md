# Axion Advisory Group — Brand Reference

This file is the top of the precedence chain. Where anything else in this repo disagrees with BRAND.md, BRAND.md wins. See "Project precedence — Axion Advisory Group" in `AGENTS.md`.

---

## Taste dials

DESIGN_VARIANCE = 5 · MOTION_INTENSITY = 4 · VISUAL_DENSITY = 5

These override the `design-taste-frontend` skill's 8 / 6 / 4 baseline for every surface in this project.

---

## Colour tokens

| Role | Token | Hex | OKLCH |
|---|---|---|---|
| Primary / crimson | --aag-crimson | #E01A4F | oklch(0.5840 0.2228 14.96) |
| Crimson, text on light | --aag-crimson-deep | #B71340 | oklch(0.5022 0.1916 14.54) |
| Crimson, on dark | --aag-crimson-light | #F27A9C | oklch(0.7254 0.1506 3.60) |
| Secondary / cyan | --aag-cyan | #29ABE2 | oklch(0.6985 0.1327 232.37) |
| Cyan deep | --aag-cyan-deep | #1B84B4 | oklch(0.5799 0.1149 234.80) |
| Cyan light | --aag-cyan-light | #8FD4F2 | oklch(0.8346 0.0810 227.15) |
| Canvas dark | --aag-navy | #0B1233 | oklch(0.1990 0.0657 270.33) |
| Elevated dark | --aag-navy-800 | #131C4A | oklch(0.2499 0.0860 270.57) |
| Deepest ink | --aag-ink | #060B1E | oklch(0.1568 0.0413 268.91) |
| Canvas light | --aag-paper | #F6F7FA | oklch(0.9762 0.0041 271.37) |
| Muted text | --aag-slate | #5A6178 | oklch(0.4953 0.0378 271.72) |

---

## Contrast law — measured, non-negotiable

| Pairing | Ratio | Rule |
|---|---|---|
| White on navy | 18.28:1 | Any use |
| Navy on paper | 17.07:1 | Any use |
| Crimson-light on navy | 7.00:1 | Body text OK |
| Cyan on navy | 6.98:1 | Body text OK |
| Crimson-deep on paper | 6.16:1 | Body text OK — this is the crimson for light backgrounds |
| White on crimson | 4.74:1 | Buttons and text at 16px or larger |
| Crimson on navy | 3.86:1 | FORBIDDEN except display text 24px+ — the logo lockup only |
| Crimson on paper | 4.43:1 | FORBIDDEN as text — fails AA. Use crimson-deep |
| Cyan on paper | 2.45:1 | FORBIDDEN as text, ever. Fills, rules, and icons only |

---

## Identity

- Mark: two rounded shield forms side by side, crimson left, cyan right, flat bottoms, fully rounded tops. Rebuilt as SVG paths, never traced from a photo.
- Wordmark: AAG — geometric sans, letterspaced, cyan.
- Lockup: AXION ADVISORY GROUP — geometric sans, crimson, letterspaced.
- Tagline: "Your Partner For Business Group" — UNCONFIRMED, likely a typo for "Growth". Treat as literal until I say otherwise.
- Type direction: geometric sans display (Space Grotesk) plus a neutral grotesque for UI (Archivo). Inter is not used.

---

## Service lines

1. Business Consultancy — strategic planning, business development, operations optimisation
2. Financial Management — accounting, budgeting, financial planning, cash-flow management
3. Training & HR Services — staff development, HR consultancy, capacity-building programmes
4. Loans & Financing — loan facilitation, disbursement, financial solutions
5. Risk Management — risk assessment, mitigation strategy, compliance solutions
6. Market Entry Support — international expansion, market research, regulatory readiness
7. Legal & Regulatory Advisory — UNCONFIRMED, obscured in the source photo

---

## Colour usage law

Each colour has one job. Assigning a second job to any of them is what makes a two-colour palette look generated.

**Crimson is the action colour.** Primary CTAs, active states, the current-page nav underline. If it is crimson, it is clickable or it is the thing you are on.

**Cyan is the systems colour.** Data, icons, diagram strokes, section rules, secondary CTA outlines. Cyan describes structure. It never asks for a click on its own.

**Navy is the authority colour.** Dark bands, footer, scrolled header.

**Paper is the default canvas.** Most of the site is paper. Dark bands are punctuation, not the ground state.

### Hard rules

- Crimson and cyan never carry equal visual weight in the same component. The mark is the only place they are peers.
- No gradient blending crimson into cyan, ever. That is the single most predictable move available with this palette and it will make the site look generated.
- Cyan is never text on paper. 2.45:1 fails at every size. Fills, rules, and icons only.
- Crimson is never text on paper. Use crimson-deep, which measures 6.16:1.
- Crimson on navy is display-only at 24px and above, and in practice that means the logo lockup and nothing else.
- On navy, body text is white, crimson-light, or cyan. All three clear 6.9:1.

### Quick reference: what to reach for

| Surface | Text | Accent |
|---|---|---|
| Paper section | navy, slate for muted | crimson-deep for links, cyan for rules and icons |
| Navy band | white, crimson-light, cyan | crimson fill for CTAs, cyan for strokes |
| Crimson button | white at 16px+ | none |

---

## Voice

Direct, credentialed, specific. Kenyan English. KES for currency.

### Banned words and phrases

empower · leverage · solutions · seamless · cutting-edge · unlock · robust · holistic · bespoke · world-class · one-stop shop · "in today's business landscape"

Note that "solutions" appears inside two service-line descriptions recorded above. Those are the client's own words for their service lines and stand as written. The ban applies to copy we author.

### Mechanics

- Sentences under 25 words.
- No em-dashes in body copy. Use a period, a comma, a colon, or parentheses.
- Numbers and currency: KES, written as `KES 1.2M` or `KES 450,000`.
- Say the specific thing. "Cash-flow forecasting for a 40-person firm" beats "financial solutions for growing businesses".

### Claims

Every number, credential, date, and client name is a claim. See `CONTENT.md`. If it is not sourced from the client, it does not ship.
