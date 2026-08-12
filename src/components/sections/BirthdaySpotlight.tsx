"use client";

import React from "react";
import { motion } from "motion/react";
import { photos } from "@/data/photos";
import Image from "next/image";
import { MimiBunny } from "@/components/mascots/MimiBunny";

export function BirthdaySpotlight() {
  const spotlightPhoto = photos.find(p => p.role === "spotlight-cover");
  
  const spotlights = [
    {
      num: "01",
      icon: "🌸",
      title: "HARI INI, 19 TAHUN LALU...",
      text: "lahir satu manusia yang selalu tahu cara bikin suasana jadi lebih hidup."
    },
    {
      num: "02",
      icon: "💕",
      title: "DAN SEKARANG DIA...",
      text: "berhasil ngelewatin banyak hari yang nggak selalu gampang \u2014 dan tetep jadi Azkia yang sama serunya."
    },
    {
      num: "03",
      icon: "👑",
      title: "JADI, DIA PANTAS DAPAT...",
      text: "umur baru yang lebih ramah, dan lebih banyak alasan buat ketawa lepas."
    }
  ];

  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-[#FFF5F8] via-[#FFEBF2] to-[#FFF9FB] relative overflow-hidden select-none">
      
      {/* Background Sparkles & Ambient Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 -left-12 w-80 h-80 rounded-full bg-[#FFD6E3]/50 blur-3xl" />
        <div className="absolute bottom-10 right-0 w-80 h-80 rounded-full bg-[#FFE2EC]/60 blur-3xl" />
        
        <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-12 right-[8%] text-2xl">✨</motion.div>
        <motion.div animate={{ y: [6, -6, 6] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-20 left-[6%] text-xl">🌸</motion.div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-center">
          
          {/* Left: Aesthetic Photo Frame with Tape & Mascot */}
          {spotlightPhoto && (
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="w-full sm:w-9/12 md:w-8/12 lg:w-5/12 relative group"
            >
              {/* Photo Frame Container */}
              <div className="relative bg-white p-3.5 sm:p-4 rounded-2xl shadow-[0_16px_40px_rgba(240,76,116,0.18)] border-4 border-white transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                
                {/* Washi Tape on Top Left (Separated from badge to avoid overlap) */}
                <div className="absolute -top-3 left-6 sm:left-8 w-24 sm:w-28 h-5.5 sm:h-6 bg-[#FF7B9B]/90 backdrop-blur-sm shadow-sm rotate-[-2deg] z-20 flex items-center justify-center text-[9px] sm:text-[10px] font-bold text-white tracking-widest uppercase rounded-sm border border-white/60">
                  <span>✨ AZKIA ✨</span>
                </div>

                {/* Corner Sticker Badge on Top Right */}
                <div className="absolute -top-3.5 -right-2 sm:-right-3 z-30 bg-gradient-to-r from-[#FF7B9B] to-[#F7436B] text-white text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-md flex items-center gap-1 border border-white/80 rotate-[3deg]">
                  <span>👑</span>
                  <span>Ratu Sehari Ini 👑</span>
                </div>

                {/* Photo Image */}
                <div className="aspect-[3/4] relative rounded-xl overflow-hidden bg-gray-100">
                  <Image
                    src={spotlightPhoto.src}
                    alt={spotlightPhoto.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />
                </div>

                {/* Caption below photo */}
                <div className="mt-3.5 text-center">
                  <p className="font-handwriting text-xl sm:text-2xl text-[#4A3038] font-normal">
                    {spotlightPhoto.caption}
                  </p>
                </div>
              </div>

              {/* Mascot: Mimi Bunny Sitting at Bottom Corner */}
              <motion.div 
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-5 -right-4 z-30 pointer-events-none"
              >
                <MimiBunny state="excited" className="w-14 h-18 sm:w-16 sm:h-20 drop-shadow-xl" />
              </motion.div>

            </motion.div>
          )}

          {/* Right: The Spotlight Cards Column */}
          <div className="w-full lg:w-7/12 space-y-4 sm:space-y-5">
            {spotlights.map((spot, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                {/* Styled Decorative Card */}
                <div className="relative bg-white/90 backdrop-blur-md p-5 sm:p-7 rounded-2xl border border-[#F7C6D5] shadow-[0_6px_25px_rgba(247,90,126,0.08)] hover:border-[#FF5E83] hover:shadow-[0_10px_30px_rgba(247,90,126,0.15)] transition-all duration-300 transform hover:-translate-y-1 group">
                  
                  {/* Top Badge Row */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#D03B5C] bg-[#FFE4EC] px-3 py-1 rounded-full uppercase tracking-wider">
                      <span>{spot.icon}</span>
                      <span>{spot.title}</span>
                    </span>
                    <span className="font-display text-xs font-bold text-[#D03B5C]/60 bg-[#FFF0F4] px-2 py-0.5 rounded-md">
                      #{spot.num}
                    </span>
                  </div>

                  {/* Main Text */}
                  <p className="font-display text-xl sm:text-2xl md:text-3xl text-[#4A3038] leading-snug group-hover:text-[#D03B5C] transition-colors font-bold pt-1">
                    {spot.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

