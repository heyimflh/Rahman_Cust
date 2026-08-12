# Upgrade Copywriting — "Pesta Kecil untuk Azkia"

Dokumen ini isinya hasil baca menyeluruh project `Rahman_Cust-main` (semua file di `src/data/*.ts` dan teks-teks yang nempel langsung di komponen `src/components/sections/*.tsx`), plus revisi copywriting biar lebih natural, santai, lucu, dan nggak kaku — tapi tetap jaga nada "sweet" sesuai `relationshipTone: sweet` di `profile.ts`.

**Prinsip revisi yang dipakai:**
- Hindari kalimat yang "template banget" / kedengaran hasil translate formal (mis. kata-kata seperti "resmi", "otentik", "mutlak", "tanpa syarat" di konteks yang harusnya santai).
- Perbanyak partikel ngobrol natural: "sih", "kok", "deh", "kan", "loh" — secukupnya, jangan berlebihan.
- Perpendek kalimat panjang jadi ritme yang lebih ringan dibaca sambil senyum-senyum.
- Jaga konsistensi panggilan: Azkia dipanggil "nek" oleh Kakek (lihat `profile.ts`: `nicknames: ["yang", "nek"]`, `senderName: "Kakek"`). Beberapa copy existing sudah pas (mis. hero: "pelan-pelan aja, nek"), sebagian lain lupa pakai sapaan ini — draft di bawah menambahkannya di beberapa titik biar berasa personal, bukan generik.
- Beberapa istilah Inggris yang kaku ("Unlimited", "Mutlak", "Tanpa syarat") diganti jadi versi yang lebih fun tanpa kehilangan gimmick "kartu sakti"-nya.

Format tiap section: **Lokasi file** → **Sebelum** → **Sesudah (revisi)**.

---

## 1. Metadata Halaman (`src/app/layout.tsx`)

| Sebelum | Sesudah |
|---|---|
| `title: "Pesta Kecil untuk Azkia \| HBD!"` | `title: "Pesta Kecil untuk Azkia 🎉 Buka Kadonya, Nek!"` |
| `description: "Selamat ulang tahun, Azkia! Ini sedikit kejutan buat kamu."` | `description: "Azkia, ini bukan ucapan ultah biasa. Ini pesta kecil yang sengaja dibikinin buat kamu — scroll aja pelan-pelan."` |
| `og.title: "Pesta Kecil untuk Azkia"` | `og.title: "Pesta Kecil untuk Azkia 🎂"` |
| `og.description: "Ada kado digital di dalam, khusus buat yang ulang tahun hari ini."` | `og.description: "Ada kado digital di dalam sini, khusus buat yang lagi ulang tahun hari ini. Jangan diintip orang lain ya."` |

---

## 2. Party Door / Gerbang Pembuka (`PartyDoor.tsx`)

Bagian ini nggak banyak teks statis (kebanyakan animasi), tapi kalau ada label tombol pembuka pintu, sarankan:

- Tombol buka pintu → **"Buka, yuk 🎈"** (lebih ringan dari sekadar "Buka" atau "Masuk").

---

## 3. Hero Section (`BirthdayHero.tsx`)

| Elemen | Sebelum | Sesudah |
|---|---|---|
| Badge atas | `SPECIAL BIRTHDAY EDITION` | `EDISI SPESIAL ULANG TAHUN 🎂` *(atau biarkan English kalau mau kesan "badge", tapi pertimbangkan versi ID biar konsisten sama nada hangat halaman lain)* |
| Tanggal | `08 SEPTEMBER` | tetap, sudah pas — jangan diubah, ini elemen visual/angka |
| CTA scroll | `mulai pestanya` | `yuk mulai pestanya 🎉` |
| Sub-caption | `pelan-pelan aja, nek. semua kejutan di sini nungguin kamu` | *(SUDAH BAGUS — ini salah satu copy paling natural di seluruh web. Pertahankan persis.)* |
| Badge foto | `Main Character` | `Main Character Hari Ini 👑` |

---

## 4. Birthday Clock / Countdown (`BirthdayClock.tsx`)

