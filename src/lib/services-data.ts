import type { Service, ServiceSlug } from "@/types/service";

/**
 * Data contract for the services section, per
 * `docs/research/components/services-data.spec.md`. Cluster membership here
 * mirrors `CONTENT.md` §5.1 and `IA_CRITIQUE.md` §3.2 exactly — both sources
 * agree, so this is the one written-down copy `ClusterCard` and
 * `PracticeLineRow` import from rather than re-deriving.
 */
export type ClusterSlug = "growth" | "fund" | "protect" | "people";

export interface Cluster {
  slug: ClusterSlug;
  /** `CLU-0n-NAME`. */
  name: string;
  /** `CLU-0n-BODY`. Deliberately never names a practice line directly, so
   *  the cluster renders correctly whether every line inside it has cleared
   *  gating or not. */
  body: string;
  /** Practice lines in this cluster, in render order. */
  lines: readonly ServiceSlug[];
}

export const CLUSTERS: readonly Cluster[] = [
  {
    slug: "growth",
    name: "Growth",
    body: "Where the next shilling of revenue comes from, and whether a new market is worth entering.",
    lines: ["business-consultancy", "market-entry"],
  },
  {
    slug: "fund",
    name: "Funding",
    body: "Books that close, forecasts that hold, and a lender file that stands up to a credit committee.",
    lines: ["financial-management", "loans-financing"],
  },
  {
    slug: "protect",
    name: "Risk",
    body: "The exposures that would stop the business, ranked and owned, with the compliance work that follows.",
    lines: ["risk-management", "legal-regulatory"],
  },
  {
    slug: "people",
    name: "People",
    body: "Training built around the roles you are hiring for, and the HR structure underneath them.",
    lines: ["training-hr"],
  },
] as const;

/**
 * The seven practice lines. `SVC-0n-NAME` values are `APPROVED` (the
 * client's own material); `summary` and `detail` are `DRAFT` (ours). Order
 * matches `SERVICE_SLUGS` in `src/types/service.ts`, which is `BRAND.md`'s
 * own order, not a ranking.
 *
 * `legal-regulatory` carries `status: "NEEDS-CLIENT-INPUT"` on all three of
 * its text fields in the register — its name was obscured in the source
 * photo and is unconfirmed. `PracticeLineRow` must not render this entry
 * until the status flips to a publishable value (see `isPublishable` in
 * `src/types/content.ts`).
 */
export const SERVICES: readonly Service[] = [
  {
    slug: "business-consultancy",
    name: "Business Consultancy",
    summary:
      "Strategic planning, business development, and operations work for firms deciding where to put the next shilling.",
    detail:
      "We start with how the business actually earns, not how the org chart says it should. That means reading the revenue by line, costing the work properly, and finding where margin leaks. From there we rebuild the plan: what to grow, what to stop, and what to fix first. Strategic planning, business development, and operations work sit together because separating them is how plans end up on a shelf.",
    status: "APPROVED",
    href: "#svc-business-consultancy",
  },
  {
    slug: "financial-management",
    name: "Financial Management",
    summary:
      "Accounting, budgeting, financial planning, and cash-flow management, reported monthly in figures you can act on.",
    detail:
      "Books that close on time are the floor, not the service. We build the budget against real operating history, forecast cash week by week, and tell you when the gap arrives before it does. Where the numbers are already messy, we clean them first: reconciliations, the chart of accounts, and the reporting pack. Accounting, budgeting, financial planning, and cash-flow management, run so that the monthly numbers are a management document rather than a filing obligation.",
    status: "APPROVED",
    href: "#svc-financial-management",
  },
  {
    slug: "training-hr",
    name: "Training & HR Services",
    summary:
      "Staff development, HR consultancy, and capacity-building programmes, built around the roles you are actually hiring for.",
    detail:
      "Training goes wrong when it is bought by topic instead of by gap. We look at what the role has to deliver, what the person can do today, and what sits between the two. Then we design the programme against that, whether it runs in a session or over a quarter. The HR side covers contracts, structures, appraisal, and the paperwork that becomes a problem only when someone leaves. Capacity building is judged on what the team can do afterwards.",
    status: "APPROVED",
    href: "#svc-training-hr",
  },
  {
    slug: "loans-financing",
    name: "Loans & Financing",
    summary:
      "Loan facilitation and disbursement support. We prepare the file, size the facility, and manage the lender.",
    detail:
      "Most rejected applications fail on the file, not the business. We assemble what a Kenyan lender will actually ask for. Audited or management accounts, cash-flow projections that reconcile to them, security documents, and a clear statement of use. We size the facility against what the business can service, which is often less than what it can be offered. Then we run the lender conversation with you and stay in it through drawdown, covenants, and repayment.",
    status: "APPROVED",
    href: "#svc-loans-financing",
  },
  {
    slug: "risk-management",
    name: "Risk Management",
    summary:
      "Risk assessment, mitigation strategy, and compliance work. We name the exposures that would actually stop the business.",
    detail:
      "A risk register is only useful if it is ranked and someone owns each line. We work through the exposures that would genuinely halt trading: concentration in one customer, a single supplier, key-person dependency, currency movement, and regulatory breach. Each one gets a likelihood, a cost, an owner, and a control. Compliance work follows the same order, starting with the obligations that carry penalties and moving down. You get a document your board can question.",
    status: "APPROVED",
    href: "#svc-risk-management",
  },
  {
    slug: "market-entry",
    name: "Market Entry Support",
    summary:
      "International expansion, market research, and regulatory readiness, so entry is a decision rather than a bet.",
    detail:
      "Entering a new market costs most when the groundwork is skipped. We size the demand, price against who is already there, and work out what registration, licensing, and tax actually require before anything is committed. For firms coming into Kenya, that includes company registration, tax obligations, and sector licensing. For Kenyan firms going out, it means the same questions asked of the target market. The output is a written position on whether to enter, when, and at what cost.",
    status: "APPROVED",
    href: "#svc-market-entry",
  },
  {
    slug: "legal-regulatory",
    name: "Legal & Regulatory Advisory",
    summary: "[CLIENT TO SUPPLY: scope of this practice line, once the name is confirmed.]",
    detail: "[CLIENT TO SUPPLY: detail for this practice line, once the name is confirmed.]",
    status: "NEEDS-CLIENT-INPUT",
    href: "#svc-legal-regulatory",
  },
] as const;

/** `SERVICES` keyed by slug, for a component that already knows which line it wants. */
export const SERVICES_BY_SLUG: Readonly<Record<ServiceSlug, Service>> = Object.fromEntries(
  SERVICES.map((service) => [service.slug, service]),
) as Record<ServiceSlug, Service>;

/**
 * Icon per practice line, re-exported from `icons.tsx` rather than
 * duplicated, so an eighth line (or `legal-regulatory` clearing gating) is a
 * type error here until it has an icon assigned there.
 */
export { SERVICE_ICONS } from "@/components/icons";

/**
 * `FORM-INTEREST-OPTIONS` mirrors these four cluster slugs exactly, per
 * `CONTENT.md` §11: "an enquiry arrives already routed to the door the
 * visitor came through." Visible option labels differ from the data slugs
 * for two of the four (`fund` → "Funding", `protect` → "Risk") — `contact.tsx`
 * owns that label mapping, not this file.
 */
export const INTEREST_OPTIONS: readonly { slug: ClusterSlug | "unsure"; label: string }[] = [
  { slug: "growth", label: "Growth" },
  { slug: "fund", label: "Funding" },
  { slug: "protect", label: "Risk" },
  { slug: "people", label: "People" },
  { slug: "unsure", label: "Not sure yet" },
];
