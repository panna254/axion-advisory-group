# Handover Audit — Forensic Report

**Scope:** Read-only forensic audit of repository state. No fixes, refactors, or improvements were made. The only file written by this audit is this one.
**Auditor:** Claude (Sonnet 5), 2026-09-07.
**Method:** Direct filesystem and git-object inspection. Every claim below is either a direct command output, a file read, or a labeled inference from timestamps. Where I could not establish ground truth, I say so.

---

## A. Git forensics

### A.0 — Environment anomaly discovered first: the primary worktree's git index is corrupted

Before any other command could run, `git status`, `git diff`, `git ls-files`, and `git diff-index` all failed identically:

```
fatal: .git/index: index file smaller than expected
```

`.git/index` is **0 bytes** (`ls -la` confirms), with mtime **2026-09-07 13:41:30.199**. This is not a normal git state — an empty index means git cannot compute working-tree-vs-commit status through its usual path. I worked around this for the rest of the audit using index-independent commands (`git log`, `git show`, `git ls-tree`, `git diff <ref>..<ref>`, direct `diff` against `git show HEAD:<path>` output, and raw `find`). Every git-derived fact below was obtained this way, not from `git status`.

**Timing is the important part.** The last real commit (`bc70331`) landed at **10:59:19**. A batch of uncommitted source-file writes followed in three waves (see A.3 and section C), the last of which — `src/lib/mock-content.ts` — was written at **13:41:29.363**. The index went to 0 bytes at **13:41:30.199**, one second later. The most plausible reading: a `git add`/`git commit` (or equivalent index write) was in progress immediately after that file was written, and was interrupted mid-write — consistent with a process being killed or a session ending abruptly. **I cannot confirm this mechanism; I can only confirm the timestamps line up to the second.** An alternative I cannot rule out: a crash unrelated to git activity that happened to coincide. There is no reflog or log entry that names the interrupted command.

A `.git/gk/` directory is present (`gk-last-accessed`/`gk-last-modified` timestamps per branch) — this is GitKraken's own metadata, evidence a GUI git client was used at some point, not evidence of agent activity.

I did not repair the index. `git add`, `git commit`, `git status`, and anything else that touches it will fail until it is rebuilt (`git read-tree HEAD` or equivalent) — that repair is a decision for you, not something I performed.

### A.1 — Branches, tags, and what's checked out

Tags: `baseline` (066cad0, template scaffold), `phase-memory` (6ae038b, BRAND.md/CONTENT.md/AGENTS.md established).

Current branch: `master`, at `bc70331`, 9 commits ahead of `phase-memory`. `master` tracks `origin/master`, which is still at `6ae038b` — **none of the 9 post-phase-memory commits have been pushed.**

The branch list carries **18 `worktree-agent-*` branches** (`git branch --list 'worktree-agent-*' | wc -l`). Only two still have live working directories (see A.2); the other 16 are orphaned refs pointing at commits already on `master`'s ancestry chain (`6ae038b`, `c450029`, or `01ba35b`) — leftover pointers from a per-teammate worktree workflow (AGENTS.md's "MOST IMPORTANT NOTES" prescribes exactly this pattern) whose directories were removed without `git branch -d`. They carry no unique work; they are ref clutter, not a data-loss risk.

### A.2 — Worktrees

`git worktree list` returns three entries: the primary checkout (`master`, `bc70331`) plus two live worktrees:

| Path | Branch | At commit |
|---|---|---|
| `.claude/worktrees/agent-a60b363c0e02029ef` | `worktree-agent-a60b363c0e02029ef` | `01ba35b` |
| `.claude/worktrees/agent-aa58219f3451e9530` | `worktree-agent-aa58219f3451e9530` | `01ba35b` |

Neither is "stale" in the git sense (both directories exist and are valid worktrees), but both are **one commit behind current `master`** and both carry their own uncommitted, untracked work that was never merged and never cleaned up:

- `agent-a60b363c0e02029ef` has an untracked `src/components/sections/proof-section.tsx` — a **different, less-developed draft** of the file that also exists (differently) untracked at repo root. See C and I for which version is live.
- `agent-aa58219f3451e9530` has an untracked `src/components/layout/site-header.tsx` — likewise a different draft from the root copy (uses a plain `<a>` instead of `next/link`'s active-state logic, a `<p>` for the section wrapper's inner container differs, different class-constant structure).

Both worktrees correctly symlink `node_modules` to the primary checkout's `node_modules` (confirmed via `file`), so AGENTS.md's environment-constraints rule on this point was followed.

**Note on `.gitignore` coverage:** `.gitignore` excludes `.worktrees/` (no leading dot on the child segment), but the actual worktrees live at `.claude/worktrees/`. The pattern does not match — `git add -A` from repo root would attempt to stage both full worktree checkouts. I did not test this destructively; flagging it as a latent trap.

### A.3 — Working tree state (reconstructed without `git status`)

**Tracked files modified since `HEAD` (content differs from `git show HEAD:<path>`):**

| File | Nature of change |
|---|---|
| `eslint.config.mjs` | Adds `.claude/**` to ignore globs |
| `src/app/page.tsx` | Rewritten from a placeholder into full section wiring (see C) |
| `src/components/sections/cluster-card.tsx` | Accepts an optional `servicesBySlug` override prop |
| `src/components/sections/credibility.tsx` | `Stat` type now re-exports `StatItem` from `@/types/stat` |
| `src/components/sections/services-section.tsx` | Accepts and threads the same `servicesBySlug` override |
| `src/types/service.ts` | Comment-only rewording |

