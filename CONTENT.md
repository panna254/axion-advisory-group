# Axion Advisory Group Content Register

**This site represents a real company. You may not invent client names, testimonials, case-study outcomes, contract values, staff counts, founding dates, certifications, awards, office locations, or regulatory registrations. Any slot requiring a verifiable claim is created with status NEEDS-CLIENT-INPUT and bracketed placeholder text such as `[CLIENT TO SUPPLY: year founded]`. A placeholder that ships is a bug. A fabricated credential is a liability.**

---

## How to use this register

One row per copy slot. Every slot has an ID, a section, a budget, a status, and its current text.

**Status values**

| Status | Meaning |
|---|---|
| `DRAFT` | Written by us. Editable. Safe to ship if it survives review. |
| `NEEDS-CLIENT-INPUT` | Contains or requires a verifiable claim we cannot source. Blocks release. |
| `APPROVED` | Signed off by the client. Do not edit without asking. |

**Budgets**

A bare number is a character maximum. A value suffixed `w` is a word range, used where the brief set one (the service summaries and detail blocks). Both are maximums taken from the layout, not targets to fill.

**Rules**

- Nothing reaches `APPROVED` without the client saying so.
- A `NEEDS-CLIENT-INPUT` slot keeps its bracketed placeholder until real copy arrives. Do not guess and downgrade it to `DRAFT`.
- Voice rules live in `BRAND.md`. Sentences under 25 words, zero em-dashes, no banned words.
- Kenyan English throughout. Currency is written `KES 1.2M` or `KES 450,000`.
- Every CTA label is a specific verb plus a specific object. No "Learn more", no "Get started".
- One label per CTA intent. Three slots share "Book a consultation" on purpose.
- When a slot changes status, update this file in the same commit as the code.

**Release gate:** grep this file for `NEEDS-CLIENT-INPUT` and for `[CLIENT TO SUPPLY`. Both must return zero rows before launch.

**Section order.** Sections 2 to 12 follow the approved sequence in `docs/research/IA_CRITIQUE.md`, which runs pitch, fork, offer, method, firm, proof. That is a change from this register's previous order, which put About and the credibility strip ahead of Services. Sections 1 and 13 are not page sections and sit outside the sequence.

---

## 1. Global and metadata

| Slot ID | Section | Budget | Status | Current text |
|---|---|---|---|---|
| `META-TITLE` | `<title>` | 60 | DRAFT | Axion Advisory Group · Business & Financial Advisory, Kenya |
| `META-DESC` | meta description | 155 | DRAFT | Business consultancy, financial management, risk, financing, training, and market entry advisory for Kenyan firms. Based in Nairobi. |
| `META-OG-ALT` | OG image alt | 120 | DRAFT | The Axion Advisory Group mark and wordmark on a deep navy field. |
| `BRAND-NAME` | logo lockup | 21 | APPROVED | AXION ADVISORY GROUP |
| `BRAND-SHORT` | wordmark | 3 | APPROVED | AAG |
| `BRAND-TAGLINE` | lockup tagline | 40 | NEEDS-CLIENT-INPUT | Your Partner For Business Group `[CLIENT TO CONFIRM: reads as a typo for "Growth". Using literally until confirmed.]` |

## 2. Navigation (sticky header)

| Slot ID | Section | Budget | Status | Current text |
|---|---|---|---|---|
| `NAV-01` | nav item | 12 | DRAFT | Services |
| `NAV-02` | nav item | 12 | DRAFT | Approach |
| `NAV-03` | nav item | 12 | DRAFT | About |
| `NAV-04` | nav item | 12 | DRAFT | Insights |
| `NAV-05` | nav item | 12 | DRAFT | Contact |
| `NAV-CTA` | nav button | 20 | DRAFT | Book a consultation |

Nav order follows page order. Must render on one line at desktop. If a sixth item is added, drop `NAV-04` first, since Insights has no content until `EMPTY-INSIGHTS` is retired.

## 3. Hero

