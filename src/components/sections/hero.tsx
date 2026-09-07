import { AagLogo } from "@/components/brand/AagLogo";
import { CtaButton } from "@/components/ui/cta-button";

/**
 * Hero — section 2 in the approved sequence, asymmetric split layout.
 *
 * One firm, one proposition, one `<h1>`. Static Server Component: no
 * carousel, no client-supplied gating. See
 * `docs/research/components/hero.spec.md` for the full contract.
 */
export function Hero() {
  return (
    <section id="hero" className="py-band-anchor">
      <div className="max-w-page mx-auto px-md">
        <div className="grid grid-cols-1 items-center gap-2xl lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="mb-sm font-sans text-caption font-medium uppercase tracking-wide text-muted-foreground">
              Nairobi, Kenya
            </p>
            <h1 className="mb-md font-display text-h1 font-normal text-foreground lg:max-w-[16ch]">
              We advise Kenyan firms on strategy, finance, and risk.
            </h1>
            <p className="mb-lg max-w-[42ch] text-lead text-muted-foreground">
              Seven practice lines, from business consultancy to market
              entry. Work starts with reading your accounts.
            </p>
            <div className="flex flex-col gap-sm sm:flex-row">
              <CtaButton
                variant="primary"
                href="#contact"
                className="w-full sm:w-auto"
              >
                Book a consultation
              </CtaButton>
              <CtaButton
                variant="secondary"
                href="#approach"
                className="w-full sm:w-auto"
              >
                See how we work
              </CtaButton>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-muted">
              <div className="absolute inset-0 flex items-center justify-center">
                <AagLogo
                  variant="mark"
                  className="h-24 w-auto opacity-15"
                  label=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
