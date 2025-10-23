'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LeadMagnetModalContextType {
  activeModalId: number | null;
  openModal: (id: number) => void;
  closeModal: () => void;
}

const LeadMagnetModalContext = createContext<LeadMagnetModalContextType | undefined>(
  undefined
);

export const useLeadMagnetModal = () => {
  const context = useContext(LeadMagnetModalContext);
  if (!context) {
    throw new Error('useLeadMagnetModal must be used within LeadMagnetModalProvider');
  }
  return context;
};

interface LeadMagnetModalProviderProps {
  children: ReactNode;
}

export const LeadMagnetModalProvider: React.FC<LeadMagnetModalProviderProps> = ({
  children,
}) => {
  const [activeModalId, setActiveModalId] = useState<number | null>(null);

  const openModal = (id: number) => {
    setActiveModalId(id);
  };

  const closeModal = () => {
    setActiveModalId(null);
  };

  return (
    <LeadMagnetModalContext.Provider value={{ activeModalId, openModal, closeModal }}>
      {children}
    </LeadMagnetModalContext.Provider>
  );
};
