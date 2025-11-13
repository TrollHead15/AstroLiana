import type { Metadata } from "next";
import Link from "next/link";

import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import LeadMagnetsSection from "@/components/sections/LeadMagnetsSection";

export const metadata: Metadata = {
  title: "Главная",
  description:
    "Получайте бесплатные астрологические материалы и запишитесь на консультацию у Лианы Астро.",
  alternates: {
    canonical: "/"
  }
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <LeadMagnetsSection />
      <section className="flex w-full justify-center bg-cream px-5 py-12 md:px-8 md:py-24">
        <div className="mx-auto w-full max-w-container">
          <h2 className="mb-6 text-2xl font-bold text-primary md:text-3xl">
            Юридические документы
          </h2>
          <p className="mb-6 text-primary/80">
            Перед использованием материалов и форм обратной связи пожалуйста ознакомьтесь с
            Политикой конфиденциальности и Согласием на обработку персональных данных.
          </p>
          <ul className="flex flex-col gap-3 md:gap-4">
            <li>
              <Link href="/privacy-policy">Политика конфиденциальности</Link>
            </li>
            <li>
              <Link href="/consent">Согласие на обработку персональных данных</Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
