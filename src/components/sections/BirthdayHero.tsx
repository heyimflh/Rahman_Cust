"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Button } from "@/components/ui/Button";
import { profile } from "@/data/profile";
import { photos } from "@/data/photos";
import { BubuBear } from "@/components/mascots/BubuBear";
import { MimiBunny } from "@/components/mascots/MimiBunny";
import { PuffCloud } from "@/components/mascots/PuffCloud";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface BirthdayHeroProps {
  onStart: () => void;
}

interface ConfettiSpark {
  id: number;
  x: number;
  y: number;
  color: string;
}

export function BirthdayHero({ onStart }: BirthdayHeroProps) {
  const heroPhoto = photos.find(p => p.role === "hero") || photos[0];
  const prefersReduced = useReducedMotion();
  const [sparks, setSparks] = useState<ConfettiSpark[]>([]);

  const handleStartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Generate mini confetti sparks from button
    const rect = e.currentTarget.getBoundingClientRect();
    const colors = ["#FF5E83", "#FFD700", "#A8E6CF", "#B3C5FF", "#FFC2A8"];
    const newSparks: ConfettiSpark[] = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x: e.clientX - rect.left + (Math.random() * 40 - 20),
      y: e.clientY - rect.top + (Math.random() * 20 - 10),
      color: colors[i % colors.length] ?? "#FF5E83"
    }));
    setSparks(newSparks);

    setTimeout(() => {
      onStart();
    }, 300);
  };

  return (
    <section className="relative w-full min-h-[90vh] flex items-center pt-20 pb-12 md:pt-28 md:pb-20 overflow-hidden bg-gradient-to-b from-[#FFF3F6] via-[#FFECF3] to-[#FFF9FB] select-none">
      
      {/* Ambient Glowing Bokeh Background Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-16 -left-16 w-80 h-80 md:w-96 md:h-96 rounded-full bg-[#FFD6E3]/60 blur-3xl" />
        <div className="absolute top-1/3 right-0 w-72 h-72 md:w-96 md:h-96 rounded-full bg-[#FFE2EC]/70 blur-3xl" />
        <div className="absolute -bottom-16 left-1/3 w-80 h-80 md:w-96 md:h-96 rounded-full bg-[#FFD0E0]/60 blur-3xl" />
      </div>

      {/* Floating Birthday Sparkles & Flowers Background Layer */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div animate={{ y: [-6, 6, -6], opacity: [0.6, 1, 0.6] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-24 left-[6%] text-2xl">✨</motion.div>
        <motion.div animate={{ y: [6, -6, 6], opacity: [0.5, 0.9, 0.5] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/4 right-[10%] text-xl">🌸</motion.div>
        <motion.div animate={{ y: [-8, 8, -8], opacity: [0.5, 1, 0.5] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-36 left-[8%] text-2xl">💖</motion.div>
        <motion.div animate={{ y: [5, -5, 5], opacity: [0.6, 1, 0.6] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-20 right-[12%] text-2xl">⭐</motion.div>
        
        {/* Floating PuffCloud in Background Top Right */}
        <motion.div 
          animate={{ y: [0, 8, 0], x: [0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-16 right-16 hidden md:block opacity-85"
        >
          <PuffCloud state="idle" className="w-16 h-12 drop-shadow-sm" />
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-8 w-full z-10">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          
          {/* TEXT CONTENT COLUMN (LEFT ON DESKTOP) */}
          <div className="w-full md:w-[54%] flex flex-col items-center md:items-start text-center md:text-left order-1 md:order-none">
            <motion.div
              initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full flex flex-col items-center md:items-start"
            >
              {/* Cute Special Birthday Edition Badge */}
              <div className="inline-flex items-center gap-2 bg-[#FFE4EC] text-[#D03B5C] border border-[#F7C6D5] px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider shadow-sm mb-3">
                <span className="animate-spin text-xs">✨</span>
                <span>SPECIAL BIRTHDAY EDITION</span>
                <span className="animate-pulse text-xs">👑</span>
              </div>

              {/* Handwriting Warm Greeting */}
              <p className="font-handwriting text-xl sm:text-2xl md:text-3xl text-[#D03B5C] mb-1.5 leading-relaxed drop-shadow-sm">
                hai, {profile.displayName}—hari ini kamu yang jadi pemeran utama! ✨
              </p>
              
              {/* Main Heading with Gradient Name & Native Color Cake Emoji */}
              <h1 className="font-display text-[34px] sm:text-[44px] md:text-[58px] leading-[1.1] text-[#4A3038] mb-4 tracking-tight font-bold">
                selamat ulang tahun,<br />
                <span className="bg-gradient-to-r from-[#FF5E83] via-[#F7436B] to-[#C91F5A] bg-clip-text text-transparent">
                  {profile.displayName}!
                </span>{" "}
                <span className="inline-block align-middle not-italic text-3xl sm:text-4xl md:text-5xl animate-bounce">
                  🎂
                </span>
              </h1>

              {/* Clean Glassmorphism Description Card */}
              <div className="relative bg-white/75 backdrop-blur-md border border-[#F7C6D5] p-4 sm:p-5 rounded-2xl max-w-md mx-auto md:mx-0 mb-6 shadow-[0_4px_20px_rgba(247,90,126,0.06)] text-left">
                <div className="absolute -top-3 right-4 bg-gradient-to-r from-[#FF7B9B] to-[#F7436B] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                  <span>🎈</span>
                  <span>08 SEPTEMBER</span>
                </div>
                <p className="text-sm sm:text-base md:text-lg text-[#6E4F5A] leading-relaxed">
                  aku bikin satu dunia kecil yang isinya alasan kenapa{" "}
                  <span className="font-semibold text-[#D03B5C] bg-[#FFE4EC] px-2 py-0.5 rounded-md">
                    08 September
                  </span>{" "}
                  harus dirayakan seramai dan semanis kamu.
                </p>
              </div>
              
              {/* Action Button & Sub-note */}
              <div className="flex flex-col items-center md:items-start gap-2.5 relative">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  <Button 
                    onClick={handleStartClick} 
                    size="lg" 
                    className="relative rounded-full bg-gradient-to-r from-[#FF5E83] via-[#F7436B] to-[#E02E56] hover:from-[#F7436B] hover:to-[#C91F5A] text-white font-semibold text-base sm:text-lg px-8 py-3.5 shadow-[0_10px_25px_rgba(255,94,131,0.4)] hover:shadow-[0_14px_30px_rgba(255,94,131,0.55)] transition-all duration-300 flex items-center gap-2"
                  >
                    <span>mulai pestanya</span>
                    <span className="text-xl not-italic">🎁</span>
                  </Button>
                </motion.div>

                {/* Confetti Sparks on Click */}
                {sparks.map(s => (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 1, scale: 1, x: s.x, y: s.y }}
                    animate={{ opacity: 0, scale: 0, y: s.y - 40, x: s.x + (Math.random() * 30 - 15) }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute w-2.5 h-2.5 rounded-full pointer-events-none z-30"
                    style={{ backgroundColor: s.color }}
                  />
                ))}

                <p className="text-xs md:text-sm text-[#8B6E78] italic font-medium opacity-90 mt-1 flex items-center gap-1">
                  <span>pelan-pelan aja, nek. semua kejutan di sini nungguin kamu</span>
                  <span>🌸</span>
                </p>
              </div>

            </motion.div>
          </div>
          
          {/* VISUAL COLUMN (RIGHT ON DESKTOP - PHOTO FRAME + MASCOTS + BALLOONS) */}
          <div className="w-full md:w-[46%] flex justify-center md:justify-end order-2 md:order-none relative">
            <motion.div
              initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.9, rotate: prefersReduced ? 0 : -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, delay: prefersReduced ? 0 : 0.2, ease: "easeOut" }}
              className="relative"
            >
              {/* 3D Pastel Balloon Cluster Floating beside Photo Frame (Moved further left to avoid badge overlap) */}
              <motion.div 
                animate={{ y: [-6, 6, -6], rotate: [-3, 3, -3] }} 
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-20 top-4 pointer-events-none z-10 hidden sm:block opacity-90"
              >
                <svg viewBox="0 0 90 120" className="w-20 h-28 drop-shadow-md">
                  <path d="M 35 75 Q 30 100 40 120" stroke="#F5A3B7" strokeWidth="1.5" fill="none" />
                  <path d="M 55 75 Q 60 100 50 120" stroke="#F5A3B7" strokeWidth="1.5" fill="none" />
                  <ellipse cx="35" cy="45" rx="22" ry="27" fill="url(#heroPinkB)" />
                  <ellipse cx="28" cy="32" rx="6" ry="10" fill="#FFFFFF" fillOpacity="0.4" transform="rotate(-20 38 32)" />
                  <ellipse cx="55" cy="50" rx="20" ry="25" fill="url(#heroGoldB)" />
                  <ellipse cx="49" cy="38" rx="5" ry="9" fill="#FFFFFF" fillOpacity="0.4" transform="rotate(-20 49 38)" />
                  <defs>
                    <radialGradient id="heroPinkB" cx="40%" cy="30%" r="70%">
                      <stop offset="0%" stopColor="#FF9EB5" />
                      <stop offset="100%" stopColor="#F7436B" />
                    </radialGradient>
                    <radialGradient id="heroGoldB" cx="40%" cy="30%" r="70%">
                      <stop offset="0%" stopColor="#FFE082" />
                      <stop offset="100%" stopColor="#FFB300" />
                    </radialGradient>
                  </defs>
                </svg>
              </motion.div>

              {/* Mascot 1: Bubu Bear Peeking cleanly from Top Right */}
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-12 -right-3 z-30 sm:-top-14 sm:-right-8 pointer-events-none"
              >
                <BubuBear state="excited" className="w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 drop-shadow-xl" />
              </motion.div>

              {/* Mascot 2: Mimi Bunny Sitting at Bottom Left */}
              <motion.div 
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-5 -left-4 sm:-left-6 z-30 pointer-events-none"
              >
                <MimiBunny state="excited" className="w-13 h-16 sm:w-16 sm:h-20 drop-shadow-xl" />
              </motion.div>

              {/* Corner Ribbon Sticker Badge on Photo Frame (Clean positioning without overlap) */}
              <div className="absolute -top-4 -left-2 sm:-left-4 z-30 bg-gradient-to-r from-[#FF7B9B] to-[#F7436B] text-white text-[11px] sm:text-xs font-bold px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full shadow-md flex items-center gap-1.5 rotate-[-6deg] border border-white/80">
                <span>🎀</span>
                <span>Main Character</span>
              </div>

              {heroPhoto && (
                <PhotoFrame
                  src={heroPhoto.src}
                  alt={heroPhoto.alt}
                  width={heroPhoto.width}
                  height={heroPhoto.height}
                  caption={heroPhoto.caption}
                  rotate={heroPhoto.rotate}
                  tape={heroPhoto.tape}
                  priority={true}
                  className="max-w-[280px] sm:max-w-[320px] md:max-w-[360px] shadow-[0_15px_35px_rgba(240,76,116,0.2)] border-4 border-white rounded-2xl"
                />
              )}
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

