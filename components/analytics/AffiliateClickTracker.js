"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useTrackingConsent } from "../../lib/tracking-consent.js";
import { affiliateNetwork, affiliateType, trackAffiliateClick, trackEvent } from "../../lib/analytics.js";

export default function AffiliateClickTracker({ catalog }) {
  const pathname = usePathname();
  const widgetsAllowed = useTrackingConsent()?.affiliates === true;
  const visit = useRef(null);

  useEffect(() => {
    if (visit.current?.path !== pathname) visit.current = { path: pathname, viewed: false, thresholds: new Set(), impressions: new WeakSet() };
    const state = visit.current;
    const content = catalog[pathname.replace(/\/$/, "") || "/"] || { content_type: "other" };
    let timer;
    let cleanup = () => {};
    let attempts = 0;

    function start() {
      if (typeof window.gtag !== "function") {
        if (++attempts < 100) timer = window.setTimeout(start, 100);
        return;
      }
      if (!state.viewed && ["article", "destination"].includes(content.content_type)) {
        state.viewed = trackEvent("content_view", content);
      }
      function trackClick(event) {
        if (event.type === "auxclick" && event.button !== 1) return;
        const link = event.target.closest?.("a[href]");
        if (!link) return;
        if (link.dataset.affiliateKey || affiliateNetwork(link.href)) {
          trackAffiliateClick(link, content);
          return;
        }
        const target = new URL(link.href);
        if (target.origin !== window.location.origin) return;
        const selected = catalog[target.pathname.replace(/\/$/, "") || "/"];
        const card = link.closest("[data-commercial-guide], .destination-card, .related-articles, .compact-article, .featured-article");
        if (selected && card) {
          trackEvent("select_content", { ...selected, placement: link.dataset.commercialPlacement || "content_card" });
          return;
        }
        if (link.dataset.analyticsCta) trackEvent("cta_click", {
          ...content,
          cta_name: link.dataset.analyticsCta,
          cta_location: link.dataset.analyticsLocation,
          target_domain: target.hostname,
        });
      }
      document.addEventListener("click", trackClick);
      document.addEventListener("auxclick", trackClick);

      const observer = "IntersectionObserver" in window ? new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.5 || state.impressions.has(entry.target)) continue;
          const d = entry.target.dataset;
          const widget = d.affiliateWidget === "true";
          if (trackEvent(widget ? "affiliate_widget_impression" : "affiliate_impression", {
            ...content,
            affiliate_key: d.affiliateKey || d.affiliateWidgetKey,
            affiliate_provider: d.affiliateProvider,
            affiliate_network: widget ? "travelpayouts" : affiliateNetwork(entry.target.href),
            affiliate_type: affiliateType(d.affiliateContext),
            placement: d.affiliatePlacement,
          })) {
            state.impressions.add(entry.target);
            observer.unobserve(entry.target);
          }
        }
      }, { threshold: 0.5 }) : null;
      document.querySelectorAll("a[data-affiliate-key], [data-affiliate-widget='true']").forEach(element => {
        if (!state.impressions.has(element)) observer?.observe(element);
      });

      let frame = 0;
      function checkScroll() {
        frame = 0;
        const article = document.querySelector(".article-template > article");
        if (!article) return;
        const rect = article.getBoundingClientRect();
        const progress = Math.min(100, Math.max(0, (window.innerHeight - rect.top) / rect.height * 100));
        for (const threshold of [25, 50, 75]) {
          if (progress >= threshold && !state.thresholds.has(threshold) && trackEvent("scroll_depth", { ...content, percent_scrolled: threshold })) state.thresholds.add(threshold);
        }
      }
      function scheduleScroll() { if (!frame) frame = window.requestAnimationFrame(checkScroll); }
      if (content.content_type === "article") {
        window.addEventListener("scroll", scheduleScroll, { passive: true });
        scheduleScroll();
      }
      cleanup = () => {
        document.removeEventListener("click", trackClick);
        document.removeEventListener("auxclick", trackClick);
        observer?.disconnect();
        window.removeEventListener("scroll", scheduleScroll);
        window.cancelAnimationFrame(frame);
      };
    }
    // Runs after consent/enabled effects and lets the single Google tag initialize.
    timer = window.setTimeout(start, 0);
    return () => { window.clearTimeout(timer); cleanup(); };
  }, [pathname, catalog, widgetsAllowed]);
  return null;
}
