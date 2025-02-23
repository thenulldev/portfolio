import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto, Poppins } from "next/font/google";
import "./globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

const poppins = Poppins({
  variable: "--font-poppins-sans",
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto-sans",
  weight: ["500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Null Dev",
  description: "A display of my skills and projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${poppins.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
