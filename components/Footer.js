import Link from "next/link";
import Logo from "./Logo";
import { footerNavigation } from "../data/navigation";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__top page-width">
        <div>
          <Logo inverse />
          <p>See more. Plan smarter.</p>
        </div>
        <nav aria-label="Footer navigation">
          {footerNavigation.map((item) => (
            <Link href={item.href} key={item.label}>{item.label}</Link>
          ))}
        </nav>
      </div>
      <div className="site-footer__base page-width">
        <p>Destination guides, itineraries and transport advice.</p>
        <p>© {new Date().getFullYear()} Path &amp; Roam</p>
      </div>
    </footer>
  );
}
