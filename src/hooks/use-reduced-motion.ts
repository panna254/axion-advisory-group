"use client";

import { useSyncExternalStore } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Reads the user's reduced-motion preference.
 *
 * `globals.css` already collapses every CSS transition and animation on the
 * site to near-zero under `prefers-reduced-motion: reduce`, so nothing needs
 * this hook merely to stop something from moving. What CSS cannot switch off
 * is behaviour driven by a timer: an autoplaying carousel keeps changing what
 * is on screen whether or not the change is animated, and that is exactly the
 * thing the preference is asking us not to do. Hence a JS-side read.
 *
 * `useSyncExternalStore` rather than `useState` + `useEffect`: a media query
 * IS an external store, and subscribing to one from an effect means a
 * synchronous setState on mount and the cascading render that comes with it.
 * The server snapshot is `false`, so the markup React renders on the server
 * and the markup it hydrates with always agree; the real value arrives on
 * subscription, before any timer could have fired.
 */

function subscribe(onStoreChange: () => void): () => void {
  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQuery.addEventListener("change", onStoreChange);
  return () => mediaQuery.removeEventListener("change", onStoreChange);
}

function getSnapshot(): boolean {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getServerSnapshot(): boolean {
  return false;
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
