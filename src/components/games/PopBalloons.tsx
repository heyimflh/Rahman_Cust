"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, CheckCircle2, Heart, RefreshCw, Trophy, Zap, Gift, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { MimiBunny } from "@/components/mascots/MimiBunny";

interface SecretWish {
  id: number;
  text: string;
  category: string;
}

const secretWishes: SecretWish[] = [
  { id: 1, text: "Semoga Azkia selalu dikelilingi tawa, kebahagiaan, dan kasih sayang setiap hari! 🌸", category: "Doa Utama" },
  { id: 2, text: "Impian, cita-cita, dan semua hal yang kamu perjuangkan dilancarkan satu per satu! 🌟", category: "Karir & Cita" },
  { id: 3, text: "Selalu jadi pribadi yang hangat, cerita, dan bikin suasana sekeliling lebih hidup! 💖", category: "Vibe Positif" },
  { id: 4, text: "Sehat fisik & pikiran, penuh kedamaian, dan selalu dijauhkan dari hal-hal kurang baik! 🛡️", category: "Kesehatan" },
  { id: 5, text: "Semoga hari-harimu manis kayak kue ultah paling lezat! 🍭", category: "Manisnya Hidup" },
  { id: 6, text: "Makin berani mencoba hal-hal baru dan menikmati petualangan yang seru! 🚲", category: "Petualangan" },
  { id: 7, text: "Semua kebaikan dan kehangatan yang kamu bagikan bakal balik 100x lipat ke kamu! ✨", category: "Keberkahan" },
  { id: 8, text: "Kamu sangat berharga, hebat, dan selalu jadi alasan tersenyum bagi yang mengenalmu! 🏆", category: "Pesan Spesial" },
];

interface FloatingBalloon {
  id: number;
  wishId: number | null; // Null for bonus star balloons
  color: string;
  shadowColor: string;
  emoji: string;
  x: number; // percentage 5-85
  y: number; // percentage 0-100
  speed: number;
  wobbleSpeed: number;
  wobbleAmp: number;
  wobblePhase: number;
  size: number;
  popped: boolean;
}

interface PopParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  opacity: number;
}

interface PopText {
  id: number;
  x: number;
  y: number;
  text: string;
}

