import type { Metadata, Viewport } from "next";
import { Archivo, Bodoni_Moda } from "next/font/google";

import "./globals.css";

/* ---------------------------------------------------------------------------
   Type.

   BRAND.md sets the direction: "high-contrast display serif plus a neutral
   grotesque for UI. Inter is banned as the display face." Inter is not used
   anywhere in this project, as a display face or otherwise.

   Bodoni Moda carries display. It is a true Didone, so the stroke contrast is
   structural rather than styled, which is what "high-contrast" actually asks
   for. It letterspaces without falling apart, which the identity needs: both
   the AAG wordmark and the AXION ADVISORY GROUP lockup are specified as
   letterspaced serif. Playfair Display would have been the obvious pick from
   the taste skill's rotation pool and is the reason it was passed over: it is
   the most-reached-for serif on Google Fonts and reads as a default. Fraunces
   and Instrument Serif are banned outright by the skill.

   Archivo carries UI. A neutral grotesque with a slightly narrow set width, so
   it holds a nav bar on one line and stays legible at caption sizes without
   competing with the Didone's contrast.

   Weights are explicit rather than variable, to keep the payload honest:
   display 400 and 600 in both styles, UI 400/500/600. Display headlines run at
   400, because filling in a Didone's hairlines at 600 destroys the contrast
   that made it worth choosing. 600 exists for the small letterspaced lockup,
   where a 400 hairline would disappear. Italic is loaded because the taste
   skill requires in-family italic for emphasis inside a headline rather than a
   second family.
--------------------------------------------------------------------------- */

const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni-moda",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
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
  title: "Axion Advisory Group · Business and Financial Advisory, Kenya",
  // META-DESC, budget 155
  description:
    "Business consultancy, financial management, and risk advisory for Kenyan firms. Practical advice from advisors who have run the numbers.",
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
    title: "Axion Advisory Group · Business and Financial Advisory, Kenya",
    description:
      "Business consultancy, financial management, and risk advisory for Kenyan firms. Practical advice from advisors who have run the numbers.",
    url: "/",
    images: [
      {
        url: "/seo/og.png",
        width: 1200,
        height: 630,
        // META-OG-ALT, budget 120
        alt: "Axion Advisory Group logo on a deep navy field.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Axion Advisory Group · Business and Financial Advisory, Kenya",
    description:
      "Business consultancy, financial management, and risk advisory for Kenyan firms. Practical advice from advisors who have run the numbers.",
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
      className={`${bodoniModa.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
