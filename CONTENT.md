# Axion Advisory Group — Content Register

**This site represents a real company. You may not invent client names, testimonials, case-study outcomes, contract values, staff counts, founding dates, certifications, awards, office locations, or regulatory registrations. Any slot requiring a verifiable claim is created with status NEEDS-CLIENT-INPUT and bracketed placeholder text such as `[CLIENT TO SUPPLY: year founded]`. A placeholder that ships is a bug. A fabricated credential is a liability.**

---

## How to use this register

One row per copy slot. Every slot has an ID, a section, a character budget, a status, and its current text.

**Status values**

| Status | Meaning |
|---|---|
| `DRAFT` | Written by us. Editable. Safe to ship if it survives review. |
| `NEEDS-CLIENT-INPUT` | Contains or requires a verifiable claim we cannot source. Blocks release. |
| `APPROVED` | Signed off by the client. Do not edit without asking. |

**Rules**

- Nothing reaches `APPROVED` without the client saying so.
- A `NEEDS-CLIENT-INPUT` slot keeps its bracketed placeholder until real copy arrives. Do not guess and downgrade it to `DRAFT`.
- Character budgets are maximums, set from the layout, not targets to fill.
- Voice rules live in `BRAND.md`. Sentences under 25 words, no em-dashes, no banned words.
- When a slot changes status, update this file in the same commit as the code.

**Release gate:** grep this file for `NEEDS-CLIENT-INPUT` and for `[CLIENT TO SUPPLY`. Both must return zero rows before launch.

---

## 1. Global and metadata

| Slot ID | Section | Budget | Status | Current text |
|---|---|---|---|---|
| `META-TITLE` | `<title>` | 60 | DRAFT | Axion Advisory Group · Business and Financial Advisory, Kenya |
| `META-DESC` | meta description | 155 | DRAFT | Business consultancy, financial management, and risk advisory for Kenyan firms. Practical advice from advisors who have run the numbers. |
| `META-OG-ALT` | OG image alt | 120 | DRAFT | Axion Advisory Group logo on a deep navy field. |
| `BRAND-NAME` | logo lockup | 21 | APPROVED | AXION ADVISORY GROUP |
| `BRAND-SHORT` | wordmark | 3 | APPROVED | AAG |
| `BRAND-TAGLINE` | lockup tagline | 40 | NEEDS-CLIENT-INPUT | Your Partner For Business Group `[CLIENT TO CONFIRM: reads as a typo for "Growth". Using literally until confirmed.]` |

## 2. Navigation

| Slot ID | Section | Budget | Status | Current text |
|---|---|---|---|---|
| `NAV-01` | nav item | 12 | DRAFT | About |
| `NAV-02` | nav item | 12 | DRAFT | Services |
| `NAV-03` | nav item | 12 | DRAFT | Approach |
| `NAV-04` | nav item | 12 | DRAFT | Insights |
| `NAV-05` | nav item | 12 | DRAFT | Contact |
| `NAV-CTA` | nav button | 18 | DRAFT | Book a consultation |

Nav must render on one line at desktop. If a sixth item is added, drop `NAV-04` first.

## 3. Hero

Hero copy is capped hard: headline 2 lines, subtext 20 words and 4 lines, CTAs visible without scrolling.

| Slot ID | Section | Budget | Status | Current text |
|---|---|---|---|---|
| `HERO-EYEBROW` | eyebrow | 28 | DRAFT | Nairobi, Kenya |
| `HERO-H1` | headline | 55 | DRAFT | Advisory that survives contact with the numbers. |
| `HERO-SUB` | subtext | 130 | DRAFT | We work with Kenyan firms on strategy, finance, risk, and growth. Seven practice lines, one accountable team. |
| `HERO-CTA-1` | primary CTA | 18 | DRAFT | Book a consultation |
| `HERO-CTA-2` | secondary CTA | 18 | DRAFT | See our services |