| Sebelum | Sesudah |
|---|---|
| `BIRTHDAY COUNTDOWN & MILESTONE` | `HITUNG MUNDUR KE HARI SPESIALMU` |
| `HARI INI HARIMU!` | `Hari ini giliran kamu, nek! 🎉` |

---

## 5. Birthday Spotlight (`BirthdaySpotlight.tsx`)

Bagian ini format-nya "judul pendek + kalimat penjelas" tiga kartu. Judulnya kaku (huruf besar semua, kesan formal-poster). Revisi menjaga struktur tapi bikin lebih hidup:

| Sebelum (title) | Sebelum (text) | Sesudah (title) | Sesudah (text) |
|---|---|---|---|
| `LAHIRNYA SATU MANUSIA YANG...` | `punya cara sendiri buat bikin suasana jadi lebih hidup.` | `HARI INI, 19 TAHUN LALU...` | `lahir satu manusia yang selalu tahu cara bikin suasana jadi lebih hidup.` |
| `BERHASIL MELEWATI...` | `semua hari yang panjang meski kadang rasanya nggak gampang.` | `DAN SEKARANG DIA...` | `berhasil ngelewatin banyak hari yang nggak selalu gampang — dan tetep jadi Azkia yang sama serunya.` |
| `PANTAS DAPAT...` | `umur baru yang lebih ramah dan lebih banyak alasan buat senyum.` | `JADI, DIA PANTAS DAPAT...` | `umur baru yang lebih ramah, dan lebih banyak alasan buat ketawa lepas.` |

Badge & label lain:
- `✨ AZKIA ✨` → biarkan, sudah simpel dan pas.
- `Queen Of The Day` → `Ratu Sehari Ini 👑` (opsional, biar nggak Indo-Inggris campur di tempat yang sama; boleh juga dibiarkan kalau memang gaya campur bahasa disengaja di seluruh web).

---

## 6. Surat Ulang Tahun (`src/data/letter.ts`)

Ini bagian paling personal dan sebenarnya **sudah cukup natural** dibanding bagian lain — kalimatnya udah kayak orang ngomong beneran, bukan template ucapan. Revisi di sini sifatnya *polesan halus*, bukan rombak total, supaya nggak kehilangan suara aslinya.

**Paragraf 1**
- Sebelum: *"Yang, aku bikin halaman ini bukan karena ucapan 'selamat ulang tahun' biasa itu kurang baik, tapi karena rasanya satu kalimat aja terlalu kecil buat ngerayain kamu."*
- Sesudah: *"Yang, aku bikin halaman ini bukan karena ucapan 'selamat ulang tahun' biasa itu kurang baik — cuma buat kamu, rasanya satu kalimat aja kekecilan."*
  *(pemangkasan kecil, ritme lebih pas dibaca pelan)*

**Paragraf 2**
- Sebelum: *"Di 08 September ini, level baru kamu terbuka. Kamu resmi sampai di level 19. Dan lucunya, hari ini juga berarti sudah 364 hari sejak kita pertama ketemu."*
- Sesudah: *"Di 08 September ini, level baru kamu kebuka. Selamat, kamu resmi level 19 sekarang. Dan lucunya, ini juga hari ke-364 sejak kita pertama ketemu."*
  *(ganti "terbuka"→"kebuka", "sudah...sejak"→"hari ke-", lebih ngobrol)*

**Paragraf 3** — sudah oke, dipertahankan, cukup ganti sedikit sambungan:
- Sesudah: *"Besok genap satu tahun sejak 09 September 2025. Jadi umur barumu ini datang sehari lebih dulu dari ulang tahun pertemanan kita. Rasanya kayak dapet dua perayaan sekaligus."*

**Paragraf 4**
- Sebelum: *"Aku cuma mau bilang, aku senang banget kamu lahir, dan aku senang bisa kenal kamu. Kamu punya energi yang bikin suasana jadi lebih hidup, dan ada banyak hal-hal kecil dari kamu yang bikin orang lain ngerasa nyaman waktu ada di dekatmu."*
- Sesudah: *"Aku cuma mau bilang: aku senang banget kamu lahir, dan aku senang bisa kenal kamu. Kamu itu tipe orang yang bikin suasana jadi lebih hidup cuma dengan hadir, dan banyak banget hal kecil dari kamu yang bikin orang lain ngerasa nyaman ada di deketmu."*

