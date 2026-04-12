import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PinArkive · Next.js Starter",
  description: "Upload a file to PinArkive and display the returned CID.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
