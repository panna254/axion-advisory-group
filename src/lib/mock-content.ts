import { SERVICES_BY_SLUG } from "@/lib/services-data";
import { getContentMode, type ContentMode } from "@/lib/content-mode";
import type { Service, ServiceSlug } from "@/types/service";
import type { StatItem } from "@/types/stat";

/**
 * Mock Content Layer — Axion Advisory Group
 *
 * Centralized, isolated mock content for Phase 4A visual and interactive
 * evaluation. This mock data is strictly separated from verified client information.
 *
 * Every mock record satisfies existing schema definitions and uses explicit
 * demo/sample labels so that demonstration copy is never confused with
 * authentic client claims.
 */

/* --- 1. Credibility Mock Data ------------------------------------------- */

export const MOCK_CREDIBILITY_STATS: readonly StatItem[] = [
  {
    id: "STAT-01",
    value: "12+",
    label: "Years advisory experience [Demo]",
    status: "DRAFT",
  },
  {
    id: "STAT-02",
    value: "85+",
    label: "Client engagements [Demo]",
    status: "DRAFT",
  },
  {
    id: "STAT-03",
    value: "KES 4.8B+",
    label: "Capital facilitated [Demo]",
    status: "DRAFT",
  },
] as const;

export const MOCK_CREDIBILITY_CERTS =
  "Demonstration data for layout evaluation: Licensed Financial Advisors (ICIFA) · ICPAK Practising Firm Member · Registered Advisory Practice [Demo].";

/* --- 2. Proof Mock Data (Case Study & Testimonial) ----------------------- */

export const MOCK_CASE_STUDY = {
  client: "Meridian Growth Partners [Demo Case]",
  sector: "Commercial Agribusiness & Logistics",
  problem:
    "Working capital bottleneck during rapid regional distribution expansion, with lender facility applications stalled on credit documentation and covenant modeling.",
  outcome:
    "Restructured financial projections, reconciled the chart of accounts, and secured a KES 120M credit facility with 3-day turnaround on lender covenants.",
} as const;

export const MOCK_TESTIMONIAL = {
  quote:
    "Axion untangled our management accounts in three weeks. We walked into the credit committee with figures everyone could stand behind. [Sample quotation for evaluation]",
  name: "David Ochieng (Demo Profile)",
  role: "Managing Director, Apex Logistics Kenya",
} as const;

/* --- 3. About Mock Data -------------------------------------------------- */

export const MOCK_ABOUT = {
  bodyOne:
    "Founded to bring rigorous, balance-sheet-first advisory to growing enterprises across Kenya. We combine forensic accounting discipline with institutional capital facilitation experience. [Demo text]",
  bodyTwo:
    "Our advisors hold credentials across ICPAK, ICIFA, and regional risk management standards, working with firms across East African trade corridors. [Demo text]",
} as const;

/* --- 4. Approach Mock Data ----------------------------------------------- */

export const MOCK_APPROACH = {
  closingNote:
    "First discovery meeting is exploratory and non-chargeable. Work begins with a diagnostic review scoped at an agreed fixed fee. [Demo copy for layout evaluation]",
} as const;

/* --- 5. Contact Mock Data ------------------------------------------------ */

export const MOCK_CONTACT = {
  address: "Riverside Drive, Westlands, Nairobi, Kenya [Demo Address]",
  phone: "+254 (0) 20 000 0000 [Demo]",
  hours: "Monday–Friday, 08:00–17:00 EAT [Demo]",
  consentText:
    "By submitting this form, you consent to Axion Advisory Group processing your contact details solely to respond to your enquiry in accordance with the Kenya Data Protection Act, 2019. [Pending legal review — Demo Consent wording]",
  slaText:
    "We typically respond to qualifying business enquiries within one business day. [Demo SLA]",
} as const;

/* --- 6. Footer Mock Data ------------------------------------------------- */