**Paragraf 5** — sudah bagus, kalimat terakhir dipertajam:
- Sesudah: *"Aku nggak tahu semua yang udah kamu lewatin buat sampai di titik ini. Pasti nggak semua harinya gampang. Tapi kamu berhasil ngelewatinnya — dan cuma karena itu aja, kamu udah pantes bangga sama diri sendiri."*

**Paragraf 6** — dipertahankan, sudah sangat natural dan menyentuh:
- *"Semoga umur barumu ini jauh lebih ramah, lebih ringan, dan ngasih kamu lebih banyak alasan buat senyum. Kalau lagi capek, inget, kamu nggak harus kuat terus-terusan. Boleh istirahat tanpa ngerasa bersalah."*

**Paragraf 7**
- Sebelum: *"Nggak perlu buru-buru. Nikmati pelan-pelan umur baru ini. Hari ini tugasmu cuma satu: dirayakan."*
- Sesudah: *"Nggak usah buru-buru. Nikmatin aja pelan-pelan umur baru ini. Tugas kamu hari ini cuma satu: dirayain."*

**Paragraf 8 (penutup)** — pertahankan persis, sudah pas:
- *"Selamat ulang tahun yang ke-19, Azkia."*

**P.S. (kalau ada tombol "Buka P.S. (Catatan Rahasia Tambahan)")**
- Sebelum: `💌 Buka P.S. (Catatan Rahasia Tambahan)`
- Sesudah: `💌 Eh, masih ada satu catatan lagi`

**CTA lain di komponen ini:**
| Sebelum | Sesudah |
|---|---|
| `Buka Segel Surat Sekarang ✨` | `Buka Suratnya Sekarang ✨` |
| `Kirim Balasan Manis via WhatsApp 💬` | `Bales di WhatsApp, Yuk 💬` |

---

## 7. Balon Harapan (`src/data/wishes.ts`)

Sudah cukup natural — kebanyakan pas dan lucu. Revisi kecil di beberapa yang masih agak kaku:

| Sebelum | Sesudah |
|---|---|
| `minum air dulu, birthday girl.` | *(pertahankan, sudah bagus)* |
| `hari ini foto yang banyak ya.` | `foto yang banyak hari ini, jangan pelit-pelit.` |
| `boleh istirahat tanpa merasa bersalah.` | *(pertahankan)* |
| `semoga satu hal yang kamu takutkan jadi lebih ringan.` | `semoga hal yang selama ini kamu takutin, jadi kerasa lebih ringan.` |
| `semoga umur baru ini lebih ramah ke kamu.` | *(pertahankan)* |
| `jangan lupa makan yang manis-manis hari ini.` | *(pertahankan)* |
| `hari ini kamu yang jadi main character.` | *(pertahankan, sudah pas)* |
| `semoga lebih banyak alasan buat ketawa lepas tahun ini.` | *(pertahankan)* |
| `kamu udah ngelakuin yang terbaik, terima kasih ya.` | `kamu udah ngelakuin yang terbaik selama ini — makasih ya, nek.` |

---

## 8. Ritual Tiup Lilin (`BlowCandle.tsx`)

| Sebelum | Sesudah |
|---|---|
| `Sacred Birthday Ritual` | `Ritual Wajib Sebelum Makan Kue 🕯️` |
| `make a wish ✨` | *(pertahankan, sudah pas sebagai micro-copy)* |
| `ritual tiup lilin` | `saatnya tiup lilin` |
| `Semua lilin sudah padam! Sekarang sampaikan harapan terindah Azkia ke semesta.` | `Semua lilin udah padam! Sekarang, ucapin aja harapan terbaik kamu ke semesta — nggak perlu keras-keras, cukup di hati.` |
| `Tahan tombol tiup di bawah atau sentuh api lilin untuk memadamkannya pelan-pelan.` | `Tahan tombol tiup di bawah, atau sentuh langsung api lilinnya buat matiin pelan-pelan.` |
| `Tiup Lilin Lagi` (title tombol) | `Ulangi Tiup Lilin` |
| `Harapannya jangan dibocorin ya... Semoga semua yang baik tahu jalan pulang ke Azkia.` 💖 | `Harapannya rahasia ya, jangan dibocorin... tapi semoga semua yang baik-baik emang lagi otw ke kamu.` 💖 |
| `Harapan Terkunci ✨` | `Harapan Udah Disimpen ✨` |

