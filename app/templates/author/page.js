import AuthorPageLayout from "../../../components/templates/AuthorPageLayout";
import { previewAuthor, relatedTemplatePreviews } from "../../../data/template-previews";

const author = {
  ...previewAuthor,
  breadcrumbs: [{ label: "Home", href: "/" }, { label: "Authors" }, { label: "Mara Vale" }],
  about: [
    "Mara Vale is the editorial pen name used by Path & Roam for destination guides, itineraries and travel research.",
    "The name does not represent a claim of personal travel, hotel stays, tours taken or firsthand testing unless that information is explicitly identified and genuinely available.",
  ],
  focus: ["Destination research", "Practical itineraries", "Transport planning", "Car-free travel"],
  relatedArticles: relatedTemplatePreviews,
};

export const metadata = { title: "Author Page Template" };

export default function AuthorTemplatePreviewPage() {
  return <AuthorPageLayout author={author} preview />;
}
