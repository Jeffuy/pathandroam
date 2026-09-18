import test from "node:test";
import assert from "node:assert/strict";
import { affiliateNetwork, affiliateType, cleanUrl, productionAnalyticsAllowed, setAnalyticsEnabled, trackAffiliateClick, trackEvent } from "../lib/analytics.js";
import { siteConfig } from "../lib/site-config.js";
import fs from "node:fs";
import vm from "node:vm";

const production = { deployment: "production", siteUrl: "https://pathandroam.vercel.app", href: "https://pathandroam.vercel.app/ireland/limerick" };

test("production gate excludes development, previews, automation and private URL data", () => {
  assert.equal(productionAnalyticsAllowed(production), true);
  assert.equal(productionAnalyticsAllowed({ ...production, href: production.href + "?utm_source=google&utm_medium=cpc" }), true);
  for (const change of [{ deployment: "preview" }, { deployment: "development" }, { automated: true }, { href: "http://localhost:3000" }, { href: "https://preview.vercel.app" }, { href: production.href + "?email=person%40example.com" }, { href: production.href + "?utm_source=person%40example.com" }]) assert.equal(productionAnalyticsAllowed({ ...production, ...change }), false);
  assert.equal(productionAnalyticsAllowed({ ...production, siteUrl: "https://future.example", href: "https://future.example/ireland" }), true);
});

test("route visits, consent rerenders, scroll thresholds and delegated handlers deduplicate", () => {
  const source = fs.readFileSync(new URL("../components/analytics/AffiliateClickTracker.js", import.meta.url), "utf8")
    .replace(/^import .*;\r?\n/gm, "").replace("export default function", "function");
  const calls = [], listeners = new Map(), jobs = new Map();
  let path = "/", timerId = 0, cleanup;
  const ref = { current: null };
  const catalog = { "/": { content_type: "homepage" }, "/article": { content_type: "article", content_id: "article" }, "/destination": { content_type: "destination", content_id: "destination" } };
  const add = (name, fn) => { if (!listeners.has(name)) listeners.set(name, new Set()); listeners.get(name).add(fn); };
  const remove = (name, fn) => listeners.get(name)?.delete(fn);
  const schedule = fn => { jobs.set(++timerId, fn); return timerId; };
  const context = vm.createContext({
    useEffect: fn => { cleanup = fn(); }, useRef: () => ref, usePathname: () => path, useTrackingConsent: () => ({ affiliates: false }),
    affiliateNetwork, affiliateType, trackAffiliateClick: () => calls.push(["affiliate_click"]),
    trackEvent: (name, payload) => { calls.push([name, payload]); return true; }, URL,
    window: { gtag() {}, location: { origin: production.siteUrl }, innerHeight: 800, setTimeout: schedule, clearTimeout: id => jobs.delete(id), requestAnimationFrame: schedule, cancelAnimationFrame: id => jobs.delete(id), addEventListener: add, removeEventListener: remove },
    document: { addEventListener: add, removeEventListener: remove, querySelectorAll: () => [], querySelector: () => ({ getBoundingClientRect: () => ({ top: 0, height: 1000 }) }) },
  });
  vm.runInContext(source, context);
  function render(next) { cleanup?.(); path = next; context.AffiliateClickTracker({ catalog }); for (const [id, fn] of jobs) { jobs.delete(id); fn(); } }
  render("/"); render("/article"); render("/article");
  assert.equal(calls.filter(([n]) => n === "content_view").length, 1);
  assert.equal(calls.filter(([n]) => n === "scroll_depth").length, 3);
  assert.equal(listeners.get("click").size, 1);
  const affiliate = { href: "https://klook.tpx.lv/example", dataset: { affiliateKey: "tour" } };
  for (const listener of listeners.get("click")) listener({ type: "click", target: { closest: () => affiliate } });
  assert.equal(calls.filter(([n]) => n === "affiliate_click").length, 1);
  const dispatch = link => { for (const listener of listeners.get("click")) listener({ type: "click", target: { closest: () => link } }); };
  dispatch({ href: production.siteUrl + "/destination", dataset: {}, closest: () => null });
  assert.equal(calls.filter(([n]) => n === "affiliate_click").length, 1);
  dispatch({ href: production.siteUrl + "/destination", dataset: {}, closest: () => ({}) });
  assert.equal(calls.filter(([n]) => n === "select_content").length, 1);
  dispatch({ href: production.siteUrl + "/#bookable-guides", dataset: { analyticsCta: "explore_bookable_trips", analyticsLocation: "hero" }, closest: () => null });
  assert.equal(calls.filter(([n]) => n === "cta_click").length, 1);
  render("/destination"); render("/article");
  assert.equal(calls.filter(([n]) => n === "content_view").length, 3);
  assert.equal(calls.filter(([n]) => n === "page_view").length, 0);
  cleanup(); assert.equal(listeners.get("click").size, 0);
});

