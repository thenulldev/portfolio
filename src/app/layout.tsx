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
  description:
    "Cloud & Cybersecurity Engineer specializing in cloud architecture, DevSecOps, and secure infrastructure. View certifications, skills, and learning journey.",
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
    "thenulldev",
    "Hack The Box",
    "TryHackMe",
    "CompTIA",
    "Microsoft",
  ],
  authors: [{ name: "Stephen Freerking", url: "https://thenull.dev" }],
  creator: "Stephen Freerking",
  publisher: "thenull.dev",
  metadataBase: new URL("https://thenull.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://thenull.dev",
    siteName: "Stephen Freerking",
    title: "Stephen Freerking — Cloud & Cybersecurity Engineer",
    description:
      "Cloud & Cybersecurity Engineer specializing in cloud architecture, DevSecOps, and secure infrastructure.",
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
    description:
      "Cloud & Cybersecurity Engineer specializing in cloud architecture, DevSecOps, and secure infrastructure.",
    images: ["/og-image.png"],
    creator: "@StephenFreerkn",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      { rel: "icon", url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { rel: "icon", url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
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
      "https://www.credly.com/users/stephen-freerking",
      "https://tryhackme.com/p/ThatNullDev",
      "https://profile.hackthebox.com/profile/019c5ac7-7d6d-73ea-9476-7a01f4f679fb",
    ],
    description:
      "Cloud & Cybersecurity Engineer specializing in cloud architecture, DevSecOps, and secure infrastructure.",
    knowsAbout: [
      "Cloud Architecture",
      "Cybersecurity",
      "DevSecOps",
      "AWS",
      "Azure",
      "Infrastructure as Code",
      "Penetration Testing",
    ],
    image: "https://thenull.dev/og-image.png",
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
