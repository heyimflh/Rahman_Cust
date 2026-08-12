"use client";

import React from "react";
import { motion } from "motion/react";
import { MimiBunny } from "@/components/mascots/MimiBunny";

export function OutroSequence() {
  return (
    <section className="py-24 px-5 bg-gradient-to-t from-[#FFE4EC] to-white relative overflow-hidden flex flex-col items-center text-center">
      <div className="max-w-2xl mx-auto relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl md:text-5xl text-[#C91F5A] mb-8">
            sampai jumpa di kejutan berikutnya
          </h2>
          
          <div className="flex justify-center mb-8">
            <MimiBunny state="goodbye" className="w-24 h-24 text-[#FF6688]" />
          </div>
          
          <p className="font-handwriting text-2xl text-[#8B717A] mt-8">
            selamat merayakan diri sendiri!
          </p>
        </motion.div>
        
      </div>

      {/* Background decorations */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-white/40 backdrop-blur-3xl mask-image-gradient-t pointer-events-none" />
      <div className="absolute top-1/2 left-10 w-4 h-4 rounded-full bg-[#FF6688]/30 animate-pulse" />
      <div className="absolute bottom-20 right-16 w-6 h-6 rounded-full bg-[#C91F5A]/20 animate-pulse delay-700" />
      <div className="absolute top-20 right-24 w-3 h-3 rounded-full bg-[#FFF1A8]/60 animate-pulse delay-300" />
    </section>
  );
}
