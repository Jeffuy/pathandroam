import AffiliateButton from "../../../components/affiliate/AffiliateButton";
import AffiliateCard from "../../../components/affiliate/AffiliateCard";
import BookingBox from "../../../components/affiliate/BookingBox";
import CarRentalCTA from "../../../components/affiliate/CarRentalCTA";
import ESimCTA from "../../../components/affiliate/ESimCTA";
import HotelCTA from "../../../components/affiliate/HotelCTA";
import InsuranceCTA from "../../../components/affiliate/InsuranceCTA";
import TourCard from "../../../components/affiliate/TourCard";

export const metadata = { title: "Disabled Affiliate Examples" };

const examples = [
  ["AffiliateButton", <AffiliateButton affiliateKey="viator" key="button" />],
  ["AffiliateCard", <AffiliateCard affiliateKey="getyourguide" key="card" />],
  ["BookingBox", <BookingBox key="booking" />],
  ["TourCard", <TourCard key="tour" />],
  ["HotelCTA", <HotelCTA key="hotel" />],
  ["ESimCTA", <ESimCTA key="esim" />],
  ["InsuranceCTA", <InsuranceCTA key="insurance" />],
  ["CarRentalCTA", <CarRentalCTA key="car" />],
];

export default function AffiliateExamplesPage() {
  return (
    <main id="main-content" className="affiliate-examples page-width" tabIndex={-1}>
      <p className="eyebrow">Development preview</p>
      <h1>Disabled affiliate examples</h1>
      <p>Every registry entry is disabled. No monetized CTA or sponsored link should render below.</p>
      <div className="affiliate-examples__grid">
        {examples.map(([name, component]) => (
          <section key={name}>
            <h2>{name}</h2>
            <div className="affiliate-example__output">{component}</div>
            <p>Expected: no output</p>
          </section>
        ))}
      </div>
    </main>
  );
}
