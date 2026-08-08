import AuthorPageLayout from "../../../components/templates/AuthorPageLayout";
import StructuredData from "../../../components/StructuredData";
import { getAuthor } from "../../../data/authors";
import { createPageMetadata } from "../../../lib/seo.js";
import { personStructuredData } from "../../../lib/structured-data.js";

const author = getAuthor("mara-vale");

export const metadata = createPageMetadata({
  title: "Mara Vale, Travel Editor",
  description: author.bio,
  pathname: "/authors/mara-vale",
});

export default function MaraValePage() {
  const pageAuthor = {
    ...author,
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Authors" },
      { label: "Mara Vale" },
    ],
    about: [
      "Mara Vale is the editorial pen name used by Path & Roam for destination guides, itineraries and travel research.",
      "The name does not imply personal travel, hotel stays, tours taken or firsthand testing unless that information is explicitly identified and genuinely available.",
    ],
    focus: [
      "Destination research",
      "Practical itineraries",
      "Transportation planning",
      "Travel with or without a car",
    ],
  };

  return (
    <>
      <StructuredData
        data={personStructuredData({
          name: author.name,
          pathname: author.href,
          jobTitle: author.role,
          description: author.bio,
        })}
      />
      <AuthorPageLayout author={pageAuthor} />
    </>
  );
}
