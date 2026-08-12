"use client";

import React, { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { useSafeStorage } from "@/hooks/useSafeStorage";
import {
  Ticket,
  Sparkles,
  Gift,
  CheckCircle2,
  Share2,
  Copy,
  Clock,
  Infinity as InfinityIcon,
  Heart,
  MessageCircle,
  X,
  ExternalLink,
  Lock,
  ChevronRight,
  ShieldCheck,
  Star
} from "lucide-react";
import confetti from "canvas-confetti";

/* ================================================================
   DIGITAL VOUCHER DATA TYPES & CURATED LIST
   ================================================================ */
export interface DigitalVoucher {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  code: string;
  icon: string;
  category: "manis" | "kuliner" | "kebal" | "royale";
  rarity: "GOLD" | "PLATINUM" | "LEGENDARY";
  colorGradient: string;
  accentColor: string;
  badgeBg: string;
  waMessage: string;
}

const DIGITAL_VOUCHERS: DigitalVoucher[] = [
  {
    id: "vouch-1",
    title: "Unlimited Mood Saver Pass",
    subtitle: "Curhat Kapan Aja, Aku Standby",
    description: "Kalau lagi pusing, overthinking, atau cuma butuh teman cerita — telepon atau chat aja kapan pun. Nggak ada batas waktu, dan nggak akan bikin risih.",
    code: "MOOD-SAVER-AZKIA-247",
    icon: "💖",
    category: "manis",
    rarity: "GOLD",
    colorGradient: "from-pink-500 via-rose-400 to-pink-600",
    accentColor: "#FF5E83",
    badgeBg: "bg-pink-100 text-pink-700 border-pink-300",
    waMessage: "Halo! Aku mau klaim Voucher Digital Azkia: *Unlimited Mood Saver Pass* (Kode: MOOD-SAVER-AZKIA-247) 💖 Siap-siap dengerin cerita ya!"
  },
  {
    id: "vouch-2",
    title: "Midnight Dessert & Snack Party",
    subtitle: "Free Delivery Jajan Favorit Azkia",
    description: "Kupon buat pesan-antar makanan, boba, atau dessert favorit, kapan pun laper melanda — dan semuanya aku yang bayarin.",
    code: "SNACK-NIGHT-DELIVERY-19",
    icon: "🍰",
    category: "kuliner",
    rarity: "GOLD",
    colorGradient: "from-amber-500 via-orange-400 to-amber-600",
    accentColor: "#F59E0B",
    badgeBg: "bg-amber-100 text-amber-800 border-amber-300",
    waMessage: "Halo! Aku mau klaim Voucher Digital Azkia: *Midnight Dessert & Snack Party* (Kode: SNACK-NIGHT-DELIVERY-19) 🍰 Traktir jajan sekarang dong!"
  },
  {
    id: "vouch-3",
    title: "Movie Marathon & Popcorn Veto",
    subtitle: "Hak Veto Pilih Film & Cemilan",
    description: "Kamu yang nentuin film, series, sama cemilannya pas nonton bareng — nggak ada protes-protesan, titik.",
    code: "CINEMA-VETO-AZKIA-FULL",
    icon: "🍿",
    category: "kuliner",
    rarity: "PLATINUM",
    colorGradient: "from-purple-600 via-indigo-500 to-purple-700",
    accentColor: "#8B5CF6",
    badgeBg: "bg-purple-100 text-purple-800 border-purple-300",
    waMessage: "Halo! Aku mau klaim Voucher Digital Azkia: *Movie Marathon & Popcorn Veto* (Kode: CINEMA-VETO-AZKIA-FULL) 🍿 Film pilihan aku yang diputar!"
  },
  {
    id: "vouch-4",
    title: "Coffee Date & Deep Talk Treat",
    subtitle: "Nongkrong Santai di Cafe Pilihan Azkia",
    description: "Kupon buat janjian ngopi dan deep talk di coffee shop pilihan kamu. Bebas pesan apa aja, ceritanya juga nggak usah buru-buru.",
    code: "COFFEE-DEEP-TALK-DATE",
    icon: "☕",
    category: "manis",
    rarity: "PLATINUM",
    colorGradient: "from-emerald-500 via-teal-400 to-emerald-600",
    accentColor: "#10B981",
    badgeBg: "bg-emerald-100 text-emerald-800 border-emerald-300",
    waMessage: "Halo! Aku mau klaim Voucher Digital Azkia: *Coffee Date & Deep Talk Treat* (Kode: COFFEE-DEEP-TALK-DATE) ☕ Yuk agendakan ngopi bareng!"
  },
  {
    id: "vouch-5",
    title: "Anti-Debat Champion Card",
    subtitle: "Menang Debat, Sekali, Tanpa Ribet",
    description: "Kartu sakti kebal debat. Sekali dipakai, kamu otomatis menang — nggak pakai proses banding, keputusan final.",
    code: "ANTI-DEBAT-WINNER-CARD",
    icon: "🛡️",
    category: "kebal",
    rarity: "PLATINUM",
    colorGradient: "from-sky-500 via-blue-500 to-indigo-600",
    accentColor: "#3B82F6",
    badgeBg: "bg-sky-100 text-sky-800 border-sky-300",
    waMessage: "Halo! Aku mau klaim voucher sakti Anti-Debat Champion Card ya (kode: ANTI-DEBAT-WINNER-CARD) 🛡️ Aku menang debat kali ini!"
  },
  {
    id: "vouch-6",
    title: "The Ultimate Royal Wish Pass",
    subtitle: "1 Permintaan Spesial Bebas Dikabulkan",
    description: "Voucher paling langka di sini. Ajukan 1 permintaan apa aja (yang masuk akal ya) — dan itu wajib aku kabulin, nggak pakai nego.",
    code: "ROYAL-WISH-ROYALE-AZKIA",
    icon: "👑",
    category: "royale",
    rarity: "LEGENDARY",
    colorGradient: "from-amber-400 via-yellow-300 to-amber-500",
    accentColor: "#D97706",
    badgeBg: "bg-gradient-to-r from-amber-200 to-yellow-300 text-amber-900 border-amber-400 font-black",
    waMessage: "Halo! Aku klaim voucher LEGENDARY The Ultimate Royal Wish Pass (kode: ROYAL-WISH-ROYALE-AZKIA) 👑 Ini permintaan spesialku, siap-siap ya!"
  }
];

export function Coupons() {
  // Persistence state
  const [unlockedRaw, setUnlockedRaw] = useSafeStorage("azkiaUnlockedVouchers", "[]");
  const [claimedRaw, setClaimedRaw] = useSafeStorage("azkiaClaimedVouchers", "[]");

  const unlockedIds: string[] = useMemo(() => {
    try {
      return JSON.parse(unlockedRaw) || [];
    } catch {
      return [];
    }
  }, [unlockedRaw]);

  const claimedIds: string[] = useMemo(() => {
    try {
      return JSON.parse(claimedRaw) || [];
    } catch {
      return [];
    }
  }, [claimedRaw]);

  const [activeModalVoucher, setActiveModalVoucher] = useState<DigitalVoucher | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Scratch action handler
  const handleScratchVoucher = (id: string) => {
    if (unlockedIds.includes(id)) return;

    const newUnlocked = [...unlockedIds, id];
    setUnlockedRaw(JSON.stringify(newUnlocked));

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Fallback if confetti fails
    }
  };

  // Claim action handler
  const handleMarkClaimed = (id: string) => {
    if (!claimedIds.includes(id)) {
      const newClaimed = [...claimedIds, id];
      setClaimedRaw(JSON.stringify(newClaimed));
    }
  };

  // Copy code handler
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  // Send WhatsApp Claim
  const handleOpenWhatsApp = (voucher: DigitalVoucher) => {
    handleMarkClaimed(voucher.id);
    const encoded = encodeURIComponent(voucher.waMessage);
    window.open(`https://wa.me/?text=${encoded}`, "_blank");
  };

  return (
    <section className="py-24 md:py-36 px-4 sm:px-6 bg-gradient-to-b from-[#FFF5F8] via-[#FFEAF1] to-[#FFF5F8] relative overflow-hidden select-none">
      
      {/* Ambient Lighting Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-[#FF5E83]/10 via-[#FFD166]/15 to-[#9B51E0]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-12">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 bg-[#C91F5A]/10 border border-[#C91F5A]/25 text-[#C91F5A] px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-widest shadow-xs">
            <Ticket size={15} className="text-[#C91F5A]" />
            <span>Koleksi Voucher Sakti Azkia</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#C91F5A] tracking-tight drop-shadow-xs">
            kado & voucher digital
          </h2>

          <p className="text-[#8B717A] text-base md:text-lg font-body leading-relaxed">
            Karena kado fisik kadang telat sampai, ini adalah 6 Voucher Spesial seumur hidup yang bisa Azkia gosok & klaim kapanpun! 🎁✨
          </p>

          {/* Collection Status Badge */}
          <div className="pt-2 flex justify-center items-center gap-3">
            <div className="inline-flex items-center gap-2 bg-white text-[#C91F5A] px-4 py-1.5 rounded-full font-bold text-xs border border-pink-200 shadow-sm">
              <Sparkles size={15} className="text-amber-500" />
              <span>Voucher Terbuka: {unlockedIds.length} / {DIGITAL_VOUCHERS.length}</span>
            </div>
            {unlockedIds.length === DIGITAL_VOUCHERS.length && (
              <span className="bg-amber-400 text-[#4A3038] font-extrabold text-xs px-3 py-1.5 rounded-full shadow-md animate-pulse">
                👑 VIP Pass Master!
              </span>
            )}
          </div>
        </motion.div>

        {/* Vouchers Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DIGITAL_VOUCHERS.map((voucher, index) => {
            const isUnlocked = unlockedIds.includes(voucher.id);
            const isClaimed = claimedIds.includes(voucher.id);

            return (
              <motion.div
                key={voucher.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="h-full flex flex-col"
              >
                {/* Perforated Ticket Card Design */}
                <div className={`relative rounded-3xl bg-white border-2 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-md hover:shadow-xl ${
                  isUnlocked ? "border-pink-300" : "border-gray-200"
                }`}>

                  {/* Left & Right Perforated Ticket Cut Notches */}
                  <div className="absolute top-1/2 -left-3.5 -translate-y-1/2 w-7 h-7 rounded-full bg-[#FFEAF1] border-r-2 border-pink-200 z-10 pointer-events-none" />
                  <div className="absolute top-1/2 -right-3.5 -translate-y-1/2 w-7 h-7 rounded-full bg-[#FFEAF1] border-l-2 border-pink-200 z-10 pointer-events-none" />

                  {/* Ticket Header & Rarity Badge */}
                  <div className="p-6 pb-4 space-y-3 relative">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold border ${voucher.badgeBg}`}>
                        <span>{voucher.rarity === "LEGENDARY" ? "👑" : voucher.rarity === "PLATINUM" ? "🌟" : "⭐"}</span>
                        <span>{voucher.rarity} PASS</span>
                      </span>

                      {isClaimed && (
                        <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-300">
                          <CheckCircle2 size={12} /> Diklaim
                        </span>
                      )}
                    </div>

                    {/* Icon & Title */}
                    <div className="flex items-start gap-3.5 pt-1">
                      <div className="w-12 h-12 rounded-2xl bg-pink-50 border border-pink-200 flex items-center justify-center text-2xl shrink-0 shadow-xs">
                        {voucher.icon}
                      </div>
                      <div className="space-y-0.5 text-left">
                        <h3 className="font-display text-lg text-[#4A3038] leading-snug">
                          {voucher.title}
                        </h3>
                        <p className="text-xs text-[#C91F5A] font-bold">
                          {voucher.subtitle}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-[#8B717A] leading-relaxed text-left font-body pt-1 line-clamp-3">
                      {voucher.description}
                    </p>
                  </div>

                  {/* Perforated Divider Line */}
                  <div className="relative border-b-2 border-dashed border-pink-200 my-1 mx-6" />

                  {/* Ticket Footer / Scratch Area */}
                  <div className="p-6 pt-3 space-y-3">
                    
                    {/* Expiry Badge */}
                    <div className="flex items-center justify-between text-[11px] font-semibold text-[#8B717A]">
                      <span className="flex items-center gap-1">
                        <InfinityIcon size={13} className="text-pink-500" />
                        <span>Masa Berlaku: <strong className="text-[#C91F5A]">Seumur Hidup</strong></span>
                      </span>
                    </div>

                    {/* Scratch Card Overlay or Revealed Voucher Area */}
                    <div className="relative h-14 rounded-2xl overflow-hidden border border-pink-200 shadow-inner">
                      {isUnlocked ? (
                        /* Revealed Voucher Code Barcode View */
                        <div
                          onClick={() => setActiveModalVoucher(voucher)}
                          className="w-full h-full bg-gradient-to-r from-pink-50 via-white to-pink-50 p-2 px-3 flex items-center justify-between cursor-pointer group hover:bg-pink-100/60 transition-colors"
                        >
                          <div className="text-left space-y-0.5">
                            <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">KODE TIKET VOUCHER</span>
                            <span className="font-mono font-black text-xs sm:text-sm text-[#C91F5A] tracking-wider">
                              {voucher.code}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 text-xs font-bold text-[#C91F5A] bg-pink-100 group-hover:bg-[#C91F5A] group-hover:text-white px-3 py-1.5 rounded-xl transition-all shadow-xs">
                            <span>Detail</span>
                            <ChevronRight size={14} />
                          </div>
                        </div>
                      ) : (
                        /* Scratch Foil Overlay */
                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleScratchVoucher(voucher.id)}
                          className="w-full h-full bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 p-2 flex items-center justify-center cursor-pointer shadow-md relative overflow-hidden group"
                        >
                          {/* Foil Shine Texture Effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

                          <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider z-10 drop-shadow-xs">
                            <Sparkles size={16} className="animate-spin text-amber-800" />
                            <span>Tap / Gosok Untuk Buka 🪙</span>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Action Buttons when Unlocked */}
                    {isUnlocked && (
                      <div className="flex gap-2 pt-1">
                        <button
                          onClick={() => handleOpenWhatsApp(voucher)}
                          className="flex-1 py-2.5 px-3 bg-[#C91F5A] hover:bg-[#A81748] text-white rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-sm transition-all"
                        >
                          <MessageCircle size={14} />
                          <span>Klaim di WA</span>
                        </button>

                        <button
                          onClick={() => handleCopyCode(voucher.code)}
                          title="Salin Kodenya"
                          className="p-2.5 bg-pink-100 hover:bg-pink-200 text-[#C91F5A] rounded-xl text-xs font-bold transition-colors shrink-0"
                        >
                          {copiedCode === voucher.code ? (
                            <CheckCircle2 size={15} className="text-emerald-600" />
                          ) : (
                            <Copy size={15} />
                          )}
                        </button>
                      </div>
                    )}

                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* ================================================================
         VOUCHER DETAIL & CLAIM MODAL (Rendered via Portal to document.body)
         ================================================================ */}
      {isMounted &&
        typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {activeModalVoucher && (
              <div
                onClick={() => setActiveModalVoucher(null)}
                className="fixed inset-0 z-[99999] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto select-none min-h-screen w-screen"
              >
                <motion.div
                  onClick={(e) => e.stopPropagation()}
                  initial={{ scale: 0.85, y: 30 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  className="max-w-lg w-full bg-white rounded-3xl p-6 sm:p-8 border-4 border-amber-300 shadow-2xl space-y-6 relative overflow-hidden my-auto text-left"
                >
                  {/* Close Button */}
                  <button
                    onClick={() => setActiveModalVoucher(null)}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-20"
                  >
                    <X size={18} />
                  </button>

                  {/* Header Title */}
                  <div className="space-y-1 text-center pt-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold border bg-amber-50 text-amber-800 border-amber-300">
                      <span>👑 TIKET SPESIAL ULANG TAHUN AZKIA</span>
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl text-[#4A3038]">
                      {activeModalVoucher.title}
                    </h3>
                  </div>

                  {/* High-Res Ticket Graphic */}
                  <div className="bg-gradient-to-br from-pink-50 via-rose-50 to-amber-50 rounded-2xl p-5 border-2 border-pink-200 space-y-4 relative shadow-inner">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-white border border-pink-200 flex items-center justify-center text-3xl shadow-sm shrink-0">
                        {activeModalVoucher.icon}
                      </div>
                      <div>
                        <span className="text-xs font-extrabold text-[#C91F5A] block uppercase tracking-wider">
                          {activeModalVoucher.subtitle}
                        </span>
                        <span className="font-mono font-black text-base sm:text-lg text-gray-800 tracking-wider">
                          {activeModalVoucher.code}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#4A3038] leading-relaxed font-body bg-white/80 p-3.5 rounded-xl border border-pink-100">
                      "{activeModalVoucher.description}"
                    </p>

                    {/* Voucher Terms Table */}
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-bold text-[#8B717A] pt-1">
                      <div className="p-2 bg-white/70 rounded-lg border border-pink-100">
                        <span className="text-gray-400 block text-[9px] uppercase">Penerima Hak</span>
                        <span className="text-[#C91F5A]">Azkia (Pahlawan Ulang Tahun 💖)</span>
                      </div>
                      <div className="p-2 bg-white/70 rounded-lg border border-pink-100">
                        <span className="text-gray-400 block text-[9px] uppercase">Masa Berlaku</span>
                        <span className="text-emerald-700">Seumur Hidup (Tanpa Expired ♾️)</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2 pt-1">
                    <button
                      onClick={() => handleOpenWhatsApp(activeModalVoucher)}
                      className="w-full py-4 bg-gradient-to-r from-[#FF5E83] to-[#C91F5A] hover:from-[#C91F5A] hover:to-[#A81748] text-white font-extrabold rounded-2xl shadow-lg text-sm sm:text-base flex items-center justify-center gap-2 transition-all"
                    >
                      <MessageCircle size={18} />
                      <span>Klaim Voucher Ini di WhatsApp 💬</span>
                    </button>

                    <button
                      onClick={() => setActiveModalVoucher(null)}
                      className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-xs transition-colors text-center"
                    >
                      Tutup
                    </button>
                  </div>

                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}

    </section>
  );
}
