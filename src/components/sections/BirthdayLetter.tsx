"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { birthdayLetter } from "@/data/letter";
import { profile } from "@/data/profile";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { photos } from "@/data/photos";
import { useSafeStorage } from "@/hooks/useSafeStorage";
import {
  Mail,
  Heart,
  Sparkles,
  Lock,
  MessageCircle,
  Calendar,
  CheckCircle2,
  Bookmark,
  Feather,
  ChevronDown,
  Volume2,
  VolumeX,
  Star
} from "lucide-react";
import confetti from "canvas-confetti";

export function BirthdayLetter() {
  const decoPhoto = photos.find((p) => p.role === "letter-deco");
  const [unsealedRaw, setUnsealedRaw] = useSafeStorage("azkiaLetterUnsealed", "false");
  const [showPS, setShowPS] = useState(false);

  const isUnsealed = unsealedRaw === "true";

  const handleUnseal = () => {
    setUnsealedRaw("true");

    try {
      confetti({
        particleCount: 75,
        spread: 80,
        origin: { y: 0.65 }
      });
    } catch (e) {
      // Fallback
    }
  };

  return (
    <section className="py-24 md:py-36 px-4 sm:px-6 bg-gradient-to-b from-[#FFF5F8] via-[#FFEAF1] to-[#FFF5F8] relative overflow-hidden select-none">
      
      {/* Ambient Radial Soft Lighting Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-gradient-to-tr from-[#FF5E83]/10 via-[#FFD166]/15 to-[#9B51E0]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 space-y-10">

        {/* Section Header Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-3"
        >
          <div className="inline-flex items-center gap-2 bg-[#C91F5A]/10 border border-[#C91F5A]/25 text-[#C91F5A] px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-widest shadow-xs">
            <Feather size={14} className="text-[#C91F5A]" />
            <span>Surat Spesial Ulang Tahun</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#C91F5A] tracking-tight drop-shadow-xs">
            pesan manis untuk azkia
          </h2>

          <p className="text-[#8B717A] text-base md:text-lg max-w-lg mx-auto font-body leading-relaxed">
            Sebuah surat kecil bertinta hangat yang ditulis khusus untuk merayakan hadirmu. ✉️💖
          </p>
        </motion.div>

        {/* Outer Envelope / Unseal Interactive Container */}
        <div className="relative max-w-3xl mx-auto">

          {!isUnsealed ? (
            /* ================================================================
               SEALED ROMANTIC ENVELOPE (State: Locked / Tap to Unseal)
               ================================================================ */
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.01 }}
              onClick={handleUnseal}
              className="cursor-pointer bg-gradient-to-br from-[#FFF0F4] via-[#FFE4EC] to-[#FFD8E4] rounded-3xl p-8 sm:p-12 border-4 border-dashed border-pink-300 shadow-2xl text-center relative overflow-hidden space-y-6 group transition-all"
            >
              {/* Decorative Wax Seal Center Button */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full bg-gradient-to-tr from-[#C91F5A] via-[#FF5E83] to-[#FF809B] p-1.5 shadow-xl flex items-center justify-center relative group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full rounded-full border-2 border-dashed border-amber-200/80 flex flex-col items-center justify-center text-white space-y-0.5 bg-[#C91F5A]/90 backdrop-blur-xs shadow-inner">
                  <Heart size={28} className="fill-amber-300 text-amber-300 animate-pulse" />
                  <span className="font-display text-xs tracking-widest text-amber-200 uppercase font-black">AZKIA 19</span>
                </div>
                {/* Floating Gold Ring */}
                <div className="absolute inset-0 rounded-full border-2 border-amber-300 animate-ping opacity-25" />
              </div>

              <div className="space-y-2">
                <h3 className="font-display text-2xl sm:text-3xl text-[#C91F5A] font-bold">
                  Surat Rahasia Bertinta Emas 💌
                </h3>
                <p className="text-sm sm:text-base text-[#8B717A] max-w-md mx-auto">
                  Ada segel wax spesial yang menunggu untuk dibuka oleh Azkia. Klik atau tap segel di atas untuk membuka surat!
                </p>
              </div>

              <div className="inline-flex items-center gap-2 bg-[#C91F5A] text-white px-6 py-3 rounded-2xl font-extrabold text-sm shadow-md group-hover:bg-[#A81748] transition-colors">
                <Sparkles size={16} />
                <span>Buka Segel Surat Sekarang ✨</span>
              </div>
            </motion.div>
          ) : (
            /* ================================================================
               UNSEALED LUXURY JOURNAL PARCHMENT (State: Unsealed Letter)
               ================================================================ */
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
              className="relative bg-[#FFFBFC] p-7 sm:p-12 md:p-16 rounded-3xl shadow-2xl border-2 border-pink-200/90 text-left relative overflow-hidden space-y-8"
            >
              {/* Subtle Notebook Ruling Line Effect */}
              <div
                className="absolute inset-0 pointer-events-none opacity-25"
                style={{
                  backgroundImage: "repeating-linear-gradient(transparent, transparent 33px, #F2C9D5 33px, #F2C9D5 34px)",
                  backgroundPositionY: "20px"
                }}
              />

              {/* Decorative Top Washi Tape Accents */}
              <div className="absolute -top-3 left-12 w-28 h-7 bg-pink-200/70 border border-pink-300/60 rotate-[-4deg] rounded-sm shadow-xs backdrop-blur-xs pointer-events-none" />
              <div className="absolute -top-3 right-12 w-28 h-7 bg-amber-200/70 border border-amber-300/60 rotate-[3deg] rounded-sm shadow-xs backdrop-blur-xs pointer-events-none" />

              {/* Date Stamp & Photo Layout */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10 border-b-2 border-pink-100 pb-6">
                
                {/* Date Stamp Badge */}
                <div className="inline-flex items-center gap-2 bg-pink-50 border-2 border-[#C91F5A]/30 text-[#C91F5A] px-4 py-1.5 rounded-xl font-bold text-xs uppercase tracking-widest shadow-xs rotate-[-1deg]">
                  <Calendar size={15} />
                  <span>08 SEPTEMBER 2026</span>
                </div>

                {/* Decorative Photo Frame (Desktop View) */}
                {decoPhoto && (
                  <div className="hidden sm:block rotate-[4deg] hover:rotate-0 transition-transform duration-300">
                    <PhotoFrame
                      src={decoPhoto.src}
                      alt={decoPhoto.alt}
                      width={180}
                      height={135}
                      tape={true}
                      className="w-36 shadow-md"
                    />
                  </div>
                )}
              </div>

              {/* Letter Paragraphs with Beautiful Typography */}
              <div className="relative z-10 space-y-6 text-[#3D252C] text-base sm:text-lg md:text-xl leading-[2.1] font-body">
                {birthdayLetter.map((paragraph, index) => {
                  // Add subtle styling for first letter drop-cap
                  const isFirst = index === 0;

                  return (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="relative"
                    >
                      {isFirst ? (
                        <span>
                          <span className="font-display text-4xl sm:text-5xl text-[#C91F5A] font-extrabold float-left mr-2.5 leading-none">
                            {paragraph.charAt(0)}
                          </span>
                          {paragraph.slice(1)}
                        </span>
                      ) : (
                        paragraph
                      )}
                    </motion.p>
                  );
                })}

                {/* Decorative Photo Frame (Mobile View) */}
                {decoPhoto && (
                  <div className="sm:hidden pt-4 flex justify-center rotate-[-2deg]">
                    <PhotoFrame
                      src={decoPhoto.src}
                      alt={decoPhoto.alt}
                      width={180}
                      height={135}
                      tape={true}
                      className="w-44 shadow-md"
                    />
                  </div>
                )}

                {/* Signature Block */}
                <div className="pt-10 text-right space-y-2 border-t-2 border-pink-100/80 mt-10">
                  <p className="text-sm font-bold text-[#8B717A] italic">dengan penuh kehangatan,</p>
                  <p className="font-handwriting text-4xl sm:text-5xl text-[#C91F5A] rotate-[-4deg] inline-block font-bold">
                    {profile.senderName}
                  </p>
                </div>
              </div>

              {/* Interactive P.S. (Postscript Drawer) */}
              <div className="pt-6 relative z-10 border-t border-dashed border-pink-200">
                {!showPS ? (
                  <button
                    onClick={() => setShowPS(true)}
                    className="w-full py-3 bg-pink-50 hover:bg-pink-100 border border-pink-200 text-[#C91F5A] rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-xs"
                  >
                    <Bookmark size={16} className="text-[#C91F5A]" />
                    <span>💌 Buka P.S. (Catatan Rahasia Tambahan)</span>
                    <ChevronDown size={16} />
                  </button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="p-5 bg-gradient-to-r from-pink-100/90 via-rose-100/90 to-pink-100/90 rounded-2xl border-2 border-pink-300 text-left space-y-2 shadow-inner"
                  >
                    <div className="flex items-center justify-between text-xs font-extrabold text-[#C91F5A] uppercase tracking-wider">
                      <span className="flex items-center gap-1.5">
                        <Heart size={14} className="fill-[#C91F5A]" /> P.S. CATATAN TAMBAHAN
                      </span>
                      <button
                        onClick={() => setShowPS(false)}
                        className="text-pink-600 hover:text-pink-800 text-[11px] underline"
                      >
                        Tutup
                      </button>
                    </div>
                    <p className="font-handwriting text-xl sm:text-2xl text-[#4A3038] leading-relaxed italic">
                      "Jangan lupa untuk senyum hari ini yaa! Apapun yang kamu butuhkan, aku akan selalu ada di sini mendukungmu. Happy 19th Birthday, Azkia! ✨💖"
                    </p>
                  </motion.div>
                )}
              </div>

              {/* WhatsApp Reply Button */}
              <div className="pt-2 relative z-10 flex flex-col sm:flex-row justify-center gap-3">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent("Makasih banget buat surat manisnya yaa! 💖 Suratnya bikin senyum-senyum sendiri ✨")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 bg-gradient-to-r from-[#FF5E83] to-[#C91F5A] hover:from-[#C91F5A] hover:to-[#A81748] text-white rounded-2xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <MessageCircle size={17} />
                  <span>Kirim Balasan Manis via WhatsApp 💬</span>
                </a>
              </div>

            </motion.div>
          )}

        </div>

      </div>
    </section>
  );
}
