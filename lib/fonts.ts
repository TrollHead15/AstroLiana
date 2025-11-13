import { Inter, Cormorant_Garamond } from "next/font/google";

export const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });

export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cormorant"
});
