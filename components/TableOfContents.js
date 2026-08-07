export default function TableOfContents({ items }) {
  if (!items?.length) return null;

  return (
    <nav className="table-of-contents" aria-labelledby="contents-title">
      <p className="story-label" id="contents-title">On this page</p>
      <ol>
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`}>{item.label}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
