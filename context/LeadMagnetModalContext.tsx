'use client';

import React, { createContext, useCallback, useContext, useMemo, useState, ReactNode } from 'react';

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

  const openModal = useCallback((id: number) => {
    setActiveModalId(id);
  }, []);

  const closeModal = useCallback(() => {
    setActiveModalId(null);
  }, []);

  const value = useMemo(
    () => ({ activeModalId, openModal, closeModal }),
    [activeModalId, openModal, closeModal],
  );

  return (
    <LeadMagnetModalContext.Provider value={value}>
      {children}
    </LeadMagnetModalContext.Provider>
  );
};
