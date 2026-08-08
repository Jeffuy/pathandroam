import Link from "next/link";

const links = [
  ["Destinations", "/#destinations"],
  ["Travel Guides", "/#guides"],
  ["Trip Planning", "/#planning"],
  ["About", "/about"],
];

export default function MobileNav() {
  return (
    <details className="mobile-nav">
      <summary aria-controls="mobile-navigation">
        <span className="mobile-nav__label">Menu</span>
        <span className="mobile-nav__icon" aria-hidden="true" />
      </summary>
      <nav id="mobile-navigation" aria-label="Mobile navigation">
        {links.map(([label, href]) => (
          <Link href={href} key={label}>
            {label}
          </Link>
        ))}
      </nav>
    </details>
  );
}
