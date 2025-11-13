"use client";

import Link from "next/link";
import { useCallback } from "react";

import AboutSection from "@/components/sections/AboutSection";
import HeroSection from "@/components/sections/HeroSection";
import LeadMagnetsSection, { type LeadMagnetType } from "@/components/sections/LeadMagnetsSection";

export default function HomePageContent() {
  const handleLeadMagnetClick = useCallback((type: LeadMagnetType) => {
    const target = document.getElementById(`lead-magnet-${type}`);

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <LeadMagnetsSection onCardClick={handleLeadMagnetClick} />
      <section className="flex w-full justify-center bg-cream px-5 py-12 md:px-8 md:py-24">
        <div className="mx-auto w-full max-w-container">
          <h2 className="mb-6 font-serif text-2xl font-bold text-primary md:text-3xl">
            Юридические документы
          </h2>
          <p className="mb-6 font-sans text-base leading-relaxed text-primary/80">
            Перед использованием материалов и форм обратной связи пожалуйста ознакомьтесь с
            Политикой конфиденциальности и Согласием на обработку персональных данных.
          </p>
          <ul className="flex flex-col gap-3 font-sans text-base text-primary md:gap-4">
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
