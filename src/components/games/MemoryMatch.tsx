"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Image as ImageIcon,
  Sparkles,
  CheckCircle2,
  RefreshCw,
  Trophy,
  Timer,
  Eye,
  Flame,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface MemoryPair {
  pairId: number;
  src: string;
  label: string;
  detail: string;
}

const MEMORY_PAIRS: MemoryPair[] = [
  {
    pairId: 1,
    src: "/images/image-1.webp",
    label: "Pintu Merah",
    detail: "Kenangan di pintu 164",
  },
  {
    pairId: 2,
    src: "/images/image-12.webp",
    label: "Ngeeng Motor",
    detail: "Petualangan motor trail",
  },
  {
    pairId: 3,
    src: "/images/image-8.webp",
    label: "Azkia Mini",
    detail: "Versi imut waktu kecil",
  },
  {
    pairId: 4,
    src: "/images/image-5.webp",
    label: "Main Character",
    detail: "Tersenyum berdua di gunung",
  },
  {
    pairId: 5,
    src: "/images/image-13.webp",
    label: "Tiket Museum",
    detail: "Jalan-jalan & koleksi tiket",
  },
  {
    pairId: 6,
    src: "/images/image-9.webp",
    label: "Makan-Makan",
    detail: "Momen seru saat berdua",
  },
];

interface CardItem {
  id: number;
  pairId: number;
  src: string;
  label: string;
  detail: string;
  isFlipped: boolean;
  isMatched: boolean;
}

function generateShuffledCards(): CardItem[] {
  const deck: CardItem[] = [];
  let idCounter = 1;

  MEMORY_PAIRS.forEach((pair) => {
    deck.push({
      id: idCounter++,
      pairId: pair.pairId,
      src: pair.src,
      label: pair.label,
      detail: pair.detail,
      isFlipped: false,
      isMatched: false,
    });
    deck.push({
      id: idCounter++,
      pairId: pair.pairId,
      src: pair.src,
      label: pair.label,
      detail: pair.detail,
      isFlipped: false,
      isMatched: false,
    });
  });

  // Fisher-Yates shuffle algorithm
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = deck[i]!;
    deck[i] = deck[j]!;
    deck[j] = temp;
  }

  return deck;
}

