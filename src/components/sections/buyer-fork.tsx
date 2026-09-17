import { IconArrowRight } from "@/components/icons";

/**
 * BuyerFork — Section 3, "Two ways in."
 *
 * Two doors, split by need (funding vs. risk/compliance) rather than by
 * service name, resolving the two-buyer problem at the earliest point the
 * page can. The composition is the argument: one rule across the full width
 * that divides into two equal columns. The doors are peers, so the split is
 * symmetrical on purpose and neither is boxed as a card.
 *
 * Each door's title is its link. The `<a>` sits inside the `<h3>` and its
 * `::after` stretches over the whole door, so the click target stays large
 * while the link's accessible name is just the door title. There is no
 * separate CTA line: it only repeated the title with "See" in front.
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
  },
  {
    href: "#services-protect",
    label: "Risk and compliance",
    body: "A board, a regulator, or a lender is asking questions about exposure, controls, and who signs off.",
  },
] as const;

export function BuyerFork() {
  return (
    <section id="fork" className="py-band">
      <div className="max-w-page mx-auto px-md">
        <h2 className="mb-xl text-h2 text-foreground">Two ways in</h2>

        <div className="grid grid-cols-1 gap-y-xl md:grid-cols-2 md:gap-y-0">
          {DOORS.map((door) => (
            <article
              key={door.href}
              className="group relative border-t border-foreground pt-lg md:odd:pr-xl md:even:border-l md:even:border-l-border md:even:pl-xl"
            >
              <h3 className="text-h3 text-foreground">
                <a
                  href={door.href}
                  className="inline-flex items-center gap-xs transition-colors duration-200 after:absolute after:inset-0 group-hover:text-action-text focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-ring focus-visible:after:ring-offset-4 focus-visible:after:ring-offset-background"
                >
                  {door.label}
                  <IconArrowRight
                    size="sm"
                    className="shrink-0 text-action-text transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
                  />
                </a>
              </h3>
              <p className="mt-sm text-pretty text-lead text-muted-foreground">
                {door.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
