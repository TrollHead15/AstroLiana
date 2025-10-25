'use client';

import React from 'react';

interface LeadMagnetCardProps {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: (id: number) => void;
}

export const LeadMagnetCard: React.FC<LeadMagnetCardProps> = ({
  id,
  icon,
  title,
  description,
  buttonText,
  onButtonClick,
}) => {
  return (
    <div className="lead-magnet-card bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-2 flex flex-col items-center text-center">
      <div className="mb-6">{icon}</div>
      
      <h3 className="font-heading font-semibold text-[1.75rem] text-primary mb-4">
        {title}
      </h3>
      
      <p className="font-body text-base leading-relaxed text-primary mb-6 flex-grow">
        {description}
      </p>
      
      <button
        onClick={() => onButtonClick(id)}
        className="bg-accent text-white font-body font-medium text-base px-8 py-3 rounded-full hover:scale-105 hover:brightness-90 transition-all duration-300 ease-out"
      >
        {buttonText}
      </button>
    </div>
  );
};
