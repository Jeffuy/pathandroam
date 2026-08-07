import AffiliateCard from "./AffiliateCard";

export default function TourCard({ affiliateKey = "viator", showDisclosure = true }) {
  return (
    <AffiliateCard
      affiliateKey={affiliateKey}
      eyebrow="Tours and activities"
      showDisclosure={showDisclosure}
    />
  );
}