export default function MemoryMatch({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [cards, setCards] = useState<CardItem[]>(generateShuffledCards);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [hintsLeft, setHintsLeft] = useState(1);
  const [isPeeking, setIsPeeking] = useState(false);

  const isCompleted = matches === MEMORY_PAIRS.length;
  const isCheckingRef = useRef(false);

  // Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && !isCompleted) {
      interval = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, isCompleted]);

  // Handle Card Click
  const handleCardClick = (id: number) => {
    if (isPeeking || isCheckingRef.current || flippedIds.length >= 2) return;

    const clickedCard = cards.find((c) => c.id === id);
    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return;

    if (!isTimerRunning && moves === 0) {
      setIsTimerRunning(true);
    }

    // Flip card
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isFlipped: true } : c))
    );
    const newFlipped = [...flippedIds, id];
    setFlippedIds(newFlipped);

    // If 2 cards flipped -> check match
    if (newFlipped.length === 2) {
      isCheckingRef.current = true;
      setMoves((m) => m + 1);

      const card1 = cards.find((c) => c.id === newFlipped[0]);
      const card2 = cards.find((c) => c.id === newFlipped[1]);

      if (card1 && card2 && card1.pairId === card2.pairId) {
        // MATCH SUCCESS!
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.pairId === card1.pairId ? { ...c, isMatched: true } : c
            )
          );
          setMatches((m) => m + 1);
          setFlippedIds([]);
          isCheckingRef.current = false;

          // Combo Calculation
          setCombo((c) => {
            const nextCombo = c + 1;
            if (nextCombo > maxCombo) setMaxCombo(nextCombo);
            return nextCombo;
          });
        }, 350);
      } else {
        // NO MATCH -> Reset Combo & Flip back
        setCombo(0);
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              newFlipped.includes(c.id) ? { ...c, isFlipped: false } : c
            )
          );
          setFlippedIds([]);
          isCheckingRef.current = false;
        }, 850);
      }
    }
  };

  // Peek Hint Feature (1.4 seconds reveal)
  const handlePeekHint = () => {
    if (hintsLeft <= 0 || isPeeking || isCheckingRef.current) return;

    setHintsLeft((h) => h - 1);
    setIsPeeking(true);

    setCards((prev) => prev.map((c) => ({ ...c, isFlipped: true })));

    setTimeout(() => {
      setCards((prev) =>
        prev.map((c) => (c.isMatched ? c : { ...c, isFlipped: false }))
      );
      setFlippedIds([]);
      setIsPeeking(false);
    }, 1400);
  };

  // Reset Game
  const resetGame = () => {
    setCards(generateShuffledCards());
    setFlippedIds([]);
    setMoves(0);
    setMatches(0);
    setCombo(0);
    setMaxCombo(0);
    setSecondsElapsed(0);
    setIsTimerRunning(false);
    setHintsLeft(1);
    setIsPeeking(false);
    isCheckingRef.current = false;
  };

  // Time formatter
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainderSecs = secs % 60;
    return `${mins > 0 ? `${mins}m ` : ""}${remainderSecs}d`;
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3 select-none w-full max-w-md mx-auto">
      {/* Top Header Controls */}
      <div className="w-full flex justify-between items-center bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border-2 border-[#FFC5D0] shadow-sm">
        <div className="flex items-center gap-2 text-[#C91F5A]">
          <ImageIcon size={18} />
          <span className="font-display text-sm">Memoriku 📸</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Timer Badge */}
          <div className="text-xs font-bold text-[#4A3038] bg-[#FFE4EC] px-2.5 py-1 rounded-full border border-[#FFC5D0] flex items-center gap-1">
            <Timer size={13} className="text-[#C91F5A]" />
            <span>{formatTime(secondsElapsed)}</span>
          </div>

          {/* Moves / Matches Badge */}
          <div className="text-xs font-bold text-[#8B717A] bg-white px-2.5 py-1 rounded-full border border-[#FFC5D0]">
            {moves} Langkah | {matches}/{MEMORY_PAIRS.length}
          </div>
        </div>
      </div>

      {/* Action Bar (Combo & Peek Hint) */}
      {!isCompleted && (
        <div className="w-full flex justify-between items-center px-1">
          {/* Combo Indicator */}
          <div className="flex items-center gap-1 min-h-[28px]">
            {combo > 1 && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-red-500 text-white text-xs font-extrabold px-2.5 py-0.5 rounded-full shadow-sm"
              >
                <Flame size={12} className="animate-bounce" />
                <span>{combo}x COMBO! 🔥</span>
              </motion.div>
            )}
          </div>

          {/* Peek Hint Button */}
          <button
            onClick={handlePeekHint}
            disabled={hintsLeft <= 0 || isPeeking || moves === 0}
            className="text-xs font-bold text-[#C91F5A] bg-white border border-[#FFC5D0] hover:bg-[#FFE4EC] disabled:opacity-40 disabled:hover:bg-white px-3 py-1 rounded-full shadow-2xs flex items-center gap-1.5 transition-all"
          >
            <Eye size={13} />
            <span>Intip ({hintsLeft})</span>
          </button>
        </div>
      )}

      {/* Main Game Cards Grid (3 columns x 4 rows) */}
      {!isCompleted ? (
        <div className="w-full grid grid-cols-3 sm:grid-cols-4 gap-2.5 bg-gradient-to-b from-[#FFF9FB] via-[#FFE4EC] to-[#FFD5E1] p-3 rounded-3xl border-3 border-[#FFC5D0] shadow-xl relative overflow-hidden">
          {cards.map((card) => {
            const showFace = card.isFlipped || card.isMatched;

            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className="relative h-28 sm:h-32 rounded-2xl cursor-pointer group"
                style={{ perspective: "1000px" }}
              >
                <motion.div
                  className="w-full h-full relative rounded-2xl shadow-md"
                  style={{ transformStyle: "preserve-3d" }}
                  animate={{ rotateY: showFace ? 180 : 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {/* CARD BACK SIDE */}
                  <div
                    className={cn(
                      "absolute inset-0 w-full h-full rounded-2xl border-2 border-white flex flex-col items-center justify-center bg-gradient-to-br from-[#FF9EBE] via-[#FF5E83] to-[#C91F5A] shadow-inner p-2 group-hover:scale-[1.02] transition-transform",
                      card.isMatched && "opacity-80"
                    )}
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className="w-full h-full border border-white/40 rounded-xl flex flex-col items-center justify-center p-1 bg-white/10 backdrop-blur-xs">
                      <Sparkles className="text-white drop-shadow-sm animate-pulse" size={22} />
                      <span className="text-[10px] font-bold text-white tracking-widest mt-1 uppercase opacity-90 font-display">
                        MEMORI
                      </span>
                    </div>
                  </div>

                  {/* CARD FRONT SIDE (REAL PHOTO) */}
                  <div
                    className={cn(
                      "absolute inset-0 w-full h-full rounded-2xl border-2 flex flex-col justify-between overflow-hidden bg-white p-1.5 shadow-md",
                      card.isMatched
                        ? "border-[#2F7D5C] ring-2 ring-[#2F7D5C]/30"
                        : "border-[#FF5E83]"
                    )}
                    style={{
                      transform: "rotateY(180deg)",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    {/* Photo Container */}
                    <div className="relative w-full h-full rounded-xl overflow-hidden bg-gray-100">
                      <Image
                        src={card.src}
                        alt={card.label}
                        fill
                        sizes="(max-width: 640px) 33vw, 25vw"
                        className="object-cover"
                        priority
                      />

                      {/* Matched overlay badge */}
                      {card.isMatched && (
                        <div className="absolute inset-0 bg-[#2F7D5C]/25 backdrop-blur-[1px] flex items-center justify-center">
                          <CheckCircle2 className="text-white drop-shadow-md" size={26} />
                        </div>
                      )}

                      {/* Photo Label Badge at bottom */}
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent p-1 text-center">
                        <span className="text-[10px] font-bold text-white truncate block leading-tight drop-shadow-xs">
                          {card.label}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Match Sparkle Floating Effect */}
                {card.isMatched && (
                  <motion.div
                    initial={{ opacity: 1, scale: 0.8, y: 0 }}
                    animate={{ opacity: 0, scale: 1.2, y: -10 }}
                    transition={{ duration: 0.8 }}
                    className="absolute -top-1 -right-1 z-20 pointer-events-none"
                  >
                    <Sparkles className="text-yellow-400 fill-yellow-300" size={16} />
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        /* ═══════════ VICTORY SCREEN (POLAROID GALLERY) ═══════════ */
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full text-center py-4 space-y-4"
        >
          {/* Trophy Header */}
          <div className="w-20 h-20 bg-gradient-to-tr from-[#FF5E83] to-[#FF9EBE] text-white rounded-3xl flex items-center justify-center mx-auto shadow-xl">
            <Trophy size={42} />
          </div>

          <div className="space-y-1">
            <h3 className="font-display text-2xl text-[#C91F5A]">
              Ingatan Azkia Super Tajam! 🏆✨
            </h3>
            <p className="text-xs text-[#8B717A] uppercase font-bold tracking-wider">
              Semua Foto Kenangan Berhasil Dicocokkan!
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-2 bg-[#FFF0F3] p-3 rounded-2xl border-2 border-[#FFC5D0] text-center shadow-inner">
            <div>
              <p className="text-[10px] font-bold text-[#8B717A] uppercase">Langkah</p>
              <p className="font-display text-xl text-[#C91F5A]">{moves}</p>
            </div>
            <div className="border-x border-[#FFC5D0]">
              <p className="text-[10px] font-bold text-[#8B717A] uppercase">Waktu</p>
              <p className="font-display text-xl text-[#C91F5A]">{formatTime(secondsElapsed)}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#8B717A] uppercase">Max Combo</p>
              <p className="font-display text-xl text-[#C91F5A]">{maxCombo > 0 ? `${maxCombo}x` : "1x"}</p>
            </div>
          </div>

          {/* Matched Memories Polaroid Showcase */}
          <div className="space-y-1.5 text-left">
            <label className="text-[11px] font-bold text-[#8B717A] uppercase tracking-wider block">
              Galeri Kenangan Terbuka:
            </label>
            <div className="grid grid-cols-3 gap-2 bg-white p-2.5 rounded-2xl border border-[#FFC5D0]">
              {MEMORY_PAIRS.map((pair) => (
                <div
                  key={pair.pairId}
                  className="bg-[#FFF9FB] p-1.5 rounded-xl border border-[#FFC5D0] flex flex-col items-center text-center shadow-2xs"
                >
                  <div className="relative w-full h-16 rounded-lg overflow-hidden mb-1">
                    <Image src={pair.src} alt={pair.label} fill sizes="33vw" className="object-cover" />
                  </div>
                  <span className="text-[10px] font-bold text-[#4A3038] truncate w-full">
                    {pair.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Sweet Closing Wish */}
          <div className="bg-[#FFF0F3] p-3.5 rounded-2xl border border-[#FFC5D0]">
            <p className="font-handwriting text-lg text-[#4A3038] leading-tight">
              &quot;Setiap kenangan indah ini akan selalu tersimpan manis selamanya! 💕&quot;
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 pt-1">
            <button
              onClick={resetGame}
              className="w-full py-3 bg-white border-2 border-[#FFC5D0] text-[#C91F5A] font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-[#FFE4EC] transition-colors text-sm shadow-sm"
            >
              <RefreshCw size={16} /> Main Ulang 🔄
            </button>
            <button
              onClick={onComplete}
              className="w-full py-3.5 bg-gradient-to-r from-[#2F7D5C] to-[#246247] text-white font-bold rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-95 text-base"
            >
              <CheckCircle2 size={20} /> Simpan Skor & Selesai
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
