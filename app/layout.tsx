import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import type { ReactNode } from "react";

import Footer from "@/components/Footer";

import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cormorant"
});

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
        <div className="site-wrapper">
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