One CTA intent per label. `NAV-CTA` and `HERO-CTA-1` deliberately share wording because they share intent.

## 4. About

| Slot ID | Section | Budget | Status | Current text |
|---|---|---|---|---|
| `ABOUT-H2` | headline | 50 | DRAFT | Who we are |
| `ABOUT-LEAD` | lead paragraph | 170 | DRAFT | Axion Advisory Group advises businesses across Kenya on the decisions that move a balance sheet. Strategy, finance, people, and risk, handled by one team. |
| `ABOUT-BODY-1` | body | 320 | NEEDS-CLIENT-INPUT | `[CLIENT TO SUPPLY: founding story. Year established, who founded the firm, why.]` |
| `ABOUT-BODY-2` | body | 320 | NEEDS-CLIENT-INPUT | `[CLIENT TO SUPPLY: team size, qualifications held, professional bodies the firm or its advisors belong to.]` |
| `ABOUT-CTA` | text link | 20 | DRAFT | Read about the firm |

## 5. Credibility strip

Every slot here is a verifiable claim. None may be drafted by us.

| Slot ID | Section | Budget | Status | Current text |
|---|---|---|---|---|
| `STAT-01-VALUE` | stat figure | 10 | NEEDS-CLIENT-INPUT | `[CLIENT TO SUPPLY: years in operation]` |
| `STAT-01-LABEL` | stat label | 24 | NEEDS-CLIENT-INPUT | `[CLIENT TO SUPPLY: label]` |
| `STAT-02-VALUE` | stat figure | 10 | NEEDS-CLIENT-INPUT | `[CLIENT TO SUPPLY: clients advised]` |
| `STAT-02-LABEL` | stat label | 24 | NEEDS-CLIENT-INPUT | `[CLIENT TO SUPPLY: label]` |
| `STAT-03-VALUE` | stat figure | 10 | NEEDS-CLIENT-INPUT | `[CLIENT TO SUPPLY: value advised, in KES]` |
| `STAT-03-LABEL` | stat label | 24 | NEEDS-CLIENT-INPUT | `[CLIENT TO SUPPLY: label]` |
| `CERT-LIST` | certifications | 200 | NEEDS-CLIENT-INPUT | `[CLIENT TO SUPPLY: registrations, licences, professional memberships. Exact legal names only.]` |

If the client cannot supply these, the strip is cut from the design. It is not filled with rounded guesses.

## 6. Services

Seven practice lines from `BRAND.md`. Names are fixed. Descriptions below are ours and avoid the banned-word list, so they differ in wording from the client's own service-line summaries.

| Slot ID | Section | Budget | Status | Current text |
|---|---|---|---|---|
| `SVC-H2` | headline | 40 | DRAFT | What we do |
| `SVC-SUB` | section subtext | 150 | DRAFT | Seven practice lines. Most clients start with one and grow into three. |
| `SVC-01-NAME` | service name | 32 | APPROVED | Business Consultancy |
| `SVC-01-DESC` | service body | 165 | DRAFT | Strategic planning, business development, and operations work. We map where the margin actually sits, then rebuild the plan around it. |
| `SVC-02-NAME` | service name | 32 | APPROVED | Financial Management |
| `SVC-02-DESC` | service body | 165 | DRAFT | Accounting, budgeting, financial planning, and cash-flow management. Monthly numbers you can act on, not just file. |
| `SVC-03-NAME` | service name | 32 | APPROVED | Training & HR Services |
| `SVC-03-DESC` | service body | 165 | DRAFT | Staff development, HR consultancy, and capacity-building programmes. Built around the roles you are actually hiring for. |
| `SVC-04-NAME` | service name | 32 | APPROVED | Loans & Financing |
| `SVC-04-DESC` | service body | 165 | DRAFT | Loan facilitation and disbursement support. We prepare the file, size the facility, and manage the lender conversation. |
| `SVC-05-NAME` | service name | 32 | APPROVED | Risk Management |
| `SVC-05-DESC` | service body | 165 | DRAFT | Risk assessment, mitigation strategy, and compliance work. We name the exposures that would actually stop the business. |
| `SVC-06-NAME` | service name | 32 | APPROVED | Market Entry Support | 
| `SVC-06-DESC` | service body | 165 | DRAFT | International expansion, market research, and regulatory readiness. Groundwork before commitment, so entry is a decision and not a bet. |
| `SVC-07-NAME` | service name | 32 | NEEDS-CLIENT-INPUT | Legal & Regulatory Advisory `[CLIENT TO CONFIRM: obscured in source photo. Do not publish until confirmed.]` |
| `SVC-07-DESC` | service body | 165 | NEEDS-CLIENT-INPUT | `[CLIENT TO SUPPLY: scope of this practice line, once the name is confirmed.]` |

