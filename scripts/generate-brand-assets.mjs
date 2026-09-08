#!/usr/bin/env node
/**
 * Generates every SEO image in public/seo/ from the brand tokens and the mark
 * geometry, so nothing here is a hand-placed binary that drifts from BRAND.md.
 *
 *   node scripts/generate-brand-assets.mjs
 *
 * Produces:
 *   favicon.svg           the mark on a navy tile, scalable
 *   favicon.ico           16 / 32 / 48, for legacy requests to /favicon.ico
 *   icon-192.png          web app manifest
 *   icon-512.png          web app manifest
 *   apple-touch-icon.png  180, no transparency by Apple convention
 *   og.png                1200 x 630 social card
 *   site.webmanifest
 *
 * Requires ImageMagick for the .ico container only. Everything else is sharp
 * and satori, both of which ship with the project already.
 */

import { execFileSync } from "node:child_process";
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// The `next/og` specifier only resolves inside the bundler. This is the same
// ImageResponse (satori + resvg), reached directly so the script runs in Node.
import { ImageResponse } from "next/dist/compiled/@vercel/og/index.node.js";
import React from "react";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "public", "seo");

/* --- Brand values, hex-resolved from the oklch tokens in globals.css ------ */
const NAVY = "#0B1233";
const CRIMSON = "#E01A4F";
const CRIMSON_LIGHT = "#F27A9C";
const CYAN = "#29ABE2";
const MUTED_ON_NAVY = "#A9B0C7";

/* --- The mark ------------------------------------------------------------
   Same construction as src/components/brand/AagLogo.tsx: a flat-bottomed form
   whose top is a full semicircle, arc radius exactly half the form width.
   Redrawn here at tile proportions rather than scaled, so it stays legible at
   16px where the lockup's slimmer forms would close up.
--------------------------------------------------------------------------- */
const TILE_SHIELD_LEFT = "M9 50 L9 24 A10 10 0 0 1 29 24 L29 50 Z";
const TILE_SHIELD_RIGHT = "M35 50 L35 24 A10 10 0 0 1 55 24 L55 50 Z";

/** The tile: mark on navy, for favicons and app icons. */
function tileSvg({ size = 64, radius = 10, background = NAVY } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${size}" height="${size}">
  <rect width="64" height="64" rx="${radius}" ry="${radius}" fill="${background}"/>
  <path d="${TILE_SHIELD_LEFT}" fill="${CRIMSON}"/>
  <path d="${TILE_SHIELD_RIGHT}" fill="${CYAN}"/>
</svg>`;
}

/** The lockup mark, transparent, for compositing into the OG card. */
const LOCKUP_MARK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 112" width="128" height="112">
  <path d="M8 100 L8 37 A25 25 0 0 1 58 37 L58 100 Z" fill="${CRIMSON}"/>
  <path d="M70 100 L70 37 A25 25 0 0 1 120 37 L120 100 Z" fill="${CYAN}"/>
</svg>`;

/* --- Fonts ---------------------------------------------------------------
   Satori cannot read woff2, so these are the TrueType builds. The legacy
   user-agent is what makes the Google Fonts CSS API serve .ttf.
--------------------------------------------------------------------------- */
const FONT_CSS_URL =
  "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600&family=Archivo:wght@400&display=swap";

async function loadFonts() {
  const css = await fetch(FONT_CSS_URL, {
    headers: { "User-Agent": "Mozilla/4.0" },
  }).then((r) => r.text());

  const faces = [...css.matchAll(/font-family: '([^']+)';[\s\S]*?font-weight: (\d+);[\s\S]*?src: url\(([^)]+)\)/g)];
  if (faces.length < 3) {
    throw new Error(`Expected 3 font faces from Google Fonts, parsed ${faces.length}`);
  }

  return Promise.all(
    faces.map(async ([, family, weight, url]) => ({
      name: family,
      weight: Number(weight),
      style: "normal",
      data: await fetch(url).then((r) => r.arrayBuffer()),
    })),
  );
}

/* --- OG card -------------------------------------------------------------
   Left-aligned rather than centred: DESIGN_VARIANCE 5 rules out a dead-centre
   composition, and a card that reads left-to-right survives being cropped on
   the right by a share preview.

   Every colour here sits on navy and clears the contrast law:
   cyan 6.98:1, crimson-light 7.00:1, muted 8.49:1.
--------------------------------------------------------------------------- */
function ogElement() {
  const h = React.createElement;
  const markDataUri = `data:image/svg+xml;base64,${Buffer.from(LOCKUP_MARK_SVG).toString("base64")}`;

  return h(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: NAVY,
        padding: "0 96px",
      },
    },
    // Mark and wordmark on one baseline.
    h(
      "div",
      { style: { display: "flex", alignItems: "center", gap: "36px" } },
      h("img", { src: markDataUri, width: 137, height: 120 }),
      h(
        "div",
        {
          style: {
            fontFamily: "Space Grotesk",
            fontWeight: 400,
            fontSize: 120,
            letterSpacing: "0.1em",
            color: CYAN,
            lineHeight: 1,
          },
        },
        "AAG",
      ),
    ),
    // Lockup.
    h(
      "div",
      {
        style: {
          marginTop: "44px",
          fontFamily: "Space Grotesk",
          fontWeight: 600,
          fontSize: 40,
          letterSpacing: "0.14em",
          color: CRIMSON_LIGHT,
          lineHeight: 1,
        },
      },
      "AXION ADVISORY GROUP",
    ),
    // Cyan is the systems colour, so the rule under the lockup is cyan.
    h("div", {
      style: {
        marginTop: "40px",
        width: "180px",
        height: "3px",
        background: CYAN,
      },
    }),
    // FOOT-BLURB, DRAFT in CONTENT.md.
    h(
      "div",
      {
        style: {
          marginTop: "28px",
          fontFamily: "Archivo",
          fontWeight: 400,
          fontSize: 30,
          color: MUTED_ON_NAVY,
          lineHeight: 1.4,
        },
      },
      "Business and financial advisory for Kenyan firms.",
    ),
  );
}

