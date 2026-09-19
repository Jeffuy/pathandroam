"use client";

import { useEffect, useSyncExternalStore } from "react";
import { GoogleAnalytics as GoogleTag } from "@next/third-parties/google";
import { updateGoogleConsent } from "../../lib/google-consent.js";
import { siteConfig } from "../../lib/site-config.js";
import { productionAnalyticsAllowed, setAnalyticsEnabled } from "../../lib/analytics.js";
import AffiliateClickTracker from "./AffiliateClickTracker";
import WebVitals from "./WebVitals";

const subscribe = () => () => {};

export default function GoogleAnalytics({ consent, deployment, catalog }) {
  const allowed = useSyncExternalStore(subscribe, () => productionAnalyticsAllowed({
    deployment,
    href: window.location.href,
  }), () => false);
  const installed = allowed && /^G-[A-Z0-9]+$/.test(siteConfig.gaId);
  const active = installed && consent === true;

  useEffect(() => {
    if (installed) updateGoogleConsent(consent === true);
    setAnalyticsEnabled(active);
    return () => setAnalyticsEnabled(false);
  }, [active, installed, consent]);

  if (!installed) return null;
  return (
    <>
      <GoogleTag gaId={siteConfig.gaId} />
      {active && <AffiliateClickTracker catalog={catalog} />}
      {active && <WebVitals />}
    </>
  );
}
