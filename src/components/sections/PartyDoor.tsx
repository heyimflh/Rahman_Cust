"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/Button";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSafeStorage } from "@/hooks/useSafeStorage";
import { BubuBear } from "@/components/mascots/BubuBear";
import { MimiBunny } from "@/components/mascots/MimiBunny";
import { PuffCloud } from "@/components/mascots/PuffCloud";

interface PartyDoorProps {
  onEnter: () => void;
}

export function PartyDoor({ onEnter }: PartyDoorProps) {
  const [hasEnteredParty, setHasEnteredParty] = useSafeStorage("hasEnteredParty", "false");
  const prefersReduced = useReducedMotion();
  
  const [isOpening, setIsOpening] = useState(false);
  const [isKnobTurned, setIsKnobTurned] = useState(false);
  const [showLightSeam, setShowLightSeam] = useState(false);
  const [showGate, setShowGate] = useState(true);

  useEffect(() => {
    if (showGate) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showGate]);

  const handleEnter = () => {
    if (isOpening) return;
    
    // Step 1: Turn knob & unlatch
    setIsKnobTurned(true);

    // Step 2: Light seam crack appears
    setTimeout(() => {
      setShowLightSeam(true);
    }, prefersReduced ? 0 : 150);

    // Step 3: Door leaf swings open 3D
    setTimeout(() => {
      setIsOpening(true);
      setHasEnteredParty("true");
    }, prefersReduced ? 0 : 350);

    // Step 4: Transition into birthday party site
    setTimeout(() => {
      setShowGate(false);
      onEnter();
    }, prefersReduced ? 300 : 1800);
  };

  const handleSkip = () => {
    setHasEnteredParty("true");
    setShowGate(false);
    onEnter();
  };

  if (!showGate && !isOpening) return null;

  return (
    <AnimatePresence>
      {showGate && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReduced ? 0.3 : 0.7, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] h-[100dvh] w-screen flex flex-col items-center justify-between py-3 md:py-5 px-4 bg-gradient-to-b from-[#FFF3F6] via-[#FFECF3] to-[#FCD9E5] overflow-hidden select-none"
        >
          {/* Ambient Background Glowing Bokeh Orbs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <div className="absolute -top-10 -left-10 w-72 h-72 md:w-96 md:h-96 rounded-full bg-[#FFD6E3]/60 blur-3xl" />
            <div className="absolute top-1/3 -right-10 w-64 h-64 md:w-80 md:h-80 rounded-full bg-[#FFEBF2]/70 blur-3xl" />
            <div className="absolute -bottom-10 left-1/4 w-80 h-80 md:w-96 md:h-96 rounded-full bg-[#FFD0E0]/60 blur-3xl" />
          </div>

          {/* Festive Birthday Garland / Bunting across top (Dangles daintily at top header) */}
          <div className="w-full max-w-lg mx-auto flex justify-center pointer-events-none z-10 shrink-0 opacity-95">
            <svg viewBox="0 0 1000 70" fill="none" className="w-full h-10 sm:h-14 md:h-16 drop-shadow-sm">
              {/* String */}
              <path d="M 0 12 Q 250 50 500 20 Q 750 50 1000 12" stroke="#F28DA8" strokeWidth="2.5" strokeDasharray="6 4" fill="none" />
              
              {/* Pennant Flags */}
              <polygon points="60,18 90,22 75,55" fill="#FF6B8B" />
              <polygon points="140,28 170,30 155,62" fill="#FFB798" />
              <polygon points="220,34 250,35 235,68" fill="#FFD166" />
              <polygon points="300,35 330,34 315,68" fill="#06D6A0" />
              <polygon points="380,32 410,29 395,62" fill="#118AB2" />
              <polygon points="460,25 490,22 475,55" fill="#D883FF" />
              
              <polygon points="540,22 570,25 555,55" fill="#FF6B8B" />
              <polygon points="620,29 650,32 635,62" fill="#FFB798" />
              <polygon points="700,34 730,35 715,68" fill="#FFD166" />
              <polygon points="780,35 810,34 795,68" fill="#06D6A0" />
              <polygon points="860,30 890,28 875,62" fill="#118AB2" />
              <polygon points="940,22 970,18 955,55" fill="#D883FF" />
            </svg>
          </div>

          {/* Confetti & Sparkles Floating Ambient Layer */}
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            <motion.div animate={{ y: [-4, 4, -4], opacity: [0.7, 1, 0.7] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-16 left-[8%] sm:left-[14%] text-xl sm:text-2xl">✨</motion.div>
            <motion.div animate={{ y: [5, -5, 5], opacity: [0.6, 1, 0.6] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/4 right-[8%] sm:right-[12%] text-lg sm:text-xl">🌸</motion.div>
            <motion.div animate={{ y: [-6, 6, -6], opacity: [0.5, 0.9, 0.5] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-36 left-[10%] text-lg sm:text-xl">💖</motion.div>
            <motion.div animate={{ y: [4, -4, 4], opacity: [0.7, 1, 0.7] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-24 right-[10%] text-xl sm:text-2xl">⭐</motion.div>
          </div>

          {/* 3D Pastel Balloon Clusters on Desktop */}
          <motion.div 
            animate={{ y: [-4, 6, -4], rotate: [-2, 2, -2] }} 
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-2 lg:left-12 top-1/4 pointer-events-none hidden lg:block z-10"
          >
            <svg viewBox="0 0 100 140" className="w-20 h-32 lg:w-24 lg:h-36 drop-shadow-lg">
              <path d="M 40 85 Q 35 110 45 135" stroke="#F5A3B7" strokeWidth="1.5" fill="none" />
              <path d="M 60 85 Q 65 110 55 135" stroke="#F5A3B7" strokeWidth="1.5" fill="none" />
              <ellipse cx="40" cy="50" rx="26" ry="32" fill="url(#balloonPink)" />
              <ellipse cx="32" cy="35" rx="7" ry="12" fill="#FFFFFF" fillOpacity="0.4" transform="rotate(-20 32 35)" />
              <ellipse cx="62" cy="55" rx="24" ry="29" fill="url(#balloonGold)" />
              <ellipse cx="55" cy="42" rx="6" ry="10" fill="#FFFFFF" fillOpacity="0.4" transform="rotate(-20 55 42)" />
              <defs>
                <radialGradient id="balloonPink" cx="40%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#FF9EB5" />
                  <stop offset="100%" stopColor="#F7436B" />
                </radialGradient>
                <radialGradient id="balloonGold" cx="40%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#FFE082" />
                  <stop offset="100%" stopColor="#FFB300" />
                </radialGradient>
              </defs>
            </svg>
          </motion.div>

          <motion.div 
            animate={{ y: [5, -5, 5], rotate: [2, -2, 2] }} 
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-2 lg:right-12 top-1/4 pointer-events-none hidden lg:block z-10"
          >
            <svg viewBox="0 0 100 140" className="w-20 h-32 lg:w-24 lg:h-36 drop-shadow-lg">
              <path d="M 45 85 Q 50 110 40 135" stroke="#90E0EF" strokeWidth="1.5" fill="none" />
              <path d="M 65 85 Q 55 110 60 135" stroke="#F5A3B7" strokeWidth="1.5" fill="none" />
              <ellipse cx="42" cy="52" rx="25" ry="30" fill="url(#balloonMint)" />
              <ellipse cx="34" cy="38" rx="6" ry="11" fill="#FFFFFF" fillOpacity="0.4" transform="rotate(-20 34 38)" />
              <ellipse cx="64" cy="48" rx="23" ry="28" fill="url(#balloonRose)" />
              <ellipse cx="57" cy="35" rx="6" ry="10" fill="#FFFFFF" fillOpacity="0.4" transform="rotate(-20 57 35)" />
              <defs>
                <radialGradient id="balloonMint" cx="40%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#B9FBC0" />
                  <stop offset="100%" stopColor="#52B788" />
                </radialGradient>
                <radialGradient id="balloonRose" cx="40%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#FFCCD5" />
                  <stop offset="100%" stopColor="#FB6F92" />
                </radialGradient>
              </defs>
            </svg>
          </motion.div>

          {/* MAIN PARTY DOOR SCENE WRAPPER (Fits 100% into 1 single page height!) */}
          <div className="relative w-full max-w-sm sm:max-w-md px-2 my-auto flex flex-col items-center z-20 shrink-0">
            
            {/* Mascot: Bubu Bear (Positioned on upper-left side of door - Well below garland!) */}
            <motion.div 
              animate={isOpening ? { y: 20, opacity: 0 } : { y: [0, -5, 0] }}
              transition={isOpening ? { duration: 0.4 } : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-8 sm:top-10 left-0 sm:-left-3 lg:-left-6 z-30 pointer-events-none"
            >
              <BubuBear state={isOpening ? "excited" : "idle"} className="w-13 h-13 sm:w-16 sm:h-16 md:w-18 md:h-18 drop-shadow-xl" />
            </motion.div>

            {/* Mascot: Puff Cloud (Positioned on upper-right curve of door frame - Below garland!) */}
            <motion.div 
              animate={isOpening ? { y: -20, opacity: 0 } : { y: [0, 5, 0] }}
              transition={isOpening ? { duration: 0.4 } : { duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-3 right-4 sm:right-6 z-10 pointer-events-none"
            >
              <PuffCloud state={isOpening ? "surprised" : "idle"} className="w-13 h-9 sm:w-15 sm:h-11 md:w-18 md:h-13 drop-shadow-lg opacity-95" />
            </motion.div>

            {/* Mascot: Mimi Bunny (Positioned on lower-right side of door frame) */}
            <motion.div 
              animate={isOpening ? { y: 20, opacity: 0 } : { y: [0, -6, 0] }}
              transition={isOpening ? { duration: 0.4, delay: 0.1 } : { duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-28 sm:top-32 right-0 sm:-right-3 lg:-right-6 z-30 pointer-events-none"
            >
              <MimiBunny state={isOpening ? "excited" : "idle"} className="w-13 h-16 sm:w-16 sm:h-20 md:w-18 md:h-22 drop-shadow-xl" />
            </motion.div>

            {/* 3D PERSPECTIVE DOOR SCENE */}
            <motion.div 
              animate={{ scale: isOpening ? [1, 1.05, 1.25] : 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="relative my-2 sm:my-3 perspective-[1200px] flex justify-center items-center"
            >
              {/* Outer Door Frame Container */}
              <div className="relative w-44 h-68 sm:w-52 sm:h-76 md:w-56 md:h-80 rounded-t-[100px] bg-gradient-to-b from-[#F04C74] via-[#E83C66] to-[#D92B54] p-2.5 sm:p-3 shadow-[0_18px_40px_rgba(240,76,116,0.35)] border-t border-l border-white/40 border-r-4 border-b-4 border-[#A3183B]/50 flex items-center justify-center">
                
                {/* Door Jamb Inner Stop Rim */}
                <div className="absolute inset-1.5 rounded-t-[92px] border border-[#C72449]/40 pointer-events-none z-10" />

                {/* Doorway Interior / Room Behind Door (Revealed when opened) */}
                <div className="relative w-full h-full rounded-t-[88px] bg-gradient-to-tr from-[#FF9A8B] via-[#FF6A88] to-[#FF99AC] overflow-hidden flex flex-col items-center justify-center shadow-inner">
                  {/* Warm Glowing Room Light & Party Sparkles */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#FFF9C4_0%,_#FF80AB_60%,_#C2185B_100%)] opacity-95 animate-pulse" />
                  
                  {/* Party Streamers / Birthday Room Decor inside */}
                  <div className="relative z-10 flex flex-col items-center gap-1">
                    <div className="text-2xl animate-bounce">🎂</div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-white drop-shadow-md tracking-wider">AZKIA!</div>
                    <div className="text-xs font-semibold text-white/90 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">SELAMAT ULANG TAHUN</div>
                  </div>

                  {/* Radiating Light Beam & Party Flare during opening */}
                  {isOpening && !prefersReduced && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.3 }}
                      animate={{ opacity: 1, scale: 30 }}
                      transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                      className="absolute inset-0 bg-gradient-to-r from-[#FFF59D] via-white to-[#FF80AB] rounded-full z-40 pointer-events-none"
                    />
                  )}
                </div>

                {/* 3D REALISTIC SWINGING DOOR PANEL LEAF */}
                <motion.div
                  initial={false}
                  animate={{
                    rotateY: isOpening ? (prefersReduced ? 0 : -118) : 0,
                    scale: isKnobTurned && !isOpening ? 0.98 : 1,
                  }}
                  transition={{
                    rotateY: { duration: 1.05, ease: [0.25, 1, 0.5, 1] },
                    scale: { duration: 0.15 }
                  }}
                  style={{ transformOrigin: "left center", transformStyle: "preserve-3d" }}
                  className="absolute inset-2 sm:inset-2.5 rounded-t-[88px] bg-gradient-to-b from-[#FFFDFE] via-[#FFF5F8] to-[#FFECF3] border-2 border-[#F9CAD6] shadow-[3px_0_18px_rgba(0,0,0,0.12)] flex flex-col items-center pt-6 sm:pt-7 pb-3.5 justify-between z-20 backface-visible"
                >
                  {/* Inner Edge Bevel */}
                  <div className="absolute inset-1 rounded-t-[82px] border border-white/90 pointer-events-none" />

                  {/* Light seam glow effect on edge when unlatching */}
                  {showLightSeam && !isOpening && (
                    <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FFF59D] via-[#FFD54F] to-[#FF80AB] shadow-[0_0_15px_#FFD54F] z-30 animate-pulse" />
                  )}

                  {/* TOP INSET PANEL (WITH HEART WINDOW) */}
                  <div className="w-28 h-22 sm:w-36 sm:h-26 md:w-40 md:h-28 rounded-t-[60px] rounded-b-2xl border border-[#F5C2D1] bg-[#FFF0F4] shadow-[inset_0_3px_8px_rgba(240,76,116,0.12)] flex items-center justify-center relative overflow-hidden">
                    <div className="absolute top-2 left-3 right-3 h-px bg-white/80" />
                    
                    {/* Glowing Heart Icon */}
                    <motion.div 
                      animate={{ scale: [1, 1.08, 1] }} 
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="text-2xl sm:text-3xl md:text-4xl drop-shadow-[0_4px_10px_rgba(240,76,116,0.3)]"
                    >
                      💖
                    </motion.div>
                  </div>

                  {/* BOTTOM INSET PANEL */}
                  <div className="w-28 h-24 sm:w-36 sm:h-28 md:w-40 md:h-30 rounded-2xl border border-[#F5C2D1] bg-[#FFF0F4] shadow-[inset_0_3px_8px_rgba(240,76,116,0.12)] relative overflow-hidden">
                    <div className="absolute top-2 left-3 right-3 h-px bg-white/80" />
                  </div>

                  {/* REALISTIC 3D DOOR KNOB & KEYHOLE */}
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
                    {/* Keyhole Plate */}
                    <div className="w-4 h-8 sm:w-4.5 sm:h-8.5 rounded-full bg-gradient-to-b from-[#FFE082] via-[#FFC107] to-[#FFA000] border border-[#FF8F00] shadow-[0_2px_6px_rgba(0,0,0,0.18)] flex flex-col items-center justify-center p-0.5 relative">
                      
                      {/* Metallic Knob */}
                      <motion.div 
                        animate={{ rotate: isKnobTurned ? 35 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-gradient-to-tr from-[#FF8F00] via-[#FFD54F] to-[#FFF9C4] border border-[#FF6F00] shadow-md flex items-center justify-center relative"
                      >
                        <div className="w-1 h-1 rounded-full bg-white opacity-90 absolute top-0.5 left-0.5" />
                      </motion.div>

                      {/* Keyhole Slot */}
                      <div className="w-0.5 h-1.5 bg-[#4E2700] rounded-t-full mt-0.5 opacity-80" />
                    </div>
                  </div>

                </motion.div>
              </div>

              {/* Floor Shadow Under Door */}
              <div className="absolute -bottom-3 w-48 sm:w-56 md:w-60 h-4.5 rounded-[100%] bg-black/15 blur-md pointer-events-none -z-10" />
            </motion.div>

            {/* COPYWRITING (Customized for Azkia's Birthday Party Theme!) */}
            <motion.div
              animate={{ opacity: isOpening ? 0 : 1, y: isOpening ? 10 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-center space-y-1 mt-1 sm:mt-2 z-10 px-2"
            >
              <h2 className="font-handwriting text-2xl sm:text-3xl text-[#D03B5C] tracking-wide leading-snug drop-shadow-sm font-normal">
                sstt… ada pintu rahasia menuju pesta ulang tahunmu! 🎉
              </h2>
              <p className="text-[#8B6E78] text-xs sm:text-sm font-normal max-w-xs mx-auto leading-relaxed">
                tamu kehormatannya cuma satu: kamu yang paling spesial hari ini, Azkia.
              </p>
            </motion.div>

            {/* BUTTON ACTION CTAs */}
            <motion.div
              animate={{ opacity: isOpening ? 0 : 1, y: isOpening ? 10 : 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="mt-3 sm:mt-4 flex flex-col items-center gap-1.5 w-full max-w-xs z-10 shrink-0"
            >
              <Button 
                onClick={handleEnter} 
                size="lg" 
                disabled={isOpening}
                className="w-full rounded-full bg-gradient-to-r from-[#FF5E83] to-[#F7436B] hover:from-[#F7436B] hover:to-[#E02E56] text-white font-semibold text-sm sm:text-base py-2.5 sm:py-3 shadow-[0_10px_25px_rgba(255,94,131,0.45)] hover:shadow-[0_14px_30px_rgba(255,94,131,0.6)] transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98]"
              >
                buka pintu kejutannya! 🎂
              </Button>
              
              <Button 
                onClick={handleSkip} 
                variant="ghost" 
                size="sm" 
                disabled={isOpening}
                className="text-[#B58D9B] hover:text-[#D03B5C] hover:bg-transparent text-xs tracking-wider py-1 h-auto"
              >
                lewati
              </Button>
            </motion.div>

          </div>

          {/* Bottom Padding Spacer */}
          <div className="h-1 shrink-0 pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}


