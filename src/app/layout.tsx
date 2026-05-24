import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Stephen Freerking — Cloud & Cybersecurity Engineer",
    template: "%s | Stephen Freerking",
  },
  description: "Cloud & Cybersecurity Engineer specializing in cloud architecture, DevSecOps, and secure infrastructure. View certifications, skills, and technical blog.",
  keywords: [
    "Stephen Freerking",
    "Cloud Engineer",
    "Cybersecurity Engineer",
    "DevSecOps",
    "AWS",
    "Azure",
    "cloud architecture",
    "IT certifications",
    "portfolio",
    "blog",
    "thenull.dev",
  ],
  authors: [{ name: "Stephen Freerking", url: "https://thenull.dev" }],
  creator: "Stephen Freerking",
  publisher: "thenull.dev",
  metadataBase: new URL("https://thenull.dev"),
  alternates: {
    types: {
      "application/rss+xml": "/api/rss",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://thenull.dev",
    siteName: "thenull.dev",
    title: "Stephen Freerking — Cloud & Cybersecurity Engineer",
    description: "Cloud & Cybersecurity Engineer specializing in cloud architecture, DevSecOps, and secure infrastructure.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Stephen Freerking - Cloud & Cybersecurity Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stephen Freerking — Cloud & Cybersecurity Engineer",
    description: "Cloud & Cybersecurity Engineer specializing in cloud architecture, DevSecOps, and secure infrastructure.",
    images: ["/og-image.png"],
    creator: "@StephenFreerkn",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code", // Replace with actual code when available
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Stephen Freerking",
    jobTitle: "Cloud & Cybersecurity Engineer",
    url: "https://thenull.dev",
    sameAs: [
      "https://www.linkedin.com/in/thatnulldev/",
      "https://github.com/Snipey",
      "https://twitter.com/StephenFreerkn",
    ],
    description: "Cloud & Cybersecurity Engineer specializing in cloud architecture, DevSecOps, and secure infrastructure.",
    knowsAbout: ["Cloud Architecture", "Cybersecurity", "DevSecOps", "AWS", "Azure"],
  };

  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
