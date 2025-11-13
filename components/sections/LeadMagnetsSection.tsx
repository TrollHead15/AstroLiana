"use client";

import { motion, type Variants } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

export type LeadMagnetType = "natalChart" | "checklist" | "guide";

type LeadMagnetsSectionProps = {
  onSelect?: (type: LeadMagnetType) => void;
};

type LeadMagnetCard = {
  type: LeadMagnetType;
  title: string;
  description: string;
  buttonLabel: string;
  Icon: (props: { className?: string }) => JSX.Element;
};

export default function LeadMagnetsSection({ onSelect }: LeadMagnetsSectionProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const element = sectionRef.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [prefersReducedMotion]);

  const containerVariants: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 1 },
        visible: { opacity: 1 }
      }
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
          }
        }
      };

  const itemVariants: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0 }
      }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut" }
        }
      };

  const cards = useMemo<LeadMagnetCard[]>(
    () => [
      {
        type: "natalChart",
        title: "Натальная карта",
        description:
          "Персональный разбор главных астрологических показателей с рекомендациями по гармоничному развитию.",
        buttonLabel: "Открыть натальную карту",
        Icon: NatalChartIcon
      },
      {
        type: "checklist",
        title: "Астрологический чек-лист",
        description:
          "Практические шаги и ритуалы, которые помогут планировать месяц в согласии с лунными циклами.",
        buttonLabel: "Получить чек-лист",
        Icon: ChecklistIcon
      },
      {
        type: "guide",
        title: "Пошаговый гайд",
        description:
          "Структурированное руководство, объясняющее базовые принципы астрологии и способы их применения в жизни.",
        buttonLabel: "Скачать гайд",
        Icon: GuideIcon
      }
    ],
    []
  );

  const handleSelect = (type: LeadMagnetType) => {
    if (onSelect) {
      onSelect(type);
    }
  };

  return (
    <section
      id="lead-magnets"
      ref={sectionRef}
      className="flex w-full justify-center bg-cream px-5 py-12 md:px-8 md:py-24"
    >
      <motion.div
        className="mx-auto w-full max-w-container"
        variants={containerVariants}
        initial={prefersReducedMotion ? "visible" : "hidden"}
        animate={prefersReducedMotion || hasAnimated ? "visible" : "hidden"}
      >
        <motion.div className="text-center" variants={itemVariants}>
          <h2 className="mb-4 text-3xl font-bold text-primary md:text-4xl">Материалы для развития</h2>
          <p className="mx-auto max-w-2xl text-lg text-primary/80">
            Получите доступ к практическим материалам, чтобы глубже понять свой потенциал и вести жизнь в
            гармонии с астрологическими циклами.
          </p>
        </motion.div>

        <motion.div className="mt-10 grid gap-6 lg:grid-cols-3" variants={containerVariants}>
          {cards.map((card) => (
            <motion.article
              key={card.type}
              variants={itemVariants}
              className="group flex h-full flex-col rounded-xl bg-white p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg focus-within:-translate-y-1 focus-within:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-primary">
                <card.Icon className="h-7 w-7" />
              </div>

              <div className="mt-6 flex flex-col gap-3 text-left">
                <h3 className="text-xl font-semibold text-primary">{card.title}</h3>
                <p className="text-primary/80">{card.description}</p>
              </div>

              <div className="mt-auto pt-6">
                <button
                  type="button"
                  onClick={() => handleSelect(card.type)}
                  className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2 font-medium text-cream transition-colors duration-200 hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  aria-label={card.buttonLabel}
                >
                  {card.buttonLabel}
                </button>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

function NatalChartIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="16" opacity="0.5" />
      <circle cx="24" cy="24" r="10" opacity="0.5" />
      <path d="M24 8v32M8 24h32" opacity="0.5" />
      <path d="M17 14l14 20M31 14L17 34" />
    </svg>
  );
}

function ChecklistIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden="true"
    >
      <rect x="12" y="10" width="24" height="30" rx="4" opacity="0.5" />
      <path d="M17 18h9M17 26h9M17 34h9" opacity="0.8" />
      <path d="M30 17l2 2 4-5" />
      <path d="M30 25l2 2 4-5" />
      <path d="M30 33l2 2 4-5" />
    </svg>
  );
}

function GuideIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 12h18a6 6 0 0 1 6 6v20H18a6 6 0 0 0-6 6V12z" opacity="0.5" />
      <path d="M30 12v26a6 6 0 0 0-6-6H12" />
      <path d="M20 20h10M20 26h10" />
    </svg>
  );
}
