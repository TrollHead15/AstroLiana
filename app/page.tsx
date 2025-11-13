import type { Metadata } from "next";
import Link from "next/link";

import HeroSection from "@/components/sections/HeroSection";

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
      <section
        id="lead-magnets"
        className="flex w-full justify-center bg-cream px-5 py-12 md:px-8 md:py-24"
      >
        <div className="mx-auto w-full max-w-container">
          <h2 className="mb-8 text-center text-3xl font-bold text-primary md:text-4xl">
            Материалы для развития
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-center text-lg text-primary/80">
            Получите доступ к практическим материалам и начните свой путь астрологического развития
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-xl font-semibold text-primary">Астрологический гайд</h3>
              <p className="mb-4 text-primary/80">Полное руководство для начинающих в астрологии</p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2 font-medium text-cream no-underline transition-opacity duration-200 hover:opacity-90"
              >
                Скачать
              </Link>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-xl font-semibold text-primary">Чек-лист планов</h3>
              <p className="mb-4 text-primary/80">
                Практический чек-лист для планирования вашей жизни
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2 font-medium text-cream no-underline transition-opacity duration-200 hover:opacity-90"
              >
                Скачать
              </Link>
            </div>
          </div>
        </div>
      </section>
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
