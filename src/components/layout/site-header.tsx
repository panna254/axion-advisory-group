"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { AagLogo } from "@/components/brand/AagLogo";
import { IconMenu } from "@/components/icons";
import { MobileNavDrawer } from "@/components/layout/mobile-nav-drawer";
import { CtaButton } from "@/components/ui/cta-button";
import { cn } from "@/lib/utils";

/**
 * SiteHeader — sticky navigation bar.
 *
 * Implements `docs/research/components/site-header.spec.md`.
 * Watches `#top-sentinel` via IntersectionObserver to toggle surface from
 * paper to navy upon scrolling. Controls `MobileNavDrawer` below `lg`.
 */

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: readonly NavItem[] = [
  { label: "Services", href: "/#services" },
  { label: "Approach", href: "/#approach" },
  { label: "About", href: "/#about" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/#contact" },
] as const;

export function SiteHeader() {
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

  function isActive(href: string) {
    if (href.includes("#")) return false;
    return pathname === href || pathname?.startsWith(`${href}/`);
  }

  return (
    <>
      <div
        id="top-sentinel"
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 -z-10 h-px w-full"
      />
      <header
        data-scrolled={scrolled ? "true" : "false"}
        className={cn(
          "sticky top-0 z-40 h-18 w-full transition-[background-color,border-color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled
            ? "band-navy border-b border-border bg-background"
            : "border-b border-transparent bg-background"
        )}
      >
        <div className="max-w-page mx-auto flex h-full items-center justify-between gap-lg px-md">
          <Link
            href="/"
            aria-label="Axion Advisory Group homepage"
            className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <AagLogo variant="wordmark" />
          </Link>

          <nav className="hidden items-center gap-lg lg:flex">
            <ul className="flex items-center gap-lg">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "px-2xs py-xs text-body font-sans font-medium text-foreground rounded-sm",
                        "transition-colors duration-200 hover:text-action-text active:translate-y-px",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                        active &&
                          "relative after:absolute after:inset-x-2xs after:-bottom-px after:h-0.5 after:bg-primary"
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-xs sm:gap-sm">
            <CtaButton variant="primary" href="/#contact">
              Book a consultation
            </CtaButton>

            <button
              ref={hamburgerRef}
              type="button"
              aria-label={drawerOpen ? "Close menu" : "Open menu"}
              aria-expanded={drawerOpen}
              aria-controls="mobile-nav-drawer"
              aria-haspopup="dialog"
              onClick={() => setDrawerOpen((prev) => !prev)}
              className="inline-flex size-11 items-center justify-center rounded-lg text-foreground transition-[background-color,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-secondary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-px lg:hidden"
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