---

## 9. Dinding Pujian / Compliment Wall (`ComplimentWall.tsx` + `src/data/compliments.ts`)

### Label & UI
| Sebelum | Sesudah |
|---|---|
| `Candid Appreciation Wall` | `Dinding Pujian Jujur` |
| `Semua Pujian` | *(pertahankan)* |
| `Karakter & Vibe` | *(pertahankan)* |
| `Perjalanan Hebat` | `Proses & Perjuangan` |
| `Klik untuk batal` | `Eh, klik lagi buat batal` |
| `Klik jika kamu setuju ✨` | `Klik kalau kamu setuju juga ✨` |
| `SETUJU! 💖` | *(pertahankan)* |
| `Lempar Satu Pujian Lagi ✨` | `Kasih Aku Satu Pujian Lagi ✨` |

### Isi pujian (`compliments.ts`) — sudah cukup natural secara keseluruhan (bahasa gaul, nggak baku). Beberapa yang masih agak kaku/terlalu "translate-y":

| ID | Sebelum | Sesudah |
|---|---|---|
| c1 | cara kamu bikin suasana di sekitar terasa jauh lebih hidup. | cara kamu bikin suasana di sekitar jadi lebih hidup, padahal nggak ngapa-ngapain. |
| c2 | kamu punya energi positif hangat yang gampang banget diingat. | energi positif kamu tuh hangat banget, susah dilupain. |
| c3 | kemampuan kamu buat bikin orang lain selalu ngerasa nyaman. | kamu selalu berhasil bikin orang di sekitar ngerasa nyaman, entah gimana caranya. |
| c4 | kamu selalu punya cara buat ngadepin hari yang panjang dengan senyuman. | kamu selalu punya cara buat tetep senyum walau harinya panjang banget. |
| c5 | ada banyak hal kecil tentang kamu yang bikin orang seneng kamu hadir. | banyak hal kecil dari kamu yang bikin orang seneng pas kamu ada di situ. |
| c6 | kamu versi yang sekarang ini beneran luar biasa & layak dirayakan! | kamu yang sekarang ini beneran keren, dan pantes banget dirayain! |
| h1 | muka konyol kamu pas lagi ketawa lepas waktu difoto. | *(pertahankan, sudah lucu & natural)* |
| h2 | gaya santai khas kamu yang selalu kelihatan keren tanpa dibuat-buat. | gaya santai kamu tuh keren aja gitu, padahal nggak berusaha keras. |
| h3 | cara kamu menikmati waktu jalan-jalan dan nemuin hal-hal unik. | *(pertahankan)* |
| h4 | ketawa kamu yang khas dan selalu gampang nular ke siapa aja. | *(pertahankan)* |
| h5 | randomness kamu yang kadang nggak ketebak tapi selalu bikin ketawa. | *(pertahankan)* |
| g1 | kamu udah berhasil berkembang jauh banget sampai di umur baru ini. | kamu udah jauh banget berkembangnya buat sampai di umur baru ini. |
| g2 | kamu boleh bangga sama diri sendiri, bahkan untuk usaha yang nggak dilihat orang. | *(pertahankan, sudah bagus)* |
| g3 | semua proses panjang & perjuangan yang udah kamu lewatin hebat banget. | proses panjang dan perjuangan yang udah kamu lewatin itu hebat banget. |
| g4 | kamu makin dewasa & tahu gimana caranya sayang sama diri sendiri. | *(pertahankan)* |

---

## 10. Amplop Kupon Sederhana (`src/data/coupons.ts`)

Bagian ini sudah santai dan lucu. Cuma perlu polesan tipis:

