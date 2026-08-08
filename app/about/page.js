import Link from "next/link";
import EditorialPage from "../../components/EditorialPage";
import { createPageMetadata } from "../../lib/seo.js";

export const metadata = createPageMetadata({
  title: "About",
  description: "About Path & Roam, an independent publication for practical travel planning.",
  pathname: "/about",
});

export default function AboutPage() {
  return (
    <EditorialPage
      eyebrow="About Path & Roam"
      title="Travel information for planning the route."
      intro="Path & Roam is an independent travel publication covering destinations, itineraries and transport."
    >
      <section>
        <h2>What we publish</h2>
        <p>
          Our guides help travellers choose what to see, work out how to get around and
          plan trips with or without a car.
        </p>
      </section>
      <section>
        <h2>How guides are prepared</h2>
        <p>
          We use current, reliable sources and include firsthand input only when it is
          genuinely available. Read more in our <Link href="/editorial-policy">editorial policy</Link>.
        </p>
      </section>
      <section>
        <h2>How the publication is funded</h2>
        <p>
          Some relevant recommendations use affiliate links. Path &amp; Roam may earn a
          commission from a qualifying booking or purchase, at no extra cost to the reader.
          Affiliate relationships do not determine our conclusions. See the full {" "}
          <Link href="/affiliate-disclosure">affiliate disclosure</Link>.
        </p>
      </section>
      <section>
        <h2>The byline</h2>
        <p>
          Mara Vale is the editorial pen name used by Path &amp; Roam for destination
          guides, itineraries and travel research. Learn more on the {" "}
          <Link href="/authors/mara-vale">Mara Vale author page</Link>.
        </p>
      </section>
    </EditorialPage>
  );
}
