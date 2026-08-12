import React from "react";
import { cn } from "@/lib/utils";
import { MascotState } from "./BubuBear";

interface MascotProps extends React.SVGAttributes<SVGSVGElement> {
  state?: MascotState;
}

export function PuffCloud({ state = "idle", className, ...props }: MascotProps) {
  return (
    <svg 
      viewBox="0 0 100 70" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-16 h-12 transition-transform duration-500 drop-shadow-md", 
        state === "idle" && "animate-float",
        state === "excited" && "scale-110 -translate-y-2",
        state === "surprised" && "scale-105",
        state === "goodbye" && "opacity-70",
        className
      )}
      aria-hidden="true"
      {...props}
    >
      <defs>
        <radialGradient id="cloudGrad" cx="50%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="75%" stopColor="#F0F8FF" />
          <stop offset="100%" stopColor="#D4EAFA" />
        </radialGradient>

        <radialGradient id="cloudBlushGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF7B9B" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#FF7B9B" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Cloud Base */}
      <path d="M 25 55 A 15 15 0 0 1 25 25 A 20 20 0 0 1 65 15 A 18 18 0 0 1 85 45 A 10 10 0 0 1 85 65 Z" fill="url(#cloudGrad)" />
      
      {/* Glossy Top Highlight */}
      <path d="M 30 25 A 15 15 0 0 1 60 18" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.8" fill="none" />

      {/* Blush */}
      <ellipse cx="35" cy="45" rx="6" ry="3.5" fill="url(#cloudBlushGrad)" />
      <ellipse cx="65" cy="45" rx="6" ry="3.5" fill="url(#cloudBlushGrad)" />
      
      {/* Eyes based on state */}
      {state === "idle" && (
        <>
          <circle cx="40" cy="35" r="3.5" fill="#362228" />
          <circle cx="38.5" cy="33.5" r="1.2" fill="#FFFFFF" />

          <circle cx="60" cy="35" r="3.5" fill="#362228" />
          <circle cx="58.5" cy="33.5" r="1.2" fill="#FFFFFF" />

          <path d="M 47 41 Q 50 44 53 41" stroke="#362228" strokeWidth="2" strokeLinecap="round" fill="none" />
        </>
      )}
      {state === "excited" && (
        <>
          <path d="M 36 36 Q 40 31 44 36" stroke="#362228" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M 56 36 Q 60 31 64 36" stroke="#362228" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M 47 40 Q 50 47 53 40 Z" fill="#FF5E83" />
          
          {/* Sparkles */}
          <path d="M 8 15 L 11 8 L 14 15 L 11 22 Z" fill="#FFD700" />
          <path d="M 85 10 L 88 4 L 91 10 L 88 16 Z" fill="#FFD700" />
        </>
      )}
      {state === "surprised" && (
        <>
          <circle cx="40" cy="35" r="4" fill="#362228" />
          <circle cx="60" cy="35" r="4" fill="#362228" />
          <circle cx="50" cy="45" r="3" fill="#362228" />
        </>
      )}
      {state === "goodbye" && (
        <>
          <path d="M 37 36 Q 40 39 43 36" stroke="#362228" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M 57 36 Q 60 39 63 36" stroke="#362228" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M 47 43 Q 50 46 53 43" stroke="#362228" strokeWidth="2" strokeLinecap="round" fill="none" />
        </>
      )}
    </svg>
  );
}

