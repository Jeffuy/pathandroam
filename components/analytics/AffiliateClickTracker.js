"use client";

import { useEffect } from "react";

export default function AffiliateClickTracker() {
  useEffect(() => {
    function trackAffiliateClick(event) {
      const link = event.target.closest?.("a[data-affiliate-key]");
      if (!link || typeof window.gtag !== "function") return;
      window.gtag("event", "affiliate_click", {
        affiliate_key: link.dataset.affiliateKey,
        affiliate_provider: link.dataset.affiliateProvider,
        affiliate_context: link.dataset.affiliateContext,
        affiliate_placement: link.dataset.affiliatePlacement,
        page_path: window.location.pathname,
        link_url: link.href,
      });
    }
    document.addEventListener("click", trackAffiliateClick);
    return () => document.removeEventListener("click", trackAffiliateClick);
  }, []);

  return null;
}