| ID | Sebelum | Sesudah |
|---|---|---|
| cp-1 title | `1 Traktiran Minuman` | *(pertahankan)* |
| cp-1 desc | Bebas pilih minuman apa aja, di mana aja (asal jangan yang aneh-aneh ya). | *(pertahankan, sudah lucu)* |
| cp-2 title | `Sesi Cerita 1 Jam` | *(pertahankan)* |
| cp-2 desc | Satu sesi dengerin cerita kamu tanpa aku motong atau nyeramahin. | *(pertahankan)* |
| cp-3 desc | 1 teman jalan kalau kamu butuh keluar sebentar nyari udara segar. | 1 teman jalan siap sedia, kalau kamu butuh kabur sebentar cari udara segar. |
| cp-4 desc | 1 request playlist khusus bikinan aku buat nemenin hari kamu. | 1 playlist request khusus, aku yang bikinin buat nemenin harimu. |
| cp-5 desc | 1 foto favoritmu bakal aku cetakin biar bisa disimpen secara fisik. | 1 foto favoritmu aku cetakin, biar bisa disimpen fisiknya, bukan cuma di galeri hp. |

---

## 11. Digital VIP Voucher (`Coupons.tsx` → `DIGITAL_VOUCHERS`)

Ini bagian yang paling kaku di seluruh project — banyak diksi hukum/formal ("mutlak", "tanpa syarat", "diganggu gugat") yang niatnya lucu ("kartu sakti") tapi eksekusinya kaku. Revisi menjaga gimmick "kartu sakti/legendary" tapi bikin kalimatnya lebih hidup dan nggak kayak surat perjanjian.

**Judul section**
- `Digital VIP Pass Vault` → `Koleksi Voucher Sakti Azkia`
- `👑 TIKET EKSKLUSIF ULANG TAHUN AZKIA` → `👑 TIKET SPESIAL ULANG TAHUN AZKIA`

**Voucher 1 — Unlimited Mood Saver Pass**
- Sebelum subtitle: *Sesi Curhat & Comfort Call 24/7*
- Sesudah subtitle: *Curhat Kapan Aja, Aku Standby*
- Sebelum desc: *Bebas telepon atau chat kapan saja saat Azkia lagi pusing, overthinking, atau butuh teman cerita. Tanpa batasan durasi & tanpa bikin risih!*
- Sesudah desc: *Kalau lagi pusing, overthinking, atau cuma butuh teman cerita — telepon atau chat aja kapan pun. Nggak ada batas waktu, dan nggak akan bikin risih.*

**Voucher 2 — Midnight Dessert & Snack Party**
- Sebelum desc: *Kupon untuk pesan-antar makanan, minuman manis, boba, atau dessert favorit Azkia kapanpun lapar melanda. Dibayarin penuh 100%!*
- Sesudah desc: *Kupon buat pesan-antar makanan, boba, atau dessert favorit, kapan pun laper melanda — dan semuanya aku yang bayarin.*

**Voucher 3 — Movie Marathon & Popcorn Veto**
- Sebelum desc: *Hak veto mutlak untuk memilih judul film, tayangan series, dan cemilan pendamping saat nonton bareng tanpa boleh diprotes sama sekali!*
- Sesudah desc: *Kamu yang nentuin film, series, sama cemilannya pas nonton bareng — nggak ada protes-protesan, titik.*

**Voucher 4 — Coffee Date & Deep Talk Treat**
- Sebelum desc: *Kupon janjian ngopi dan deep talk di coffee shop estetik pilihan Azkia. Bebas pesan menu favorit sambil cerita santai tanpa terburu waktu.*
- Sesudah desc: *Kupon buat janjian ngopi dan deep talk di coffee shop pilihan kamu. Bebas pesan apa aja, ceritanya juga nggak usah buru-buru.*

**Voucher 5 — Anti-Debat Champion Card**
- Sebelum subtitle: *Bebas Menang 1 Kali Perdebatan*
- Sesudah subtitle: *Menang Debat, Sekali, Tanpa Ribet*
- Sebelum desc: *Kartu sakti kebal hukum! Saat digunakan, Azkia otomatis memenangkan perdebatan atau diskusi tanpa syarat dan keputusan tidak dapat diganggu gugat.*
- Sesudah desc: *Kartu sakti kebal debat. Sekali dipakai, kamu otomatis menang — nggak pakai proses banding, keputusan final.*

