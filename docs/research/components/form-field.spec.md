# FormField Specification

Shared primitive. Wraps every input, textarea, and select in the contact form.
Specified once here so the contact spec stays under budget.
**Dispatch note:** the contact-form builder receives this file inline.

## Overview
- **Target file:** `src/components/ui/form-field.tsx`
- **Design reference:** none. Authored from `BRAND.md`.
- **Interaction model:** static per field (focus, error, disabled). Validation timing is owned by the form, not the field.
- **Server/Client:** Client Component. It reflects validation state.

## DOM Structure

```
<div>                        field block, flex-col gap-2xs
  <label for={id}>           always present, always above
  <input|textarea|select>    the control
  <p id={helperId}>          helper text, optional, rendered when present
  <p id={errorId}>           error, rendered only in error state
    <IconError size="sm" />
    <span>                   message
```

`aria-describedby` on the control points at the helper id, the error id, or
both. `aria-invalid="true"` in the error state.

## DESIGN SPECIFICATION

### Field block
- Layout: `flex flex-col gap-2xs` (4px between label, control, and message)
- Width: `w-full`. The form grid owns column spans.

### Label (always above the control)
- Type: `text-caption font-sans font-medium` (13.33 -> 13.50px, tracking 0.01em)
- Colour: `text-foreground`
- Required marker: the word `(required)` in `text-muted-foreground`, not an asterisk. An asterisk with a legend elsewhere makes the user hunt.

### Control (input, textarea, select)
- Height: `min-h-11` (44px) for input and select. Textarea `min-h-32` (128px), `resize-y`.
- Padding: `px-sm py-xs` (12px horizontal, 8px vertical)
- Type: `text-body font-sans` (16 -> 18px). **16px minimum is load-bearing:** iOS Safari zooms the viewport on focus of any control below 16px.
- Colour: `text-foreground bg-card`
- Border: `border border-input` (1px)
- Radius: `rounded-lg` (0.25rem), matching the button ladder
- Transition: `transition-[border-color,box-shadow] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]`
- Box-shadow: none at rest.
- **No placeholder text is used as a label.** Placeholders are omitted entirely unless they carry format information (for example a phone format), in which case they sit in `text-muted-foreground`.

### Select
- Trailing glyph: `IconCaretDown` at `size="sm"`, `text-stroke-systems`, absolutely positioned `right-sm`, `pointer-events-none`
- `appearance-none` plus `pr-xl` so the native arrow is replaced, not doubled

### Helper text
- Type: `text-caption`, colour `text-muted-foreground`

### Error message
- Position: **below** the control, never above, never as a tooltip
- Type: `text-caption font-medium`, colour `text-destructive`
- Layout: `flex items-start gap-2xs`
- Leading glyph: `IconError` at `size="sm"`, inherits `text-destructive`
- **Colour is never the sole error signal.** The brand's action colour is already red, so the glyph and the below-field placement carry the meaning alongside the hue.

## States & Behaviors

### Focus-visible (mandatory)
- **Trigger:** `:focus-visible` on the control
- **State:** `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:border-ring`
- The border also takes the ring colour so the field reads as one focused object rather than a box wearing a halo.
- **Transition:** 200ms
- **`outline: none` without the ring that follows it is a build failure.**

### Hover
- **Trigger:** pointer over the control
- **State:** `hover:border-foreground`. Border only. No fill change: a hover fill on a text input suggests it is a button.
- **Transition:** 200ms

### Error
- **Trigger:** set by the form on blur for format errors, and on submit for everything else. **Never on keystroke.** Validating while the user is still typing marks a half-typed email as wrong.
- **State:** `aria-invalid="true"`, `border-destructive`, error paragraph rendered below
- **Clear:** on the next successful validation, at blur or submit
- **Transition:** border 200ms. The message appears without animation; a sliding error message pushes the layout under the user's cursor.

### Disabled
- **Trigger:** `disabled` attribute, used while the form is submitting
- **State:** `disabled:bg-muted disabled:text-muted-foreground disabled:border-border disabled:cursor-not-allowed`

### Filled
- No distinct styling. A filled field looks like an empty one plus its value.

## Per-State Content
N/A. Labels and messages arrive as props from the contact spec.

## Assets
- Icons: `IconError`, `IconCaretDown` from `src/components/icons.tsx`, both `size="sm"` (20px)
- Image slots: none.

## COPY

The field owns no copy. Labels, helper text, and messages come from the
contact spec. The two generic messages it may render:

- Error, missing required value: `This field is required.`
- Error, malformed email: `That does not look like an email address.`

## Responsive Behavior
- **Desktop (1440px):** full width of its grid column
- **Tablet (768px):** unchanged
- **Mobile (390px):** unchanged. The form grid drops to one column, so every field becomes full-bleed within the page gutter.
- **Breakpoint:** none of its own.

## CONTRAST CHECK

| Pairing | Ratio | Source | Verdict |
|---|---|---|---|
| Navy label on paper | 17.07:1 | `BRAND.md` | Pass |
| Navy value on `--card` | 17.87:1 | `globals.css` derived | Pass |
| `--input` border on paper | 3.41:1 | `globals.css` derived | Pass, clears the 3:1 floor for a control boundary (WCAG 1.4.11) |
| `--input` border on `--card` | 3.57:1 | `globals.css` derived | Pass |
| Slate helper text on paper | 5.74:1 | `globals.css` derived | Pass |
| Crimson-deep error text on paper | 6.16:1 | `BRAND.md` | Pass |
| Crimson focus ring on paper | 4.42:1 | `globals.css` derived | Pass |
| Cyan-deep select caret on paper | 3.92:1 | `globals.css` derived | Pass, meaningful graphic floor is 3:1 |
| Slate disabled value on `--muted` | 5.20:1 | `globals.css` derived | Pass |

**The `--input` border must not be lightened.** It is the only thing showing
the control's extent, so it is load-bearing and sits at the 3:1 floor by
design, not by accident.

## ANTI-SLOP CONSTRAINTS

- **No placeholder-as-label.** The single most common form defect. The label is always a real `<label>` above the control.
- **No floating label that animates into the border.** It is a decorative pattern that breaks autofill, breaks zoom, and hides the label from a user who has already typed.
- **No borderless underline-only fields.** They read as text, not as controls, and the underline alone rarely clears 3:1.
- **No inline error tooltips or right-aligned error text.** Errors sit below the field they belong to.
- **No red-only error signalling.** Crimson is already the action colour here, so the glyph is mandatory.
- **No validation on keystroke.** Blur and submit only.
- **No `:focus` ring.** `:focus-visible` only, so a mouse click does not leave a ring behind.
- **No 14px controls.** Below 16px, iOS zooms on focus and the page jumps.
