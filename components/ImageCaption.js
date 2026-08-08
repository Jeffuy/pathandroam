export default function ImageCaption({ details, illustrative = false, as: Caption = "span" }) {
  if (illustrative || details?.illustrative) {
    return <Caption className="image-note">{details?.label || "Illustrative image"}</Caption>;
  }

  if (!details?.credit) return null;

  const { author, sourceUrl, license, licenseUrl, modification } = details.credit;

  return (
    <Caption className="image-note image-credit">
      Photo: <a href={sourceUrl} rel="noopener noreferrer" target="_blank">{author}</a>
      {" / "}
      <a href={sourceUrl} rel="noopener noreferrer" target="_blank">Wikimedia Commons</a>
      {" / "}
      <a href={licenseUrl} rel="noopener noreferrer" target="_blank">{license}</a>
      {modification && ` / ${modification}`}
    </Caption>
  );
}
