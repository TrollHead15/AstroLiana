'use client';

import { ReactNode } from 'react';
import Button from './Button';

interface LeadMagnetCardProps {
  id: number;
  icon: ReactNode;
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: (id: number) => void;
}

export const LeadMagnetCard = ({
  id,
  icon,
  title,
  description,
  buttonText,
  onButtonClick,
}: LeadMagnetCardProps) => {
  return (
    <div className="lead-magnet-card flex h-full flex-col items-center rounded-2xl bg-white p-8 text-center shadow-lg transition duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl">
      <div className="mb-6 text-foreground/90">{icon}</div>

      <h3 className="mb-4 font-heading text-[1.75rem] font-semibold text-primary">
        {title}
      </h3>

      <p className="mb-8 flex-grow font-body text-base leading-relaxed text-foreground/80">
        {description}
      </p>

      <Button
        type="button"
        variant="accent"
        className="w-full max-w-xs"
        onClick={() => onButtonClick(id)}
      >
        {buttonText}
      </Button>
    </div>
  );
};
