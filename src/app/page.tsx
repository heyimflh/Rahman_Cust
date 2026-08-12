"use client";

import { useState } from "react";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { BackgroundMusic } from "@/components/ui/BackgroundMusic";

// Import all sections
import { PartyDoor } from "@/components/sections/PartyDoor";
import { BirthdayHero } from "@/components/sections/BirthdayHero";
import { BirthdayClock } from "@/components/sections/BirthdayClock";
import { BirthdaySpotlight } from "@/components/sections/BirthdaySpotlight";
import { Scrapbook } from "@/components/sections/Scrapbook";
import { BirthdayCinema } from "@/components/sections/BirthdayCinema";
import { Playground } from "@/components/sections/Playground";
import { ComplimentWall } from "@/components/sections/ComplimentWall";
import { BlowCandle } from "@/components/sections/BlowCandle";
import { BirthdayLetter } from "@/components/sections/BirthdayLetter";
import { GachaMachine } from "@/components/sections/GachaMachine";
import { Coupons } from "@/components/sections/Coupons";
import { WhatsAppRSVP } from "@/components/sections/WhatsAppRSVP";
import { OutroSequence } from "@/components/sections/OutroSequence";

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <main className="min-h-screen bg-[#FFF9FB] text-[#4A3038] font-body relative selection:bg-[#FFE4EC] selection:text-[#C91F5A]">
      <ScrollProgress />
      
      {/* Background Music Player & Floating Widget */}
      <BackgroundMusic hasEntered={hasEntered} />
      
      {/* The initial gate */}
      <PartyDoor onEnter={() => setHasEntered(true)} />
      
      {/* The rest of the site is hidden/inert until they enter */}
      <div 
        className={`transition-opacity duration-1000 ${hasEntered ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none fixed inset-0 overflow-hidden h-screen"}`}
        aria-hidden={!hasEntered}
      >
        <ErrorBoundary fallbackMessage="pahlawan utama belum muncul di bagian ini.">
          <BirthdayHero onStart={() => {
            document.getElementById("clock-section")?.scrollIntoView({ behavior: "smooth" });
          }} />
        </ErrorBoundary>

        <div id="clock-section">
          <ErrorBoundary>
            <BirthdayClock />
          </ErrorBoundary>
        </div>

        <ErrorBoundary>
          <BirthdaySpotlight />
        </ErrorBoundary>

        <ErrorBoundary>
          <Scrapbook />
        </ErrorBoundary>

        <ErrorBoundary>
          <BirthdayCinema />
        </ErrorBoundary>

        <ErrorBoundary>
          <Playground />
        </ErrorBoundary>

        <ErrorBoundary>
          <ComplimentWall />
        </ErrorBoundary>

        <ErrorBoundary>
          <BlowCandle />
        </ErrorBoundary>

        <ErrorBoundary>
          <GachaMachine />
        </ErrorBoundary>

        <ErrorBoundary>
          <Coupons />
        </ErrorBoundary>

        <ErrorBoundary>
          <BirthdayLetter />
        </ErrorBoundary>

        <ErrorBoundary>
          <WhatsAppRSVP />
        </ErrorBoundary>

        <ErrorBoundary>
          <OutroSequence />
        </ErrorBoundary>
      </div>
    </main>
  );
}
