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
import { ProofSection } from "@/components/sections/proof-section";
import { ServicesSection } from "@/components/sections/services-section";
import { getHomepageContent } from "@/lib/mock-content";

/**
 * Axion Advisory Group — Homepage.
 *
 * Built strictly against `HOMEPAGE_RHYTHM` (src/types/section.ts) and the
 * content register in `CONTENT.md`.
 *
 * Consumes `getHomepageContent()` adapter:
 * - In "mock" mode (default for evaluation): Gated sections are populated with
 *   centralized demonstration data to evaluate full visual and interactive rhythm.
 * - In "production" mode: Unverified fields remain undefined, gracefully activating
 *   existing component gating (`null` returns, disabled form, etc.).
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
 *   Proof
 *   ↓
 *   Closing CTA
 *   ↓
 *   Contact
 *   ↓
 *   Footer
 */
export default function Home() {
  const content = getHomepageContent();

  return (
    <>
      {content.isMock && (
        <aside
          role="status"
          aria-label="Demonstration mode notice"
          className="border-b border-border bg-muted/80 px-md py-xs text-center text-caption font-sans text-muted-foreground"
        >
          <span className="font-medium text-foreground">Demonstration Mode:</span>{" "}
          Displaying centralized mock data for layout &amp; interaction evaluation. Real client claims remain gated.
        </aside>
      )}

      <SiteHeader />
      <main id="main-content" className="flex-1">
        <Hero />
        <BuyerFork />
        <ServicesSection servicesBySlug={content.servicesBySlug} />
        <Approach closingNote={content.approach.closingNote} />
        <About
          bodyOne={content.about.bodyOne}
          bodyTwo={content.about.bodyTwo}
        />
        <Credibility
          stats={content.credibility.stats}
          certifications={content.credibility.certifications}
        />
        <ProofSection
          caseStudy={content.proof.caseStudy}
          testimonial={content.proof.testimonial}
        />
        <ClosingCta />
        <Contact
          address={content.contact.address}
          phone={content.contact.phone}
          hours={content.contact.hours}
          consentText={content.contact.consentText}
          slaText={content.contact.slaText}
        />
      </main>
      <SiteFooter
        address={content.footer.address}
        phone={content.footer.phone}
        email={content.footer.email}
        registrationNumber={content.footer.registrationNumber}
        entityName={content.footer.entityName}
        copyrightYear={content.footer.copyrightYear}
      />
      <CookieBanner notice={content.cookieNotice} />
    </>
  );
}
