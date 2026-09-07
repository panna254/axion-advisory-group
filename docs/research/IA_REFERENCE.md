# IA Reference — homepage topology

**Scope of this document.** Structural reference only, captured under the scope override recorded in `AGENTS.md` rule 5. One human-initiated page load, topology taken, session closed. No subpage crawl, no repeat requests.

**What is deliberately absent, and why.** No verbatim copy, no colour values, no font names, no measurements, no asset paths, no client names, no figures, no testimonials. Every copy slot is described by function and length band. This file exists to answer "what sections, in what order, doing what job" and nothing else. If you need a number or a string, it is not here on purpose.

**Extraction method.** DOM structure and computed layout properties only. Scripts were written to return counts, element types, grid-column arithmetic, and position values, never `textContent`. Interaction models were determined by scrolling and observing before any click, per the skill's Principle 6.

---

## 1. Page shape

| Property | Value |
|---|---|
| Content sections | 12 `<section>` elements |
| Chrome | Sticky header, footer, one fixed consent overlay |
| Document height at 1440 | ~10,000px |
| Document height at 768 | ~15,300px |
| Document height at 390 | ~15,000px |
| Framework | None. Server-rendered pages, one stylesheet, one script |

The page alternates between three background band treatments across sections, producing a light / light / dark rhythm. Recorded as structural rhythm only; no values taken.

---

## 2. Navigation model

| Property | Observed |
|---|---|
| Position | Sticky, persists through scroll |
| Height | Constant at every breakpoint tested |
| Primary items | 6 |
| Header CTA | None. The header carries navigation only |
| Desktop behaviour | Single line, no wrap |
| Below 768 | Nav collapses, hamburger toggle appears |
| Brand element | Mark plus two-line lockup, links to home |

**Note for our build:** no header CTA is a missed conversion surface on a services site. Flagged in the critique.

---

## 3. Section inventory

Order is top to bottom as rendered. "Job" is my reading of the section's role in the sales funnel.

### 3.1 Hero carousel

- **Job:** Value proposition and first CTA pair. Carries the entire above-fold argument.
- **Content types:** 3 rotating slides. Per slide: 1 eyebrow, 1 H1, 1 body paragraph, 2 CTAs. Controls are prev, next, and 3 position dots.
- **Copy slots:** eyebrow, 2-4 words · H1, 6-9 words · body, 25-35 words · CTA labels, 2-3 words each.
- **CTAs:** 6 total across slides, pointing to a tenders index, a services index, a projects index, an about page, and a contact page.
- **Layout family:** single column, left-aligned, over a full-bleed background.
- **Interaction model:** **time-driven and click-driven.** Confirmed auto-advance by sampling the active indicator across a 7-second window without interacting; the active slide changed on its own. Manual controls also present.
- **Assessment:** three H1s ship on one page because each slide carries its own. Structural defect worth not copying.

### 3.2 About

- **Job:** Establish the firm. First trust beat after the pitch.
- **Content types:** 1 H2, 3 body paragraphs, 1 text CTA, 1 portrait-orientation image with a small overlay badge, then a 4-item statistic strip beneath.
- **Copy slots:** H2, 3-4 words · body, 3 paragraphs at 40-55 words each · badge, label plus figure · stat strip, 4 pairs of figure plus 2-3 word label · CTA, 2 words.
- **CTAs:** 1, to an about page.
- **Layout family:** asymmetric split, roughly 58/42 text to image, with a 4-column strip below.
- **Interaction model:** static, with scroll-triggered reveal on entry.

### 3.3 Purpose triptych

- **Job:** Values statement. Conventional consultancy furniture.
- **Content types:** 1 eyebrow, 3 equal panels each with an H3 and a body paragraph. The third panel is denser, carrying four bolded term-and-definition pairs inline.
- **Copy slots:** eyebrow, 2 words · 3 × H3 at 1-2 words · 3 × body at 30-40 words.
- **CTAs:** none.
- **Layout family:** grid-3, equal columns.
- **Interaction model:** static.

### 3.4 Services

