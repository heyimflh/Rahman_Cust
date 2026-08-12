"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Cake,
  CheckCircle2,
  RefreshCw,
  Flame,
  Palette,
  Heart,
  Trophy,
  Undo2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";
import { useSafeStorage } from "@/hooks/useSafeStorage";
import {
  CakeSVG,
  FLAVORS,
  TOPPING_SLOTS,
  FlavorType,
  PlacedTopping,
} from "@/components/ui/CakeSVG";

/* ================================================================
   AGE CALCULATION
   ================================================================ */
function getAzkiaAge(): number {
  const birth = new Date(profile.birthDate);
  const target = new Date(profile.targetBirthday);
  return target.getFullYear() - birth.getFullYear();
}

/* ================================================================
   AVAILABLE TOPPINGS
   ================================================================ */
const EMOJI_TOPPINGS = [
  "🍓",
  "🍒",
  "🫐",
  "🍫",
  "🍬",
  "🍪",
  "⭐",
  "💖",
  "🎀",
  "🌸",
  "👑",
];

const PATTERN_LIST = [
  { id: "sprinkles", label: "Seres", icon: "🌈" },
  { id: "cheese", label: "Keju", icon: "🧀" },
  { id: "chocochips", label: "Choco Chips", icon: "🍫" },
];

/* ================================================================
   MAIN COMPONENT — QuickCake Decorator Game
   ================================================================ */
