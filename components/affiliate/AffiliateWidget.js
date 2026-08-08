"use client";

import { useEffect, useRef } from "react";
import { isValidAffiliateWidgetUrl } from "../../lib/affiliate-widget.js";

export default function AffiliateWidget({ scriptSrc, label }) {
  const containerRef = useRef(null);
  const isValid = isValidAffiliateWidgetUrl(scriptSrc);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isValid) return undefined;

    const script = document.createElement("script");
    script.async = true;
    script.src = scriptSrc;
    container.replaceChildren(script);

    return () => container.replaceChildren();
  }, [isValid, scriptSrc]);

  if (!isValid) return null;

  return (
    <section
      aria-label={label}
      className="article-affiliate-widget"
      ref={containerRef}
    />
  );
}
