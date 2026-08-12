"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Heart, Sparkles } from "lucide-react";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { PhotoMemory } from "@/data/photos";
import { cn } from "@/lib/utils";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  photos: PhotoMemory[];
  initialIndex: number;
}

export function Lightbox({ isOpen, onClose, photos, initialIndex }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [likedPhotos, setLikedPhotos] = useState<Record<string, boolean>>({});
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number }[]>([]);
  const [showSwipeToast, setShowSwipeToast] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  
  useFocusTrap(containerRef, isOpen);

  // Sync index & trigger temporary toast on open
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setShowSwipeToast(true);
      
      // Auto-hide toast after 3 seconds
      const timer = setTimeout(() => {
        setShowSwipeToast(false);
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setShowSwipeToast(false);
    }
  }, [isOpen, initialIndex]);

  useEffect(() => {
    if (!isOpen) return;
    
    document.body.style.overflow = "hidden";
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, currentIndex]);

  const handlePrev = () => {
    setShowSwipeToast(false);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
  };

  const handleNext = () => {
    setShowSwipeToast(false);
    setCurrentIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
  };

  const currentPhoto = photos[currentIndex];

  const handleToggleLike = () => {
    if (!currentPhoto) return;
    const isNowLiked = !likedPhotos[currentPhoto.id];
    setLikedPhotos(prev => ({ ...prev, [currentPhoto.id]: isNowLiked }));

    if (isNowLiked) {
      const newId = Date.now();
      const randomX = Math.random() * 40 - 20;
      setFloatingHearts(prev => [...prev, { id: newId, x: randomX }]);
      setTimeout(() => {
        setFloatingHearts(prev => prev.filter(h => h.id !== newId));
      }, 1000);
    }
  };

  const [touchStart, setTouchStart] = useState<number | null>(null);
  
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0]?.clientX || null);
  };
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0]?.clientX;
    if (touchEnd == null) return;
    
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    setTouchStart(null);
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isLiked = currentPhoto ? !!likedPhotos[currentPhoto.id] : false;

  return createPortal(
    <AnimatePresence>
      {isOpen && currentPhoto && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.2 }}
            className="absolute inset-0"
            onClick={onClose}
          />
          
          <div 
            ref={containerRef}
            className="relative w-full h-full flex flex-col pointer-events-none z-10"
            role="dialog"
            aria-modal="true"
            aria-label={`Memori ${currentIndex + 1} dari ${photos.length}`}
          >
            {/* Top Bar */}
            <div className="w-full p-2 md:p-4 flex justify-between items-center z-20 pointer-events-auto">
              <div className="flex items-center gap-2 bg-white/10 text-white font-medium px-4 py-1.5 rounded-full backdrop-blur-md text-sm border border-white/20">
                <Sparkles size={14} className="text-[#FF758F]" />
                <span>Memori {currentIndex + 1} dari {photos.length}</span>
              </div>
              
              <button
                onClick={onClose}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 border border-white/20"
                aria-label="Tutup foto"
              >
                <X size={22} />
              </button>
            </div>

            {/* Temporary Mobile Swipe Toast Notification */}
            <AnimatePresence>
              {showSwipeToast && (
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-16 left-1/2 -translate-x-1/2 z-40 pointer-events-none md:hidden w-auto max-w-[90vw]"
                >
                  <div className="bg-black/80 text-white text-xs font-medium px-4 py-2 rounded-full shadow-xl backdrop-blur-md border border-white/20 flex items-center gap-1.5 whitespace-nowrap">
                    <span>👈</span>
                    <span>Geser untuk melihat memori lain</span>
                    <span>👉</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Content Area */}
            <div 
              className="flex-1 flex items-center justify-center p-2 md:p-6 w-full h-full pointer-events-auto"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {photos.length > 1 && (
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                  className="hidden md:flex absolute left-4 lg:left-8 z-30 w-12 h-12 bg-white/10 hover:bg-white/25 text-white rounded-full items-center justify-center backdrop-blur-md transition-all hover:scale-110 border border-white/20"
                  aria-label="Foto sebelumnya"
                >
                  <ChevronLeft size={28} />
                </button>
              )}
              
              <motion.div
                key={currentPhoto.id}
                initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: prefersReduced ? 1 : 0.95, y: -15 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative max-w-2xl w-full bg-white p-4 md:p-6 rounded-2xl shadow-2xl flex flex-col items-center max-h-[85vh] overflow-y-auto hide-scrollbar"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Washi Tape Header */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#FFE4EC] border border-[#FFC5D0] shadow-sm rotate-[-1deg] z-20 flex items-center justify-center gap-1 rounded-sm">
                  <span className="text-xs text-[#C91F5A] font-bold tracking-widest uppercase">
                    ✨ MEMORY SNAP ✨
                  </span>
                </div>

                {/* Photo Display */}
                <div className="relative w-full overflow-hidden rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center mt-2">
                  <Image
                    src={currentPhoto.src}
                    alt={currentPhoto.alt}
                    width={currentPhoto.width}
                    height={currentPhoto.height}
                    className="max-h-[55vh] w-auto h-auto object-contain rounded-lg"
                    sizes="(max-width: 768px) 95vw, 700px"
                    priority
                  />
                </div>

                {/* Caption & Controls */}
                <div className="mt-4 w-full flex flex-col items-center text-center">
                  <p className="font-handwriting text-2xl md:text-3xl text-[#4A3038] mb-3">
                    {currentPhoto.caption || "Momen spesial yang tak terlupakan."}
                  </p>
                  
                  <div className="w-full flex items-center justify-between pt-3 border-t border-gray-100 px-2">
                    <span className="text-xs text-[#8B717A] bg-[#FFF0F3] px-3 py-1 rounded-full font-medium">
                      📸 Azkia & Kakek
                    </span>

                    <div className="relative flex items-center gap-2">
                      <button
                        onClick={handleToggleLike}
                        className={cn(
                          "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300",
                          isLiked
                            ? "bg-[#FFE4EC] text-[#C91F5A] scale-105 shadow-sm"
                            : "bg-gray-100 text-gray-600 hover:bg-[#FFE4EC] hover:text-[#C91F5A]"
                        )}
                      >
                        <Heart size={16} className={cn(isLiked && "fill-[#C91F5A]")} />
                        <span>{isLiked ? "Suka banget!" : "Sukai"}</span>
                      </button>

                      {/* Floating Hearts */}
                      <AnimatePresence>
                        {floatingHearts.map(heart => (
                          <motion.div
                            key={heart.id}
                            initial={{ opacity: 1, y: 0, x: heart.x, scale: 0.8 }}
                            animate={{ opacity: 0, y: -50, scale: 1.5 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.9 }}
                            className="absolute bottom-8 left-1/2 pointer-events-none text-[#C91F5A]"
                          >
                            <Heart size={20} fill="#C91F5A" />
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </motion.div>

              {photos.length > 1 && (
                <button
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  className="hidden md:flex absolute right-4 lg:right-8 z-30 w-12 h-12 bg-white/10 hover:bg-white/25 text-white rounded-full items-center justify-center backdrop-blur-md transition-all hover:scale-110 border border-white/20"
                  aria-label="Foto selanjutnya"
                >
                  <ChevronRight size={28} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
