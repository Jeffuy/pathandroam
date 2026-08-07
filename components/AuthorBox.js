import Link from "next/link";

export default function AuthorBox({ author }) {
  return (
    <aside className="author-box" aria-labelledby="author-box-title">
      <span className="author-initials author-initials--large" aria-hidden="true">
        {author.initials}
      </span>
      <div>
        <p className="story-label">About the editor</p>
        <h2 id="author-box-title">{author.name}</h2>
        <p>{author.bio}</p>
        <Link className="text-link" href={author.href}>Author profile <span aria-hidden="true">→</span></Link>
      </div>
    </aside>
  );
}
