"use client";

import { useReportWebVitals } from "next/web-vitals";
import { trackEvent } from "../../lib/analytics.js";

const reported = new Map();
function reportMetric(metric) {
  if (!["LCP", "INP", "CLS"].includes(metric.name) || !Number.isFinite(metric.value)) return;
  const key = `${metric.id}:${metric.name}`;
  if (reported.get(key) === metric.value) return;
  const sent = trackEvent("web_vitals", {
    metric_name: metric.name,
    metric_value: metric.value,
    metric_rating: metric.rating,
    metric_id: metric.id,
    page_location: performance.getEntriesByType("navigation")[0]?.name || window.location.href,
  });
  if (sent) reported.set(key, metric.value);
}

export default function WebVitals() {
  useReportWebVitals(reportMetric);
  return null;
}
