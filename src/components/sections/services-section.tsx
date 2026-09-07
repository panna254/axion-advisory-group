import { CLUSTERS } from "@/lib/services-data";

import { ClusterCard } from "./cluster-card";

/**
 * Section 4, "What we do". Bento layout with uneven rhythm: seven practice
 * lines group into four `ClusterCard`s rather than one seven-tile grid. The
 * grid footprint itself is a regular 2x2 (1-up on mobile) — the unevenness
 * lives inside each card, where `ClusterCard` renders one or two
 * `PracticeLineRow`s depending on how many of its lines are publishable.
 *
 * Server Component. Reads `CLUSTERS` directly; no props.
 *
 * See `docs/research/components/services-section.spec.md` for the full
 * contract.
 */
export function ServicesSection() {
  return (
    <section id="services" className="py-band">
      <div className="max-w-page mx-auto px-md">
        <div className="max-w-[42ch] mb-xl">
          <h2 className="mb-sm text-h2 font-display font-normal text-foreground">
            What we do
          </h2>
          <p className="text-lead text-muted-foreground">
            Seven practice lines in four groups. Each line is scoped on its
            own, and they can be combined in one engagement.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-lg">
          {CLUSTERS.map((cluster) => (
            <ClusterCard key={cluster.slug} cluster={cluster} />
          ))}
        </div>
      </div>
    </section>
  );
}