export default function PopBalloons({ onComplete }: { onComplete: () => void }) {
  const [gameState, setGameState] = useState<"start" | "playing" | "ended">("start");
  const [score, setScore] = useState(0);
  const [collectedWishes, setCollectedWishes] = useState<SecretWish[]>([]);
  const [activeModalWish, setActiveModalWish] = useState<SecretWish | null>(null);
  
  const [balloons, setBalloons] = useState<FloatingBalloon[]>([]);
  const [particles, setParticles] = useState<PopParticle[]>([]);
  const [popTexts, setPopTexts] = useState<PopText[]>([]);
  
  const animFrameId = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const spawnTimerRef = useRef<number>(0);
  const balloonIdRef = useRef<number>(0);
  const playfieldRef = useRef<HTMLDivElement>(null);

  // Spawn confetti particles on balloon pop
  const spawnPopParticles = (x: number, y: number, color: string) => {
    const newParticles: PopParticle[] = [];
    for (let i = 0; i < 12; i++) {
      newParticles.push({
        id: Math.random(),
        x,
        y,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.5) * 12,
        color,
        size: Math.random() * 8 + 4,
        opacity: 1,
      });
    }
    setParticles(prev => [...prev.slice(-40), ...newParticles]);
  };

  // Spawn "POP!" text
  const spawnPopText = (x: number, y: number, text: string) => {
    const newText: PopText = { id: Math.random(), x, y, text };
    setPopTexts(prev => [...prev.slice(-6), newText]);
    setTimeout(() => {
      setPopTexts(prev => prev.filter(t => t.id !== newText.id));
    }, 700);
  };

  // Main 60FPS Game Physics Loop
  useEffect(() => {
    if (gameState !== "playing") return;

    const colors = [
      { bg: "bg-[#FF9EBE]", shadow: "shadow-[#FF9EBE]/50", hex: "#FF9EBE" },
      { bg: "bg-[#FFC5D0]", shadow: "shadow-[#FFC5D0]/50", hex: "#FFC5D0" },
      { bg: "bg-[#B2EBF2]", shadow: "shadow-[#B2EBF2]/50", hex: "#B2EBF2" },
      { bg: "bg-[#FFEAA7]", shadow: "shadow-[#FFEAA7]/50", hex: "#FFEAA7" },
      { bg: "bg-[#D4EAFA]", shadow: "shadow-[#D4EAFA]/50", hex: "#D4EAFA" },
      { bg: "bg-[#E1BEE7]", shadow: "shadow-[#E1BEE7]/50", hex: "#E1BEE7" },
      { bg: "bg-[#C8E6C9]", shadow: "shadow-[#C8E6C9]/50", hex: "#C8E6C9" },
    ];

    const updateGame = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const dt = Math.min((timestamp - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = timestamp;

      // 1. Periodically spawn balloons
      spawnTimerRef.current += dt;
      if (spawnTimerRef.current >= 0.75) {
        spawnTimerRef.current = 0;

        // Check if there are still uncollected wishes
        const uncollected = secretWishes.filter(w => !collectedWishes.some(cw => cw.id === w.id));
        let assignedWishId: number | null = null;
        let emoji = "🎈";

        if (uncollected.length > 0 && Math.random() > 0.3) {
          const randWish = uncollected[Math.floor(Math.random() * uncollected.length)]!;
          assignedWishId = randWish.id;
          emoji = "💌";
        } else if (Math.random() > 0.5) {
          emoji = "⭐️";
        } else {
          emoji = "🎈";
        }

        const colorObj = colors[Math.floor(Math.random() * colors.length)]!;

        const newBalloon: FloatingBalloon = {
          id: ++balloonIdRef.current,
          wishId: assignedWishId,
          color: colorObj.bg,
          shadowColor: colorObj.shadow,
          emoji,
          x: Math.random() * 75 + 10,
          y: 105, // start below bottom
          speed: Math.random() * 18 + 15,
          wobbleSpeed: Math.random() * 3 + 2,
          wobbleAmp: Math.random() * 4 + 2,
          wobblePhase: Math.random() * Math.PI * 2,
          size: Math.random() * 12 + 64, // 64px to 76px
          popped: false,
        };

        setBalloons(prev => [...prev.slice(-15), newBalloon]);
      }

      // 2. Move balloons upward & wobble
      setBalloons(prevBalloons =>
        prevBalloons
          .map(b => {
            if (b.popped) return b;
            const newY = b.y - b.speed * dt;
            const newWobble = b.wobblePhase + b.wobbleSpeed * dt;
            const newX = b.x + Math.sin(newWobble) * b.wobbleAmp * dt;
            return {
              ...b,
              y: newY,
              x: newX,
              wobblePhase: newWobble,
            };
          })
          .filter(b => b.y > -20 && !b.popped)
      );

      // 3. Update particles
      setParticles(prev =>
        prev
          .map(p => ({
            ...p,
            x: p.x + p.vx * 0.1,
            y: p.y + p.vy * 0.1,
            opacity: p.opacity - 0.05,
          }))
          .filter(p => p.opacity > 0)
      );

      animFrameId.current = requestAnimationFrame(updateGame);
    };

    animFrameId.current = requestAnimationFrame(updateGame);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [gameState, collectedWishes]);

  // Pop Balloon Click Handler
  const handlePop = (balloon: FloatingBalloon) => {
    if (balloon.popped) return;

    // Mark popped
    setBalloons(prev => prev.map(b => (b.id === balloon.id ? { ...b, popped: true } : b)));
    spawnPopParticles(balloon.x, balloon.y, "#FF5E83");

    if (balloon.wishId !== null) {
      // It contained a wish!
      const wishObj = secretWishes.find(w => w.id === balloon.wishId);
      if (wishObj && !collectedWishes.some(cw => cw.id === wishObj.id)) {
        setCollectedWishes(prev => [...prev, wishObj]);
        setActiveModalWish(wishObj);
        spawnPopText(balloon.x, balloon.y, "💌 DOSA TERKUMPUL!");
      }
      setScore(s => s + 25);
    } else {
      // Regular or star balloon
      setScore(s => s + 10);
      spawnPopText(balloon.x, balloon.y, "POP! 🎈 +10");
    }

    // Check if all 8 wishes are collected
    if (collectedWishes.length + (balloon.wishId !== null ? 1 : 0) >= secretWishes.length) {
      setTimeout(() => {
        setGameState("ended");
      }, 1000);
    }
  };

  const startGame = () => {
    setScore(0);
    setCollectedWishes([]);
    setActiveModalWish(null);
    setBalloons([]);
    setParticles([]);
    setPopTexts([]);
    setGameState("playing");
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3 select-none">
      {gameState === "start" && (
        <div className="text-center py-6 space-y-4 max-w-sm mx-auto">
          <div className="relative flex justify-center">
            <MimiBunny state="excited" className="w-20 h-24 hover:rotate-6 transition-transform drop-shadow-md" />
          </div>

          <div className="space-y-1">
            <h3 className="font-display text-3xl text-[#C91F5A]">Balon Harapan! 🎈✨</h3>
            <p className="text-xs text-[#C91F5A] font-bold uppercase tracking-wider">Pop & Reveal Wishes</p>
          </div>

          <p className="text-sm text-[#8B717A] leading-relaxed font-body">
            Pecahkan balon-balon pastel yang melayang untuk membuka 8 pesan doa & harapan tersembunyi buat Azkia!
          </p>

          <button
            onClick={startGame}
            className="w-full py-3.5 bg-gradient-to-r from-[#FF5E83] to-[#C91F5A] hover:from-[#C91F5A] hover:to-[#A81748] text-white font-bold rounded-2xl shadow-xl transition-all active:scale-95 text-base flex items-center justify-center gap-2"
          >
            <span>Mulai Pecahkan Balon!</span> 🎈
          </button>
        </div>
      )}

      {gameState === "playing" && (
        <div className="w-full max-w-lg space-y-2">
          {/* Top Bar Stats */}
          <div className="flex justify-between items-center bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl border-2 border-[#FFC5D0] shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#C91F5A] uppercase tracking-wider">Pesan Terkumpul:</span>
              <span className="text-lg font-display text-[#C91F5A] bg-[#FFE4EC] px-3 py-0.5 rounded-full border border-[#FFC5D0]">
                {collectedWishes.length} / {secretWishes.length}
              </span>
            </div>

            <div className="flex items-center gap-1.5 font-bold text-[#8B717A] text-xs">
              <span>Skor:</span>
              <span className="text-lg font-display text-[#C91F5A]">{score}</span>
            </div>
          </div>

          {/* Floating Balloons Sky Playfield */}
          <div
            ref={playfieldRef}
            className="relative w-full h-80 md:h-96 rounded-3xl border-4 border-[#FFC5D0] bg-gradient-to-b from-[#FFF0F3] via-[#FFE4EC] to-[#FFD1DC] overflow-hidden shadow-2xl touch-none cursor-pointer"
          >
            {/* Pop Text Popups */}
            {popTexts.map(t => (
              <motion.div
                key={t.id}
                initial={{ opacity: 1, y: 0, scale: 0.8 }}
                animate={{ opacity: 0, y: -30, scale: 1.2 }}
                transition={{ duration: 0.6 }}
                className="absolute font-display font-bold text-xs md:text-sm text-[#C91F5A] pointer-events-none z-30 drop-shadow-sm bg-white/90 px-2 py-0.5 rounded-full border border-[#FFC5D0]"
                style={{ left: `${t.x}%`, top: `${t.y}%` }}
              >
                {t.text}
              </motion.div>
            ))}

            {/* Particle Burst Effects */}
            {particles.map(p => (
              <div
                key={p.id}
                className="absolute rounded-full pointer-events-none z-20"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  backgroundColor: p.color,
                  opacity: p.opacity,
                }}
              />
            ))}

            {/* Floating Balloons */}
            {balloons.map(b => (
              <motion.div
                key={b.id}
                onClick={() => handlePop(b)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1.3 }}
                className={cn(
                  "absolute rounded-full flex flex-col items-center justify-center cursor-pointer shadow-lg transition-transform z-10 border-2 border-white/60",
                  b.color,
                  b.shadowColor
                )}
                style={{
                  left: `${b.x}%`,
                  top: `${b.y}%`,
                  width: `${b.size}px`,
                  height: `${b.size * 1.25}px`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {/* Shiny Highlight */}
                <div className="absolute top-2 left-3 w-4 h-7 bg-white/45 rounded-full rotate-[-25deg]" />
                
                <span className="text-xl md:text-2xl drop-shadow-sm">{b.emoji}</span>

                {/* Balloon String Knot */}
                <div className="absolute -bottom-1 w-2.5 h-2 bg-inherit rounded-xs" />
                <div className="absolute -bottom-5 w-0.5 h-5 bg-gray-400/50" />
              </motion.div>
            ))}

            {/* Tap Instructions Hint */}
            {collectedWishes.length === 0 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md text-[#C91F5A] px-4 py-1.5 rounded-full text-xs font-semibold shadow-md pointer-events-none border border-[#FFC5D0] animate-bounce">
                👉 Tap/Klik balon yang melayang! 🎈
              </div>
            )}
          </div>

          {/* Collected Wishes Mini Album Bar */}
          {collectedWishes.length > 0 && (
            <div className="bg-white p-3 rounded-2xl border-2 border-[#FFC5D0] space-y-1.5 shadow-sm">
              <span className="text-[10px] font-bold text-[#8B717A] uppercase tracking-wider block">
                Album Harapan Terbuka ({collectedWishes.length}/8):
              </span>
              <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
                {collectedWishes.map((w, idx) => (
                  <button
                    key={w.id}
                    onClick={() => setActiveModalWish(w)}
                    className="flex-shrink-0 bg-[#FFF0F3] hover:bg-[#FFE4EC] border border-[#FFC5D0] text-[#C91F5A] text-xs px-3 py-1.5 rounded-xl font-medium flex items-center gap-1 shadow-xs transition-transform active:scale-95"
                  >
                    <span>💌 Harapan #{idx + 1}</span>
                    <Eye size={12} />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Wish Popup Modal */}
      <AnimatePresence>
        {activeModalWish && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              className="bg-white border-4 border-[#FFC5D0] p-6 rounded-3xl shadow-2xl max-w-sm w-full text-center space-y-4 relative overflow-hidden"
            >
              <div className="w-14 h-14 bg-[#FFE4EC] text-[#C91F5A] rounded-full flex items-center justify-center mx-auto shadow-md">
                <Heart size={28} className="fill-[#C91F5A]" />
              </div>

              <div className="space-y-1">
                <span className="bg-[#FF5E83] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full inline-block">
                  {activeModalWish.category}
                </span>
                <h4 className="font-display text-2xl text-[#C91F5A]">Pesan Harapan</h4>
              </div>

              <p className="font-handwriting text-2xl text-[#4A3038] leading-relaxed bg-[#FFF9FB] p-4 rounded-2xl border border-[#FFC5D0]">
                &quot;{activeModalWish.text}&quot;
              </p>

              <button
                onClick={() => setActiveModalWish(null)}
                className="w-full py-3 bg-[#C91F5A] hover:bg-[#A81748] text-white font-bold rounded-2xl shadow-lg transition-transform active:scale-95 text-sm"
              >
                Simpan & Lanjut Main ✨
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Completion View */}
      {gameState === "ended" && (
        <div className="text-center py-6 space-y-4 max-w-sm mx-auto animate-in fade-in zoom-in duration-300">
          <div className="w-20 h-20 bg-gradient-to-tr from-[#FF5E83] to-[#FF9EBE] text-white rounded-3xl flex items-center justify-center mx-auto shadow-xl">
            <Trophy size={40} />
          </div>

          <div className="space-y-1">
            <h3 className="font-display text-3xl text-[#C91F5A]">Semua Balon Terbuka! 🎈✨</h3>
            <p className="text-xs text-[#8B717A] uppercase font-bold tracking-wider">8 Pesan Doa & Harapan Lengkap</p>
          </div>

          <div className="bg-[#FFF0F3] p-4 rounded-3xl border-2 border-[#FFC5D0] space-y-2 text-left">
            <p className="text-xs font-bold text-[#C91F5A] uppercase tracking-wider text-center">
              Pesan Terkumpul (8/8)
            </p>
            <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1 hide-scrollbar">
              {collectedWishes.map((w, idx) => (
                <div key={w.id} className="text-xs bg-white p-2 rounded-xl border border-[#FFC5D0] font-handwriting text-base text-[#4A3038]">
                  #{idx + 1} {w.text}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <button
              onClick={startGame}
              className="w-full py-3 bg-white border-2 border-[#FFC5D0] text-[#C91F5A] font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-[#FFE4EC] transition-colors text-sm shadow-sm"
            >
              <RefreshCw size={16} /> Pecahkan Lagi 🎈
            </button>
            
            <button
              onClick={onComplete}
              className="w-full py-3.5 bg-gradient-to-r from-[#2F7D5C] to-[#246247] text-white font-bold rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-95 text-base"
            >
              <CheckCircle2 size={20} /> Simpan Harapan & Selesai
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
