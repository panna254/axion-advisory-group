import { IconArrowRight } from "@/components/icons";

/**
 * BuyerFork — Section 3, "Two ways in."
 *
 * Two whole-card links, deliberately not a three-card row: the fork splits
 * visitors by need (funding vs. risk/compliance) rather than by service
 * name, resolving the two-buyer problem at the earliest point the page can.
 *
 * Each card's CTA is styled text plus an arrow, not a nested `CtaButton` —
 * the whole card is already an `<a>`, and an `<a>` should never wrap a
 * `<button>` (invalid nesting, confusing accessibility tree, and redundant
 * given the card itself is the click target).
 *
 * Server Component: static content, no expand/collapse, no tab switching.
 * See `docs/research/components/buyer-fork.spec.md` for the full contract.
 */

// Exactly two doors. See the spec's "No third door" anti-slop constraint —
// a third "not sure yet" option belongs to the contact form's interest
// select, not here.
const DOORS = [
  {
    href: "#services",
    label: "Funding and growth",
    body: "You need working capital, a lender who will say yes, or a plan for the next stage of the business.",
    cta: "See funding and growth",
  },
  {
    href: "#services-protect",
    label: "Risk and compliance",
    body: "A board, a regulator, or a lender is asking questions about exposure, controls, and who signs off.",
    cta: "See risk and compliance",
  },
] as const;

const DOOR_CLASSES =
  "block rounded-xl border border-border bg-card p-xl flex flex-col gap-md h-full transition-[border-color,background-color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-stroke-systems hover:bg-muted active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function BuyerFork() {
  return (
    <section id="fork" className="py-band">
      <div className="max-w-page mx-auto px-md">
        <div className="max-w-[38ch] mb-xl">
          <h2 className="text-h2 font-display font-normal text-foreground mb-sm">
            Two ways in
          </h2>
          <p className="text-lead text-muted-foreground">
            Both routes reach the same firm. They start in different places.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg items-stretch">
          {DOORS.map((door) => (
            <a key={door.href} href={door.href} className={DOOR_CLASSES}>
              <p className="text-h3 font-display font-normal text-foreground">
                {door.label}
              </p>
              <p className="text-body text-muted-foreground flex-1">
                {door.body}
              </p>
              <span className="flex items-center gap-2xs text-body font-sans font-medium text-action-text mt-md">
                {door.cta}
                <IconArrowRight size="sm" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
