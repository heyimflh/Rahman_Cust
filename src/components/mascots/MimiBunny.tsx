import React from "react";
import { cn } from "@/lib/utils";
import { MascotState } from "./BubuBear";

interface MascotProps extends React.SVGAttributes<SVGSVGElement> {
  state?: MascotState;
}

export function MimiBunny({ state = "idle", className, ...props }: MascotProps) {
  return (
    <svg 
      viewBox="0 0 100 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-14 h-16 transition-transform duration-300 drop-shadow-md", 
        state === "excited" && "-translate-y-3 scale-105",
        state === "surprised" && "scale-110",
        state === "goodbye" && "rotate-[5deg]",
        className
      )}
      aria-hidden="true"
      {...props}
    >
      <defs>
        {/* Head Gradient */}
        <radialGradient id="mimiHeadGrad" cx="45%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#FFEAF1" />
          <stop offset="100%" stopColor="#FFCDE0" />
        </radialGradient>

        {/* Ears Inner Gradient */}
        <radialGradient id="mimiInnerEarGrad" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FF9EBE" />
          <stop offset="100%" stopColor="#F55782" />
        </radialGradient>

        {/* Blush Gradient */}
        <radialGradient id="mimiBlushGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF5E83" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#FF5E83" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ears */}
      <ellipse cx="30" cy="30" rx="11" ry="26" fill="url(#mimiHeadGrad)" className={cn("origin-bottom transition-transform", state === "excited" && "rotate-[-10deg]")} />
      <ellipse cx="30" cy="30" rx="6" ry="19" fill="url(#mimiInnerEarGrad)" className={cn("origin-bottom transition-transform", state === "excited" && "rotate-[-10deg]")} />
      
      <ellipse cx="70" cy="30" rx="11" ry="26" fill="url(#mimiHeadGrad)" className={cn("origin-bottom transition-transform", state === "excited" && "rotate-[10deg]")} />
      <ellipse cx="70" cy="30" rx="6" ry="19" fill="url(#mimiInnerEarGrad)" className={cn("origin-bottom transition-transform", state === "excited" && "rotate-[10deg]")} />
      
      {/* Bunny Head Base */}
      <circle cx="50" cy="72" r="32" fill="url(#mimiHeadGrad)" />

      {/* Head Gloss Highlight */}
      <ellipse cx="40" cy="48" rx="12" ry="6" fill="#FFFFFF" fillOpacity="0.5" transform="rotate(-15 40 48)" />
      
      {/* Rosy Cheeks */}
      <ellipse cx="28" cy="76" rx="7" ry="4" fill="url(#mimiBlushGrad)" />
      <ellipse cx="72" cy="76" rx="7" ry="4" fill="url(#mimiBlushGrad)" />
      
      {/* Nose */}
      <path d="M 47 73 L 53 73 L 50 77 Z" fill="#FF5E83" />
      
      {/* Eyes based on state */}
      {state === "idle" && (
        <>
          <circle cx="34" cy="65" r="4" fill="#3A1E27" />
          <circle cx="32.5" cy="63.5" r="1.5" fill="#FFFFFF" />

          <circle cx="66" cy="65" r="4" fill="#3A1E27" />
          <circle cx="64.5" cy="63.5" r="1.5" fill="#FFFFFF" />
        </>
      )}
      {state === "excited" && (
        <>
          <path d="M 30 67 Q 34 61 38 67" stroke="#3A1E27" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 62 67 Q 66 61 70 67" stroke="#3A1E27" strokeWidth="3" strokeLinecap="round" fill="none" />
        </>
      )}
      {state === "surprised" && (
        <>
          <circle cx="34" cy="63" r="4.5" fill="#3A1E27" />
          <circle cx="32.5" cy="61.5" r="1.5" fill="#FFFFFF" />

          <circle cx="66" cy="63" r="4.5" fill="#3A1E27" />
          <circle cx="64.5" cy="61.5" r="1.5" fill="#FFFFFF" />

          <circle cx="50" cy="84" r="3.5" fill="#3A1E27" />
        </>
      )}
      {state === "goodbye" && (
        <>
          <path d="M 30 65 Q 34 69 38 65" stroke="#3A1E27" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 62 65 Q 66 69 70 65" stroke="#3A1E27" strokeWidth="3" strokeLinecap="round" fill="none" />
        </>
      )}
    </svg>
  );
}