Hero copy is capped hard: headline 2 lines, subtext 20 words and 4 lines, CTAs visible without scrolling.

| Slot ID | Section | Budget | Status | Current text |
|---|---|---|---|---|
| `HERO-EYEBROW` | eyebrow | 28 | DRAFT | Nairobi, Kenya |
| `HERO-H1` | headline | 55 | DRAFT | We advise Kenyan firms on strategy, finance, and risk. |
| `HERO-SUB` | subtext | 130 | DRAFT | Seven practice lines, from business consultancy to market entry. Work starts with reading your accounts. |
| `HERO-CTA-1` | primary CTA | 20 | DRAFT | Book a consultation |
| `HERO-CTA-2` | secondary CTA | 18 | DRAFT | See how we work |

`HERO-EYEBROW` is the page's only eyebrow. It carries the one fact the headline does not.

`HERO-CTA-2` points at the method section, not at Services. The buyer fork sits one screen below the hero and already routes to Services, so a secondary CTA pointing there would be dead weight.

**Headline alternates considered.** Kept here in case the client prefers one. All fit the 55-character budget: "Business, finance, and risk advisory for Kenyan firms." (54) · "Advisory for Kenyan firms, across seven practice lines." (55) · "Strategy, finance, people, and risk. From Nairobi." (50) · "We advise Kenyan businesses on money, people, and risk." (55)

## 4. Buyer fork

Two doors below the hero, labelled by need rather than by service name. Resolves the two-buyer problem set out in `IA_CRITIQUE.md` section 3.1: the owner-operator raising working capital and the finance or compliance lead answering a board.

| Slot ID | Section | Budget | Status | Current text |
|---|---|---|---|---|
| `FORK-H2` | headline | 40 | DRAFT | Two ways in |
| `FORK-SUB` | section subtext | 90 | DRAFT | Both routes reach the same firm. They start in different places. |
| `FORK-01-LABEL` | door label | 28 | DRAFT | Funding and growth |
| `FORK-01-BODY` | door body | 130 | DRAFT | You need working capital, a lender who will say yes, or a plan for the next stage of the business. |
| `FORK-01-CTA` | door CTA | 24 | DRAFT | See funding and growth |
| `FORK-02-LABEL` | door label | 28 | DRAFT | Risk and compliance |
| `FORK-02-BODY` | door body | 130 | DRAFT | A board, a regulator, or a lender is asking questions about exposure, controls, and who signs off. |
| `FORK-02-CTA` | door CTA | 24 | DRAFT | See risk and compliance |

Two doors, not three. A third would turn the fork into a card row and undo the point of it.

## 5. Services

Seven practice lines from `BRAND.md`, grouped into four clusters so the section reads as an offer rather than a menu. Names are the client's own and are fixed: "Loans & Financing" stays "Loans & Financing". Summaries and detail blocks are ours, so they avoid the banned-word list and differ in wording from the client's service-line summaries.

### 5.1 Section frame and clusters

| Slot ID | Section | Budget | Status | Current text |
|---|---|---|---|---|
| `SVC-H2` | headline | 40 | DRAFT | What we do |
| `SVC-SUB` | section subtext | 150 | DRAFT | Seven practice lines in four groups. Each line is scoped on its own, and they can be combined in one engagement. |
| `CLU-01-NAME` | cluster label | 16 | DRAFT | Growth |
| `CLU-01-BODY` | cluster body | 130 | DRAFT | Where the next shilling of revenue comes from, and whether a new market is worth entering. |
| `CLU-02-NAME` | cluster label | 16 | DRAFT | Funding |
| `CLU-02-BODY` | cluster body | 130 | DRAFT | Books that close, forecasts that hold, and a lender file that stands up to a credit committee. |
| `CLU-03-NAME` | cluster label | 16 | DRAFT | Risk |
| `CLU-03-BODY` | cluster body | 130 | DRAFT | The exposures that would stop the business, ranked and owned, with the compliance work that follows. |
| `CLU-04-NAME` | cluster label | 16 | DRAFT | People |
| `CLU-04-BODY` | cluster body | 130 | DRAFT | Training built around the roles you are hiring for, and the HR structure underneath them. |

