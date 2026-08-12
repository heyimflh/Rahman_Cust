import React from "react";
import { cn } from "@/lib/utils";
import { MascotState } from "./BubuBear";

interface MascotProps extends React.SVGAttributes<SVGSVGElement> {
  state?: MascotState;
}

export function CuppyCake({ state = "idle", className, ...props }: MascotProps) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-12 h-12 transition-transform duration-300", 
        state === "excited" && "animate-bounce",
        state === "surprised" && "scale-105",
        state === "goodbye" && "opacity-80",
        className
      )}
      aria-hidden="true"
      {...props}
    >
      {/* Cup */}
      <path d="M 25 55 L 35 90 C 35 95, 65 95, 65 90 L 75 55 Z" fill="#FFD8C8" />
      <path d="M 35 55 L 40 90 M 50 55 L 50 90 M 65 55 L 60 90" stroke="#E6BEAE" strokeWidth="2" />
      
      {/* Frosting */}
      <path d="M 15 55 C 15 35, 30 25, 50 15 C 70 25, 85 35, 85 55 C 85 65, 15 65, 15 55 Z" fill="#FF6688" />
      <path d="M 15 55 C 25 65, 35 50, 45 60 C 55 50, 65 65, 75 55 C 80 60, 85 55, 85 55" stroke="#C91F5A" strokeWidth="2" strokeLinecap="round" opacity="0.3" fill="none" />
      
      {/* Cherry */}
      <circle cx="50" cy="15" r="8" fill="#C91F5A" />
      <path d="M 50 7 Q 60 0 65 10" stroke="#2F7D5C" strokeWidth="2" fill="none" />
      
      {/* Sprinkles */}
      <rect x="30" y="30" width="6" height="2" rx="1" transform="rotate(45 30 30)" fill="#FFF1A8" />
      <rect x="65" y="35" width="6" height="2" rx="1" transform="rotate(-30 65 35)" fill="#DFF2FF" />
      <rect x="45" y="25" width="6" height="2" rx="1" transform="rotate(15 45 25)" fill="#FFF9FB" />
      
      {/* Eyes based on state */}
      {state === "idle" && (
        <>
          <circle cx="40" cy="45" r="3.5" fill="#4A3038" />
          <circle cx="60" cy="45" r="3.5" fill="#4A3038" />
          <path d="M 47 52 Q 50 55 53 52" stroke="#4A3038" strokeWidth="2" strokeLinecap="round" fill="none" />
        </>
      )}
      {state === "excited" && (
        <>
          <path d="M 37 45 Q 40 41 43 45" stroke="#4A3038" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M 57 45 Q 60 41 63 45" stroke="#4A3038" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M 47 50 Q 50 58 53 50 Z" fill="#4A3038" />
        </>
      )}
      {state === "surprised" && (
        <>
          <circle cx="40" cy="45" r="4.5" fill="#4A3038" />
          <circle cx="60" cy="45" r="4.5" fill="#4A3038" />
          <circle cx="50" cy="55" r="3.5" fill="#4A3038" />
        </>
      )}
      {state === "goodbye" && (
        <>
          <path d="M 37 46 Q 40 49 43 46" stroke="#4A3038" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M 57 46 Q 60 49 63 46" stroke="#4A3038" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M 47 53 Q 50 56 53 53" stroke="#4A3038" strokeWidth="2" strokeLinecap="round" fill="none" />
        </>
      )}
    </svg>
  );
}
