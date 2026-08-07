import { getEnabledAffiliate } from "../../data/affiliates";
import AffiliateDisclosure from "./AffiliateDisclosure";
import AffiliateLink from "./AffiliateLink";

export default function AffiliateButton({ affiliateKey, children, showDisclosure = true }) {
  const entry = getEnabledAffiliate(affiliateKey);
  if (!entry) return null;

  return (
    <div className="affiliate-button-group">
      {showDisclosure && <AffiliateDisclosure compact />}
      <AffiliateLink affiliateKey={affiliateKey} className="affiliate-button">
        {children || entry.label}
        <span aria-hidden="true">↗</span>
      </AffiliateLink>
    </div>
  );
}
