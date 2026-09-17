import type { ImageAsset } from "@/types/content";
import type { CoreValue } from "@/types/core-value";
import type { StatItem } from "@/types/stat";
import type { Testimonial } from "@/types/testimonial";

/**
 * Site Content — Axion Advisory Group
 *
 * The business information the site renders, in one place. There is no
 * separate mock or demo layer: update or extend these records directly as
 * further business information arrives. Practice-line copy lives in
 * `src/lib/services-data.ts`.
 */

/* --- 1. Credibility ------------------------------------------------------ */

export const CREDIBILITY_STATS: readonly StatItem[] = [
  {
    id: "STAT-01",
    value: "12+",
    label: "Years advisory experience",
    status: "DRAFT",
  },
  {
    id: "STAT-02",
    value: "85+",
    label: "Client engagements",
    status: "DRAFT",
  },
  {
    id: "STAT-03",
    value: "KES 4.8B+",
    label: "Capital facilitated",
    status: "DRAFT",
  },
] as const;

export const CREDIBILITY_CERTIFICATIONS =
  "Licensed Financial Advisors (ICIFA) · ICPAK Practising Firm Member · Registered Advisory Practice.";

/* --- 2. Testimonials ----------------------------------------------------- */

/**
 * Client testimonials, confirmed by the client as real on 2026-09-16.
 *
 * Organisations are described by sector and shape rather than named.
 *
 * `status` and `permissionOnFile` are left as they were: set
 * `status: "APPROVED"` and `permissionOnFile: true` only once written
 * permission to publish is on record. The carousel reads the array and needs
 * no change.
 */
export const TESTIMONIALS: readonly Testimonial[] = [
  {
    id: "QUOTE-01",
    category: "Strategy",
    quote:
      "We arrived with four competing priorities and no way to rank them. We left with a sequenced plan and the reasoning written down.",
    authorName: "Amara N.",
    authorRole: "Managing Director",
    authorCompany: "Regional Distribution Group",
    status: "DRAFT",
    permissionOnFile: false,
  },
  {
    id: "QUOTE-02",
    category: "Operations",
    quote:
      "Our monthly reporting took eleven days and told us very little. It now closes in four, and the numbers drive the production meeting.",
    authorName: "Peter K.",
    authorRole: "Operations Director",
    authorCompany: "Light Manufacturing Client",
    status: "DRAFT",
    permissionOnFile: false,
  },
  {
    id: "QUOTE-03",
    category: "Leadership",
    quote:
      "Our executive team disagreed on what the numbers meant. Working through the model together got finance and operations reading from the same page.",
    authorName: "Wanjiru M.",
    authorRole: "Finance Director",
    authorCompany: "Healthcare Services Group",
    status: "DRAFT",
    permissionOnFile: false,
  },
  {
    id: "QUOTE-04",
    category: "Growth",
    quote:
      "As a founder I was making hiring and pricing calls on instinct. The framework we built gave me a way to test them first.",
    authorName: "Tobias A.",
    authorRole: "Founder",
    authorCompany: "Early-Stage Logistics Venture",
    status: "DRAFT",
    permissionOnFile: false,
  },
  {
    id: "QUOTE-05",
    category: "Transformation",
    quote:
      "Restructuring across two branches was never going to be easy. Having the sequencing and the staff communications planned in advance made it manageable.",
    authorName: "Njeri W.",
    authorRole: "Chief Executive",
    authorCompany: "Member-Owned Financial Institution",
    status: "DRAFT",
    permissionOnFile: false,
  },
  {
    id: "QUOTE-06",
    category: "Advisory",
    quote:
      "What we valued was an independent read. They challenged assumptions our own team had stopped questioning, and they brought evidence.",
    authorName: "Samuel O.",
    authorRole: "Programme Director",
    authorCompany: "Public Sector Institution",
    status: "DRAFT",
    permissionOnFile: false,
  },
] as const;

/* --- 3. About ------------------------------------------------------------ */

export const ABOUT_BODY = {
  bodyOne:
    "Founded to bring rigorous, balance-sheet-first advisory to growing enterprises across Kenya. We combine forensic accounting discipline with institutional capital facilitation experience.",
  bodyTwo:
    "Our advisors hold credentials across ICPAK, ICIFA, and regional risk management standards, working with firms across East African trade corridors.",
} as const;

/**
 * The About section's image, supplied 2026-09-17. 6016 x 4000, landscape:
 * the same view of Nairobi as the hero photograph, at night. `ABOUT-IMG-ALT`
 * in `CONTENT.md` §7.
 */
export const ABOUT_IMAGE: Pick<ImageAsset, "src" | "alt"> = {
  src: "/images/about.jpg",
  alt: "The Nairobi skyline at night.",
};

/* --- 4. Mission, Vision and Core Values ---------------------------------- */

/**
 * Supplied by the client on 2026-09-16 as approved working copy. Registered in
 * `CONTENT.md` §8a. "organizations" is normalised to "organisations" per the
 * Kenyan English rule in `BRAND.md`; the wording is otherwise verbatim.
 */
export const MISSION =
  "Empowering organisations through strategic advisory, compliance, and governance solutions that create measurable and sustainable value.";

export const VISION =
  "To be a trusted partner in building compliant, resilient, and high-performing organisations.";

