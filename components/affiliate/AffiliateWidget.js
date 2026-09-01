"use client";

import { useEffect, useRef } from "react";
import { isValidAffiliateWidgetUrl } from "../../lib/affiliate-widget.js";

export default function AffiliateWidget({ affiliateKey, context, scriptSrc, label, placement, position, provider }) {
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
      data-affiliate-widget="true"
      data-affiliate-widget-key={affiliateKey}
      data-affiliate-provider={provider}
      data-affiliate-context={context || "general"}
      data-affiliate-placement={placement || "article_inline"}
      data-affiliate-position={position}
      ref={containerRef}
    />
  );
}
