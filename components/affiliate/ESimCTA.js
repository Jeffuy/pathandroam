import AffiliateCard from "./AffiliateCard";

export default function ESimCTA({ showDisclosure = true }) {
  return (
    <AffiliateCard
      affiliateKey="airalo"
      eyebrow="Connectivity"
      showDisclosure={showDisclosure}
    />
  );
}
