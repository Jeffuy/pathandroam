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
      title="Travel planning, made clearer."
      intro="Path & Roam is an independent travel publication focused on useful research and practical decisions."
    >
      <section>
        <h2>What we cover</h2>
        <p>
          We publish destination guidance, practical itineraries, transportation advice
          and planning help for trips with or without a car.
        </p>
      </section>
      <section>
        <h2>How we work</h2>
        <p>
          Our aim is to organize reliable information into concise, useful guidance.
          Read more in our <Link href="/editorial-policy">editorial policy</Link>.
        </p>
      </section>
      <section>
        <h2>Our byline</h2>
        <p>
          Mara Vale is the editorial pen name used by Path &amp; Roam for destination
          guides, itineraries and travel research.
        </p>
        <p>
          Learn more on the <Link href="/authors/mara-vale">Mara Vale author page</Link>.
        </p>
      </section>
    </EditorialPage>
  );
}
