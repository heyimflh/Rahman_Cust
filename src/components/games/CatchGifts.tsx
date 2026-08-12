"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Trophy, RefreshCw, Sparkles, CheckCircle2, ArrowLeft, ArrowRight, Flame, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface FallingItem {
  id: number;
  type: "gift" | "cupcake" | "star" | "crown" | "magnet" | "bomb";
  emoji: string;
  pts: number;
  x: number; // 0 to 100%
  y: number; // 0 to 100%
  speed: number;
  rotation: number;
  rotSpeed: number;
  size: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  opacity: number;
}

interface ScorePopup {
  id: number;
  x: number;
  y: number;
  text: string;
  color: string;
}

export default function CatchGifts({ onComplete }: { onComplete: () => void }) {
  const [gameState, setGameState] = useState<"start" | "playing" | "ended">("start");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(25);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [isFever, setIsFever] = useState(false);
  const [hasMagnet, setHasMagnet] = useState(false);
  const [screenShake, setScreenShake] = useState(false);

  // Position & Basket Physics
  const [basketX, setBasketX] = useState(50); // 0 to 100
  const targetBasketX = useRef(50);
  const basketVelX = useRef(0);
  const [basketSquish, setBasketSquish] = useState(1);
  const [basketTilt, setBasketTilt] = useState(0);

  // Dynamic game arrays
  const [items, setItems] = useState<FallingItem[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [popups, setPopups] = useState<ScorePopup[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameId = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const spawnTimerRef = useRef<number>(0);
  const itemIdRef = useRef<number>(0);

  // Spawns confetti / particles on catch
  const spawnParticles = useCallback((x: number, y: number, color: string) => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 10; i++) {
      newParticles.push({
        id: Math.random(),
        x,
        y,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.8) * 6,
        color,
        size: Math.random() * 6 + 4,
        opacity: 1,
      });
    }
    setParticles(prev => [...prev.slice(-30), ...newParticles]);
  }, []);

  // Spawns score popup text
  const spawnPopup = useCallback((x: number, y: number, text: string, color: string) => {
    const newPopup: ScorePopup = {
      id: Math.random(),
      x,
      y,
      text,
      color,
    };
    setPopups(prev => [...prev.slice(-5), newPopup]);
    setTimeout(() => {
      setPopups(prev => prev.filter(p => p.id !== newPopup.id));
    }, 800);
  }, []);

  // Handle Keyboard movement
  useEffect(() => {
    if (gameState !== "playing") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        targetBasketX.current = Math.max(5, targetBasketX.current - 10);
      }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        targetBasketX.current = Math.min(90, targetBasketX.current + 10);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState]);

  // Pointer / Mouse / Touch Movement
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (gameState !== "playing" || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const percent = (relativeX / rect.width) * 100;
    targetBasketX.current = Math.min(Math.max(percent, 5), 90);
  };

  // Timer countdown & Fever Mode timers
  useEffect(() => {
    if (gameState !== "playing") return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameState("ended");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  // Main 60FPS Game Engine Loop
  useEffect(() => {
    if (gameState !== "playing") return;

    const updateGame = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const dt = Math.min((timestamp - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = timestamp;

      // 1. Smooth Spring Physics for Basket Movement
      const dx = targetBasketX.current - basketX;
      basketVelX.current = dx * 12 * dt;
      const newBasketX = basketX + basketVelX.current;
      setBasketX(newBasketX);
      setBasketTilt(basketVelX.current * 2.5); // Tilt basket based on movement speed

      // 2. Spawn items periodically
      spawnTimerRef.current += dt;
      const spawnRate = isFever ? 0.25 : 0.45; // Faster during fever
      
      if (spawnTimerRef.current >= spawnRate) {
        spawnTimerRef.current = 0;

        const types: Array<FallingItem["type"]> = ["gift", "cupcake", "star", "crown", "magnet", "bomb"];
        const rand = Math.random();
        
        let type: FallingItem["type"] = "gift";
        let emoji = "🎁";
        let pts = 10;
        let size = 28;

        if (isFever) {
          type = rand > 0.3 ? "crown" : "star";
          emoji = type === "crown" ? "👑" : "⭐️";
          pts = type === "crown" ? 30 : 20;
        } else {
          if (rand > 0.85) { type = "crown"; emoji = "👑"; pts = 30; size = 32; }
          else if (rand > 0.7) { type = "star"; emoji = "⭐️"; pts = 20; }
          else if (rand > 0.55) { type = "cupcake"; emoji = "🧁"; pts = 15; }
          else if (rand > 0.45 && Math.random() > 0.7) { type = "magnet"; emoji = "🧲"; pts = 5; }
          else if (rand < 0.18) { type = "bomb"; emoji = "💣"; pts = -15; }
        }

        setItems(prev => [
          ...prev,
          {
            id: ++itemIdRef.current,
            type,
            emoji,
            pts,
            x: Math.random() * 85 + 5,
            y: -5,
            speed: Math.random() * 25 + (isFever ? 40 : 25),
            rotation: Math.random() * 360,
            rotSpeed: (Math.random() - 0.5) * 100,
            size,
          },
        ]);
      }

      // 3. Update Item positions & check Catch Collisions
      setItems(prevItems => {
        const nextItems: FallingItem[] = [];

        prevItems.forEach(item => {
          let newX = item.x;
          let newY = item.y + item.speed * dt;
          const newRot = item.rotation + item.rotSpeed * dt;

          // Magnet Attraction Effect
          if (hasMagnet && item.type !== "bomb") {
            const pullDir = newBasketX - newX;
            newX += pullDir * 3 * dt;
          }

          // Catch Collision Check (Basket at bottom ~80%-90% Y)
          const basketCenter = newBasketX;
          const distanceX = Math.abs(newX - basketCenter);

          if (newY >= 76 && newY <= 92 && distanceX < 14) {
            // CATCH SUCCESS!
            setBasketSquish(1.3);
            setTimeout(() => setBasketSquish(1), 150);

            if (item.type === "bomb") {
              // BOMB HIT!
              setCombo(0);
              setScore(s => Math.max(0, s + item.pts));
              spawnPopup(newX, 75, "-15 💣", "#FF5E83");
              spawnParticles(newX, 75, "#FF5E83");
              setScreenShake(true);
              setTimeout(() => setScreenShake(false), 300);
            } else {
              // GOOD CATCH!
              const currentCombo = combo + 1;
              setCombo(currentCombo);
              if (currentCombo > maxCombo) setMaxCombo(currentCombo);

              // Combo Multiplier
              const multiplier = currentCombo >= 8 ? 3 : currentCombo >= 4 ? 2 : 1;
              const finalPts = item.pts * multiplier;

              setScore(s => s + finalPts);

              // Visual popup text & particles
              let popText = `+${finalPts}`;
              let popColor = "#FF5E83";

              if (multiplier > 1) {
                popText = `+${finalPts} 🔥 x${multiplier}`;
                popColor = "#FF9EBE";
              }

              if (item.type === "crown") {
                popText = `+${finalPts} 👑 FEVER!`;
                popColor = "#FFD700";
                setIsFever(true);
                setTimeout(() => setIsFever(false), 3500);
              } else if (item.type === "magnet") {
                popText = `MAGNET 🧲`;
                popColor = "#00ACC1";
                setHasMagnet(true);
                setTimeout(() => setHasMagnet(false), 4500);
              }

              spawnPopup(newX, 75, popText, popColor);
              spawnParticles(newX, 75, popColor);
            }
          } else if (newY < 105) {
            nextItems.push({ ...item, x: newX, y: newY, rotation: newRot });
          } else if (item.type !== "bomb") {
            // Missed a good item -> reset combo
            setCombo(0);
          }
        });

        return nextItems;
      });

      // 4. Update Particle Physics
      setParticles(prev =>
        prev
          .map(p => ({
            ...p,
            x: p.x + p.vx * 0.1,
            y: p.y + p.vy * 0.1,
            vy: p.vy + 0.3,
            opacity: p.opacity - 0.04,
          }))
          .filter(p => p.opacity > 0)
      );

      animFrameId.current = requestAnimationFrame(updateGame);
    };

    animFrameId.current = requestAnimationFrame(updateGame);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [gameState, basketX, combo, maxCombo, isFever, hasMagnet, spawnParticles, spawnPopup]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(25);
    setCombo(0);
    setMaxCombo(0);
    setBasketX(50);
    targetBasketX.current = 50;
    setItems([]);
    setParticles([]);
    setPopups([]);
    setIsFever(false);
    setHasMagnet(false);
    setGameState("playing");
  };

  useEffect(() => {
    if (score > highScore) setHighScore(score);
  }, [score, highScore]);

  return (
    <div className="flex flex-col items-center justify-center space-y-3 select-none">
      {gameState === "start" && (
        <div className="text-center py-6 space-y-4 max-w-sm mx-auto">
          <div className="w-20 h-20 bg-gradient-to-tr from-[#FF5E83] to-[#FF9EBE] text-white rounded-3xl flex items-center justify-center mx-auto shadow-xl animate-bounce">
            <Sparkles size={40} />
          </div>
          <div className="space-y-1">
            <h3 className="font-display text-3xl text-[#C91F5A]">Tangkap Kado Rush! 🎮</h3>
            <p className="text-xs text-[#C91F5A] font-bold uppercase tracking-wider">Arcade Birthday Edition</p>
          </div>
          <p className="text-sm text-[#8B717A] leading-relaxed font-body">
            Geser wadah kado untuk menangkap Kado 🎁, Kue 🧁, Bintang ⭐️, dan Mahkota 👑! Dapatkan Combo Beruntun 🔥 & Fever Mode ✨! Awas hindari Bom 💣!
          </p>
          <button
            onClick={startGame}
            className="w-full py-3.5 bg-gradient-to-r from-[#FF5E83] to-[#C91F5A] hover:from-[#C91F5A] hover:to-[#A81748] text-white font-bold rounded-2xl shadow-xl transition-all active:scale-95 text-base flex items-center justify-center gap-2"
          >
            <span>Mulai Bermain!</span> 🚀
          </button>
        </div>
      )}

      {gameState === "playing" && (
        <div className="w-full max-w-lg space-y-2">
          {/* Header Stats Bar */}
          <div className="flex justify-between items-center bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl border-2 border-[#FFC5D0] shadow-sm">
            <div className="flex items-center gap-2">
              <div className="flex flex-col">
                <span className="text-[10px] text-[#8B717A] uppercase font-bold tracking-wider">Skor</span>
                <span className="text-2xl font-display text-[#C91F5A] leading-none">{score}</span>
              </div>
              {combo >= 2 && (
                <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-extrabold px-2.5 py-0.5 rounded-full animate-bounce shadow-sm flex items-center gap-1">
                  <Flame size={12} fill="white" />
                  {combo}x Combo!
                </span>
              )}
              {isFever && (
                <span className="bg-gradient-to-r from-amber-400 to-yellow-500 text-white text-xs font-extrabold px-2.5 py-0.5 rounded-full animate-pulse shadow-sm flex items-center gap-1">
                  <Zap size={12} fill="white" /> FEVER!
                </span>
              )}
            </div>

            <div className="flex flex-col items-end">
              <span className="text-[10px] text-[#8B717A] uppercase font-bold tracking-wider">Waktu Sisa</span>
              <span className={cn("text-2xl font-display leading-none", timeLeft <= 5 ? "text-red-500 animate-ping" : "text-[#C91F5A]")}>
                {timeLeft}s
              </span>
            </div>
          </div>

          {/* Game Canvas Box */}
          <div
            ref={containerRef}
            onPointerMove={handlePointerMove}
            className={cn(
              "relative w-full h-80 md:h-96 rounded-3xl border-4 overflow-hidden select-none touch-none cursor-crosshair shadow-2xl transition-colors duration-500",
              isFever
                ? "bg-gradient-to-b from-[#FFF0F3] via-[#FFE4EC] to-[#FFD1DC] border-amber-400"
                : "bg-gradient-to-b from-[#FFF5F8] via-[#FFE8F0] to-[#FFD5E1] border-[#FFC5D0]",
              screenShake && "animate-bounce"
            )}
          >
            {/* Magnet Aura Glow Indicator */}
            {hasMagnet && (
              <div className="absolute inset-0 border-4 border-cyan-400/60 rounded-2xl pointer-events-none animate-pulse" />
            )}

            {/* Floating Score Popups */}
            {popups.map(p => (
              <motion.div
                key={p.id}
                initial={{ opacity: 1, y: 0, scale: 0.8 }}
                animate={{ opacity: 0, y: -45, scale: 1.3 }}
                transition={{ duration: 0.7 }}
                className="absolute font-display font-extrabold text-sm md:text-base pointer-events-none z-30 drop-shadow-md"
                style={{ left: `${p.x}%`, top: `${p.y}%`, color: p.color }}
              >
                {p.text}
              </motion.div>
            ))}

            {/* Particle Burst System */}
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

            {/* Falling Items */}
            {items.map(item => (
              <div
                key={item.id}
                className="absolute pointer-events-none transition-transform flex items-center justify-center drop-shadow-md z-10"
                style={{
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                  fontSize: `${item.size}px`,
                  transform: `rotate(${item.rotation}deg)`,
                }}
              >
                {item.emoji}
              </div>
            ))}

            {/* Smooth Spring Catcher Basket */}
            <div
              className="absolute bottom-3 h-14 w-22 bg-gradient-to-r from-[#FF5E83] to-[#C91F5A] text-white rounded-2xl flex items-center justify-center shadow-2xl border-2 border-white pointer-events-none transition-transform z-20"
              style={{
                left: `${basketX}%`,
                transform: `translateX(-50%) scaleY(${basketSquish}) rotate(${basketTilt}deg)`,
              }}
            >
              <div className="flex items-center justify-center gap-1">
                <span className="text-2xl drop-shadow-md">🧺</span>
                {hasMagnet && <span className="text-xs">🧲</span>}
              </div>
            </div>
          </div>

          {/* Quick Touch Controls */}
          <div className="flex justify-between items-center gap-3 pt-1">
            <button
              onClick={() => { targetBasketX.current = Math.max(5, targetBasketX.current - 20); }}
              className="flex-1 py-3 bg-white border-2 border-[#FFC5D0] active:bg-[#FFE4EC] rounded-2xl font-bold text-[#C91F5A] flex items-center justify-center gap-1 shadow-sm transition-transform active:scale-95 text-sm"
            >
              <ArrowLeft size={20} /> Kiri
            </button>
            <button
              onClick={() => { targetBasketX.current = Math.min(90, targetBasketX.current + 20); }}
              className="flex-1 py-3 bg-white border-2 border-[#FFC5D0] active:bg-[#FFE4EC] rounded-2xl font-bold text-[#C91F5A] flex items-center justify-center gap-1 shadow-sm transition-transform active:scale-95 text-sm"
            >
              Kanan <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}

      {gameState === "ended" && (
        <div className="text-center py-6 space-y-4 max-w-sm mx-auto animate-in fade-in zoom-in duration-300">
          <div className="w-20 h-20 bg-gradient-to-tr from-[#2F7D5C] to-[#56AB2F] text-white rounded-3xl flex items-center justify-center mx-auto shadow-xl">
            <Trophy size={42} />
          </div>
          
          <div className="space-y-1">
            <h3 className="font-display text-3xl text-[#C91F5A]">Permainan Selesai! 🎉</h3>
            <p className="text-xs text-[#8B717A] uppercase font-bold tracking-wider">Hasil Tangkap Kado Rush</p>
          </div>

          <div className="bg-[#FFF0F3] p-5 rounded-3xl border-2 border-[#FFC5D0] space-y-2 shadow-inner">
            <div className="flex justify-around items-center border-b border-[#FFC5D0]/60 pb-3">
              <div>
                <p className="text-[10px] text-[#8B717A] uppercase font-bold">Skor Akhir</p>
                <p className="text-3xl font-display text-[#C91F5A]">{score}</p>
              </div>
              <div className="w-px h-8 bg-[#FFC5D0]" />
              <div>
                <p className="text-[10px] text-[#8B717A] uppercase font-bold">Combo Tertinggi</p>
                <p className="text-3xl font-display text-[#FF5E83]">{maxCombo}x 🔥</p>
              </div>
            </div>

            <p className="text-sm font-handwriting text-xl text-[#4A3038] pt-1">
              {score >= 200
                ? "SUKSER BESAR! Azkia jago banget nangkep semua kado ultah! 🏆✨"
                : score >= 100
                ? "Hebat banget! Banyak hadiah manis yang berhasil ditangkap! 🎂"
                : "Kerja bagus! Hadiah ulang tahunnya udah terkumpul manis! 💖"}
            </p>
          </div>

          <div className="flex flex-col gap-2.5 pt-2">
            <button
              onClick={startGame}
              className="w-full py-3 bg-white border-2 border-[#FFC5D0] text-[#C91F5A] font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-[#FFE4EC] transition-all shadow-sm active:scale-95"
            >
              <RefreshCw size={18} /> Main Lagi 🎮
            </button>
            
            <button
              onClick={onComplete}
              className="w-full py-3.5 bg-gradient-to-r from-[#2F7D5C] to-[#246247] text-white font-bold rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-95 text-base"
            >
              <CheckCircle2 size={20} /> Selesai & Simpan Skor
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