- **Job:** Capability disclosure. The commercial core of the page.
- **Content types:** 1 H2, a 6-item accordion, 1 supporting image alongside.
- **Copy slots:** H2, 2 words · 6 × accordion label at 4-7 words · 6 × panel body at 20-30 words · 6 × text CTA at 2 words.
- **CTAs:** 6, each deep-linking to an anchor on a services detail page.
- **Layout family:** asymmetric split, accordion column beside a static image.
- **Interaction model:** **click-driven.** All six panels measured closed at rest, so the section presents as six labels and no substance until the visitor works for it.

### 3.5 Opportunities CTA strip

- **Job:** Route traffic to the two transactional indexes.
- **Content types:** 1 eyebrow, 1 H2, 1 body paragraph, 2 CTAs.
- **Copy slots:** H2, 3-4 words · body, 20-25 words · CTA labels, 2-5 words.
- **CTAs:** 2, to a tenders index and a projects index.
- **Layout family:** single column, centred.
- **Interaction model:** static.

### 3.6 Featured work

- **Job:** Proof by delivery record.
- **Content types:** 1 H2, 4 cards. Each card carries a category tag, a linked H3, a client line, a value line, and a year. Only one of the four has an image.
- **Copy slots:** H2, 2 words · 4 × tag at 1 word · 4 × title at 5-8 words · 4 × client at 3-6 words · 4 × value figure · 4 × year.
- **CTAs:** 4, each to a project detail page.
- **Layout family:** grid-3 holding 4 items, so the fourth card breaks the rhythm and sits wider.
- **Interaction model:** static, hover states on cards.
- **Assessment:** the 3-column grid with 4 children is a planning error, not a design choice. Taste skill §4.7 covers this as the bento cell-count rule.

### 3.7 Testimonials

- **Job:** Proof by voice.
- **Content types:** 1 H2, 3 quote cards, each with a decorative quote glyph, body, and two-line attribution. Two CTAs below.
- **Copy slots:** H2, 4-5 words · 3 × quote body at 55-70 words · 3 × attribution name · 3 × attribution role and company.
- **CTAs:** 2, to a reviews index and a review-submission anchor.
- **Layout family:** grid-3, equal columns.
- **Interaction model:** static.
- **Assessment:** quote bodies run 55-70 words, roughly double a readable landing-page testimonial.

### 3.8 Publications

- **Job:** Thought-leadership signal.
- **Content types:** 4 category tabs, 1 content pane.
- **Copy slots:** H2, 2 words · 4 × tab label at 1-2 words · empty-state line.
- **CTAs:** none.
- **Layout family:** tab bar over a single pane.
- **Interaction model:** **click-driven.** One tab active at rest; the pane renders an empty-state message. The section ships a content system with no content in it.

### 3.9 Gallery

- **Job:** Atmosphere. No commercial function identified.
- **Content types:** 1 H2, 4 image tiles, 2 scroll-direction buttons.
- **Copy slots:** H2, 2 words · tile captions, 1-2 words.
- **CTAs:** none.
- **Layout family:** horizontal scroller.
- **Interaction model:** **click-driven** via the arrow buttons. The track does not overflow at 1440, so the controls are inert at desktop; it does overflow at 768 and below, where they become functional.
- **Assessment:** tiles duplicate. Two distinct images appear twice across four slots.

### 3.10 News

- **Job:** Recency and activity signal.
- **Content types:** 1 H2, 3 `<article>` cards each with a date, a linked H3, a standfirst, and a read-more link. One index CTA below.
- **Copy slots:** H2, 2 words · 3 × date · 3 × headline at 8-14 words · 3 × standfirst at 30-45 words.
- **CTAs:** 7 total. Each card carries two links to the same destination, title and read-more, plus one index CTA.
- **Layout family:** grid-3.
- **Interaction model:** static.
- **Assessment:** most recent item predates capture by roughly a year. A stale news section reads as an abandoned site.

### 3.11 Vertical categories

- **Job:** Segment the offer by industry vertical.
- **Content types:** 1 eyebrow, 1 H2, 4 cards each with an H3, a body paragraph, and a text CTA.
- **Copy slots:** H2, 3-4 words · 4 × H3 at 1-3 words · 4 × body at 15-20 words · 4 × CTA at 2 words.
- **CTAs:** 4, each to a filtered category index.
- **Layout family:** grid-2 holding 4 items, so a clean 2×2.
- **Interaction model:** static.

### 3.12 Contact

