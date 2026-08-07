import Link from "next/link";

export default function Logo({ inverse = false }) {
  return (
    <Link
      className={`logo${inverse ? " logo--inverse" : ""}`}
      href="/"
      aria-label="Path & Roam home"
    >
      <span>Path</span>
      <span className="logo__ampersand">&amp;</span>
      <span>Roam</span>
    </Link>
  );
}