export const CORE_VALUES: readonly CoreValue[] = [
  {
    id: "VALUE-01",
    name: "Integrity",
    description:
      "We uphold honesty, transparency, confidentiality, and professional ethics in every engagement.",
  },
  {
    id: "VALUE-02",
    name: "Excellence",
    description:
      "We pursue high standards of quality, accuracy, and professionalism in the solutions and advice we provide.",
  },
  {
    id: "VALUE-03",
    name: "Strategic Insight",
    description:
      "We turn complex business, regulatory, and operational challenges into clear, actionable strategies.",
  },
  {
    id: "VALUE-04",
    name: "Accountability",
    description:
      "We take ownership of our commitments and promote responsible decision-making, governance, and measurable outcomes.",
  },
  {
    id: "VALUE-05",
    name: "Compliance & Responsibility",
    description:
      "We help organisations understand and meet their regulatory and statutory obligations while building cultures of responsible business practice.",
  },
  {
    id: "VALUE-06",
    name: "Client-Centred Partnership",
    description:
      "We work alongside our clients to understand their unique circumstances and develop solutions aligned with their objectives.",
  },
  {
    id: "VALUE-07",
    name: "Sustainable Growth",
    description:
      "We focus beyond immediate gains, helping organisations build resilient systems, manage risk, and create lasting value.",
  },
] as const;

/* --- 5. Approach --------------------------------------------------------- */

export const APPROACH_CLOSING_NOTE =
  "First discovery meeting is exploratory and non-chargeable. Work begins with a diagnostic review scoped at an agreed fixed fee.";

/* --- 6. Contact ---------------------------------------------------------- */

/** Testing values, set 2026-09-16. Replace with the firm's own before launch. */
export const CONTACT_PHONE = "0719463183";
export const CONTACT_EMAIL = "includevcompany@gmail.com";

export const CONTACT_DETAILS = {
  address: "Riverside Drive, Westlands, Nairobi, Kenya",
  phone: CONTACT_PHONE,
  hours: "Monday–Friday, 08:00–17:00 EAT",
  consentText:
    "By submitting this form, you consent to Axion Advisory Group processing your contact details solely to respond to your enquiry in accordance with the Kenya Data Protection Act, 2019.",
  slaText:
    "We typically respond to qualifying business enquiries within one business day.",
} as const;

/* --- 7. Footer ----------------------------------------------------------- */

export const FOOTER_DETAILS = {
  address: "Riverside Drive, Westlands, Nairobi, Kenya",
  phone: CONTACT_PHONE,
  email: CONTACT_EMAIL,
  registrationNumber: "Reg No. 000000",
  entityName: "Axion Advisory Group Ltd.",
  copyrightYear: "2026",
} as const;

/* --- 8. Cookie Notice ---------------------------------------------------- */

export const COOKIE_NOTICE =
  "This website uses essential technical cookies to ensure navigation and session security under the Kenya Data Protection Act, 2019.";

/* --- 9. Insights --------------------------------------------------------- */

export interface InsightArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: "Growth" | "Funding" | "Risk" | "People";
  date: string;
  readTime: string;
}

export const INSIGHT_ARTICLES: readonly InsightArticle[] = [
  {
    slug: "managing-working-capital-kenya",
    title: "Managing Working Capital Through Kenyan Interest Rate Cycles",
    excerpt:
      "How mid-sized organisations restructure cash-flow forecasting and debt facility covenants when credit market liquidity tightens.",
    category: "Funding",
    date: "August 2026",
    readTime: "4 min read",
  },
  {
    slug: "statutory-compliance-readiness-2026",
    title: "Preparing Your Firm for Kenyan Regulatory & Statutory Compliance Audits",
    excerpt:
      "A pragmatic framework for board risk committees to identify tax exposure, corporate filings, and regulatory liability before penalties arise.",
    category: "Risk",
    date: "July 2026",
    readTime: "5 min read",
  },
  {
    slug: "east-african-market-entry-due-diligence",
    title: "Commercial Due Diligence for East African Cross-Border Expansion",
    excerpt:
      "Moving beyond market size projections: assessing tariff barriers, licensing lead-times, and local banking integration.",
    category: "Growth",
    date: "June 2026",
    readTime: "6 min read",
  },
] as const;

/* --- 10. Privacy Notice -------------------------------------------------- */

export interface PrivacySection {
  heading: string;
  body: string;
}

export const PRIVACY_SECTIONS: readonly PrivacySection[] = [
  {
    heading: "1. Scope & Data Controller",
    body: "Axion Advisory Group Ltd. operates this website and acts as the data controller for personal data collected through our contact forms and communications, in compliance with the Kenya Data Protection Act, 2019.",
  },
  {
    heading: "2. Information We Collect",
    body: "We collect personal information that you voluntarily provide when submitting an enquiry, including your full name, business email address, company name, telephone number, and message content.",
  },
  {
    heading: "3. Purpose of Processing",
    body: "We process your information exclusively to evaluate and respond to your commercial advisory enquiries, communicate terms of service, and fulfill our legal and regulatory compliance obligations under Kenyan law.",
  },
  {
    heading: "4. Data Security & Retention",
    body: "We maintain appropriate technical and organizational safeguards to protect your personal data against unauthorized disclosure or loss. Contact enquiry records are retained only as long as necessary to resolve your request.",
  },
  {
    heading: "5. Your Statutory Rights",
    body: "Under the Kenya Data Protection Act, you have the right to request access to, rectification of, or erasure of your personal data held by Axion Advisory Group Ltd., subject to statutory retention requirements.",
  },
  {
    heading: "6. Enquiries & Contact",
    body: `For questions regarding this privacy notice or data protection practices, contact our compliance officer at ${CONTACT_EMAIL}.`,
  },
] as const;
