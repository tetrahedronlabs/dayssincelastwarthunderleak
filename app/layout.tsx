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
        data-website-id="7bbf36ec-2c73-405e-8c0f-8ef83d7208cb"
      />
      <body className={GeistSans.className}>{children}</body>
    </html>
  );
}
