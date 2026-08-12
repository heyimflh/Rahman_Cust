export interface GameInfo {
  id: string;
  name: string;
  description: string;
  duration: string;
  component: string;
  category: "speed" | "casual" | "quiz" | "creative" | "memory";
  categoryName: string;
  tag: string;
  difficulty: string;
  gradient: string;
  borderGlow: string;
  accentBg: string;
  accentText: string;
  badgeBg: string;
  imageCover: string;
}

export const playgroundGames: GameInfo[] = [
  {
    id: "game-catch-gifts",
    name: "Tangkap Kado Rush",
    description: "Ambil kado, bintang, dan cupcake yang jatuh dalam waktu 20 detik!",
    duration: "20 Detik",
    component: "CatchGifts",
    category: "speed",
    categoryName: "Refleks & Aksi",
    tag: "⚡ REFLEKS KILAT",
    difficulty: "⭐⭐ Sedang",
    gradient: "from-[#FF5E83] to-[#FF809B]",
    borderGlow: "rgba(255, 94, 131, 0.4)",
    accentBg: "bg-[#FFE4EC]",
    accentText: "text-[#C91F5A]",
    badgeBg: "bg-[#FF3366]/10 text-[#C91F5A] border-[#FF3366]/30",
    imageCover: "/images/games/catch_gifts.png"
  },
  {
    id: "game-pop-balloons",
    name: "Balon Harapan",
    description: "Pecahin balon-balon pastel, ada pesan manis yang nunggu di dalamnya.",
    duration: "Santai",
    component: "PopBalloons",
    category: "casual",
    categoryName: "Santai & Pesan",
    tag: "🎈 PESAN RAHASIA",
    difficulty: "⭐ Mudah",
    gradient: "from-[#20BF55] to-[#01BAEF]",
    borderGlow: "rgba(32, 191, 85, 0.4)",
    accentBg: "bg-[#DDF5E8]",
    accentText: "text-[#11998E]",
    badgeBg: "bg-[#11998E]/10 text-[#11998E] border-[#11998E]/30",
    imageCover: "/images/games/pop_balloons.png"
  },
  {
    id: "game-quiz",
    name: "Kuis Memori & Chemistry",
    description: "Coba tebak, seberapa inget Azkia sama momen-momen manis kita berdua?",
    duration: "Santai",
    component: "BirthdayQuiz",
    category: "quiz",
    categoryName: "Memori & Kuis",
    tag: "💖 HEART & BRAIN",
    difficulty: "⭐⭐⭐ Menantang",
    gradient: "from-[#8E2DE2] to-[#4A00E0]",
    borderGlow: "rgba(142, 45, 226, 0.4)",
    accentBg: "bg-[#F0E6FF]",
    accentText: "text-[#8E2DE2]",
    badgeBg: "bg-[#8E2DE2]/10 text-[#8E2DE2] border-[#8E2DE2]/30",
    imageCover: "/images/games/quiz.png"
  },
  {
    id: "game-quick-cake",
    name: "Dekor Kue Kilat",
    description: "Rakit dan hias kue ulang tahun impianmu sendiri \u2014 cuma 30 detik!",
    duration: "30 Detik",
    component: "QuickCake",
    category: "creative",
    categoryName: "Dekor Kreatif",
    tag: "🎨 CREATIVE STUDIO",
    difficulty: "⭐ Mudah",
    gradient: "from-[#FF9900] to-[#FF5E62]",
    borderGlow: "rgba(255, 153, 0, 0.4)",
    accentBg: "bg-[#FFF3D6]",
    accentText: "text-[#E67E00]",
    badgeBg: "bg-[#E67E00]/10 text-[#E67E00] border-[#E67E00]/30",
    imageCover: "/images/games/quick_cake.png"
  },
  {
    id: "game-memory",
    name: "Memory Match",
    description: "Cari pasangan foto kenangan yang cocok, siapa cepat dia menang.",
    duration: "Santai",
    component: "MemoryMatch",
    category: "memory",
    categoryName: "Puzzle & Foto",
    tag: "🧩 MATCH PUZZLE",
    difficulty: "⭐⭐ Sedang",
    gradient: "from-[#00C6FF] to-[#0072FF]",
    borderGlow: "rgba(0, 198, 255, 0.4)",
    accentBg: "bg-[#E0F7FF]",
    accentText: "text-[#0072FF]",
    badgeBg: "bg-[#0072FF]/10 text-[#0072FF] border-[#0072FF]/30",
    imageCover: "/images/games/memory_match.png"
  }
];
