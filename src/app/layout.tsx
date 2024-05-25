import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "SVG to JSX/TSX Converter",
  description:
    "Convert SVG files to JSX/TSX for use with React and React-based frameworks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
