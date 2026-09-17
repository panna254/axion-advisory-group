import { CLUSTERS } from "@/lib/services-data";

import { ClusterRow } from "./cluster-row";

/**
 * Section 4, "What we do". A ruled practice index: seven practice lines
 * group into four clusters, and each cluster is one full-width row with its
 * name and reason on the left and its practice lines on the right. The
 * clusters are deliberately uneven (one or two lines), and rows simply take
 * the height their content needs, so there is no grid cell left half empty.
 *
 * Server Component.
 *
 * See `docs/research/components/services-section.spec.md` for the full
 * contract.
 */
export function ServicesSection() {
  return (
    <section id="services" className="py-band">
      <div className="max-w-page mx-auto px-md">
        <div className="mb-2xl">
          <h2 className="mb-sm text-h2 text-foreground">What we do</h2>
          <p className="max-w-[56ch] text-pretty text-lead text-muted-foreground">
            Each practice line is scoped on its own, and several can be
            combined in one engagement.
          </p>
        </div>

        <div className="border-b border-border">
          {CLUSTERS.map((cluster) => (
            <ClusterRow key={cluster.slug} cluster={cluster} />
          ))}
        </div>
      </div>
    </section>
  );
}
