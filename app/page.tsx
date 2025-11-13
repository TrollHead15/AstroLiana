import type { Metadata } from "next";

import HomePageContent from "@/components/HomePageContent";

export const metadata: Metadata = {
  title: "Главная",
  description:
    "Получайте бесплатные астрологические материалы и запишитесь на консультацию у Лианы Астро.",
  alternates: {
    canonical: "/"
  }
};

export default function HomePage() {
  return <HomePageContent />;
}
