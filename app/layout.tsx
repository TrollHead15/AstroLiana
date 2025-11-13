import type { Metadata } from "next";
import type { ReactNode } from "react";

import Footer from "@/components/Footer";
import LenisScroll from "@/components/LenisScroll";
import { inter, cormorant } from "@/lib/fonts";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://lianaastro.ru"),
  title: {
    default: "Лиана Астро — астрологические консультации и материалы",
    template: "%s | Лиана Астро"
  },
  description:
    "Лиана Астро делится астрологическими материалами и проводит индивидуальные консультации.",
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: "/"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" className={`${inter.variable} ${cormorant.variable}`}>
      <body>
        <LenisScroll />
        <div className="site-wrapper">
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
