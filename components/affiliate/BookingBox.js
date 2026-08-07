import AffiliateCard from "./AffiliateCard";

export default function BookingBox({ showDisclosure = true }) {
  return (
    <AffiliateCard
      affiliateKey="travelpayouts"
      eyebrow="Trip planning"
      showDisclosure={showDisclosure}
    />
  );
}
