import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CookieBanner } from "@/components/layout/cookie-banner";
import { ClosingCta } from "@/components/sections/closing-cta";
import {
  getHomepageContent,
  getInsightsContent,
} from "@/lib/mock-content";

export const metadata: Metadata = {
  title: "Insights & Commentary · Axion Advisory Group",
  description:
    "Practical analysis and commentary on strategy, corporate finance, and risk management for Kenyan firms.",
};

/**
 * Insights Page (`/insights`)
 *
 * Displays commercial commentary and advisory perspectives.
 * - In "mock" mode: Renders demonstration articles to evaluate grid, typography, and card design.
 * - In "production" mode: Renders the clean empty-state fallback ("No articles published yet.") per CONTENT.md slot EMPTY-INSIGHTS.
 */
export default function InsightsPage() {
  const homeContent = getHomepageContent();
  const insightsContent = getInsightsContent();
  const hasArticles = insightsContent.articles.length > 0;

  return (
    <>
      {insightsContent.isMock && (
        <aside
          role="status"
          aria-label="Demonstration mode notice"
          className="border-b border-border bg-muted/80 px-md py-xs text-center text-caption font-sans text-muted-foreground"
        >
          <span className="font-medium text-foreground">Demonstration Mode:</span>{" "}
          Sample insight articles below are for visual and layout evaluation.
        </aside>
      )}

      <SiteHeader />
      <main id="main-content" className="flex-1 py-band">
        <div className="max-w-page mx-auto px-md">
          <header className="mb-2xl max-w-[48ch]">
            <p className="font-sans text-caption font-medium uppercase tracking-wide text-stroke-systems mb-xs">
              Advisory Perspectives
            </p>
            <h1 className="font-display text-h1 font-normal text-foreground mb-sm">
              Insights
            </h1>
            <p className="text-lead text-muted-foreground">
              Practical commentary on financial strategy, regulatory frameworks,
              and risk management across Kenya.
            </p>
          </header>

          {hasArticles ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
              {insightsContent.articles.map((article) => (
                <article
                  key={article.slug}
                  className="rounded-xl border border-border bg-card p-xl flex flex-col gap-md transition-[border-color,background-color] duration-200 hover:border-stroke-systems hover:bg-muted"
                >
                  <div className="flex items-center justify-between text-caption text-muted-foreground">
                    <span className="font-medium uppercase tracking-wide text-stroke-systems">
                      {article.category}
                    </span>
                    <span>{article.readTime}</span>
                  </div>

                  <h2 className="font-display text-h3 font-normal text-foreground">
                    {article.title}
                  </h2>

                  <p className="font-sans text-body text-muted-foreground flex-1">
                    {article.excerpt}
                  </p>

                  <div className="pt-sm border-t border-border flex items-center justify-between text-caption text-muted-foreground">
                    <span>{article.date}</span>
                    <span className="text-action-text font-medium">Read article →</span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-card p-2xl text-center max-w-[42ch] mx-auto my-xl">
              <p className="font-display text-h3 font-normal text-foreground mb-xs">
                {insightsContent.emptyMessage}
              </p>
              <p className="text-body text-muted-foreground">
                Our advisors publish commentary as regulatory and market events
                develop. Check back soon.
              </p>
            </div>
          )}
        </div>
      </main>

      <ClosingCta />

      <SiteFooter
        address={homeContent.footer.address}
        phone={homeContent.footer.phone}
        email={homeContent.footer.email}
        registrationNumber={homeContent.footer.registrationNumber}
        entityName={homeContent.footer.entityName}
        copyrightYear={homeContent.footer.copyrightYear}
      />
      <CookieBanner notice={homeContent.cookieNotice} />
    </>
  );
}

