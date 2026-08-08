import Link from "next/link";
import Breadcrumbs from "../Breadcrumbs";
import RelatedArticles from "../RelatedArticles";

export default function AuthorPageLayout({ author, preview = false }) {
  const relatedArticles = author.relatedArticles || [];

  return (
    <main id="main-content" className="author-template page-width" tabIndex={-1}>
      <div className="template-breadcrumbs"><Breadcrumbs items={author.breadcrumbs} /></div>
      <header className="author-template__header">
        <span className="author-template__monogram" aria-hidden="true">{author.initials}</span>
        <div>
          <p className="eyebrow">
            {preview ? "Author page - Draft preview" : "Editorial identity"}
          </p>
          <h1>{author.name}</h1>
          <p className="author-template__role">{author.role}</p>
          {preview ? <span className="draft-pill">Draft - Noindex</span> : null}
        </div>
      </header>
      <div className="author-template__body">
        <section aria-labelledby="author-about-title">
          <p className="story-label">About</p>
          <h2 id="author-about-title">Editorial identity</h2>
          {author.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </section>
        <aside>
          <p className="story-label">Editorial focus</p>
          <ul>{author.focus.map((item) => <li key={item}>{item}</li>)}</ul>
          <Link className="text-link" href="/about">
            About Path &amp; Roam <span aria-hidden="true">&rarr;</span>
          </Link>
        </aside>
      </div>
      {relatedArticles.length ? <RelatedArticles articles={relatedArticles} /> : null}
    </main>
  );
}
