import { profile } from "@/data/profile";

export interface BirthdayTiming {
  daysUntilBirthday: number;
  isBirthday: boolean;
  isPastBirthday: boolean;
  age: number;
  daysSinceFirstMet: number;
  daysUntilMeetAnniversary: number;
}

/**
 * Validates and calculates timing purely based on provided date strings.
 * Keeps calculation stable and timezone aware.
 */
export function getBirthdayTiming(now: Date = new Date()): BirthdayTiming {
  // Use Asia/Jakarta explicitly if supported, else fallback to simple logic
  // For safety in static/client environments, we do string comparison logic.
  
  // Format current date in Asia/Jakarta
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: profile.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  
  const formattedParts = formatter.formatToParts(now);
  const tzYear = formattedParts.find(p => p.type === 'year')?.value;
  const tzMonth = formattedParts.find(p => p.type === 'month')?.value;
  const tzDay = formattedParts.find(p => p.type === 'day')?.value;
  
  const currentDateStr = `${tzYear}-${tzMonth}-${tzDay}`;
  const currentDate = new Date(`${currentDateStr}T00:00:00`);
  
  const birthDate = new Date(`${profile.birthDate}T00:00:00`);
  const targetDate = new Date(`${profile.targetBirthday}T00:00:00`);
  const firstMetDate = new Date(`${profile.firstMetDate}T00:00:00`);
  
  const isPastBirthday = currentDate > targetDate;
  const isBirthday = currentDate.getTime() === targetDate.getTime();
  
  const msPerDay = 1000 * 60 * 60 * 24;
  
  const diffTime = targetDate.getTime() - currentDate.getTime();
  const daysUntilBirthday = Math.max(0, Math.ceil(diffTime / msPerDay));
  
  const metDiffTime = currentDate.getTime() - firstMetDate.getTime();
  const daysSinceFirstMet = Math.floor(metDiffTime / msPerDay);
  
  // Anniversary is exactly 1 year after first met date
  const metAnniversaryDate = new Date(firstMetDate);
  metAnniversaryDate.setFullYear(metAnniversaryDate.getFullYear() + 1);
  const anniDiffTime = metAnniversaryDate.getTime() - currentDate.getTime();
  const daysUntilMeetAnniversary = Math.ceil(anniDiffTime / msPerDay);
  
  const currentYear = currentDate.getFullYear();
  const birthYear = birthDate.getFullYear();
  
  // Calculate age: if past or is birthday in the target year, use target year difference.
  let age = targetDate.getFullYear() - birthYear;
  if (currentDate < targetDate && currentYear < targetDate.getFullYear()) {
    age = currentYear - birthYear;
    // rough age before target
  }

  return {
    daysUntilBirthday,
    isBirthday,
    isPastBirthday,
    age,
    daysSinceFirstMet,
    daysUntilMeetAnniversary,
  };
}
