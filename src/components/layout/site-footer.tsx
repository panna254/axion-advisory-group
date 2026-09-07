import { AagLogo } from "@/components/brand/AagLogo";
import {
  IconAddress,
  IconEmail,
  IconPhone,
  type IconComponent,
} from "@/components/icons";
import { CLUSTERS } from "@/lib/services-data";

/* ---------------------------------------------------------------------------
   SiteFooter — section 11, layout family `grid-4`.

   Server Component: static text links only, no client state. See
   `docs/research/components/site-footer.spec.md` for the full contract.

   Every contact and legal field below is currently unsourced (nothing in
   `CONTENT.md` has cleared `NEEDS-CLIENT-INPUT` for these slots yet) and each
   gates independently through props rather than through a hardcoded fetch, so
   the column degrades one line at a time as real values arrive. `FOOT-LEGAL`
   is the one exception: a copyright line that vanishes entirely reads as
   broken, so it renders a literal bracketed placeholder instead of omitting —
   never a fabricated entity name, never `new Date().getFullYear()` standing
   in for a year that still needs the client's confirmation.

   Lower block: legal text and the registration line are grouped in one flex
   item so `justify-between` reads as two groups (legal cluster / privacy
   link), not three floating siblings with the registration line stranded in
   the middle at desktop width. Plain `flex-col` (not `-reverse`) on mobile,
   since the legal cluster is the first DOM child and should stack above the
   privacy link, not below it.
--------------------------------------------------------------------------- */

export interface SiteFooterProps {
  address?: string;
  phone?: string;
  email?: string;
  registrationNumber?: string;
  entityName?: string;
  copyrightYear?: string;
}

const HEADING_CLASSES =
  "text-caption font-sans font-medium uppercase tracking-wide text-muted-foreground mb-sm";

const LINK_TRANSITION_CLASSES =
  "transition-colors duration-200 active:translate-y-px focus-visible:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const LINK_CLASSES = `text-body text-foreground hover:text-action-text ${LINK_TRANSITION_CLASSES}`;

const PRIVACY_LINK_CLASSES = `text-caption text-action-text hover:underline ${LINK_TRANSITION_CLASSES}`;

const ENTITY_PLACEHOLDER = "[CLIENT TO SUPPLY: registered entity name]";
const YEAR_PLACEHOLDER = "[CLIENT TO SUPPLY: year]";

/** One entry per cluster, matching `CLUSTERS` in `src/lib/services-data.ts`. */
const SERVICE_LINKS = CLUSTERS.map((cluster) => ({
  key: cluster.slug,
  label: cluster.name,
  href: `#services-${cluster.slug}`,
}));

const FIRM_LINKS = [
  { key: "about", label: "About", href: "#about" },
  { key: "approach", label: "Approach", href: "#approach" },
  { key: "insights", label: "Insights", href: "/insights" },
] as const;

interface ContactEntry {
  key: string;
  Icon: IconComponent;
  text: string;
}

export function SiteFooter({
  address,
  phone,
  email,
  registrationNumber,
  entityName,
  copyrightYear,
}: SiteFooterProps) {
  const contactEntries: ContactEntry[] = [
    address ? { key: "address", Icon: IconAddress, text: address } : null,
    phone ? { key: "phone", Icon: IconPhone, text: phone } : null,
    email ? { key: "email", Icon: IconEmail, text: email } : null,
  ].filter((entry): entry is ContactEntry => entry !== null);

  const legalLine = `© ${entityName ?? ENTITY_PLACEHOLDER} ${copyrightYear ?? YEAR_PLACEHOLDER}. All rights reserved.`;

  return (
    <footer className="band-navy bg-background">
      <div className="py-band-tight max-w-page mx-auto px-md">
        <div className="grid grid-cols-2 gap-xl lg:grid-cols-4">
          <div className="col-span-2 lg:col-span-1">
            <AagLogo variant="full" />
            <p className="text-body text-muted-foreground mt-sm max-w-[32ch]">
              Business and financial advisory for Kenyan firms.
            </p>
          </div>

          <div>
            <p className={HEADING_CLASSES}>Services</p>
            <ul className="flex flex-col gap-xs">
              {SERVICE_LINKS.map((link) => (
                <li key={link.key}>
                  <a href={link.href} className={LINK_CLASSES}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={HEADING_CLASSES}>Firm</p>
            <ul className="flex flex-col gap-xs">
              {FIRM_LINKS.map((link) => (
                <li key={link.key}>
                  <a href={link.href} className={LINK_CLASSES}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={HEADING_CLASSES}>Contact</p>
            <ul className="flex flex-col gap-xs">
              {contactEntries.length > 0 ? (
                contactEntries.map(({ key, Icon, text }) => (
                  <li key={key} className="flex items-start gap-xs">
                    <Icon size="sm" className="text-stroke-systems shrink-0" />
                    <span className="text-body text-foreground">{text}</span>
                  </li>
                ))
              ) : (
                <li>
                  <a href="#contact" className={LINK_CLASSES}>
                    See the enquiry form above
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-2xl flex flex-col items-center justify-between gap-sm border-t border-border pt-lg sm:flex-row">
          <div className="flex flex-col items-center gap-2xs sm:flex-row sm:gap-sm">
            <p className="text-caption text-muted-foreground">{legalLine}</p>
            {registrationNumber ? (
              <p className="text-caption text-muted-foreground">
                {registrationNumber}
              </p>
            ) : null}
          </div>
          <a href="/privacy" className={PRIVACY_LINK_CLASSES}>
            Privacy notice
          </a>
        </div>
      </div>
    </footer>
  );
}
