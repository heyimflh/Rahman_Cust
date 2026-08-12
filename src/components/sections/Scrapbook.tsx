"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PhotoFrame, TapeStyle } from "@/components/ui/PhotoFrame";
import { Lightbox } from "@/components/ui/Lightbox";
import { photos, PhotoMemory } from "@/data/photos";
import { PuffCloud } from "@/components/mascots/PuffCloud";
import { MimiBunny } from "@/components/mascots/MimiBunny";
import { Sparkles, Camera, Heart, Layers, Grid } from "lucide-react";
import { cn } from "@/lib/utils";

type CategoryFilter = "all" | "featured" | "mini" | "scrapbook";

export function Scrapbook() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<CategoryFilter>("all");

  const featuredPhotos = photos.filter(p => p.role === "featured" || p.role === "hero");
  const funPhotos = photos.filter(p => p.role === "fun-card");
  const scrapbookPhotos = photos.filter(p => p.role === "scrapbook");

  // Determine displayed photos based on tab
  const getFilteredPhotos = () => {
    switch (activeTab) {
      case "featured":
        return featuredPhotos;
      case "mini":
        return funPhotos;
      case "scrapbook":
        return scrapbookPhotos;
      case "all":
      default:
        return photos;
    }
  };

  const filteredPhotos = getFilteredPhotos();

  const openLightbox = (photoId: string) => {
    const index = photos.findIndex(p => p.id === photoId);
    if (index !== -1) {
      setLightboxIndex(index);
      setLightboxOpen(true);
    }
  };

  // Helper for giving each photo frame a cute tape style and stamp
  const getPhotoTapeStyle = (index: number): TapeStyle => {
    const styles: TapeStyle[] = ["pink", "washi", "heart", "gold", "grid"];
    return styles[index % styles.length]!;
  };

  const getPhotoTapePosition = (index: number) => {
    const positions = ["center", "left", "right"] as const;
    return positions[index % positions.length]!;
  };

  const getPhotoStamp = (photo: PhotoMemory): string | undefined => {
    if (photo.role === "hero") return "🌟 MAIN CHARACTER";
    if (photo.role === "fun-card") return "🍼 MINI AZKIA";
    if (photo.id === "photo-feat-1") return "☕ BALKON VIBE";
    if (photo.id === "photo-feat-3") return "🎟️ MUSEUM DAY";
    if (photo.id === "photo-scrap-12") return "🚲 NGEENG!";
    if (photo.id === "photo-scrap-10") return "🤪 KONYOL & LUCU";
    if (photo.id === "photo-scrap-1") return "🚪 PINTU MERAH";
    if (photo.id === "photo-scrap-9") return "🍔 KULINER";
    if (photo.id === "photo-spotlight") return "✨ SPOTLIGHT";
    return undefined;
  };

  return (
    <section className="relative py-20 md:py-32 px-4 md:px-8 overflow-hidden bg-gradient-to-b from-[#FFF9FB] via-[#FFF3F6] to-[#FFF9FB]">
      
      {/* Decorative Background Floating Accents */}
      <div className="absolute top-12 left-6 opacity-30 pointer-events-none hidden md:block animate-pulse">
        <Sparkles size={36} className="text-[#FF85A1]" />
      </div>
      <div className="absolute bottom-20 right-8 opacity-25 pointer-events-none hidden md:block animate-bounce">
        <Heart size={42} className="text-[#FF758F]" fill="#FF758F" />
      </div>

      {/* Mascot PuffCloud with speech bubble */}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col items-center mb-6">
          <div className="relative group cursor-pointer">
            <PuffCloud state="excited" className="w-20 h-16 md:w-24 md:h-18 hover:scale-110 transition-transform" />
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white text-[#C91F5A] border border-[#FFC5D0] px-3.5 py-1 rounded-full text-xs md:text-sm font-semibold shadow-md flex items-center gap-1.5 animate-bounce">
              <Camera size={14} className="text-[#C91F5A]" />
              <span>Klik fotonya, ada cerita di baliknya ✨</span>
            </div>
          </div>
        </div>

        {/* Header Title */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3 mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-[#FFE4EC] text-[#C91F5A] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-[#FFB6C1]">
            <Sparkles size={14} />
            <span>Album Kenangan</span>
          </div>

          <h2 className="font-display text-4xl md:text-6xl text-[#C91F5A] tracking-tight relative inline-block">
            bagian dari memori
            <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#FFB6C1]" viewBox="0 0 100 20" preserveAspectRatio="none">
              <path d="M0,15 Q50,0 100,15" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
            </svg>
          </h2>

          <p className="text-[#8B717A] text-base md:text-xl max-w-xl mx-auto font-body">
            karena beberapa momen memang terlalu sayang kalau cuma disimpan di galeri.
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-3 mb-16">
          {[
            { id: "all", label: "✨ Semua Momen", count: photos.length },
            { id: "featured", label: "🌸 Momen Pilihan", count: featuredPhotos.length },
            { id: "mini", label: "🍼 Versi Mini", count: funPhotos.length },
            { id: "scrapbook", label: "📸 Banyak Cerita", count: scrapbookPhotos.length },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as CategoryFilter)}
              className={cn(
                "relative px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 flex items-center gap-1.5",
                activeTab === tab.id
                  ? "bg-[#C91F5A] text-white shadow-lg shadow-[#C91F5A]/25 scale-105"
                  : "bg-white text-[#8B717A] border border-[#F2C9D5] hover:bg-[#FFE4EC] hover:text-[#C91F5A]"
              )}
            >
              <span>{tab.label}</span>
              <span className={cn(
                "text-[10px] px-1.5 py-0.5 rounded-full font-bold",
                activeTab === tab.id ? "bg-white/20 text-white" : "bg-[#FFE4EC] text-[#C91F5A]"
              )}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Spotlight: Special "Versi Mini Kamu" Card (when tab is 'all' or 'mini') */}
        {(activeTab === "all" || activeTab === "mini") && funPhotos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="mb-16 max-w-4xl mx-auto"
          >
            <div className="relative bg-gradient-to-br from-white via-[#FFF5F7] to-[#FFE4EC] p-6 md:p-10 rounded-3xl border-2 border-[#FFC5D0] shadow-xl overflow-hidden">
              
              {/* Mascot MimiBunny */}
              <div className="absolute top-3 right-4 md:right-8 z-10 flex items-center gap-2">
                <MimiBunny state="excited" className="w-16 h-18 md:w-20 md:h-22 drop-shadow-md hover:rotate-6 transition-transform" />
              </div>

              {/* Title & Badge */}
              <div className="mb-6 space-y-1">
                <span className="bg-[#FF5E83] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-block shadow-sm">
                  🍼 SPESIAL VERSI MINI
                </span>
                <h3 className="font-display text-3xl md:text-4xl text-[#C91F5A]">
                  versi mini kamu
                </h3>
                <p className="text-[#8B717A] font-handwriting text-xl md:text-2xl">
                  bukti otentik sejak kecil udah punya senyum paling gemas! 🥹✨
                </p>
              </div>

              {/* Photos Duo Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {funPhotos.map((photo, idx) => (
                  <div key={photo.id} className="flex justify-center">
                    <PhotoFrame
                      src={photo.src}
                      alt={photo.alt}
                      width={photo.width}
                      height={photo.height}
                      caption={photo.caption}
                      rotate={idx === 0 ? -3 : 3}
                      tape={true}
                      tapeStyle={idx === 0 ? "washi" : "heart"}
                      tapePosition={idx === 0 ? "left" : "right"}
                      stamp={idx === 0 ? "👶 LITTLE AZKIA" : "🍄 DEKORATIF"}
                      className="w-full max-w-[290px] hover:scale-105 hover:z-20 transition-all duration-300"
                      onPhotoClick={() => openLightbox(photo.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Main Photo Gallery */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {activeTab === "mini" ? (
              // Mini tab is already rendered nicely in the spotlight above, or show notice
              <div className="text-center py-4 text-[#8B717A] font-handwriting text-xl">
                ✨ Klik foto di atas untuk melihat ukuran penuh & bernostalgia!
              </div>
            ) : (
              <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
                {filteredPhotos
                  .filter(p => activeTab !== "all" || p.role !== "fun-card") // Don't duplicate fun-card if already in mini spotlight
                  .map((photo, i) => (
                    <motion.div
                      key={photo.id}
                      initial={{ opacity: 0, scale: 0.85, y: 30 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true, margin: "-30px" }}
                      transition={{ duration: 0.4, delay: (i % 4) * 0.08 }}
                      className="break-inside-avoid flex justify-center"
                    >
                      <PhotoFrame
                        src={photo.src}
                        alt={photo.alt}
                        width={photo.width}
                        height={photo.height}
                        caption={photo.caption}
                        rotate={photo.rotate}
                        tape={photo.tape}
                        tapeStyle={getPhotoTapeStyle(i)}
                        tapePosition={getPhotoTapePosition(i)}
                        stamp={getPhotoStamp(photo)}
                        className="w-full max-w-[300px] hover:z-30"
                        onPhotoClick={() => openLightbox(photo.id)}
                      />
                    </motion.div>
                  ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer Note / Cute Post-It */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 flex justify-center"
        >
          <div className="relative bg-[#FFFDE7] border border-[#FFF59D] p-5 md:p-6 rounded-lg shadow-md rotate-[-1deg] max-w-md text-center group hover:rotate-0 transition-transform duration-300">
            {/* Red Push Pin */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-500 border-2 border-white shadow-sm" />
            
            <p className="font-handwriting text-2xl text-[#4E342E] leading-relaxed">
              &quot;Setiap detik yang terlewat adalah kenangan, tapi cerita baik di dalamnya bakal selalu tersimpan manis.&quot;
            </p>
            <span className="text-xs font-semibold text-[#8D6E63] mt-2 block tracking-wider uppercase">
              💌 Notes From Kakek
            </span>
          </div>
        </motion.div>

        {/* Lightbox Modal */}
        <Lightbox
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          photos={photos}
          initialIndex={lightboxIndex}
        />

      </div>
    </section>
  );
}