**Untracked files (new, substantive, not gitignored) at repo root:**

```
src/app/api/contact/route.ts
src/app/insights/page.tsx
src/app/not-found.tsx
src/app/privacy/page.tsx
src/components/layout/cookie-banner.tsx
src/components/layout/site-header.tsx
src/components/sections/proof-section.tsx
src/lib/content-mode.ts
src/lib/mock-content.ts
```

None of this — the six modified files or the nine new ones — is staged, committed, or referenced by any commit message. **If this working tree were lost (a `git clean -fd` + `git checkout .`, a disk failure, a bad `stash drop`), this entire body of work disappears with no recovery path**, including the only implementation of homepage section wiring, the contact API route, the insights/privacy/404 pages, and the content-mode system described in section C/G.

Gitignored/expected noise not investigated further: `.next/` (build cache, regenerated by this audit's own `npm run check` run in section D — it already existed before I ran anything, evidence a build was run previously), `.playwright-mcp/*.yml` (session logs), `next-env.d.ts`, `tsconfig.tsbuildinfo`.

### A.4 — `package.json` / `package-lock.json` diff (phase-memory → HEAD)

```diff
+    "assets": "node scripts/generate-brand-assets.mjs",
     "dependencies": {
       "@base-ui/react": "^1.3.0",
+      "@phosphor-icons/react": "^2.1.10",
       "class-variance-authority": "^0.7.1",
       "clsx": "^2.1.1",
-      "lucide-react": "^1.6.0",
```

- **`lucide-react` removed, `@phosphor-icons/react` added.** AGENTS.md's own template text says icons default to Lucide "will be replaced/supplemented by extracted SVGs" — it does not name Phosphor. This is a plausible, defensible choice (icons.tsx documents it as "one family, one weight" via Phosphor's SSR entry to stay server-only) but it is a library swap beyond what AGENTS.md explicitly anticipated. Not a violation of any stated rule, just not pre-authorized by name.
- `package-lock.json` diff is the corresponding 14-line dependency-tree churn from that swap. No other dependency changes.
- **`sharp` is imported directly by `scripts/generate-brand-assets.mjs`** (`import sharp from "sharp"`) but is **not listed** in `package.json` dependencies or devDependencies. It resolves today only because it's hoisted transitively (present in `package-lock.json` as a sub-dependency, likely of Next.js's own optional image-optimization dependency, and physically present in `node_modules/sharp` at v0.35.3). This works by accident of hoisting, not by declaration — a clean install elsewhere is not guaranteed to produce it.

No dependency was added or removed beyond this single icon-library swap.

---

## B. Instruction-file integrity

This is the section the task called out as mattering most, and it turned up the most consequential finding in this audit outside of the content-mode system.

### B.1 — BRAND.md

Touched in exactly one commit (`6ae038b`, its creation) and never again. Working-tree copy is byte-identical to `HEAD`. **Clean — no drift, no unauthorized edits.**

### B.2 — CONTENT.md

Touched in `6ae038b` (creation) and again in `d180205` ("establish design foundation and component specs for rebuild"). I read the full diff. The `d180205` change:

