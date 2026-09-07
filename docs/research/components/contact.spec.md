# Contact Specification

Section 10 in the approved sequence, layout family **asymmetric split,
form-led**. Rejects the reference's arithmetic captcha per `IA_CRITIQUE.md`:
"friction on the single highest-value interaction on the site."

Reuses `form-field.spec.md` and `cta-button.spec.md` for every field and the
submit button — this file specifies the section frame, the form's field set
and order, and its submit/success/error behavior, not field-level visual
detail already covered by those two specs.

## Overview
- **Target file:** `src/components/sections/contact.tsx`
- **Design reference:** none. Authored from `IA_CRITIQUE.md`'s Contact discussion and `CONTENT.md` §11.
- **Interaction model:** form submission with three states (idle/submitting, success, error); every field's own focus/error/disabled behavior is `form-field.spec.md`'s, not restated here
- **Server/Client:** Client Component (the form itself, for submit state). The static info column beside it can and should be a Server Component; only the `<form>` needs the client boundary.

## DOM Structure

```
<section id="contact" className="py-band">
  <div>                                  max-w-page mx-auto px-md
    <div>                                grid, asymmetric split
      <div>                              info column, ~42%
        <h2>                             CON-H2
        <ul>                             address / phone / hours, each gated
      <div>                              form column, ~58%
        <form>                           idle/submitting state
          <FormField>  x6                name, email, company, phone, interest, message
          <p>                            FORM-CONSENT, gated — blocks submit if absent, see below
          <CtaButton variant="primary" type="submit">   FORM-SUBMIT
        <div>                            success state, replaces the form entirely
          <p>                            FORM-SUCCESS
          <p>                            FORM-SLA, gated
        <div>                            error state, form remains, banner above it
          <p>                            FORM-ERROR
```

## DESIGN SPECIFICATION

### Section
- Band: `py-band` (64 → 112px)
- Surface: paper

### Grid
- `grid grid-cols-1 lg:grid-cols-12 gap-2xl items-start`
- Info column: `lg:col-span-5`
- Form column: `lg:col-span-7`
- A third asymmetric split on the page (with the hero and About) but the only one that is form-led rather than image-led — `IA_CRITIQUE.md`'s layout-family list names it distinctly for that reason, so it does not count as a repeated family under the taste skill's rule

### Info column
- `h2`: `text-h2 font-display font-normal text-foreground mb-lg`
- List: `flex flex-col gap-md`, each item `flex items-start gap-sm`
  - Icon: `IconAddress` / `IconPhone` / `IconHours` (`size="md"`), `text-stroke-systems`
  - Text: `text-body text-foreground`
- Each item independently gated — see States & Behaviors

### Form column — field grid
- `grid grid-cols-1 sm:grid-cols-2 gap-md` for the six `FormField`s, with two exceptions spanning both columns: `FORM-MESSAGE` (a textarea needs the full width) and `FORM-CONSENT` (a checkbox-plus-legal-text line reads poorly split to half width)
- Field order: `FORM-NAME`, `FORM-EMAIL` (row one, side by side) → `FORM-COMPANY`, `FORM-PHONE` (row two) → `FORM-INTEREST` (row three, `sm:col-span-2` — a select naming which cluster the enquiry is about deserves full width, not a half-width column beside nothing) → `FORM-MESSAGE` (`sm:col-span-2`) → `FORM-CONSENT` (`sm:col-span-2`) → submit button
- Submit button: `w-full sm:w-auto sm:self-start mt-sm`

### `FORM-INTEREST` select
- Options per `CONTENT.md`: `Growth, Funding, Risk, People, Not sure yet` — five options, the four cluster labels from `services-data.spec.md` (`growth`→Growth, `fund`→Funding, `protect`→Risk, `people`→People) plus one open option. **`services-data.spec.md`'s data slugs and this field's visible labels differ** (`fund`/Funding, `protect`/Risk) — the select's `value` attributes use the data slugs so a submitted enquiry routes cleanly against the same keys the Services section uses, while the visible `<option>` text uses the labels exactly as `CONTENT.md` specifies them.

## States & Behaviors

### Gated info-column lines
- **Trigger:** `CON-ADDRESS`, `CON-PHONE`, `CON-HOURS` are each `NEEDS-CLIENT-INPUT`
- **State:** identical rule to `site-footer.spec.md`'s contact column — each line renders independently, absent lines are simply not in the list, and if all three are gated the info column still holds its `h2` (`CON-H2`, "Contact") with no list beneath it, since the form to its right is the section's real content regardless.
- `CON-EMAIL` is also gated but is **not** rendered as a standalone info-column line in this layout — it is functionally superseded by the form itself as the contact channel, so it is held in reserve for the footer's contact column (`site-footer.spec.md`) rather than duplicated here.

### Submit — idle
- **Trigger:** default state, form untouched or mid-fill
- **State:** `CtaButton` renders normally, per `cta-button.spec.md`

### Submit — submitting (pending)
- **Trigger:** valid submit, request in flight
- **State:** button enters `state="pending"` per `cta-button.spec.md` (spinner replaces/joins the label, width held, `aria-busy="true"`); every field gets `disabled`, per `form-field.spec.md`'s disabled state