export default function QuickCake({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const age = useMemo(() => getAzkiaAge(), []);
  const [, setSavedCake] = useSafeStorage("decoratedCake", "");

  // Game state
  const [flavor, setFlavor] = useState<FlavorType>("pink");
  const [activeTab, setActiveTab] = useState<"base" | "toppings" | "candles">(
    "base"
  );
  const [placedToppings, setPlacedToppings] = useState<PlacedTopping[]>([]);
  const [activePatterns, setActivePatterns] = useState<Set<string>>(new Set());
  const [candleCount, setCandleCount] = useState(3);
  const [isBlown, setIsBlown] = useState(false);
  const [isBlowing, setIsBlowing] = useState(false);

  // Handlers
  const addTopping = (emoji: string) => {
    const occupied = new Set(placedToppings.map((t) => t.slotIndex));
    const nextSlot = TOPPING_SLOTS.findIndex((_, i) => !occupied.has(i));
    if (nextSlot === -1) return; // all 15 slots full
    setPlacedToppings((prev) => [
      ...prev,
      { slotIndex: nextSlot, emoji, id: Date.now() + Math.random() },
    ]);
  };

  const removeLastTopping = () => {
    setPlacedToppings((prev) => prev.slice(0, -1));
  };

  const togglePattern = (patternId: string) => {
    setActivePatterns((prev) => {
      const next = new Set(prev);
      if (next.has(patternId)) next.delete(patternId);
      else next.add(patternId);
      return next;
    });
  };

  const triggerBlowCandles = () => {
    setIsBlowing(true);
    setTimeout(() => {
      setIsBlown(true);
      setIsBlowing(false);
    }, 1200);
  };

  const saveCakeAndComplete = () => {
    const cakeData = {
      flavor,
      placedToppings,
      activePatterns: Array.from(activePatterns),
      candleCount,
    };
    setSavedCake(JSON.stringify(cakeData));
    onComplete();
  };

  const resetGame = () => {
    setFlavor("pink");
    setPlacedToppings([]);
    setActivePatterns(new Set());
    setCandleCount(3);
    setIsBlown(false);
    setIsBlowing(false);
    setActiveTab("base");
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3 select-none">
      {/* ═══════════ HEADER BAR ═══════════ */}
      <div className="w-full flex justify-between items-center bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl border-2 border-[#FFC5D0] shadow-sm">
        <div className="flex items-center gap-2">
          <Cake className="text-[#C91F5A]" size={20} />
          <div className="flex flex-col">
            <span className="text-[10px] text-[#8B717A] uppercase font-bold tracking-wider">
              Bakery Studio
            </span>
            <span className="text-sm font-display text-[#C91F5A] leading-none">
              Dekor Kue Ultah 🎂
            </span>
          </div>
        </div>
        <div className="text-xs font-bold text-[#8B717A] bg-[#FFE4EC] px-3 py-1 rounded-full border border-[#FFC5D0]">
          Hiasan: {placedToppings.length} / 15
        </div>
      </div>

      {/* ═══════════ MASCOT REACTION ═══════════ */}
      {!isBlown && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full flex items-center gap-2 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#FFC5D0] shadow-sm"
        >
          <span className="text-lg">🧁</span>
          <span className="text-[11px] font-bold text-[#C91F5A]">
            {placedToppings.length === 0 && activePatterns.size === 0
              ? "Pilih rasa & hias kue cantikmu!"
              : placedToppings.length < 5
                ? "Wah, kuenya makin cantik! 🍓"
                : placedToppings.length < 10
                  ? "Bagus banget! Tambahin lagi yuk! 🎨"
                  : "Masterpiece kue ultah siap! 👑"}
          </span>
        </motion.div>
      )}

      {/* ═══════════ CAKE CANVAS ═══════════ */}
      <div
        className={cn(
          "relative w-full rounded-3xl border-4 border-[#FFC5D0] overflow-hidden shadow-2xl transition-all duration-700",
          isBlowing
            ? "bg-gradient-to-b from-[#1A1A2E] to-[#16213E]"
            : "bg-gradient-to-b from-[#FFF9FB] via-[#FFE8EF] to-[#FFD5E1]"
        )}
      >
        <div className="w-full px-2" style={{ height: 340 }}>
          <CakeSVG
            flavor={flavor}
            placedToppings={placedToppings}
            activePatterns={activePatterns}
            candleCount={candleCount}
            isBlown={isBlown}
            isBlowing={isBlowing}
            age={age}
          />
        </div>
      </div>

      {/* ═══════════ CONTROLS or CELEBRATION ═══════════ */}
      {!isBlown ? (
        <div className="w-full space-y-3">
          {/* Tab bar */}
          <div className="grid grid-cols-3 gap-2 bg-[#FFF0F3] p-1.5 rounded-2xl border border-[#FFC5D0]">
            {(
              [
                {
                  id: "base" as const,
                  icon: <Palette size={14} />,
                  label: "1. Rasa",
                },
                {
                  id: "toppings" as const,
                  icon: <Heart size={14} />,
                  label: "2. Hiasan",
                },
                {
                  id: "candles" as const,
                  icon: <Flame size={14} />,
                  label: "3. Lilin",
                },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5",
                  activeTab === tab.id
                    ? "bg-[#C91F5A] text-white shadow-sm"
                    : "bg-transparent text-[#4A3038] hover:bg-white"
                )}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            {/* ─── TAB 1: FLAVOR BASE ─── */}
            {activeTab === "base" && (
              <motion.div
                key="base"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-1 bg-white p-3 rounded-2xl border border-[#FFC5D0]"
              >
                <label className="text-[10px] font-bold text-[#8B717A] uppercase tracking-wider block">
                  Pilih Varian Flavor:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(FLAVORS) as FlavorType[]).map((fKey) => (
                    <button
                      key={fKey}
                      onClick={() => setFlavor(fKey)}
                      className={cn(
                        "p-2.5 rounded-xl text-xs font-bold border transition-all text-left flex items-center gap-2",
                        flavor === fKey
                          ? "bg-[#FFE4EC] border-[#FF5E83] text-[#C91F5A] shadow-sm"
                          : "bg-white text-[#4A3038] border-gray-200 hover:bg-gray-50"
                      )}
                    >
                      <span className="text-xl">{FLAVORS[fKey].emoji}</span>
                      <span className="leading-tight">
                        {FLAVORS[fKey].name}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ─── TAB 2: TOPPINGS / DECORATIONS ─── */}
            {activeTab === "toppings" && (
              <motion.div
                key="toppings"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-3 bg-white p-3 rounded-2xl border border-[#FFC5D0]"
              >
                {/* Emoji toppings */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-[10px] font-bold text-[#8B717A] uppercase tracking-wider">
                      Hiasan (tap untuk pasang):
                    </label>
                    <button
                      onClick={removeLastTopping}
                      disabled={placedToppings.length === 0}
                      className="text-[11px] font-bold text-[#C91F5A] flex items-center gap-1 hover:underline disabled:opacity-40"
                    >
                      <Undo2 size={12} /> Hapus
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {EMOJI_TOPPINGS.map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => addTopping(emoji)}
                        disabled={placedToppings.length >= 15}
                        className="text-xl p-1.5 hover:scale-110 active:scale-90 transition-transform bg-[#FFF0F3] hover:bg-[#FFE4EC] rounded-xl border border-[#FFC5D0] shadow-xs disabled:opacity-40 disabled:hover:scale-100"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-[#FFC5D0]" />

                {/* Pattern toppings */}
                <div>
                  <label className="text-[10px] font-bold text-[#8B717A] uppercase tracking-wider block mb-1.5">
                    Taburan (toggle on/off):
                  </label>
                  <div className="flex gap-2">
                    {PATTERN_LIST.map((pat) => (
                      <button
                        key={pat.id}
                        onClick={() => togglePattern(pat.id)}
                        className={cn(
                          "flex-1 py-2 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1",
                          activePatterns.has(pat.id)
                            ? "bg-[#C91F5A] text-white border-[#C91F5A] shadow-sm"
                            : "bg-[#FFF0F3] text-[#4A3038] border-[#FFC5D0] hover:bg-[#FFE4EC]"
                        )}
                      >
                        {pat.icon} {pat.label}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ─── TAB 3: CANDLES ─── */}
            {activeTab === "candles" && (
              <motion.div
                key="candles"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-2 bg-white p-3 rounded-2xl border border-[#FFC5D0]"
              >
                <label className="text-[10px] font-bold text-[#8B717A] uppercase tracking-wider block">
                  Jumlah Lilin Ulang Tahun:
                </label>
                <div className="flex gap-2 justify-center">
                  {[1, 2, 3, 5].map((num) => (
                    <button
                      key={num}
                      onClick={() => setCandleCount(num)}
                      className={cn(
                        "flex-1 py-2 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1",
                        candleCount === num
                          ? "bg-[#C91F5A] text-white border-[#C91F5A]"
                          : "bg-[#FFF0F3] text-[#4A3038] border-[#FFC5D0]"
                      )}
                    >
                      🕯️ {num} Lilin
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* BLOW CANDLES ACTION BUTTON */}
          <button
            onClick={triggerBlowCandles}
            disabled={isBlowing}
            className="w-full py-3.5 bg-gradient-to-r from-[#FF5E83] to-[#C91F5A] hover:from-[#C91F5A] hover:to-[#A81748] text-white font-bold rounded-2xl shadow-xl transition-transform active:scale-95 text-sm flex items-center justify-center gap-2 disabled:opacity-70"
          >
            <Flame size={18} fill="white" />
            <span>
              {isBlowing
                ? "Meniup Lilin... 💨"
                : "Selesai & Tiup Lilin Ultah 🕯️✨"}
            </span>
          </button>
        </div>
      ) : (
        /* ═══════════ CELEBRATION VIEW ═══════════ */
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center py-4 space-y-4 w-full"
        >
          <div className="w-20 h-20 bg-gradient-to-tr from-[#FF5E83] to-[#FF9EBE] text-white rounded-3xl flex items-center justify-center mx-auto shadow-xl">
            <Trophy size={40} />
          </div>

          <div className="space-y-1">
            <h3 className="font-display text-2xl text-[#C91F5A]">
              Kue Ultah Selesai! 🎂✨
            </h3>
            <p className="text-xs text-[#8B717A] uppercase font-bold tracking-wider">
              Karya Studio Dekor Kue
            </p>
          </div>

          <div className="bg-[#FFF0F3] p-4 rounded-3xl border-2 border-[#FFC5D0] space-y-2 shadow-inner text-left">
            <p className="text-xs font-bold text-[#C91F5A]">
              Varian: {FLAVORS[flavor].emoji} {FLAVORS[flavor].name}
            </p>
            <p className="text-xs text-[#8B717A]">
              Hiasan: {placedToppings.length} dekorasi
              {activePatterns.size > 0 && ` + ${activePatterns.size} taburan`}
            </p>
            <p className="text-xs text-[#8B717A]">
              Lilin: {candleCount} buah
            </p>
            <p className="font-handwriting text-lg text-[#4A3038] pt-2 text-center">
              &quot;Kue spesial untuk Azkia yang ke-{age}! Selamat ulang tahun!
              👑✨&quot;
            </p>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <button
              onClick={resetGame}
              className="w-full py-3 bg-white border-2 border-[#FFC5D0] text-[#C91F5A] font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-[#FFE4EC] transition-colors text-sm shadow-sm"
            >
              <RefreshCw size={16} /> Dekor Ulang Kue 🎂
            </button>
            <button
              onClick={saveCakeAndComplete}
              className="w-full py-3.5 bg-gradient-to-r from-[#2F7D5C] to-[#246247] text-white font-bold rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-95 text-base"
            >
              <CheckCircle2 size={20} /> Simpan Karya &amp; Selesai
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
