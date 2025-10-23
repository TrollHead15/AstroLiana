"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui";

interface HeroSectionProps {
  onCTAClick?: () => void;
}

const HeroSection = ({ onCTAClick }: HeroSectionProps) => {
  const handleScroll = () => {
    const leadMagnetsSection = document.getElementById("lead-magnets");
    if (leadMagnetsSection) {
      const headerOffset = 80;
      const elementPosition = leadMagnetsSection.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }

    if (onCTAClick) {
      onCTAClick();
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const slideUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const scaleVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12"
      aria-label="Hero section"
    >
      <div className="w-full max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 lg:space-y-10">
        <motion.h1
          className="text-h1 lg:text-display font-heading text-primary text-balance"
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          Лиана Астро — астрология как инструмент самопонимания
        </motion.h1>

        <motion.p
          className="text-body lg:text-body-lg text-foreground/80 max-w-2xl mx-auto text-balance"
          variants={slideUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          Бесплатные материалы для тех, кто хочет понимать себя глубже — без
          мистики
        </motion.p>

        <motion.div
          variants={scaleVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
        >
          <Button
            variant="accent"
            size="lg"
            onClick={handleScroll}
            className="group relative overflow-hidden transition-all duration-200 hover:shadow-lg hover:shadow-accent/30 hover:scale-105 active:scale-100 focus-visible:scale-105 focus-visible:shadow-lg focus-visible:shadow-accent/30"
            aria-label="Перейти к выбору бесплатного подарка"
          >
            <span className="relative z-10">Выбрать бесплатный подарок</span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
