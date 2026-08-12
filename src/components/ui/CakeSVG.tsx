"use client";

import React from "react";
import { motion } from "motion/react";

/* ================================================================
   TYPES & CONFIGURATIONS
   ================================================================ */
export type FlavorType = "pink" | "choco" | "cream" | "matcha";

export interface PlacedTopping {
  slotIndex: number;
  emoji: string;
  id: number;
}

export interface DecoratedCakeData {
  flavor: FlavorType;
  placedToppings: PlacedTopping[];
  activePatterns: string[];
  candleCount: number;
}

export const DEFAULT_DECORATED_CAKE: DecoratedCakeData = {
  flavor: "pink",
  placedToppings: [
    { slotIndex: 0, emoji: "👑", id: 1 },
    { slotIndex: 1, emoji: "🍓", id: 2 },
    { slotIndex: 2, emoji: "🍒", id: 3 },
    { slotIndex: 3, emoji: "⭐", id: 4 },
    { slotIndex: 4, emoji: "💖", id: 5 },
    { slotIndex: 6, emoji: "🎀", id: 6 },
    { slotIndex: 8, emoji: "🌸", id: 7 },
    { slotIndex: 12, emoji: "🍫", id: 8 },
  ],
  activePatterns: ["sprinkles"],
  candleCount: 3,
};

interface FlavorTheme {
  body: string;
  bodyDark: string;
  bodyLight: string;
  top: string;
  topLight: string;
  cream: string;
  creamBorder: string;
  drip: string;
  name: string;
  emoji: string;
}

export const FLAVORS: Record<FlavorType, FlavorTheme> = {
  pink: {
    body: "#F8A4B8",
    bodyDark: "#E0849A",
    bodyLight: "#FCC8D8",
    top: "#FDE0E8",
    topLight: "#FFF3F7",
    cream: "#FFF5F8",
    creamBorder: "#F0B8C8",
    drip: "#FEE8EF",
    name: "Strawberry Velvet",
    emoji: "🍓",
  },
  choco: {
    body: "#8B5E3C",
    bodyDark: "#5D3A22",
    bodyLight: "#A07348",
    top: "#A07348",
    topLight: "#B8875C",
    cream: "#E8C9A0",
    creamBorder: "#C4A070",
    drip: "#5D3A22",
    name: "Belgian Chocolate",
    emoji: "🍫",
  },
  cream: {
    body: "#FFF5DC",
    bodyDark: "#EDE6C8",
    bodyLight: "#FFFFF0",
    top: "#FFFFF5",
    topLight: "#FFFFFF",
    cream: "#FFFFFF",
    creamBorder: "#E8DCC0",
    drip: "#FFFEF5",
    name: "Vanilla Pearl",
    emoji: "🍦",
  },
  matcha: {
    body: "#7BC47F",
    bodyDark: "#5DA362",
    bodyLight: "#9DD89F",
    top: "#B8E6BA",
    topLight: "#D4F0D5",
    cream: "#E8F5E9",
    creamBorder: "#A8D8AA",
    drip: "#C5E8C7",
    name: "Matcha Pistachio",
    emoji: "🍵",
  },
};

export const TOPPING_SLOTS: { x: number; y: number }[] = [
  // --- Top tier surface ---
  { x: 150, y: 157 },
  { x: 122, y: 163 },
  { x: 178, y: 163 },
  { x: 136, y: 150 },
  { x: 164, y: 150 },
  // --- Top tier front face ---
  { x: 108, y: 208 },
  { x: 133, y: 218 },
  { x: 150, y: 223 },
  { x: 167, y: 218 },
  { x: 192, y: 208 },
  // --- Bottom tier front face ---
  { x: 78, y: 268 },
  { x: 118, y: 278 },
  { x: 150, y: 283 },
  { x: 182, y: 278 },
  { x: 222, y: 268 },
];

const DRIPS = [
  { x: 102, h: 24 },
  { x: 120, h: 15 },
  { x: 138, h: 30 },
  { x: 157, h: 19 },
  { x: 175, h: 34 },
  { x: 196, h: 13 },
];

function computeRosettes(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  count: number
) {
  return Array.from({ length: count }, (_, i) => {
    const theta = (i / (count - 1)) * Math.PI;
    return { x: cx + rx * Math.cos(theta), y: cy + ry * Math.sin(theta) };
  });
}

const BOTTOM_ROSETTES = computeRosettes(150, 245, 108, 15, 11);
const TOP_ROSETTES = computeRosettes(150, 165, 62, 11, 7);

