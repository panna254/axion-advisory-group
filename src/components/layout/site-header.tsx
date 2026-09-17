"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { AagLogo } from "@/components/brand/AagLogo";
import { IconMenu } from "@/components/icons";
import { MobileNavDrawer } from "@/components/layout/mobile-nav-drawer";
import { CtaButton } from "@/components/ui/cta-button";
import { NAV_CTA, PRIMARY_NAV, isNavItemActive } from "@/lib/navigation";
import { cn } from "@/lib/utils";

/**
 * SiteHeader — sticky navy glass bar.
 *
 * Implements `docs/research/components/site-header.spec.md`. The material
 * (tint, blur, edge, shadow, fallbacks) is defined once in `globals.css` §7
 * and switched here with two data attributes:
 *
 *   data-overlay   the bar sits over a full-bleed hero (homepage). It pulls
 *                  the page up beneath itself with `-mb-header`, and the hero
 *                  adds `pt-header` back, so nothing below moves.
 *   data-scrolled  set by an IntersectionObserver on `#top-sentinel`. The
 *                  glass densifies and gains its shadow. Height never changes.
 *
 * Layering: bar `z-40`; mobile menu backdrop and sheet `z-50` (portalled);
 * cookie banner `z-50`, fixed to the bottom edge, so the two never overlap.
 */

interface SiteHeaderProps {
  /** Set on routes whose first section is a full-bleed hero. */
  overlay?: boolean;
}

export function SiteHeader({ overlay = false }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const sentinel = document.getElementById("top-sentinel");
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-sm focus:left-md focus:z-50 focus:rounded-lg focus:bg-primary focus:px-md focus:py-xs focus:text-body focus:font-semibold focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        Skip to content
      </a>

      {/* One header-height tall rather than 1px, so the bar changes state
          once the page has actually moved under it, and iOS overscroll
          bounce at the very top cannot flicker it. */}
      <div
        id="top-sentinel"
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 -z-10 h-header w-full"
      />

      <header
        data-overlay={overlay ? "true" : "false"}
        data-scrolled={scrolled ? "true" : "false"}
        className={cn(
          "site-header glass-navy band-navy sticky top-0 z-40 h-header w-full text-foreground",
          overlay && "-mb-header"
        )}
      >
        <div className="max-w-page mx-auto flex h-full items-center gap-lg px-md">
          <Link
            href="/"
            aria-label="Axion Advisory Group homepage"
            className="flex shrink-0 items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            <AagLogo variant="wordmark" />
          </Link>

          <nav aria-label="Primary" className="ml-auto hidden lg:block">
            <ul className="flex items-center gap-md">
              {PRIMARY_NAV.map((item) => {
                const active = isNavItemActive(pathname, item.href);
                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative inline-flex h-11 items-center rounded-sm px-xs text-body font-medium text-foreground/80 transition-colors duration-200 hover:text-foreground",
                        "after:absolute after:inset-x-xs after:bottom-1.5 after:h-px after:bg-foreground/50 after:opacity-0 after:transition-opacity after:duration-200 hover:after:opacity-100",
                        "focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                        active &&
                          "text-foreground after:h-0.5 after:bg-primary after:opacity-100"
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-xs lg:ml-md">
            <CtaButton
              variant="primary"
              href={NAV_CTA.href}
              className="hidden sm:inline-flex"
            >
              {NAV_CTA.label}
            </CtaButton>

            <button
              ref={hamburgerRef}
              type="button"
              aria-label={drawerOpen ? "Close menu" : "Open menu"}
              aria-expanded={drawerOpen}
              aria-controls="mobile-nav-drawer"
              aria-haspopup="dialog"
              onClick={() => setDrawerOpen((prev) => !prev)}
              className="-mr-xs inline-flex size-11 items-center justify-center rounded-lg text-foreground transition-colors duration-200 hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:hidden"
            >
              <IconMenu size="md" />
            </button>
          </div>
        </div>
      </header>

      <MobileNavDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        triggerRef={hamburgerRef}
      />
    </>
  );
}
