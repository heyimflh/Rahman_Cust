import type { Metadata } from "next";
import { Comfortaa, Gochi_Hand, Outfit } from "next/font/google";
import "./globals.css";

// Fonts Setup
const comfortaa = Comfortaa({
  subsets: ["latin"],
  variable: "--font-comfortaa",
  display: "swap",
});

const gochiHand = Gochi_Hand({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-gochi",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const viewport = {
  themeColor: "#FFE4EC",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://pestakecil-azkia.vercel.app"),
  title: "Pesta Kecil untuk Azkia \ud83c\udf89 Buka Kadonya, Nek!",
  description: "Azkia, ini bukan ucapan ultah biasa. Ini pesta kecil yang sengaja dibikinin buat kamu \u2014 scroll aja pelan-pelan.",
  openGraph: {
    title: "Pesta Kecil untuk Azkia \ud83c\udf82",
    description: "Ada kado digital di dalam sini, khusus buat yang lagi ulang tahun hari ini. Jangan diintip orang lain ya.",
    url: "https://pestakecil-azkia.vercel.app",
    siteName: "Pesta Kecil",
    images: [
      {
        url: "/images/image-5.webp", // Hero image acts as OG image
        width: 1200,
        height: 630,
        alt: "Pesta Kecil untuk Azkia",
      }
    ],
    locale: "id_ID",
    type: "website",
  },
  robots: {
    index: false, // Private site, do not index
    follow: false,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning className={`${comfortaa.variable} ${gochiHand.variable} ${outfit.variable}`}>
      <body suppressHydrationWarning className="font-body text-[#4A3038] bg-[#FFF9FB] antialiased selection:bg-[#FFE4EC] selection:text-[#C91F5A] hide-scrollbar overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