export function getCandleXPositions(count: number): number[] {
  switch (count) {
    case 1:
      return [150];
    case 2:
      return [130, 170];
    case 3:
      return [118, 150, 182];
    case 5:
      return [100, 125, 150, 175, 200];
    default:
      return [150];
  }
}

export const CANDLE_COLORS = ["#F48FB1", "#CE93D8", "#81D4FA", "#A5D6A7", "#FFE082"];

/* ================================================================
   SVG CAKE RENDERER
   ================================================================ */
interface CakeSVGProps {
  flavor: FlavorType;
  placedToppings: PlacedTopping[];
  activePatterns: Set<string> | string[];
  candleCount: number;
  candlesStatus?: boolean[];
  isBlown?: boolean;
  isBlowing?: boolean;
  age: number;
  onCandleClick?: (index: number) => void;
}

export function CakeSVG({
  flavor,
  placedToppings,
  activePatterns,
  candleCount,
  candlesStatus,
  isBlown = false,
  isBlowing = false,
  age,
  onCandleClick,
}: CakeSVGProps) {
  const f = FLAVORS[flavor] || FLAVORS.pink;
  const candleXs = getCandleXPositions(candleCount);
  const patternsSet = Array.isArray(activePatterns)
    ? new Set(activePatterns)
    : activePatterns;

  return (
    <svg
      viewBox="0 45 300 330"
      className="w-full h-full select-none"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Sprinkles Pattern */}
        <pattern
          id="pat-sprinkles"
          width="18"
          height="18"
          patternUnits="userSpaceOnUse"
        >
          <rect x="1" y="3" width="6" height="1.8" rx="0.9" fill="#FF4466" transform="rotate(40 4 3.9)" />
          <rect x="10" y="1" width="6" height="1.8" rx="0.9" fill="#FFD600" transform="rotate(-35 13 1.9)" />
          <rect x="3" y="11" width="6" height="1.8" rx="0.9" fill="#29B6F6" transform="rotate(20 6 11.9)" />
          <rect x="12" y="10" width="6" height="1.8" rx="0.9" fill="#66BB6A" transform="rotate(-50 15 10.9)" />
          <rect x="7" y="6" width="5" height="1.5" rx="0.75" fill="#CE93D8" transform="rotate(60 9.5 6.75)" />
        </pattern>

        {/* Cheese Pattern */}
        <pattern
          id="pat-cheese"
          width="15"
          height="15"
          patternUnits="userSpaceOnUse"
        >
          <rect x="1" y="2" width="6" height="2" rx="1" fill="#FFD54F" transform="rotate(25 4 3)" opacity="0.85" />
          <rect x="8" y="9" width="5" height="1.5" rx="0.75" fill="#FFCA28" transform="rotate(-15 10.5 9.75)" opacity="0.75" />
        </pattern>

        {/* Chocochips Pattern */}
        <pattern
          id="pat-chocochips"
          width="18"
          height="18"
          patternUnits="userSpaceOnUse"
        >
          <ellipse cx="5" cy="5" rx="3.5" ry="2.2" fill="#3E2723" transform="rotate(15 5 5)" />
          <ellipse cx="14" cy="13" rx="3" ry="2" fill="#4E342E" transform="rotate(-25 14 13)" />
        </pattern>

        <clipPath id="clip-top-surface">
          <ellipse cx="150" cy="165" rx="58" ry="9" />
        </clipPath>
        <clipPath id="clip-top-body">
          <rect x="90" y="168" width="120" height="74" />
        </clipPath>
        <clipPath id="clip-bottom-surface">
          <ellipse cx="150" cy="245" rx="105" ry="13" />
        </clipPath>
        <clipPath id="clip-bottom-body">
          <rect x="45" y="248" width="210" height="88" />
        </clipPath>
      </defs>

      {/* ==================== CAKE BOARD ==================== */}
      <ellipse cx="150" cy="352" rx="120" ry="8" fill="rgba(0,0,0,0.06)" />
      <ellipse cx="150" cy="348" rx="132" ry="14" fill="#F0EDED" stroke="#E0DCDC" strokeWidth="1" />
      <ellipse cx="148" cy="346" rx="100" ry="8" fill="none" stroke="white" strokeWidth="0.8" opacity="0.5" />
      <ellipse cx="150" cy="348" rx="125" ry="11" fill="none" stroke="#D8D4D4" strokeWidth="0.3" strokeDasharray="2 4" />

      {/* ==================== BOTTOM TIER ==================== */}
      <ellipse cx="150" cy="338" rx="108" ry="15" fill={f.bodyDark} />
      <rect x="42" y="245" width="216" height="93" fill={f.body} />
      <rect x="42" y="245" width="25" height="93" fill={f.bodyLight} opacity="0.35" />
      <rect x="233" y="245" width="25" height="93" fill={f.bodyDark} opacity="0.25" />
      
      <line x1="42" y1="272" x2="258" y2="272" stroke={f.bodyDark} strokeWidth="0.3" opacity="0.12" />
      <line x1="42" y1="310" x2="258" y2="310" stroke={f.bodyDark} strokeWidth="0.3" opacity="0.12" />

      <ellipse cx="150" cy="245" rx="108" ry="15" fill={f.top} />
      <ellipse cx="143" cy="242" rx="55" ry="6" fill={f.topLight} opacity="0.4" />

      {/* Bottom tier cream rosettes */}
      {BOTTOM_ROSETTES.map((pos, i) => (
        <g key={`br${i}`}>
          <circle cx={pos.x} cy={pos.y} r={5.5} fill={f.cream} stroke={f.creamBorder} strokeWidth="0.6" />
          <circle cx={pos.x - 1} cy={pos.y - 1} r={1.8} fill="white" opacity="0.4" />
        </g>
      ))}

      {/* ==================== TOP TIER ==================== */}
      <rect x="88" y="165" width="124" height="80" fill={f.body} />
      <rect x="88" y="165" width="18" height="80" fill={f.bodyLight} opacity="0.35" />
      <rect x="194" y="165" width="18" height="80" fill={f.bodyDark} opacity="0.25" />

      {/* Frosting drips */}
      {DRIPS.map((drip, i) => {
        const y0 = 165;
        return (
          <path
            key={`drip${i}`}
            d={`M${drip.x - 3.5},${y0}
                C${drip.x - 4},${y0 + drip.h * 0.4}
                 ${drip.x - 3},${y0 + drip.h * 0.7}
                 ${drip.x - 1.5},${y0 + drip.h}
                Q${drip.x},${y0 + drip.h + 3.5}
                 ${drip.x + 1.5},${y0 + drip.h}
                C${drip.x + 3},${y0 + drip.h * 0.7}
                 ${drip.x + 4},${y0 + drip.h * 0.4}
                 ${drip.x + 3.5},${y0} Z`}
            fill={f.drip}
            opacity="0.8"
          />
        );
      })}

      <ellipse cx="150" cy="165" rx="62" ry="11" fill={f.top} />
      <ellipse cx="147" cy="162" rx="30" ry="4.5" fill={f.topLight} opacity="0.5" />

      {/* Top tier cream rosettes */}
      {TOP_ROSETTES.map((pos, i) => (
        <g key={`tr${i}`}>
          <circle cx={pos.x} cy={pos.y} r={4.5} fill={f.cream} stroke={f.creamBorder} strokeWidth="0.5" />
          <circle cx={pos.x - 0.8} cy={pos.y - 0.8} r={1.2} fill="white" opacity="0.4" />
        </g>
      ))}

      {/* ==================== PATTERN OVERLAYS ==================== */}
      {Array.from(patternsSet).map((patternId) => {
        const patRef = `url(#pat-${patternId})`;
        return (
          <g key={patternId} opacity="0.55">
            <ellipse cx="150" cy="165" rx="58" ry="9" fill={patRef} clipPath="url(#clip-top-surface)" />
            <rect x="90" y="168" width="120" height="74" fill={patRef} clipPath="url(#clip-top-body)" />
            <ellipse cx="150" cy="245" rx="105" ry="13" fill={patRef} clipPath="url(#clip-bottom-surface)" />
            <rect x="45" y="248" width="210" height="88" fill={patRef} clipPath="url(#clip-bottom-body)" />
          </g>
        );
      })}

      {/* ==================== EMOJI TOPPINGS ==================== */}
      {placedToppings.map((t) => {
        const slot = TOPPING_SLOTS[t.slotIndex];
        if (!slot) return null;
        return (
          <text
            key={t.id}
            x={slot.x}
            y={slot.y + 5}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="16"
            className="select-none pointer-events-none"
            style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.15))" }}
          >
            {t.emoji}
          </text>
        );
      })}

      {/* ==================== BANNER ON BOTTOM TIER ==================== */}
      <rect
        x="58"
        y="298"
        width="184"
        height="34"
        rx="17"
        fill="white"
        fillOpacity="0.92"
        stroke={f.creamBorder}
        strokeWidth="1"
      />
      <text
        x="150"
        y="312"
        textAnchor="middle"
        fontSize="9.5"
        fontWeight="bold"
        fill="#4A3038"
        fontFamily="Comfortaa, Comic Sans MS, cursive"
      >
        {`Happy ${age}th Birthday`}
      </text>
      <text
        x="150"
        y="325"
        textAnchor="middle"
        fontSize="11"
        fontWeight="bold"
        fill="#C91F5A"
        fontFamily="Gochi Hand, Caveat, cursive"
      >
        Azkia! 👑
      </text>

      {/* ==================== AGE TOPPER STICK ==================== */}
      <rect x={148} y={86} width={4} height={79} rx={2} fill="#D7CCC8" stroke="#BCAAA4" strokeWidth="0.3" />

      {/* ==================== CANDLES & FLAMES ==================== */}
      {candleXs.map((cx, i) => {
        const color = CANDLE_COLORS[i % CANDLE_COLORS.length];
        
        // Determine flame lit status for this specific candle
        const isFlameLit = candlesStatus ? (candlesStatus[i] ?? false) : !isBlown;

        return (
          <g
            key={`candle${i}`}
            onClick={() => onCandleClick && onCandleClick(i)}
            className={onCandleClick && isFlameLit ? "cursor-pointer" : ""}
          >
            {/* Candle Body */}
            <rect x={cx - 3.5} y={125} width={7} height={40} rx={2.5} fill={color} stroke="rgba(0,0,0,0.12)" strokeWidth="0.4" />
            
            {/* Decorative Stripes */}
            <rect x={cx - 3.5} y={133} width={7} height={2} rx={1} fill="white" opacity="0.5" />
            <rect x={cx - 3.5} y={143} width={7} height={2} rx={1} fill="white" opacity="0.5" />
            <rect x={cx - 3.5} y={153} width={7} height={2} rx={1} fill="white" opacity="0.5" />
            
            {/* Wick */}
            <rect x={cx - 0.7} y={118} width={1.4} height={9} rx={0.5} fill="#555" />

            {/* Flickering Flame or Smoke */}
            {isFlameLit ? (
              <motion.g
                animate={{
                  y: isBlowing ? [-2, -4, -2] : [0, -1.5, 0.5, -1, 0],
                  scaleY: isBlowing ? [0.6, 0.4, 0.7] : [1, 1.15, 0.95, 1.1, 1],
                  rotate: isBlowing ? [-15, -25, -10] : [0, 2, -2, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: isBlowing ? 0.2 : 0.7 + i * 0.1,
                  ease: "easeInOut",
                }}
                style={{ transformOrigin: `${cx}px 118px` }}
              >
                {/* Outer Glow Halo */}
                <ellipse cx={cx} cy={110} rx={9} ry={13} fill="#FFF9C4" opacity="0.4" />
                
                {/* Main Flame Shape */}
                <path
                  d={`M${cx},100 Q${cx - 4.5},108 ${cx - 3.5},114 Q${cx},118 ${cx + 3.5},114 Q${cx + 4.5},108 ${cx},100 Z`}
                  fill="#FFD54F"
                />
                {/* Inner Flame Core */}
                <path
                  d={`M${cx},104 Q${cx - 2.5},110 ${cx - 2},114 Q${cx},116 ${cx + 2},114 Q${cx + 2.5},110 ${cx},104 Z`}
                  fill="#FF8F00"
                />
                {/* Hot Center */}
                <ellipse cx={cx} cy={112} rx={1.2} ry={2.5} fill="#FFF3E0" opacity="0.8" />
              </motion.g>
            ) : (
              <motion.g
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 0, y: -18 }}
                transition={{ duration: 1.8, ease: "easeOut" }}
              >
                <text x={cx} y={110} textAnchor="middle" fontSize="12">
                  💨
                </text>
              </motion.g>
            )}
          </g>
        );
      })}

      {/* ==================== AGE TOPPER BADGE ==================== */}
      <circle cx={150} cy={74} r={17} fill="#FFD700" stroke="#FFC107" strokeWidth="1.5" />
      <circle cx={150} cy={74} r={13} fill="none" stroke="#FFF8E1" strokeWidth="0.5" opacity="0.6" />
      <text
        x={150}
        y={79}
        textAnchor="middle"
        fontSize={15}
        fontWeight="bold"
        fill="#4A3038"
        fontFamily="Comfortaa, sans-serif"
      >
        {age}
      </text>
    </svg>
  );
}
