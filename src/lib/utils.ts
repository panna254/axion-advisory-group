import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/**
 * The type scale in `globals.css` §3 registers custom font-size steps
 * (`--text-small` through `--text-h1`). tailwind-merge ships with no
 * knowledge of them, so it classified `text-lead`, `text-h2`, `text-h1`
 * and the rest as TEXT COLOUR — and silently dropped them whenever a real
 * colour class appeared in the same `cn()` call, which is most of the time.
 *
 * That removed the font size from every CTA button, nav link and hero element
 * on the site. Registering the steps as `font-size` restores the intended
 * conflict behaviour: a size only ever replaces another size.
 *
 * Keep this list in sync with the `--text-*` tokens in `globals.css` §3.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["small", "body", "lead", "h3", "h2", "h1"] },
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * `tel:` href for a displayed phone number. Keeps digits and a leading `+`
 * only, so spacing and punctuation in the display string never reach the
 * dialler.
 */
export function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`
}
