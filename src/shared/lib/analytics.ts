type EventParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export const logEvent = (name: string, params?: EventParams) => {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    if (typeof window !== "undefined" && Array.isArray(window.dataLayer)) {
      window.dataLayer.push(["event", name, params ?? {}]);
    }
    return;
  }

  window.gtag("event", name, params ?? {});
};
