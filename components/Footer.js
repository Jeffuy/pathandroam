import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__top page-width">
        <div>
          <Logo inverse />
          <p>See more. Plan smarter.</p>
        </div>
        <nav aria-label="Footer navigation">
          <Link href="/#destinations">Destinations</Link>
          <Link href="/#guides">Travel Guides</Link>
          <Link href="/#planning">Trip Planning</Link>
          <Link href="/#about">About</Link>
        </nav>
      </div>
      <div className="site-footer__base page-width">
        <p>Independent travel research and practical planning.</p>
        <p>© {new Date().getFullYear()} Path &amp; Roam</p>
      </div>
    </footer>
  );
}
