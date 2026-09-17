import type { ApproachPhase } from "@/types/approach";

/**
 * The engagement method, per `docs/research/components/approach.spec.md`.
 * Every string is `DRAFT` in `CONTENT.md` §6.
 *
 * The structure follows the logic common to the ILO consulting cycle, the
 * IIA's engagement standards, ISO 31000 and ISO 37301: agree the criteria,
 * establish the facts, evaluate the gaps, agree action with management,
 * support implementation, then follow up. The copy names no statute,
 * regulator, licence or regulated service. Which obligations apply is
 * context-specific, and the firm's regulated scope is `APP-SCOPE`, which is
 * the client's to supply.
 */
export const APPROACH_PHASES: readonly ApproachPhase[] = [
  {
    slug: "diagnosis",
    name: "Diagnosis",
    summary:
      "What applies to you, what actually happens, and where the two differ.",
    stages: [
      {
        id: "APP-01",
        name: "Understand",
        question: "What are we trying to achieve, and what applies to us?",
        purpose:
          "We agree the objectives and the obligations your organisation must meet. Which ones apply depends on your sector and structure.",
        activities: [
          "Conversations with leadership and key staff",
          "A first read of accounts, policies, and reporting lines",
          "Listing the regulatory and contractual obligations in scope",
        ],
        output:
          "An agreed scope, a working list of the obligations that apply, and the documents we need from you.",
      },
      {
        id: "APP-02",
        name: "Assess",
        question: "How do things actually run today?",
        purpose:
          "We establish the current position from evidence, and check that what is written down matches what people do.",
        activities: [
          "Review of policies, records, and registers",
          "Interviews and walk-throughs of key processes",
          "Sample tests of the controls that matter most",
        ],
        output:
          "A written picture of the current position, checked with management for factual accuracy.",
      },
      {
        id: "APP-03",
        name: "Identify gaps",
        question: "Where are the gaps, and how much do they matter?",
        purpose:
          "We measure the current position against the agreed obligations and objectives, and work out which gaps matter most.",
        activities: [
          "Gap analysis against obligations, policy, and objectives",
          "Rating each gap by likelihood and impact",
          "Tracing each gap to its likely cause",
        ],
        output:
          "A findings register with the evidence, rating, and likely cause of each gap. Anything unconfirmed is marked for further review.",
      },
    ],
  },
  {
    slug: "action",
    name: "Action",
    summary:
      "What to change first, putting it in place, and checking that it holds.",
    stages: [
      {
        id: "APP-04",
        name: "Prioritise",
        question: "What should change, and what comes first?",
        purpose:
          "We turn findings into practical recommendations and put them in order. Management decides what goes ahead.",
        activities: [
          "Options for each finding, with the trade-offs",
          "Ranking by risk, regulatory weight, cost, and capacity",
          "Owners and dates agreed with management",
        ],
        output:
          "An action plan. Each item says what should change, why it matters, who owns it, and by when.",
      },
      {
        id: "APP-05",
        name: "Implement",
        question: "How do we put it into practice?",
        purpose:
          "Where the engagement includes it, we work alongside your team to put the plan in place. Your people own the changes.",
        activities: [
          "Drafting policies, procedures, and registers",
          "Redesigning processes and setting up controls",
          "Training the staff who will run them",
        ],
        output:
          "Policies, controls, and reporting in use, with staff trained to run them.",
      },
      {
        id: "APP-06",
        name: "Monitor",
        question: "Is it working, and will it hold?",
        purpose:
          "At agreed points we check that actions are done and controls still work, so progress does not stall after the report.",
        activities: [
          "Tracking actions against owners and dates",
          "Follow-up checks that controls still operate",
          "Reassessment after a change in law, funding, or operations",
        ],
        output:
          "Progress reports, an updated risk register, and a review routine your team can run without us.",
      },
    ],
  },
] as const;
