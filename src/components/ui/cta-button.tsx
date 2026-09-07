import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import { IconArrowRight, IconArrowUpRight, IconSpinner } from "@/components/icons";
import { cn } from "@/lib/utils";

/**
 * CtaButton — shared primitive.
 *
 * Server Component: renders `<a>` when `href` is passed, `<button>`
 * otherwise. Holds no state itself; `pending` is driven by a client parent
 * around a submit button.
 *
 * See `docs/research/components/cta-button.spec.md` for the full visual and
 * behavioural contract this implements.
 */

const CTA_ICONS = {
  "arrow-right": IconArrowRight,
  "arrow-up-right": IconArrowUpRight,
} as const;

type CtaIcon = keyof typeof CTA_ICONS;

type CtaButtonBaseProps = {
  variant: "primary" | "secondary" | "link";
  children: ReactNode;
  /** Optional trailing glyph. Omit for a button that does not navigate somewhere new. */
  icon?: CtaIcon;
  /** Only meaningful on a `type="submit"` button. */
  pending?: boolean;
  className?: string;
};

type CtaButtonAsAnchorProps = CtaButtonBaseProps & {
  href: string;
} & Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | "className" | "children"
  >;

type CtaButtonAsButtonProps = CtaButtonBaseProps & {
  href?: undefined;
  type?: "button" | "submit";
} & Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "type" | "className" | "children"
  >;

export type CtaButtonProps = CtaButtonAsAnchorProps | CtaButtonAsButtonProps;

/* ---------------------------------------------------------------------------
   Shared across all variants. One radius ladder, one type scale, no shadow.
   The active-state press and the focus ring are the only movement this
   component makes — see the spec's ANTI-SLOP CONSTRAINTS for what was
   deliberately left out (pill radius, glow, gradient fill, hover scale).
--------------------------------------------------------------------------- */
const BASE_CLASSES =
  "inline-flex items-center justify-center gap-xs px-lg py-sm min-h-11 rounded-lg text-body font-sans font-medium whitespace-nowrap transition-[background-color,border-color,color,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none";

const VARIANT_CLASSES: Record<CtaButtonProps["variant"], string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-aag-crimson-deep active:translate-y-px focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed disabled:translate-y-0",
  secondary:
    "bg-transparent text-foreground border border-stroke-systems hover:bg-secondary active:translate-y-px focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:border-border disabled:text-muted-foreground disabled:cursor-not-allowed",
  link: "p-0 min-h-0 text-action-text underline underline-offset-4 decoration-1 hover:decoration-2 active:translate-y-px focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
};

function CtaButtonContent({
  children,
  icon,
  pending,
}: {
  children: ReactNode;
  icon?: CtaIcon;
  pending?: boolean;
}) {
  const Icon = icon ? CTA_ICONS[icon] : undefined;

  return (
    <>
      {pending && <IconSpinner size="sm" className="animate-spin" />}
      <span>{children}</span>
      {!pending && Icon && <Icon size="sm" />}
    </>
  );
}

export function CtaButton({
  variant,
  children,
  icon,
  pending,
  className,
  ...rest
}: CtaButtonProps) {
  const classes = cn(BASE_CLASSES, VARIANT_CLASSES[variant], className);

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...anchorProps } = rest as Omit<
      CtaButtonAsAnchorProps,
      keyof CtaButtonBaseProps
    >;

    return (
      <a href={href} className={classes} {...anchorProps}>
        <CtaButtonContent icon={icon} pending={pending}>
          {children}
        </CtaButtonContent>
      </a>
    );
  }

  const { type = "button", ...buttonProps } = rest as Omit<
    CtaButtonAsButtonProps,
    keyof CtaButtonBaseProps
  >;

  return (
    <button
      type={type}
      className={classes}
      aria-busy={pending ? true : undefined}
      {...buttonProps}
    >
      <CtaButtonContent icon={icon} pending={pending}>
        {children}
      </CtaButtonContent>
    </button>
  );
}