/* ------------------------------------------------------------------------ */

const MANIFEST = {
  name: "Axion Advisory Group",
  short_name: "AAG",
  description:
    "Business consultancy, financial management, and risk advisory for Kenyan firms.",
  start_url: "/",
  display: "standalone",
  background_color: "#F6F7FA",
  theme_color: "#F6F7FA",
  icons: [
    { src: "/seo/icon-192.png", sizes: "192x192", type: "image/png" },
    { src: "/seo/icon-512.png", sizes: "512x512", type: "image/png" },
  ],
};

async function main() {
  await mkdir(OUT, { recursive: true });

  // Scalable favicon.
  await writeFile(path.join(OUT, "favicon.svg"), `${tileSvg()}\n`, "utf8");

  // Raster tiles. Radius scales with the tile so the corner stays proportional.
  const rasters = [
    { file: "icon-192.png", size: 192 },
    { file: "icon-512.png", size: 512 },
    // Apple flattens transparency onto white, so the tile is drawn edge to edge.
    { file: "apple-touch-icon.png", size: 180, radius: 0 },
  ];
  for (const { file, size, radius = 10 } of rasters) {
    await sharp(Buffer.from(tileSvg({ size, radius })))
      .png({ compressionLevel: 9 })
      .toFile(path.join(OUT, file));
  }

  // .ico wants small sizes drawn with a tighter radius, or the corners mush.
  const icoSizes = [16, 32, 48];
  const icoParts = [];
  for (const size of icoSizes) {
    const file = path.join(OUT, `.ico-${size}.png`);
    await sharp(Buffer.from(tileSvg({ size, radius: size <= 16 ? 4 : 8 })))
      .png()
      .toFile(file);
    icoParts.push(file);
  }
  execFileSync("magick", [...icoParts, path.join(OUT, "favicon.ico")]);
  // Browsers, feed readers and link unfurlers request bare /favicon.ico
  // regardless of what the <link> tags say, so the same file is written to the
  // public root. Generated from one source, so the two cannot drift.
  execFileSync("magick", [...icoParts, path.join(ROOT, "public", "favicon.ico")]);
  await Promise.all(icoParts.map((f) => rm(f)));

  // OG card.
  const fonts = await loadFonts();
  const response = new ImageResponse(ogElement(), {
    width: 1200,
    height: 630,
    fonts,
  });
  await writeFile(
    path.join(OUT, "og.png"),
    Buffer.from(await response.arrayBuffer()),
  );

  await writeFile(
    path.join(OUT, "site.webmanifest"),
    `${JSON.stringify(MANIFEST, null, 2)}\n`,
    "utf8",
  );

  console.log("Wrote brand assets to public/seo/");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
