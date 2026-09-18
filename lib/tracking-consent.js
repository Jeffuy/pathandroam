"use client";

import { useSyncExternalStore } from "react";
import { siteConfig } from "./site-config.js";
import { setAnalyticsEnabled } from "./analytics.js";

const storageKey = "pathandroam-consent-v1";
const changeEvent = "pathandroam-consent-change";
let memoryChoice = null;

function snapshot() {
  try {
    return window.localStorage.getItem(storageKey) || memoryChoice;
  } catch {
    return memoryChoice;
  }
}

function parseChoice(raw) {
  try {
    const choice = JSON.parse(raw);
    return choice && choice.expires > Date.now() ? choice : null;
  } catch {
    return null;
  }
}

function subscribe(callback) {
  let previous = parseChoice(snapshot());
  function sync(event) {
    if (event.type === "storage" && event.key !== storageKey && event.key !== null) return;
    const next = parseChoice(snapshot());
    if ((previous?.analytics && !next?.analytics) || (previous?.affiliates && !next?.affiliates)) {
      window[`ga-disable-${siteConfig.gaId}`] = true;
      setAnalyticsEnabled(false);
      window.location.reload();
      return;
    }
    previous = next;
    callback();
  }
  window.addEventListener("storage", sync);
  window.addEventListener(changeEvent, sync);
  return () => {
    window.removeEventListener("storage", sync);
    window.removeEventListener(changeEvent, sync);
  };
}

export function useTrackingConsent() {
  const raw = useSyncExternalStore(subscribe, snapshot, () => null);
  return parseChoice(raw);
}

export function saveTrackingConsent({ analytics, affiliates }) {
  const previous = parseChoice(snapshot());
  const choice = JSON.stringify({ analytics, affiliates, expires: Date.now() + 180 * 86400000 });
  memoryChoice = choice;
  try {
    window.localStorage.setItem(storageKey, choice);
  } catch {
    // With blocked storage the choice lasts only for this page.
  }
  if (previous?.analytics || previous?.affiliates) {
    // Reload removes third-party code, timers and listeners after withdrawal.
    if (!analytics) {
      window[`ga-disable-${siteConfig.gaId}`] = true;
      setAnalyticsEnabled(false);
      window.gtag = undefined;
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
    window.location.reload();
    return;
  }
  window.dispatchEvent(new Event(changeEvent));
}
