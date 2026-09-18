import { siteConfig } from "./site-config.js";

const events = new Set(["affiliate_click", "cta_click", "select_content", "content_view", "scroll_depth", "web_vitals", "affiliate_impression", "affiliate_widget_impression"]);
const parameters = new Set(["affiliate_network", "affiliate_type", "affiliate_provider", "affiliate_key", "placement", "position", "link_domain", "link_url", "content_type", "content_id", "content_title", "destination", "country", "cta_name", "cta_location", "target_domain", "percent_scrolled", "metric_name", "metric_value", "metric_rating", "metric_id", "page_location"]);

export function cleanUrl(value, base) {
  try {
    const url = new URL(value, base);
    if (!/^https?:$/.test(url.protocol)) return undefined;
    // Never include queries, fragments or credentials in custom payloads.
    const path = decodeURIComponent(url.pathname);
    return url.origin + (/@|\b\d{7,}\b/.test(path) ? "/" : url.pathname);
  } catch { return undefined; }
}

export function productionAnalyticsAllowed({ deployment, siteUrl, href, automated = false }) {
  try {
    const url = new URL(href);
    // No search/form feature exists. Unknown query data must not reach automatic GA events.
    const safeQuery = [...url.searchParams].every(([key, value]) =>
      /^(utm_(source|medium|campaign|id|term|content)|gclid|dclid|gbraid|wbraid|gtm_debug)$/.test(key) &&
      /^[a-zA-Z0-9_.~-]{1,150}$/.test(value));
    return deployment === "production" && !automated && safeQuery &&
      !/@|%40|\b\d{7,}\b/i.test(url.pathname) && url.protocol === "https:" &&
      !/^(localhost|127\.|\[::1\])/.test(url.hostname) && url.origin === new URL(siteUrl).origin;
  } catch { return false; }
}

export function affiliateNetwork(value) {
  try {
    const url = new URL(value);
    if (/(^|\.)(tpx\.lv|tp\.media|travelpayouts\.com|tpemd\.com)$/.test(url.hostname) ||
      (/(^|\.)klook\.com$/.test(url.hostname) && url.searchParams.has("aff_pid"))) return "travelpayouts";
  } catch { /* Not an affiliate URL. */ }
  return undefined;
}

export function affiliateType(context = "") {
  if (/accommodation|hotel/.test(context)) return "hotel";
  if (/transfer|transport/.test(context)) return "transfer";
  if (/tour|trip|ticket/.test(context)) return "activity";
  if (context === "connectivity") return "esim";
  return "other";
}

let enabled = false;
export function setAnalyticsEnabled(value) { enabled = value; }

export function trackEvent(name, values = {}) {
  if (!enabled || !events.has(name) || typeof window === "undefined" || typeof window.gtag !== "function" || window[`ga-disable-${siteConfig.gaId}`]) return false;
  const payload = {};
  for (const [key, value] of Object.entries(values)) {
    if (!parameters.has(key) || value === undefined || value === null) continue;
    if (key === "link_url" || key === "page_location") {
      const url = cleanUrl(value, window.location.origin);
      if (url) payload[key] = url;
    } else if (typeof value === "number" && Number.isFinite(value)) payload[key] = value;
    else if (typeof value === "string" && !/@|[\r\n]/.test(value)) payload[key] = value.slice(0, 100);
  }
  try {
    const referrer = cleanUrl(document.referrer);
    window.gtag("event", name, {
      ...payload,
      send_to: siteConfig.gaId,
      page_location: payload.page_location || cleanUrl(window.location.href),
      page_referrer: referrer ? new URL(referrer).origin : "",
    });
    return true;
  } catch { return false; }
}

export function trackAffiliateClick(link, content) {
  const network = affiliateNetwork(link.href);
  if (!link.dataset.affiliateKey && !network) return false;
  return trackEvent("affiliate_click", {
    ...content,
    affiliate_network: network,
    affiliate_type: affiliateType(link.dataset.affiliateContext),
    affiliate_provider: link.dataset.affiliateProvider,
    affiliate_key: link.dataset.affiliateKey,
    placement: link.dataset.affiliatePlacement || "article_body",
    link_domain: new URL(link.href).hostname,
    link_url: link.href,
  });
}
