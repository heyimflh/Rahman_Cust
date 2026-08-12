export interface Compliment {
  id: string;
  text: string;
  type: "character" | "habit" | "growth";
  categoryLabel: string;
  emoji: string;
  gradient: string;
  borderColor: string;
  badgeBg: string;
  badgeText: string;
  tapeColor: string;
}

export const compliments: Compliment[] = [
  // Character (6)
  {
    id: "c1",
    text: "cara kamu bikin suasana di sekitar terasa jauh lebih hidup.",
    type: "character",
    categoryLabel: "Energi Manis",
    emoji: "✨",
    gradient: "from-[#FFF0F4] via-[#FFE4EC] to-[#FFD8E4]",
    borderColor: "border-[#FFB8C9]",
    badgeBg: "bg-[#FF3366]/10",
    badgeText: "text-[#C91F5A]",
    tapeColor: "bg-pink-300/60"
  },
  {
    id: "c2",
    text: "kamu punya energi positif hangat yang gampang banget diingat.",
    type: "character",
    categoryLabel: "Vibe Positif",
    emoji: "☀️",
    gradient: "from-[#FFF9E6] via-[#FFF3D6] to-[#FFE8B3]",
    borderColor: "border-[#FFE099]",
    badgeBg: "bg-[#E67E00]/10",
    badgeText: "text-[#E67E00]",
    tapeColor: "bg-amber-300/60"
  },
  {
    id: "c3",
    text: "kemampuan kamu buat bikin orang lain selalu ngerasa nyaman.",
    type: "character",
    categoryLabel: "Kenyamanan",
    emoji: "🌸",
    gradient: "from-[#FDF0FF] via-[#F4E8FF] to-[#EAD5FF]",
    borderColor: "border-[#D6B5FF]",
    badgeBg: "bg-[#8E2DE2]/10",
    badgeText: "text-[#8E2DE2]",
    tapeColor: "bg-purple-300/60"
  },
  {
    id: "c4",
    text: "kamu selalu punya cara buat ngadepin hari yang panjang dengan senyuman.",
    type: "character",
    categoryLabel: "Pantang Menyerah",
    emoji: "💪",
    gradient: "from-[#EFFBF4] via-[#E8F8F0] to-[#D5F3E4]",
    borderColor: "border-[#A8E6CF]",
    badgeBg: "bg-[#11998E]/10",
    badgeText: "text-[#11998E]",
    tapeColor: "bg-emerald-300/60"
  },
  {
    id: "c5",
    text: "ada banyak hal kecil tentang kamu yang bikin orang seneng kamu hadir.",
    type: "character",
    categoryLabel: "Bintang Kecil",
    emoji: "⭐️",
    gradient: "from-[#FFF0F5] via-[#FFE4ED] to-[#FFD5E2]",
    borderColor: "border-[#FFB3C6]",
    badgeBg: "bg-[#FF3366]/10",
    badgeText: "text-[#C91F5A]",
    tapeColor: "bg-rose-300/60"
  },
  {
    id: "c6",
    text: "kamu versi yang sekarang ini beneran luar biasa & layak dirayakan!",
    type: "character",
    categoryLabel: "Spesial",
    emoji: "👑",
    gradient: "from-[#FFF5F0] via-[#FFEADB] to-[#FFD8C2]",
    borderColor: "border-[#FFB799]",
    badgeBg: "bg-[#FF5E62]/10",
    badgeText: "text-[#FF5E62]",
    tapeColor: "bg-[#FFB799]/60"
  },

  // Habit/Playful (5)
  {
    id: "h1",
    text: "muka konyol kamu pas lagi ketawa lepas waktu difoto.",
    type: "habit",
    categoryLabel: "Konyol & Gemes",
    emoji: "🤪",
    gradient: "from-[#FFF0F4] via-[#FFE4EC] to-[#FFD8E4]",
    borderColor: "border-[#FFB8C9]",
    badgeBg: "bg-[#FF3366]/10",
    badgeText: "text-[#C91F5A]",
    tapeColor: "bg-pink-300/60"
  },
  {
    id: "h2",
    text: "gaya santai khas kamu yang selalu kelihatan keren tanpa dibuat-buat.",
    type: "habit",
    categoryLabel: "Gaya Keren",
    emoji: "😎",
    gradient: "from-[#F0F7FF] via-[#E2F0FF] to-[#D0E5FF]",
    borderColor: "border-[#A6CEFF]",
    badgeBg: "bg-[#0072FF]/10",
    badgeText: "text-[#0072FF]",
    tapeColor: "bg-sky-300/60"
  },
  {
    id: "h3",
    text: "cara kamu menikmati waktu jalan-jalan dan nemuin hal-hal unik.",
    type: "habit",
    categoryLabel: "Petualang",
    emoji: "🗺️",
    gradient: "from-[#EFFBF4] via-[#E8F8F0] to-[#D5F3E4]",
    borderColor: "border-[#A8E6CF]",
    badgeBg: "bg-[#11998E]/10",
    badgeText: "text-[#11998E]",
    tapeColor: "bg-emerald-300/60"
  },
  {
    id: "h4",
    text: "ketawa kamu yang khas dan selalu gampang nular ke siapa aja.",
    type: "habit",
    categoryLabel: "Ketawa Nular",
    emoji: "😂",
    gradient: "from-[#FFF9E6] via-[#FFF3D6] to-[#FFE8B3]",
    borderColor: "border-[#FFE099]",
    badgeBg: "bg-[#E67E00]/10",
    badgeText: "text-[#E67E00]",
    tapeColor: "bg-amber-300/60"
  },
  {
    id: "h5",
    text: "randomness kamu yang kadang nggak ketebak tapi selalu bikin ketawa.",
    type: "habit",
    categoryLabel: "Random Seru",
    emoji: "🎲",
    gradient: "from-[#FDF0FF] via-[#F4E8FF] to-[#EAD5FF]",
    borderColor: "border-[#D6B5FF]",
    badgeBg: "bg-[#8E2DE2]/10",
    badgeText: "text-[#8E2DE2]",
    tapeColor: "bg-purple-300/60"
  },

  // Growth (4)
  {
    id: "g1",
    text: "kamu udah berhasil berkembang jauh banget sampai di umur baru ini.",
    type: "growth",
    categoryLabel: "Pencapaian",
    emoji: "🌱",
    gradient: "from-[#EFFBF4] via-[#E8F8F0] to-[#D5F3E4]",
    borderColor: "border-[#A8E6CF]",
    badgeBg: "bg-[#11998E]/10",
    badgeText: "text-[#11998E]",
    tapeColor: "bg-emerald-300/60"
  },
  {
    id: "g2",
    text: "kamu boleh bangga sama diri sendiri, bahkan untuk usaha yang nggak dilihat orang.",
    type: "growth",
    categoryLabel: "Bangga Diri",
    emoji: "💖",
    gradient: "from-[#FFF0F4] via-[#FFE4EC] to-[#FFD8E4]",
    borderColor: "border-[#FFB8C9]",
    badgeBg: "bg-[#FF3366]/10",
    badgeText: "text-[#C91F5A]",
    tapeColor: "bg-pink-300/60"
  },
  {
    id: "g3",
    text: "semua proses panjang & perjuangan yang udah kamu lewatin hebat banget.",
    type: "growth",
    categoryLabel: "Proses Hebat",
    emoji: "🏆",
    gradient: "from-[#FFF9E6] via-[#FFF3D6] to-[#FFE8B3]",
    borderColor: "border-[#FFE099]",
    badgeBg: "bg-[#E67E00]/10",
    badgeText: "text-[#E67E00]",
    tapeColor: "bg-amber-300/60"
  },
  {
    id: "g4",
    text: "kamu makin dewasa & tahu gimana caranya sayang sama diri sendiri.",
    type: "growth",
    categoryLabel: "Cinta Diri",
    emoji: "🌷",
    gradient: "from-[#FDF0FF] via-[#F4E8FF] to-[#EAD5FF]",
    borderColor: "border-[#D6B5FF]",
    badgeBg: "bg-[#8E2DE2]/10",
    badgeText: "text-[#8E2DE2]",
    tapeColor: "bg-purple-300/60"
  }
];
