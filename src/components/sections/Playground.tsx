"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "motion/react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { playgroundGames, GameInfo } from "@/data/games";
import { useSafeStorage } from "@/hooks/useSafeStorage";
import {
  Gift,
  Sparkles,
  HelpCircle,
  Cake,
  Image as ImageIcon,
  Gamepad2,
  Trophy,
  Flame,
  Zap,
  CheckCircle2,
  RotateCcw,
  Shuffle,
  Crown,
  Star,
  Play,
  Lock,
  Unlock,
  Heart,
  ChevronLeft,
  ChevronRight,
  Layers,
  Grid
} from "lucide-react";
import { CuppyCake } from "@/components/mascots/CuppyCake";

// Dynamic imports for the mini games
const CatchGifts = dynamic(() => import("@/components/games/CatchGifts"), {
  loading: () => <p className="text-center p-8 text-[#8B717A] animate-pulse">Menyiapkan game...</p>
});
const PopBalloons = dynamic(() => import("@/components/games/PopBalloons"), {
  loading: () => <p className="text-center p-8 text-[#8B717A] animate-pulse">Menyiapkan game...</p>
});
const BirthdayQuiz = dynamic(() => import("@/components/games/BirthdayQuiz"), {
  loading: () => <p className="text-center p-8 text-[#8B717A] animate-pulse">Menyiapkan game...</p>
});
const QuickCake = dynamic(() => import("@/components/games/QuickCake"), {
  loading: () => <p className="text-center p-8 text-[#8B717A] animate-pulse">Menyiapkan game...</p>
});
const MemoryMatch = dynamic(() => import("@/components/games/MemoryMatch"), {
  loading: () => <p className="text-center p-8 text-[#8B717A] animate-pulse">Menyiapkan game...</p>
});

