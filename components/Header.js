import Link from "next/link";
import Logo from "./Logo";
import MobileNav from "./MobileNav";
import { primaryNavigation } from "../data/navigation";

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {primaryNavigation.map((item) => (
            <Link className={item.emphasis ? "desktop-nav__featured" : undefined} href={item.href} key={item.label}>
              {item.label}
            </Link>
          ))}
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}
