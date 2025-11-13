"use client";

import type { ReactNode } from "react";

export type LeadMagnetType = "natal-chart" | "checklist" | "guide";

interface LeadMagnetsSectionProps {
  onCardClick: (type: LeadMagnetType) => void;
}

interface LeadMagnetCard {
  type: LeadMagnetType;
  title: string;
  description: string;
  buttonLabel: string;
  icon: ReactNode;
}

const accentColor = "#D4AF37";

const circleIcon = (
  <svg
    width={64}
    height={64}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="32" cy="32" r="22" stroke={accentColor} strokeWidth={2} />
  </svg>
);

const moonCheckIcon = (
  <svg
    width={64}
    height={64}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M40.5 33.5A16.5 16.5 0 0 1 24 49C15.7157 49 9 42.2843 9 34S15.7157 19 24 19a16.5 16.5 0 0 0 16.5 14.5Z"
      stroke={accentColor}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M38 42l6 6 12-12"
      stroke={accentColor}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const peopleIcon = (
  <svg
    width={64}
    height={64}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="22" cy="24" r="10" stroke={accentColor} strokeWidth={2} />
    <circle cx="42" cy="20" r="8" stroke={accentColor} strokeWidth={2} />
    <path
      d="M10 50c0-8 6-14 14-14s14 6 14 14"
      stroke={accentColor}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M34 48c0-6 5-11 11-11 6 0 11 5 11 11"
      stroke={accentColor}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const cards: LeadMagnetCard[] = [
  {
    type: "natal-chart",
    title: "Бесплатная натальная карта",
    description:
      "Получите персональный PDF с ключевыми точками вашей натальной карты: Солнце, Луна, Асцендент",
    buttonLabel: "Получить карту",
    icon: circleIcon
  },
  {
    type: "checklist",
    title: "Чек-лист: Лунный знак за 5 минут",
    description:
      "Узнайте, как ваш Лунный знак влияет на эмоции, отношения и стиль общения",
    buttonLabel: "Получить чек-лист",
    icon: moonCheckIcon
  },
  {
    type: "guide",
    title: "Гайд: 3 триггера в отношениях",
    description: "Разберите типичные паттерны на основе Венеры и Марса",
    buttonLabel: "Получить гайд",
    icon: peopleIcon
  }
];

export default function LeadMagnetsSection({ onCardClick }: LeadMagnetsSectionProps) {
  return (
    <section
      id="lead-magnets"
      className="flex w-full justify-center bg-cream px-5 py-12 md:px-8 md:py-24"
    >
      <div className="mx-auto w-full max-w-container">
        <h2 className="mb-8 text-center font-serif text-3xl font-bold text-primary md:text-4xl">
          Материалы для развития
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-center font-sans text-lg text-primary">
          Получите доступ к практическим материалам и начните свой путь астрологического развития
        </p>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.type}
              className="flex h-full flex-col gap-6 rounded-lg bg-white p-8 shadow-sm transition-all duration-200 hover:opacity-95 hover:shadow-md"
            >
              <div>{card.icon}</div>
              <h3 className="font-serif text-xl font-semibold text-primary">{card.title}</h3>
              <p className="font-sans text-base font-normal leading-relaxed text-primary">
                {card.description}
              </p>
              <button
                type="button"
                onClick={() => onCardClick(card.type)}
                className="mt-auto inline-flex w-fit items-center justify-center rounded-full bg-gold px-8 py-2 font-sans text-base font-medium text-white transition-opacity duration-200 hover:opacity-80"
              >
                {card.buttonLabel}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