export function Playground() {
  const [activeGame, setActiveGame] = useState<GameInfo | null>(null);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"deck" | "grid">("deck");
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [showVaultReward, setShowVaultReward] = useState<boolean>(false);
  const [isSpinningRandom, setIsSpinningRandom] = useState<boolean>(false);

  // Track played games in localStorage
  const [playedGamesRaw, setPlayedGames] = useSafeStorage("playedGames", "[]");
  let playedGames: string[] = [];
  try {
    playedGames = JSON.parse(playedGamesRaw);
  } catch (e) {
    playedGames = [];
  }

  const markGamePlayed = (gameId: string) => {
    if (!playedGames.includes(gameId)) {
      setPlayedGames(JSON.stringify([...playedGames, gameId]));
    }
  };

  const closeGame = () => {
    if (activeGame) {
      markGamePlayed(activeGame.id);
      setActiveGame(null);
    }
  };

  const handleResetProgress = () => {
    if (window.confirm("Ingin mereset petualangan game ulang tahun dan main lagi dari awal?")) {
      setPlayedGames("[]");
      setShowVaultReward(false);
    }
  };

  const handleRandomPlay = () => {
    setIsSpinningRandom(true);
    const unplayed = playgroundGames.filter(g => !playedGames.includes(g.id));
    const pool = unplayed.length > 0 ? unplayed : playgroundGames;

    setTimeout(() => {
      const randomGame = pool[Math.floor(Math.random() * pool.length)] || playgroundGames[0];
      if (randomGame) {
        setActiveGame(randomGame);
      }
      setIsSpinningRandom(false);
    }, 550);
  };

  const renderActiveGame = () => {
    if (!activeGame) return null;

    switch (activeGame.component) {
      case "CatchGifts":
        return <CatchGifts onComplete={closeGame} />;
      case "PopBalloons":
        return <PopBalloons onComplete={closeGame} />;
      case "BirthdayQuiz":
        return <BirthdayQuiz onComplete={closeGame} />;
      case "QuickCake":
        return <QuickCake onComplete={closeGame} />;
      case "MemoryMatch":
        return <MemoryMatch onComplete={closeGame} />;
      default:
        return <div className="text-center p-6 text-[#8B717A]">Game tidak ditemukan</div>;
    }
  };

  const playedCount = playedGames.length;
  const totalCount = playgroundGames.length;
  const progressPercent = Math.round((playedCount / totalCount) * 100);

  // Filtered games based on active tab
  const filteredGames = playgroundGames.filter(game => {
    if (activeTab === "all") return true;
    return game.category === activeTab;
  });

  // Ensure active index is within bounds when tab changes
  const safeActiveIndex = Math.min(activeIndex, Math.max(0, filteredGames.length - 1));

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % filteredGames.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + filteredGames.length) % filteredGames.length);
  };

  // Rank & Mascot Dialogue
  const getRankInfo = () => {
    if (playedCount === 0) {
      return {
        title: "ARCADE ROOKIE 🎮",
        speech: "Halo Azkia! Pilihlah kartu game pertamamu untuk memulai petualangan!",
        state: "idle" as const,
        badgeBg: "bg-pink-100 text-pink-700 border-pink-300",
      };
    } else if (playedCount <= 2) {
      return {
        title: "GAME EXPLORER ⚡",
        speech: "Keren banget! Teruskan mainkan kartu game lainnya buat kumpulin trofi!",
        state: "excited" as const,
        badgeBg: "bg-purple-100 text-purple-700 border-purple-300",
      };
    } else if (playedCount <= 4) {
      return {
        title: "PARTY CHAMPION 🔥",
        speech: "Waaa dikit lagi koleksi kartumu lengkap nih! Ayo habisin sisa gamenya! 🔥",
        state: "excited" as const,
        badgeBg: "bg-amber-100 text-amber-700 border-amber-300",
      };
    } else {
      return {
        title: "BIRTHDAY LEGEND 👑",
        speech: "LUAR BIASA! Kamu berhasil menamatkan semua kartu & ngebuka Arcade Master Vault! 🎉",
        state: "surprised" as const,
        badgeBg: "bg-emerald-100 text-emerald-700 border-emerald-300",
      };
    }
  };

  const rankInfo = getRankInfo();

  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 bg-gradient-to-b from-[#FFF5F8] via-[#FFF0F4] to-[#FFF8FA] relative overflow-hidden select-none">
      
      {/* Subtle Retro Grid & Floating Sparkles Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#FF6688_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.06] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10 space-y-8 sm:space-y-10">
        
        {/* Section Main Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFE4EC] to-[#FFD8E4] border border-[#FFB8C9] text-[#C91F5A] px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-widest shadow-xs">
            <Gamepad2 size={15} className="text-[#C91F5A]" />
            <span>Birthday Arcade Corner</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#C91F5A] tracking-tight drop-shadow-xs">
            playground ulang tahun
          </h2>

          <p className="text-[#8B717A] text-base md:text-lg max-w-xl mx-auto font-body leading-relaxed">
            Pilih kartu tantangan seru di bawah dan kumpulkan semua stempel kemenangan untuk membuka <span className="font-bold text-[#C91F5A]">Arcade Master Vault 🎁</span>!
          </p>
        </motion.div>

        {/* Player Arcade Console HUD Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white/90 backdrop-blur-md border-2 border-[#FFC5D0] rounded-3xl p-5 sm:p-7 shadow-lg relative overflow-hidden"
        >
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#FF5E83] via-[#8E2DE2] to-[#FF9900]" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Left: Mascot & Dialogue */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-shrink-0">
                <div className="w-18 h-18 sm:w-20 sm:h-20 bg-gradient-to-br from-[#FFE4EC] to-[#FFF0F4] rounded-2xl border border-[#FFC5D0] flex items-center justify-center shadow-inner">
                  <CuppyCake state={rankInfo.state} className="w-14 h-14" />
                </div>
                {playedCount === totalCount && (
                  <div className="absolute -top-2 -right-2 bg-amber-400 text-white rounded-full p-1 shadow-md animate-bounce">
                    <Crown size={16} fill="white" />
                  </div>
                )}
              </div>

              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[11px] font-extrabold uppercase px-3 py-0.5 rounded-full border shadow-2xs ${rankInfo.badgeBg}`}>
                    {rankInfo.title}
                  </span>
                  {playedCount > 0 && (
                    <span className="text-[11px] font-bold text-[#2F7D5C] bg-[#DDF5E8] px-2.5 py-0.5 rounded-full border border-[#A8E6CF]">
                      {playedCount}/{totalCount} Completed
                    </span>
                  )}
                </div>
                
                <div className="bg-[#FFF5F8] border border-[#FFC5D0] px-3.5 py-2 rounded-2xl rounded-tl-none text-xs sm:text-sm font-medium text-[#4A3038] shadow-2xs leading-snug max-w-md">
                  💬 {rankInfo.speech}
                </div>
              </div>
            </div>

            {/* Right: Progress Meter & Quick Action */}
            <div className="w-full md:w-72 flex flex-col gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-[#FFC5D0]/60">
              
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-[#8B717A] uppercase tracking-wider flex items-center gap-1">
                    <Trophy size={13} className="text-amber-500" />
                    Progress Koleksi
                  </span>
                  <span className="text-[#C91F5A]">{progressPercent}%</span>
                </div>

                <div className="w-full h-3.5 bg-[#FFE4EC] rounded-full p-0.5 overflow-hidden border border-[#FFC5D0] shadow-inner">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#FF5E83] via-[#C91F5A] to-[#FF9900] rounded-full shadow-xs"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleRandomPlay}
                  disabled={isSpinningRandom}
                  className="flex-1 py-2.5 px-3 bg-gradient-to-r from-[#FF6688] to-[#C91F5A] hover:from-[#C91F5A] hover:to-[#A81748] text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  <Shuffle size={14} className={isSpinningRandom ? "animate-spin" : ""} />
                  <span>{isSpinningRandom ? "Mengacak..." : "Acak Game 🕹️"}</span>
                </button>

                {playedCount > 0 && (
                  <button
                    onClick={handleResetProgress}
                    title="Reset Ulang Progress"
                    className="p-2.5 bg-white border border-[#FFC5D0] hover:bg-[#FFE4EC] text-[#8B717A] hover:text-[#C91F5A] rounded-xl transition-colors shadow-2xs"
                  >
                    <RotateCcw size={15} />
                  </button>
                )}
              </div>

            </div>

          </div>
        </motion.div>

        {/* Filter Pills Bar & View Mode Toggle (Deck vs Grid) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 flex-wrap justify-center sm:justify-start">
            {[
              { id: "all", label: "Semua Kartu", icon: Gamepad2 },
              { id: "speed", label: "Aksi & Speed", icon: Zap },
              { id: "casual", label: "Santai", icon: Sparkles },
              { id: "quiz", label: "Kuis", icon: Heart },
              { id: "creative", label: "Kreatif", icon: Cake },
              { id: "memory", label: "Puzzle", icon: ImageIcon },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setActiveIndex(0);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 border shadow-2xs ${
                    isActive
                      ? "bg-[#C91F5A] text-white border-[#C91F5A] shadow-sm scale-105"
                      : "bg-white text-[#8B717A] border-[#FFC5D0] hover:bg-[#FFE4EC] hover:text-[#C91F5A]"
                  }`}
                >
                  <Icon size={13} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* View Mode Switcher: Deck 3D vs Grid */}
          <div className="flex items-center bg-white p-1 rounded-2xl border border-[#FFC5D0] shadow-2xs">
            <button
              onClick={() => setViewMode("deck")}
              className={`px-3 py-1 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                viewMode === "deck"
                  ? "bg-[#C91F5A] text-white shadow-xs"
                  : "text-[#8B717A] hover:text-[#C91F5A]"
              }`}
            >
              <Layers size={13} />
              <span>Deck 3D</span>
            </button>

            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-1 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                viewMode === "grid"
                  ? "bg-[#C91F5A] text-white shadow-xs"
                  : "text-[#8B717A] hover:text-[#C91F5A]"
              }`}
            >
              <Grid size={13} />
              <span>Grid</span>
            </button>
          </div>

        </div>

        {/* ----------------- 3D DECK CAROUSEL MODE (PERFECT SYMMETRICAL LOOP) ----------------- */}
        {viewMode === "deck" && (
          <div className="relative py-8 sm:py-12 min-h-[480px] sm:min-h-[540px] flex flex-col items-center justify-center">
            
            {/* Carousel Arrow Controls */}
            <button
              onClick={handlePrev}
              className="absolute left-1 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-white/95 backdrop-blur-md border-2 border-[#FFC5D0] text-[#C91F5A] hover:bg-[#C91F5A] hover:text-white hover:border-[#C91F5A] flex items-center justify-center shadow-xl transition-all active:scale-90"
              aria-label="Previous Game"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-1 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-white/95 backdrop-blur-md border-2 border-[#FFC5D0] text-[#C91F5A] hover:bg-[#C91F5A] hover:text-white hover:border-[#C91F5A] flex items-center justify-center shadow-xl transition-all active:scale-90"
              aria-label="Next Game"
            >
              <ChevronRight size={24} />
            </button>

            {/* 3D Stack Card Deck Container */}
            <div className="relative w-full max-w-xs sm:max-w-md h-[450px] sm:h-[490px] flex items-center justify-center perspective-[1200px]">
              {filteredGames.map((game, index) => {
                const isPlayed = playedGames.includes(game.id);
                const totalItems = filteredGames.length;
                
                // Circular Modulo Offset for Symmetrical Deck Balancing (Active Card Dead Center)
                let offset = index - safeActiveIndex;
                if (totalItems > 2) {
                  if (offset > Math.floor(totalItems / 2)) {
                    offset -= totalItems;
                  } else if (offset < -Math.floor(totalItems / 2)) {
                    offset += totalItems;
                  }
                }

                const absOffset = Math.abs(offset);
                const isActive = offset === 0;

                // Hide cards that are out of rendering range
                if (absOffset > 2) return null;

                // Dynamic 3D transform values for ultra-smooth depth
                const translateX = offset * 155; // Symmetrical horizontal spacing
                const scale = 1 - absOffset * 0.12; // Scale down side cards smoothly
                const rotateY = offset * -16; // 3D Perspective Rotation
                const zIndex = 30 - absOffset * 10;
                const opacity = 1 - absOffset * 0.28;

                return (
                  <motion.div
                    key={game.id}
                    onClick={() => {
                      if (!isActive) setActiveIndex(index);
                    }}
                    animate={{
                      x: translateX,
                      scale: scale,
                      rotateY: rotateY,
                      zIndex: zIndex,
                      opacity: opacity,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 24,
                      mass: 0.8,
                    }}
                    className={`absolute inset-0 m-auto w-[280px] sm:w-[325px] md:w-[345px] h-[435px] sm:h-[480px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl transition-all border-2 ${
                      isActive
                        ? "border-amber-300 ring-4 ring-[#FF5E83]/40 shadow-[0_20px_50px_rgba(201,31,90,0.35)]"
                        : "border-white/70 hover:border-amber-200"
                    }`}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Full-Bleed 3D Card Artwork Cover */}
                    <div className="relative w-full h-full">
                      <img
                        src={game.imageCover}
                        alt={game.name}
                        className="w-full h-full object-cover"
                      />

                      {/* Top Dark Gradient & Bottom Vignette Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 pointer-events-none" />

                      {/* Top Header Pills Bar */}
                      <div className="absolute top-4 inset-x-4 flex justify-between items-center z-10">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border shadow-sm backdrop-blur-md bg-black/50 text-white border-white/30">
                          {game.tag}
                        </span>

                        <span className="text-[10px] font-extrabold text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/30 flex items-center gap-1 shadow-sm">
                          ⏱️ {game.duration}
                        </span>
                      </div>

                      {/* Holographic Completion Stamp Badge */}
                      {isPlayed && (
                        <div className="absolute top-16 right-4 z-20 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-[#4A3038] px-3 py-1 rounded-xl font-extrabold text-xs shadow-xl border border-amber-100 flex items-center gap-1 rotate-6 animate-pulse">
                          <CheckCircle2 size={14} className="text-[#2F7D5C]" />
                          <span>SELESAI ✅</span>
                        </div>
                      )}

                      {/* Bottom Glassmorphism Info Overlay (Ultra-Readable Shield) */}
                      <div className="absolute bottom-0 inset-x-0 p-3.5 sm:p-4 space-y-2 z-10 bg-gradient-to-t from-black/95 via-black/80 to-transparent pt-10">
                        
                        <div className="bg-black/65 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 space-y-1 shadow-2xl">
                          <div className="flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wider text-amber-300">
                            <span className="flex items-center gap-1 drop-shadow-sm">
                              <Star size={12} className="fill-amber-300 text-amber-300" />
                              {game.categoryName}
                            </span>
                            <span className="text-white/80 bg-white/15 px-2 py-0.5 rounded-full text-[10px]">
                              {game.difficulty}
                            </span>
                          </div>

                          <h3 className="font-display text-xl sm:text-2xl text-white font-bold tracking-tight leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                            {game.name}
                          </h3>

                          <p className="text-xs text-white/90 font-medium line-clamp-2 leading-relaxed font-body drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                            {game.description}
                          </p>

                          {/* CTA Play Button on Active Card */}
                          {isActive && (
                            <motion.button
                              initial={{ scale: 0.95 }}
                              animate={{ scale: 1 }}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveGame(game);
                              }}
                              className={`w-full mt-2 py-3 px-4 rounded-xl font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-xl flex items-center justify-center gap-2 transition-all ${
                                isPlayed
                                  ? "bg-gradient-to-r from-[#2F7D5C] to-[#246247] text-white border border-emerald-300/40 hover:brightness-110"
                                  : "bg-gradient-to-r from-[#FF3366] to-[#C91F5A] text-white border border-pink-300/40 hover:brightness-110 shadow-[0_4px_15px_rgba(255,51,102,0.4)]"
                              }`}
                            >
                              <span>{isPlayed ? "Main Lagi 🔄" : "Mainkan Game 🎮"}</span>
                              <Play size={14} fill="currentColor" />
                            </motion.button>
                          )}
                        </div>

                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Deck Dots Navigation Indicator */}
            <div className="flex items-center gap-2 pt-6">
              {filteredGames.map((g, idx) => (
                <button
                  key={g.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2.5 rounded-full transition-all ${
                    idx === safeActiveIndex
                      ? "w-8 bg-[#C91F5A]"
                      : "w-2.5 bg-[#FFC5D0] hover:bg-[#FF809B]"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>
        )}

        {/* ----------------- GRID DISPLAY MODE ----------------- */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {filteredGames.map((game) => {
              const isPlayed = playedGames.includes(game.id);

              return (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -6 }}
                  onClick={() => setActiveGame(game)}
                  className={`group relative rounded-[2rem] border-2 overflow-hidden cursor-pointer bg-white shadow-lg hover:shadow-2xl transition-all duration-300 h-[420px] flex flex-col justify-between ${
                    isPlayed ? "border-[#A8E6CF]" : "border-[#FFC5D0]"
                  }`}
                >
                  <div className="relative w-full h-full">
                    <img
                      src={game.imageCover}
                      alt={game.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/90 pointer-events-none" />

                    <div className="absolute top-4 inset-x-4 flex justify-between items-center z-10">
                      <span className="text-[10px] font-extrabold uppercase px-3 py-1 rounded-full border backdrop-blur-md bg-black/50 text-white border-white/30">
                        {game.tag}
                      </span>

                      {isPlayed ? (
                        <span className="text-[10px] font-extrabold uppercase text-[#2F7D5C] bg-[#DDF5E8] px-2.5 py-1 rounded-full border border-[#A8E6CF]">
                          SELESAI ✅
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold text-white bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/30">
                          ⏱️ {game.duration}
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-0 inset-x-0 p-4 space-y-3 z-10 bg-gradient-to-t from-black/95 via-black/80 to-transparent pt-8">
                      <div className="bg-black/65 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 space-y-1.5 shadow-2xl">
                        <div className="flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wider text-amber-300">
                          <span className="flex items-center gap-1">
                            <Star size={12} className="fill-amber-300 text-amber-300" />
                            {game.categoryName}
                          </span>
                          <span className="text-white/80 bg-white/15 px-2 py-0.5 rounded-full text-[10px]">
                            {game.difficulty}
                          </span>
                        </div>
                        <h3 className="font-display text-xl text-white font-bold tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                          {game.name}
                        </h3>
                        <p className="text-xs text-white/90 font-medium line-clamp-2 leading-relaxed font-body drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                          {game.description}
                        </p>
                      </div>

                      <div className={`w-full py-3 px-4 rounded-xl text-xs font-extrabold uppercase tracking-wider shadow-md flex items-center justify-center gap-2 transition-all ${
                        isPlayed
                          ? "bg-[#DDF5E8] text-[#2F7D5C]"
                          : "bg-gradient-to-r from-[#FF3366] to-[#C91F5A] text-white hover:brightness-110"
                      }`}>
                        <span>{isPlayed ? "Main Lagi 🔄" : "Mainkan Game 🎮"}</span>
                        <Play size={14} fill="currentColor" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Arcade Master Vault Section */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="pt-4"
        >
          <div className={`rounded-3xl border-2 p-6 sm:p-8 text-center relative overflow-hidden transition-all ${
            playedCount === totalCount
              ? "bg-gradient-to-br from-[#FFF9E6] via-[#FFF3D6] to-[#FFE8B3] border-amber-300 shadow-xl"
              : "bg-white/80 border-[#FFC5D0] shadow-sm"
          }`}>
            
            <div className="max-w-xl mx-auto space-y-4 relative z-10">
              
              <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center shadow-md bg-gradient-to-tr from-amber-400 to-yellow-300 text-white">
                {playedCount === totalCount ? <Unlock size={32} /> : <Lock size={32} />}
              </div>

              <div className="space-y-1">
                <h3 className="font-display text-2xl sm:text-3xl text-[#4A3038]">
                  {playedCount === totalCount ? "🎉 Arcade Master Vault Terbuka!" : "Arcade Master Vault 🎁"}
                </h3>
                <p className="text-xs sm:text-sm text-[#8B717A]">
                  {playedCount === totalCount
                    ? "Selamat Azkia! Kamu berhasil menamatkan kelima mini game ultah dan berhak membuka piala emasmmu!"
                    : `Selesaikan ${totalCount - playedCount} game lagi untuk membuka piala dan hadiah rahasia!`}
                </p>
              </div>

              {playedCount === totalCount ? (
                <Button
                  onClick={() => setShowVaultReward(true)}
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold shadow-lg animate-bounce"
                >
                  <Crown size={20} className="mr-2" /> Buka Hadiah Utama 🎁
                </Button>
              ) : (
                <div className="inline-flex items-center gap-2 bg-[#FFE4EC] text-[#C91F5A] px-4 py-1.5 rounded-full text-xs font-bold border border-[#FFC5D0]">
                  <Trophy size={14} className="text-amber-500" />
                  <span>Progres Piala: {playedCount} / {totalCount} Game</span>
                </div>
              )}

            </div>

          </div>
        </motion.div>

      </div>

      {/* Game Modal Window */}
      <Modal
        isOpen={activeGame !== null}
        onClose={() => closeGame()}
        title={activeGame?.name}
        hideCloseButton={true}
      >
        {renderActiveGame()}
      </Modal>

      {/* Secret Vault Reward Modal */}
      <Modal
        isOpen={showVaultReward}
        onClose={() => setShowVaultReward(false)}
        title="🏆 ARCADE MASTER VICTORY!"
      >
        <div className="text-center py-4 space-y-5 max-w-md mx-auto">
          <div className="w-24 h-24 bg-gradient-to-tr from-amber-400 to-yellow-300 rounded-3xl flex items-center justify-center mx-auto shadow-2xl animate-bounce">
            <Trophy size={48} className="text-white" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-600 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
              Gelar Resmi: Birthday Gaming Legend
            </span>
            <h3 className="font-display text-3xl text-[#C91F5A] pt-2">Voucher Emas Khusus Azkia 🎟️</h3>
          </div>

          <div className="bg-gradient-to-br from-[#FFF5F8] to-[#FFE4EC] p-5 rounded-2xl border-2 border-[#FFB8C9] space-y-2 text-left shadow-inner">
            <p className="text-sm font-semibold text-[#4A3038] flex items-center gap-2">
              <Star size={16} className="text-amber-500 fill-amber-500" />
              <span>Tiket Bebas Minta Hadiah Kado / Traktiran Spesial!</span>
            </p>
            <p className="text-xs text-[#8B717A] leading-relaxed">
              Karena Azkia pantang menyerah dan berhasil menyelesaikan semua tantangan di Birthday Playground, kamu berhak klaim kado atau hadiah kuliner bebas pilihan kamu ke Rahman! 🥳💖
            </p>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <Button
              onClick={() => setShowVaultReward(false)}
              className="w-full bg-[#C91F5A] text-white font-bold"
            >
              Simpan Hadiah & Tutup ✨
            </Button>
          </div>
        </div>
      </Modal>

    </section>
  );
}
