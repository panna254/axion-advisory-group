import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CtaButton } from "@/components/ui/cta-button";

export const metadata: Metadata = {
  title: "Page Not Found · Axion Advisory Group",
  description:
    "The requested page could not be found. Return to the Axion Advisory Group homepage.",
};

/**
 * 404 Not Found — System State.
 *
 * Implements `404-H1`, `404-BODY`, and `404-CTA` from `CONTENT.md`.
 */
export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="flex-1 flex items-center justify-center py-band-anchor">
        <div className="max-w-page mx-auto px-md text-center max-w-[42ch]">
          <p className="font-sans text-caption font-medium uppercase tracking-wide text-muted-foreground mb-sm">
            404 — Not Found
          </p>
          <h1 className="font-display text-h1 font-normal text-foreground mb-md">
            That page is not here.
          </h1>
          <p className="text-lead text-muted-foreground mb-xl">
            The link may be old. Start from the homepage, or tell us what you
            were looking for.
          </p>
          <CtaButton variant="primary" href="/">
            Go to the homepage
          </CtaButton>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