### Submit — success
- **Trigger:** server confirms receipt
- **State:** the `<form>` element is replaced entirely by a confirmation block — `FORM-SUCCESS` at `text-h3 font-display` plus, if cleared, `FORM-SLA` beneath it at `text-body text-muted-foreground`. The field values are not left visible behind or beside the confirmation; a submitted enquiry does not need to be re-editable in place.
- `FORM-SLA` gating: `NEEDS-CLIENT-INPUT` per `CONTENT.md` — when absent, the success block is `FORM-SUCCESS` alone, which reads as complete on its own ("Received. We will reply to the email address you gave.").

### Submit — error
- **Trigger:** request fails (network or server error)
- **State:** `FORM-ERROR` renders as a banner (`bg-destructive/10 border border-destructive rounded-lg p-md text-destructive` — using an alpha-tinted fill rather than a solid destructive background, since `--destructive` here is crimson-deep/crimson-light and a solid fill at that saturation across a whole banner would be visually louder than the rest of the site's restrained palette) above the form, which remains filled with the user's entered values so nothing is lost. The submit button returns to idle so the user can retry.

### Validation
- Delegated entirely to `form-field.spec.md`'s rule: validate on blur and on submit, never on keystroke. This section adds no validation behavior beyond what that spec already defines per field.

### `FORM-CONSENT` gating — blocks the whole form
- **Trigger:** `FORM-CONSENT` wording is `NEEDS-CLIENT-INPUT` (data-protection consent text reviewed against the Kenya Data Protection Act)
- **State:** **this is the one gate in the entire spec set that blocks a whole section's function rather than just an absent line.** A contact form that collects personal data without consent wording is a compliance gap, not a cosmetic gap, so until `FORM-CONSENT` clears, the form renders in a visibly disabled state — every field `disabled`, submit button `disabled` — with a single notice in place of the missing consent line: `Enquiry form is not yet live pending data-protection review.` This is the one instance across every spec in this set where a gated slot changes a sibling component's behavior rather than simply being absent itself.

## Per-State Content
Covered above.

## Assets
- Icons: `IconAddress`, `IconPhone`, `IconHours` (`size="md"`) from `src/components/icons.tsx`, info column only
- Image slots: none

## COPY

| Slot | Status | Text |
|---|---|---|
| `CON-H2` | DRAFT | Contact |
| `CON-ADDRESS` | NEEDS-CLIENT-INPUT | `[CLIENT TO SUPPLY: registered office address]` |
| `CON-PHONE` | NEEDS-CLIENT-INPUT | `[CLIENT TO SUPPLY: telephone]` |
| `CON-EMAIL` | NEEDS-CLIENT-INPUT | `[CLIENT TO SUPPLY: contact email]` (footer only, see above) |
| `CON-HOURS` | NEEDS-CLIENT-INPUT | `[CLIENT TO SUPPLY: office hours]` |
| `FORM-NAME` | DRAFT | Full name |
| `FORM-EMAIL` | DRAFT | Email |
| `FORM-COMPANY` | DRAFT | Company |
| `FORM-PHONE` | DRAFT | Phone |
| `FORM-INTEREST` | DRAFT | Which service |
| `FORM-INTEREST-OPTIONS` | DRAFT | Growth, Funding, Risk, People, Not sure yet |
| `FORM-MESSAGE` | DRAFT | Message |
| `FORM-CONSENT` | NEEDS-CLIENT-INPUT | `[CLIENT TO SUPPLY: data-protection consent wording for the enquiry form, reviewed against the Kenya Data Protection Act]` |
| `FORM-SUBMIT` | DRAFT | Send enquiry |
| `FORM-SUCCESS` | DRAFT | Received. We will reply to the email address you gave. |
| `FORM-SLA` | NEEDS-CLIENT-INPUT | `[CLIENT TO SUPPLY: response-time commitment for enquiries, or confirm this line is omitted]` |
| `FORM-ERROR` | DRAFT | That did not send. Try again, or email us directly. |

## Responsive Behavior
- **Desktop (1440px):** 5/7 split, info left, form right; form fields two per row where noted above
- **Tablet (768px):** columns stack, info column above form (a visitor reads what the firm is before filling anything in); field grid holds its two-column layout at `sm` and up
- **Mobile (390px):** stacked, field grid drops to one column entirely
- **Breakpoint:** section split at `lg` (1024px), field grid at `sm` (640px)

## CONTRAST CHECK

| Pairing | Ratio | Source | Verdict |
|---|---|---|---|
| Navy H2 on paper | 17.07:1 | `BRAND.md` | Pass |
| Navy info-column text on paper | 17.07:1 | `BRAND.md` | Pass |
| Cyan-deep info icons on paper | 3.92:1 | `globals.css` derived | Pass |
| Crimson-deep error banner text on paper | 6.16:1 | `BRAND.md` | Pass |
| Navy success headline on paper | 17.07:1 | `BRAND.md` | Pass |
| All field-level pairings | — | `form-field.spec.md` | Inherited, not restated |

## ANTI-SLOP CONSTRAINTS

- **No arithmetic or image captcha.** `IA_CRITIQUE.md`'s explicit rejection of the reference's pattern — friction on the highest-value interaction on the site.
- **No form values cleared or hidden on error.** Covered under Submit — error above; a failed submission must not cost the user their typed answers.
- **No fabricated response-time promise ("We reply within 24 hours") while `FORM-SLA` is gated.** The success message stands alone without it.
- **No consent checkbox with placeholder Latin text or an invented consent sentence.** Covered under `FORM-CONSENT` gating — the whole form goes into a disabled, clearly-labelled not-yet-live state rather than shipping unreviewed legal wording.
- **No floating "chat with us" widget introduced as a shortcut around the form.** Not in `CONTENT.md`, not part of this spec.
