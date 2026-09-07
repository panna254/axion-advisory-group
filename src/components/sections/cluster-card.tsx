import { isPublishable } from "@/types/content";
import { SERVICES_BY_SLUG, type Cluster } from "@/lib/services-data";

import { PracticeLineRow } from "./practice-line-row";

interface ClusterCardProps {
  cluster: Cluster;
}

/**
 * One of the four repeating cells in the services section (see
 * `services-section.spec.md`). Renders the cluster's name, its body
 * sentence, and one `PracticeLineRow` per publishable practice line in
 * `cluster.lines`, in that array's order.
 *
 * The card itself is static — no hover/focus/active state and not a link.
 * Interaction lives entirely in the child rows. `legal-regulatory` (or any
 * other line still `NEEDS-CLIENT-INPUT`) is filtered out here, so the card
 * simply renders however many rows resolve, with no placeholder held open
 * for a line that hasn't cleared gating yet.
 */
export function ClusterCard({ cluster }: ClusterCardProps) {
  const lines = cluster.lines
    .map((slug) => SERVICES_BY_SLUG[slug])
    .filter((service) => isPublishable(service.status));

  return (
    <article id={`services-${cluster.slug}`}>
      <div className="flex h-full flex-col gap-md rounded-xl border border-border bg-card p-lg">
        <p className="text-h3 font-display font-normal text-foreground">
          {cluster.name}
        </p>
        <p className="text-body text-muted-foreground">{cluster.body}</p>
        <div className="my-2xs h-px w-full bg-border" />
        <ul className="flex flex-col gap-sm">
          {lines.map((service) => (
            <li key={service.slug}>
              <PracticeLineRow service={service} />
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
