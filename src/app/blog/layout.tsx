import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Cloud, Security & DevOps",
  description: "Technical articles, tutorials, and insights on cloud architecture, cybersecurity, DevSecOps, and IT certifications.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://thenull.dev/blog",
    siteName: "thenull.dev",
    title: "Blog — Stephen Freerking",
    description: "Technical articles, tutorials, and insights on cloud architecture, cybersecurity, DevSecOps, and IT certifications.",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}