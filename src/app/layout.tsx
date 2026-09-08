import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

import "./globals.css";

/* ---------------------------------------------------------------------------
   Type.

   BRAND.md sets the direction: geometric sans display (Space Grotesk) plus a
   neutral grotesque for UI (Inter).

   Space Grotesk carries display, including the AAG wordmark and the AXION
   ADVISORY GROUP lockup — both letterspaced, per BRAND.md's identity block.
   Google Fonts ships it in weight 300-700, upright only; there is no italic
   style, so nothing in this project uses `italic` on `font-display` text (see
   `testimonial-quote.tsx`, the one place that used to).

   Inter carries UI: nav, body copy, form fields, captions.

   Weights are explicit rather than variable, to keep the payload honest:
   display 400 and 600, UI 400/500/600. Both display weights already match
   every `font-display` usage in the codebase (`font-normal` / `font-semibold`
   Tailwind classes), so the type-scale layer needed no changes for the swap.
--------------------------------------------------------------------------- */

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
    "Business consultancy, financial management, risk, financing, training, and market entry advisory for Kenyan firms. Based in Nairobi.",
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
      "Business consultancy, financial management, risk, financing, training, and market entry advisory for Kenyan firms. Based in Nairobi.",
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
      "Business consultancy, financial management, risk, financing, training, and market entry advisory for Kenyan firms. Based in Nairobi.",
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
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
