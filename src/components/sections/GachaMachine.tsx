"use client";

import React, { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/Button";
import { useSafeStorage } from "@/hooks/useSafeStorage";
import { gachaRewards, GachaReward, GachaRarity } from "@/data/gacha";
import {
  Sparkles,
  Gift,
  Coins,
  Trophy,
  Star,
  CheckCircle2,
  Ticket,
  Scroll,
  MessageSquare,
  Lock,
  ChevronRight,
  X,
  Volume2,
  Sparkle
} from "lucide-react";

/* ================================================================
   CAPSULE COLOR PALETTE
   ================================================================ */
const CAPSULE_COLORS = [
  { top: "#FF5E83", bottom: "#FFE4EC", glow: "#FF809B" }, // Pink
  { top: "#FFD166", bottom: "#FFF3C4", glow: "#FFE082" }, // Gold
  { top: "#06D6A0", bottom: "#E0F9F1", glow: "#A8E6CF" }, // Mint
  { top: "#118AB2", bottom: "#E0F2FE", glow: "#81D4FA" }, // Sky
  { top: "#9B51E0", bottom: "#F3E8FF", glow: "#D8B4FE" }, // Purple
];

/* ================================================================
   RARITY BADGE CONFIGURATIONS
   ================================================================ */
const RARITY_CONFIG: Record<
  GachaRarity,
  { label: string; badgeClass: string; cardBorder: string; icon: string; glow: string }
> = {
  gemas: {
    label: "Gemas ⭐",
    badgeClass: "bg-sky-500/15 text-sky-600 border-sky-300 font-bold",
    cardBorder: "border-sky-300 shadow-sky-100/60",
    icon: "⭐",
    glow: "rgba(56, 189, 248, 0.25)",
  },
  "super gemas": {
    label: "Super Gemas 🌟",
    badgeClass: "bg-pink-500/15 text-pink-600 border-pink-300 font-bold",
    cardBorder: "border-pink-400 shadow-pink-200/80",
    icon: "🌟",
    glow: "rgba(244, 114, 182, 0.35)",
  },
  "kok bisa se-gemas ini": {
    label: "LEGENDARY 👑",
    badgeClass: "bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 text-[#4A3038] font-extrabold border-amber-300 shadow-md animate-pulse",
    cardBorder: "border-amber-400 shadow-amber-300/60 bg-gradient-to-b from-amber-50/60 via-white to-pink-50/60",
    icon: "👑",
    glow: "rgba(251, 191, 36, 0.55)",
  },
};

const CATEGORY_MAP: Record<
  GachaReward["type"],
  { label: string; icon: React.ReactNode; color: string }
> = {
  pujian: { label: "Pujian", icon: <MessageSquare size={14} />, color: "bg-pink-100 text-pink-700 border-pink-300" },
  harapan: { label: "Harapan", icon: <Star size={14} />, color: "bg-amber-100 text-amber-700 border-amber-300" },
  izin: { label: "Izin Special", icon: <Scroll size={14} />, color: "bg-purple-100 text-purple-700 border-purple-300" },
  kupon: { label: "Kupon Ultah", icon: <Ticket size={14} />, color: "bg-emerald-100 text-emerald-700 border-emerald-300" },
};

interface CapsuleBall {
  id: number;
  color: { top: string; bottom: string; glow: string };
  x: number;
  y: number;
  size: number;
}

export function GachaMachine() {
  // Persistence states
  const [pullCountRaw, setPullCount] = useSafeStorage("gachaPullsCount", "0");
  const [collectedRaw, setCollectedRaw] = useSafeStorage("gachaCollectedIds", "[]");

  const totalPulls = parseInt(pullCountRaw, 10) || 0;
  
  const collectedIds: string[] = useMemo(() => {
    try {
      return JSON.parse(collectedRaw) || [];
    } catch {
      return [];
    }
  }, [collectedRaw]);

  // Interactive Machine Animation States
  const [isInsertingCoin, setIsInsertingCoin] = useState(false);
  const [isTurningHandle, setIsTurningHandle] = useState(false);
  const [droppedCapsule, setDroppedCapsule] = useState<GachaReward | null>(null);
  const [revealedReward, setRevealedReward] = useState<GachaReward | null>(null);
  const [selectedVaultReward, setSelectedVaultReward] = useState<GachaReward | null>(null);
  const [vaultCategory, setVaultCategory] = useState<string>("all");

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const remainingCoins = Math.max(0, 10 - totalPulls);

  const defaultColor = CAPSULE_COLORS[0] || { top: "#FF5E83", bottom: "#FFE4EC", glow: "#FF809B" };

// Deterministic rounded offset generator to guarantee 100% SSR & Client HTML match
function deterministicOffset(seed: number, min: number, max: number): number {
  const hash = Math.abs((seed * 9301 + 49297) % 233280);
  const norm = hash / 233280;
  const val = min + norm * (max - min);
  return Math.round(val * 10) / 10;
}

  // Ball animation seeds inside dome (deterministic for SSR)
  const ballPositions: CapsuleBall[] = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) => {
        const colorConfig = CAPSULE_COLORS[i % CAPSULE_COLORS.length] ?? defaultColor;
        const offsetX = deterministicOffset(i * 3 + 1, -4, 4);
        const offsetY = deterministicOffset(i * 3 + 2, -3, 3);
        const sizeOffset = deterministicOffset(i * 3 + 3, 0, 4);
        return {
          id: i,
          color: colorConfig,
          x: Math.round(((i % 4) * 36 - 54 + offsetX) * 10) / 10,
          y: Math.round((Math.floor(i / 4) * 30 - 25 + offsetY) * 10) / 10,
          size: Math.round((28 + sizeOffset) * 10) / 10,
        };
      }),
    [defaultColor]
  );

  // Pull Gacha Action
  const handlePullGacha = () => {
    if (isInsertingCoin || isTurningHandle || droppedCapsule) return;

    setIsInsertingCoin(true);

    // Step 1: Coin insertion animation (0.6s)
    setTimeout(() => {
      setIsInsertingCoin(false);
      setIsTurningHandle(true);

      // Step 2: Handle turn & dome tumbling animation (1.4s)
      setTimeout(() => {
        setIsTurningHandle(false);

        // Pick uncollected reward if possible, or random fallback
        const uncollected = gachaRewards.filter((r) => !collectedIds.includes(r.id));
        const pool = uncollected.length > 0 ? uncollected : gachaRewards;
        const selected = pool[Math.floor(Math.random() * pool.length)] || gachaRewards[0];

        if (selected) {
          setDroppedCapsule(selected);
        }
      }, 1400);
    }, 600);
  };

  // Open Dropped Capsule Modal
  const handleOpenCapsule = () => {
    if (!droppedCapsule) return;

    const prize = droppedCapsule;
    setRevealedReward(prize);
    setDroppedCapsule(null);

    // Update persistence
    if (!collectedIds.includes(prize.id)) {
      const updated = [...collectedIds, prize.id];
      setCollectedRaw(JSON.stringify(updated));
    }
    setPullCount((totalPulls + 1).toString());
  };

  // Filtered collected rewards for vault display
  const collectedRewardsList = useMemo(() => {
    return gachaRewards.filter((r) => collectedIds.includes(r.id));
  }, [collectedIds]);

  const filteredVault = useMemo(() => {
    if (vaultCategory === "all") return collectedRewardsList;
    return collectedRewardsList.filter((r) => r.type === vaultCategory);
  }, [collectedRewardsList, vaultCategory]);

  const collectionPercent = Math.round((collectedRewardsList.length / gachaRewards.length) * 100);

  return (
    <section className="py-24 md:py-36 px-4 sm:px-6 bg-gradient-to-b from-[#FFF5F8] via-[#FFEAF1] to-[#FFF5F8] relative overflow-hidden select-none">
      
      {/* Ambient Radial Lighting Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#FF5E83]/15 via-[#FFD166]/15 to-[#06D6A0]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-12">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-4 pt-4"
        >
          <div className="inline-flex items-center gap-2 bg-[#C91F5A]/10 border border-[#C91F5A]/25 text-[#C91F5A] px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-widest shadow-xs">
            <Gift size={14} className="text-[#C91F5A]" />
            <span>Surprise Capsule Machine</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#C91F5A] tracking-tight drop-shadow-xs">
            mesin kejutan azkia
          </h2>

          <p className="text-[#8B717A] text-base md:text-lg max-w-xl mx-auto font-body leading-relaxed">
            Putar mesin gachapon untuk mendapatkan ucapan manis, kupon spesial, dan rahasia gemas untuk Azkia! 🎁✨
          </p>

          {/* Coins & Progress Status Badges */}
          <div className="flex flex-wrap justify-center items-center gap-3 pt-2">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-400 text-[#4A3038] px-4 py-1.5 rounded-full font-extrabold text-xs shadow-md border border-amber-300">
              <Coins size={16} className="animate-bounce" />
              <span>Sisa Koin: {remainingCoins} / 10 🪙</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-white text-[#C91F5A] px-4 py-1.5 rounded-full font-bold text-xs border border-pink-200 shadow-xs">
              <Trophy size={14} className="text-amber-500" />
              <span>Koleksi: {collectedRewardsList.length} / {gachaRewards.length} ({collectionPercent}%)</span>
            </div>
          </div>
        </motion.div>

        {/* ================================================================
           GACHAPON MACHINE 3D ARCADE STAGE
           ================================================================ */}
        <div className="relative flex flex-col items-center justify-center max-w-sm sm:max-w-md mx-auto">
          
          {/* Top Marquee Signboard with Arcade Bulbs */}
          <div className="bg-gradient-to-r from-[#FF5E83] via-[#C91F5A] to-[#FF5E83] text-white px-6 py-2.5 rounded-t-3xl border-4 border-b-0 border-[#A81748] shadow-lg flex items-center justify-between z-20 w-11/12 relative">
            
            {/* Blinking Arcade Lights */}
            <div className="flex gap-1.5 text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-300 animate-ping" />
              <span className="w-2.5 h-2.5 rounded-full bg-white opacity-80" />
            </div>

            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-amber-300 animate-spin" style={{ animationDuration: "4s" }} />
              <span className="font-display text-sm sm:text-base tracking-widest uppercase drop-shadow-md">
                GACHAPON WISHES ✨
              </span>
              <Sparkles size={16} className="text-amber-300 animate-spin" style={{ animationDuration: "4s" }} />
            </div>

            <div className="flex gap-1.5 text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-white opacity-80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-300 animate-ping" />
            </div>
          </div>

          {/* Machine Outer Body Frame */}
          <div className="w-full bg-gradient-to-b from-[#FF5E83] via-[#E02868] to-[#C91F5A] rounded-3xl border-4 border-[#A81748] shadow-2xl p-4 sm:p-6 relative overflow-hidden flex flex-col items-center">
            
            {/* Specular Metallic Light Reflection */}
            <div className="absolute top-0 left-0 w-28 h-full bg-gradient-to-r from-white/25 to-transparent skew-x-12 pointer-events-none" />

            {/* Glass Sphere Dome */}
            <div className="relative w-56 sm:w-64 h-48 sm:h-56 bg-gradient-to-b from-white/60 via-white/20 to-white/70 rounded-full border-4 border-white/90 shadow-[inset_0_0_20px_rgba(255,255,255,0.6)] overflow-hidden flex items-center justify-center backdrop-blur-xs">
              
              {/* Curved Glass Highlight */}
              <div className="absolute top-3 left-6 w-16 h-8 bg-white/70 rounded-full blur-xs -rotate-45" />

              {/* Colorful Capsule Balls Inside Dome */}
              <div className="relative w-full h-full flex items-center justify-center">
                {ballPositions.map((ball) => (
                  <motion.div
                    key={ball.id}
                    animate={{
                      y: isTurningHandle
                        ? [ball.y, ball.y - 32, ball.y + 16, ball.y - 12, ball.y]
                        : [ball.y, ball.y - 3, ball.y],
                      x: isTurningHandle
                        ? [ball.x, ball.x + 22, ball.x - 22, ball.x]
                        : [ball.x, ball.x + 2, ball.x],
                      rotate: isTurningHandle ? [0, 180, 360] : 0,
                    }}
                    transition={{
                      duration: isTurningHandle ? 0.35 : 2 + ball.id * 0.2,
                      repeat: isTurningHandle ? 4 : Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute rounded-full shadow-md flex items-center justify-center border border-white/70"
                    style={{
                      width: `${ball.size}px`,
                      height: `${ball.size}px`,
                      left: `calc(50% + ${ball.x}px)`,
                      top: `calc(50% + ${ball.y}px)`,
                      background: `linear-gradient(135deg, ${ball.color.top} 50%, ${ball.color.bottom} 50%)`,
                      boxShadow: `0 4px 10px ${ball.color.glow}`,
                    }}
                  >
                    <div className="w-2 h-2 bg-white/90 rounded-full absolute top-1 left-1" />
                  </motion.div>
                ))}
              </div>

            </div>

            {/* Middle Control Panel Bar */}
            <div className="w-full bg-[#A81748]/70 backdrop-blur-md rounded-2xl p-3.5 my-4 border border-white/20 flex items-center justify-between shadow-inner">
              
              {/* Coin Slot & Coin Animation */}
              <div className="relative flex flex-col items-center justify-center w-24">
                <span className="text-[9px] font-extrabold text-pink-200 uppercase tracking-wider mb-1">
                  COIN SLOT
                </span>
                
                {/* Coin Slot Metal Keyhole */}
                <div className="w-12 h-3.5 bg-gray-950 rounded-full border-2 border-amber-400 shadow-inner flex items-center justify-center relative overflow-hidden">
                  <div className="w-5 h-1 bg-amber-400/90 rounded-full" />
                </div>

                {/* Animated Falling Coin Token */}
                <AnimatePresence>
                  {isInsertingCoin && (
                    <motion.div
                      initial={{ opacity: 1, y: -28, scale: 1 }}
                      animate={{ opacity: 0, y: 5, scale: 0.4 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute -top-4 w-7 h-7 bg-amber-400 rounded-full border-2 border-yellow-200 flex items-center justify-center text-[10px] font-extrabold text-amber-950 shadow-md z-30"
                    >
                      🪙
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Turn Crank Handle Wheel */}
              <div className="flex flex-col items-center justify-center">
                <span className="text-[9px] font-extrabold text-pink-200 uppercase tracking-wider mb-1">
                  PUTAR TUAS 🔄
                </span>

                <motion.button
                  onClick={handlePullGacha}
                  disabled={isInsertingCoin || isTurningHandle || Boolean(droppedCapsule) || remainingCoins <= 0}
                  animate={{ rotate: isTurningHandle ? 360 : 0 }}
                  transition={{ duration: 0.7, repeat: isTurningHandle ? 2 : 0, ease: "linear" }}
                  className="w-14 h-14 bg-gradient-to-tr from-gray-300 via-white to-gray-200 rounded-full border-4 border-amber-400 shadow-xl flex items-center justify-center relative hover:scale-105 active:scale-95 transition-transform cursor-pointer disabled:opacity-50"
                  title="Putar Tuas Mesin Gacha"
                >
                  <div className="w-8 h-2 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full shadow-md" />
                  <div className="w-2 h-8 bg-gradient-to-b from-amber-500 to-amber-600 rounded-full shadow-md absolute" />
                  <div className="w-4 h-4 bg-amber-400 rounded-full border border-white shadow-xs absolute" />
                </motion.button>
              </div>

            </div>

            {/* Bottom Chute & Exit Tray Door */}
            <div className="w-full bg-[#7A0D32] rounded-2xl p-3 border border-pink-300/30 flex flex-col items-center justify-center relative min-h-[95px]">
              <span className="text-[9px] font-bold text-pink-300 uppercase tracking-wider mb-1">
                KAPSUL KELUAR 🎁
              </span>

              {/* Exit Tray Hollow Chute */}
              <div className="w-36 h-14 bg-gray-950 rounded-xl border-2 border-gray-800 shadow-[inset_0_0_15px_rgba(0,0,0,0.9)] flex items-center justify-center relative overflow-hidden">
                
                {/* Dropped Capsule ready for tap */}
                <AnimatePresence>
                  {droppedCapsule && (
                    <motion.div
                      initial={{ y: -40, opacity: 0, scale: 0.5, rotate: -45 }}
                      animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 18 }}
                      onClick={handleOpenCapsule}
                      className="cursor-pointer group flex flex-col items-center"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-b from-[#FF5E83] to-[#FFD166] border-2 border-white shadow-[0_0_18px_#FFD166] group-hover:scale-110 transition-transform flex items-center justify-center ring-4 ring-amber-300/50 animate-pulse">
                        <Sparkles size={16} className="text-white animate-spin" />
                      </div>
                      <span className="text-[9px] font-extrabold text-amber-300 uppercase tracking-wider mt-0.5 animate-bounce">
                        ✨ TAP BUKA! ✨
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!droppedCapsule && !isTurningHandle && (
                  <span className="text-[10px] text-gray-400 font-medium">
                    {remainingCoins > 0 ? "Putar tuas di atas 👆" : "Koin Habis 🪙"}
                  </span>
                )}

                {isTurningHandle && (
                  <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 0.5 }}
                    className="text-[10px] text-pink-300 font-bold"
                  >
                    Kapsul meluncur... 💨
                  </motion.span>
                )}
              </div>
            </div>

          </div>

          {/* Action Trigger Button Below Machine */}
          <div className="mt-6 w-full">
            <Button
              onClick={handlePullGacha}
              disabled={isInsertingCoin || isTurningHandle || Boolean(droppedCapsule) || remainingCoins <= 0}
              className="w-full py-4 text-base sm:text-lg font-extrabold rounded-2xl bg-gradient-to-r from-[#FF5E83] via-[#C91F5A] to-[#FF5E83] hover:from-[#C91F5A] hover:to-[#A81748] text-white shadow-xl flex items-center justify-center gap-2.5 disabled:opacity-50 border border-pink-400/40"
            >
              <Coins size={20} className="text-amber-300" />
              <span>
                {isInsertingCoin
                  ? "Memasukkan Koin... 🪙"
                  : isTurningHandle
                    ? "Memutar Mesin Gacha... 🔄"
                    : droppedCapsule
                      ? "Tap Kapsul Di Atas Untuk Buka! ✨"
                      : remainingCoins <= 0
                        ? "Jatah Koin Habis! Besok Lagi Ya 💌"
                        : "Masukan Koin & Putar Mesin 🪙✨"}
              </span>
            </Button>
          </div>

        </div>

        {/* ================================================================
           UNBOXING REVEAL MODAL (Portal to document.body, Full Screen Backdrop)
           ================================================================ */}
        {isMounted &&
          typeof document !== "undefined" &&
          createPortal(
            <AnimatePresence>
              {revealedReward && (
                <div
                  onClick={() => setRevealedReward(null)}
                  className="fixed inset-0 z-[99999] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto select-none min-h-screen w-screen"
                >
                  <motion.div
                    onClick={(e) => e.stopPropagation()}
                    initial={{ scale: 0.7, y: 50, rotate: -5 }}
                    animate={{ scale: 1, y: 0, rotate: 0 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className={`max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 border-4 shadow-2xl space-y-6 text-center relative overflow-hidden my-auto ${
                      RARITY_CONFIG[revealedReward.rarity].cardBorder
                    }`}
                  >
                    {/* Close Button */}
                    <button
                      onClick={() => setRevealedReward(null)}
                      className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-20"
                    >
                      <X size={18} />
                    </button>

                    {/* Background Glow */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-30"
                      style={{ background: RARITY_CONFIG[revealedReward.rarity].glow }}
                    />

                    {/* Particle Celebrations */}
                    <div className="flex justify-center gap-2 text-2xl pt-2">
                      <span>✨</span>
                      <span>🎉</span>
                      <span>💖</span>
                      <span>🎁</span>
                    </div>

                    {/* Rarity Badge */}
                    <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs border shadow-xs">
                      <span>{RARITY_CONFIG[revealedReward.rarity].icon}</span>
                      <span className={`uppercase tracking-wider ${RARITY_CONFIG[revealedReward.rarity].badgeClass}`}>
                        {RARITY_CONFIG[revealedReward.rarity].label}
                      </span>
                    </div>

                    {/* Category Pill */}
                    <div className="flex justify-center">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                          CATEGORY_MAP[revealedReward.type].color
                        }`}
                      >
                        {CATEGORY_MAP[revealedReward.type].icon}
                        <span>Kategori: {CATEGORY_MAP[revealedReward.type].label}</span>
                      </span>
                    </div>

                    {/* Main Message Text */}
                    <blockquote className="font-handwriting text-2xl sm:text-3xl text-[#4A3038] leading-relaxed p-5 bg-pink-50/70 rounded-2xl border border-pink-200 shadow-inner italic">
                      "{revealedReward.message}"
                    </blockquote>

                    {/* Save / Close Action Button */}
                    <Button
                      onClick={() => setRevealedReward(null)}
                      className="w-full py-4 bg-gradient-to-r from-[#FF5E83] to-[#C91F5A] hover:from-[#C91F5A] hover:to-[#A81748] text-white font-extrabold rounded-2xl shadow-lg text-base"
                    >
                      <CheckCircle2 size={18} className="mr-2" /> Simpan Ke Koleksi Hadiah 💖
                    </Button>

                  </motion.div>
                </div>
              )}
            </AnimatePresence>,
            document.body
          )}

        {/* ================================================================
           COLLECTION VAULT & TROPHY SHELF
           ================================================================ */}
        <div className="pt-8 space-y-6">
          
          {/* Vault Header & Progress */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t-2 border-pink-200/80 pt-8">
            <div className="text-left space-y-1 text-center sm:text-left">
              <h3 className="font-display text-2xl text-[#C91F5A] flex items-center justify-center sm:justify-start gap-2">
                <Trophy size={24} className="text-amber-500" />
                <span>Koleksi Hadiah Kejutan Azkia</span>
              </h3>
              <p className="text-xs text-[#8B717A]">
                Semua ucapan manis & kupon yang berhasil Azkia dapatkan tersimpan rapi di sini 💌
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 justify-center">
              {[
                { id: "all", label: "Semua" },
                { id: "pujian", label: "Pujian" },
                { id: "harapan", label: "Harapan" },
                { id: "izin", label: "Izin" },
                { id: "kupon", label: "Kupon" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setVaultCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                    vaultCategory === cat.id
                      ? "bg-[#C91F5A] text-white border-[#C91F5A] shadow-xs"
                      : "bg-white text-[#8B717A] border-pink-200 hover:bg-pink-50"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Vault Rewards Grid */}
          {filteredVault.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-left">
              {filteredVault.map((reward) => (
                <motion.div
                  key={reward.id}
                  whileHover={{ scale: 1.02, y: -2 }}
                  onClick={() => setSelectedVaultReward(reward)}
                  className={`cursor-pointer p-4 rounded-2xl bg-white border-2 shadow-sm space-y-3 relative overflow-hidden transition-all ${
                    RARITY_CONFIG[reward.rarity].cardBorder
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        CATEGORY_MAP[reward.type].color
                      }`}
                    >
                      {CATEGORY_MAP[reward.type].icon}
                      <span>{CATEGORY_MAP[reward.type].label}</span>
                    </span>

                    <span className="text-[10px] font-extrabold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">
                      {RARITY_CONFIG[reward.rarity].icon} {reward.rarity}
                    </span>
                  </div>

                  <p className="font-handwriting text-lg text-[#4A3038] line-clamp-2 leading-relaxed italic">
                    "{reward.message}"
                  </p>

                  <div className="text-[11px] font-bold text-[#C91F5A] flex items-center justify-end gap-1 hover:underline">
                    <span>Lihat Detail</span>
                    <ChevronRight size={14} />
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="p-8 bg-white/60 rounded-3xl border-2 border-dashed border-pink-200 text-center space-y-2">
              <Lock size={32} className="mx-auto text-pink-300" />
              <p className="text-sm font-bold text-[#8B717A]">
                Belum ada hadiah di kategori ini.
              </p>
              <p className="text-xs text-[#8B717A]/70">
                Putar Mesin Kejutan di atas untuk mengumpulkan hadiah manis Azkia! ✨
              </p>
            </div>
          )}

        </div>

        {/* Detail Modal for Vault Item (Portal to document.body, Full Screen Backdrop) */}
        {isMounted &&
          typeof document !== "undefined" &&
          createPortal(
            <AnimatePresence>
              {selectedVaultReward && (
                <div
                  onClick={() => setSelectedVaultReward(null)}
                  className="fixed inset-0 z-[99999] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto select-none min-h-screen w-screen"
                >
                  <motion.div
                    onClick={(e) => e.stopPropagation()}
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 border-4 border-pink-300 shadow-2xl space-y-5 text-center relative my-auto overflow-hidden"
                  >
                    <button
                      onClick={() => setSelectedVaultReward(null)}
                      className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-20"
                    >
                      <X size={18} />
                    </button>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold border bg-pink-50 text-[#C91F5A] border-pink-200">
                      {CATEGORY_MAP[selectedVaultReward.type].icon}
                      <span>{CATEGORY_MAP[selectedVaultReward.type].label}</span>
                    </div>

                    <blockquote className="font-handwriting text-2xl text-[#4A3038] leading-relaxed p-5 bg-pink-50/70 rounded-2xl border border-pink-200 italic">
                      "{selectedVaultReward.message}"
                    </blockquote>

                    <Button
                      onClick={() => setSelectedVaultReward(null)}
                      variant="outline"
                      className="w-full border-pink-300 text-[#C91F5A] font-bold py-3"
                    >
                      Tutup
                    </Button>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>,
            document.body
          )}

      </div>
    </section>
  );
}
