import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Days Since the Last War Thunder Leak",
  description:
    "War Thunder players like to leak a lot of restricted/classified documents. Find out how many days there's been since the last War Thunder leak.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script
        src="https://analytics.tetrahedron.dev/script.js"
        data-website-id="e6d6d6dc-6a30-4a2d-bd50-cc29b1ae5bcf"
      />
      <body className={GeistSans.className}>{children}</body>
    </html>
  );
}
