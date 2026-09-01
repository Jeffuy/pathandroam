"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function affiliateParameters(element) {
  return {
    affiliate_key: element.dataset.affiliateKey || element.dataset.affiliateWidgetKey,
    affiliate_provider: element.dataset.affiliateProvider,
    affiliate_context: element.dataset.affiliateContext,
    affiliate_placement: element.dataset.affiliatePlacement,
    ...(element.dataset.affiliatePosition
      ? { affiliate_position: Number(element.dataset.affiliatePosition) }
      : {}),
    page_path: window.location.pathname,
  };
}

export default function AffiliateClickTracker() {
  const pathname = usePathname();

  useEffect(() => {
    function trackClick(event) {
      const affiliateLink = event.target.closest?.("a[data-affiliate-key]");
      if (affiliateLink && typeof window.gtag === "function") {
        window.gtag("event", "affiliate_click", {
          ...affiliateParameters(affiliateLink),
          link_url: affiliateLink.href,
        });
        return;
      }

      const guideLink = event.target.closest?.("a[data-commercial-guide]");
      if (guideLink && typeof window.gtag === "function") {
        window.gtag("event", "commercial_guide_click", {
          page_path: window.location.pathname,
          destination_path: guideLink.dataset.destinationPath,
          commercial_placement: guideLink.dataset.commercialPlacement,
          card_position: Number(guideLink.dataset.cardPosition),
          guide_label: guideLink.dataset.guideLabel,
        });
      }
    }

    if (!("IntersectionObserver" in window)) {
      document.addEventListener("click", trackClick);
      return () => document.removeEventListener("click", trackClick);
    }

    const observedImpressions = new WeakSet();
    const impressionObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.5 || observedImpressions.has(entry.target)) continue;
        if (typeof window.gtag !== "function") continue;
        const isWidget = entry.target.dataset.affiliateWidget === "true";
        window.gtag(
          "event",
          isWidget ? "affiliate_widget_impression" : "affiliate_impression",
          affiliateParameters(entry.target),
        );
        observedImpressions.add(entry.target);
        impressionObserver.unobserve(entry.target);
      }
    }, { threshold: 0.5 });

    const impressionElements = [...document.querySelectorAll("a[data-affiliate-key], [data-affiliate-widget='true']")];
    function refreshVisibleImpressions() {
      for (const element of impressionElements) {
        if (observedImpressions.has(element)) continue;
        impressionObserver.unobserve(element);
        impressionObserver.observe(element);
      }
    }

    document.addEventListener("click", trackClick);
    window.addEventListener("ga-ready", refreshVisibleImpressions);
    impressionElements.forEach((element) => impressionObserver.observe(element));
    return () => {
      document.removeEventListener("click", trackClick);
      window.removeEventListener("ga-ready", refreshVisibleImpressions);
      impressionObserver.disconnect();
    };
  }, [pathname]);

  return null;
}
