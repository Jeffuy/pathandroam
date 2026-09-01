import AffiliateLink from "./AffiliateLink";

export default function MobileAffiliateBar({ affiliate }) {
  if (!affiliate) return null;
  return (
    <aside className="mobile-affiliate-bar" aria-label="Booking option">
      <AffiliateLink articleAffiliate={affiliate} placement="article_mobile_sticky">
        {affiliate.label} <span aria-hidden="true">↗</span>
      </AffiliateLink>
    </aside>
  );
}
