<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Website Reverse-Engineer Template

## What This Is
A reusable template for reverse-engineering any website into a clean, modern Next.js codebase using AI coding agents. The Next.js + shadcn/ui + Tailwind v4 base is pre-scaffolded — just run `/clone-website <url1> [<url2> ...]`.

## Tech Stack
- **Framework:** Next.js 16 (App Router, React 19, TypeScript strict)
- **UI:** shadcn/ui (Radix primitives, Tailwind CSS v4, `cn()` utility)
- **Icons:** Lucide React (default — will be replaced/supplemented by extracted SVGs)
- **Styling:** Tailwind CSS v4 with oklch design tokens
- **Deployment:** Vercel

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run lint` — ESLint check
- `npm run typecheck` — TypeScript check
- `npm run check` — Run lint + typecheck + build

## Code Style
- TypeScript strict mode, no `any`
- Named exports, PascalCase components, camelCase utils
- Tailwind utility classes, no inline styles
- 2-space indentation
- Responsive: mobile-first

## Design Principles
- **Taste Skill governs visual language** — `design-taste-frontend` sets layout, type scale, motion, spacing, and density, at the dials `BRAND.md` specifies
- **Aesthetic decisions are made against `BRAND.md`** — not against a reference site
- **Spec files are the source of truth for structure** — a builder implements its spec, not a screenshot
- **Beauty-first** — every pixel matters

## Project Structure
```
src/
  app/              # Next.js routes
  components/       # React components
    ui/             # shadcn/ui primitives
    icons.tsx       # Extracted SVG icons as React components
  lib/
    utils.ts        # cn() utility (shadcn)
  types/            # TypeScript interfaces
  hooks/            # Custom React hooks
public/
  images/           # Downloaded images from target site
  videos/           # Downloaded videos from target site
  seo/              # Favicons, OG images, webmanifest
docs/
  research/         # Inspection output (design tokens, components, layout)
  design-references/ # Screenshots and visual references
scripts/            # Asset download scripts
```

## MOST IMPORTANT NOTES
- When launching Claude Code agent teams, ALWAYS have each teammate work in their own worktree branch and merge everyone's work at the end, resolving any merge conflicts smartly since you are basically serving the orchestrator role and have full context to our goals, work given, work achieved, and desired outcomes.
- After editing `AGENTS.md`, run `bash scripts/sync-agent-rules.sh` to regenerate platform-specific instruction files.
- After editing `.claude/skills/clone-website/SKILL.md`, run `node scripts/sync-skills.mjs` to regenerate the skill for all platforms.

@docs/research/INSPECTION_GUIDE.md

---

## Project precedence — Axion Advisory Group

This project is a build for a real client, not a template demo. When sources of instruction disagree, resolve in this order.

1. **`BRAND.md` overrides everything.** Colour tokens, the contrast law, identity, voice, and the taste dials are set there. Nothing in this file, in a skill, or in a builder prompt overrides it.
2. **The Taste Skill `design-taste-frontend` governs visual language:** layout, type scale, motion, spacing, density. Its dials are set by `BRAND.md` to DESIGN_VARIANCE 5, MOTION_INTENSITY 4, VISUAL_DENSITY 5, not its own 8 / 6 / 4 baseline.
3. **The clone-website skill is used for PROCESS ONLY.** Its spec discipline, parallel builder dispatch, and QA diff loop. Its Scope Defaults (pixel-perfect, pure emulation, verbatim content, asset download) are OVERRIDDEN and must not be applied.
4. **AGENTS.md code style and build gates still apply.** TypeScript strict, no `any`, named exports, Tailwind utilities, 2-space indentation, mobile-first. `npx tsc --noEmit` before any builder finishes, `npm run check` before any merge is called done.
5. **Zero assets, images, logos, fonts, icons, colour values, or copy may be taken from mandraxconsultinggroup.co.ke.** It is an information-architecture reference only. Downloading from it is a build failure.

Content claims are governed by `CONTENT.md`. No agent invents client names, testimonials, outcomes, contract values, staff counts, founding dates, certifications, awards, office locations, or regulatory registrations.

## Environment constraints

- Shell is zsh on a Debian-derived Linux. When you give me a command to run, use zsh-compatible syntax (`rehash`, not `hash -r`).
- Browser automation is Playwright MCP. Always use the MCP tools directly; never write a Bash script that shells out to Playwright.
- npm blocks package lifecycle scripts by default in this environment. If a build fails on a missing native binding, the fix is `npm install-scripts approve <pkg>` for that single package, then `npm rebuild <pkg>`. Never blanket-allow all install scripts.
- Never run `npm audit fix --force`. It installs breaking major versions and will dismantle the Next.js scaffold.
- Git worktrees do not inherit `node_modules`. Any worktree you create must have the root `node_modules` symlinked in before an agent runs typecheck there.
