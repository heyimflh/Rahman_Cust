export type GachaRarity = "gemas" | "super gemas" | "kok bisa se-gemas ini";

export interface GachaReward {
  id: string;
  message: string;
  type: "pujian" | "harapan" | "izin" | "kupon";
  rarity: GachaRarity;
}

export const gachaRewards: GachaReward[] = [
  // Pujian (10)
  { id: "g1", message: "Senyum kamu itu nular banget tau.", type: "pujian", rarity: "gemas" },
  { id: "g2", message: "Kamu selalu bisa bikin suasana jadi lebih hangat.", type: "pujian", rarity: "super gemas" },
  { id: "g3", message: "Energi kamu tuh kayak sunshine, beneran.", type: "pujian", rarity: "gemas" },
  { id: "g4", message: "Aku suka caramu ngelihat hal-hal kecil.", type: "pujian", rarity: "super gemas" },
  { id: "g5", message: "Kamu keren karena udah bertahan sejauh ini.", type: "pujian", rarity: "kok bisa se-gemas ini" },
  { id: "g6", message: "Kalau ada penghargaan teman ter-random, kamu menangnya.", type: "pujian", rarity: "gemas" },
  { id: "g7", message: "Muka konyol kamu justru yang paling ngangenin.", type: "pujian", rarity: "super gemas" },
  { id: "g8", message: "Kamu itu pendengar yang baik banget.", type: "pujian", rarity: "gemas" },
  { id: "g9", message: "Vibe kamu selalu bikin orang ngerasa aman.", type: "pujian", rarity: "super gemas" },
  { id: "g10", message: "Nggak ada yang bisa gantiin posisimu.", type: "pujian", rarity: "kok bisa se-gemas ini" },

  // Harapan (10)
  { id: "g11", message: "Semoga umur barumu bawa banyak kabar baik.", type: "harapan", rarity: "gemas" },
  { id: "g12", message: "Semoga kamu lebih sering ketawa lepas tahun ini.", type: "harapan", rarity: "super gemas" },
  { id: "g13", message: "Semoga yang kamu takutin nggak pernah kejadian.", type: "harapan", rarity: "gemas" },
  { id: "g14", message: "Semoga pundakmu lebih ringan bawa beban.", type: "harapan", rarity: "super gemas" },
  { id: "g15", message: "Semoga hal-hal baik selalu nemuin jalan ke kamu.", type: "harapan", rarity: "kok bisa se-gemas ini" },
  { id: "g16", message: "Semoga kamu makin sayang sama diri sendiri.", type: "harapan", rarity: "gemas" },
  { id: "g17", message: "Semoga kamu dikelilingi orang yang tahu cara hargain kamu.", type: "harapan", rarity: "super gemas" },
  { id: "g18", message: "Semoga hari-hari burukmu cepat berlalunya.", type: "harapan", rarity: "gemas" },
  { id: "g19", message: "Semoga mimpimu satu per satu jadi nyata.", type: "harapan", rarity: "super gemas" },
  { id: "g20", message: "Semoga kamu tetap jadi Azkia yang aku kenal.", type: "harapan", rarity: "kok bisa se-gemas ini" },

  // Izin Kecil (5)
  { id: "g21", message: "Izin sah untuk tidur seharian besok.", type: "izin", rarity: "gemas" },
  { id: "g22", message: "Izin untuk beli makanan manis tanpa mikir kalori.", type: "izin", rarity: "super gemas" },
  { id: "g23", message: "Izin untuk nangis kalau emang lagi capek.", type: "izin", rarity: "gemas" },
  { id: "g24", message: "Izin untuk batalin janji kalau kamu butuh 'me time'.", type: "izin", rarity: "super gemas" },
  { id: "g25", message: "Izin untuk bangga sama pencapaian sekecil apa pun.", type: "izin", rarity: "kok bisa se-gemas ini" },

  // Kupon (5)
  { id: "g26", message: "Kupon: Bebas request 1 lagu buat aku dengerin.", type: "kupon", rarity: "gemas" },
  { id: "g27", message: "Kupon: Bebas cerita random tanpa di-judge.", type: "kupon", rarity: "super gemas" },
  { id: "g28", message: "Kupon: Ditemenin jalan-jalan virtual/langsung.", type: "kupon", rarity: "gemas" },
  { id: "g29", message: "Kupon: Minta dipuji (berlaku seumur hidup).", type: "kupon", rarity: "super gemas" },
  { id: "g30", message: "Kupon: 1 Pelukan jauh (virtual hug) super erat.", type: "kupon", rarity: "kok bisa se-gemas ini" }
];
