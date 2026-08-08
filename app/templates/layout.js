import { notFound } from "next/navigation";

export const metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function TemplatesLayout({ children }) {
  if (process.env.NODE_ENV !== "development") notFound();
  return children;
}
