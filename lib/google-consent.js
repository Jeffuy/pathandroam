export const consentStorageKey = "pathandroam-consent-v1";

export function googleConsentState(analytics) {
  return {
    analytics_storage: analytics === true ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  };
}

// Runs in the root layout before hydration and before the single Google tag.
export const googleConsentBootstrap = `
window.dataLayer = window.dataLayer || [];
window.gtag = function(){window.dataLayer.push(arguments);};
window.gtag('consent', 'default', ${JSON.stringify(googleConsentState(false))});
try {
  var savedConsent = JSON.parse(localStorage.getItem('${consentStorageKey}'));
  if (savedConsent && savedConsent.expires > Date.now() && savedConsent.analytics === true) {
    window.gtag('consent', 'update', ${JSON.stringify(googleConsentState(true))});
  }
} catch {}
var analyticsReferrer = '';
try { analyticsReferrer = new URL(document.referrer).origin; } catch {}
window.gtag('set', {page_referrer: analyticsReferrer, allow_google_signals: false, allow_ad_personalization_signals: false});
`;

export function updateGoogleConsent(analytics) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("consent", "update", googleConsentState(analytics));
  }
}

export function clearAnalyticsCookies() {
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.trim().split("=")[0];
    if (!/^_ga(?:_|$)|^_gid$|^_gat/.test(name)) continue;
    const domains = window.location.hostname.split(".");
    document.cookie = `${name}=; Max-Age=0; path=/`;
    while (domains.length > 1) {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${domains.join(".")}`;
      domains.shift();
    }
  }
}
