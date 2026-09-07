import { AagLogo } from "@/components/brand/AagLogo";

/**
 * Placeholder. The homepage sections are built against the rhythm in
 * `HOMEPAGE_RHYTHM` (src/types/section.ts) and the register in `CONTENT.md`.
 * This renders the identity only, as a smoke test that the token layer, the
 * two font families and the mark all resolve.
 */
export default function Home() {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center gap-lg px-md">
      <AagLogo variant="full" className="text-xl" />
      <p className="text-muted-foreground max-w-[45ch] text-center text-caption">
        Foundation in place. Sections are built from the content register.
      </p>
    </main>
  );
}
