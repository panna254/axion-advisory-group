import { CtaButton } from "@/components/ui/cta-button";

/**
 * ClosingCta — Section 9, the page's final anchor band.
 *
 * Restates the same conversion intent as the header nav CTA and the hero
 * primary CTA — same label, same destination — rather than introducing a
 * new offer. Stays on the paper surface; the mid-page navy band already
 * spent this page's one departure from paper before the hero and this
 * section close it out.
 *
 * See `docs/research/components/closing-cta.spec.md` for the full contract.
 */
export function ClosingCta() {
  return (
    <section id="cta" className="py-band-anchor">
      <div className="max-w-page mx-auto px-md">
        <div className="flex flex-col items-center text-center max-w-[42ch] mx-auto gap-md">
          <h2 className="text-h2 font-display font-normal text-foreground">
            Start with a conversation about the numbers.
          </h2>
          <p className="text-lead text-muted-foreground">
            Tell us what is in front of you. We will say whether we are the
            right firm for it.
          </p>
          <CtaButton variant="primary" href="/#contact">
            Book a consultation
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
