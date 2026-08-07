export default function Callout({ label = "Planning note", title, children }) {
  return (
    <aside className="callout">
      <p className="story-label">{label}</p>
      {title && <h2>{title}</h2>}
      <div>{children}</div>
    </aside>
  );
}
