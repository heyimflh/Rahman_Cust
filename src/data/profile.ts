export interface BirthdayProfile {
  fullName: string;
  displayName: string;
  nicknames: string[];
  senderName: string;
  boyFullName: string;
  boyNickname: string;
  birthDate: string; // YYYY-MM-DD
  targetBirthday: string; // YYYY-MM-DD
  firstMetDate: string; // YYYY-MM-DD
  timeZone: string;
  relationshipTone: "sweet" | "funny" | "romantic";
  showAge: boolean;
  showBirthYear: boolean;
  whatsappNumber: string;
}

export const profile: BirthdayProfile = {
  fullName: "Azkia Syahda Islami",
  displayName: "Azkia",
  nicknames: ["yang", "nek"],
  senderName: "Kakek",
  boyFullName: "Abdurrahman Rafi",
  boyNickname: "kakek",
  birthDate: "2007-09-08",
  targetBirthday: "2026-09-08",
  firstMetDate: "2025-09-09",
  timeZone: "Asia/Jakarta",
  relationshipTone: "sweet",
  showAge: true,
  showBirthYear: false,
  whatsappNumber: "081214174213",
};
