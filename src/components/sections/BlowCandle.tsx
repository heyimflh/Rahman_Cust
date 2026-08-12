"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/Button";
import { useSafeStorage } from "@/hooks/useSafeStorage";
import { profile } from "@/data/profile";
import {
  Sparkles,
  Wind,
  Lock,
  Star,
  RotateCcw,
  Wand2,
  Send,
  Feather,
  Palette
} from "lucide-react";
import {
  CakeSVG,
  DecoratedCakeData,
  DEFAULT_DECORATED_CAKE
} from "@/components/ui/CakeSVG";

interface SmokeParticle {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface CelebrationSparkle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
}

function getAzkiaAge(): number {
  const birth = new Date(profile.birthDate);
  const target = new Date(profile.targetBirthday);
  return target.getFullYear() - birth.getFullYear();
}

export function BlowCandle() {
  const age = useMemo(() => getAzkiaAge(), []);

  // Retrieve decorated cake from localStorage (from QuickCake game)
  const [savedCakeRaw] = useSafeStorage("decoratedCake", "");
  
  const cakeData: DecoratedCakeData = useMemo(() => {
    if (savedCakeRaw) {
      try {
        const parsed = JSON.parse(savedCakeRaw);
        if (parsed && parsed.flavor) {
          return {
            flavor: parsed.flavor,
            placedToppings: parsed.placedToppings || [],
            activePatterns: parsed.activePatterns || [],
            candleCount: parsed.candleCount || 3,
          };
        }
      } catch (e) {
        // fallback
      }
    }
    return DEFAULT_DECORATED_CAKE;
  }, [savedCakeRaw]);

  const candleCount = cakeData.candleCount || 3;
  const cakeKey = typeof savedCakeRaw === "string" ? savedCakeRaw : JSON.stringify(savedCakeRaw || "");

  // Candle Flames Lit State Array
  const [candles, setCandles] = useState<boolean[]>(() =>
    Array.from({ length: candleCount }, () => true)
  );

  // Sync candles array & reset blow state whenever cakeKey or candleCount changes
  useEffect(() => {
    setCandles(Array.from({ length: candleCount }, () => true));
    setAllBlown(false);
    setBlowProgress(0);
  }, [candleCount, cakeKey]);

  const [isBlowing, setIsBlowing] = useState<boolean>(false);
  const [blowProgress, setBlowProgress] = useState<number>(0);
  const [allBlown, setAllBlown] = useState<boolean>(false);
  const [smokeParticles, setSmokeParticles] = useState<SmokeParticle[]>([]);
  const [celebrationSparkles, setCelebrationSparkles] = useState<CelebrationSparkle[]>([]);

  // Wish Storage
  const [wish, setWish] = useSafeStorage("birthdayWish", "");
  const [tempWish, setTempWish] = useState<string>(wish);
  const [isWishSaved, setIsWishSaved] = useState<boolean>(Boolean(wish));

  const blowIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Check if all candles are blown
  const checkAllBlown = (updatedCandles: boolean[]) => {
    const isDone = updatedCandles.every((c) => !c);
    if (isDone) {
      setAllBlown(true);
      triggerCelebration();
    }
  };

  // Spawn smoke effect when candle is extinguished
  const spawnSmoke = (candleIndex: number) => {
    const xPos = (candleIndex - Math.floor(candleCount / 2)) * 35;
    const newSmokes: SmokeParticle[] = Array.from({ length: 5 }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      x: xPos + (Math.random() - 0.5) * 15,
      y: -20 - i * 10,
      size: Math.random() * 12 + 8,
    }));
    setSmokeParticles((prev) => [...prev, ...newSmokes]);

    setTimeout(() => {
      setSmokeParticles((prev) => prev.filter((s) => !newSmokes.find((ns) => ns.id === s.id)));
    }, 1800);
  };

  // Trigger celebration sparkles when all candles go out
  const triggerCelebration = useCallback(() => {
    const colors = ["#FFD700", "#FF6688", "#FFF1A8", "#00E5FF", "#FF80BF", "#A8E6CF"];
    const sparkles: CelebrationSparkle[] = Array.from({ length: 26 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 360,
      y: (Math.random() - 0.5) * 200 - 40,
      color: colors[Math.floor(Math.random() * colors.length)] || "#FFD700",
      size: Math.random() * 10 + 6,
    }));
    setCelebrationSparkles(sparkles);

    setTimeout(() => {
      setCelebrationSparkles([]);
    }, 3000);
  }, []);

  // Individual Candle Click Blow
  const blowIndividualCandle = (index: number) => {
    if (!candles[index]) return;
    const nextCandles = [...candles];
    nextCandles[index] = false;
    setCandles(nextCandles);
    spawnSmoke(index);
    checkAllBlown(nextCandles);
  };

  // Press & Hold Blow Mechanism
  const handlePointerDown = () => {
    if (allBlown) return;
    setIsBlowing(true);

    blowIntervalRef.current = setInterval(() => {
      setBlowProgress((prev) => {
        const nextProgress = prev + 7;

        // Extinguish candles progressively based on count
        setCandles((currCandles) => {
          const updated = [...currCandles];
          const total = updated.length;
          
          for (let i = 0; i < total; i++) {
            const threshold = ((i + 1) / total) * 90;
            if (nextProgress >= threshold && updated[i]) {
              updated[i] = false;
              spawnSmoke(i);
            }
          }

          if (updated.every((c) => !c)) {
            setAllBlown(true);
            triggerCelebration();
            clearInterval(blowIntervalRef.current as NodeJS.Timeout);
            setIsBlowing(false);
          }
          return updated;
        });

        if (nextProgress >= 100) {
          clearInterval(blowIntervalRef.current as NodeJS.Timeout);
          setIsBlowing(false);
          return 100;
        }

        return nextProgress;
      });
    }, 75);
  };

  const handlePointerUp = () => {
    setIsBlowing(false);
    if (blowIntervalRef.current) {
      clearInterval(blowIntervalRef.current);
    }
  };

  const handleSaveWish = () => {
    if (!tempWish.trim()) return;
    setWish(tempWish);
    setIsWishSaved(true);
  };

  const handleResetRitual = () => {
    setCandles(Array.from({ length: candleCount }, () => true));
    setAllBlown(false);
    setBlowProgress(0);
  };

  const isCustomDecorated = Boolean(savedCakeRaw);

  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 bg-gradient-to-b from-[#1C0B12] via-[#2A121D] to-[#12070C] text-[#FFF9FB] relative overflow-hidden select-none">
      
      {/* Dynamic Ambient Candle Glow Background Effect */}
      <div
        className="absolute inset-0 transition-opacity duration-1000 pointer-events-none"
        style={{
          background: allBlown
            ? "radial-gradient(circle at 50% 45%, rgba(255, 102, 136, 0.15), transparent 70%)"
            : "radial-gradient(circle at 50% 45%, rgba(255, 184, 0, 0.28), rgba(201, 31, 90, 0.12), transparent 70%)",
        }}
      />

      {/* Floating Magic Stars */}
      <div className="absolute inset-0 bg-[radial-gradient(#FFF9FB_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.08] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-3"
        >
          <div className="inline-flex items-center gap-2 bg-[#FF6688]/15 border border-[#FF6688]/30 text-[#FF809B] px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-widest shadow-sm">
            <Wand2 size={14} className="text-[#FF809B]" />
            <span>Ritual Wajib Sebelum Makan Kue 🕯️</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#FFD8C8] tracking-tight drop-shadow-md">
            {allBlown ? "make a wish ✨" : "saatnya tiup lilin"}
          </h2>

          <p className="text-white/75 text-base md:text-lg max-w-lg mx-auto font-body leading-relaxed">
            {allBlown
              ? "Semua lilin udah padam! Sekarang, ucapin aja harapan terbaik kamu ke semesta \u2014 nggak perlu keras-keras, cukup di hati."
              : "Tahan tombol tiup di bawah, atau sentuh langsung api lilinnya buat matiin pelan-pelan."}
          </p>

          {/* Custom / Default Cake Indicator Badge */}
          <div className="pt-1 flex justify-center">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 bg-amber-400/10 px-3.5 py-1 rounded-full border border-amber-400/20">
              <Palette size={13} />
              <span>
                {isCustomDecorated
                  ? "Kue Spesial Hasil Dekorasimu Di Mini Game! 🎨✨"
                  : "Kue Ultah Spesial Azkia (Bisa didekor di Mini Game!) 🎂"}
              </span>
            </span>
          </div>
        </motion.div>

        {/* Cake & Candles Visual Stage */}
        <div className="relative py-4 flex flex-col items-center justify-center min-h-[360px]">
          
          {/* Ambient Candle Light Circle Floor Halo */}
          <div
            className={`w-72 sm:w-96 h-28 rounded-[100%] transition-all duration-700 blur-2xl pointer-events-none absolute bottom-6 ${
              allBlown ? "bg-pink-500/10 scale-90" : "bg-amber-400/35 scale-110"
            }`}
          />

          {/* Smoke Particles */}
          <AnimatePresence>
            {!allBlown && (
              <div className="absolute top-10 pointer-events-none z-20">
                {smokeParticles.map((s) => (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0.8, y: 0, scale: 0.5 }}
                    animate={{ opacity: 0, y: s.y - 45, scale: 1.8, x: s.x }}
                    transition={{ duration: 1.8, ease: "easeOut" }}
                    className="absolute rounded-full bg-white/40 blur-xs"
                    style={{ width: `${s.size}px`, height: `${s.size}px` }}
                  />
                ))}
              </div>
            )}
          </AnimatePresence>

          {/* SVG 3D Cake Renderer */}
          <div className="w-full max-w-sm sm:max-w-md h-[340px] sm:h-[380px] relative z-10">
            <CakeSVG
              flavor={cakeData.flavor}
              placedToppings={cakeData.placedToppings}
              activePatterns={cakeData.activePatterns}
              candleCount={candleCount}
              candlesStatus={candles}
              isBlown={allBlown}
              isBlowing={isBlowing}
              age={age}
              onCandleClick={blowIndividualCandle}
            />
          </div>

          {/* Celebration Sparkles Burst */}
          {celebrationSparkles.map((sp) => (
            <motion.div
              key={sp.id}
              initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
              animate={{ opacity: 0, scale: 1.6, x: sp.x, y: sp.y }}
              transition={{ duration: 2.2, ease: "easeOut" }}
              className="absolute rounded-full pointer-events-none z-30"
              style={{
                width: `${sp.size}px`,
                height: `${sp.size}px`,
                backgroundColor: sp.color,
                boxShadow: `0 0 10px ${sp.color}`,
              }}
            />
          ))}

        </div>

        {/* Interaction Controls / Wish Capsule Area */}
        <div className="max-w-md mx-auto">
          {!allBlown ? (
            <div className="space-y-4">
              
              {/* Wind Blowing Stream Progress Indicator */}
              <div className="w-full bg-white/10 rounded-full h-2.5 p-0.5 overflow-hidden border border-white/20">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-300 rounded-full"
                  animate={{ width: `${blowProgress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>

              {/* Hold to Blow Button */}
              <button
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
                className={`w-full py-4 px-8 rounded-2xl font-display text-lg sm:text-xl uppercase tracking-wider transition-all duration-300 shadow-2xl flex items-center justify-center gap-3 border ${
                  isBlowing
                    ? "bg-[#C91F5A] text-white scale-95 border-pink-300 shadow-inner"
                    : "bg-gradient-to-r from-[#FF5E83] to-[#C91F5A] hover:from-[#C91F5A] hover:to-[#A81748] text-white border-pink-400/50 hover:shadow-pink-500/30"
                }`}
              >
                <Wind size={22} className={isBlowing ? "animate-spin" : ""} />
                <span>{isBlowing ? "fffffuuhhhhh... 💨" : "Tahan Tombol Untuk Meniup 💨"}</span>
              </button>

              <p className="text-xs text-white/50">
                Atau sentuh langsung api lilin pada kue untuk memadamkannya satu per satu! 🕯️
              </p>

            </div>
          ) : (
            /* Sacred Wish Capsule Form */
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 sm:p-8 space-y-6 text-left shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-amber-400/20 text-amber-300 rounded-xl border border-amber-300/30">
                    <Star size={20} fill="currentColor" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-[#FFD8C8]">Sacred Wish Capsule</h3>
                    <p className="text-xs text-white/60">Tersimpan rahasia hanya di HP kamu 🔒</p>
                  </div>
                </div>

                <button
                  onClick={handleResetRitual}
                  title="Ulangi Tiup Lilin"
                  className="p-2 text-white/60 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors"
                >
                  <RotateCcw size={16} />
                </button>
              </div>

              <blockquote className="font-handwriting text-2xl text-[#FFD8C8] leading-relaxed italic text-center">
                "Harapannya rahasia ya, jangan dibocorin... tapi semoga semua yang baik-baik emang lagi otw ke kamu." 💖
              </blockquote>

              {isWishSaved && wish ? (
                <div className="space-y-4 pt-2">
                  <div className="p-4 bg-white/10 rounded-2xl border border-amber-300/30 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-extrabold text-amber-300 uppercase tracking-wider">
                      <Lock size={14} />
                      <span>Harapan Udah Disimpen ✨</span>
                    </div>
                    <p className="text-sm font-medium text-white/90 leading-relaxed italic">
                      "{wish}"
                    </p>
                  </div>

                  <Button
                    onClick={() => setIsWishSaved(false)}
                    variant="outline"
                    className="w-full text-white border-white/30 hover:bg-white/10"
                  >
                    <Feather size={15} className="mr-2" /> Edit / Tulis Ulang Harapan
                  </Button>
                </div>
              ) : (
                <div className="space-y-4 pt-2">
                  <textarea
                    value={tempWish}
                    onChange={(e) => setTempWish(e.target.value)}
                    placeholder="Tuliskan harapan terindah Azkia di sini (misal: semoga selalu bahagia, makin sukses, dan sehat selalu)..."
                    className="w-full h-32 px-4 py-3 bg-white/15 border border-white/25 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-[#FF5E83] focus:ring-2 focus:ring-[#FF5E83]/30 resize-none text-sm font-body leading-relaxed"
                  />

                  <Button
                    onClick={handleSaveWish}
                    disabled={!tempWish.trim()}
                    className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-[#4A3038] font-extrabold shadow-lg disabled:opacity-50"
                  >
                    <Send size={16} className="mr-2" /> Simpan Harapan Rahasia ✨
                  </Button>
                </div>
              )}

            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
}
