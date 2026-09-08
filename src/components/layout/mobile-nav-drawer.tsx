"use client";

import { useRef, type RefObject } from "react";
import { usePathname } from "next/navigation";
import { Dialog } from "@base-ui/react/dialog";

import { AagLogo } from "@/components/brand/AagLogo";
import { IconClose } from "@/components/icons";
import { CtaButton } from "@/components/ui/cta-button";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
   MobileNavDrawer — shared primitive.

   Client Component. Built on Base UI's Dialog (`@base-ui/react/dialog`), not a
   hand-rolled implementation: `Dialog.Root`'s `modal` default gives focus
   trap, scroll lock and outside-pointer suppression for free, and
   `useDialogRoot` wires Escape-to-close and outside-press-to-close
   unconditionally, so none of that is reimplemented here.

   Base UI's data attributes are presence-based (`data-open` / `data-closed`),
   not Radix's `data-state="open"|"closed"` — the animation classes below use
   Tailwind's `data-[open]:` / `data-[closed]:` attribute-presence variant to
   match.

   See `docs/research/components/mobile-nav-drawer.spec.md` for the full
   visual and behavioural contract this implements.
--------------------------------------------------------------------------- */

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Services", href: "/#services" },
  { label: "Approach", href: "/#approach" },
  { label: "About", href: "/#about" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/#contact" },
];

const NAV_ITEM_CLASSES =
  "flex items-center h-11 px-xs rounded-lg text-lead font-sans font-medium text-foreground transition-[background-color,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-secondary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-px";

const CLOSE_BUTTON_CLASSES =
  "inline-flex items-center justify-center size-11 rounded-lg text-foreground transition-[background-color,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-secondary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-px";

export interface MobileNavDrawerProps {
  /** Controlled open state. */
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /**
   * The hamburger button that opens this drawer, so focus can be returned to
   * it on close. Optional: Base UI falls back to the previously focused
   * element (typically the trigger anyway) when omitted.
   */
  triggerRef?: RefObject<HTMLButtonElement | null>;
}

export function MobileNavDrawer({
  open,
  onOpenChange,
  triggerRef,
}: MobileNavDrawerProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  // A navigation is an implicit close (spec: Close triggers). Escape,
  // backdrop click and the close button are already handled by Dialog.Root.
  function handleNavigate() {
    onOpenChange(false);
  }

  function isActive(href: string) {
    // Hash anchors all live on the home route and have no scroll-spy signal
    // here, so only a distinct route (Insights) can be marked current.
    if (href.includes("#")) return false;
    return pathname === href || pathname?.startsWith(`${href}/`);
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(nextOpen) => onOpenChange(nextOpen)}
    >
      <Dialog.Portal>
        <Dialog.Backdrop
          className={cn(
            "fixed inset-0 z-50 bg-aag-ink/60",
            "data-[open]:animate-in data-[open]:fade-in data-[closed]:animate-out data-[closed]:fade-out duration-200",
          )}
        />
        <Dialog.Popup
          id="mobile-nav-drawer"
          aria-modal="true"
          initialFocus={closeButtonRef}
          finalFocus={triggerRef}
          className={cn(
            "fixed inset-y-0 right-0 z-50 h-full w-full max-w-[22.5rem]",
            "bg-background band-navy flex flex-col gap-2xl p-lg",
            "data-[open]:animate-in data-[open]:slide-in-from-right data-[closed]:animate-out data-[closed]:slide-out-to-right duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          )}
        >
          <div className="flex items-center justify-between">
            <AagLogo variant="wordmark" />
            <Dialog.Close
              ref={closeButtonRef}
              aria-label="Close menu"
              className={CLOSE_BUTTON_CLASSES}
            >
              <IconClose size="md" />
            </Dialog.Close>
          </div>

          <nav>
            <ul className="flex flex-col gap-xs">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={handleNavigate}
                    className={cn(
                      NAV_ITEM_CLASSES,
                      isActive(item.href) && "bg-secondary",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <CtaButton
            variant="primary"
            href="/#contact"
            onClick={handleNavigate}
            className="mt-auto w-full"
          >
            Book a consultation
          </CtaButton>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
