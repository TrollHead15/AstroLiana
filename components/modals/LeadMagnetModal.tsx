"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect, useRef } from "react";

interface LeadMagnetModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export const LeadMagnetModal = ({
  isOpen,
  onClose,
  title,
  children,
}: LeadMagnetModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handler);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8 sm:px-6">
          <motion.button
            type="button"
            aria-label="Закрыть модальное окно"
            className="absolute inset-0 h-full w-full bg-primary/60"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative z-[101] w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-magnet-modal-title"
          >
            <div className="flex items-start justify-between border-b border-foreground/10 p-6 sm:p-8">
              <h2
                id="lead-magnet-modal-title"
                className="text-xl font-semibold text-primary sm:text-2xl"
              >
                {title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="ml-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-transparent text-foreground/60 transition hover:bg-primary/10"
                aria-label="Закрыть"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div className="max-h-[75vh] overflow-y-auto p-6 sm:p-8">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
