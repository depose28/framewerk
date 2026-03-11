import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"),
  title: "Framewerk",
  description: "Clinical neural activation graph. 700 mental models as neurons.",
  openGraph: {
    title: "Framewerk",
    description: "700 mental models as neurons. Explore connections, fire the Oracle.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Framewerk",
    description: "700 mental models as neurons. Explore connections, fire the Oracle.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${ibmPlexMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
