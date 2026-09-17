import type { Icon as PhosphorIcon } from "@phosphor-icons/react/dist/lib/types";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  CaretDownIcon,
  CheckIcon,
  CircleNotchIcon,
  ClockIcon,
  EnvelopeIcon,
  ListIcon,
  MapPinIcon,
  PhoneIcon,
  WarningCircleIcon,
  XIcon,
} from "@phosphor-icons/react/ssr";

/* ---------------------------------------------------------------------------
   Icons.

   One family, one weight, one set of sizes. Phosphor, imported from the `/ssr`
   entry so these stay Server Components and never open a client boundary.

   Everything is drawn on Phosphor's 256-unit grid at `regular` weight, so
   stroke mass is identical across the whole set. Mixing a second library, or
   hand-drawing a glyph to fill a gap, breaks that and is visible immediately
   at 24px: the odd one out reads as heavier or lighter than its neighbours,
   and the row looks assembled rather than designed. `lucide-react` was removed
   from the project for this reason.

   Weight and size are not exposed on the props. That is deliberate. A caller
   cannot reach past the system to make one icon bolder or larger, which is the
   only way this stays consistent once several people are building sections.
   Colour is set with a text utility, because Phosphor inherits `currentColor`.

   On paper use `text-stroke-systems`, which resolves to cyan-deep at 3.92:1.
   Flat cyan measures 2.44:1 and fails the 3:1 floor for meaningful graphics.
   Inside a `.band-navy` section the same token resolves to brand cyan, which
   clears 6.98:1 there. Never colour an icon crimson: crimson means clickable.
--------------------------------------------------------------------------- */

const ICON_WEIGHT = "regular" as const;

/**
 * The three optical sizes on this site. One size per row, always. An icon row
 * mixing 20px and 24px glyphs reads as misaligned even when the boxes line up.
 *
 *   sm  20  inline with body text, form field adornments
 *   md  24  list rows, contact details, buttons
 *   lg  32  the one-per-section feature glyph
 */
export const ICON_SIZE = { sm: 20, md: 24, lg: 32 } as const;

export type IconSize = keyof typeof ICON_SIZE;

export interface IconProps {
  /** Optical size. Defaults to `md`. Keep one size per row. */
  size?: IconSize;
  className?: string;
  /**
   * Accessible name. Omit for decorative icons, which is most of them: an icon
   * beside a visible label is decorative and should stay silent.
   */
  title?: string;
}

/** Locks weight and size, and hides an unlabelled icon from assistive tech. */
function lockIcon(Base: PhosphorIcon, displayName: string) {
  function LockedIcon({ size = "md", className, title }: IconProps) {
    return (
      <Base
        weight={ICON_WEIGHT}
        size={ICON_SIZE[size]}
        className={className}
        role={title ? "img" : undefined}
        aria-label={title}
        aria-hidden={title ? undefined : true}
        focusable="false"
      />
    );
  }
  LockedIcon.displayName = displayName;
  return LockedIcon;
}

export type IconComponent = ReturnType<typeof lockIcon>;

/* --- Interface icons ---------------------------------------------------- */

export const IconArrowLeft = lockIcon(ArrowLeftIcon, "IconArrowLeft");
export const IconArrowRight = lockIcon(ArrowRightIcon, "IconArrowRight");
export const IconArrowUpRight = lockIcon(ArrowUpRightIcon, "IconArrowUpRight");
export const IconCaretDown = lockIcon(CaretDownIcon, "IconCaretDown");
export const IconCheck = lockIcon(CheckIcon, "IconCheck");
export const IconMenu = lockIcon(ListIcon, "IconMenu");
export const IconClose = lockIcon(XIcon, "IconClose");

/* --- Contact and form state --------------------------------------------- */

export const IconEmail = lockIcon(EnvelopeIcon, "IconEmail");
export const IconPhone = lockIcon(PhoneIcon, "IconPhone");
export const IconAddress = lockIcon(MapPinIcon, "IconAddress");
export const IconHours = lockIcon(ClockIcon, "IconHours");

/**
 * Form error marker. The brand's action colour is already red, so an error
 * cannot be signalled by colour alone here. Every error message pairs this
 * glyph with text placed below the field it belongs to.
 */
export const IconError = lockIcon(WarningCircleIcon, "IconError");

/**
 * Loading. Used sparingly: the taste skill prefers a skeleton shaped like the
 * content it replaces over a spinner. This is for in-button pending state,
 * where a skeleton makes no sense.
 */
export const IconSpinner = lockIcon(CircleNotchIcon, "IconSpinner");
