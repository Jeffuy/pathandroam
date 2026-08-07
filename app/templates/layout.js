export const metadata = {
  title: "Template Preview",
  description: "Draft layout preview for Path & Roam.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function TemplatesLayout({ children }) {
  return children;
}
