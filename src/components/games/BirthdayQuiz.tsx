"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, HelpCircle, Trophy, RefreshCw, Sparkles, Heart, Timer, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { MimiBunny } from "@/components/mascots/MimiBunny";

interface Question {
  id: number;
  question: string;
  options: { text: string; isCorrect: boolean }[];
  explanation: string;
  hostReaction: string;
}

const memoryQuestions: Question[] = [
  {
    id: 1,
    question: "Waktu pertama kali kita jalan bareng ke museum, hal pertama yang Kakek bikin kagum dari Azkia adalah...?",
    options: [
      { text: "Senyuman manis & gaya santaimu yang bikin nyaman 💕", isCorrect: true },
      { text: "Azkia yang sibuk nyari tukang es krim 🍦", isCorrect: false },
      { text: "Tali sepatu Azkia yang lepas terus 👟", isCorrect: false },
    ],
    explanation: "Senyuman manis dan vibe santaimu yang bikin hari itu langsung berkesan banget! ✨",
    hostReaction: "Aww, hari itu berkesan banget kan! 🌸",
  },
  {
    id: 2,
    question: "Waktu Azkia pertama kali pamer skill naik motor trail (ngeeng!), reaksi Kakek di dalam hati adalah...?",
    options: [
      { text: "Keren banget ini cewek, gak ada obatnya! 🏍️", isCorrect: true },
      { text: "Aduh takut ditabrak dari belakang 😱", isCorrect: false },
      { text: "Mau ikutan nebeng di belakang sambil merem 😴", isCorrect: false },
    ],
    explanation: "Beneran keren abis! Gaya ngeeng Azkia di atas motor trail emang juara! 🚲",
    hostReaction: "Ngeeng! Azkia emang cewek super keren! 💨",
  },
  {
    id: 3,
    question: "Foto paling legendaris dan berkesan kita berdua itu di depan pintu merah nomor berapa ya...?",
    options: [
      { text: "Pintu Merah Nomor 164 🚪", isCorrect: true },
      { text: "Pintu Merah Nomor 999 🚪", isCorrect: false },
      { text: "Pintu Kamar Tidur Rumah 🚪", isCorrect: false },
    ],
    explanation: "Yup, Pintu Merah 164 waktu kita pakai almamater bareng! Momen klasik kita! 🖼️",
    hostReaction: "Inget banget kan foto di depan pintu merah itu! 📸",
  },
  {
    id: 4,
    question: "Setiap kali Kakek ngelihat Azkia ketawa lepas, apa yang selalu Kakek rasakan di dalam hati?",
    options: [
      { text: "Suasana langsung terasa jauh lebih hidup dan berwarna! ✨", isCorrect: true },
      { text: "Pasti Azkia lagi ngeliat meme konyol 🤪", isCorrect: false },
      { text: "Tanda-tanda Azkia kelaparan 🍕", isCorrect: false },
    ],
    explanation: "Satu manusia yang selalu bikin suasana di sekitar lebih hidup dan berwarna! 💖",
    hostReaction: "Tawa Azkia emang energi positif paling ampuh! 😊",
  },
  {
    id: 5,
    question: "Alasan utama Kakek buatkan website 'Pesta Kecil' ini khusus di hari ulang tahun Azkia?",
    options: [
      { text: "Karena kenangan sama Azkia terlalu sayang kalau cuma di galeri! 💌", isCorrect: true },
      { text: "Karena Kakek bingung mau ngapain pas liburan 😴", isCorrect: false },
      { text: "Biar dapet jatah traktiran makan siang 🍔", isCorrect: false },
    ],
    explanation: "Kado digital khusus buat merayakan semua momen baik dan senyuman Azkia! 🎂",
    hostReaction: "Kado paling tulus yang dibuat khusus pakai hati! ✨",
  },
  {
    id: 6,
    question: "Apa hal dari Azkia yang paling bikin Kakek betah ngobrol & cerita berjam-jam?",
    options: [
      { text: "Cara Azkia mendengarkan & kehangatan perhatianmu 🌸", isCorrect: true },
      { text: "Karena Azkia selalu bawa cemilan banyak 🍩", isCorrect: false },
      { text: "Karena Azkia jago main tebak-tebakan 🧩", isCorrect: false },
    ],
    explanation: "Kehangatan dan perhatian Azkia yang selalu bikin setiap obrolan berharga! 💕",
    hostReaction: "Cerita berjam-jam gak bakal kerasa kalau sama Azkia! ☕",
  },
  {
    id: 7,
    question: "Doa dan harapan paling tulus dari Kakek buat Azkia di usia baru ini adalah...?",
    options: [
      { text: "Sehat selalu, bahagia terus, dan semua impianmu tercapai! 🎁", isCorrect: true },
      { text: "Beli motor trail baru warna pink 🏍️", isCorrect: false },
      { text: "Jadi presiden komplek perumahan 👑", isCorrect: false },
    ],
    explanation: "Doa terbaik selalu mengalir buat kesehatan, kebahagiaan, dan kesuksesan Azkia! 🏆",
    hostReaction: "Aamiin ya Allah! Doa terbaik selalu untukmu! ✨",
  },
];

