/**
 * Content Mode Configuration
 *
 * Controls whether the application renders in "mock" (demonstration/evaluation)
 * mode or "production" (gated, verified client data only) mode.
 *
 * Switch via environment variable:
 *   NEXT_PUBLIC_CONTENT_MODE=production npm run build
 *   NEXT_PUBLIC_CONTENT_MODE=mock npm run dev
 *
 * Defaults to "mock" for local evaluation unless set to "production".
 */

export type ContentMode = "mock" | "production";

export function getContentMode(): ContentMode {
  const envMode = process.env.NEXT_PUBLIC_CONTENT_MODE?.toLowerCase().trim();
  if (envMode === "production") {
    return "production";
  }
  return "mock";
}

export const isMockMode = (): boolean => getContentMode() === "mock";