- Expanded the register from 94 to 119 slots (renumbered sections 2–13 to match `IA_CRITIQUE.md`'s approved sequence, added `APP-START`, `FORM-CONSENT`, `FORM-SLA`, `FORM-INTEREST-OPTIONS`, `FOOT-PRIVACY`).
- **Self-corrected an error**: the summary table's `APPROVED` count went from 9 to **8**, with an explicit note that the previous 9 was wrong (`SVC-07-NAME` was never actually approved).
- **No `NEEDS-CLIENT-INPUT` row was downgraded.** The count of blocked slots went **up** (27 → 30), not down.

Current on-disk counts, verified by direct grep against the file's own summary table (`APPROVED 8 / DRAFT 81 / NEEDS-CLIENT-INPUT 30 / Total 119`) — self-consistent, and the count of `[CLIENT TO SUPPLY` bracket occurrences (30) exactly matches the `NEEDS-CLIENT-INPUT` row count (30). **CONTENT.md itself is clean and internally consistent.** (Its use elsewhere in the codebase is a different question — see G.)

### B.3 — AGENTS.md

Touched in the Initial commit and rewritten in `6ae038b`; untouched since. Working-tree copy matches `HEAD` exactly. The Design Principles block currently reads the rebuild-era version (Taste-Skill-governed, BRAND.md-driven, spec-files-as-source-of-truth) — **not** the emulation-era language. The "Project precedence" section (BRAND.md overrides everything → Taste Skill → clone-website process-only → AGENTS.md code style → mandrax zero-asset rule) is present and unedited. **Clean.**

### B.4 — Every other agent instruction file: a real, unaddressed drift

The template ships `scripts/sync-agent-rules.sh`, which regenerates platform-specific instruction files from `AGENTS.md`. AGENTS.md itself states the rule: *"After editing AGENTS.md, run `bash scripts/sync-agent-rules.sh` to regenerate platform-specific instruction files."*

That script was run once, at baseline template setup (commit `066cad0`). **It was never run again after AGENTS.md was rewritten for the AAG rebuild in `6ae038b`.** I checked git history for every generated file — none show a commit after `066cad0`.

Two categories result:

**Pointer files (safe — no copy to go stale):**
`CLAUDE.md`, `GEMINI.md` (`@AGENTS.md` include), `.cursor/rules/project.mdc`, `.windsurfrules` (both say "this project uses AGENTS.md as the single source of truth... reads AGENTS.md automatically"), `.aider.conf.yml` (`read: [AGENTS.md, ...]`). These stay correct regardless of when the sync script last ran, because they don't embed content — they defer to the live file.

**Full auto-generated copies (stale, and dangerously so):**
`.clinerules` (151 lines), `.continue/rules/project.md` (155 lines), `.github/copilot-instructions.md` (151 lines), `.amazonq/rules/project.md` (151 lines) — all four still carry a header saying `<!-- AUTO-GENERATED from AGENTS.md — do not edit directly. Run bash scripts/sync-agent-rules.sh to regenerate. -->`, and all four still contain the **pre-rebuild, emulation-era Design Principles block verbatim**:

```
## Design Principles
- **Pixel-perfect emulation** — match the target's spacing, colors, typography exactly
- **No personal aesthetic changes during emulation phase** — match 1:1 first, customize later
- **Real content** — use actual text and assets from the target site, not placeholders
- **Beauty-first** — every pixel matters
```

None of the four contains a "Project precedence" section at all (`grep -c "Project precedence"` returns 0 for all four). That means none of them carry:

- "BRAND.md overrides everything"
- The mandrax zero-asset rule (rule 5 — no assets, colours, or copy from `mandraxconsultinggroup.co.ke`)
- The CONTENT.md no-fabrication governance
- The environment constraints section

**Practical consequence:** an agent operating in this repo through Cline, Continue, GitHub Copilot, or Amazon Q — rather than Claude Code, Cursor, Windsurf, Gemini, or Aider — would currently be instructed to do the *opposite* of this project's actual rules: copy real content and assets verbatim from the reference site, with no mention that the reference site is off-limits for anything but structure. I found no evidence any of these tools were actually used against this repo (no artifacts, no distinguishing commit signatures), so I cannot say this gap has been *exploited* — only that it exists and is live.

### B.5 — Stray config directories

None found beyond the template baseline plus the two `.claude/worktrees/agent-*` checkouts (A.2) and `.git/gk/` (GitKraken client metadata, not an agent artifact). No unexpected top-level directories.

---

## C. Phase inventory

| Artefact | Status | Evidence |
|---|---|---|
| `docs/research/IA_REFERENCE.md` | **EXISTS** | 229 lines. Explicitly scoped as structure-only: "No verbatim copy, no colour values, no font names, no measurements, no asset paths, no client names, no figures, no testimonials." Committed `066cad0`→ referenced. |
| `docs/research/IA_CRITIQUE.md` | **EXISTS** | 141 lines. Proposes an 11-item section sequence and explicitly ends "Stopping here for approval. Nothing built..." |
| `docs/research/components/*.spec.md` | **EXISTS — all 19** | Listed below. |
| `src/app/globals.css` | **EXISTS — AAG oklch token block** | 457 lines. Cross-checked every hex value in the header comments against `BRAND.md`'s table — exact match (crimson `#E01A4F`, cyan `#29ABE2`, navy `#0B1233`, paper `#F6F7FA`, slate `#5A6178`, all oklch triplets match to 4 decimals). This is not the template default. |
| `src/app/layout.tsx` | **EXISTS, but stale against CONTENT.md** | Fonts configured (Bodoni Moda + Archivo, documented rationale). Metadata set — but `META-TITLE`/`META-DESC`/`META-OG-ALT` in `layout.tsx` are the **pre-`d180205` wording**, not the current CONTENT.md text. See G.1. |
| `src/components/brand/AagLogo.tsx` | **EXISTS** | 4.7 KB, committed `d180205`. |
| `src/components/icons.tsx` | **EXISTS** | 170 lines, Phosphor `/ssr` entry, committed `d180205`. |
| `src/types/` | **EXISTS** | `content.ts`, `index.ts`, `navigation.ts`, `section.ts`, `service.ts`, `stat.ts`, `team.ts`, `testimonial.ts` — all present. |
| Section components | **13 exist**, 11 committed + **2 uncommitted** | See below. |
| `src/app/page.tsx` wiring | **Wired, but only in the uncommitted working tree — not in any commit** | See C.2. |

### C.1 — Component specs (19 of 19 present)

```
  82  testimonial-quote.spec.md      129  approach.spec.md
  86  closing-cta.spec.md            129  buyer-fork.spec.md
  89  cluster-card.spec.md           139  form-field.spec.md
  92  services-section.spec.md       140  cta-button.spec.md
  95  services-data.spec.md          148  site-footer.spec.md
  97  credibility.spec.md            149  contact.spec.md
  97  proof-section.spec.md
  99  case-study-card.spec.md
 103  practice-line-row.spec.md
 107  about.spec.md
 111  mobile-nav-drawer.spec.md
 118  hero.spec.md
 128  site-header.spec.md
```

I scanned every spec for vague design language (words like "some", "appropriate", "nice", "roughly", "TBD") — the only two hits were false positives in context ("some but not all of STAT-01–03 supplied" is a precise boolean condition, not a vague value). Token-reference density (literal `--token`, `text-*`, `bg-*`, `oklch()`, hex counts) ranges 5–32 per file; the one low outlier, `services-data.spec.md`, is explicitly a data contract, not a visual spec, and says so in its own first paragraph. **Specs are concrete, not vague.**

**Every one of the 19 spec'd components has a matching implementation file.** But three of the nine *uncommitted* files have **no spec at all**: `cookie-banner.tsx`, `src/app/insights/page.tsx`, `src/app/privacy/page.tsx`, `src/app/api/contact/route.ts`, `src/app/not-found.tsx` (404 content is covered by CONTENT.md's system-states slots, but there is no `not-found.spec.md` the way every section has a `*.spec.md`). These five were built without going through the spec-first process AGENTS.md's Design Principles mandate ("Spec files are the source of truth for structure — a builder implements its spec, not a screenshot").