export default function BirthdayQuiz({ onComplete }: { onComplete: () => void }) {
  const [gameState, setGameState] = useState<"start" | "playing" | "ended">("start");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [timer, setTimer] = useState(15);

  const currentQ = memoryQuestions[currentIdx];

  // Question Timer Countdown
  useEffect(() => {
    if (gameState !== "playing" || selectedOption !== null) return;

    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          // Auto select wrong option on timeout
          handleSelectOption(-1);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState, currentIdx, selectedOption]);

  const handleSelectOption = (idx: number) => {
    if (selectedOption !== null || !currentQ) return;
    setSelectedOption(idx);

    const isCorrect = idx >= 0 && currentQ.options[idx]?.isCorrect;

    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);

      const speedBonus = timer > 8 ? 5 : 0;
      const pts = 20 + speedBonus;
      setScore(s => s + pts);
    } else {
      setStreak(0);
      setScore(s => Math.max(0, s + 5)); // Participation points for funny answers!
    }
  };

  const handleNext = () => {
    if (currentIdx < memoryQuestions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setTimer(15);
    } else {
      setGameState("ended");
    }
  };

  const startGame = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setTimer(15);
    setGameState("playing");
  };

  const getAwardTitle = (finalScore: number) => {
    if (finalScore >= 140) return { title: "CHEMISTRY PERFECT SCORE 👑", desc: "Ingatan Azkia tajam banget! Momen-momen manis kita selalu tersimpan sempurna!" };
    if (finalScore >= 100) return { title: "CHEMISTRY SEJATI 🌟", desc: "Hebat banget! Azkia inget banget sama kenangan-kenangan manis kita!" };
    return { title: "INGATAN HANGAT 🌸", desc: "Jawaban yang sangat manis dan penuh senyuman!" };
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3 select-none">
      {/* Start View */}
      {gameState === "start" && (
        <div className="text-center py-6 space-y-4 max-w-sm mx-auto">
          <div className="relative flex justify-center">
            <MimiBunny state="excited" className="w-20 h-24 hover:rotate-6 transition-transform drop-shadow-md" />
            <div className="absolute -top-3 right-6 bg-[#FF5E83] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm animate-pulse">
              MEMORY CHECK 💌
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="font-display text-3xl text-[#C91F5A]">Kuis Memori & Chemistry! 💕</h3>
            <p className="text-xs text-[#C91F5A] font-bold uppercase tracking-wider">Tes Seberapa Ingat Azkia Soal Momen Kita</p>
          </div>

          <p className="text-sm text-[#8B717A] leading-relaxed font-body">
            Kuis ini khusus Kakek buat untuk Azkia! Uji seberapa ingat & paham Azkia sama momen-momen manis, tawa, dan kenangan berdua!
          </p>

          <button
            onClick={startGame}
            className="w-full py-3.5 bg-gradient-to-r from-[#FF5E83] to-[#C91F5A] hover:from-[#C91F5A] hover:to-[#A81748] text-white font-bold rounded-2xl shadow-xl transition-all active:scale-95 text-base flex items-center justify-center gap-2"
          >
            <span>Mulai Kuis Memori!</span> 🚀
          </button>
        </div>
      )}

      {/* Playing Quiz View */}
      {gameState === "playing" && currentQ && (
        <div className="w-full max-w-lg space-y-3">
          {/* Top Bar Stats */}
          <div className="flex justify-between items-center bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl border-2 border-[#FFC5D0] shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#C91F5A] uppercase tracking-wider">Pertanyaan:</span>
              <span className="text-lg font-display text-[#C91F5A] bg-[#FFE4EC] px-3 py-0.5 rounded-full border border-[#FFC5D0]">
                {currentIdx + 1} / {memoryQuestions.length}
              </span>
              {streak >= 2 && (
                <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-extrabold px-2.5 py-0.5 rounded-full animate-bounce shadow-sm flex items-center gap-1">
                  <Flame size={12} fill="white" />
                  {streak}x Streak!
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 font-bold text-[#8B717A] text-xs">
              <Timer size={14} className="text-[#C91F5A]" />
              <span className={cn("text-lg font-display", timer <= 3 ? "text-red-500 animate-ping" : "text-[#C91F5A]")}>
                {timer}s
              </span>
            </div>
          </div>

          {/* Question Card Box */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQ.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="bg-white border-4 border-[#FFC5D0] p-5 md:p-6 rounded-3xl shadow-xl space-y-4 relative overflow-hidden"
            >
              {/* Host Reaction Bubble */}
              <div className="flex items-center gap-3 bg-[#FFF0F3] p-3 rounded-2xl border border-[#FFC5D0]">
                <MimiBunny
                  state={selectedOption !== null ? (memoryQuestions[currentIdx]?.options[selectedOption]?.isCorrect ? "excited" : "surprised") : "idle"}
                  className="w-12 h-14 flex-shrink-0"
                />
                <p className="text-xs font-semibold text-[#C91F5A] font-body italic leading-snug">
                  {selectedOption !== null
                    ? currentQ.hostReaction
                    : "Coba ingat-ingat lagi momen manis kita dan pilih jawaban paling pas ya! ✨"}
                </p>
              </div>

              {/* Question Text */}
              <div className="space-y-1 pt-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C91F5A] bg-[#FFE4EC] px-3 py-0.5 rounded-full inline-block">
                  MEMORI #{currentQ.id}
                </span>
                <h3 className="font-display text-xl md:text-2xl text-[#4A3038] leading-tight">
                  {currentQ.question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-2.5 pt-1">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = opt.isCorrect;

                  let optionStyle = "bg-[#FFF9FB] border-[#FFC5D0] text-[#4A3038] hover:bg-[#FFE4EC] hover:border-[#FF5E83]";

                  if (selectedOption !== null) {
                    if (isCorrect) {
                      optionStyle = "bg-[#DDF5E8] border-[#2F7D5C] text-[#2F7D5C] font-bold shadow-md scale-[1.02]";
                    } else if (isSelected) {
                      optionStyle = "bg-[#FFE4EC] border-[#FF5E83] text-[#C91F5A] font-bold opacity-80";
                    } else {
                      optionStyle = "bg-gray-50 border-gray-200 text-gray-400 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={selectedOption !== null}
                      className={cn(
                        "w-full text-left p-3.5 rounded-2xl border-2 text-sm md:text-base transition-all duration-200 flex items-center justify-between shadow-xs cursor-pointer active:scale-98",
                        optionStyle
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full bg-white border border-[#FFC5D0] flex items-center justify-center font-bold text-xs text-[#C91F5A]">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="font-medium">{opt.text}</span>
                      </div>

                      {selectedOption !== null && isCorrect && (
                        <Sparkles size={18} className="text-[#2F7D5C] animate-spin" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Next Question Button */}
              {selectedOption !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-2 border-t border-gray-100 flex flex-col space-y-2"
                >
                  <p className="text-xs text-[#8B717A] italic font-handwriting text-xl text-center">
                    &quot;{currentQ.explanation}&quot;
                  </p>

                  <button
                    onClick={handleNext}
                    className="w-full py-3 bg-gradient-to-r from-[#FF5E83] to-[#C91F5A] text-white font-bold rounded-2xl shadow-lg transition-transform active:scale-95 text-sm"
                  >
                    {currentIdx < memoryQuestions.length - 1 ? "Lanjut Memori Berikutnya ➔" : "Lihat Hasil Kuis Memori! 💕"}
                  </button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* Completion View */}
      {gameState === "ended" && (
        <div className="text-center py-6 space-y-4 max-w-sm mx-auto animate-in fade-in zoom-in duration-300">
          <div className="w-20 h-20 bg-gradient-to-tr from-[#FF5E83] to-[#FF9EBE] text-white rounded-3xl flex items-center justify-center mx-auto shadow-xl">
            <Trophy size={40} />
          </div>

          <div className="space-y-1">
            <h3 className="font-display text-3xl text-[#C91F5A]">Kuis Memori Selesai! 🎉</h3>
            <span className="bg-[#FFE4EC] border border-[#FFC5D0] text-[#C91F5A] text-xs font-bold px-3.5 py-1 rounded-full inline-block">
              {getAwardTitle(score).title}
            </span>
          </div>

          <div className="bg-[#FFF0F3] p-5 rounded-3xl border-2 border-[#FFC5D0] space-y-3 shadow-inner">
            <div className="flex justify-around items-center border-b border-[#FFC5D0]/60 pb-3">
              <div>
                <p className="text-[10px] text-[#8B717A] uppercase font-bold">Total Poin</p>
                <p className="text-3xl font-display text-[#C91F5A]">{score}</p>
              </div>
              <div className="w-px h-8 bg-[#FFC5D0]" />
              <div>
                <p className="text-[10px] text-[#8B717A] uppercase font-bold">Streak Beruntun</p>
                <p className="text-3xl font-display text-[#FF5E83]">{maxStreak}x 🔥</p>
              </div>
            </div>

            <p className="text-sm font-handwriting text-xl text-[#4A3038]">
              &quot;{getAwardTitle(score).desc}&quot;
            </p>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <button
              onClick={startGame}
              className="w-full py-3 bg-white border-2 border-[#FFC5D0] text-[#C91F5A] font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-[#FFE4EC] transition-colors text-sm shadow-sm"
            >
              <RefreshCw size={16} /> Ulangi Kuis 🚀
            </button>
            
            <button
              onClick={onComplete}
              className="w-full py-3.5 bg-gradient-to-r from-[#2F7D5C] to-[#246247] text-white font-bold rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-95 text-base"
            >
              <CheckCircle2 size={20} /> Simpan Hasil Kuis & Selesai
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
