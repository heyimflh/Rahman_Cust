import { useState, useEffect } from "react";
import { getBirthdayTiming, BirthdayTiming } from "@/lib/birthday";

export function useBirthdayTiming() {
  const [timing, setTiming] = useState<BirthdayTiming | null>(null);

  useEffect(() => {
    // Only calculate on client to avoid hydration mismatch
    setTiming(getBirthdayTiming());
    
    // Optional: Update timer every minute if it's the day before
    const interval = setInterval(() => {
      setTiming(getBirthdayTiming());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return timing;
}
