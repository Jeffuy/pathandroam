import AffiliateDisclosure from "../../components/affiliate/AffiliateDisclosure";

export const metadata = {
  title: "Affiliate Disclosure",
  description: "How affiliate relationships work at Path & Roam.",
};

export default function AffiliateDisclosurePage() {
  return (
    <main id="main-content" className="legal-page page-width">
      <p className="eyebrow">Transparency</p>
      <h1>Affiliate disclosure</h1>
      <p className="legal-page__intro">
        Some Path &amp; Roam pages may include clearly identified affiliate links.
      </p>
      <AffiliateDisclosure />
      <section>
        <h2>How it works</h2>
        <p>
          If you follow an affiliate link and make a qualifying booking or purchase,
          Path &amp; Roam may receive a commission. This does not increase the price you pay.
        </p>
      </section>
      <section>
        <h2>Editorial independence</h2>
        <p>
          Affiliate relationships do not determine our editorial conclusions. We do not
          use fake prices, artificial scarcity or disguised links.
        </p>
      </section>
    </main>
  );
}