**Voucher 6 — The Ultimate Royal Wish Pass**
- Sebelum desc: *Voucher paling langka! Azkia berhak mengajukan 1 permintaan khusus apa saja (yang wajar & memungkinkan) dan wajib dikabulkan sepenuhnya!*
- Sesudah desc: *Voucher paling langka di sini. Ajukan 1 permintaan apa aja (yang masuk akal ya) — dan itu wajib aku kabulin, nggak pakai nego.*

**Micro-copy tombol/label:**
| Sebelum | Sesudah |
|---|---|
| `Tap / Gosok Untuk Buka 🪙` | *(pertahankan, sudah pas)* |
| `Klaim di WA` | *(pertahankan)* |
| `Salin Kode Voucher` (title) | `Salin Kodenya` |
| `Klaim Voucher Ini Sekarang via WhatsApp 💬` | `Klaim Voucher Ini di WhatsApp 💬` |

**Pesan WhatsApp otomatis (`waMessage`)** — sudah cukup natural, cuma disarankan lebih konsisten nada santai dan hapus tanda bintang markdown yang berlebihan supaya nggak kaku dibaca:
- Contoh revisi vouch-5: *"Halo! Aku mau klaim voucher sakti Anti-Debat Champion Card ya (kode: ANTI-DEBAT-WINNER-CARD) 🛡️ Aku menang debat kali ini!"*
- Contoh revisi vouch-6: *"Halo! Aku klaim voucher LEGENDARY The Ultimate Royal Wish Pass (kode: ROYAL-WISH-ROYALE-AZKIA) 👑 Ini permintaan spesialku, siap-siap ya!"*

---

## 12. Gacha Machine (`GachaMachine.tsx` + `src/data/gacha.ts`)

### Label UI
| Sebelum | Sesudah |
|---|---|
| `Surprise Capsule Machine` | `Mesin Kapsul Kejutan` |
| `Putar Tuas Mesin Gacha` (title) | `Tarik Tuasnya!` |
| `Koleksi Hadiah Kejutan Azkia` | `Koleksi Hadiah Kejutan Kamu` |
| `Lihat Detail` | *(pertahankan)* |

### Isi pesan gacha (`gacha.ts`) — sudah natural & lucu secara umum. Revisi tipis untuk beberapa yang masih kaku:

| ID | Sebelum | Sesudah |
|---|---|---|
| g5 | Kamu keren karena udah bertahan sejauh ini. | Kamu keren, udah bertahan sejauh ini — dan itu nggak kecil. |
| g6 | Kalau ada penghargaan teman ter-random, kamu menangnya. | Kalau ada penghargaan "teman paling random", kamu yang bawa pulang. |
| g10 | Nggak ada yang bisa gantiin posisimu. | *(pertahankan)* |
| g14 | Semoga pundakmu lebih ringan bawa beban. | *(pertahankan)* |
| g22 | Izin untuk beli makanan manis tanpa mikir kalori. | *(pertahankan, sudah lucu)* |
| g26 | Kupon: Bebas request 1 lagu buat aku dengerin. | *(pertahankan)* |
| g29 | Kupon: Minta dipuji (berlaku seumur hidup). | *(pertahankan, ini bagus)* |

Sisanya (g1–g4, g7–g9, g11–g13, g15–g21, g23–g25, g27–g28, g30) sudah cukup natural dan tidak perlu diubah — pertahankan.

---

## 13. Playground / Arcade Game (`Playground.tsx` + `src/data/games.ts`)

