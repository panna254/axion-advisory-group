import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CookieBanner } from "@/components/layout/cookie-banner";
import {
  CONTACT_EMAIL,
  COOKIE_NOTICE,
  FOOTER_DETAILS,
  PRIVACY_SECTIONS,
} from "@/lib/site-content";

/** Renders `text` with each mention of the contact email as a `mailto:` link. */
function withEmailLinks(text: string) {
  const [first, ...rest] = text.split(CONTACT_EMAIL);
  if (rest.length === 0) return text;

  return (
    <>
      {first}
      {rest.map((after, index) => (
        <span key={index}>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="wrap-anywhere text-action-text underline-offset-2 transition-colors duration-200 hover:underline focus-visible:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {CONTACT_EMAIL}
          </a>
          {after}
        </span>
      ))}
    </>
  );
}

export const metadata: Metadata = {
  title: "Privacy Notice · Axion Advisory Group",
  description:
    "Data protection policy and privacy framework for Axion Advisory Group under the Kenya Data Protection Act, 2019.",
};

/**
 * Privacy Notice Page (`/privacy`)
 *
 * Provides a structured regulatory privacy disclosure adhering to the Kenya
 * Data Protection Act, 2019. The copy is still pending formal legal counsel
 * review.
 */
export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="flex-1 py-band">
        <article className="mx-auto px-md max-w-prose">
          <header className="mb-xl border-b border-border pb-lg">
            <p className="font-body text-small font-medium uppercase tracking-wide text-stroke-systems mb-xs">
              Regulatory Framework
            </p>
            <h1 className="font-heading text-h1 text-foreground mb-sm">
              Privacy Notice
            </h1>
            <p className="text-lead text-muted-foreground">
              How Axion Advisory Group collects, uses, and safeguards personal
              data under the Kenya Data Protection Act, 2019.
            </p>
            <p className="mt-sm text-small text-muted-foreground">
              Last revised: August 2026 · Nairobi, Kenya
            </p>
          </header>

          <div className="flex flex-col gap-xl">
            {PRIVACY_SECTIONS.map((section) => (
              <section key={section.heading} className="flex flex-col gap-xs">
                <h2 className="font-heading text-h3 text-foreground">
                  {section.heading}
                </h2>
                <p className="font-body text-body text-muted-foreground leading-relaxed">
                  {withEmailLinks(section.body)}
                </p>
              </section>
            ))}
          </div>
        </article>
      </main>
      <SiteFooter {...FOOTER_DETAILS} />
      <CookieBanner notice={COOKIE_NOTICE} />
    </>
  );
}

