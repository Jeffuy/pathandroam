import Link from "next/link";

export default function AuthorInline({ author, publishedAt, updatedAt }) {
  return (
    <div className="author-inline">
      <span className="author-initials" aria-hidden="true">{author.initials}</span>
      <div>
        <p>
          By <Link href={author.href}>{author.name}</Link>
          <span aria-hidden="true"> · </span>{author.role}
        </p>
        <p>
          {publishedAt && (
            <time dateTime={publishedAt.iso}>Published {publishedAt.label}</time>
          )}
          {updatedAt && (
            <>{publishedAt && <span aria-hidden="true"> · </span>}<time dateTime={updatedAt.iso}>Updated {updatedAt.label}</time></>
          )}
        </p>
      </div>
    </div>
  );
}