- **Job:** Conversion.
- **Content types:** office block with address, phone, email, and an hours sub-block, beside a 7-field form. Fields are name, email, company, phone, subject, an inquiry-type select, and a message textarea, plus an arithmetic verification input and a submit button.
- **Copy slots:** H2, 2 words · field labels, 1-2 words each · select options, 5 entries at 1-2 words · submit label, 2 words.
- **CTAs:** 1 submit, plus a tel and a mailto link.
- **Layout family:** asymmetric split; the form itself uses paired two-up field rows.
- **Interaction model:** static form, no client-side validation states observed at rest.
- **Assessment:** arithmetic captcha rather than a standard anti-spam mechanism. Accessible in principle, hostile in practice.

### 3.13 Footer

- **Job:** Secondary navigation and legitimacy signals.
- **Content types:** 4 columns. Brand blurb, a 7-item quick-links list, an office block, and a portals list. Below: copyright line and two accreditation labels.
- **Layout family:** grid-4 collapsing to stacked.
- **Interaction model:** static.
- **Assessment:** carries a "Connect" heading with nothing beneath it, and one portal link pointing at a null href.

### 3.14 Consent overlay

- **Job:** Compliance.
- **Content types:** heading, body line, 3 buttons.
- **Layout family:** fixed band.
- **Interaction model:** click-driven.

---

## 4. Interaction model summary

| Model | Sections |
|---|---|
| Time-driven | Hero only, auto-advancing |
| Click-driven | Hero controls, services accordion, publications tabs, gallery scroller, consent overlay |
| Scroll-driven | Reveal-on-entry applied page-wide as a single mechanism |
| Static | About, purpose, opportunities strip, featured work, testimonials, news, verticals, contact, footer |

Page-wide the reveal mechanism is applied by a shared class on nearly every section, with transitions declared on roughly 144 elements. There is no scroll-snap, no smooth-scroll library, no pinning, and no scroll-driven state switching. The header is the only sticky element with behaviour.

**Practical consequence:** a full-page screenshot captures most sections blank, because reveal targets sit at zero opacity until intersected. Any visual QA against this reference must scroll each section into view first.

---

## 5. Responsive collapse

| Section | 1440 | 768 | 390 |
|---|---|---|---|
| Header nav | 6 items, one line | hidden, hamburger | hidden, hamburger |
| Header height | constant | constant | constant |
| About body | 2-col split | 1-col | 1-col |
| About stat strip | 4-col | 2-col | 1-col |
| Purpose triptych | 3-col | 1-col | 1-col |
| Services | 2-col split | 1-col | 1-col |
| Featured work | 3-col | 1-col | 1-col |
| Testimonials | 3-col | 1-col | 1-col |
| Gallery | fits, controls inert | overflows, controls live | overflows |
| News | 3-col | 1-col | 1-col |
| Verticals | 2×2 | 1-col | 1-col |
| Contact | 2-col split | 1-col | 1-col |
| Field pairs | 2-up | stacked | stacked |

**Breakpoint reading.** One major breakpoint sits just below 1024, where every multi-column grid drops straight to single column. The only two-stage collapse is the about stat strip, 4 → 2 → 1. No horizontal overflow at 390.

**Assessment.** The collapse is a cliff, not a ladder. Everything falls to one column at the same point, which is why document height inflates by roughly 50% from 1440 to 768. Nothing regroups to 2-col at tablet, so tablet gets the mobile layout on a wide screen.

---

## 6. Structural defects catalogued

Recorded so we avoid reproducing them.

1. Three `<h1>` elements, one per carousel slide.
2. Grid-3 containing 4 cards in featured work.
3. Publications section shipping four tabs and zero content.
4. Gallery with duplicated tiles and controls inert at desktop.
5. News stale by roughly a year.
6. Footer heading with no content beneath, and a null-href link.
7. Single-cliff responsive collapse with no tablet-specific regrouping.
8. Testimonial bodies at roughly double a readable length.
9. No header CTA anywhere in the sticky chrome.
10. Section eyebrows numbered sequentially across the page. Note that this, the reference's most distinctive motif, is explicitly banned by the active taste skill under §9.F as a section-numbering eyebrow. We take the section *sequence* from this reference and none of its labelling convention.