### Label & narasi karakter panduan
| Sebelum | Sesudah |
|---|---|
| `Birthday Arcade Corner` | `Sudut Arcade Ulang Tahun` |
| `Acak Game 🕹️` | `Random Aja 🕹️` |
| `Mengacak...` | `Lagi diacak...` |
| `Reset Ulang Progress` (title) | `Main Ulang dari Awal` |
| `Ingin mereset petualangan game ulang tahun dan main lagi dari awal?` (confirm dialog) | `Yakin mau reset semua progress game dan mulai lagi dari nol?` |
| `Halo Azkia! Pilihlah kartu game pertamamu untuk memulai petualangan!` | `Halo Azkia! Pilih satu kartu buat mulai petualangan mini game-nya!` |
| `Keren banget! Teruskan mainkan kartu game lainnya buat kumpulin trofi!` | `Keren! Lanjut mainin kartu lainnya biar trofinya makin banyak!` |
| `Selamat Azkia! Kamu berhasil menamatkan kelima mini game ultah dan berhak membuka piala emasmmu!` | `Selamat, Azkia! Kelima mini game udah kamu taklukin — waktunya buka piala emas kamu!` |
| `Tiket Bebas Minta Hadiah Kado / Traktiran Spesial!` | `Tiket Bebas Minta Kado atau Traktiran!` |
| `Semua Kartu` / `Santai` / `Kreatif` / `Puzzle` | *(pertahankan, sudah simpel & jelas)* |

### Deskripsi game (`games.ts`)
| Nama game | Sebelum | Sesudah |
|---|---|---|
| Tangkap Kado Rush | Ambil kado, bintang, dan cupcake yang jatuh dalam waktu 20 detik! | *(pertahankan, sudah jelas & seru)* |
| Balon Harapan | Pecahkan balon pastel untuk menemukan pesan-pesan manis tersembunyi. | Pecahin balon-balon pastel, ada pesan manis yang nunggu di dalamnya. |
| Kuis Memori & Chemistry | Uji seberapa ingat Azkia sama momen-momen manis kita berdua. | Coba tebak, seberapa inget Azkia sama momen-momen manis kita berdua? |
| Dekor Kue Kilat | Rakit dan hias kue ulang tahun impian versi kamu sendiri dalam 30 detik. | Rakit dan hias kue ulang tahun impianmu sendiri — cuma 30 detik! |
| Memory Match | Cari dan temukan pasangan foto kenangan manis yang cocok. | Cari pasangan foto kenangan yang cocok, siapa cepat dia menang. |

---

## 14. Kuis Memori & Chemistry (`src/data/quiz.ts`)

Bagian ini sudah cukup natural. Revisi difokuskan ke pertanyaan yang masih agak kaku dan reaksi yang bisa lebih lucu:

| ID | Sebelum (question) | Sesudah (question) |
|---|---|---|
| q1 | Bagian dari pesta kecil ini yang paling cocok sama Azkia? | Dari semua bagian pesta kecil ini, yang paling "Azkia banget" yang mana? |
| q2 | Kalau harus pilih satu, mood ulang tahun hari ini kayaknya... | Kalau boleh nebak, mood ulang tahun kamu hari ini kayaknya... |
| q3 | Kue pilihan birthday girl paling cocok dihias dengan... | Kue si birthday girl paling pas dihias pakai... |
| q4 | Di antara semua memori sejauh ini, yang paling kerasa... | Dari semua momen kita sejauh ini, yang paling nempel di ingatan... |
| q5 | Kado paling pas buat hari ini itu... | *(pertahankan)* |
| q6 | Gaya foto yang paling 'Azkia banget'... | *(pertahankan, sudah pas)* |
| q7 | Harapan paling penting buat tahun ini... | *(pertahankan)* |

Reaksi (`reaction`) — sudah lucu dan natural, sebagian besar bisa dipertahankan. Satu yang agak kaku:
- Sebelum (q1, opsi "Banyak kejutan"): *"Kejutan kecil buat yang suka bikin orang tersenyum."*
- Sesudah: *"Kejutan-kejutan kecil, khusus buat kamu yang suka bikin orang lain senyum duluan."*

---

## 15. Scrapbook / Album Foto (`Scrapbook.tsx` + `src/data/photos.ts`)

### Label UI
| Sebelum | Sesudah |
|---|---|
| `Klik foto mana saja untuk lihat cerita! ✨` | `Klik fotonya, ada cerita di baliknya ✨` |
| `Memory Scrapbook Album` | `Album Kenangan` |
| `🌸 Momen Pilihan` | *(pertahankan)* |
| `📸 Banyak Cerita` | *(pertahankan)* |
| `🍼 MINI AZKIA` | *(pertahankan, sudah lucu)* |
| `✨ SPOTLIGHT` | *(pertahankan)* |

