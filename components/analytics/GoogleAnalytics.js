"use client";

import { useEffect, useSyncExternalStore } from "react";
import { GoogleAnalytics as GoogleTag } from "@next/third-parties/google";
import Script from "next/script";
import { siteConfig } from "../../lib/site-config.js";
import { productionAnalyticsAllowed, setAnalyticsEnabled } from "../../lib/analytics.js";
import AffiliateClickTracker from "./AffiliateClickTracker";
import WebVitals from "./WebVitals";

const subscribe = () => () => {};

export default function GoogleAnalytics({ consent, deployment, catalog }) {
  const allowed = useSyncExternalStore(subscribe, () => productionAnalyticsAllowed({
    deployment,
    siteUrl: siteConfig.siteUrl,
    href: window.location.href,
    automated: navigator.webdriver,
  }) && Boolean(catalog[window.location.pathname.replace(/\/$/, "") || "/"] ||
    ["/about", "/authors/mara-vale", "/editorial-policy", "/affiliate-disclosure", "/privacy", "/cookies", "/terms", "/contact"].includes(window.location.pathname)), () => false);
  const active = allowed && consent === true && /^G-[A-Z0-9]+$/.test(siteConfig.gaId);

  useEffect(() => {
    window[`ga-disable-${siteConfig.gaId}`] = !active;
    setAnalyticsEnabled(active);
    return () => setAnalyticsEnabled(false);
  }, [active]);

  if (!active) return null;
  return (
    <>
      <Script id="analytics-privacy-defaults" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];(function(){var referrer='';try{referrer=new URL(document.referrer).origin}catch{};(function(){window.dataLayer.push(arguments)})('set',{page_referrer:referrer,allow_google_signals:false,allow_ad_personalization_signals:false});})();`}
      </Script>
      <GoogleTag gaId={siteConfig.gaId} />
      <AffiliateClickTracker catalog={catalog} />
      <WebVitals />
    </>
  );
}
