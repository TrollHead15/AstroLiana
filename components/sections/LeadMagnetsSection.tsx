"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { LeadMagnetCard } from "@/components/ui/LeadMagnetCard";
import { NatalChartIcon } from "@/components/ui/icons/NatalChartIcon";
import { ChecklistIcon } from "@/components/ui/icons/ChecklistIcon";
import { GuideIcon } from "@/components/ui/icons/GuideIcon";
import { useLeadMagnetModal } from "@/context/LeadMagnetModalContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const LeadMagnetsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { openModal } = useLeadMagnetModal();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !cardsRef.current) {
      return;
    }

    const cards = cardsRef.current.querySelectorAll<HTMLElement>(
      ".lead-magnet-card"
    );

    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const leadMagnets = [
    {
      id: 1,
      icon: <NatalChartIcon />,
      title: "Бесплатная натальная карта",
      description:
        "Получите персональный PDF с ключевыми точками вашей натальной карты: Солнце, Луна, Асцендент",
      buttonText: "Получить карту",
    },
    {
      id: 2,
      icon: <ChecklistIcon />,
      title: "Чек-лист: Лунный знак за 5 минут",
      description:
        "Узнайте, как ваш Лунный знак влияет на эмоции, отношения и стиль общения",
      buttonText: "Получить чек-лист",
    },
    {
      id: 3,
      icon: <GuideIcon />,
      title: "Гайд: 3 триггера в отношениях",
      description:
        "Разберите типичные паттерны на основе Венеры и Марса — и узнайте, как их трансформировать",
      buttonText: "Получить гайд",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="lead-magnets"
      className="bg-gray-50 py-20 px-4"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-heading text-3xl font-semibold text-primary sm:text-4xl">
          Выберите свой подарок
        </h2>
        <p className="mt-4 font-body text-base text-foreground/70">
          Подберите материал, который поможет разобраться в себе глубже: натальная карта,
          практический чек-лист или подробный гайд.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-7xl">
        <div
          ref={cardsRef}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {leadMagnets.map((magnet) => (
            <LeadMagnetCard
              key={magnet.id}
              id={magnet.id}
              icon={magnet.icon}
              title={magnet.title}
              description={magnet.description}
              buttonText={magnet.buttonText}
              onButtonClick={openModal}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadMagnetsSection;
