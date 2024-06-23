import type { Metadata } from "next";
import "./globals.scss";
import Footer from "@/components/Footer";
import { HeaderComponent } from "@/components/Header";

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
      <body>
        <HeaderComponent />
        {children}
        <Footer />
      </body>
    </html>
  );
}
