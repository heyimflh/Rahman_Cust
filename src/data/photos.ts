export type PhotoRole = "hero" | "featured" | "scrapbook" | "fun-card" | "spotlight-cover" | "letter-deco" | "closing";

export interface PhotoMemory {
  id: string;
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  role: PhotoRole;
  rotate: number; // static rotation for scrapbook feel (-5 to 5)
  tape: boolean;
}

// Rotations chosen manually so they don't shift randomly during client render
export const photos: PhotoMemory[] = [
  // FEATURED & HERO
  {
    id: "photo-hero",
    src: "/images/image-5.webp",
    alt: "Abdurrahman Rafi (Kakek) dan Azkia berfoto bersama di luar ruangan dengan latar belakang gunung, sama-sama tersenyum dan memberikan pose V.",
    caption: "hari ini kamu main character-nya.",
    width: 1280,
    height: 960, // approximate landscape/portrait adjustment handled in CSS object-fit, originally it's portrait
    role: "hero",
    rotate: -1,
    tape: true
  },
  {
    id: "photo-feat-1",
    src: "/images/image-3.webp",
    alt: "Azkia sedang duduk di balkon, tersenyum sambil melihat ke luar.",
    caption: "fokusnya ke depan, santai aja.",
    width: 960,
    height: 1280,
    role: "featured",
    rotate: 2,
    tape: true
  },
  {
    id: "photo-feat-3",
    src: "/images/image-13.webp",
    alt: "Abdurrahman Rafi (Kakek) dan Azkia menunjukkan tiket masuk museum, berfoto bersama di dekat jendela besar.",
    caption: "jalan-jalan dan tiket-tiket yang disimpan.",
    width: 960,
    height: 1280,
    role: "featured",
    rotate: -2,
    tape: true
  },
  
  // FUN CARDS
  {
    id: "photo-fun-1",
    src: "/images/image-8.webp",
    alt: "Foto masa kecil Azkia memakai hijab ungu.",
    caption: "versi mini yang nggak kalah gemas.",
    width: 320,
    height: 240,
    role: "fun-card",
    rotate: 3,
    tape: false
  },
  {
    id: "photo-fun-2",
    src: "/images/image-7.webp",
    alt: "Foto Azkia waktu kecil dengan bingkai dekoratif berbentuk siput dan jamur.",
    caption: "bukti sah sejak kecil emang udah gemes.",
    width: 720,
    height: 480,
    role: "fun-card",
    rotate: -3,
    tape: false
  },

  // SCRAPBOOK GRID
  {
    id: "photo-scrap-1",
    src: "/images/image-1.webp",
    alt: "Abdurrahman Rafi (Kakek) dan Azkia berpose di depan pintu merah nomor 164, mengenakan almamater.",
    caption: "waktu itu, di depan pintu merah.",
    width: 1280,
    height: 853,
    role: "scrapbook",
    rotate: -1,
    tape: true
  },
  {
    id: "photo-scrap-2",
    src: "/images/image-2.webp",
    alt: "Abdurrahman Rafi (Kakek) bercanda menepuk kepala Azkia di depan pintu merah yang sama.",
    caption: "selalu ada alasan buat ketawa.",
    width: 1280,
    height: 853,
    role: "scrapbook",
    rotate: 1,
    tape: true
  },
  {
    id: "photo-scrap-4",
    src: "/images/image-4.webp",
    alt: "Azkia dan Abdurrahman Rafi (Kakek) berfoto malam hari di luar ruangan, suasana santai.",
    caption: "cerita malam-malam.",
    width: 960,
    height: 1280,
    role: "scrapbook",
    rotate: -2,
    tape: true
  },
  {
    id: "photo-scrap-6",
    src: "/images/image-6.webp",
    alt: "Selfie pantulan kaca, Azkia memegang kamera HP dan Abdurrahman Rafi (Kakek) di belakangnya.",
    caption: "kaca mana kaca.",
    width: 960,
    height: 1280,
    role: "scrapbook",
    rotate: 2,
    tape: true
  },
  {
    id: "photo-scrap-9",
    src: "/images/image-9.webp",
    alt: "Selfie berdua di sebuah tempat makan atau restoran yang nyaman.",
    caption: "waktunya makan-makan.",
    width: 1280,
    height: 960,
    role: "scrapbook",
    rotate: 0,
    tape: true
  },
  {
    id: "photo-scrap-10",
    src: "/images/image-10.webp",
    alt: "Azkia dan Abdurrahman Rafi (Kakek) berfoto dengan gaya lucu dan muka konyol di restoran.",
    caption: "kalau nggak aneh ya bukan kita.",
    width: 1280,
    height: 960,
    role: "scrapbook",
    rotate: -3,
    tape: true
  },
  {
    id: "photo-scrap-12",
    src: "/images/image-12.webp",
    alt: "Azkia mengendarai motor trail di jalan aspal, difoto dari belakang.",
    caption: "ngeeng.",
    width: 720,
    height: 1280,
    role: "scrapbook",
    rotate: 2,
    tape: true
  },

  // SPECIFIC SECTIONS
  {
    id: "photo-spotlight",
    src: "/images/image-11.webp",
    alt: "Selfie hangat berdua, tampak dari sudut bawah, tersenyum rileks.",
    caption: "satu manusia yang bikin suasana lebih hidup.",
    width: 720,
    height: 1280,
    role: "spotlight-cover",
    rotate: 1,
    tape: false
  },
  {
    id: "photo-letter",
    src: "/images/image-14.webp",
    alt: "Selfie santai mengenakan pakaian batik, pose dua jari.",
    caption: "baca pelan-pelan ya.",
    width: 1280,
    height: 960,
    role: "letter-deco",
    rotate: 3,
    tape: true
  },
  {
    id: "photo-closing",
    src: "/images/image-15.webp",
    alt: "Selfie sangat dekat berdua memakai baju batik, keduanya tersenyum lembut.",
    caption: "senang bisa kenal kamu.",
    width: 1280,
    height: 960,
    role: "closing",
    rotate: 0,
    tape: false
  }
];
