"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useMediaCoordinator } from "@/hooks/useMediaCoordinator";
import { Play, Pause, Volume2, VolumeX, Music, Volume1, Sparkles, ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface BackgroundMusicProps {
  hasEntered: boolean;
}

export function BackgroundMusic({ hasEntered }: BackgroundMusicProps) {
  const { mediaRef, isPlaying, play, pause } = useMediaCoordinator("bg-music", false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  // Audio source URL
  const audioSrc = "/Bazzi - Beautiful feat. Camila [Official Audio] - Bazzi (128k).mp3";

  // Handle Autoplay when door is opened
  useEffect(() => {
    if (hasEntered && !userInteracted) {
      setUserInteracted(true);
      play().then(() => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 4500);
      }).catch((err) => {
        console.warn("Autoplay blocked by browser policy:", err);
      });
    }
  }, [hasEntered, userInteracted, play]);

  // Sync volume with audio element
  useEffect(() => {
    const audioEl = mediaRef.current as HTMLAudioElement | null;
    if (audioEl) {
      audioEl.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted, mediaRef]);

  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play().then(() => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }).catch((err) => {
        console.warn("Play failed:", err);
      });
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  return (
    <>
      {/* Hidden HTML5 Audio Element */}
      <audio
        ref={mediaRef as React.RefObject<HTMLAudioElement>}
        src={audioSrc}
        loop
        preload="auto"
      />

      {/* Floating Music Widget Container */}
      <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-40 select-none flex flex-col items-end gap-1.5">
        
        {/* Autoplay Toast Notification */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-white/95 backdrop-blur-md border border-[#FFC5D0] shadow-[0_6px_20px_rgba(247,90,126,0.2)] rounded-2xl px-3 py-2 flex items-center gap-2 max-w-[220px] sm:max-w-xs"
            >
              <div className="w-7 h-7 rounded-full bg-[#FFE4EC] flex items-center justify-center text-[#C91F5A] shrink-0 animate-bounce">
                <Music size={14} />
              </div>
              <div className="space-y-0.5 text-left overflow-hidden">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#C91F5A] flex items-center gap-1">
                  <span>Backsound On</span>
                  <Sparkles size={10} className="text-[#FF5E83]" />
                </p>
                <p className="text-[11px] font-semibold text-[#4A3038] truncate">
                  Bazzi - Beautiful
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expanded Volume & Control Panel */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-white/95 backdrop-blur-md border-2 border-[#FFC5D0] shadow-[0_10px_30px_rgba(247,90,126,0.25)] rounded-2xl p-3 w-56 sm:w-72 space-y-2.5"
            >
              {/* Header / Track Info */}
              <div className="flex items-center justify-between pb-1.5 border-b border-[#FFECF0]">
                <div className="flex items-center gap-2 overflow-hidden">
                  <div className={cn(
                    "w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-[#FF5E83] to-[#FF9EBE] flex items-center justify-center text-white shrink-0 shadow-xs",
                    isPlaying && "animate-spin"
                  )} style={{ animationDuration: "6s" }}>
                    <Music size={14} />
                  </div>
                  <div className="truncate">
                    <h4 className="text-[11px] sm:text-xs font-bold text-[#4A3038] truncate">Beautiful</h4>
                    <p className="text-[9px] sm:text-[10px] text-[#8B717A] truncate">Bazzi ft. Camila</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-[#8B717A] hover:text-[#C91F5A] p-1 rounded-full hover:bg-[#FFE4EC] transition-colors"
                >
                  <ChevronDown size={16} />
                </button>
              </div>

              {/* Volume Slider Controls */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-semibold text-[#8B717A]">
                  <span className="flex items-center gap-1">
                    {isMuted || volume === 0 ? (
                      <VolumeX size={12} className="text-[#C91F5A]" />
                    ) : volume < 0.5 ? (
                      <Volume1 size={12} className="text-[#C91F5A]" />
                    ) : (
                      <Volume2 size={12} className="text-[#C91F5A]" />
                    )}
                    <span>Volume</span>
                  </span>
                  <span>{isMuted ? "0%" : `${Math.round(volume * 100)}%`}</span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-full h-1.5 bg-[#FFE4EC] rounded-lg appearance-none cursor-pointer accent-[#FF5E83]"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-2 pt-0.5">
                <button
                  onClick={toggleMute}
                  className={cn(
                    "py-1.5 px-3 rounded-xl border text-[11px] font-semibold transition-all flex items-center gap-1",
                    isMuted
                      ? "bg-[#FFE4EC] text-[#C91F5A] border-[#FFC5D0]"
                      : "bg-gray-50 text-[#8B717A] border-gray-200 hover:bg-[#FFE4EC] hover:text-[#C91F5A]"
                  )}
                >
                  {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  <span>{isMuted ? "Unmute" : "Mute"}</span>
                </button>

                <button
                  onClick={togglePlay}
                  className="py-1.5 px-4 rounded-xl bg-gradient-to-r from-[#FF5E83] to-[#C91F5A] hover:from-[#C91F5A] hover:to-[#A81748] text-white font-bold text-[11px] shadow-sm transition-all active:scale-95 flex items-center gap-1.5"
                >
                  {isPlaying ? (
                    <>
                      <Pause size={14} fill="white" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play size={14} fill="white" />
                      <span>Play</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Floating Trigger Button (Minimalist Circle on Mobile, Pill on Desktop) */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "bg-white/95 backdrop-blur-md border-2 border-[#FFC5D0] shadow-[0_6px_20px_rgba(247,90,126,0.22)] rounded-full transition-all duration-300 group hover:border-[#FF5E83] hover:bg-white flex items-center justify-center cursor-pointer",
            "p-1.5 sm:px-3.5 sm:py-2", // Ultra compact circle on mobile, pill on sm+
            isPlaying && "ring-2 ring-[#FF5E83]/30"
          )}
        >
          {/* Vinyl Record Icon */}
          <div
            onClick={togglePlay}
            className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-[#2A1620] via-[#4A3038] to-[#1F0E17] flex items-center justify-center shadow-md overflow-hidden shrink-0 transition-transform"
            title={isPlaying ? "Pause Backsound" : "Putar Backsound"}
          >
            {/* Grooves on vinyl */}
            <div className="absolute inset-1 rounded-full border border-white/20" />
            <div className="absolute inset-2.5 rounded-full border border-white/10" />

            {/* Vinyl Center Badge */}
            <div
              className={cn(
                "w-3 h-3 rounded-full bg-[#FF5E83] border border-white flex items-center justify-center z-10",
                isPlaying && "animate-spin"
              )}
              style={{ animationDuration: "3s" }}
            >
              <div className="w-0.5 h-0.5 rounded-full bg-white" />
            </div>

            {/* Sound Wave Overlay Icon on Hover/Tap */}
            <div className="absolute inset-0 bg-[#FF5E83]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white z-20">
              {isPlaying ? <Pause size={13} fill="white" /> : <Play size={13} fill="white" className="ml-0.5" />}
            </div>
          </div>

          {/* Controls Trigger (Clicking opens/closes expanded panel) */}
          <div onClick={() => setIsExpanded((prev) => !prev)} className="flex items-center gap-1.5">
            {/* Animated Equalizer Sound Bars */}
            <div className="flex items-end gap-0.5 h-3.5 px-1 cursor-pointer">
              {isPlaying ? (
                <>
                  <span className="w-0.5 sm:w-1 bg-[#FF5E83] rounded-full animate-[bounce_1s_infinite_100ms]" style={{ height: "60%" }} />
                  <span className="w-0.5 sm:w-1 bg-[#C91F5A] rounded-full animate-[bounce_1s_infinite_300ms]" style={{ height: "100%" }} />
                  <span className="w-0.5 sm:w-1 bg-[#FF80AB] rounded-full animate-[bounce_1s_infinite_200ms]" style={{ height: "40%" }} />
                </>
              ) : (
                <Music size={14} className="text-[#C91F5A]" />
              )}
            </div>

            {/* Song Label (Hidden on Mobile, Visible on Desktop for extra minimalism) */}
            <div className="text-left hidden sm:block">
              <p className="text-[11px] font-bold text-[#4A3038] leading-tight flex items-center gap-1">
                <span>{isPlaying ? "Backsound On" : "Backsound Off"}</span>
                {isPlaying && <Sparkles size={10} className="text-[#FF5E83]" />}
              </p>
              <p className="text-[9px] text-[#8B717A] leading-none truncate max-w-[90px]">
                Bazzi - Beautiful
              </p>
            </div>

            {/* Chevron toggle icon */}
            <button
              className="text-[#8B717A] hover:text-[#C91F5A] p-0.5 rounded-full transition-colors"
              title={isExpanded ? "Tutup Kontrol" : "Buka Kontrol Volume"}
            >
              {isExpanded ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
            </button>
          </div>
        </motion.div>

      </div>
    </>
  );
}
