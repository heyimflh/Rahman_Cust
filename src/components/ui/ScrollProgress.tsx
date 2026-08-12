"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ScrollProgress() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const prefersReduced = useReducedMotion();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Only show after a tiny bit of scrolling
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] md:h-1 bg-[#C91F5A] origin-left z-50 rounded-r-full"
      style={{ scaleX: prefersReduced ? scrollYProgress : scaleX }}
      aria-hidden="true"
    />
  );
}
