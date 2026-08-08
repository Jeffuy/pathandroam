import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="not-found-page page-width">
      <p className="eyebrow">404 · Page not found</p>
      <h1>This path does not lead anywhere yet.</h1>
      <p>The page may have moved, or the guide may still be in development.</p>
      <Link className="text-link" href="/">
        Return home <span aria-hidden="true">→</span>
      </Link>
    </main>
  );
}