### C.2 — `src/app/page.tsx`: wired only in an uncommitted state

The **committed** `HEAD` version of `page.tsx` (last touched by commit `d633e1d`, never updated in any of the later commits) is still the original placeholder — it renders only `<AagLogo>` and one line of text. **None of the 13 built section components are wired into the homepage in git history.** If you checked out `HEAD` clean right now, the homepage would show the placeholder, not the site.

The **uncommitted, working-tree-only** `page.tsx` wires all 13 sections through a `getHomepageContent()` adapter. Its rendered sequence — SiteHeader, Hero, BuyerFork, ServicesSection, Approach, About, Credibility, ProofSection, ClosingCta, Contact, SiteFooter, CookieBanner — **matches `IA_CRITIQUE.md`'s proposed 11-item sequence exactly** (header, hero, fork, services, approach, about, credibility, proof, closing CTA, contact, footer; CookieBanner is an added legal utility, not one of the 11 content sections, so it doesn't count against the sequence). This is a genuine, correct implementation of the approved IA — it is just not committed anywhere.

### C.3 — Genuine phase: P5/P6 in substance, P4 in the git record

Reading the phase tags/commit messages at face value, `HEAD` claims completed component-library work through "Wave 2" (the `ServicesSection` commit). That claim is accurate as far as it goes — the 11 committed section files, the design foundation, and the spec library are real and match their specs.

But the actual state of the working directory is materially further along than the commit history shows: the homepage is fully wired, a contact API route exists, two additional pages (`/insights`, `/privacy`) exist, and a full demo-content layer exists — none of it committed, tagged, or mentioned in any commit message. **The honest answer to "what phase is this repo at" is two different answers depending on whether you mean the git record or the disk state**, and the disk state is not safe (A.3). If forced to name a single phase distinct from what the tags claim: the *git-recorded* phase is "component library complete, homepage not yet assembled." The *disk* phase is "homepage assembled and content-gated, but the content-gating was overridden by an unreviewed, unapproved demo-content system that was never presented for sign-off" (see G).

---

## D. Build health

`node_modules` present. Ran `npm run check` (`lint && typecheck && build`) fresh, in the current (uncommitted) working-tree state.

- **Lint:** clean. No errors, no warnings.
- **Typecheck:** clean. No errors.
- **Build:** clean. `✓ Compiled successfully in 3.6s`, `Finished TypeScript in 4.4s`, static generation `6/6` in 462ms.

