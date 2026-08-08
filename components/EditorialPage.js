export default function EditorialPage({ eyebrow, title, intro, notice, children }) {
  return (
    <main id="main-content" className="legal-page page-width" tabIndex={-1}>
      <header>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="legal-page__intro">{intro}</p>
        {notice ? <p className="legal-review-note">{notice}</p> : null}
      </header>
      {children}
    </main>
  );
}
