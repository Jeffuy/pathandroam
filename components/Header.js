import Link from "next/link";
import Logo from "./Logo";
import MobileNav from "./MobileNav";

const links = [
  ["Destinations", "/#destinations"],
  ["Travel Guides", "/#guides"],
  ["Trip Planning", "/#planning"],
  ["About", "/about"],
];

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map(([label, href]) => (
            <Link href={href} key={label}>
              {label}
            </Link>
          ))}
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}
