"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PartyCard } from "@/components/ui/PartyCard";
import { Button } from "@/components/ui/Button";

// Visual component for the cake built with simple CSS/SVG shapes
interface CakeVisualProps {
  shape: "round" | "bento" | "tower" | "playful";
  frosting: "strawberry" | "vanilla" | "chocolate" | "matcha";
  topping: "cherry" | "star" | "flower" | "sprinkles" | "none";
  label: string;
}

function CakeVisual({ shape, frosting, topping, label }: CakeVisualProps) {
  // Map frosting colors
  const frostingColors = {
    strawberry: "#FF6688",
    vanilla: "#FFF9FB",
    chocolate: "#4A3038",
    matcha: "#2F7D5C"
  };
  const color = frostingColors[frosting];

  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto flex items-center justify-center">
      {/* Plate */}
      <div className="absolute bottom-10 w-48 md:w-64 h-12 bg-gray-200 rounded-[100%] shadow-lg" />
      
      {/* Cake Shapes */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-end pb-12">
        {shape === "round" && (
          <motion.div layout className="relative w-40 h-32 rounded-t-xl rounded-b-[100%_20px]" style={{ backgroundColor: color }}>
            {/* Frosting Drips */}
            <div className="absolute top-0 w-full h-8 bg-white/30 rounded-t-xl" />
          </motion.div>
        )}
        
        {shape === "bento" && (
          <motion.div layout className="relative w-32 h-24 rounded-lg" style={{ backgroundColor: color }}>
            <div className="absolute inset-0 m-2 border-2 border-dashed border-white/40 rounded" />
          </motion.div>
        )}
        
        {shape === "tower" && (
          <motion.div layout className="flex flex-col items-center">
            <div className="w-24 h-16 rounded-t-xl rounded-b-md" style={{ backgroundColor: color }} />
            <div className="w-32 h-20 rounded-t-md rounded-b-xl" style={{ backgroundColor: color, filter: "brightness(0.9)" }} />
          </motion.div>
        )}
        
        {shape === "playful" && (
          <motion.div layout className="relative w-40 h-32" style={{ backgroundColor: color, borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%" }}>
          </motion.div>
        )}

        {/* Toppings (simplified for visual representation) */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={topping}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute top-20 md:top-24 z-20"
          >
            {topping === "cherry" && <div className="w-6 h-6 rounded-full bg-[#C91F5A]" />}
            {topping === "star" && <div className="text-3xl">⭐</div>}
            {topping === "flower" && <div className="text-3xl">🌸</div>}
            {topping === "sprinkles" && (
              <div className="flex gap-2">
                <div className="w-2 h-1 bg-[#DFF2FF] rotate-45" />
                <div className="w-2 h-1 bg-[#FFF1A8] -rotate-12" />
                <div className="w-2 h-1 bg-white rotate-90" />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Label */}
        {label && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] text-center z-20">
            <p className="font-display text-white text-lg tracking-wider drop-shadow-md" style={{ color: frosting === "vanilla" ? "#4A3038" : "white" }}>
              {label}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export function CakeStudio() {
  const [shape, setShape] = useState<CakeVisualProps["shape"]>("round");
  const [frosting, setFrosting] = useState<CakeVisualProps["frosting"]>("strawberry");
  const [topping, setTopping] = useState<CakeVisualProps["topping"]>("cherry");
  const [label, setLabel] = useState("AZKIA 19");

  const shapes: { id: CakeVisualProps["shape"], label: string }[] = [
    { id: "round", label: "Bulat" },
    { id: "bento", label: "Bento" },
    { id: "tower", label: "Tower" },
    { id: "playful", label: "Abstrak" }
  ];

  const frostings: { id: CakeVisualProps["frosting"], label: string, color: string }[] = [
    { id: "strawberry", label: "Strawberry", color: "bg-[#FF6688]" },
    { id: "vanilla", label: "Vanilla", color: "bg-[#FFF9FB] border border-gray-200" },
    { id: "chocolate", label: "Chocolate", color: "bg-[#4A3038]" },
    { id: "matcha", label: "Matcha", color: "bg-[#2F7D5C]" }
  ];

  const toppings: { id: CakeVisualProps["topping"], label: string }[] = [
    { id: "cherry", label: "Cherry" },
    { id: "star", label: "Bintang" },
    { id: "flower", label: "Bunga" },
    { id: "sprinkles", label: "Sprinkles" },
    { id: "none", label: "Polos" }
  ];

  return (
    <section className="py-20 md:py-28 px-5 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-block px-4 py-1.5 bg-[#FFF1A8] text-[#4A3038] rounded-full font-bold text-sm tracking-wider uppercase mb-4 shadow-sm">
            cake studio
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-[#C91F5A] mb-4">
            kue buatan sendiri
          </h2>
          <p className="text-[#8B717A] text-lg max-w-lg mx-auto">
            pilih sesuka hati, kue ini nggak ada kalorinya.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start">
          
          {/* Visual Preview */}
          <div className="w-full lg:w-1/2">
            <PartyCard className="p-8 h-full min-h-[400px] flex items-center justify-center bg-gradient-to-t from-[#FFE4EC]/50 to-white">
              <CakeVisual shape={shape} frosting={frosting} topping={topping} label={label} />
            </PartyCard>
          </div>

          {/* Controls */}
          <div className="w-full lg:w-1/2 space-y-8">
            {/* Shape */}
            <div>
              <h3 className="font-semibold text-[#8B717A] uppercase tracking-wider text-sm mb-3">Bentuk</h3>
              <div className="flex flex-wrap gap-2">
                {shapes.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setShape(s.id)}
                    className={`px-4 py-2 rounded-full font-medium transition-all ${
                      shape === s.id 
                        ? "bg-[#C91F5A] text-white shadow-md" 
                        : "bg-gray-100 text-[#8B717A] hover:bg-[#FFE4EC]"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Frosting */}
            <div>
              <h3 className="font-semibold text-[#8B717A] uppercase tracking-wider text-sm mb-3">Rasa (Warna)</h3>
              <div className="flex gap-3">
                {frostings.map(f => (
                  <button
                    key={f.id}
                    onClick={() => setFrosting(f.id)}
                    aria-label={`Pilih rasa ${f.label}`}
                    className={`w-10 h-10 rounded-full transition-transform ${f.color} ${
                      frosting === f.id ? "scale-125 ring-2 ring-offset-2 ring-[#FF6688]" : "hover:scale-110"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Topping */}
            <div>
              <h3 className="font-semibold text-[#8B717A] uppercase tracking-wider text-sm mb-3">Topping</h3>
              <div className="flex flex-wrap gap-2">
                {toppings.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setTopping(t.id)}
                    className={`px-4 py-2 rounded-full font-medium transition-all ${
                      topping === t.id 
                        ? "bg-[#C91F5A] text-white shadow-md" 
                        : "bg-gray-100 text-[#8B717A] hover:bg-[#FFE4EC]"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Label Input */}
            <div>
              <h3 className="font-semibold text-[#8B717A] uppercase tracking-wider text-sm mb-3">Tulisan</h3>
              <input 
                type="text" 
                maxLength={24}
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-[#F2C9D5] focus:border-[#FF6688] focus:outline-none bg-[#FFF9FB] text-[#4A3038] font-display text-lg"
                placeholder="Tulis sesuatu..."
              />
            </div>
            
            <div className="pt-4">
              <Button className="w-full" size="lg">
                Selesai, Siap Ditiup!
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
