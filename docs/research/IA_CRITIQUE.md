# IA Critique — what to keep, drop, and add

Engineering judgement on the reference topology in `IA_REFERENCE.md`, read against Axion Advisory Group: a Kenyan multi-service advisory firm with seven practice lines, per `BRAND.md`.

The reference is a tendering-intelligence specialist. Axion is not. Structural overlap is real but partial, and the differences matter more than the similarities.

---

## Part 1 — Sections that earn their place

### Sticky header
Advisory is a considered purchase read over several minutes of scrolling. Persistent navigation is correct. **We improve on it:** the reference's header carries navigation and no CTA, which wastes the only element guaranteed to be on screen at every scroll position. Ours takes one.

### Hero
Necessary, but not as built. **We take the slot and reject the mechanism.** A three-slide auto-advancing carousel means the firm could not decide what it does, so it says three things and hopes one lands. It also ships three `<h1>` elements. One firm, one proposition, one H1.

### About
Earns its place emphatically. Advisory sells on who you are before what you do, more so in a market where the buyer is choosing between a firm and a person they were referred to. This is the highest-value non-service section on the page.

### Services
The commercial core, and the section needing the most structural change for Axion. Discussed in Part 3.

### Contact with a real form
Correct. Advisory enquiries are qualified, not impulse. A form that captures company and enquiry type lets the firm route and prepare before first contact, which is worth more than a bare mailto. **We reject the arithmetic captcha.** It is friction on the single highest-value interaction on the site.

### Footer as secondary navigation
Standard and correct. Users who scroll to the bottom without converting are looking for a reason to trust or a different door.

### Proof sections, conditionally
Featured work and testimonials do real work for an advisory firm, and the reference is right to carry both. For Axion they are **structurally approved but content-blocked**: `CONTENT.md` has every case-study and testimonial slot at `NEEDS-CLIENT-INPUT`, 27 blocked slots in total. See the sequencing consequence in Part 3.

---

## Part 2 — Dead weight

### Purpose triptych — cut
Mission, Vision, Values in three equal panels is the single most skippable block in consultancy web design. Nobody has ever chosen an advisor because of a vision statement. It is also a 3-equal-column card row, which the active taste skill bans outright under §9.C. If any of it survives, it survives as one clause inside the About copy.

### Publications with empty tabs — cut until there is content
The reference ships four category tabs over an empty-state message. This is worse than having no section: it advertises a content programme, then proves it is not running. Axion adds this when there is a second article to put in it, not before.

### Photo gallery — cut
No commercial function for an advisory firm. The reference's own implementation makes the case: four tiles containing two duplicated stock images, with scroll controls that are inert at desktop because the track does not overflow. Even executed perfectly, a gallery answers a question nobody asked of an accountant.

### Vertical categories — cut
The reference segments by industry vertical because its work is capital-project tendering. Axion's differentiation is functional, not sectoral. Recreating this would mean inventing verticals Axion has not claimed, which `AGENTS.md` prohibits.

### Opportunities CTA strip — cut
A mid-page routing strip to two transactional indexes. Axion has no equivalent transactional index, so the slot has nothing to point at.

### News — defer
Not filler in principle, but the reference's most recent item predates capture by about a year, which actively signals an abandoned firm. A stale news section is worse than no news section. Axion ships this only with a real publishing commitment behind it.

### Featured work as a 4-in-3 grid — restructure, not cut
The content type stays. The container does not: a three-column grid holding four cards leaves the fourth stranded. Four items means four cells.

**Net effect:** the reference's twelve content sections reduce to roughly five that survive contact with Axion's actual business.

---

## Part 3 — What Axion needs that the reference lacks

### 3.1 The two-buyer problem, which is the central structural issue

Axion sells SME loan facilitation and enterprise risk management from the same page. These are not two products for one buyer. They are two buyers:

| | Loans and financing | Risk and compliance |
|---|---|---|
| Who | Owner-operator | Finance director or compliance lead |
| Trigger | Cash need, dated | Board or regulator pressure |
| Cycle | Days to weeks | One or more quarters |
| Decision | One person | Committee |
| Evaluates on | Can you get it, how fast, what does it cost | Method, credentials, indemnity, references |
| Reads | Process and speed | Governance and qualification |

A single undifferentiated funnel serves neither. The owner-operator scrolling for "can you help me raise working capital" hits a risk-methodology block and leaves. The compliance lead hits loan-facilitation language and downgrades the firm to a broker.

The reference has no answer to this because it does not have the problem: tendering intelligence is one buyer. **Axion needs an explicit fork immediately below the hero.** Two doors, plainly labelled by need rather than by service name, each routing into the same site with a different reading order. Not two websites. One page with two declared entry points that converge at contact.

