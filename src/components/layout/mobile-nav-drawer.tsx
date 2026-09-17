"use client";

import { useRef, type RefObject } from "react";
import { usePathname } from "next/navigation";
import { Dialog } from "@base-ui/react/dialog";

import { AagLogo } from "@/components/brand/AagLogo";
import { IconClose } from "@/components/icons";
import { CtaButton } from "@/components/ui/cta-button";
import { NAV_CTA, PRIMARY_NAV, isNavItemActive } from "@/lib/navigation";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
   MobileNavDrawer — the menu below `lg`.

   A sheet that drops from the top edge in the same navy glass as the header
   (`glass-navy glass-sheet`, `globals.css` §7), rather than a full-height
   side drawer. Its first row repeats the bar at the same height and on the
   same rail, with the close button exactly where the menu button was, so
   opening the menu reads as the header extending downward.

   Built on Base UI's Dialog (`@base-ui/react/dialog`): `Dialog.Root`'s modal
   default provides the focus trap, scroll lock and outside-press close, and
   Escape-to-close is wired unconditionally. None of that is reimplemented.

   Base UI's data attributes are presence-based (`data-open` / `data-closed`),
   so the animation classes use Tailwind's `data-[open]:` / `data-[closed]:`.

   See `docs/research/components/mobile-nav-drawer.spec.md`.
--------------------------------------------------------------------------- */

export interface MobileNavDrawerProps {
  /** Controlled open state. */
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /**
   * The menu button that opens this sheet, so focus returns to it on close.
   * Optional: Base UI falls back to the previously focused element.
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

  // A navigation is an implicit close. Escape, backdrop press and the close
  // button are already handled by Dialog.Root.
  function handleNavigate() {
    onOpenChange(false);
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(nextOpen) => onOpenChange(nextOpen)}
    >
      <Dialog.Portal>
        <Dialog.Backdrop
          className={cn(
            "fixed inset-0 z-50 bg-aag-ink/55",
            "data-[open]:animate-in data-[open]:fade-in data-[closed]:animate-out data-[closed]:fade-out duration-200",
          )}
        />
        <Dialog.Popup
          id="mobile-nav-drawer"
          aria-modal="true"
          aria-label="Menu"
          initialFocus={closeButtonRef}
          finalFocus={triggerRef}
          className={cn(
            "glass-navy glass-sheet band-navy fixed inset-x-0 top-0 z-50 max-h-dvh overflow-y-auto border-b text-foreground",
            "data-[open]:animate-in data-[open]:fade-in data-[open]:slide-in-from-top-2 data-[closed]:animate-out data-[closed]:fade-out data-[closed]:slide-out-to-top-2 duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
          )}
        >
          <div className="max-w-page mx-auto px-md">
            <div className="flex h-header items-center justify-between gap-lg">
              <AagLogo variant="wordmark" />
              <Dialog.Close
                ref={closeButtonRef}
                aria-label="Close menu"
                className="-mr-xs inline-flex size-11 items-center justify-center rounded-lg text-foreground transition-colors duration-200 hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <IconClose size="md" />
              </Dialog.Close>
            </div>

            <nav aria-label="Primary" className="border-t border-border">
              <ul className="divide-y divide-border">
                {PRIMARY_NAV.map((item) => {
                  const active = isNavItemActive(pathname, item.href);
                  return (
                    <li key={item.id}>
                      <a
                        href={item.href}
                        onClick={handleNavigate}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex min-h-14 items-center rounded-sm text-lead font-medium text-foreground decoration-1 underline-offset-8 transition-colors duration-200 hover:underline hover:decoration-foreground/50",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                          active && "underline decoration-primary decoration-2 hover:decoration-primary",
                        )}
                      >
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="border-t border-border pt-lg pb-[max(var(--spacing-lg),env(safe-area-inset-bottom))]">
              <CtaButton
                variant="primary"
                href={NAV_CTA.href}
                onClick={handleNavigate}
                className="w-full"
              >
                {NAV_CTA.label}
              </CtaButton>
            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
