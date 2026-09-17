import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CookieBanner } from "@/components/layout/cookie-banner";
import { About } from "@/components/sections/about";
import { Approach } from "@/components/sections/approach";
import { BuyerFork } from "@/components/sections/buyer-fork";
import { ClosingCta } from "@/components/sections/closing-cta";
import { Contact } from "@/components/sections/contact";
import { Credibility } from "@/components/sections/credibility";
import { Hero } from "@/components/sections/hero";
import { MissionVisionValues } from "@/components/sections/mission-vision-values";
import { ProofSection } from "@/components/sections/proof-section";
import { ServicesSection } from "@/components/sections/services-section";
import {
  ABOUT_BODY,
  ABOUT_IMAGE,
  APPROACH_CLOSING_NOTE,
  CONTACT_DETAILS,
  COOKIE_NOTICE,
  CORE_VALUES,
  CREDIBILITY_CERTIFICATIONS,
  CREDIBILITY_STATS,
  FOOTER_DETAILS,
  MISSION,
  TESTIMONIALS,
  VISION,
} from "@/lib/site-content";

/**
 * Axion Advisory Group — Homepage.
 *
 * Built strictly against `HOMEPAGE_RHYTHM` (src/types/section.ts) and the
 * content register in `CONTENT.md`. Business information comes from
 * `src/lib/site-content.ts`; a section whose props are left undefined keeps
 * its own gating (`null` returns, disabled form, etc.).
 *
 * Sequence:
 *   Top Sentinel (inside SiteHeader)
 *   ↓
 *   Site Header
 *   ↓
 *   Hero
 *   ↓
 *   Buyer Fork
 *   ↓
 *   Services
 *   ↓
 *   Approach
 *   ↓
 *   About
 *   ↓
 *   Credibility
 *   ↓
 *   Mission, Vision & Values
 *   ↓
 *   Proof
 *   ↓
 *   Closing CTA
 *   ↓
 *   Contact
 *   ↓
 *   Footer
 */
export default function Home() {
  return (
    <>
      <SiteHeader overlay />
      <main id="main-content" className="flex-1">
        <Hero />
        <BuyerFork />
        <ServicesSection />
        <Approach closingNote={APPROACH_CLOSING_NOTE} />
        <About
          image={ABOUT_IMAGE}
          bodyOne={ABOUT_BODY.bodyOne}
          bodyTwo={ABOUT_BODY.bodyTwo}
        />
        <Credibility
          stats={CREDIBILITY_STATS}
          certifications={CREDIBILITY_CERTIFICATIONS}
        />
        <MissionVisionValues
          mission={MISSION}
          vision={VISION}
          values={CORE_VALUES}
        />
        <ProofSection testimonials={TESTIMONIALS} />
        <ClosingCta />
        <Contact {...CONTACT_DETAILS} />
      </main>
      <SiteFooter {...FOOTER_DETAILS} />
      <CookieBanner notice={COOKIE_NOTICE} />
    </>
  );
}