This is the highest-value structural decision on the project and the one thing the reference cannot teach us.

### 3.2 Seven service lines will not sit in one grid

Seven tiles is past the point where a grid reads as a list of capabilities and starts reading as an undifferentiated menu. The taste skill puts the threshold at five (§4.9). Seven also cannot form an even grid, so any arrangement strands one or two cells.

**Group into four clusters:**

| Cluster | Practice lines |
|---|---|
| Grow | Business Consultancy · Market Entry Support |
| Fund | Financial Management · Loans & Financing |
| Protect | Risk Management · Legal & Regulatory Advisory |
| People | Training & HR Services |

Four cells, four cluster labels, practice lines named inside. This also does load-bearing work for 3.1: **Fund** is the SME door and **Protect** is the enterprise door, so the clusters and the buyer fork reinforce each other instead of competing.

Two constraints on implementation. Legal & Regulatory Advisory is `NEEDS-CLIENT-INPUT`, so **Protect** must render correctly with one line or two. And the clusters are deliberately uneven, which suits a bento with rhythm and rules out four identical tiles.

### 3.3 No process section anywhere

The reference has no "how we work". For tendering that is survivable, since the deliverable is legible. For advisory it is a hole. The buyer's real objection is not "can you do this" but "what will the next eight weeks actually look like, and when do I see something". A four-stage process block answers the objection that otherwise ends the enquiry. `CONTENT.md` already carries these slots drafted.

### 3.4 The site must work with the proof sections absent

Twenty-seven content slots are blocked pending client input, concentrated exactly in the credibility strip, case studies, and testimonials. The reference leans hard on all three.

This is a sequencing constraint, not just a content one. **The page must be persuasive with every proof section removed, and must accept them later without restructuring.** That means proof sits in discrete, omittable bands rather than being braided through the argument. If the case for Axion depends on a statistic nobody has supplied, we have designed something we cannot ship.

### 3.5 Qualification signalling

For financial and risk advisory in Kenya, professional registration and named qualifications carry disproportionate weight, and the enterprise buyer in 3.1 filters on them first. The reference buries its accreditations in a footer strip. Axion needs a defined slot with genuine prominence. Content-blocked, so it is designed and gated like the other proof.

### 3.6 A stated way in

Neither buyer knows what a first engagement costs or commits them to. A short "how engagements start" line, even without pricing, removes the friction that makes a considered buyer close the tab instead of filling the form.

---

## Proposed Axion section sequence

Layout family is noted per section to keep the page clear of the taste skill's repetition rules: no family repeats, and eight content sections carry at least four distinct families.

1. **Sticky header** — five nav items on one line plus a single CTA, correcting the reference's missing conversion surface in permanently visible chrome. *(chrome)*
2. **Hero** — one proposition, one H1, one primary and one secondary CTA, no carousel, because a firm that states three things above the fold has stated nothing. *(asymmetric split)*
3. **Buyer fork** — two labelled doors, funding-and-growth against risk-and-compliance, resolving the two-buyer problem at the earliest point it can be resolved. *(two-up, deliberately not a three-card row)*
4. **Service clusters** — four grouped cells rather than seven tiles, with practice lines named inside and the clusters echoing the fork above. *(bento with uneven rhythm)*
5. **How we work** — four stages answering "what do the next eight weeks look like", the objection the reference leaves standing. *(horizontal stepped sequence)*
6. **About** — who the firm is, placed after the offer because the buyer arrives with a need, not curiosity about the firm. *(text-led with single portrait)*
7. **Credibility and qualification** — registrations and figures in plain inline layout, no cards; fully gated on client input and cleanly removable. *(inline figure row)*
8. **Proof** — case studies and testimonials in one discrete band, designed to be cut whole until content clears. *(quote-led, single column)*
9. **Closing CTA** — one restatement with the same label used in the header, since duplicate CTA intent under different wording is a taste-skill failure. *(full-width band)*
10. **Contact** — routing form with enquiry type feeding the fork from step 3, no arithmetic captcha. *(asymmetric split, form-led)*
11. **Footer** — secondary navigation, office block, legal line. *(grid-4)*

**Reading order rationale.** The reference runs pitch → firm → offer. This runs pitch → fork → offer → method → firm → proof. The buyer arrives with a problem, not with interest in Axion, so the offer and the method precede the biography. Proof lands last because it is the section most likely to be absent at launch, and nothing above it depends on it.

**Sections 7 and 8 are both fully gated.** If client input never arrives, the page ships as nine sections and still argues its case.

---

**Stopping here for approval. Nothing built, no tokens written to `globals.css`, no changes to `layout.tsx`, no assets fetched.**