export const MOCK_FOOTER = {
  address: "Riverside Drive, Westlands, Nairobi, Kenya [Demo]",
  phone: "+254 (0) 20 000 0000 [Demo]",
  email: "contact@example.com [Demo]",
  registrationNumber: "Reg No. DEMO-000000 [Demo]",
  entityName: "Axion Advisory Group Ltd. [Demo]",
  copyrightYear: "2026",
} as const;

/* --- 7. Legal & Regulatory Advisory (SVC-07) Mock Data ------------------- */

export const MOCK_LEGAL_REGULATORY_SERVICE: Service = {
  slug: "legal-regulatory",
  name: "Legal & Regulatory Advisory",
  summary:
    "Regulatory readiness, compliance frameworks, and corporate governance for Kenyan commercial operations. [Demo]",
  detail:
    "We guide firms through statutory registration, corporate filings, sector-specific licensing, and governance structuring. We establish compliance calendars, statutory audit coordination, and operational risk boundaries before legal exposure escalates. [Demo content for evaluation]",
  status: "DRAFT",
  href: "#svc-legal-regulatory",
};

export const MOCK_SERVICES_BY_SLUG: Readonly<Record<ServiceSlug, Service>> = {
  ...SERVICES_BY_SLUG,
  "legal-regulatory": MOCK_LEGAL_REGULATORY_SERVICE,
};

/* --- 8. Cookie Notice Mock Data ------------------------------------------ */

export const MOCK_COOKIE_NOTICE =
  "This website uses essential technical cookies to ensure navigation and session security under the Kenya Data Protection Act, 2019. [Demo notice pending legal approval].";

/* --- 9. Centralized Homepage Content Adapter ----------------------------- */

export interface HomepageContent {
  mode: ContentMode;
  isMock: boolean;
  credibility: {
    stats?: StatItem[];
    certifications?: string;
  };
  proof: {
    caseStudy?: {
      client: string;
      sector: string;
      problem: string;
      outcome: string;
    };
    testimonial?: {
      quote: string;
      name: string;
      role: string;
    };
  };
  about: {
    bodyOne?: string;
    bodyTwo?: string;
  };
  approach: {
    closingNote?: string;
  };
  contact: {
    address?: string;
    phone?: string;
    hours?: string;
    consentText?: string;
    slaText?: string;
  };
  footer: {
    address?: string;
    phone?: string;
    email?: string;
    registrationNumber?: string;
    entityName?: string;
    copyrightYear?: string;
  };
  servicesBySlug: Readonly<Record<ServiceSlug, Service>>;
  cookieNotice?: string;
}

/**
 * Resolves content based on active content mode.
 *
 * - "production": All unverified fields remain undefined/gated, matching CONTENT.md.
 * - "mock": Populated with centralized demo data for full-site evaluation.
 */
export function getHomepageContent(
  mode: ContentMode = getContentMode()
): HomepageContent {
  if (mode === "production") {
    return {
      mode: "production",
      isMock: false,
      credibility: {
        stats: undefined,
        certifications: undefined,
      },
      proof: {
        caseStudy: undefined,
        testimonial: undefined,
      },
      about: {
        bodyOne: undefined,
        bodyTwo: undefined,
      },
      approach: {
        closingNote: undefined,
      },
      contact: {
        address: undefined,
        phone: undefined,
        hours: undefined,
        consentText: undefined,
        slaText: undefined,
      },
      footer: {
        address: undefined,
        phone: undefined,
        email: undefined,
        registrationNumber: undefined,
        entityName: undefined,
        copyrightYear: undefined,
      },
      servicesBySlug: SERVICES_BY_SLUG,
      cookieNotice: undefined,
    };
  }

  return {
    mode: "mock",
    isMock: true,
    credibility: {
      stats: [...MOCK_CREDIBILITY_STATS],
      certifications: MOCK_CREDIBILITY_CERTS,
    },
    proof: {
      caseStudy: { ...MOCK_CASE_STUDY },
      testimonial: { ...MOCK_TESTIMONIAL },
    },
    about: { ...MOCK_ABOUT },
    approach: { ...MOCK_APPROACH },
    contact: { ...MOCK_CONTACT },
    footer: { ...MOCK_FOOTER },
    servicesBySlug: MOCK_SERVICES_BY_SLUG,
    cookieNotice: MOCK_COOKIE_NOTICE,
  };
}

