import { getEnabledAffiliate } from "../../data/affiliates";
import AffiliateDisclosure from "./AffiliateDisclosure";
import AffiliateLink from "./AffiliateLink";

export default function AffiliateCard({
  affiliateKey,
  title,
  description,
  eyebrow = "Planning option",
  showDisclosure = true,
}) {
  const entry = getEnabledAffiliate(affiliateKey);
  if (!entry) return null;

  return (
    <aside className="affiliate-card">
      {showDisclosure && <AffiliateDisclosure compact />}
      <p className="story-label">{eyebrow}</p>
      <h2>{title || entry.label}</h2>
      <p>{description || entry.description}</p>
      <AffiliateLink affiliateKey={affiliateKey} className="text-link">
        View with {entry.provider} <span aria-hidden="true">↗</span>
      </AffiliateLink>
    </aside>
  );
}
