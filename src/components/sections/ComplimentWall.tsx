"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { compliments, Compliment } from "@/data/compliments";
import { useShuffledPool } from "@/hooks/useShuffledPool";
import { Button } from "@/components/ui/Button";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSafeStorage } from "@/hooks/useSafeStorage";
import { Heart, Sparkles, Plus, CheckCircle2, RotateCcw, Smile, Award, Flame } from "lucide-react";

interface FloatingParticle {
  id: number;
  x: number;
  y: number;
  emoji: string;
  rotation: number;
  scale: number;
}

export function ComplimentWall() {
  const [revealedIds, setRevealedIds] = useState<string[]>([]);
  const [agreedIdsRaw, setAgreedIds] = useSafeStorage("agreedCompliments", "[]");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [particles, setParticles] = useState<FloatingParticle[]>([]);
  const { getNext } = useShuffledPool(compliments);
  const prefersReduced = useReducedMotion();

  let agreedIds: string[] = [];
  try {
    agreedIds = JSON.parse(agreedIdsRaw);
  } catch (e) {
    agreedIds = [];
  }

  // Initialize with 6 random compliments on mount
  useEffect(() => {
    const initialReveals: string[] = [];
    for (let i = 0; i < 6; i++) {
      const next = getNext();
      if (next && !initialReveals.includes(next.id)) {
        initialReveals.push(next.id);
      }
    }
    setRevealedIds(initialReveals);
  }, [getNext]);

  const handleRevealMore = () => {
    const next = getNext();
    if (next && !revealedIds.includes(next.id)) {
      setRevealedIds(prev => [next.id, ...prev]);
    }
  };

  const handleRevealAll = () => {
    setRevealedIds(compliments.map(c => c.id));
  };

  const toggleAgree = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
    let nextAgreed: string[];
    if (agreedIds.includes(id)) {
      nextAgreed = agreedIds.filter(item => item !== id);
    } else {
      nextAgreed = [...agreedIds, id];
      spawnHeartBurst(e);
    }
    setAgreedIds(JSON.stringify(nextAgreed));
  };

  const spawnHeartBurst = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const emojis = ["💖", "✨", "💕", "🌸", "⭐", "🎉", "💗"];
    
    const newParticles: FloatingParticle[] = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      emoji: emojis[Math.floor(Math.random() * emojis.length)] || "💖",
      rotation: (Math.random() - 0.5) * 40,
      scale: 0.8 + Math.random() * 0.5
    }));

    setParticles(prev => [...prev, ...newParticles]);

    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 1400);
  }, [prefersReduced]);

  const visibleCompliments = compliments.filter(c => {
    const isRevealed = revealedIds.includes(c.id);
    if (!isRevealed) return false;
    if (activeCategory === "all") return true;
    return c.type === activeCategory;
  });

  const totalAgreed = agreedIds.length;

  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 bg-gradient-to-b from-[#FFF5F8] via-[#FFF0F4] to-[#FFF8FA] relative overflow-hidden select-none">
      
      {/* Background Ornaments */}
      <div className="absolute inset-0 bg-[radial-gradient(#FF6688_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.06] pointer-events-none" />
      <div className="absolute top-10 left-8 text-3xl opacity-20 animate-pulse pointer-events-none">💌</div>
      <div className="absolute bottom-12 right-8 text-3xl opacity-20 animate-bounce pointer-events-none">💖</div>

      <div className="max-w-6xl mx-auto relative z-10 space-y-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-3"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFE4EC] to-[#FFD8E4] border border-[#FFB8C9] text-[#C91F5A] px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-widest shadow-2xs">
            <Heart size={14} className="text-[#C91F5A] fill-[#C91F5A]" />
            <span>Candid Appreciation Wall</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#C91F5A] tracking-tight drop-shadow-2xs">
            hal-hal kecil tentang kamu
          </h2>

          <p className="text-[#8B717A] text-base md:text-lg max-w-lg mx-auto font-body leading-relaxed">
            Tekan kartu mana saja untuk menandai <span className="font-bold text-[#C91F5A]">"Setuju BGT! 💖"</span>.
          </p>

          {/* Agreed Hearts Progress Bar */}
          <div className="pt-2 flex justify-center">
            <div className="inline-flex items-center gap-2.5 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-[#FFC5D0] shadow-sm">
              <Sparkles size={15} className="text-amber-500" />
              <span className="text-xs sm:text-sm font-extrabold text-[#C91F5A]">
                Disetujui: {totalAgreed} / {compliments.length} Pujian Manis 💖
              </span>
            </div>
          </div>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {[
            { id: "all", label: "Semua Pujian", icon: Heart },
            { id: "character", label: "Karakter & Vibe", icon: Sparkles },
            { id: "habit", label: "Konyol & Gemes", icon: Smile },
            { id: "growth", label: "Perjalanan Hebat", icon: Award },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 border shadow-2xs ${
                  isActive
                    ? "bg-[#C91F5A] text-white border-[#C91F5A] shadow-sm scale-105"
                    : "bg-white text-[#8B717A] border-[#FFC5D0] hover:bg-[#FFE4EC] hover:text-[#C91F5A]"
                }`}
              >
                <Icon size={13} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Washi-Taped Polaroid Cards Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence>
            {visibleCompliments.map((compliment, index) => {
              const isAgreed = agreedIds.includes(compliment.id);

              return (
                <motion.div
                  key={compliment.id}
                  layout
                  initial={{ opacity: 0, scale: 0.85, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 260, damping: 22 }}
                  className="break-inside-avoid"
                >
                  <div
                    onClick={(e) => toggleAgree(compliment.id, e)}
                    className={`group relative rounded-[2rem] border-2 p-6 sm:p-7 cursor-pointer transition-all duration-300 overflow-hidden bg-gradient-to-br ${compliment.gradient} ${compliment.borderColor} shadow-md hover:shadow-xl hover:-translate-y-1.5 ${
                      isAgreed ? "ring-4 ring-[#FF5E83]/40 shadow-xl" : ""
                    }`}
                  >
                    {/* Top Decorative Washi Tape Accent */}
                    <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-5 ${compliment.tapeColor} rounded-xs shadow-2xs rotate-[-2deg] border border-white/40 pointer-events-none`} />

                    <div className="space-y-4 pt-2">
                      
                      {/* Category Badge & Emoji */}
                      <div className="flex justify-between items-center">
                        <span className={`text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border border-black/5 ${compliment.badgeBg} ${compliment.badgeText} flex items-center gap-1`}>
                          <span>{compliment.emoji}</span>
                          <span>{compliment.categoryLabel}</span>
                        </span>

                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 ${
                          isAgreed ? "bg-[#C91F5A] text-white shadow-sm" : "bg-white/80 text-[#8B717A]"
                        }`}>
                          <Heart size={16} fill={isAgreed ? "currentColor" : "none"} />
                        </div>
                      </div>

                      {/* Compliment Quote Text */}
                      <p className="font-handwriting text-2xl sm:text-3xl text-[#4A3038] leading-relaxed drop-shadow-2xs">
                        "{compliment.text}"
                      </p>

                      {/* Interactive Tap Footer & Permanent Stamp */}
                      <div className="flex items-center justify-between pt-2 border-t border-black/5">
                        <span className="text-[11px] font-medium text-[#8B717A] group-hover:text-[#C91F5A] transition-colors">
                          {isAgreed ? "Klik untuk batal" : "Klik jika kamu setuju ✨"}
                        </span>

                        {isAgreed && (
                          <motion.div
                            initial={{ scale: 0, rotate: -12 }}
                            animate={{ scale: 1, rotate: -6 }}
                            className="bg-white text-[#C91F5A] font-extrabold text-[10px] uppercase tracking-widest border-2 border-[#FF5E83] px-2.5 py-0.5 rounded-lg shadow-sm flex items-center gap-1"
                          >
                            <CheckCircle2 size={12} className="text-[#2F7D5C]" />
                            <span>SETUJU! 💖</span>
                          </motion.div>
                        )}
                      </div>

                    </div>

                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Bottom Actions Bar */}
        <div className="mt-12 flex justify-center items-center gap-3 flex-wrap">
          {revealedIds.length < compliments.length && (
            <>
              <Button onClick={handleRevealMore} variant="primary" size="lg" className="shadow-md">
                <Plus size={18} className="mr-1.5" />
                <span>Lempar Satu Pujian Lagi ✨</span>
              </Button>

              <Button onClick={handleRevealAll} variant="secondary" size="lg">
                <span>Buka Semua Pujian ({compliments.length}) 💌</span>
              </Button>
            </>
          )}

          {revealedIds.length === compliments.length && (
            <div className="text-center bg-white border border-[#FFC5D0] px-6 py-3 rounded-2xl shadow-sm space-y-1">
              <p className="text-sm font-bold text-[#C91F5A] flex items-center justify-center gap-1.5">
                <Sparkles size={16} /> Semua pujian manis sudah terbuka!
              </p>
              <p className="text-xs text-[#8B717A]">
                Terima kasih sudah menjadi sosok hebat untuk dirimu sendiri & orang sekitarmu! 💕
              </p>
            </div>
          )}
        </div>

      </div>

      {/* Floating Burst Particles on Agree Click */}
      {particles.map(p => (
        <motion.div
          key={p.id}
          initial={{ 
            x: p.x, 
            y: p.y, 
            scale: 0,
            rotate: p.rotation
          }}
          animate={{ 
            x: p.x + (Math.random() - 0.5) * 220, 
            y: p.y - 180 - Math.random() * 120, 
            scale: p.scale,
            rotate: p.rotation + (Math.random() * 360)
          }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="fixed z-[100] text-xl pointer-events-none select-none drop-shadow-md"
        >
          {p.emoji}
        </motion.div>
      ))}

    </section>
  );
}
