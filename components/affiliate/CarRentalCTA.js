import AffiliateCard from "./AffiliateCard";

export default function CarRentalCTA({ showDisclosure = true }) {
  return (
    <AffiliateCard
      affiliateKey="discovercars"
      eyebrow="Car rental"
      showDisclosure={showDisclosure}
    />
  );
}
