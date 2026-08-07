import AffiliateCard from "./AffiliateCard";

export default function InsuranceCTA({ showDisclosure = true }) {
  return (
    <AffiliateCard
      affiliateKey="safetywing"
      eyebrow="Travel insurance"
      showDisclosure={showDisclosure}
    />
  );
}