/* --- 10. Insights Mock Data ----------------------------------------------- */

export interface InsightArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: "Growth" | "Funding" | "Risk" | "People";
  date: string;
  readTime: string;
}

export const MOCK_INSIGHTS: readonly InsightArticle[] = [
  {
    slug: "managing-working-capital-kenya",
    title: "Managing Working Capital Through Kenyan Interest Rate Cycles [Demo]",
    excerpt:
      "How mid-sized Kenyan firms restructure cash-flow forecasting and debt facility covenants when credit market liquidity tightens.",
    category: "Funding",
    date: "August 2026",
    readTime: "4 min read",
  },
  {
    slug: "statutory-compliance-readiness-2026",
    title: "Preparing Your Firm for Kenyan Regulatory & Statutory Compliance Audits [Demo]",
    excerpt:
      "A pragmatic framework for board risk committees to identify tax exposure, corporate filings, and regulatory liability before penalties arise.",
    category: "Risk",
    date: "July 2026",
    readTime: "5 min read",
  },
  {
    slug: "east-african-market-entry-due-diligence",
    title: "Commercial Due Diligence for East African Cross-Border Expansion [Demo]",
    excerpt:
      "Moving beyond market size projections: assessing tariff barriers, licensing lead-times, and local banking integration.",
    category: "Growth",
    date: "June 2026",
    readTime: "6 min read",
  },
] as const;

export interface InsightsContent {
  mode: ContentMode;
  isMock: boolean;
  articles: readonly InsightArticle[];
  emptyMessage: string;
}

export function getInsightsContent(
  mode: ContentMode = getContentMode()
): InsightsContent {
  if (mode === "production") {
    return {
      mode: "production",
      isMock: false,
      articles: [],
      emptyMessage: "No articles published yet.",
    };
  }

  return {
    mode: "mock",
    isMock: true,
    articles: MOCK_INSIGHTS,
    emptyMessage: "No articles published yet.",
  };
}

/* --- 11. Privacy Policy Mock Content ------------------------------------- */

export interface PrivacySection {
  heading: string;
  body: string;
}

export const MOCK_PRIVACY_SECTIONS: readonly PrivacySection[] = [
  {
    heading: "1. Scope & Data Controller",
    body: "Axion Advisory Group Ltd. operates this website and acts as the data controller for personal data collected through our contact forms and communications, in compliance with the Kenya Data Protection Act, 2019. [Demonstration text]",
  },
  {
    heading: "2. Information We Collect",
    body: "We collect personal information that you voluntarily provide when submitting an enquiry, including your full name, business email address, company name, telephone number, and message content. [Demonstration text]",
  },
  {
    heading: "3. Purpose of Processing",
    body: "We process your information exclusively to evaluate and respond to your commercial advisory enquiries, communicate terms of service, and fulfill our legal and regulatory compliance obligations under Kenyan law. [Demonstration text]",
  },
  {
    heading: "4. Data Security & Retention",
    body: "We maintain appropriate technical and organizational safeguards to protect your personal data against unauthorized disclosure or loss. Contact enquiry records are retained only as long as necessary to resolve your request. [Demonstration text]",
  },
  {
    heading: "5. Your Statutory Rights",
    body: "Under the Kenya Data Protection Act, you have the right to request access to, rectification of, or erasure of your personal data held by Axion Advisory Group Ltd., subject to statutory retention requirements. [Demonstration text]",
  },
  {
    heading: "6. Enquiries & Contact",
    body: "For questions regarding this privacy notice or data protection practices, contact our compliance officer at contact@example.com [Demo Address].",
  },
] as const;