Note: `SVC-*-NAME` slots are `APPROVED` because they come from the client's own materials. Descriptions are `DRAFT` because we wrote them.

## 7. Approach

| Slot ID | Section | Budget | Status | Current text |
|---|---|---|---|---|
| `APP-H2` | headline | 45 | DRAFT | How we work |
| `APP-SUB` | section subtext | 150 | DRAFT | Four stages. You get a written position at the end of each one. |
| `APP-01-NAME` | stage name | 20 | DRAFT | Diagnose |
| `APP-01-DESC` | stage body | 140 | DRAFT | We read the accounts, talk to your people, and write down what we find. No recommendations yet. |
| `APP-02-NAME` | stage name | 20 | DRAFT | Prioritise |
| `APP-02-DESC` | stage body | 140 | DRAFT | We rank what we found by cost of inaction, then agree the order of work with you. |
| `APP-03-NAME` | stage name | 20 | DRAFT | Build |
| `APP-03-DESC` | stage body | 140 | DRAFT | Models, systems, filings, training. The work itself, on an agreed schedule. |
| `APP-04-NAME` | stage name | 20 | DRAFT | Hand over |
| `APP-04-DESC` | stage body | 140 | DRAFT | Your team runs it without us. We document the process and stay reachable. |

Stage labels are the verb itself. No "Stage 1 / Stage 2" prefixes.

## 8. Proof

| Slot ID | Section | Budget | Status | Current text |
|---|---|---|---|---|
| `PROOF-H2` | headline | 45 | DRAFT | Client work |
| `CASE-01-CLIENT` | case client | 60 | NEEDS-CLIENT-INPUT | `[CLIENT TO SUPPLY: client name, and written permission to name them]` |
| `CASE-01-SECTOR` | case sector | 30 | NEEDS-CLIENT-INPUT | `[CLIENT TO SUPPLY: sector]` |
| `CASE-01-PROBLEM` | case body | 200 | NEEDS-CLIENT-INPUT | `[CLIENT TO SUPPLY: the problem as the client described it]` |
| `CASE-01-OUTCOME` | case body | 200 | NEEDS-CLIENT-INPUT | `[CLIENT TO SUPPLY: measured outcome. Figures must be ones the client will stand behind.]` |
| `QUOTE-01-TEXT` | testimonial | 180 | NEEDS-CLIENT-INPUT | `[CLIENT TO SUPPLY: testimonial, max 3 lines, with written permission to publish]` |
| `QUOTE-01-NAME` | attribution | 40 | NEEDS-CLIENT-INPUT | `[CLIENT TO SUPPLY: full name]` |
| `QUOTE-01-ROLE` | attribution | 60 | NEEDS-CLIENT-INPUT | `[CLIENT TO SUPPLY: role and company]` |

Testimonials and case studies are the highest-liability slots on the site. No composite clients, no anonymised-but-plausible outcomes, no illustrative figures. If the client supplies nothing, this section does not ship.

## 9. Closing call to action

