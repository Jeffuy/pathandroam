import AffiliateCard from "./AffiliateCard";

export default function HotelCTA({ showDisclosure = true }) {
  return (
    <AffiliateCard
      affiliateKey="booking"
      eyebrow="Accommodation"
      showDisclosure={showDisclosure}
    />
  );
}
