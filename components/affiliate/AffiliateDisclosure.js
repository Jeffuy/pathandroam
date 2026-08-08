import Link from "next/link";

export default function AffiliateDisclosure({ compact = false }) {
  return (
    <aside className={`affiliate-disclosure${compact ? " affiliate-disclosure--compact" : ""}`}>
      <strong>Affiliate disclosure</strong>
      <p>
        Path &amp; Roam may earn a commission if you book or buy through some
        links, at no extra cost to you. Editorial conclusions remain independent. {" "}
        <Link href="/affiliate-disclosure">Learn more</Link>.
      </p>
    </aside>
  );
}
