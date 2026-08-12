"use client";

import React, { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { X } from "lucide-react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  hideCloseButton?: boolean;
}

export function Modal({ isOpen, onClose, children, title, hideCloseButton = false }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  useFocusTrap(modalRef, isOpen);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const [mounted, setMounted] = React.useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.2 }}
            className="absolute inset-0 bg-[#4A3038]/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label={title || "Dialog"}
            initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.95, y: prefersReduced ? 0 : 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: prefersReduced ? 1 : 0.95, y: prefersReduced ? 0 : 10 }}
            transition={{ type: "spring", bounce: 0.3, duration: prefersReduced ? 0.2 : 0.4 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-large overflow-hidden border-2 border-[#F2C9D5] flex flex-col max-h-[90vh]"
          >
            {title && (
              <div className="px-6 py-4 border-b border-[#F2C9D5] flex items-center justify-between">
                <h2 className="font-display text-xl text-[#C91F5A]">{title}</h2>
                {!hideCloseButton && (
                  <button
                    onClick={onClose}
                    className="p-2 -mr-2 rounded-full text-gray-500 hover:bg-[#FFE4EC] hover:text-[#C91F5A] transition-colors"
                    aria-label="Tutup modal"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            )}
            
            {!title && !hideCloseButton && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-500 hover:bg-[#FFE4EC] hover:text-[#C91F5A] shadow-sm transition-colors"
                aria-label="Tutup modal"
              >
                <X size={20} />
              </button>
            )}

            <div className="overflow-y-auto overflow-x-hidden p-6 hide-scrollbar flex-grow">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
