import type { Metadata, Viewport } from "next";
import { Merriweather, Source_Sans_3 } from "next/font/google";

import "./globals.css";

/* ---------------------------------------------------------------------------
   Type.

   BRAND.md sets the direction: Merriweather for headings, Source Sans 3 for
   body and UI. The intent is editorial authority plus corporate clarity —
   the serif carries hierarchy, the sans carries the interface.

   Merriweather is used SELECTIVELY: h1-h4 and the small number of non-heading
   elements that are genuinely editorial (a pull quote, a card title). It is
   deliberately kept off navigation, buttons, forms, tables, metadata and any
   numeric display. A serif in those places is what makes a corporate site
   read as a blog. See `--font-heading` in globals.css for the binding rule.

   Source Sans 3 carries everything else, which on this site is most things.

   Weights are explicit rather than variable, to keep the payload honest, and
   are exactly the ones the type scale asks for:
     Merriweather   500 (h3) / 600 (h2) / 700 (h1)
     Source Sans 3  400 (body, small) / 500 / 600 / 700

   Both are loaded through `next/font/google`, which self-hosts the files,
   emits no render-blocking external stylesheet, and generates a size-adjusted
   local fallback so the swap does not shift layout. `display: "swap"` keeps
   text visible during the (already brief) load.

   Neither family is loaded in italic. Merriweather ships a true italic, but
   the design does not use it — see the anti-slop note in `globals.css` §3.
--------------------------------------------------------------------------- */

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans-3",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  display: "swap",
});

/**
 * Absolute URLs for OG and canonical tags. The production domain is not in
 * CONTENT.md and is not ours to invent, so it comes from the environment.
 * Set `NEXT_PUBLIC_SITE_URL` before the production build or the OG card will
 * point at localhost.
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/* Copy below is quoted from the register in CONTENT.md. Slot IDs are noted so
   an edit here can be traced back to the row it belongs to. Both META slots
   are DRAFT, so they are editable, but they are not ours to rewrite freely. */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  // META-TITLE, budget 60
  title: "Axion Advisory Group · Business & Financial Advisory, Kenya",
  // META-DESC, budget 155
  description:
    "Business consultancy, financial management, risk, financing, training, and market entry advisory for organisations. Based in Nairobi.",
  applicationName: "Axion Advisory Group",
  icons: {
    icon: [
      { url: "/seo/favicon.svg", type: "image/svg+xml" },
      { url: "/seo/favicon.ico", sizes: "48x48" },
      { url: "/seo/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/seo/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/seo/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/seo/site.webmanifest",
  openGraph: {
    type: "website",
    siteName: "Axion Advisory Group",
    locale: "en_KE",
    title: "Axion Advisory Group · Business & Financial Advisory, Kenya",
    description:
      "Business consultancy, financial management, risk, financing, training, and market entry advisory for organisations. Based in Nairobi.",
    url: "/",
    images: [
      {
        url: "/seo/og.png",
        width: 1200,
        height: 630,
        // META-OG-ALT, budget 120
        alt: "The Axion Advisory Group mark and wordmark on a deep navy field.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Axion Advisory Group · Business & Financial Advisory, Kenya",
    description:
      "Business consultancy, financial management, risk, financing, training, and market entry advisory for organisations. Based in Nairobi.",
    images: ["/seo/og.png"],
  },
};

export const viewport: Viewport = {
  /* Paper. BRAND.md: paper is the ground state, navy bands are punctuation,
     so the browser chrome should match the canvas and not the footer. */
  themeColor: "#F6F7FA",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /* en-KE, not en-US. BRAND.md: Kenyan English, KES for currency.
       No `dark` class on <html>: dark is a section-level surface here, not a
       page mode. See the token header in globals.css. */
    <html
      lang="en-KE"
      className={`${merriweather.variable} ${sourceSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
