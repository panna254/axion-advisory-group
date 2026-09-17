import type { Service } from "@/types/service";
import { isPublishable } from "@/types/content";
import { SERVICES_BY_SLUG, type Cluster } from "@/lib/services-data";

import { PracticeLineRow } from "./practice-line-row";

interface ClusterRowProps {
  cluster: Cluster;
}

/**
 * One cluster row in the services index (see `services-section.spec.md`).
 * From `lg` up it is a side-head row: the cluster name and body sentence in
 * the left column, one `PracticeLineRow` per publishable practice line in the
 * right. Below `lg` the two stack. A single rule above the row separates it
 * from the cluster before; there is no box around it.
 *
 * The row itself is static and not a link. Interaction lives entirely in the
 * child rows. Any line still `NEEDS-CLIENT-INPUT` is filtered out here, so
 * the row renders however many lines resolve, with nothing held open for a
 * line still gated.
 *
 * `scroll-mt-24` clears the 72px sticky header, so the buyer fork's jump to
 * `#services-protect` lands with the cluster name visible.
 */
export function ClusterRow({ cluster }: ClusterRowProps) {
  const lines = cluster.lines
    .map((slug) => SERVICES_BY_SLUG[slug])
    .filter((service): service is Service => Boolean(service) && isPublishable(service.status));
  const headingId = `services-${cluster.slug}-heading`;

  return (
    <article
      id={`services-${cluster.slug}`}
      aria-labelledby={headingId}
      className="grid scroll-mt-24 grid-cols-1 gap-y-xl border-t border-border py-xl lg:grid-cols-12 lg:gap-x-lg"
    >
      <div className="lg:sticky lg:top-24 lg:col-span-4 lg:self-start">
        <h3 id={headingId} className="text-h3 text-foreground">
          {cluster.name}
        </h3>
        <p className="mt-xs max-w-[48ch] text-pretty text-body text-muted-foreground">
          {cluster.body}
        </p>
      </div>
      <ul className="flex flex-col gap-lg lg:col-span-7 lg:col-start-6">
        {lines.map((service) => (
          <PracticeLineRow key={service.slug} service={service} />
        ))}
      </ul>
    </article>
  );
}