Cluster membership: **Growth** holds `SVC-01` and `SVC-06`. **Funding** holds `SVC-02` and `SVC-04`. **Risk** holds `SVC-05` and, once confirmed, `SVC-07`. **People** holds `SVC-03`.

`CLU-03-BODY` names no practice line, so the Risk cluster renders correctly whether `SVC-07` clears or not.

**Growth** and **Funding** sit behind `FORK-01`. **Risk** sits behind `FORK-02`. **People** is reachable from both.

### 5.2 Practice lines

| Slot ID | Section | Budget | Status | Current text |
|---|---|---|---|---|
| `SVC-01-NAME` | card title | 32 | APPROVED | Business Consultancy |
| `SVC-01-SUMMARY` | card summary | 12-18 w | DRAFT | Strategic planning, business development, and operations work for firms deciding where to put the next shilling. |
| `SVC-01-DETAIL` | detail body | 60-90 w | DRAFT | We start with how the business actually earns, not how the org chart says it should. That means reading the revenue by line, costing the work properly, and finding where margin leaks. From there we rebuild the plan: what to grow, what to stop, and what to fix first. Strategic planning, business development, and operations work sit together because separating them is how plans end up on a shelf. |
| `SVC-02-NAME` | card title | 32 | APPROVED | Financial Management |
| `SVC-02-SUMMARY` | card summary | 12-18 w | DRAFT | Accounting, budgeting, financial planning, and cash-flow management, reported monthly in figures you can act on. |
| `SVC-02-DETAIL` | detail body | 60-90 w | DRAFT | Books that close on time are the floor, not the service. We build the budget against real operating history, forecast cash week by week, and tell you when the gap arrives before it does. Where the numbers are already messy, we clean them first: reconciliations, the chart of accounts, and the reporting pack. Accounting, budgeting, financial planning, and cash-flow management, run so that the monthly numbers are a management document rather than a filing obligation. |
| `SVC-03-NAME` | card title | 32 | APPROVED | Training & HR Services |
| `SVC-03-SUMMARY` | card summary | 12-18 w | DRAFT | Staff development, HR consultancy, and capacity-building programmes, built around the roles you are actually hiring for. |
| `SVC-03-DETAIL` | detail body | 60-90 w | DRAFT | Training goes wrong when it is bought by topic instead of by gap. We look at what the role has to deliver, what the person can do today, and what sits between the two. Then we design the programme against that, whether it runs in a session or over a quarter. The HR side covers contracts, structures, appraisal, and the paperwork that becomes a problem only when someone leaves. Capacity building is judged on what the team can do afterwards. |
| `SVC-04-NAME` | card title | 32 | APPROVED | Loans & Financing |
| `SVC-04-SUMMARY` | card summary | 12-18 w | DRAFT | Loan facilitation and disbursement support. We prepare the file, size the facility, and manage the lender. |
| `SVC-04-DETAIL` | detail body | 60-90 w | DRAFT | Most rejected applications fail on the file, not the business. We assemble what a Kenyan lender will actually ask for. Audited or management accounts, cash-flow projections that reconcile to them, security documents, and a clear statement of use. We size the facility against what the business can service, which is often less than what it can be offered. Then we run the lender conversation with you and stay in it through drawdown, covenants, and repayment. |
| `SVC-05-NAME` | card title | 32 | APPROVED | Risk Management |
| `SVC-05-SUMMARY` | card summary | 12-18 w | DRAFT | Risk assessment, mitigation strategy, and compliance work. We name the exposures that would actually stop the business. |
| `SVC-05-DETAIL` | detail body | 60-90 w | DRAFT | A risk register is only useful if it is ranked and someone owns each line. We work through the exposures that would genuinely halt trading: concentration in one customer, a single supplier, key-person dependency, currency movement, and regulatory breach. Each one gets a likelihood, a cost, an owner, and a control. Compliance work follows the same order, starting with the obligations that carry penalties and moving down. You get a document your board can question. |
| `SVC-06-NAME` | card title | 32 | APPROVED | Market Entry Support |
| `SVC-06-SUMMARY` | card summary | 12-18 w | DRAFT | International expansion, market research, and regulatory readiness, so entry is a decision rather than a bet. |
| `SVC-06-DETAIL` | detail body | 60-90 w | DRAFT | Entering a new market costs most when the groundwork is skipped. We size the demand, price against who is already there, and work out what registration, licensing, and tax actually require before anything is committed. For firms coming into Kenya, that includes company registration, tax obligations, and sector licensing. For Kenyan firms going out, it means the same questions asked of the target market. The output is a written position on whether to enter, when, and at what cost. |
| `SVC-07-NAME` | card title | 32 | NEEDS-CLIENT-INPUT | Legal & Regulatory Advisory `[CLIENT TO CONFIRM: obscured in source photo. Do not publish until confirmed.]` |
| `SVC-07-SUMMARY` | card summary | 12-18 w | NEEDS-CLIENT-INPUT | `[CLIENT TO SUPPLY: scope of this practice line, once the name is confirmed.]` |
| `SVC-07-DETAIL` | detail body | 60-90 w | NEEDS-CLIENT-INPUT | `[CLIENT TO SUPPLY: detail for this practice line, once the name is confirmed.]` |

