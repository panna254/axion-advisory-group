import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CookieBanner } from "@/components/layout/cookie-banner";
import { ClosingCta } from "@/components/sections/closing-cta";
import {
  COOKIE_NOTICE,
  FOOTER_DETAILS,
  INSIGHT_ARTICLES,
} from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Insights & Commentary · Axion Advisory Group",
  description:
    "Practical analysis and commentary on strategy, corporate finance, and risk management for organisations.",
};

/**
 * Insights Page (`/insights`)
 *
 * Displays commercial commentary and advisory perspectives from
 * `INSIGHT_ARTICLES`. With no articles, renders the empty-state fallback per
 * CONTENT.md slot EMPTY-INSIGHTS.
 */
export default function InsightsPage() {
  const hasArticles = INSIGHT_ARTICLES.length > 0;

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="flex-1 py-band">
        <div className="max-w-page mx-auto px-md">
          <header className="mb-2xl max-w-[48ch]">
            <p className="font-body text-small font-medium uppercase tracking-wide text-stroke-systems mb-xs">
              Advisory Perspectives
            </p>
            <h1 className="font-heading text-h1 text-foreground mb-sm">
              Insights
            </h1>
            <p className="text-lead text-muted-foreground">
              Practical commentary on financial strategy, regulatory frameworks,
              and risk management across Kenya.
            </p>
          </header>

          {hasArticles ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
              {INSIGHT_ARTICLES.map((article) => (
                <article
                  key={article.slug}
                  className="rounded-xl border border-border bg-card p-xl flex flex-col gap-md transition-[border-color,background-color] duration-200 hover:border-stroke-systems hover:bg-muted"
                >
                  <div className="flex items-center justify-between text-small text-muted-foreground">
                    <span className="font-medium uppercase tracking-wide text-stroke-systems">
                      {article.category}
                    </span>
                    <span>{article.readTime}</span>
                  </div>

                  <h2 className="font-heading text-h3 text-foreground">
                    {article.title}
                  </h2>

                  <p className="font-body text-body text-muted-foreground flex-1">
                    {article.excerpt}
                  </p>

                  <div className="pt-sm border-t border-border flex items-center justify-between text-small text-muted-foreground">
                    <span>{article.date}</span>
                    <span className="text-action-text font-medium">Read article →</span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-card p-2xl text-center max-w-[42ch] mx-auto my-xl">
              <p className="font-heading text-h3 text-foreground mb-xs">
                No articles published yet.
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

      <SiteFooter {...FOOTER_DETAILS} />
      <CookieBanner notice={COOKIE_NOTICE} />
    </>
  );
}

