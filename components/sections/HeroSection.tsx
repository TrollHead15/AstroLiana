"use client";

import { motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

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
            staggerChildren: 0.1,
            delayChildren: 0.2
          }
        }
      };

  const itemVariants: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0 }
      }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut" }
        }
      };

  return (
    <section
      id="hero"
      className="flex w-full items-center justify-center bg-cream px-5 py-12 md:px-8 md:py-24"
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-section lg:grid lg:grid-cols-2 lg:items-center">
        {/* Left column - Content */}
        <motion.div
          className="flex flex-col gap-6"
          variants={containerVariants}
          initial={prefersReducedMotion ? "visible" : "hidden"}
          animate="visible"
        >
          <motion.h1
            className="font-serif text-4xl font-bold text-primary md:text-5xl"
            variants={itemVariants}
          >
            Лиана Астро
          </motion.h1>

          <motion.p
            className="text-lg leading-relaxed text-primary md:text-xl"
            variants={itemVariants}
          >
            Астрологические консультации и практические материалы для раскрытия вашего потенциала
          </motion.p>

          <motion.p
            className="text-base leading-relaxed text-primary/80 md:text-lg"
            variants={itemVariants}
          >
            Получите доступ к избранным материалам и запишитесь на персональную консультацию
          </motion.p>

          <motion.div variants={itemVariants}>
            <button
              onClick={() => {
                const element = document.getElementById("lead-magnets");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-medium text-cream transition-all duration-200 hover:opacity-90 hover:shadow-lg"
            >
              Начать
            </button>
          </motion.div>
        </motion.div>

        {/* Right column - Visual */}
        <motion.div
          className="flex items-center justify-center"
          variants={itemVariants}
          initial={prefersReducedMotion ? "visible" : "hidden"}
          animate="visible"
        >
          <div className="aspect-square w-full max-w-sm rounded-lg bg-gradient-to-br from-gold/20 to-primary/10 p-8 shadow-sm">
            <div className="flex h-full items-center justify-center text-center">
              <p className="font-serif text-xl text-primary/60">Астрология — ключ к самопознанию</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
