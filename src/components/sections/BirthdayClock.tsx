"use client";

import React from "react";
import { motion } from "motion/react";
import { useBirthdayTiming } from "@/hooks/useBirthdayTiming";
import { profile } from "@/data/profile";
import { BubuBear } from "@/components/mascots/BubuBear";
import { PuffCloud } from "@/components/mascots/PuffCloud";

export function BirthdayClock() {
  const timing = useBirthdayTiming();

  if (!timing) {
    return <div className="min-h-[220px]" />; // Prevents layout shift while hydrating
  }

  return (
    <section className="py-12 md:py-20 px-4 relative select-none">
      <div className="max-w-3xl mx-auto relative">
        
        {/* Floating Sparkles Background */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-4 left-6 text-xl animate-bounce">✨</div>
          <div className="absolute top-1/2 -right-4 text-2xl animate-pulse">💖</div>
          <div className="absolute -bottom-4 left-1/4 text-xl">🌸</div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          {/* Aesthetic Card Container */}
          <div className="relative bg-gradient-to-br from-white/90 via-[#FFF0F4]/90 to-[#FFE4EC]/90 backdrop-blur-md rounded-3xl border border-[#F7C6D5] p-6 sm:p-10 shadow-[0_12px_40px_rgba(247,90,126,0.12)] text-center pt-8 sm:pt-11">
            
            {/* Top Washi Tape Accent (Slim & Sleek) */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FF7B9B] to-[#F7436B] text-white text-[9px] sm:text-[10px] font-bold px-3 py-0.5 rounded-full shadow-sm flex items-center gap-1.5 z-20 border border-white/60 tracking-wider whitespace-nowrap">
              <span>⏳</span>
              <span>BIRTHDAY COUNTDOWN & MILESTONE</span>
              <span>✨</span>
            </div>

            {/* Mascots Peeking */}
            <div className="absolute -top-4 left-4 hidden sm:block pointer-events-none opacity-90">
              <PuffCloud state="idle" className="w-14 h-10 drop-shadow-sm" />
            </div>
            <div className="absolute -top-4 right-4 hidden sm:block pointer-events-none opacity-90">
              <BubuBear state="idle" className="w-12 h-12 drop-shadow-sm" />
            </div>

            {/* CONTENT RENDER */}
            {timing.isBirthday ? (
              <div className="space-y-5 pt-2">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFD8C8] text-[#C91F5A] rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase shadow-sm">
                  <span>🎉</span>
                  <span>HARI INI HARIMU!</span>
                  <span>🎂</span>
                </div>

                <h2 className="font-display text-3xl sm:text-5xl text-[#C91F5A] font-bold tracking-tight">
                  LEVEL {timing.age} UNLOCKED 👑
                </h2>

                <div className="bg-white/80 p-4 sm:p-5 rounded-2xl border border-[#F2C9D5] max-w-md mx-auto shadow-sm">
                  <p className="text-base sm:text-xl font-medium text-[#4A3038] flex items-center justify-center gap-2">
                    <span>💕</span>
                    <span>{timing.daysSinceFirstMet} hari sejak pertama ketemu</span>
                  </p>
                  {timing.daysUntilMeetAnniversary === 1 && (
                    <p className="text-xs sm:text-sm text-[#8B717A] mt-2">
                      besok genap satu tahun sejak {profile.firstMetDate.split('-').reverse().join('-')}.
                    </p>
                  )}
                </div>
              </div>
            ) : timing.isPastBirthday ? (
              <div className="space-y-4 pt-2">
                <h2 className="font-display text-2xl sm:text-4xl text-[#C91F5A] font-bold">
                  LEVEL {timing.age} UNLOCKED 👑
                </h2>
                <p className="text-base sm:text-lg text-[#4A3038]">
                  pestanya boleh lewat, tapi kamu tetap boleh dirayakan setiap hari! 🌸
                </p>
              </div>
            ) : (
              /* Countdown State */
              <div className="space-y-5 pt-2">
                {/* Header Title */}
                <div className="space-y-1.5">
                  <span className="text-xs font-bold tracking-widest text-[#D03B5C] uppercase bg-[#FFE4EC] px-3 py-1 rounded-full">
                    NEXT LEVEL UNLOCK IN PROGRESS 🚀
                  </span>
                  <h2 className="font-display text-2xl sm:text-4xl text-[#4A3038] font-bold pt-2.5">
                    sebentar lagi level baru terbuka!{" "}
                    <span className="inline-block align-middle not-italic text-2xl sm:text-3xl animate-bounce">
                      🎁
                    </span>
                  </h2>
                </div>

                {/* Styled 3D Level Countdown Cards */}
                <div className="flex items-center justify-center gap-4 sm:gap-6 pt-2 pb-1">
                  {/* Days Card */}
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-tr from-[#FFFDFE] to-[#FFF0F4] rounded-2xl border-2 border-[#F7CAD7] shadow-[0_6px_20px_rgba(247,90,126,0.12)] flex flex-col items-center justify-center transform hover:scale-105 transition-transform">
                      <span className="font-display text-3xl sm:text-4xl font-bold text-[#D03B5C]">
                        {timing.daysUntilBirthday}
                      </span>
                    </div>
                    <span className="text-xs text-[#8B717A] font-bold uppercase tracking-wider mt-2.5 flex items-center gap-1">
                      <span>🗓️</span> HARI LAGI
                    </span>
                  </div>

                  {/* Together Days Card */}
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-tr from-[#FFFDFE] to-[#FFF0F4] rounded-2xl border-2 border-[#F7CAD7] shadow-[0_6px_20px_rgba(247,90,126,0.12)] flex flex-col items-center justify-center transform hover:scale-105 transition-transform">
                      <span className="font-display text-3xl sm:text-4xl font-bold text-[#D03B5C]">
                        {timing.daysSinceFirstMet}
                      </span>
                    </div>
                    <span className="text-xs text-[#8B717A] font-bold uppercase tracking-wider mt-2.5 flex items-center gap-1">
                      <span>💕</span> HARI KITA
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#8B717A] italic font-medium max-w-sm mx-auto">
                  pelan-pelan aja, hitungan harinya terus bergerak mendekati hari paling manismu, Azkia! 🌸
                </p>
              </div>
            )}

          </div>
        </motion.div>
      </div>
    </section>
  );
}