`SVC-0n-NAME` slots are `APPROVED` because they come from the client's own materials. Summaries and detail blocks are `DRAFT` because we wrote them.

Renamed from the previous register: `SVC-0n-DESC` is now `SVC-0n-SUMMARY`, and `SVC-0n-DETAIL` is new. `src/types/service.ts` still refers to `SVC-0n-DESC` in a comment and needs the same rename.

## 6. How we work

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
| `APP-START` | how engagements start | 160 | NEEDS-CLIENT-INPUT | `[CLIENT TO SUPPLY: what a first engagement involves, whether the first meeting is chargeable, and the smallest scope the firm will take on.]` |

Stage labels are the verb itself. No "Stage 1 / Stage 2" prefixes.

`APP-START` answers the objection named in `IA_CRITIQUE.md` section 3.6. It is a commercial commitment, so we cannot draft it. The section reads correctly without it.

## 7. About

| Slot ID | Section | Budget | Status | Current text |
|---|---|---|---|---|
| `ABOUT-H2` | headline | 50 | DRAFT | Who we are |
| `ABOUT-LEAD` | lead paragraph | 170 | DRAFT | Axion Advisory Group advises businesses across Kenya on the decisions that move a balance sheet. Strategy, finance, people, and risk sit in one practice. |
| `ABOUT-BODY-1` | body | 320 | NEEDS-CLIENT-INPUT | `[CLIENT TO SUPPLY: founding story. Year established, who founded the firm, why.]` |
| `ABOUT-BODY-2` | body | 320 | NEEDS-CLIENT-INPUT | `[CLIENT TO SUPPLY: team size, qualifications held, professional bodies the firm or its advisers belong to.]` |
| `ABOUT-CTA` | text link | 20 | DRAFT | Read about the firm |

About sits after the offer and the method. The buyer arrives with a problem, not with curiosity about the firm.

## 8. Credibility and qualification

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

If the client cannot supply these, the section is cut from the design. It is not filled with rounded guesses. Per `IA_CRITIQUE.md` section 3.4 the page must argue its case with this section absent.

## 9. Proof

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

## 10. Closing call to action

| Slot ID | Section | Budget | Status | Current text |
|---|---|---|---|---|
| `CTA-H2` | headline | 55 | DRAFT | Start with a conversation about the numbers. |
| `CTA-SUB` | subtext | 140 | DRAFT | Tell us what is in front of you. We will say whether we are the right firm for it. |
| `CTA-BTN` | button | 20 | DRAFT | Book a consultation |