**One warning, environmental, not code:**
```
⚠ Warning: Next.js ignored package-lock.json in /home/mansah because it is outside the current Git repository (/home/mansah/Projects/axion-advisory-group).
 To use this directory, set `turbopack.root` in your Next.js config.
```
This references `/home/mansah` (the user's home directory), not this repo — it's Turbopack detecting a lockfile somewhere on the ancestor path outside the repo, unrelated to this project's own dependency graph. Cosmetic.

**Routes generated (5):**
```
○ /              (static)
○ /_not-found    (static)
ƒ /api/contact   (dynamic)
○ /insights      (static)
○ /privacy       (static)
```
Note that `/api/contact`, `/insights`, and `/privacy` — all **uncommitted** files — are picked up by the build regardless of git status, because `next build` reads the filesystem, not the index. `.next/static` totals **1.1 MB**. Turbopack's build output in this Next.js version does not print a per-route First-Load-JS table the way the older webpack builder did, so I cannot give a more granular per-route figure than that.

**The build gate is not neutral on content.** `npm run check`'s `build` step runs `next build` with no `NEXT_PUBLIC_CONTENT_MODE` set. `src/lib/content-mode.ts` defaults to `"mock"` whenever that variable is unset, and no `.env` file in this repo sets it. I confirmed directly: `.next/server/app/index.html`, the static prerendered homepage from this build, contains the literal strings `Meridian Growth Partners`, `David Ochieng`, and `KES 4.8B` — the fabricated demo content is baked into the production build artifact by default. See G.2 — this is the single most important finding in this audit.

---

## E. Brand compliance

**Hex/rgb/hsl scan across all of `src/`:**

- `rgba()`/`rgb()`: zero hits.
- `hsla()`/`hsl()`: zero hits.
- Tailwind default-palette utility classes (`text-red-500`, `bg-blue-600`, etc.): zero hits.
- Hex literals: every hit inside `globals.css` is a **documentation comment** paired with the functional `oklch()` value (e.g. `--aag-crimson: oklch(0.584 0.2228 14.96); /* #E01A4F */`) — cross-checked against `BRAND.md`'s own table, and they match exactly, including two extension tokens `globals.css` adds beyond `BRAND.md`'s table (`--aag-navy-700`, explicitly labeled "derived elevation step", and `--aag-white`, with an inline note explaining the one documented exception to "no pure white"). Neither introduces an off-brand colour.

**One real hex literal in functional code**, not a comment:

| File | Line | Value |
|---|---|---|
| `src/app/layout.tsx` | 110 | `themeColor: "#F6F7FA"` |

This is the exact value of `--aag-paper` (confirmed against `BRAND.md`), so it is not an off-brand colour — but it is a hardcoded literal outside the single-source token file, most likely because Next.js's `Viewport` metadata API requires a literal string and cannot reference a CSS custom property. Reported per the instruction to table every hit; the drift risk here is low (right value, wrong location) rather than a wrong-colour risk.

**Dead code with a latent violation:** the shadcn scaffold primitive `src/components/ui/button.tsx` (untouched since the Initial commit) has a `link` variant using `text-primary` (raw crimson) as text colour — which is exactly BRAND.md's forbidden pairing ("Crimson on paper: FORBIDDEN as text — fails AA. Use crimson-deep"). I confirmed this component is **never imported anywhere** in `src/` — it has been fully superseded by the custom `CtaButton`. Not a live violation, but it would become one if ever wired up.

**Contrast law — semantic token audit:** `globals.css` implements BRAND.md's contrast law as semantic Tailwind tokens, with every role's ratio commented inline (I spot-checked several against BRAND.md's table and they match). Specifically:

- `--action-text` → `crimson-deep` on paper (6.16:1), `crimson-light` on navy (7.00:1) — never raw crimson as text, on either surface.
- `--stroke-systems` → `cyan-deep` on paper (3.92:1), raw `cyan` on navy (already ≥3:1 there) — never raw cyan as a meaningful stroke on paper.
- `--accent` (raw cyan, 2.45:1 on paper — the forbidden pairing) is grep-confirmed **never used as `text-accent` anywhere in `src/`**. Its only legitimate uses per the colour-usage-law comment are decorative fills/dividers.
- `text-primary` (raw crimson) has exactly two hits in live code, both in `cta-button.tsx`, both as **fill + white label** (`bg-primary text-primary-foreground`) — the sanctioned "white on crimson, 4.74:1, ≥16px" pattern, not crimson-as-text.

I did not independently re-derive every oklch→sRGB conversion; I verified the commented ratios are internally consistent with BRAND.md's published table and that the semantic tokens route to the documented-safe variant in each surface context. **No contrast-law violation found in live code.**

**Crimson-to-cyan gradient:** searched for `gradient` (case-insensitive) across all of `src/` — the only two hits are prose: `globals.css`'s own comment restating the rule ("No crimson-to-cyan gradient, ever") and `cta-button.tsx`'s comment listing "gradient fill" as a deliberately-omitted decoration. **No gradient utility or CSS gradient exists anywhere in the codebase. Clear.**

---

## F. Provenance — IP risk

**`public/` inventory (complete):**

| File | Added in | Origin |
|---|---|---|
| `favicon.ico`, `seo/favicon.ico`, `seo/favicon.svg`, `seo/icon-192.png`, `seo/icon-512.png`, `seo/apple-touch-icon.png`, `seo/og.png`, `seo/site.webmanifest` | `d180205`, single commit | **Generated in-repo** by `scripts/generate-brand-assets.mjs`, which builds every one of these from the brand mark's SVG path geometry and the oklch-derived hex values, using `next/dist/compiled/@vercel/og` (satori) + `sharp`. |

`public/images/` and `public/videos/` contain only `.gitkeep` — **empty**. No photographs, no downloaded imagery, anywhere in the repo. This matches the commit-message claim of a "zero-asset rule" for the Hero's visual slot (confirmed by reading `hero.tsx`: the "image" slot is the brand mark at 15% opacity over a muted fill, not a photo).

**Network calls in the one asset-generating script:** `generate-brand-assets.mjs` fetches from `fonts.googleapis.com` (to embed Bodoni Moda/Archivo into the generated OG image) — a legitimate, standard Google Fonts call. **No fetch to mandraxconsultinggroup.co.ke or any other external site.** No `scripts/download-assets.mjs` exists in this repo, and no asset-download manifest of any kind exists.

**`git log --all -S 'mandrax'` (pickaxe search across every commit, not just current tree):** three commits touch the string. `066cad0` (baseline) introduces `.playwright-mcp/page-2026-09-05T21-32-43-174Z.yml` — a committed Playwright MCP accessibility-tree snapshot of the reference site, containing verbatim reference-site text (client name, testimonials with named individuals, phone/email, financial figures). This file **is still tracked at `HEAD`**. `6ae038b` and `d180205` are AGENTS.md/`content.ts` adding the *prohibition* comment, not additional scraped content.

This committed raw snapshot is a hygiene concern worth flagging even though it is not, on its own, evidence of misuse: `docs/research/IA_REFERENCE.md`, the document actually built from that inspection session, explicitly and correctly disclaims carrying any of it forward ("No verbatim copy, no colour values, no font names, no measurements, no asset paths, no client names, no figures, no testimonials... If you need a number or a string, it is not here on purpose.") I did not find any string from the Mandrax snapshot reproduced in `IA_REFERENCE.md`, `IA_CRITIQUE.md`, `CONTENT.md`, or any component.

**Grep for "mandrax"/"Mandrax" across the whole repo** (excluding `node_modules`, `.git`, `.next`): the only hits outside that one committed snapshot file are (1) `AGENTS.md` rule 5, stating the prohibition, and (2) a one-line code comment in `src/types/content.ts` restating the same prohibition. **No client name, staff name, or figure traceable to mandraxconsultinggroup.co.ke appears in any shipped copy, component, or the content register.** The demo/mock content fabricated in `src/lib/mock-content.ts` (see G.2) uses different names, different figures, and a different narrative shape than anything in the Mandrax snapshot — I found no evidence of direct copying, only that both are financial-advisory-shaped marketing copy, which is incidental.

---

## G. Content integrity

### G.1 — `layout.tsx` metadata is stale against the current CONTENT.md register

`layout.tsx`'s `META-TITLE`/`META-DESC`/`META-OG-ALT` values (committed, live in every build) read:

- Title: *"Axion Advisory Group · Business and Financial Advisory, Kenya"*
- Description: *"Business consultancy, financial management, and risk advisory for Kenyan firms. Practical advice from advisors who have run the numbers."*

CONTENT.md's **current** register (as of `d180205`, the same commit that touched `layout.tsx`) reads:

- `META-TITLE`: *"Axion Advisory Group · Business & Financial Advisory, Kenya"*
- `META-DESC`: *"Business consultancy, financial management, risk, financing, training, and market entry advisory for Kenyan firms. Based in Nairobi."*
- `META-OG-ALT`: *"The Axion Advisory Group mark and wordmark on a deep navy field."* (layout.tsx has the older "Axion Advisory Group logo on a deep navy field.")

Both slots are `DRAFT`, so neither is a fabrication risk — but `layout.tsx` is quoting text CONTENT.md's own commit superseded in the same commit that shipped `layout.tsx`. This is a drift bug, not a content-integrity blocker, but it means the register is not actually the live source of truth for what's rendered in the `<head>`.

### G.2 — The uncommitted mock-content system: the highest-severity finding in this audit

`src/lib/content-mode.ts` (untracked) defines a `ContentMode` of `"mock" | "production"`, defaulting to **`"mock"` whenever `NEXT_PUBLIC_CONTENT_MODE` is unset** — which is always, in this repo, since no `.env` file sets it.

`src/lib/mock-content.ts` (untracked, 342 lines) is a "Mock Content Layer" that, in mock mode, populates every section CONTENT.md and the committed component library correctly leave gated/null:

| Slot | Mock value rendered |
|---|---|
| Credibility stats | "12+ Years advisory experience [Demo]", "85+ Client engagements [Demo]", "KES 4.8B+ Capital facilitated [Demo]" |
| Certifications | "Licensed Financial Advisors (ICIFA) · ICPAK Practising Firm Member · Registered Advisory Practice [Demo]" |
| Case study | Client **"Meridian Growth Partners [Demo Case]"**, sector, a KES 120M credit-facility outcome |
| Testimonial | A named quote attributed to **"David Ochieng (Demo Profile)", Managing Director, Apex Logistics Kenya** |
| About | Founding narrative and credentials copy |
| Footer/contact | Address, phone, registration number, entity name, email — all placeholder-shaped but fully populated |
| A fabricated `legal-regulatory` service | Full name, summary, and detail text for `SVC-07` — **the one practice line CONTENT.md explicitly marks "Do not publish until confirmed"** because its name was obscured in the client's own source material |
| Insights articles | Three fully-written article title/excerpt/category/date entries |
| Privacy policy | Six full sections of Kenya Data Protection Act boilerplate |

**Every one of these strings carries an inline `[Demo]`/`[Sample]`/`[Demo Profile]` bracket tag**, and every page that renders mock content shows a "Demonstration Mode" banner when `isMock` is true. This is a real, deliberate mitigation — it is not silent fabrication in the sense of pretending to be real. But three things make it a genuine blocker rather than a labeling nicety:

1. **It is the default, not an opt-in.** Nothing in this repo sets `NEXT_PUBLIC_CONTENT_MODE=production`. Running `npm run dev` or `npm run build` — including the `npm run check` gate that AGENTS.md's precedence chain requires before any merge — renders this content by default. I confirmed the fabricated strings (`Meridian Growth Partners`, `David Ochieng`, `KES 4.8B`) are physically present in `.next/server/app/index.html`, the static HTML this audit's own `npm run check` run produced (D).
2. **It directly contradicts every committed component's own gating logic and stated intent.** The commit messages for `Credibility`, `CaseStudyCard`, `ProofSection`, and `Contact` all explicitly state these render `null` or disabled specifically because "no placeholder or invented content ships." The mock-content layer overrides that gating from outside, at the page level, without touching the components' own code.
3. **It fabricates the one slot CONTENT.md flags as highest-risk.** `MOCK_LEGAL_REGULATORY_SERVICE` writes name, summary, and detail copy for `SVC-07`, a practice line whose real name CONTENT.md says is *unconfirmed* and explicitly instructs "do not publish until confirmed." The mock layer publishes it anyway, demo tag or not.

None of this is committed. It exists only in the working tree (A.3) and only came into existence in the last of the three uncommitted work-waves (timestamps in A.0), ending the moment before the index corrupted. I cannot tell you whether the agent that wrote it intended to present it for review, intended to commit it as-is, or was interrupted before either. What I can tell you is that **as configured right now, it is not a demo mode a reviewer has to opt into — it is the default output of the project's own required build gate.**

### G.3 — Committed components: clean

Cross-checking `src/lib/services-data.ts` (committed) against CONTENT.md's `SVC-01` through `SVC-06` rows: **every summary and detail string matches CONTENT.md verbatim**, word for word. `SVC-07` in `services-data.ts` correctly carries the bracketed `[CLIENT TO SUPPLY: ...]` placeholder text and `status: "NEEDS-CLIENT-INPUT"`, matching the register exactly.

`SiteFooter.tsx` (committed): every contact field is optionally rendered (filtered to `null` when absent), and the copyright line falls back to `` `[CLIENT TO SUPPLY: registered entity name]` `` / `` `[CLIENT TO SUPPLY: year]` `` literal bracket text when `entityName`/`copyrightYear` are undefined — the same convention CONTENT.md itself uses. This is exactly the discipline the mock-content layer (G.2) bypasses.

I found **no** rendered claim, statistic, client name, date, credential, testimonial, monetary figure, or office location in the **committed** codebase that isn't sourced from CONTENT.md. Every fabrication risk identified in this audit is confined to the uncommitted `mock-content.ts`/`content-mode.ts` layer described in G.2.

---

## H. Slop scan

All 13 section components exist; scanned each against the checklist.

| Pattern | Result | Evidence |
|---|---|---|
| Centered hero, two centred buttons | **CLEAR** | `hero.tsx`: 7/5 asymmetric grid split, left-aligned headline/copy, two CTAs in a left-justified `flex-row`, not centered. |
| Three equal cards in a uniform row | **CLEAR** | Services render as 4 clusters in a `grid-cols-1 sm:grid-cols-2` (2×2, uneven cluster membership: 2/2/2/1 practice lines), not a 3-card row. |
| Identical vertical padding across all sections | **CLEAR** | Three distinct band tokens in active use: `py-band`, `py-band-tight`, `py-band-anchor`, deliberately varied per section (`site-footer.tsx:92`, `approach.tsx:48`, `credibility.tsx:29`, `hero.tsx:13`, etc.). |
| Uniform border-radius, no hierarchy | **CLEAR** | Three radius classes in active use with size-appropriate hierarchy: `rounded-sm` (5), `rounded-lg` (13), `rounded-xl` (7) — not one radius applied everywhere. |
| Identical shadow on every card | **CLEAR (by absence, not repetition)** | Zero `shadow-*` utility classes found anywhere in `src/components/`. Cards are bordered, not shadowed — a deliberate flat-brand choice, not the "same shadow everywhere" pattern the checklist warns against. |
| Icon-above-title-above-two-lines, repeated >2x | **CLEAR** | The only repeated icon+text pattern is `practice-line-row.tsx`'s horizontal disclosure row (icon left, caret right, expandable detail) — a different structure, used once per practice line inside its own gating logic, not a stamped card template. |
| Emoji as interface icons | **CLEAR** | Zero emoji-range characters found in `src/` or `CONTENT.md`. |
| Em-dashes in user-facing strings | **FOUND — 1 instance** | `src/lib/mock-content.ts:84`, inside `MOCK_CONTACT.consentText`: `"...in accordance with the Kenya Data Protection Act, 2019. [Pending legal review — Demo Consent wording]"`. This string is user-facing (rendered in the Contact section's consent-gate copy) when mock mode is active. It is inside the uncommitted mock layer, not CONTENT.md or any committed component — CONTENT.md's own copy rows are em-dash-free, matching its own stated rule. |
| Headings opening with Empower/Unlock/Transform/Elevate | **CLEAR** | Grep hits were exclusively CSS `transition`/`transform` property names in Tailwind class strings, not marketing copy. No heading in CONTENT.md or any component opens with any of the four banned words. |

---

## I. Verdict

### I.1 — True current phase vs. what the tags claim

The `phase-memory` tag and the linear commit sequence through `bc70331` accurately describe a completed, disciplined **component-library phase**: design foundation, 19 specs, 13 matching components, all gated correctly, all content sourced from CONTENT.md verbatim. That part of the record is trustworthy.

What the tags do **not** describe, because it happened entirely after the last commit and was never committed, is a second work session that (a) correctly wired the homepage to match `IA_CRITIQUE.md`'s approved sequence, (b) built three additional pages and an API route with no specs, and (c) introduced a mock-content system that overrides every gating decision the first phase deliberately made, defaults on, and is baked into the project's own required build gate. **The git record says "component library, page not assembled." The disk says "page assembled, but silently wearing a fabricated-content mask by default." Neither statement alone is the truth; both are real and current.**

### I.2 — KEEP / REVISE / DISCARD

| Artefact | Verdict | Reasoning |
|---|---|---|
| `BRAND.md`, `CONTENT.md`, `AGENTS.md` | **KEEP** | Unmodified since their governing commits (BRAND.md, AGENTS.md) or modified only in ways that tightened rigor (CONTENT.md: more slots blocked, not fewer). |
| `globals.css` token layer | **KEEP** | Verified byte-accurate against BRAND.md's table; contrast law correctly encoded per-role, per-surface. |
| `layout.tsx` | **KEEP, with a one-line fix flagged** | Fonts/structure correct; metadata text needs to be brought back in sync with CONTENT.md's current wording (G.1) — trivial, not structural. |
| The 19 committed spec files | **KEEP** | Concrete, token-referenced, no vague language found. |
| The 11 committed section/primitive components | **KEEP** | Match their specs, match CONTENT.md verbatim, gate correctly, no contrast-law or hex violations. |
| Uncommitted `page.tsx` wiring | **KEEP the sequence decision, REVISE the file** | The section order it implements is the right one (matches IA_CRITIQUE.md exactly) and should be committed — but only after it is decoupled from `getHomepageContent()`'s mock branch, or with the mock branch made impossible to reach by accident (see I.4). |
| Uncommitted `site-header.tsx` / `proof-section.tsx` at repo root | **REVISE** | More complete than the abandoned worktree drafts (proper active-nav-link logic via `usePathname`, semantic heading), but unreviewed and never compared side-by-side with the worktree versions by a human. Worth a deliberate five-minute diff read before committing, not a rebuild. |
| `src/lib/mock-content.ts`, `src/lib/content-mode.ts` | **DISCARD as currently wired, or gate it so hard it cannot ship by accident** | The labeling discipline inside the file is genuinely good — this was not built carelessly. But "defaults on, ships in the build gate's own output, fabricates the one explicitly-unconfirmed service line" is not a fixable-in-place problem, it's a wrong default. Rebuilding a mock/demo layer that defaults to `production` (opt-in mock, not opt-out) costs less than auditing this one for a second hidden default. |
| `cookie-banner.tsx`, `insights/page.tsx`, `privacy/page.tsx`, `api/contact/route.ts` | **REVISE** | Each is competently built (the contact route's 503-not-500 "don't claim delivery we can't perform" logic is a genuinely good instinct) but none has a spec, meaning none went through this project's own required process. Write the specs retroactively before committing, or route them through the process next time. |
| The two live worktree drafts (`.claude/worktrees/agent-*`) | **DISCARD the drafts, remove the worktrees** | Superseded by different, more complete root-level versions of the same two files. No unique commits on either branch. Safe to `git worktree remove` once you've confirmed you don't want anything from the diffs in A.2. |
| Auto-generated instruction files (`.clinerules`, `.continue/rules/project.md`, `.github/copilot-instructions.md`, `.amazonq/rules/project.md`) | **REVISE — regenerate immediately** | Not a code artefact, but the fastest, cheapest fix in this whole report: `bash scripts/sync-agent-rules.sh`. Every day this doesn't run is a day four tool integrations are silently instructed to scrape the reference site. |

### I.3 — Risks, ranked by severity

1. **[Fabrication / legal] The mock-content default.** A named, invented client ("Meridian Growth Partners"), a named, invented testimonial author with a named company, invented professional certifications (ICIFA, ICPAK), and invented monetary figures (KES 4.8B+, KES 120M) render in the project's own default build output, including a service line CONTENT.md explicitly says not to publish. Labeled `[Demo]` throughout, but the label doesn't change what a `npm run build` with no special flags produces. This is the finding that most directly matches the audit brief's "fabricated credential is a legal problem, not a copy problem" warning.
2. **[Data loss] Uncommitted, unstaged, working-tree-only work with a corrupted git index sitting on top of it.** Everything in A.3/C.2/G.2 — the entire homepage wiring, three pages, an API route, and the mock-content system — exists in exactly one place, on one disk, with no commit, no stash, and a 0-byte index that makes even `git add` currently fail. Any of the ordinary things that destroy an uncommitted working tree (a clean, a hard reset, a bad checkout, a lost VM) takes all of it with no recovery path.
3. **[Process / governance] Four instruction files silently telling other tools to do the opposite of this project's rules.** Not exploited as far as I can determine, but live, and the fix is a single documented command that simply hasn't been run since the client rebuild began (B.4).
4. **[Content drift] `layout.tsx` metadata quoting a version of CONTENT.md that CONTENT.md itself superseded in the same commit.** Low severity, real, three strings.
5. **[Hygiene] Orphaned worktree branches (16), an unmerged icon-library swap not explicitly pre-authorized, an undeclared `sharp` dependency relied on by one script, a `.gitignore` pattern that doesn't actually cover the worktree directory it looks like it should.** None of these are urgent; all are cheap to clean up.

Aesthetic/slop concerns (H) were, on inspection, the cleanest part of this repo — I found essentially nothing there. That is worth saying plainly: whatever else happened in this session, the visual-design discipline held.

### I.4 — Three things to resolve before any further building

1. **Decide what happens to the mock-content layer before anyone builds on top of `page.tsx`.** Either it gets committed with its default flipped (opt-in `mock`, not opt-out), or it gets deleted and the homepage ships with the same null-gating discipline the committed component library already has. Building further sections on top of the current wiring without deciding this first means every subsequent builder inherits a fabrication default silently.
2. **Get the current working tree into git — a commit, at minimum a `git stash`, ideally both a commit for review and a fixed index** — before anything else touches this checkout. The index needs repairing (a plain `git read-tree HEAD` or equivalent should be sufficient, but that's a call for whoever repairs it, not this audit) and the nine untracked files plus six modified files need to land somewhere durable.
3. **Run `bash scripts/sync-agent-rules.sh`.** Five seconds of work, closes the one gap in this audit that has a real chance of being hit by accident rather than by a repeat of this session's specific sequence of events.
