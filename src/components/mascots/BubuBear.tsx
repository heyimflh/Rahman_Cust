import React from "react";
import { cn } from "@/lib/utils";

export type MascotState = "idle" | "excited" | "surprised" | "goodbye";

interface MascotProps extends React.SVGAttributes<SVGSVGElement> {
  state?: MascotState;
}

export function BubuBear({ state = "idle", className, ...props }: MascotProps) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-14 h-14 transition-transform duration-300 drop-shadow-md", 
        state === "excited" && "-translate-y-2 scale-105",
        state === "surprised" && "scale-110",
        state === "goodbye" && "rotate-[-10deg]",
        className
      )}
      aria-hidden="true"
      {...props}
    >
      <defs>
        {/* Head Gradient */}
        <radialGradient id="bubuHeadGrad" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#A86E4B" />
          <stop offset="70%" stopColor="#7E4A2A" />
          <stop offset="100%" stopColor="#5E3316" />
        </radialGradient>

        {/* Ear Outer Gradient */}
        <radialGradient id="bubuEarGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#9B6240" />
          <stop offset="100%" stopColor="#5E3316" />
        </radialGradient>

        {/* Ear Inner Gradient */}
        <radialGradient id="bubuInnerEarGrad" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFD1DC" />
          <stop offset="100%" stopColor="#F299B0" />
        </radialGradient>

        {/* Muzzle Gradient */}
        <radialGradient id="bubuMuzzleGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#FFF0F3" />
        </radialGradient>

        {/* Blush Gradient */}
        <radialGradient id="bubuBlushGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF6B8B" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FF6B8B" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ears */}
      <circle cx="24" cy="24" r="14" fill="url(#bubuEarGrad)" />
      <circle cx="24" cy="24" r="7.5" fill="url(#bubuInnerEarGrad)" />
      
      <circle cx="76" cy="24" r="14" fill="url(#bubuEarGrad)" />
      <circle cx="76" cy="24" r="7.5" fill="url(#bubuInnerEarGrad)" />

      {/* Bear Head Base */}
      <circle cx="50" cy="54" r="34" fill="url(#bubuHeadGrad)" />

      {/* Glossy Head Highlight */}
      <ellipse cx="40" cy="28" rx="14" ry="7" fill="#FFFFFF" fillOpacity="0.15" transform="rotate(-15 40 28)" />

      {/* Rosy Cheeks */}
      <ellipse cx="28" cy="58" rx="8" ry="5" fill="url(#bubuBlushGrad)" />
      <ellipse cx="72" cy="58" rx="8" ry="5" fill="url(#bubuBlushGrad)" />

      {/* Muzzle */}
      <ellipse cx="50" cy="64" rx="17" ry="13" fill="url(#bubuMuzzleGrad)" />
      
      {/* Nose */}
      <ellipse cx="50" cy="58" rx="5" ry="3.5" fill="#3A1E14" />
      <circle cx="48.5" cy="57" r="1" fill="#FFFFFF" opacity="0.8" />
      
      {/* Mouth */}
      <path d="M 46 62 Q 50 65 54 62" stroke="#3A1E14" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Eyes based on state */}
      {state === "idle" && (
        <>
          <circle cx="34" cy="48" r="4" fill="#26140D" />
          <circle cx="32.5" cy="46.5" r="1.5" fill="#FFFFFF" />
          
          <circle cx="66" cy="48" r="4" fill="#26140D" />
          <circle cx="64.5" cy="46.5" r="1.5" fill="#FFFFFF" />
        </>
      )}

      {state === "excited" && (
        <>
          <path d="M 29 48 Q 34 43 39 48" stroke="#26140D" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 61 48 Q 66 43 71 48" stroke="#26140D" strokeWidth="3" strokeLinecap="round" fill="none" />
          {/* Sparkles */}
          <path d="M 8 28 L 12 20 L 16 28 L 12 36 Z" fill="#FFD700" />
          <path d="M 82 28 L 86 20 L 90 28 L 86 36 Z" fill="#FFD700" />
        </>
      )}

      {state === "surprised" && (
        <>
          <circle cx="34" cy="47" r="4.5" fill="#26140D" />
          <circle cx="32.5" cy="45.5" r="1.5" fill="#FFFFFF" />

          <circle cx="66" cy="47" r="4.5" fill="#26140D" />
          <circle cx="64.5" cy="45.5" r="1.5" fill="#FFFFFF" />

          <ellipse cx="50" cy="71" rx="3.5" ry="4.5" fill="#3A1E14" />
        </>
      )}

      {state === "goodbye" && (
        <>
          <path d="M 29 48 Q 34 52 39 48" stroke="#26140D" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 61 48 Q 66 52 71 48" stroke="#26140D" strokeWidth="3" strokeLinecap="round" fill="none" />
        </>
      )}

      {/* Cute Birthday Party Hat */}
      <g className={cn("origin-bottom transition-transform", state === "excited" && "rotate-[12deg]")}>
        <polygon points="36,22 64,22 50,-8" fill="#FF5E83" />
        {/* Hat Polka Dots */}
        <circle cx="50" cy="5" r="2.5" fill="#FFF1A8" />
        <circle cx="43" cy="15" r="2.5" fill="#FFF1A8" />
        <circle cx="57" cy="15" r="2.5" fill="#FFF1A8" />
        {/* Pom Pom */}
        <circle cx="50" cy="-8" r="4.5" fill="#FFD700" />
      </g>
    </svg>
  );
}