test("URL payloads discard credentials, queries, fragments and sensitive path data", () => {
  assert.equal(cleanUrl("https://user:secret@example.com/guide?email=person@example.com#private"), "https://example.com/guide");
  assert.equal(cleanUrl("https://example.com/person%40example.com"), "https://example.com/");
  assert.equal(cleanUrl("mailto:person@example.com"), undefined);
  assert.equal(cleanUrl("bad"), undefined);
});

test("only evidenced monetization destinations are classified as Travelpayouts", () => {
  for (const url of ["https://klook.tpx.lv/abc", "https://gettransfer.tpx.lv/abc", "https://tp.media/click", "https://www.klook.com/activity/123/?aff_pid=761778"]) assert.equal(affiliateNetwork(url), "travelpayouts");
  for (const url of ["https://www.klook.com/activity/123", "https://evil-tpx.lv/abc", "https://amazon.com/book", "https://example.com"]) assert.equal(affiliateNetwork(url), undefined);
  assert.equal(affiliateType("accommodation"), "hotel");
  assert.equal(affiliateType("private-transfer"), "transfer");
  assert.equal(affiliateType("attraction-ticket"), "activity");
  assert.equal(affiliateType("connectivity"), "esim");
});

test("SSR is safe; unavailable, rejected or unknown events do not send", () => {
  setAnalyticsEnabled(true);
  assert.equal(trackEvent("content_view"), false);
  setAnalyticsEnabled(false);
});

test("one affiliate interaction sends one sanitized custom event; ordinary links send none", () => {
  const calls = [];
  globalThis.window = { location: { href: production.href + "?email=secret#private", origin: production.siteUrl }, gtag: (...args) => calls.push(args) };
  globalThis.document = { referrer: "https://example.org/search?email=secret" };
  try {
    setAnalyticsEnabled(true);
    const link = { href: "https://klook.tpx.lv/abc?email=secret", dataset: { affiliateKey: "tour", affiliateProvider: "klook", affiliateContext: "tour", affiliatePlacement: "article_inline" } };
    assert.equal(trackAffiliateClick(link, { content_id: "guide", content_type: "article", email: "private@example.com" }), true);
    assert.equal(calls.length, 1);
    const [command, event, payload] = calls[0];
    assert.equal(command, "event"); assert.equal(event, "affiliate_click");
    assert.equal(payload.affiliate_network, "travelpayouts");
    assert.equal(payload.link_url, "https://klook.tpx.lv/abc");
    assert.equal(payload.page_location, production.href);
    assert.equal(payload.email, undefined);
    assert.equal(payload.send_to, "G-1R8H9BMBVT");
    assert.equal(trackAffiliateClick({ href: production.href, dataset: {} }, {}), false);
    assert.equal(trackEvent("page_view", {}), false); // Page views belong exclusively to GA.
    window[`ga-disable-${siteConfig.gaId}`] = true;
    assert.equal(trackAffiliateClick(link, {}), false);
    assert.equal(calls.length, 1);
  } finally { setAnalyticsEnabled(false); delete globalThis.window; delete globalThis.document; }
});