| Slot ID | Section | Budget | Status | Current text |
|---|---|---|---|---|
| `CTA-H2` | headline | 55 | DRAFT | Start with a conversation about the numbers. |
| `CTA-SUB` | subtext | 140 | DRAFT | Tell us what is in front of you. We will say whether we are the right firm for it. |
| `CTA-BTN` | button | 18 | DRAFT | Book a consultation |

## 10. Contact

| Slot ID | Section | Budget | Status | Current text |
|---|---|---|---|---|
| `CON-H2` | headline | 40 | DRAFT | Contact |
| `CON-ADDRESS` | office address | 120 | NEEDS-CLIENT-INPUT | `[CLIENT TO SUPPLY: registered office address]` |
| `CON-PHONE` | phone | 20 | NEEDS-CLIENT-INPUT | `[CLIENT TO SUPPLY: telephone]` |
| `CON-EMAIL` | email | 60 | NEEDS-CLIENT-INPUT | `[CLIENT TO SUPPLY: contact email]` |
| `CON-HOURS` | office hours | 100 | NEEDS-CLIENT-INPUT | `[CLIENT TO SUPPLY: office hours]` |
| `FORM-NAME` | field label | 20 | DRAFT | Full name |
| `FORM-EMAIL` | field label | 20 | DRAFT | Email |
| `FORM-COMPANY` | field label | 20 | DRAFT | Company |
| `FORM-PHONE` | field label | 20 | DRAFT | Phone |
| `FORM-INTEREST` | field label | 28 | DRAFT | Which service |
| `FORM-MESSAGE` | field label | 20 | DRAFT | Message |
| `FORM-SUBMIT` | button | 16 | DRAFT | Send enquiry |
| `FORM-SUCCESS` | success state | 110 | DRAFT | Received. We reply within two business days. |
| `FORM-ERROR` | error state | 110 | DRAFT | That did not send. Try again, or email us directly. |

Labels sit above inputs. No placeholder-as-label.

## 11. Footer

| Slot ID | Section | Budget | Status | Current text |
|---|---|---|---|---|
| `FOOT-BLURB` | footer blurb | 140 | DRAFT | Business and financial advisory for Kenyan firms. |
| `FOOT-COL-1` | column heading | 20 | DRAFT | Services |
| `FOOT-COL-2` | column heading | 20 | DRAFT | Firm |
| `FOOT-COL-3` | column heading | 20 | DRAFT | Contact |
| `FOOT-LEGAL` | copyright | 80 | NEEDS-CLIENT-INPUT | © [CLIENT TO SUPPLY: registered entity name] `[CLIENT TO SUPPLY: year]`. All rights reserved. |
| `FOOT-REG` | registration line | 120 | NEEDS-CLIENT-INPUT | `[CLIENT TO SUPPLY: company registration number, or omit this line entirely]` |

## 12. System states

| Slot ID | Section | Budget | Status | Current text |
|---|---|---|---|---|
| `404-H1` | 404 headline | 40 | DRAFT | That page is not here. |
| `404-BODY` | 404 body | 120 | DRAFT | The link may be old. Start from the homepage, or tell us what you were looking for. |
| `404-CTA` | 404 button | 20 | DRAFT | Back to homepage |
| `EMPTY-INSIGHTS` | empty state | 120 | DRAFT | No articles published yet. |
| `COOKIE-BODY` | cookie notice | 160 | NEEDS-CLIENT-INPUT | `[CLIENT TO SUPPLY: cookie and data-protection wording, reviewed against the Kenya Data Protection Act]` |

Legal and consent copy is never drafted by us.

---

## Register summary

| Status | Count |
|---|---|
| APPROVED | 9 |
| DRAFT | 58 |
| NEEDS-CLIENT-INPUT | 27 |
| **Total slots** | **94** |

Twenty-seven slots block release. The largest clusters are the credibility strip, the proof section, and contact details, which is expected: those are exactly the slots that carry verifiable claims.
