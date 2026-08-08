import Link from "next/link";
import { primaryNavigation } from "../data/navigation";

export default function MobileNav() {
  return (
    <details className="mobile-nav">
      <summary aria-controls="mobile-navigation">
        <span className="mobile-nav__label">Menu</span>
        <span className="mobile-nav__icon" aria-hidden="true" />
      </summary>
      <nav id="mobile-navigation" aria-label="Mobile navigation">
        {primaryNavigation.map((item) => (
          <Link href={item.href} key={item.label}>
            {item.label}
          </Link>
        ))}
      </nav>
    </details>
  );
}
