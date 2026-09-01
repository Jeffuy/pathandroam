"use client";

import { useEffect, useState } from "react";
import AffiliateLink from "./AffiliateLink";

export default function MobileAffiliateBar({ affiliate }) {
  const [hasPassedSummary, setHasPassedSummary] = useState(false);
  const [atArticleEnd, setAtArticleEnd] = useState(false);

  useEffect(() => {
    const summary = document.querySelector(".article-booking-summary-wrap");
    const endSentinel = document.querySelector(".mobile-affiliate-end-sentinel");
    if (!summary || !endSentinel || !("IntersectionObserver" in window)) return undefined;

    const summaryObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setHasPassedSummary(false);
      else if (entry.boundingClientRect.bottom < 0) setHasPassedSummary(true);
    });
    const endObserver = new IntersectionObserver(([entry]) => {
      setAtArticleEnd(entry.isIntersecting || entry.boundingClientRect.top < 0);
    }, { rootMargin: "0px 0px 20%" });

    summaryObserver.observe(summary);
    endObserver.observe(endSentinel);
    return () => {
      summaryObserver.disconnect();
      endObserver.disconnect();
    };
  }, []);

  if (!affiliate) return null;
  const isVisible = hasPassedSummary && !atArticleEnd;

  return (
    <aside
      className={`mobile-affiliate-bar${isVisible ? " is-visible" : ""}`}
      aria-label="Booking option"
      hidden={!isVisible}
    >
      <AffiliateLink articleAffiliate={affiliate} placement="article_mobile_sticky" position={1}>
        {affiliate.label} <span aria-hidden="true">↗</span>
      </AffiliateLink>
    </aside>
  );
}