### Caption foto (`photos.ts`) — sudah salah satu bagian paling kuat & natural di seluruh web (short, witty, kayak caption Instagram beneran). Pertahankan hampir semua. Cuma satu-dua polesan kecil:

| ID | Sebelum | Sesudah |
|---|---|---|
| photo-hero | hari ini kamu main character-nya. | *(pertahankan — sudah pas & related sama badge hero)* |
| photo-feat-1 | fokusnya ke depan, santai aja. | *(pertahankan)* |
| photo-fun-1 | versi mini yang nggak kalah gemas. | *(pertahankan)* |
| photo-fun-2 | bukti otentik sejak kecil. | bukti sah sejak kecil emang udah gemes. |
| photo-scrap-1 | waktu itu, di depan pintu merah. | *(pertahankan)* |
| photo-scrap-10 | kalau nggak aneh ya bukan kita. | *(pertahankan, ini bagus banget)* |
| photo-scrap-12 | ngeeng. | *(pertahankan, one-word caption ini justru pas)* |
| photo-spotlight | satu manusia yang bikin suasana lebih hidup. | *(pertahankan)* |
| photo-letter | baca pelan-pelan ya. | *(pertahankan)* |
| photo-closing | senang bisa kenal kamu. | *(pertahankan)* |

---

## 16. Birthday Cinema (`BirthdayCinema.tsx` + `src/data/videos.ts`)

### Label UI
| Sebelum | Sesudah |
|---|---|
| `Birthday Cinema Theater` | `Bioskop Ulang Tahun` |
| `Birthday Cinema & Reels` | `Cinema & Reels Ulang Tahun` |
| `🍿 Popcorn & Reels siap! ✨` | *(pertahankan, sudah lucu)* |
| `Tonton di Theater Mode` (title) | `Mode Layar Lebar` |
| `Aktifkan Suara` / `Matikan Suara` | *(pertahankan, sudah jelas)* |

### Judul & caption video (`videos.ts`)
| ID | Sebelum | Sesudah |
|---|---|---|
| video-1 title | satu momen yang nggak cukup disimpan jadi foto | *(pertahankan, ini kuat)* |
| video-1 caption | karena kadang yang gerak-gerak gini lebih kerasa hidupnya. | *(pertahankan)* |
| video-2 title | Azkia, versi yang bergerak dan bikin suasana hidup | Azkia, versi yang gerak-gerak dan tetep bikin suasana hidup |
| video-2 caption | di-save buat diingat kalau kamu selalu punya cara sendiri buat bahagia. | disimpen biar diinget, kamu selalu punya cara sendiri buat bahagia. |

---

## 17. WhatsApp RSVP (`WhatsAppRSVP.tsx`)

Label copy tombol/state sudah simpel dan tidak perlu banyak diubah:
- `Tersalin` / `Salin Link` → pertahankan, sudah jelas fungsinya.

---

## Rangkuman Prioritas Revisi

Kalau waktu terbatas dan cuma mau revisi yang paling berdampak, fokuskan ke 3 area ini dulu (paling kaku dibanding bagian lain):

1. **`Coupons.tsx` → `DIGITAL_VOUCHERS`** (section 11) — paling formal/kaku di seluruh web, banyak diksi "hukum" yang perlu diringankan.
2. **Label UI berbahasa Inggris-formal** yang tersebar di berbagai section (`Digital VIP Pass Vault`, `Surprise Capsule Machine`, `Sacred Birthday Ritual`, `Candid Appreciation Wall`, `Memory Scrapbook Album`, `Birthday Arcade Corner`, `Birthday Cinema Theater`) — semua diusulkan versi Indonesia yang lebih santai di section masing-masing.
3. **Surat ulang tahun** (`letter.ts`, section 6) — sudah paling natural, cukup polesan halus tanpa merombak nada aslinya karena ini "jantung" emosional halaman.

Bagian yang **sudah bagus dan sebaiknya tidak diutak-atik**: caption foto di `photos.ts`, sebagian besar isi `wishes.ts`, hero sub-caption "pelan-pelan aja, nek...", dan mayoritas pesan di `gacha.ts` — semuanya sudah punya suara yang konsisten, personal, dan nggak kaku.
