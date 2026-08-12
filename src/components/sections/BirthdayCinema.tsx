"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { videos, VideoMemory } from "@/data/videos";
import { useMediaCoordinator } from "@/hooks/useMediaCoordinator";
import { BubuBear } from "@/components/mascots/BubuBear";
import { Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, Heart, Film, X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";

// Video Card with film strip borders and custom interactive controls
function VideoCard({ video, onOpenTheater }: { video: VideoMemory; onOpenTheater: () => void }) {
  const { mediaRef, isPlaying, toggle } = useMediaCoordinator(video.id, true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number }[]>([]);

  // Update progress bar
  useEffect(() => {
    const videoEl = mediaRef.current as HTMLVideoElement | null;
    if (!videoEl) return;

    const handleTimeUpdate = () => {
      if (videoEl.duration) {
        setProgress((videoEl.currentTime / videoEl.duration) * 100);
      }
    };

    videoEl.addEventListener("timeupdate", handleTimeUpdate);
    return () => videoEl.removeEventListener("timeupdate", handleTimeUpdate);
  }, [mediaRef]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const videoEl = mediaRef.current as HTMLVideoElement | null;
    if (videoEl) {
      videoEl.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(prev => !prev);
    setLikesCount(prev => (liked ? prev - 1 : prev + 1));
    
    if (!liked) {
      const newId = Date.now();
      const randomX = Math.random() * 30 - 15;
      setFloatingHearts(prev => [...prev, { id: newId, x: randomX }]);
      setTimeout(() => {
        setFloatingHearts(prev => prev.filter(h => h.id !== newId));
      }, 1000);
    }
  };

  return (
    <div className="relative group bg-[#1F0E17] border-2 border-[#54283C] hover:border-[#FF5E83] rounded-3xl p-4 md:p-5 shadow-2xl transition-all duration-500 flex flex-col h-full">
      
      {/* 35mm Film Strip Perforations top/bottom accents */}
      <div className="flex justify-between items-center px-3 pb-2 opacity-50">
        <div className="flex gap-2">
          <div className="w-3 h-2 bg-[#FF7B9B]/40 rounded-xs" />
          <div className="w-3 h-2 bg-[#FF7B9B]/40 rounded-xs" />
          <div className="w-3 h-2 bg-[#FF7B9B]/40 rounded-xs" />
        </div>
        <span className="text-[10px] font-mono tracking-widest text-[#FFB6C1] uppercase">FILM REEL #{video.id}</span>
        <div className="flex gap-2">
          <div className="w-3 h-2 bg-[#FF7B9B]/40 rounded-xs" />
          <div className="w-3 h-2 bg-[#FF7B9B]/40 rounded-xs" />
          <div className="w-3 h-2 bg-[#FF7B9B]/40 rounded-xs" />
        </div>
      </div>

      {/* Video Display Container */}
      <div 
        className="relative overflow-hidden rounded-2xl bg-black/80 cursor-pointer flex-1 aspect-[9/16] sm:aspect-[4/5] md:aspect-[9/16] max-h-[500px] flex items-center justify-center border border-white/10 group/player"
        onClick={toggle}
      >
        <video
          ref={mediaRef as React.RefObject<HTMLVideoElement>}
          src={video.webmSrc}
          poster={video.poster}
          playsInline
          muted={isMuted}
          loop
          className="w-full h-full object-cover rounded-xl"
          preload="metadata"
        >
          {video.mp4Src && <source src={video.mp4Src} type="video/mp4" />}
        </video>
        
        {/* Play/Pause Glow Button */}
        <div className={cn(
          "absolute inset-0 flex items-center justify-center transition-all duration-300",
          isPlaying ? "bg-black/0 group-hover/player:bg-black/30" : "bg-black/35"
        )}>
          <div className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center shadow-xl backdrop-blur-md transition-all duration-300 transform",
            isPlaying 
              ? "opacity-0 group-hover/player:opacity-100 bg-white/20 text-white scale-90 hover:scale-100" 
              : "bg-[#FF5E83] text-white scale-100 hover:scale-110 shadow-[#FF5E83]/40"
          )}>
            {isPlaying ? <Pause size={30} fill="white" /> : <Play size={30} fill="white" className="ml-1" />}
          </div>
        </div>

        {/* Video Controls Bar Overlay */}
        <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
          <button
            onClick={toggleMute}
            className="w-9 h-9 rounded-full bg-black/60 hover:bg-[#FF5E83] text-white flex items-center justify-center backdrop-blur-md transition-all border border-white/20 shadow-md"
            title={isMuted ? "Aktifkan Suara" : "Matikan Suara"}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          
          <button
            onClick={(e) => { e.stopPropagation(); onOpenTheater(); }}
            className="w-9 h-9 rounded-full bg-black/60 hover:bg-[#FF5E83] text-white flex items-center justify-center backdrop-blur-md transition-all border border-white/20 shadow-md"
            title="Tonton di Theater Mode"
          >
            <Maximize2 size={16} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/20">
          <div 
            className="h-full bg-gradient-to-r from-[#FF758F] to-[#FF5E83] transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Video Details & Interaction */}
      <div className="mt-4 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="font-display text-lg md:text-xl text-[#FFE4EC] mb-1 leading-snug">
            {video.title}
          </h3>
          <p className="text-sm text-[#FFB6C1]/80 font-handwriting text-lg leading-snug">
            {video.caption}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-[#3D1E2D] flex items-center justify-between">
          <button
            onClick={onOpenTheater}
            className="text-xs font-bold text-[#FF9EBE] hover:text-white flex items-center gap-1.5 bg-white/5 hover:bg-[#FF5E83] px-3 py-1.5 rounded-full transition-all border border-white/10"
          >
            <Film size={14} />
            <span>Theater Mode</span>
          </button>

          {/* Like Heart Button */}
          <div className="relative flex items-center">
            <button
              onClick={handleLike}
              className={cn(
                "p-1.5 rounded-full transition-all duration-200 hover:scale-125 active:scale-95 flex items-center justify-center",
                liked ? "bg-[#FF5E83] text-white" : "text-white/60 hover:text-[#FF5E83] hover:bg-white/10"
              )}
            >
              <Heart size={18} className={cn(liked && "fill-white")} />
              {likesCount > 0 && (
                <span className="text-xs font-bold ml-1">
                  {likesCount}
                </span>
              )}
            </button>

            {/* Floating Hearts */}
            <AnimatePresence>
              {floatingHearts.map(heart => (
                <motion.div
                  key={heart.id}
                  initial={{ opacity: 1, y: 0, x: heart.x, scale: 0.8 }}
                  animate={{ opacity: 0, y: -40, scale: 1.4 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute bottom-6 left-1/2 pointer-events-none text-[#FF5E83]"
                >
                  <Heart size={16} fill="#FF5E83" />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

// Fullscreen Cinema Theater Modal
function TheaterModal({
  isOpen,
  onClose,
  videos,
  initialIndex,
}: {
  isOpen: boolean;
  onClose: () => void;
  videos: VideoMemory[];
  initialIndex: number;
}) {
  const [index, setIndex] = useState(initialIndex);
  const [isMuted, setIsMuted] = useState(false);
  const currentVideo = videos[index];
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen) setIndex(initialIndex);
  }, [isOpen, initialIndex]);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setIndex(prev => (prev > 0 ? prev - 1 : videos.length - 1));
      if (e.key === "ArrowRight") setIndex(prev => (prev < videos.length - 1 ? prev + 1 : 0));
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, videos.length, onClose]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted || !isOpen || !currentVideo) return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 md:p-8">
        
        {/* Top Header */}
        <div className="w-full flex items-center justify-between z-20">
          <div className="flex items-center gap-2 bg-white/10 text-white px-4 py-1.5 rounded-full backdrop-blur-md text-sm border border-white/20">
            <Film size={16} className="text-[#FF5E83]" />
            <span>Birthday Cinema Theater</span>
          </div>

          <button
            onClick={onClose}
            className="w-11 h-11 bg-white/10 hover:bg-[#FF5E83] text-white rounded-full flex items-center justify-center transition-all hover:scale-110 border border-white/20"
          >
            <X size={24} />
          </button>
        </div>

        {/* Central Video Viewport */}
        <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
          {videos.length > 1 && (
            <button
              onClick={() => setIndex(prev => (prev > 0 ? prev - 1 : videos.length - 1))}
              className="hidden md:flex absolute left-4 z-30 w-12 h-12 bg-white/10 hover:bg-white/30 text-white rounded-full items-center justify-center backdrop-blur-md transition-all border border-white/20"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          <motion.div
            key={currentVideo.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-3xl w-full max-h-[75vh] flex flex-col items-center justify-center"
          >
            <video
              ref={videoRef}
              src={currentVideo.webmSrc}
              poster={currentVideo.poster}
              controls
              autoPlay
              muted={isMuted}
              loop
              className="max-h-[65vh] w-auto h-auto object-contain rounded-2xl shadow-2xl border border-white/10"
            >
              {currentVideo.mp4Src && <source src={currentVideo.mp4Src} type="video/mp4" />}
            </video>
          </motion.div>

          {videos.length > 1 && (
            <button
              onClick={() => setIndex(prev => (prev < videos.length - 1 ? prev + 1 : 0))}
              className="hidden md:flex absolute right-4 z-30 w-12 h-12 bg-white/10 hover:bg-white/30 text-white rounded-full items-center justify-center backdrop-blur-md transition-all border border-white/20"
            >
              <ChevronRight size={28} />
            </button>
          )}
        </div>

        {/* Video Caption & Information */}
        <div className="w-full text-center max-w-xl mx-auto z-20 space-y-2">
          <h3 className="font-display text-xl md:text-2xl text-white">
            {currentVideo.title}
          </h3>
          <p className="font-handwriting text-xl text-[#FFB6C1]">
            {currentVideo.caption}
          </p>
        </div>
      </div>
    </AnimatePresence>,
    document.body
  );
}

export function BirthdayCinema() {
  const [theaterOpen, setTheaterOpen] = useState(false);
  const [theaterIndex, setTheaterIndex] = useState(0);

  const openTheater = (index: number) => {
    setTheaterIndex(index);
    setTheaterOpen(true);
  };

  return (
    <section className="relative py-24 md:py-36 px-4 md:px-8 bg-gradient-to-b from-[#2A1620] via-[#381B2B] to-[#2A1620] text-white overflow-hidden">
      
      {/* Background Glowing Ambient Orbs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#FF5E83]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-[#FFB6C1]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Mascot Accent */}
        <div className="flex justify-center mb-4">
          <div className="relative group cursor-pointer">
            <BubuBear state="excited" className="w-20 h-20 md:w-24 md:h-24 hover:rotate-6 transition-transform" />
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/95 text-[#C91F5A] px-3.5 py-1 rounded-full text-xs md:text-sm font-semibold shadow-xl border border-[#FFC5D0] flex items-center gap-1.5 animate-bounce">
              <span>🍿 Popcorn & Reels siap! ✨</span>
            </div>
          </div>
        </div>

        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3 mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#FF5E83]/20 border border-[#FF5E83]/50 text-[#FF9EBE] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-md">
            <Film size={14} />
            <span>Birthday Cinema & Reels</span>
          </div>

          <h2 className="font-display text-4xl md:text-6xl text-[#FFE4EC] tracking-tight">
            yang gerak-gerak
          </h2>

          <p className="text-[#FFB6C1]/80 text-base md:text-xl max-w-xl mx-auto font-body">
            karena ada beberapa momen yang lebih hidup dan bikin senyum sendiri saat bisa bergerak.
          </p>
        </motion.div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <VideoCard
                video={video}
                onOpenTheater={() => openTheater(index)}
              />
            </motion.div>
          ))}
        </div>

        {/* Theater Modal */}
        <TheaterModal
          isOpen={theaterOpen}
          onClose={() => setTheaterOpen(false)}
          videos={videos}
          initialIndex={theaterIndex}
        />

      </div>
    </section>
  );
}
