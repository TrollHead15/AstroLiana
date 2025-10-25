"use client";

import { ChecklistForm } from "@/components/modals/ChecklistForm";
import { GuideForm } from "@/components/modals/GuideForm";
import { NatalChartForm } from "@/components/modals/NatalChartForm";
import { useLeadMagnetModal } from "@/context/LeadMagnetModalContext";

export const LeadMagnetModals = () => {
  const { activeModalId, closeModal } = useLeadMagnetModal();

  return (
    <>
      <NatalChartForm isOpen={activeModalId === 1} onClose={closeModal} />
      <ChecklistForm isOpen={activeModalId === 2} onClose={closeModal} />
      <GuideForm isOpen={activeModalId === 3} onClose={closeModal} />
    </>
  );
};
