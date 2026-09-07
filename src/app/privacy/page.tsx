import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CookieBanner } from "@/components/layout/cookie-banner";
import {
  getHomepageContent,
  MOCK_PRIVACY_SECTIONS,
} from "@/lib/mock-content";

export const metadata: Metadata = {
  title: "Privacy Notice · Axion Advisory Group",
  description:
    "Data protection policy and privacy framework for Axion Advisory Group under the Kenya Data Protection Act, 2019.",
};

/**
 * Privacy Notice Page (`/privacy`)
 *
 * Provides a structured regulatory privacy disclosure adhering to the Kenya
 * Data Protection Act, 2019. In mock mode, clearly flags demo copy pending
 * formal legal counsel review.
 */
export default function PrivacyPage() {
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
          Privacy policy copy below is for evaluation purposes pending final legal sign-off.
        </aside>
      )}

      <SiteHeader />
      <main id="main-content" className="flex-1 py-band">
        <article className="max-w-page mx-auto px-md max-w-[52rem]">
          <header className="mb-xl border-b border-border pb-lg">
            <p className="font-sans text-caption font-medium uppercase tracking-wide text-stroke-systems mb-xs">
              Regulatory Framework
            </p>
            <h1 className="font-display text-h1 font-normal text-foreground mb-sm">
              Privacy Notice
            </h1>
            <p className="text-lead text-muted-foreground">
              How Axion Advisory Group collects, uses, and safeguards personal
              data under the Kenya Data Protection Act, 2019.
            </p>
            <p className="mt-sm text-caption text-muted-foreground">
              Last revised: August 2026 · Nairobi, Kenya
            </p>
          </header>

          <div className="flex flex-col gap-xl">
            {MOCK_PRIVACY_SECTIONS.map((section) => (
              <section key={section.heading} className="flex flex-col gap-xs">
                <h2 className="font-display text-h3 font-normal text-foreground">
                  {section.heading}
                </h2>
                <p className="font-sans text-body text-muted-foreground leading-relaxed">
                  {section.body}
                </p>
              </section>
            ))}
          </div>
        </article>
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

