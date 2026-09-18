"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { siteConfig } from "../../lib/site-config.js";
import { saveTrackingConsent, useTrackingConsent } from "../../lib/tracking-consent.js";
import AffiliateClickTracker from "./AffiliateClickTracker";

export default function TrackingConsent() {
  const consent = useTrackingConsent();
  const [editing, setEditing] = useState(false);
  const expires = consent?.expires;

  useEffect(() => {
    if (!expires) return;
    // Recheck expiry on return to a background tab as well as while browsing.
    function checkExpiry() {
      if (Date.now() >= expires) window.location.reload();
    }
    const timer = window.setInterval(checkExpiry, 60000);
    window.addEventListener("focus", checkExpiry);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("focus", checkExpiry);
    };
  }, [expires]);

  function choose(analytics, affiliates) {
    saveTrackingConsent({ analytics, affiliates });
    setEditing(false);
  }

  return (
    <>
      <div className="consent-controls page-width">
        <button type="button" onClick={() => setEditing(!editing)} aria-expanded={!consent || editing} aria-controls="tracking-preferences">Cookie settings</button>
      </div>
      {(!consent || editing) && (
        <section className="consent-panel page-width" id="tracking-preferences" aria-labelledby="consent-title">
          <h2 id="consent-title">Your privacy choices</h2>
          <p>These choices control optional Google Analytics and embedded affiliate booking widgets. Travelpayouts Drive loads on every page independently of these choices. Guides and ordinary booking links work without optional analytics or widgets. <Link href="/cookies">Cookie policy</Link> · <Link href="/privacy">Privacy policy</Link></p>
          <form onSubmit={(event) => {
            event.preventDefault();
            const values = new FormData(event.currentTarget);
            choose(values.has("analytics"), values.has("affiliates"));
          }}>
            <div className="consent-options">
              {siteConfig.gaId && <label><input type="checkbox" name="analytics" defaultChecked={consent?.analytics === true} /> Analytics</label>}
              <label><input type="checkbox" name="affiliates" defaultChecked={consent?.affiliates === true} /> Affiliate booking widgets</label>
            </div>
            <div className="consent-actions">
              <button type="button" onClick={() => choose(false, false)}>Reject all</button>
              <button type="button" onClick={() => choose(Boolean(siteConfig.gaId), true)}>Accept all</button>
              <button type="submit">Save choices</button>
            </div>
          </form>
        </section>
      )}
      {consent?.analytics && siteConfig.gaId && (
        <>
          <AffiliateClickTracker />
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(siteConfig.gaId)}`} strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config',${JSON.stringify(siteConfig.gaId)});window.dispatchEvent(new Event('ga-ready'));`}
          </Script>
        </>
      )}
    </>
  );
}
