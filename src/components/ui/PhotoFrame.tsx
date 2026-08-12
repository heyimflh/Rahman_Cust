"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Heart, ZoomIn, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export type TapeStyle = "pink" | "washi" | "heart" | "gold" | "grid";
export type TapePosition = "center" | "left" | "right";

export interface PhotoFrameProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  rotate?: number;
  tape?: boolean;
  tapeStyle?: TapeStyle;
  tapePosition?: TapePosition;
  stamp?: string;
  priority?: boolean;
  onPhotoClick?: () => void;
  className?: string;
}

export const PhotoFrame = React.forwardRef<HTMLDivElement, PhotoFrameProps>(
  (
    {
      src,
      alt,
      width,
      height,
      caption,
      rotate = 0,
      tape = true,
      tapeStyle = "pink",
      tapePosition = "center",
      stamp,
      priority = false,
      onPhotoClick,
      className,
      ...props
    },
    ref
  ) => {
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number }[]>([]);

    // 3D Tilt Effect
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      setTilt({
        x: (y / rect.height) * -10, // Tilt X
        y: (x / rect.width) * 10,   // Tilt Y
      });
    };

    const handleMouseLeave = () => {
      setTilt({ x: 0, y: 0 });
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

    // Tape Styles helper with clean positioning
    const renderTape = () => {
      if (!tape) return null;

      let posClass = "left-1/2 -translate-x-1/2 rotate-[-2deg]";
      if (tapePosition === "left") posClass = "left-4 rotate-[-4deg]";
      if (tapePosition === "right") posClass = "right-4 rotate-[3deg]";

      switch (tapeStyle) {
        case "washi":
          return (
            <div className={cn("absolute -top-3.5 w-24 h-5 bg-[#FFF3C4]/95 border-t border-b border-dashed border-[#FBC531] backdrop-blur-sm shadow-xs z-20 flex items-center justify-center rounded-xs", posClass)}>
              <span className="text-[9px] text-[#D63031] font-mono tracking-widest font-bold">MEMORIES</span>
            </div>
          );
        case "heart":
          return (
            <div className={cn("absolute -top-3.5 w-22 h-5 bg-[#FFD1DC]/95 backdrop-blur-sm shadow-xs border-b border-white/80 rounded-xs z-20 flex items-center justify-center gap-1", posClass)}>
              <span className="text-[10px]">💕</span>
              <span className="text-[10px]">✨</span>
              <span className="text-[10px]">💕</span>
            </div>
          );
        case "gold":
          return (
            <div className={cn("absolute -top-4 z-20 flex flex-col items-center", posClass)}>
              <div className="w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-white shadow-xs flex items-center justify-center z-10">
                <div className="w-1 h-1 rounded-full bg-amber-700" />
              </div>
              <div className="w-20 h-4 bg-[#FFE4EC]/90 shadow-xs -mt-2 rounded-xs border-b border-white/60" />
            </div>
          );
        case "grid":
          return (
            <div className={cn("absolute -top-3.5 w-24 h-5 bg-[#E0F7FA]/95 border border-[#B2EBF2] shadow-xs z-20 rounded-xs", posClass)}>
              <div className="w-full h-full opacity-40 bg-[radial-gradient(#00ACC1_1px,transparent_1px)] [background-size:6px_6px]" />
            </div>
          );
        case "pink":
        default:
          return (
            <div className={cn("absolute -top-3.5 w-22 h-5 bg-[#FFE4EC]/95 border-b border-white/80 backdrop-blur-sm shadow-xs z-20 rounded-xs", posClass)} />
          );
      }
    };

    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onPhotoClick}
        style={{
          transformStyle: "preserve-3d",
          transform: `rotate(${rotate}deg) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={cn(
          "group relative bg-white p-3 md:p-4 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 select-none cursor-pointer border border-[#F5E6EB]",
          className
        )}
        {...(props as any)}
      >
        {/* Tape decoration at top of outer frame */}
        {renderTape()}

        {/* Photo Container */}
        <div className="relative overflow-hidden bg-gray-100 rounded-lg shadow-inner aspect-auto">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={85}
          />

          {/* Stamp Badge: Placed INSIDE photo container to eliminate any overlap with tape */}
          {stamp && (
            <div
              className={cn(
                "absolute top-2.5 z-10 bg-white/95 backdrop-blur-md border border-[#FFB6C1]/70 text-[#C91F5A] px-2.5 py-0.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1",
                tapePosition === "right" ? "left-2.5" : "right-2.5"
              )}
            >
              <Sparkles size={11} className="text-[#FF5E83]" />
              <span>{stamp}</span>
            </div>
          )}

          {/* Hover Overlay with Zoom Icon */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3">
            <span className="text-white text-xs font-medium flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full">
              <ZoomIn size={12} /> Perbesar
            </span>
          </div>
        </div>

        {/* Caption & Footer Bar */}
        <div className="mt-3 flex items-center justify-between gap-2">
          {caption ? (
            <p className="font-handwriting text-xl md:text-2xl text-[#4A3038] leading-tight flex-1">
              {caption}
            </p>
          ) : (
            <div className="h-4" />
          )}

          {/* Like Heart Button */}
          <div className="relative flex items-center">
            <button
              onClick={handleLike}
              className={cn(
                "p-1.5 rounded-full transition-all duration-200 hover:scale-125 active:scale-95 flex items-center justify-center",
                liked ? "bg-[#FFE4EC] text-[#C91F5A]" : "text-gray-400 hover:text-[#C91F5A] hover:bg-gray-100"
              )}
              title="Sukai foto ini"
              aria-label="Sukai foto ini"
            >
              <Heart
                size={18}
                className={cn("transition-colors", liked && "fill-[#C91F5A]")}
              />
              {likesCount > 0 && (
                <span className="text-xs font-bold ml-1 text-[#C91F5A]">
                  {likesCount}
                </span>
              )}
            </button>

            {/* Floating Hearts Animation */}
            <AnimatePresence>
              {floatingHearts.map(heart => (
                <motion.div
                  key={heart.id}
                  initial={{ opacity: 1, y: 0, x: heart.x, scale: 0.8 }}
                  animate={{ opacity: 0, y: -40, scale: 1.4 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute bottom-6 left-1/2 pointer-events-none text-[#C91F5A]"
                >
                  <Heart size={16} fill="#C91F5A" />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Paper texture overlay accent */}
        <div className="absolute inset-0 bg-amber-950/5 pointer-events-none rounded-xl" />
      </motion.div>
    );
  }
);

PhotoFrame.displayName = "PhotoFrame";
