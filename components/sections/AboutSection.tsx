"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const AboutSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-100px",
  });

  const imageVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        delay: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-4 sm:px-6 md:py-24 lg:py-20 bg-background"
      aria-labelledby="about-heading"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[40fr_60fr] lg:grid-cols-2 gap-8 md:gap-12 lg:gap-12 items-center">
          {/* Image */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative w-full max-w-[300px] md:max-w-[400px] mx-auto aspect-square"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/assets/liana-astro.jpg"
                alt="Лиана Астро — профессиональный астролог"
                fill
                sizes="(max-width: 768px) 300px, 400px"
                className="object-cover"
                loading="lazy"
                quality={90}
              />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-4 md:space-y-6"
          >
            <h2
              id="about-heading"
              className="font-heading font-semibold text-primary text-[2rem] md:text-[2.25rem] lg:text-[2.5rem] leading-tight"
            >
              О себе
            </h2>

            <div className="space-y-4 text-foreground/90">
              <p className="text-[1.125rem] leading-[1.7] font-body">
                С астрологией работаю уже 15 лет. За это время я поняла одну
                важную вещь: астрология — не про предсказания и мистику. Это
                инструмент для понимания себя, своих паттернов и потенциала.
              </p>

              <p className="text-[1.125rem] leading-[1.7] font-body">
                <strong className="font-medium text-primary">
                  Я не предсказываю будущее.
                </strong>{" "}
                Я помогаю понять, как работают ваши внутренние механизмы, как
                распознать повторяющиеся сценарии и использовать эти знания для
                осознанных решений.
              </p>

              <p className="text-[1.125rem] leading-[1.7] font-body">
                Моя цель — дать вам конкретные инструменты для самопонимания,
                без эзотерики и размытых формулировок. Только практика и
                результат.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
