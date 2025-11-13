"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function AboutSection() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      {
        threshold: 0.2
      }
    );

    const element = containerRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const photoVariants: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 1 },
        visible: { opacity: 1 }
      }
    : {
        hidden: { opacity: 0, x: -30 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.7, ease: "easeOut" }
        }
      };

  const textVariants: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 1 },
        visible: { opacity: 1 }
      }
    : {
        hidden: { opacity: 0, x: 30 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.7, ease: "easeOut", delay: 0.1 }
        }
      };

  return (
    <section
      ref={containerRef}
      className="flex w-full items-center justify-center bg-cream px-5 py-12 md:px-8 md:py-24"
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-section lg:grid lg:grid-cols-2 lg:items-center">
        {/* Left column - Photo */}
        <motion.div
          className="flex items-center justify-center"
          variants={photoVariants}
          initial={prefersReducedMotion ? "visible" : "hidden"}
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="relative h-96 w-full max-w-sm overflow-hidden rounded-lg shadow-lg">
            <Image
              src="/assets/about/liana-portrait.svg"
              alt="Лиана — астролог"
              fill
              className="object-cover"
              priority={false}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
            />
          </div>
        </motion.div>

        {/* Right column - Text */}
        <motion.div
          className="flex flex-col gap-6"
          variants={textVariants}
          initial={prefersReducedMotion ? "visible" : "hidden"}
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2 className="font-serif text-3xl font-bold text-primary md:text-4xl">
            О Лиане
          </motion.h2>

          <motion.p className="leading-relaxed text-primary">
            Лиана — опытный астролог с более чем 15 годами практики в области астрологического
            консультирования. Она помогает клиентам разобраться в сложных жизненных ситуациях,
            раскрыть свой потенциал и лучше понять себя через призму астрологии.
          </motion.p>

          <motion.p className="leading-relaxed text-primary/80">
            Специализируясь на персональных консультациях и синастрии, Лиана создала уникальный
            подход, сочетающий древнюю мудрость с современными знаниями. Её материалы и курсы
            помогают тысячам людей улучшить качество жизни и принимать осознанные решения.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