## 11. Contact

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
| `FORM-INTEREST-OPTIONS` | select options | 90 | DRAFT | Growth, Funding, Risk, People, Not sure yet |
| `FORM-MESSAGE` | field label | 20 | DRAFT | Message |
| `FORM-CONSENT` | consent line | 200 | NEEDS-CLIENT-INPUT | `[CLIENT TO SUPPLY: data-protection consent wording for the enquiry form, reviewed against the Kenya Data Protection Act]` |
| `FORM-SUBMIT` | button | 16 | DRAFT | Send enquiry |
| `FORM-SUCCESS` | success state | 110 | DRAFT | Received. We will reply to the email address you gave. |
| `FORM-SLA` | success state, second line | 90 | NEEDS-CLIENT-INPUT | `[CLIENT TO SUPPLY: response-time commitment for enquiries, or confirm this line is omitted]` |
| `FORM-ERROR` | error state | 110 | DRAFT | That did not send. Try again, or email us directly. |

Labels sit above inputs. No placeholder-as-label. No arithmetic captcha.

`FORM-INTEREST-OPTIONS` mirrors the four service clusters, so an enquiry arrives already routed to the door the visitor came through.

`FORM-SLA` was carved out of the old success message, which promised a reply within two business days. That is a commitment the firm has to be able to keep, so it is the client's to make.

## 12. Footer

| Slot ID | Section | Budget | Status | Current text |
|---|---|---|---|---|
| `FOOT-BLURB` | footer blurb | 140 | DRAFT | Business and financial advisory for Kenyan firms. |
| `FOOT-COL-1` | column heading | 20 | DRAFT | Services |
| `FOOT-COL-2` | column heading | 20 | DRAFT | Firm |
| `FOOT-COL-3` | column heading | 20 | DRAFT | Contact |
| `FOOT-PRIVACY` | legal link label | 20 | DRAFT | Privacy notice |
| `FOOT-LEGAL` | copyright | 80 | NEEDS-CLIENT-INPUT | © `[CLIENT TO SUPPLY: registered entity name]` `[CLIENT TO SUPPLY: year]`. All rights reserved. |
| `FOOT-REG` | registration line | 120 | NEEDS-CLIENT-INPUT | `[CLIENT TO SUPPLY: company registration number, or omit this line entirely]` |

`FOOT-PRIVACY` is the link label only. The document it points to is the client's, and its wording sits with `COOKIE-BODY` and `FORM-CONSENT`.

## 13. System states

| Slot ID | Section | Budget | Status | Current text |
|---|---|---|---|---|
| `404-H1` | 404 headline | 40 | DRAFT | That page is not here. |
| `404-BODY` | 404 body | 120 | DRAFT | The link may be old. Start from the homepage, or tell us what you were looking for. |
| `404-CTA` | 404 button | 20 | DRAFT | Go to the homepage |
| `EMPTY-INSIGHTS` | empty state | 120 | DRAFT | No articles published yet. |
| `COOKIE-BODY` | cookie notice | 160 | NEEDS-CLIENT-INPUT | `[CLIENT TO SUPPLY: cookie and data-protection wording, reviewed against the Kenya Data Protection Act]` |

Legal and consent copy is never drafted by us.

---

## Register summary

| Status | Count |
|---|---|
| APPROVED | 8 |
| DRAFT | 81 |
| NEEDS-CLIENT-INPUT | 30 |
| **Total slots** | **119** |

Thirty slots block release. The largest clusters are the proof section, the credibility strip, and contact details, which is expected: those are the slots that carry verifiable claims. The three additions since the last count are `APP-START`, `FORM-CONSENT`, and `FORM-SLA`, each one a commitment or a legal text we are not entitled to write.

The previous summary recorded 9 `APPROVED`. The correct figure was 8: `BRAND-NAME`, `BRAND-SHORT`, and six practice-line names. `SVC-07-NAME` is unconfirmed and has never been approved.
