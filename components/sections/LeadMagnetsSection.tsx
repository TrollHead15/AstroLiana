'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { LeadMagnetCard } from '../ui/LeadMagnetCard';
import { NatalChartIcon } from '../ui/icons/NatalChartIcon';
import { ChecklistIcon } from '../ui/icons/ChecklistIcon';
import { GuideIcon } from '../ui/icons/GuideIcon';
import { useLeadMagnetModal } from '../../context/LeadMagnetModalContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const LeadMagnetsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { openModal } = useLeadMagnetModal();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !cardsRef.current) {
      return;
    }

    const cards = cardsRef.current.querySelectorAll('.lead-magnet-card');

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
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
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
      title: 'Бесплатная натальная карта',
      description:
        'Получите персональный PDF с ключевыми точками вашей натальной карты: Солнце, Луна, Асцендент',
      buttonText: 'Получить карту',
    },
    {
      id: 2,
      icon: <ChecklistIcon />,
      title: 'Чек-лист: Лунный знак за 5 минут',
      description:
        'Узнайте, как ваш Лунный знак влияет на эмоции, отношения и стиль общения',
      buttonText: 'Получить чек-лист',
    },
    {
      id: 3,
      icon: <GuideIcon />,
      title: 'Гайд: 3 триггера в отношениях',
      description:
        'Разберите типичные паттерны на основе Венеры и Марса — и узнайте, как их трансформировать',
      buttonText: 'Получить гайд',
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
