export interface Coupon {
  id: string;
  title: string;
  description: string;
  redeemMessage: string;
}

export const coupons: Coupon[] = [
  {
    id: "cp-1",
    title: "1 Traktiran Minuman",
    description: "Bebas pilih minuman apa aja, di mana aja (asal jangan yang aneh-aneh ya).",
    redeemMessage: "Halo! Aku mau tuker kupon traktiran minuman nih 🧋"
  },
  {
    id: "cp-2",
    title: "Sesi Cerita 1 Jam",
    description: "Satu sesi dengerin cerita kamu tanpa aku motong atau nyeramahin.",
    redeemMessage: "Halo! Aku mau tuker kupon sesi cerita, siap-siap dengerin ya 🗣️"
  },
  {
    id: "cp-3",
    title: "Teman Jalan Dadakan",
    description: "1 teman jalan kalau kamu butuh keluar sebentar nyari udara segar.",
    redeemMessage: "Halo! Kupon teman jalan dadakan diaktifkan! Ayo jalan 🚶‍♀️"
  },
  {
    id: "cp-4",
    title: "Request Playlist",
    description: "1 request playlist khusus bikinan aku buat nemenin hari kamu.",
    redeemMessage: "Halo! Aku mau tuker kupon playlist. Bikinin yang enak ya 🎵"
  },
  {
    id: "cp-5",
    title: "Cetak 1 Foto Favorit",
    description: "1 foto favoritmu bakal aku cetakin biar bisa disimpen secara fisik.",
    redeemMessage: "Halo! Aku mau tuker kupon cetak foto. Fotonya nyusul ya 📸"
  }
];
