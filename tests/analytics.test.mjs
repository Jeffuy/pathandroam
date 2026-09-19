import test from "node:test";
import assert from "node:assert/strict";
import { affiliateNetwork, affiliateType, cleanUrl, productionAnalyticsAllowed, setAnalyticsEnabled, trackAffiliateClick, trackEvent } from "../lib/analytics.js";
import { siteConfig } from "../lib/site-config.js";
import fs from "node:fs";
import vm from "node:vm";

const production = { deployment: "production", siteUrl: "https://pathandroam.vercel.app", href: "https://pathandroam.vercel.app/ireland/limerick" };

test("production tag allows diagnostics, every route and query without site URL configuration", () => {
  for (const change of [{}, { automated: true }, { siteUrl: undefined }, { siteUrl: "http://localhost:3000" }, { href: "https://future.example/unknown?email=person%40example.com" }]) assert.equal(productionAnalyticsAllowed({ ...production, ...change }), true);
  for (const change of [{ deployment: "preview" }, { deployment: "development" }, { deployment: "unknown" }, { href: "http://localhost:3000" }, { href: "https://127.0.0.1" }, { href: "https://localhost" }, { href: "https://[::1]" }]) assert.equal(productionAnalyticsAllowed({ ...production, ...change }), false);
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
    setAnalyticsEnabled(false);
    assert.equal(trackEvent("content_view", { content_id: "guide" }), false);
    assert.equal(calls.length, 0);
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
    setAnalyticsEnabled(false);
    assert.equal(trackAffiliateClick(link, {}), false);
    setAnalyticsEnabled(true);
    window[`ga-disable-${siteConfig.gaId}`] = true;
    assert.equal(trackAffiliateClick(link, {}), false);
    assert.equal(calls.length, 1);
  } finally { setAnalyticsEnabled(false); delete globalThis.window; delete globalThis.document; }
});


test("Consent Mode defaults precede initialization and restore only valid saved approval", async () => {
  const { googleConsentBootstrap } = await import("../lib/google-consent.js");
  for (const [saved, expected] of [[null, "denied"], ["bad json", "denied"], [JSON.stringify({ analytics: true, expires: 1 }), "denied"], [JSON.stringify({ analytics: false, expires: Date.now() + 10000 }), "denied"], [JSON.stringify({ analytics: true, expires: Date.now() + 10000 }), "granted"]]) {
    const window = {};
    const context = vm.createContext({ window, localStorage: { getItem: () => saved }, document: { referrer: "https://example.com/private?email=test" }, URL });
    vm.runInContext(googleConsentBootstrap, context);
    window.gtag("js", new Date());
    window.gtag("config", siteConfig.gaId);
    const commands = window.dataLayer.map(args => Array.from(args));
    assert.equal(commands[0][0], "consent");
    assert.equal(commands[0][1], "default");
    assert.deepEqual(Object.values(commands[0][2]), ["denied", "denied", "denied", "denied"]);
    const consent = commands.filter(args => args[0] === "consent").at(-1)[2];
    assert.equal(consent.analytics_storage, expected);
    assert.equal(consent.ad_storage, "denied");
    assert.equal(consent.ad_user_data, "denied");
    assert.equal(consent.ad_personalization, "denied");
    assert.equal(commands.find(args => args[0] === "set")[1].allow_google_signals, false);
    assert.equal(commands.find(args => args[0] === "set")[1].allow_ad_personalization_signals, false);
    assert.equal(commands.filter(args => args[0] === "config").length, 1);
    assert.equal(commands.some(args => args[1] === "page_view"), false);
  }
});

test("accept, reject and withdrawal update Google, retain its queue and clean identifier cookies", async () => {
  const { googleConsentState, updateGoogleConsent, clearAnalyticsCookies } = await import("../lib/google-consent.js");
  const calls = [], deleted = [];
  global.window = { gtag: (...args) => calls.push(args), location: { hostname: "www.example.com" } };
  global.document = { get cookie() { return "_ga=one; _ga_ID=two; _gid=three; preference=keep"; }, set cookie(value) { deleted.push(value); } };
  try {
    updateGoogleConsent(true);
    assert.deepEqual(calls[0], ["consent", "update", googleConsentState(true)]);
    updateGoogleConsent(false);
    clearAnalyticsCookies();
    assert.deepEqual(calls[1], ["consent", "update", googleConsentState(false)]);
    assert.equal(typeof window.gtag, "function");
    assert.equal(deleted.length, 9);
    assert.ok(deleted.every(value => value.includes("Max-Age=0") && !value.startsWith("preference")));
  } finally { delete global.window; delete global.document; }
});


test("consent UI persistence withdraws analytics without removing the tag or reloading", async () => {
  const { consentStorageKey } = await import("../lib/google-consent.js");
  const source = fs.readFileSync(new URL("../lib/tracking-consent.js", import.meta.url), "utf8")
    .replace(/^import .*;\r?\n/gm, "").replaceAll("export function", "function");
  let stored = null, reloads = 0, cleanups = 0;
  const states = [], enabled = [], listeners = new Map();
  const context = vm.createContext({
    consentStorageKey, Event,
    updateGoogleConsent: state => states.push(state), clearAnalyticsCookies: () => cleanups++, setAnalyticsEnabled: state => enabled.push(state),
    window: {
      localStorage: { getItem: () => stored, setItem: (key, value) => { stored = value; } },
      location: { reload: () => reloads++ },
      addEventListener: (name, fn) => listeners.set(name, fn), removeEventListener: name => listeners.delete(name),
      dispatchEvent: event => listeners.get(event.type)?.(event),
    },
  });
  vm.runInContext(source, context);
  context.subscribe(() => {});
  context.saveTrackingConsent({ analytics: true, affiliates: false });
  assert.equal(states.at(-1), true);
  assert.equal(JSON.parse(stored).analytics, true);
  context.saveTrackingConsent({ analytics: false, affiliates: false });
  assert.equal(states.at(-1), false);
  assert.equal(enabled.at(-1), false);
  assert.ok(cleanups > 0);
  assert.equal(reloads, 0);
  context.saveTrackingConsent({ analytics: true, affiliates: true });
  context.saveTrackingConsent({ analytics: false, affiliates: false });
  assert.equal(states.at(-1), false);
  assert.equal(reloads, 1); // Only widget withdrawal requires unloading third-party code.
});
