import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans'

import "./globals.css";


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
      <body className={GeistSans.className}>{children}</body>
    </html>
  );
}
