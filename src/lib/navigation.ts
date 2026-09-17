import type { NavCta, NavItem } from "@/types/navigation";

/**
 * Primary navigation, shared by `SiteHeader` (the bar) and `MobileNavDrawer`
 * (the sheet below `lg`). One list, so the two can never drift apart.
 * Order is page order. Slot IDs and copy are `CONTENT.md` §2.
 */
export const PRIMARY_NAV: readonly NavItem[] = [
  { id: "NAV-01", label: "Services", href: "/#services" },
  { id: "NAV-02", label: "Approach", href: "/#approach" },
  { id: "NAV-03", label: "About", href: "/#about" },
  { id: "NAV-04", label: "Insights", href: "/insights", dropPriority: 1 },
  { id: "NAV-05", label: "Contact", href: "/#contact" },
];

export const NAV_CTA: NavCta = {
  label: "Book a consultation",
  href: "/#contact",
};

/**
 * Hash anchors all live on the home route and there is no scroll-spy, so only
 * a distinct route (Insights) can be marked as the current page.
 */
export function isNavItemActive(pathname: string | null, href: string): boolean {
  if (href.includes("#") || !pathname) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}
