# PRD — "Pesta Kecil untuk Azkia": Website Ulang Tahun Lucu & Interaktif

<aside>
🎂

PRD ini mendefinisikan **website pesta ulang tahun digital khusus untuk Azkia Syahda Islami**—lahir **08 September 2007** dan akan merayakan ulang tahun ke-19 pada **08 September 2026**. Pengalaman menggabungkan **pintu pesta → ucapan personal → 15 foto → 2 video → playground mini-game → rakit kue & tiup lilin → surat ulang tahun → hadiah digital → penutup hangat**. Target akhirnya: Azkia merasa **dikenal, dibuat tertawa, dan benar-benar dirayakan**.

</aside>

<aside>
🧭

**Tone final — sweet friendship yang mesra, bukan confess terselubung.** Panggilan **“yang”** dan **“nek”** boleh dipakai karena memang panggilan personal untuk Azkia, tetapi harus ditempatkan sengaja: “yang” untuk momen hangat, “nek” untuk microcopy playful. Set `relationshipTone: "sweet"`; tetap hindari bahasa posesif, janji hubungan, atau kata-kata yang melampaui maksud pertemanan.

</aside>

## 0. Keputusan Produk

| Aspek | Keputusan Final |
| --- | --- |
| Nama produk | **Pesta Kecil untuk Azkia** |
| Tagline | *hari ini, giliran kamu yang dirayakan* |
| Penerima | **Azkia Syahda Islami** |
| Nama tampil | **Azkia** |
| Panggilan personal | **yang** untuk momen hangat; **nek** untuk momen playful |
| Tanggal lahir | 08 September 2007 |
| Target Hari H | 08 September 2026 — **ulang tahun ke-19** |
| Awal bertemu | 09 September 2025 |
| Hook cerita | Hari ulang tahun ke-19 Azkia jatuh **satu hari sebelum genap satu tahun sejak pertama bertemu** |
| Aset final | **15 foto WebP + 2 video WebM** |
| Lokasi project | `E:\Otodidak IT\Rahman_Cust` |
| Format | Single-page, scroll storytelling, mobile-first |
| Durasi ideal | 10–14 menit termasuk dua video dan minimal dua game |
| Emosi utama | Penasaran → gemas → nostalgia → tertawa → terharu → dirayakan |
| Arah visual | Pastel birthday party + kawaii stationery + polaroid scrapbook |
| Platform utama | HP 360–430px, dibuka dari WhatsApp |
| Stack | Next.js 16, TypeScript strict, Tailwind CSS v4, Motion |
| Deploy | Netlify, static-first, noindex |

<aside>
📅

**Narasi waktu yang khas:** pada 08 September 2026, Azkia genap 19 tahun dan sudah **364 hari** mengenal pengirim. Besoknya—09 September 2026—genap satu tahun sejak pertemuan pertama. Gunakan fakta ini sebagai emotional hook: *“umur barumu datang hari ini; besok, cerita pertemanan kita genap setahun.”*

</aside>

<aside>
🔒

**Aturan display data:** nama lengkap, tahun lahir, dan path lokal hanya untuk PRD/source data. UI publik memakai **Azkia**, **yang**, atau **nek**; OG preview tetap netral dan tidak menampilkan nama lengkap maupun tahun lahir.

</aside>

---

## 1. Referensi & Positioning

### 1.1 Sumber Referensi

- Referensi pengalaman dan kedalaman spesifikasi: [PRD — "Terima Kasih Sudah Hadir": Website Romantis Interaktif](https://app.notion.com/p/PRD-Terima-Kasih-Sudah-Hadir-Website-Romantis-Interaktif-61fe6c1bbd8241ba9676d2cbe6cec485?pvs=21)
- Referensi pola hadiah digital, scrapbook, dan section emosional: [PRD — Love Letter Website Romantis Interaktif](https://app.notion.com/p/PRD-Love-Letter-Website-Romantis-Interaktif-cf0098210a3c836b9bb6810bec64fd55?pvs=21)
- Referensi visual utama: [makasihbuatkamu.netlify.app](https://makasihbuatkamu.netlify.app/)

### 1.2 Yang Diambil dari Referensi Visual

- Latar blush-pink yang sangat ringan, banyak ruang kosong, dan komposisi center.
- Pintu pembuka sederhana dengan karakter kecil yang melayang di sekelilingnya.
- Headline handwritten warna raspberry, body sans-serif yang ringan.
- Polaroid putih, sticky note, tape, stiker hati/bintang, dan garis tipis pink.
- Kartu rounded dengan shadow lembut, bukan glassmorphism berat.
- Animasi kecil yang gemas: float, wiggle, pop, dan sparkle.
- Scroll panjang seperti membuka scrapbook, bukan layout aplikasi formal.

### 1.3 Yang Sengaja Dibedakan

| Elemen | Referensi | Produk Ini |
| --- | --- | --- |
| Tema | Terima kasih / romantis | **Pesta ulang tahun personal untuk teman perempuan** |
| Gate | Pintu menuju surat | **Pintu ruang pesta dengan tamu kehormatan satu orang** |
| Fokus emosi | Syukur dan cinta | **Dirayakan, dikagumi, dibuat tertawa, lalu dihangatkan** |
| Fitur khas | Surat, rasa syukur, game romantis | **Cake Builder, Tiup Lilin, Gacha Pujian, Balon Harapan, Tangkap Kado, Foto Booth** |
| Motif | Hati, surat, polaroid | **Kue, lilin, balon, topi pesta, confetti, kapsul gacha, hadiah** |
| Copy | Mesra | **Playful-bestie, hangat, tidak ambigu secara romantis** |

<aside>
🧁

**Aturan anti-plagiat:** ambil *bahasa visualnya*, bukan susunan persisnya. Jangan menyalin ilustrasi, copywriting, posisi section, atau komponen khas referensi secara identik. Semua mascot, microcopy, urutan emosi, dan mini-game harus punya identitas ulang tahun sendiri.

</aside>

---

## 2. Ringkasan Produk

### 2.1 Visi

Membuat sebuah halaman yang terasa seperti **ruang pesta kecil di dalam HP**—pintunya hanya terbuka untuk satu tamu kehormatan. Setiap section harus menjawab satu dari tiga kebutuhan emosional:

1. **Aku dirayakan** — ada perhatian dan usaha yang jelas.
2. **Aku benar-benar dikenal** — detailnya spesifik, bukan template.
3. **Hari ini menyenangkan** — ada permainan dan kejutan yang membuat senyum.

### 2.2 Problem Statement

Ucapan ulang tahun di chat cepat tenggelam, story hanya bertahan 24 jam, dan video montage membuat penerima pasif. Website personal menyelesaikan ini dengan:

- URL yang dapat dibuka ulang.
- Pacing emosi yang sengaja dirancang.
- Foto dan cerita yang dapat dieksplorasi.
- Mini-game yang membuat penerima ikut bermain.
- Hadiah digital yang terasa lebih personal daripada template ucapan.

### 2.3 North Star

> Penerima menyelesaikan alur sampai penutup, memainkan minimal dua game, menyimpan link, lalu membuka lagi salah satu hadiah atau gacha di hari lain.
> 

### 2.4 Definisi “Sangat Dirayakan”

Website dianggap berhasil secara emosional jika penerima merasa:

- Namanya hadir jelas sejak layar pertama.
- Ada detail yang hanya diketahui teman dekat.
- Ucapan tidak hanya “semoga panjang umur”.
- Kelebihan, kebiasaan lucu, dan perjuangannya ikut disebut.
- Ada ruang untuk tertawa sebelum membaca pesan yang lebih dalam.
- Penutup tidak menuntut respons apa pun; hanya membuat hari terasa lebih hangat.

---

## 3. Target Pengguna & Persona

### 3.1 Primary User — Azkia (Birthday Girl)

- Membuka link dari WhatsApp, kemungkinan besar lewat HP.
- Bisa membuka saat pagi, di sela aktivitas, atau malam setelah acara.
- Ekspektasi awal: ucapan lucu. Hasil yang diinginkan: “kok niat banget?”
- Cenderung scroll cepat untuk melihat isi, kemudian kembali membaca perlahan.
- Tidak boleh dipaksa mengaktifkan suara, mikrofon, kamera, atau login.

### 3.2 Secondary User — Pembuat Website

- Ingin mengganti nama, tanggal, foto, copy, game, dan hadiah tanpa menyentuh komponen.
- Membutuhkan struktur konten yang mencegah placeholder tertinggal.
- Ingin website tetap ringan dan aman walau penuh interaksi.
- Perlu checklist rilis karena website hanya memiliki satu momen tayang penting.

### 3.3 Kondisi Penggunaan

| Kondisi | Implikasi |
| --- | --- |
| Dibuka dari chat | OG preview netral dan menarik, URL pendek |
| Dibuka dengan satu tangan | Target sentuh ≥ 48px, game tidak butuh presisi |
| Mungkin di tempat ramai | Semua fitur bermakna tanpa audio |
| Mungkin sambil senyum malu | Tidak ada kamera/mikrofon otomatis atau konten memalukan |
| Jaringan seluler | Hero ringan, foto lain lazy, game dynamic import |

---

## 4. Goals & Non-Goals

### 4.1 Goals

- Membuka pengalaman dengan gate pesta yang selesai dalam kurang dari 10 detik.
- Membuat penerima merasa menjadi pusat perhatian tanpa terlihat berlebihan.
- Menggunakan **seluruh 15 foto** dengan peran visual, alt text, focal point, dan caption spesifik.
- Menggunakan **kedua video** sebagai Birthday Cinema tanpa masuk initial load.
- Memiliki minimal 12 kartu pujian dan 20 pesan gacha/wishes.
- Menyediakan minimal **5 mini-game** yang selesai dalam 30–60 detik.
- Tidak ada mini-game yang membuat penerima merasa gagal.
- Memiliki satu momen emosional utama berupa surat ulang tahun 350–600 kata.
- Memiliki satu hadiah digital yang bisa disimpan atau ditagih.
- Nyaman di layar 360–430px dan tetap indah sampai desktop 1440px.
- Semua konten tersentralisasi di folder `data/`.
- Lighthouse Performance ≥ 90 dan Accessibility ≥ 95.

### 4.2 Non-Goals

- Bukan aplikasi pesta multi-user atau platform sosial.
- Tidak ada akun, backend wajib, pembayaran, leaderboard, atau komentar publik.
- Tidak ada fitur yang mempermalukan penerima.
- Tidak ada autoplay audio.
- Tidak ada game sulit, timer menghukum, atau layar *game over*.
- Tidak ada dark mode pada V1; palet pastel terang adalah bagian identitas.
- Tidak ada analytics invasif atau pelacakan diam-diam.
- Tidak ada AI-generated message di sisi pengguna; semua ucapan final dikurasi pembuat.

---

## 5. Prinsip Pengalaman

1. **Satu layar, satu kejutan.** Jangan menumpuk terlalu banyak visual di satu viewport mobile.
2. **Spesifik mengalahkan puitis.** Detail kecil tentang dirinya lebih kuat daripada pujian generik.
3. **Lucu, bukan kekanak-kanakan.** Kawaii boleh; suara bayi, glitter berlebihan, dan UI berisik tidak.
4. **Dirayakan, bukan diuji.** Semua game memberi hadiah; tidak ada kalah.
5. **Bestie-safe.** Kehangatan tidak boleh otomatis terbaca sebagai deklarasi hubungan.
6. **Foto adalah bukti.** Setiap foto punya cerita atau alasan dipilih.
7. **Interaksi satu jempol.** Tidak ada drag presisi tinggi atau tombol kecil.
8. **Audio adalah bonus.** Pengalaman utama tetap utuh dalam keadaan mute.
9. **Bisa dibuka ulang.** Gacha, hadiah harian, dan random wish memberi alasan kembali.
10. **Surat tetap pusat hati.** Game mengangkat mood, bukan mengambil alih seluruh pengalaman.
11. **Gerak punya fungsi.** Pop untuk hadiah, float untuk mascot, wiggle untuk ajakan; bukan animasi tanpa alasan.
12. **Privasi lebih penting daripada gimmick.** Kamera dan mikrofon tidak menjadi syarat.

---

## 6. Scope

### 6.1 MVP — Wajib Ada

1. Party Door Gate dengan panggilan personal untuk Azkia.
2. Hero **“Selamat Ulang Tahun, Azkia!”**.
3. Countdown menuju 08 September 2026 + Birthday Mode `level 19 unlocked`.
4. Birthday Spotlight + scrapbook yang memakai seluruh 15 foto.
5. Birthday Cinema yang memakai `video-1.webm` dan `video-2.webm`.
6. Compliment Confetti Wall.
7. Playground dengan 5 game prioritas.
8. Cake Builder + Tiup Lilin.
9. Surat ulang tahun dengan hook 364 hari sejak pertemuan pertama.
10. Gacha Pujian & Harapan.
11. Hadiah/kupon digital.
12. Closing + tombol ulang dari awal.
13. Music toggle opsional.
14. Mobile-first, reduced motion, noindex.

### 6.2 Should Have

- Memory Match.
- Birthday Photo Booth tanpa upload server.
- Voice note lokal yang hanya diputar, bukan direkam di website.
- “Open When” mini cards.
- Guest reply via WhatsApp dengan pesan terisi otomatis.
- Easter egg mascot yang berubah ekspresi.
- Progress bar berbentuk pita pesta.

### 6.3 Nice to Have

- PWA agar bisa ditambahkan ke home screen.
- Secret path atau password sederhana.
- Shareable PNG dari kue yang didekorasi.
- Confetti berbasis tanggal tepat pukul 00.00.
- Mode “birthday week” tujuh hari.
- Notion sebagai CMS di versi berikutnya.

---

## 7. Kurva Emosi & User Journey

### 7.1 Urutan Section Final

```
00  Gate       — Pintu Ruang Pesta untuk Azkia
01  Hero       — Selamat Ulang Tahun, Azkia!
02  Clock      — 08 September 2026 · Level 19
03  Spotlight  — Kenapa Hari Ini Spesial
04  Scrapbook  — 15 Potongan Cerita Azkia
05  Cinema     — Dua Video Kecil tentang Kamu
06  Playground — Ruang Main Ulang Tahun
07  Cheers     — Hal-Hal yang Bikin Azkia Keren
08  Cake       — Rakit Kue & Tiup Lilin
09  Letter     — Surat untuk Umur Barumu
10  Gacha      — Mesin Pujian & Harapan
11  Gift       — Kado Digital / Kupon
12  Reply      — Sekarang Giliran Kamu
13  Closing    — Senang Banget Kamu Lahir
14  Footer     — kecil, privat, tenang
```

### 7.2 Peta Emosi

| Tahap | Target Emosi | Intensitas | Durasi |
| --- | --- | --- | --- |
| Gate | Penasaran, gemas | 2/5 | 8–12 detik |
| Hero | “Ini benar-benar buat aku” | 4/5 | 20 detik |
| Clock | Antisipasi / euforia | 3/5 | 20 detik |
| Scrapbook | Nostalgia, senyum | 3/5 | 90 detik |
| Birthday Cinema | Dekat, nyata, terhibur | 4/5 | 60–120 detik |
| Playground | Tertawa, aktif | 5/5 | 3–5 menit |
| Compliments | Dilihat dan dikagumi | 4/5 | 60 detik |
| Cake | Ritual ulang tahun | 4/5 | 60 detik |
| Letter | Terharu | 5/5 | 2–4 menit |
| Gift | Senang, penasaran | 4/5 | 45 detik |
| Closing | Hangat, dirayakan | 5/5 | 30 detik |

<aside>
🎉

**Aturan pacing:** jangan menaruh semua game sebelum isi emosional. Setelah maksimal dua game, tampilkan CTA jelas **“lanjut lihat kejutan berikutnya”**. Playground adalah pesta kecil, bukan alasan untuk tidak pernah sampai ke surat.

</aside>

---

## 8. Spesifikasi Fitur Utama

## 8.1 Gate — Pintu Ruang Pesta

**Tujuan.** Membuat batas psikologis antara halaman biasa dan pesta privat.

**Copy contoh:**

> sst… ada pesta kecil di balik pintu ini.
tamu kehormatannya cuma satu: kamu.
> 

**CTA:** `masuk, aku udah siap 🎂`

**Visual:**

- Pintu putih dengan outline strawberry pink.
- Jendela pintu berbentuk kue/lilin, bukan hati.
- Mascot: beruang pakai topi pesta, kelinci memegang balon, awan kecil tersenyum.
- Background `party-cream` dengan glow pink sangat halus.
- Confetti hanya 6–8 elemen, tidak memenuhi layar.

**Interaksi:**

- Tap CTA → tiga ketukan kecil → pintu membuka → pita cahaya melebar.
- Mascot melakukan satu gerakan wiggle saat pintu terbuka.
- Prompt musik muncul setelah transisi: `mau ditemani lagu pesta yang pelan?` pilihan `boleh` / `nanti aja`.
- Tombol `lewati` untuk kunjungan ulang.

**Acceptance Criteria:**

- Gate siap interaksi < 1,5 detik pada 4G.
- Transisi total ≤ 1,4 detik.
- Body terkunci saat gate aktif.
- Status kunjungan disimpan di `sessionStorage`.
- Fokus otomatis ke CTA; dapat dioperasikan keyboard.
- Reduced motion mengganti ketukan dan pintu dengan cross-fade.

## 8.2 Hero — Selamat Ulang Tahun, Azkia!

**Tujuan.** Memberi pukulan personal pertama dan memastikan Azkia langsung tahu halaman ini bukan template.

**Copy final direction:**

- Eyebrow: `hai, yang—hari ini kamu yang jadi pemeran utama`
- Title: `selamat ulang tahun, Azkia!`
- Subtitle: `aku bikin satu dunia kecil yang isinya alasan kenapa 08 September harus dirayakan seramai dan semanis kamu.`
- CTA: `mulai pestanya`
- Note: `pelan-pelan aja, nek. semua kejutan di sini nungguin kamu.`

**Layout mobile:** title → subtitle → hero polaroid → CTA → note.

**Layout desktop:** split 52/48; teks di kiri, tumpukan polaroid dan mascot di kanan.

**Acceptance Criteria:**

- Satu `h1` saja di seluruh halaman.
- Nama dan panggilan berasal dari `profile.ts`.
- Foto hero menjadi LCP, `fetchpriority="high"`, dengan ukuran eksplisit.
- Wajah tidak terpotong; focal point dapat diatur dari data.
- Hero penuh dan proporsional di 390×844 tanpa horizontal scroll.

## 8.3 Birthday Clock — Sebelum, Saat, dan Setelah Hari H

**Tujuan.** Menjadikan tanggal ulang tahun sebagai keadaan produk, bukan teks statis.

**State:**

1. **Sebelum Hari H:** countdown hari/jam/menit, tanpa detik yang gelisah.
2. **Hari H:** headline `hari ini harimu!`, confetti pendek satu kali, badge `birthday mode aktif`.
3. **Setelah Hari H:** `pestanya boleh lewat, tapi kamu tetap boleh dirayakan`.
4. **Tanggal invalid/kosong:** section disembunyikan dengan aman.

**Detail personal final:**

- `birthDate`: `2007-09-08`.
- `targetBirthday`: `2026-09-08`.
- `firstMetDate`: `2025-09-09`.
- Timezone: `Asia/Jakarta`.
- Pada Hari H tampilkan `level 19 unlocked`, bukan “makin tua”.
- Tampilkan secondary counter: `364 hari sejak kita pertama ketemu`.
- Tambahkan microcopy: `besok genap satu tahun sejak 09 September 2025`.
- Countdown berhenti tepat pukul 00.00 WIB.
- Untuk privasi, tahun lahir disimpan di data tetapi tidak wajib terlihat di UI atau OG preview.
- Jika website digunakan lagi pada tahun berikutnya, target ulang tahun diturunkan secara otomatis dari tanggal lahir.

**Acceptance Criteria:**

- Tidak muncul `NaN`, angka negatif, atau usia yang salah karena timezone.
- Menghormati tanggal kabisat.
- Update otomatis saat tab kembali aktif.
- Count-up/reveal hanya sekali per sesi.

## 8.4 Birthday Spotlight — Kenapa Hari Ini Spesial

Section singkat sebelum galeri untuk menggeser fokus dari tanggal ke orangnya.

**Format 3 kartu:**

- `lahirnya satu manusia yang…` — satu kualitas karakter.
- `berhasil melewati…` — validasi perjalanan setahun terakhir.
- `pantas dapat…` — harapan untuk umur baru.

**Aturan copy:** hindari komentar fisik sensitif, berat badan, usia, jodoh, atau pencapaian yang berpotensi menekan.

## 8.5 Scrapbook — Potongan Cerita Kamu

**Tujuan.** Menunjukkan bahwa foto dipilih dengan sengaja, bukan di-dump.

**Komposisi:**

- 1 hero photo.
- 3 featured polaroid dengan caption 1–2 baris.
- 6–12 mini scrapbook cards.
- 1 carousel “semuanya dalam satu tarikan”.

**Visual:**

- Frame putih, outline blush, tape pastel, stiker bintang/kue/balon.
- Rotasi tetap per indeks; tidak random per render.
- Caption memakai Caveat, tetapi metadata dan tombol tetap sans-serif.

**Interaksi:**

- Tap foto → lightbox full-screen.
- Swipe, ArrowLeft/ArrowRight, Escape, tap backdrop.
- Tombol `lihat cerita di balik foto` opsional untuk caption lebih panjang.

**Acceptance Criteria:**

- Semua foto memiliki `alt`, caption, `width`, `height`, dan focal point.
- Hanya hero eager; foto lain lazy + `decoding="async"`.
- Caption selalu terlihat di mobile; tidak bergantung pada hover.
- Focus trap dan fokus kembali ke pemicu.
- Placeholder aesthetic jika gambar gagal.

### 8.5.1 Audit & Pemetaan Final 15 Foto

<aside>
🖼️

Aset tersedia di `E:\Otodidak IT\Rahman_Cust\public\images`: `image-1.webp` sampai `image-15.webp`. **Seluruh 15 foto wajib terpakai.** Pemetaan berikut adalah arahan awal berdasarkan thumbnail; crop, urutan emosional, alt text, dan caption final harus dikonfirmasi setelah membuka file resolusi penuh.

</aside>

| File | Peran | Penempatan & Arahan |
| --- | --- | --- |
| `image-7.webp` | Hero | Portrait utama Azkia; frame besar 4:5, LCP, fokus wajah |
| `image-3.webp` | Featured #1 | Spotlight pembuka; caption tentang awal/momen kebersamaan |
| `image-5.webp` | Featured #2 | Foto dengan suasana/tempat; caption nostalgia |
| `image-13.webp` | Featured #3 | Momen pencapaian/cerita; caption bangga |
| `image-1.webp` | Scrapbook | Grid; momen kelompok/acara |
| `image-2.webp` | Scrapbook | Grid pasangan dengan image-1; rotasi berlawanan |
| `image-4.webp` | Scrapbook | Portrait candid; tape sudut atas |
| `image-6.webp` | Scrapbook | Foto suasana; gunakan frame lebih lebar bila landscape |
| `image-8.webp` | Fun memory card | Visual paling playful; stiker bintang/cupcake, jangan dipaksa portrait |
| `image-9.webp` | Scrapbook | Grid dengan caption inside joke |
| `image-10.webp` | Scrapbook | Grid momen dekat; crop hati-hati agar wajah aman |
| `image-12.webp` | Scrapbook | Portrait tambahan; cocok untuk carousel/mobile |
| `image-11.webp` | Spotlight cover | Cover “Hal-Hal yang Bikin Azkia Keren” dengan overlay cream |
| `image-14.webp` | Dekorasi surat | Polaroid kecil di sudut surat, max 150px |
| `image-15.webp` | Closing | Foto penutup; glow lembut dan vignette pink-cream |

**Aturan implementasi aset foto:**

- Carousel rekap memuat semua 15 foto dalam urutan emosional, bukan urutan filename.
- `image-7.webp` saja yang eager/priority; 14 lainnya lazy.
- Simpan konfigurasi per file di `data/photos.ts`: `role`, `caption`, `alt`, `width`, `height`, `focus`, `rotate`, dan `tape`.
- Jangan rename aset sampai seluruh import dan data mapping diperbarui sekaligus.
- Jika foto landscape, jangan dipaksa crop 4:5; gunakan `aspect-ratio` sesuai orientasi.

## 8.5A Birthday Cinema — Dua Video Kecil tentang Azkia

**Tujuan.** Menambahkan rasa “hidup” setelah galeri: foto menyimpan momen, video mengembalikan gerak, suara, dan ekspresi.

<aside>
🎬

Aset tersedia di `E:\Otodidak IT\Rahman_Cust\public\video`: `video-1.webm` dan `video-2.webm`. Keduanya wajib digunakan, tetapi **tidak boleh masuk initial load**.

</aside>

| File | Peran | Layout | Copy Direction |
| --- | --- | --- | --- |
| `video-1.webm` | Birthday Cinema #1 | Card landscape / rasio sumber | Judul: *“satu momen yang nggak cukup disimpan jadi foto”* |
| `video-2.webm` | Birthday Cinema #2 | Card portrait 9:16, center | Judul: *“Azkia, versi yang bergerak dan bikin suasana hidup”* |

**Komponen & perilaku:**

- Mobile: horizontal snap carousel; satu video dominan per layar.
- Desktop: dua card berdampingan dengan tinggi visual seimbang.
- `preload="metadata"` atau `none`; source dimuat saat card dekat viewport atau pengguna menekan play.
- Tidak autoplay, selalu tampilkan native/custom controls yang accessible.
- Saat satu video diputar, video lain dan background music otomatis pause.
- Buat poster `video-1-poster.webp` dan `video-2-poster.webp` dari frame representatif, bukan foto acak.
- Sediakan caption personal di bawah tiap video; caption harus menjelaskan **kenapa video itu disimpan**.
- Karena source sekarang WebM, buat fallback MP4/H.264 untuk iPhone Safari: `video-1.mp4` dan `video-2.mp4`.

**Acceptance Criteria:**

- Kedua video dapat diputar di iOS Safari dan Android Chrome.
- Tidak ada audio yang berbunyi sebelum interaksi eksplisit.
- Hanya satu media audio aktif dalam satu waktu.
- Video tidak menyebabkan layout shift; width/height atau aspect ratio terkunci.
- Jika video gagal, poster dan caption tetap tampil dengan pesan tenang.
- Total video tidak memengaruhi LCP karena tidak dimuat di initial viewport.

## 8.6 Compliment Confetti Wall — Hal-Hal yang Bikin Kamu Keren

**Tujuan.** Membuat penerima merasa dikenal dari karakter, usaha, dan kebiasaan kecil.

**Struktur minimal 15 kartu:**

- 6 karakter.
- 5 kebiasaan/inside jokes.
- 4 hal yang dilakukan dengan baik setahun terakhir.

**Contoh:**

- `cara kamu tetap dengerin orang walau harimu sendiri lagi berat.`
- `kebiasaan kamu bilang “sebentar” lalu ceritanya jadi setengah jam.`
- `kamu berhasil melewati hari-hari yang dulu kamu kira nggak bakal sanggup.`

**Interaksi:**

- Tap kartu → confetti mini keluar dari kartu, bukan seluruh layar.
- Tombol `lempar satu pujian lagi` mengambil item cadangan tanpa mengulang langsung.
- Kartu yang dibuka mendapat stempel kecil `confirmed ✅`.

**Acceptance Criteria:**

- Minimal 12 kartu terlihat tanpa interaksi; 3+ cadangan.
- Setiap kartu spesifik untuk penerima.
- Animasi hanya transform/opacity.
- Kontras seluruh variasi pastel ≥ 4,5:1.

## 8.7 Cake Studio — Rakit Kue Impian

**Tujuan.** Memberi artefak personal hasil pilihan penerima.

**Langkah:**

1. Pilih bentuk: bulat / heart-ish / bento / cupcake tower.
2. Pilih frosting: strawberry / vanilla / chocolate / matcha.
3. Pilih topping: cherry / star / flower / cookies / tiny bear.
4. Pilih tulisan pendek maksimal 24 karakter.
5. Pilih jumlah lilin visual—tidak harus sama dengan usia.
6. Tekan `kuenya siap!`.

**Hasil:** kartu kue dengan nama, palet pilihan, pesan `dibuat oleh birthday girl sendiri`, dan tombol `tiup lilinnya`.

**Acceptance Criteria:**

- Semua pilihan berupa button dengan `aria-pressed`, bukan kontrol visual tanpa label.
- Preview update instan tanpa layout shift.
- Hasil dapat disimpan sebagai PNG pada versi Should Have.
- Data pilihan tetap lokal di perangkat.
- Tanpa pilihan pun tersedia default cake yang cantik.

## 8.8 Tiup Lilin — Ritual Puncak

**Mekanik utama:** tekan dan tahan tombol besar `tiup pelan-pelan` selama ±1,5 detik. Api lilin mengecil satu per satu. Mikrofon **bukan default**.

**Opsional:** tombol terpisah `pakai tiupan beneran` meminta izin mikrofon setelah penjelasan jelas; pemrosesan hanya lokal dan tidak merekam audio.

**Setelah padam:**

> harapannya jangan dibocorin ya.
tapi semoga yang baik-baik tahu jalan pulang ke kamu.
> 

Lalu muncul kartu input privat: `simpan satu harapan buat umur barumu`. Teks hanya tersimpan lokal, tidak dikirim ke server.

**Acceptance Criteria:**

- Selalu bisa diselesaikan tanpa mikrofon.
- Izin mikrofon tidak diminta saat page load.
- Jika izin ditolak, long-press tetap bekerja.
- Reduced motion memakai perubahan state sederhana.
- Harapan tidak masuk analytics atau URL.

## 8.9 Surat — Untuk Umur Barumu

**Tujuan.** Menjadi emotional peak setelah suasana playful.

**Panjang:** 350–600 kata, nyaman dibaca 2–4 menit.

**Struktur wajib:**

1. Sapaan dengan panggilan khusus.
2. Kenapa website ini dibuat.
3. Satu momen spesifik dari setahun terakhir.
4. Hal yang dikagumi dari cara dia bertahan/bertumbuh.
5. Satu kebiasaan lucu yang membuat surat terasa personal.
6. Harapan realistis untuk umur barunya.
7. Penegasan persahabatan: tidak harus kuat terus, tetap boleh cerita.
8. Penutup singkat dan tanda tangan.

**Contoh nada:**

> aku nggak tahu semua yang kamu tahan tahun ini. tapi dari yang sempat aku lihat, kamu sudah berusaha jauh lebih banyak daripada yang sering kamu akui. jadi hari ini aku nggak cuma mau bilang “selamat ulang tahun”. aku juga mau bilang: makasih sudah bertahan sampai bisa ketemu umur baru ini.
> 

**Visual:** kertas diary putih-pink, garis tipis, pressed flower/stiker kecil, polaroid di sudut, stempel tanggal.

**Acceptance Criteria:**

- Tidak memakai typewriter untuk surat panjang.
- Font 17px mobile, line-height 1,8, max-width 64ch.
- Paragraf dapat dipilih dan disalin.
- Tanpa JS, isi surat tetap ada di DOM.
- Nol placeholder dan nol typo.
- Tidak ada kalimat romantis ambigu kecuali memang diaktifkan.

## 8.10 Mesin Gacha Pujian & Harapan

**Tujuan.** Memberi alasan untuk membuka website lagi.

**Pool minimal 30 kapsul:**

- 10 pujian.
- 10 harapan ulang tahun.
- 5 “izin kecil” seperti `hari ini boleh istirahat tanpa rasa bersalah`.
- 5 kupon digital.

**Interaksi:**

- Putar tuas → kapsul jatuh → tap kapsul → pesan terbuka.
- Tanpa pengulangan sampai pool habis, lalu reshuffle.
- Counter: `kamu sudah membuka 7 dari 30 kapsul`.
- Progress disimpan di `localStorage`, fallback in-memory.

**Acceptance Criteria:**

- Tidak ada peluang kosong atau pesan mengecewakan.
- Satu tarikan selesai < 4 detik.
- Animasi bisa dilewati dengan tap kedua.
- Modal dapat ditutup Escape dan mengembalikan fokus.

## 8.11 Kado Digital & Kupon

**Contoh kupon yang realistis:**

- `1 traktiran minuman pilihanmu`.
- `1 sesi dengerin cerita tanpa motong`.
- `1 teman jalan kalau kamu butuh keluar sebentar`.
- `1 request playlist dari aku`.
- `1 foto favoritmu aku cetakin`.

**Aturan:**

- Jangan menjanjikan sesuatu yang tidak siap ditepati.
- Setiap kupon punya masa berlaku opsional, cara menagih, dan status lokal `belum dipakai / sudah ditagih`.
- Tombol `tagih lewat WhatsApp` membuka pesan terisi otomatis, tetapi tidak mengirim otomatis.

## 8.12 Sekarang Giliran Kamu — Reply Card

**Tujuan.** Memberi ruang respons tanpa memaksa.

**Copy:**

> kalau ada satu bagian yang bikin kamu senyum, kamu boleh cerita. kalau nggak juga nggak apa-apa—hari ini tugasmu cuma dirayakan.
> 

**Input:** textarea lokal + tombol `kirim lewat WhatsApp`. Teks dimasukkan ke URL WhatsApp hanya setelah pengguna menekan tombol.

**Acceptance Criteria:**

- Tidak ada penyimpanan server.
- Nomor tujuan berasal dari environment/data terpisah.
- Tombol disabled jika input kosong.
- Ada disclaimer singkat bahwa WhatsApp akan terbuka.

## 8.13 Closing — Senang Banget Kamu Lahir

**Copy contoh:**

> kalau hari ini cuma satu kalimat yang kamu ingat dari halaman ini, biar yang ini:
**aku senang banget kamu lahir, dan aku senang bisa kenal kamu.**
> 

> semoga umur barumu lebih ramah, lebih ringan, dan punya lebih banyak hari yang bikin kamu bangga sama diri sendiri.
> 

**CTA:** `ulang pestanya dari awal` dan secondary `buka satu gacha lagi`.

**Visual:** gradient sunrise-pink, foto penutup, 10–12 confetti/petal, kue kecil dan mascot melambaikan tangan.

**Acceptance Criteria:**

- Maksimal 4 paragraf pendek.
- Tidak ada CTA komersial atau link yang memecah emosi.
- Tombol ulang scroll ke Hero, tidak reload, sehingga state game tetap ada.

---

## 9. Playground Ulang Tahun — Aturan Global

<aside>
🎮

**Filosofi:** permainan ini bukan untuk membuktikan kemampuan. Permainan adalah mesin kecil untuk menghasilkan senyum, pujian, dan kejutan.

</aside>

### 9.1 Aturan Wajib Semua Game

- Selesai dalam 20–60 detik.
- Tidak ada kalah, nyawa, penalti, layar merah, atau kata “gagal”.
- Semua hasil berakhir positif.
- Selalu ada tombol `udah dulu, lanjut pesta`.
- Bisa dimainkan satu jempol dan keyboard.
- Target sentuh minimal 48×48px; objek bergerak minimal 56×56px.
- Tidak ada leaderboard, perbandingan, atau skor yang memalukan.
- Dynamic import per game; nol JS game sebelum kartu dipilih.
- `localStorage` hanya untuk progress, dengan fallback aman.
- Reduced motion punya mekanik alternatif, bukan sekadar mematikan animasi.
- Informasi penting tidak hanya ada di dalam game.
- Game 1 — Tangkap Kado
    
    **Konsep:** selama 20 detik, kado, cupcake, bintang, dan balon turun perlahan. Setiap tap memunculkan pujian mini.
    
    **Mekanik:**
    
    - Maksimal 4 objek di layar.
    - Durasi jatuh 4–6 detik.
    - Objek yang lewat tidak dihukum.
    - Pool minimal 15 pujian tanpa pengulangan dalam satu ronde.
    
    **Hasil:** `kamu menangkap 18 kejutan. sisanya aku simpan buat hari-hari biasa.` Jika 0–4 tangkapan: `yang belum ketangkap berarti harus aku kasih langsung.`
    
    **Reduced motion:** tampilkan 8 tombol kado statis yang dapat dibuka satu per satu.
    
- Game 2 — Pecahkan Balon Harapan
    
    **Konsep:** sembilan balon pastel berisi harapan, pujian, atau mini-challenge menyenangkan.
    
    **Mekanik:**
    
    - Tap balon → pop lembut → kertas kecil turun.
    - Satu balon emas berisi pesan paling spesial.
    - Tidak ada balon kosong.
    - Setelah 5 balon, tombol `simpan sisanya buat nanti` muncul agar game tidak menahan alur.
    
    **Contoh isi:** `minum air dulu, birthday girl`, `hari ini foto yang banyak`, `semoga satu hal yang kamu takutkan jadi lebih ringan`.
    
- Game 3 — Tebak Si Birthday Girl
    
    **Konsep:** tujuh pertanyaan lucu tentang kebiasaan, makanan favorit, kalimat khas, atau momen bersama.
    
    **Aturan unik:** setiap opsi punya reaksi berbeda dan tidak ada tanda silang. Skor akhir selalu `100% teman yang memperhatikan`, tetapi pilihan tetap menghasilkan inside joke yang berbeda.
    
    **Contoh:**
    
    - `kalau lagi capek, dia paling mungkin…` dengan tiga opsi nyata.
    - `kalimat yang paling sering dia ucapkan…`.
    - `hadiah paling aman buat dia…`.
    
    **Acceptance Criteria:** 7 soal, 3 opsi per soal, 21 reaksi unik, progress dots, keyboard penuh, `aria-live` untuk reaksi.
    
- Game 4 — Mesin Gacha Mini
    
    **Konsep:** versi cepat gacha dengan kapsul berwarna yang berisi `pujian`, `harapan`, `izin istirahat`, atau `kupon`.
    
    **Mekanik:** pilih warna kapsul → putar tuas → buka. Tidak ada kelangkaan yang merugikan; label rarity bersifat lucu: `gemas`, `super gemas`, `kok bisa se-gemas ini`.
    
    **Hasil akhir:** semua rarity setara dan menyenangkan. Tidak ada pembayaran atau manipulasi probabilitas.
    
- Game 5 — Dekor Kue Kilat
    
    **Konsep:** versi 30 detik dari Cake Studio. Pilih satu frosting, dua topping, satu lilin, lalu lihat mascot menilai.
    
    **Penilaian selalu positif:** `chef-approved`, `birthday-girl certified`, atau `terlalu lucu untuk dipotong`.
    
    **Acceptance Criteria:** semua kombinasi visual tetap enak dilihat; tidak ada overlay yang menutupi tulisan; hasil bisa diteruskan ke ritual Tiup Lilin.
    
- Game 6 — Memory Match: Potongan Hari-Hari Lucu
    
    **Konsep:** 6 pasang kartu—foto, ikon kebiasaan, atau pasangan caption.
    
    **Mekanik:** tanpa timer dan tanpa hitung salah. Pasangan yang cocok membuka cerita singkat selama 3 detik. Setelah selesai: `semuanya ketemu. kayak momen-momen ini yang akhirnya ketemu tempatnya di sini.`
    
    **Performa:** aset foto game dimuat hanya ketika modal dibuka.
    
- Game 7 — Photo Booth Birthday
    
    **Konsep:** penerima dapat memilih frame, stiker, dan caption pada foto yang sudah disediakan—tanpa mengunggah ke server.
    
    **Mode aman V1:** gunakan foto dari aset website. Kamera live hanya Nice to Have dan harus meminta izin eksplisit.
    
    **Output:** PNG lokal dengan frame `birthday girl energy`, `level baru unlocked`, atau `main character today`.
    

### 9.2 Prioritas Rilis Game

| Prioritas | Game | Alasan |
| --- | --- | --- |
| P0 | Tiup Lilin, Tangkap Kado, Balon Harapan, Tebak Birthday Girl, Dekor Kue | Efek emosional tinggi, implementasi relatif ringan |
| P1 | Gacha, Memory Match | Retensi dan replayability |
| P2 | Photo Booth | Nilai shareable tinggi tetapi QA lebih besar |

---

## 10. Easter Eggs

### 10.1 Mascot yang Bisa Diajak Tos

Mascot kecil di antara section memiliki tombol transparan dengan label `tos sama mascot`. Setelah tiga kali, topi pesta terbang dan muncul pesan rahasia.

### 10.2 Tombol “Jangan Pencet Sebelum Baca Surat”

- Tekan pertama: `eh, belum waktunya 👀`.
- Kedua: `kamu memang penasaran ya.`
- Ketiga: membuka stiker digital `certified birthday troublemaker`.
- Reduced motion tidak membuat tombol kabur; hanya mengganti ekspresi.

### 10.3 Konami / Tap Logo 5 Kali

Membuka mode confetti selama 4 detik dan satu pesan: `oke, satu pesta tambahan karena kamu nemu rahasianya.`

### 10.4 Lilin Rahasia di Footer

Tap lilin kecil → satu doa paling personal yang tidak muncul di section lain.

---

## 11. Navigasi & Pacing

- Tidak ada navbar formal.
- Progress indicator 3px di atas mobile; pita vertikal tipis di desktop.
- Music toggle fixed kanan bawah, 44×44px, tidak menutupi CTA.
- Tombol `lanjut pesta` di akhir section interaktif.
- Tombol `kembali ke awal` hanya di closing.
- Deep link section tidak ditonjolkan agar cerita tetap linear.
- Modal game full-screen di mobile, center dialog di desktop.
- Back button browser tidak boleh menutup seluruh halaman; state modal dikelola dengan hati-hati.

---

## 12. Copywriting System

### 12.1 Tone

- Huruf kecil untuk microcopy dan kalimat bisik.
- Headline boleh playful dan sedikit hiperbolik.
- Body hangat, jujur, dan spesifik.
- Gunakan “aku” dan “kamu”, bukan bahasa formal.
- Panggilan khusus muncul secara strategis agar tetap terasa spesial.

### 12.1A Pemakaian Nama & Panggilan Azkia

- **Azkia** — hero title, Birthday Clock, headline Cinema, dan closing.
- **yang** — transisi setelah gate, sapaan surat, momen tiup lilin, dan satu kalimat penutup.
- **nek** — reaksi game, easter egg, dan microcopy playful.
- **Azkia Syahda Islami** — hanya di source data/PRD; jangan dipakai di OG preview.
- Jangan memakai “yang” dan “nek” dalam satu kalimat yang sama.
- Maksimal 4 kemunculan per panggilan dalam alur utama; game boleh memakai variasi tambahan dari data.
- Tone implementasi: `relationshipTone: "sweet"`.

### 12.2 Kata yang Disarankan

`dirayakan` · `tamu kehormatan` · `birthday girl` · `teman favorit` · `main character hari ini` · `umur baru` · `level baru` · `aku senang kamu ada` · `semoga lebih ramah` · `boleh istirahat`

### 12.3 Kata/Topik yang Dihindari

- “Makin tua”, “kapan nikah”, berat badan, bentuk tubuh, jodoh, standar kecantikan.
- Janji absolut dan kalimat posesif.
- Pujian generik seperti “kamu sempurna”.
- Bercanda tentang trauma, keluarga, kesehatan, nilai, pekerjaan, atau hal sensitif tanpa konteks aman.
- Emoji berlebihan di paragraf panjang.

### 12.4 Tes Kelayakan Kalimat

Sebelum rilis, setiap kalimat harus lolos:

1. Apakah hanya masuk akal untuk dia?
2. Apakah tetap nyaman jika dibaca ulang sebulan lagi?
3. Apakah tidak membuat hubungan terasa lebih romantis dari yang dimaksud?
4. Apakah tidak menuntut balasan atau rasa berutang?
5. Apakah bisa membuat senyum tanpa menjadikan dia bahan lelucon?

---

## 13. Design System

### 13.1 Arah Visual

**Kawaii Birthday Stationery** — pesta pastel kecil, kertas surat, stiker, balon, polaroid, dan mascot dengan ekspresi sederhana.

**Kata kunci:** `blush party` · `kawaii stationery` · `birthday cake` · `tiny mascots` · `soft polaroid` · `paper stickers` · `confetti` · `cream canvas` · `raspberry handwriting` · `gentle glow`

**Hindari:** neon, glitter berlebihan, 3D glossy, glassmorphism berat, emoji raksasa, gradient ungu-biru generik, animasi bouncy terus-menerus.

### 13.2 Color Tokens

| Token | Hex | Penggunaan |
| --- | --- | --- |
| `party-cream` | `#FFF9FB` | Background utama |
| `paper-white` | `#FFFFFF` | Card/polaroid |
| `blush-soft` | `#FFE4EC` | Section alternatif |
| `strawberry` | `#FF6688` | CTA utama, highlight |
| `raspberry-ink` | `#C91F5A` | Heading handwritten |
| `peach-fizz` | `#FFD8C8` | Kartu hangat |
| `butter-cake` | `#FFF1A8` | Reward, golden balloon |
| `mint-candy` | `#DDF5E8` | Variasi kartu |
| `sky-sprinkle` | `#DFF2FF` | Variasi kartu |
| `lilac-frosting` | `#EEE4FF` | Variasi kartu |
| `cocoa-text` | `#4A3038` | Teks utama |
| `mauve-muted` | `#8B717A` | Caption |
| `pink-line` | `#F2C9D5` | Border/divider |
| `success-mint` | `#2F7D5C` | Status positif dengan ikon/teks |

**Aturan warna:** strawberry maksimal 15% area viewport; pastel lain dipakai bergantian. Teks utama tetap cocoa agar kontras tidak dikorbankan demi aesthetic.

### 13.3 Typography

- **Display:** Fredoka 600 — hero, angka besar, label game.
- **Body/UI:** Plus Jakarta Sans 400/500/600 — semua teks fungsional.
- **Handwritten:** Caveat 500/600 — section title pendek, caption, tanda tangan.
- Maksimal 3 file font subset Latin, `font-display: swap`.

| Elemen | Mobile | Desktop |
| --- | --- | --- |
| Hero title | 40px / 1,08 | 64px / 1,04 |
| Section title | 30px / 1,2 | 44px / 1,15 |
| Body | 16px / 1,7 | 17px / 1,7 |
| Letter | 17px / 1,8 | 19px / 1,85 |
| Caption | 15px / 1,45 | 16px / 1,45 |
| UI kecil | 14px minimum | 14px minimum |

### 13.4 Layout

- Container maksimum 1080px.
- Lebar baca surat maksimum 64ch.
- Padding mobile `72px 20px`; desktop `112px 32px`.
- Radius card besar 24px; kecil 16px; pill hanya untuk tag/tombol compact.
- Border 1px pink-line lebih dominan daripada shadow.
- Shadow: `0 8px 24px rgba(201, 31, 90, 0.08)`.
- Mobile adalah baseline; desktop menambah ruang dan kolom, bukan mengubah urutan cerita.

### 13.5 Mascot System

Empat mascot original: **Bubu Bear**, **Mimi Bunny**, **Puff Cloud**, **Cuppy Cake**.

Setiap mascot memiliki 4 state: idle, excited, surprised, goodbye. SVG sederhana di bawah 5 KB per karakter. Maksimal 3 mascot terlihat dalam satu viewport dan semuanya `aria-hidden="true"` kecuali menjadi tombol easter egg.

### 13.6 Motion

| Motion | Durasi | Penggunaan |
| --- | --- | --- |
| Fade-up | 550–700ms | Section reveal |
| Pop | 180–240ms | Balon, hadiah, reward |
| Wiggle | 320ms, satu kali | Mascot / tombol ajakan |
| Float | 7–12s | Dekorasi background |
| Modal | 220–300ms | Game, lightbox, gacha |
| Candle out | 700ms | Tiup lilin |

Aturan: animasikan hanya `transform` dan `opacity`; maksimal 12 partikel; reveal sekali; semua punya jalur reduced-motion.

---

## 14. Functional Requirements

| ID | Requirement | Prioritas |
| --- | --- | --- |
| FR-01 | Gate dapat dibuka satu tap dan dilewati | Must |
| FR-02 | Gate menyimpan status kunjungan di sessionStorage | Must |
| FR-03 | Hero memuat nama, panggilan, dan foto dari data | Must |
| FR-04 | Clock memiliki state sebelum/saat/setelah ulang tahun | Must |
| FR-05 | Timezone dapat dikonfigurasi | Must |
| FR-06 | Galeri menggunakan seluruh 15 foto dengan alt, caption, ukuran, dan focal point | Must |
| FR-07 | Lightbox mendukung swipe, keyboard, Escape, focus trap | Should |
| FR-08 | Compliment Wall menampilkan ≥ 12 kartu + pool cadangan | Must |
| FR-09 | Playground memiliki ≥ 5 game berfungsi penuh | Must |
| FR-10 | Semua game bebas kondisi kalah dan penalti | Must |
| FR-11 | Semua game punya jalur reduced-motion | Must |
| FR-12 | Game dimuat melalui dynamic import | Must |
| FR-13 | Tangkap Kado memiliki pool ≥ 15 pujian | Must |
| FR-14 | Balon Harapan tidak pernah menghasilkan balon kosong | Must |
| FR-15 | Kuis memiliki 7 soal dan 21 reaksi unik | Must |
| FR-16 | Cake Studio mendukung kustomisasi dasar | Must |
| FR-17 | Tiup Lilin selalu dapat diselesaikan tanpa mikrofon | Must |
| FR-18 | Surat ulang tahun 350–600 kata, tetap terbaca tanpa JS | Must |
| FR-19 | Gacha memiliki ≥ 30 pesan tanpa pengulangan sampai habis | Must |
| FR-20 | Progress gacha dan game tersimpan aman secara lokal | Should |
| FR-21 | Kupon dapat ditagih melalui WhatsApp tanpa auto-send | Should |
| FR-22 | Reply Card tidak mengirim atau menyimpan sebelum aksi eksplisit | Must |
| FR-23 | Music toggle default pause dan persisten per sesi | Should |
| FR-24 | Closing dapat scroll kembali ke Hero tanpa reload | Must |
| FR-25 | Seluruh konten berasal dari folder data | Must |
| FR-26 | Fallback media dan Error Boundary tersedia | Must |
| FR-27 | Meta noindex/nofollow dan robots.txt aktif | Must |
| FR-28 | Foto Booth menghasilkan PNG lokal | Could |
| FR-29 | Mode ulang tahun aktif otomatis berdasarkan tanggal | Must |
| FR-30 | Copy mengikuti mode `sweet`: mesra tetapi tidak melampaui konteks pertemanan | Must |
| FR-31 | `video-1.webm` dan `video-2.webm` tampil di Birthday Cinema | Must |
| FR-32 | Memutar satu video otomatis menjeda video lain dan background music | Must |
| FR-33 | Kedua video memiliki poster, fallback MP4/H.264, caption, dan error fallback | Must |

---

## 15. Non-Functional Requirements

### 15.1 Performance Budget

| Metrik | Target |
| --- | --- |
| LCP | < 2,0 detik di 4G |
| CLS | < 0,05 |
| INP | < 200ms |
| Initial JS | < 150 KB gzipped |
| Initial transfer | < 700 KB |
| JS seluruh game | < 35 KB gzipped, dynamic |
| Hero image | < 180 KB |
| Foto lain | < 160 KB per file, lazy |
| 2 video | Tidak masuk initial load; target ≤ 8 MB per file setelah kompresi, `preload="metadata"`/`none` |
| Font | < 130 KB total |
| Lighthouse | Performance ≥ 90; Accessibility ≥ 95 |

### 15.2 Accessibility

- Kontras WCAG AA: 4,5:1 teks normal, 3:1 teks besar dan boundary UI.
- Semua tombol dapat diakses keyboard dengan focus ring nyata.
- Target interaktif minimal 44×44px; target game minimal 48×48px.
- Modal memiliki `role="dialog"`, `aria-modal`, Escape, focus trap, dan restore focus.
- Hasil game diumumkan dengan `aria-live="polite"`.
- Tidak ada informasi yang hanya disampaikan lewat warna.
- Reduced motion untuk semua animasi dan mekanik game.
- Audio tidak autoplay dan caption/makna tidak bergantung audio.
- Heading hierarchy satu `h1`, lalu `h2` per section.

### 15.3 Reliability

- `localStorage` dan `sessionStorage` dibungkus helper aman.
- Error satu game tidak menjatuhkan halaman.
- Foto gagal → frame tetap ada + caption + microcopy.
- Audio gagal → toggle disabled, halaman tetap berjalan.
- Tanggal invalid → clock disembunyikan.
- `<noscript>` menampilkan ucapan utama dan paragraf pertama surat.

### 15.4 Privacy

- `noindex,nofollow` di metadata, header, dan `robots.txt`.
- Repo private; aset pribadi tidak berada di repository publik.
- OG image memakai ilustrasi kue/mascot, bukan foto pribadi.
- Judul OG netral: `Ada pesta kecil untuk kamu`.
- Tidak mencantumkan nama lengkap, sekolah, alamat, nomor pribadi, atau tahun lahir tanpa persetujuan.
- Mikrofon/kamera bersifat opt-in, hanya lokal, dan bukan syarat.
- Tidak ada analytics pihak ketiga pada V1.

---

## 16. Technical Requirements

### 16.1 Stack

| Layer | Pilihan | Alasan |
| --- | --- | --- |
| Framework | Next.js 16 App Router | Static-first, image optimization, metadata |
| Language | TypeScript strict | Nol `any`, data contract jelas |
| Styling | Tailwind CSS v4 + CSS variables | Token konsisten, responsive cepat |
| Motion | Motion + CSS keyframes | Reveal deklaratif; partikel sederhana via CSS |
| Icon | Lucide React + SVG mascot sendiri | Ringan dan mudah diakses |
| Image | `next/image` | Responsive, lazy, CLS aman |
| Deploy | Netlify | Sesuai referensi dan mudah dibagikan |

### 16.2 Struktur Folder

```
Rahman_Cust/
├─ public/
│  ├─ images/
│  │  ├─ image-1.webp … image-15.webp
│  │  ├─ video-1-poster.webp        ← generated
│  │  └─ video-2-poster.webp        ← generated
│  ├─ video/
│  │  ├─ video-1.webm
│  │  ├─ video-2.webm
│  │  ├─ video-1.mp4                ← fallback iOS
│  │  └─ video-2.mp4                ← fallback iOS
│  ├─ audio/
│  ├─ textures/
│  ├─ og-birthday.png
│  └─ robots.txt
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx
│  │  ├─ page.tsx
│  │  └─ globals.css
│  ├─ components/
│  │  ├─ sections/
│  │  │  ├─ PartyDoor.tsx
│  │  │  ├─ BirthdayHero.tsx
│  │  │  ├─ BirthdayClock.tsx
│  │  │  ├─ BirthdaySpotlight.tsx
│  │  │  ├─ Scrapbook.tsx
│  │  │  ├─ BirthdayCinema.tsx
│  │  │  ├─ Playground.tsx
│  │  │  ├─ ComplimentWall.tsx
│  │  │  ├─ CakeStudio.tsx
│  │  │  ├─ BirthdayLetter.tsx
│  │  │  ├─ GachaMachine.tsx
│  │  │  ├─ DigitalGift.tsx
│  │  │  ├─ ReplyCard.tsx
│  │  │  └─ BirthdayClosing.tsx
│  │  ├─ games/
│  │  │  ├─ CatchGifts.tsx
│  │  │  ├─ PopBalloons.tsx
│  │  │  ├─ BirthdayQuiz.tsx
│  │  │  ├─ QuickCake.tsx
│  │  │  ├─ MemoryMatch.tsx
│  │  │  └─ PhotoBooth.tsx
│  │  ├─ ui/
│  │  │  ├─ Button.tsx
│  │  │  ├─ PartyCard.tsx
│  │  │  ├─ Modal.tsx
│  │  │  ├─ Lightbox.tsx
│  │  │  ├─ MusicToggle.tsx
│  │  │  └─ ScrollProgress.tsx
│  │  └─ mascots/
│  │     ├─ BubuBear.tsx
│  │     ├─ MimiBunny.tsx
│  │     ├─ PuffCloud.tsx
│  │     └─ CuppyCake.tsx
│  ├─ data/
│  │  ├─ profile.ts
│  │  ├─ photos.ts
│  │  ├─ videos.ts
│  │  ├─ compliments.ts
│  │  ├─ letter.ts
│  │  ├─ wishes.ts
│  │  ├─ quiz.ts
│  │  ├─ gacha.ts
│  │  ├─ coupons.ts
│  │  └─ games.ts
│  ├─ hooks/
│  │  ├─ useBirthdayState.ts
│  │  ├─ useSafeStorage.ts
│  │  ├─ useShuffledPool.ts
│  │  ├─ useReducedMotion.ts
│  │  └─ useFocusTrap.ts
│  ├─ lib/
│  │  ├─ birthday.ts
│  │  ├─ format.ts
│  │  ├─ storage.ts
│  │  └─ whatsapp.ts
│  └─ types/
│     └─ birthday.ts
├─ netlify.toml
├─ next.config.ts
├─ tsconfig.json
└─ README.md
```

### 16.3 Data Model Inti

```tsx
export type RelationshipTone = "friendship" | "sweet" | "romantic"

export type BirthdayProfile = {
  readonly fullName: string
  readonly displayName: string
  readonly nicknames: readonly string[]
  readonly senderName: string
  readonly birthDate: string
  readonly targetBirthday: string
  readonly firstMetDate: string
  readonly timeZone: string
  readonly relationshipTone: RelationshipTone
  readonly showAge: boolean
  readonly showBirthYear: boolean
  readonly whatsappNumber?: string
}

export const profile: BirthdayProfile = {
  fullName: "Azkia Syahda Islami",
  displayName: "Azkia",
  nicknames: ["yang", "nek"],
  senderName: "Fakhri",
  birthDate: "2007-09-08",
  targetBirthday: "2026-09-08",
  firstMetDate: "2025-09-09",
  timeZone: "Asia/Jakarta",
  relationshipTone: "sweet",
  showAge: true,
  showBirthYear: false,
}

export type PhotoMemory = {
  readonly id: string
  readonly src: string
  readonly alt: string
  readonly caption: string
  readonly width: number
  readonly height: number
  readonly focus?: string
  readonly role: "hero" | "featured" | "scrapbook" | "spotlight" | "letter" | "closing"
}

export type VideoMemory = {
  readonly id: "video-1" | "video-2"
  readonly webmSrc: string
  readonly mp4Src: string
  readonly poster: string
  readonly title: string
  readonly caption: string
  readonly orientation: "landscape" | "portrait"
}

export type Compliment = {
  readonly id: string
  readonly category: "character" | "habit" | "growth"
  readonly text: string
  readonly tone: "pink" | "peach" | "mint" | "sky" | "lilac"
}

export type QuizOption = {
  readonly id: string
  readonly text: string
  readonly reaction: string
}

export type QuizQuestion = {
  readonly id: string
  readonly prompt: string
  readonly options: readonly QuizOption[]
}

export type GachaReward = {
  readonly id: string
  readonly kind: "compliment" | "wish" | "permission" | "coupon"
  readonly text: string
  readonly rarityLabel: "gemas" | "super gemas" | "kok bisa se-gemas ini"
}

export type Coupon = {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly redeemMessage: string
  readonly expiresAt?: string
}
```

### 16.4 Birthday State

```tsx
export type BirthdayState = "before" | "today" | "after" | "invalid"

export type BirthdayTiming = {
  readonly state: BirthdayState
  readonly ageOnTargetDate: number | null
  readonly daysUntilBirthday: number
  readonly daysSinceFirstMet: number
  readonly daysUntilMeetAnniversary: number
}

export function getBirthdayTiming(
  profile: BirthdayProfile,
  now = new Date(),
): BirthdayTiming {
  // Normalisasikan now, targetBirthday, birthDate, dan firstMetDate
  // ke profile.timeZone sebelum menghitung selisih hari kalender.
  // Pada 2026-09-08 hasil yang diharapkan:
  // ageOnTargetDate = 19, daysSinceFirstMet = 364,
  // daysUntilMeetAnniversary = 1.
  return {
    state: "today",
    ageOnTargetDate: 19,
    daysUntilBirthday: 0,
    daysSinceFirstMet: 364,
    daysUntilMeetAnniversary: 1,
  }
}
```

---

## 17. Data & Content yang Harus Disiapkan

### 17.1 Wajib

- [x]  Nama lengkap: **Azkia Syahda Islami**.
- [x]  Nama tampil: **Azkia**.
- [x]  Panggilan personal: **yang** dan **nek**.
- [x]  Tanggal lahir: **08 September 2007**.
- [x]  Target ulang tahun awal: **08 September 2026 — usia 19**.
- [x]  Awal bertemu: **09 September 2025**.
- [x]  Timezone: **Asia/Jakarta**.
- [x]  15 foto tersedia: `image-1.webp`–`image-15.webp`.
- [x]  2 video tersedia: `video-1.webm` dan `video-2.webm`.
- [ ]  Konfirmasi izin pemakaian semua foto/video untuk link privat.
- [ ]  Tulis alt text dan caption spesifik untuk seluruh 15 foto.
- [ ]  Tonton kedua video penuh; tentukan judul, caption, dan frame poster terbaik.
- [ ]  Ekspor fallback `video-1.mp4` dan `video-2.mp4` untuk iOS.
- [ ]  Tulis 15 pujian: karakter, kebiasaan, dan pertumbuhan.
- [ ]  Tulis surat 350–600 kata dengan hook 364 hari sejak bertemu.
- [ ]  Tulis 30 isi gacha dan 20 harapan ulang tahun.
- [ ]  Tulis 7 soal kuis + 21 reaksi unik.
- [ ]  Tulis 15 pujian untuk Tangkap Kado dan 9 isi Balon Harapan.
- [ ]  Siapkan 3–6 kupon realistis.
- [ ]  Tulis satu pesan paling personal untuk easter egg.
- [ ]  Siapkan lagu instrumental opsional < 3 MB.
- [ ]  Buat OG image ilustratif tanpa nama lengkap atau foto pribadi.

### 17.2 Personalization Prompts

Gunakan pertanyaan ini sebelum menulis konten:

- Kalimat apa yang paling sering dia ucapkan?
- Hal kecil apa yang dia lakukan saat gugup, senang, atau capek?
- Momen apa tahun ini yang paling menunjukkan kekuatannya?
- Apa makanan/minuman favorit yang aman dijadikan bahan kuis?
- Inside joke mana yang tetap lucu jika dibaca beberapa bulan lagi?
- Hal apa yang ingin dia capai tanpa perlu diberi tekanan?
- Bentuk dukungan apa yang paling ia hargai?
- Bagian apa dari persahabatan ini yang paling kamu syukuri?

### 17.3 Content Lint Sebelum Build

Build harus gagal atau menampilkan warning jika masih ada:

- `[Nama]`, `[Panggilan]`, `[Tanggal]`, `TODO`, atau `lorem ipsum`.
- Caption kosong.
- Alt text generik seperti `foto 1`.
- Pool game di bawah minimum.
- Copy yang melampaui batas pada `relationshipTone: "sweet"`.

---

## 18. Metadata, Privasi, dan Sharing

```tsx
export const metadata = {
  title: "Ada pesta kecil untuk kamu",
  description: "Satu ruang kecil untuk merayakan hari ini.",
  robots: { index: false, follow: false, nocache: true },
  openGraph: {
    title: "Ada pesta kecil untuk kamu",
    description: "Tamu kehormatannya cuma satu.",
    images: ["/og-birthday.png"],
  },
}
```

```
# public/robots.txt
User-agent: *
Disallow: /
```

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Robots-Tag = "noindex, nofollow"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "no-referrer"
    Permissions-Policy = "camera=(), microphone=(self)"
```

**Catatan WhatsApp:** uji preview sebelum dikirim. OG image tidak boleh membocorkan foto, nama lengkap, atau umur.

---

## 19. Mobile Wireframe Tekstual

```
┌─────────────────────────┐
│ GATE · 100dvh           │
│  🐻      [pintu]   ☁️   │
│ sst… ada pesta kecil    │
│ tamu kehormatannya kamu │
│   [ masuk, aku siap ]   │
│               lewati →  │
└─────────────────────────┘
            ↓
┌─────────────────────────┐
│ HARI INI KAMU UTAMANYA  │
│ selamat ulang tahun,    │
│ [Panggilan]!            │
│ [hero polaroid 4:5]     │
│ [ mulai pestanya ]      │
└─────────────────────────┘
            ↓
┌─────────────────────────┐
│ BIRTHDAY MODE AKTIF     │
│   level baru unlocked   │
│   [countdown / today]   │
└─────────────────────────┘
            ↓
┌─────────────────────────┐
│ 15 POTONGAN CERITA      │
│ [featured polaroid]     │
│ [grid 2 kolom]          │
│ [carousel semua foto]   │
└─────────────────────────┘
            ↓
┌─────────────────────────┐
│ BIRTHDAY CINEMA         │
│ [video-1 · landscape]   │
│ [video-2 · portrait]    │
│ geser / pilih untuk play│
└─────────────────────────┘
            ↓
┌─────────────────────────┐
│ PLAYGROUND ULANG TAHUN  │
│ [Tangkap Kado]          │
│ [Pecah Balon]           │
│ [Tebak Kamu]            │
│ [Dekor Kue]             │
│ [Gacha]                 │
│ [ lanjut pesta ]        │
└─────────────────────────┘
            ↓
┌─────────────────────────┐
│ HAL YANG BIKIN KAMU     │
│ KEREN                   │
│ [sticky compliment x12] │
└─────────────────────────┘
            ↓
┌─────────────────────────┐
│ CAKE STUDIO             │
│ [preview kue]           │
│ [frosting][topping]     │
│ [ tiup lilinnya ]       │
└─────────────────────────┘
            ↓
┌─────────────────────────┐
│ SURAT UNTUK UMUR BARUMU │
│ [paper card panjang]    │
│ [polaroid kecil]        │
└─────────────────────────┘
            ↓
┌─────────────────────────┐
│ MESIN GACHA             │
│ [kapsul][tuas]          │
│ sudah buka 7/30         │
└─────────────────────────┘
            ↓
┌─────────────────────────┐
│ KADO DIGITAL            │
│ [kupon traktir]         │
│ [tagih lewat WhatsApp]  │
└─────────────────────────┘
            ↓
┌─────────────────────────┐
│ SENANG KAMU LAHIR       │
│ [foto penutup]          │
│ satu kalimat utama      │
│ [ ulang pestanya ]      │
└─────────────────────────┘
```

---

## 20. QA Test Plan

### 20.1 Device & Browser

- iPhone Safari fisik — kritis.
- Android Chrome kelas menengah — kritis.
- 320px, 360px, 390×844, 430px.
- iPad Safari.
- Desktop Chrome/Edge 1440px.

### 20.2 Functional Scenarios

| # | Skenario | Ekspektasi |
| --- | --- | --- |
| 1 | Buka pertama kali | Gate tampil, body terkunci |
| 2 | Tap masuk | Pintu terbuka, fokus pindah ke Hero |
| 3 | Reload sesi sama | Gate dapat dilewati/tidak memaksa ulang |
| 4 | Birthday besok | Countdown benar sesuai timezone |
| 5 | Tepat hari H | Birthday Mode aktif satu kali |
| 6 | Tanggal invalid | Clock tersembunyi, tidak crash |
| 7 | Tap foto | Lightbox terbuka dan fokus terperangkap |
| 8 | Swipe foto | Foto dan caption berpindah |
| 9 | Foto gagal load | Placeholder + caption tetap ada |
| 10 | Main Tangkap Kado tanpa tap | Hasil tetap positif |
| 11 | Buka semua balon | Semua berisi pesan, golden balloon muncul |
| 12 | Pilih opsi kuis acak | Tidak ada tanda salah; reaksi unik |
| 13 | Dekor kue kombinasi ekstrem | Visual tetap rapi dan terbaca |
| 14 | Tiup lilin tanpa mikrofon | Long-press menyelesaikan ritual |
| 15 | Tolak mikrofon | Fallback tetap tersedia |
| 16 | Tarik gacha 30 kali | Tidak ada pengulangan sebelum habis |
| 17 | Blokir localStorage | Fitur tetap jalan in-memory |
| 18 | Tagih kupon | WhatsApp terbuka dengan draft, tidak auto-send |
| 19 | Aktifkan reduced motion | Semua game punya mode alternatif |
| 20 | Navigasi keyboard | Semua kontrol bisa dicapai dan fokus terlihat |
| 21 | Escape dari modal | Modal tutup, fokus kembali |
| 22 | Audio gagal | Toggle disabled, konten normal |
| 23 | Matikan JavaScript | Hero + surat inti tetap terbaca |
| 24 | Tap ulang pesta | Scroll ke Hero, state game tetap |
| 25 | Cek Network sebelum game | Bundle game belum dimuat |
| 26 | Cek Network sebelum Birthday Cinema terlihat | Payload penuh dua video belum diunduh |
| 27 | Putar video-1 lalu video-2 | Video pertama dan background music otomatis pause |
| 28 | Uji kedua video di iPhone Safari | MP4 fallback, poster, controls, dan caption bekerja |
| 29 | Simulasikan video gagal | Poster, caption, dan pesan fallback tetap tampil |

### 20.3 Visual Checklist

- [ ]  Nol horizontal overflow di 320–430px.
- [ ]  Tidak ada teks menabrak stiker, mascot, atau polaroid.
- [ ]  Jarak antar card minimal 12–16px.
- [ ]  Strawberry accent tidak mendominasi layar.
- [ ]  Wajah aman di semua crop.
- [ ]  Mascot tidak menutupi CTA.
- [ ]  Kartu game punya tinggi konsisten.
- [ ]  Confetti tidak membuat layar terlihat kotor.
- [ ]  Typography handwritten tidak dipakai untuk body panjang.
- [ ]  Setiap viewport punya satu focal point jelas.

### 20.4 Content Checklist

- [ ]  Nama dan panggilan benar di seluruh halaman.
- [ ]  Tidak ada placeholder.
- [ ]  Semua caption spesifik.
- [ ]  Surat dibaca ulang minimal tiga kali.
- [ ]  Tidak ada lelucon sensitif.
- [ ]  Panggilan “yang” dan “nek” digunakan konsisten tanpa membuat tone melampaui mode `sweet`.
- [ ]  Semua kupon benar-benar siap ditepati.
- [ ]  Nomor WhatsApp dan draft pesan benar.
- [ ]  Satu orang tepercaya melakukan proofread.

---

## 21. Milestone & Timeline

### Phase 0 — Content & Asset Prep (0,5–1 hari)

- Tentukan tone hubungan.
- Isi profile, foto, caption, pujian, kuis, gacha, kupon, dan surat.
- Kompres semua foto.
- Pilih lagu dan buat OG image ilustratif.

**Deliverable:** seluruh `data/` final; nol placeholder.

### Phase 1 — Foundation (0,5–1 hari)

- Setup Next.js, TS strict, Tailwind.
- Definisikan token, font, base components.
- Bangun mascot SVG dan party shell.
- Setup storage, reduced motion, error boundary.

### Phase 2 — Core Story (1–1,5 hari)

- Gate, Hero, Clock, Spotlight, Scrapbook 15 foto, Birthday Cinema 2 video, dan Compliment Wall.
- Lightbox, video coordination, poster generation, MP4 fallback, dan Music Toggle.

### Phase 3 — Games & Ritual (1,5–2 hari)

- Tangkap Kado, Balon Harapan, Quiz, Quick Cake, Gacha.
- Cake Studio dan Tiup Lilin.
- Uji keyboard dan reduced motion sejak awal.

### Phase 4 — Emotional Finish (0,5–1 hari)

- Letter, Gift/Coupon, Reply, Closing, easter eggs.
- Finalisasi copy dan proofread.

### Phase 5 — Polish & Release (1 hari)

- QA HP fisik.
- Lighthouse dan bundle audit.
- Privacy headers, noindex, OG preview.
- Deploy Netlify dan uji dari WhatsApp.

| Versi | Estimasi |
| --- | --- |
| MVP fokus | 3–4 hari |
| Lengkap + 7 game | 5–6 hari |
| Sangat polished + Photo Booth | 7–8 hari |

---

## 22. Risiko & Mitigasi

| Risiko | Dampak | Mitigasi |
| --- | --- | --- |
| Terasa seperti confess | Hubungan menjadi canggung | Default `sweet` tone, content lint, dan proofread orang ketiga |
| Copy generik | Website terasa template | Wajib inside joke, momen nyata, dan caption spesifik |
| Terlalu banyak game | Surat tidak dibaca | Maksimal dua game berturut-turut; CTA lanjut selalu terlihat |
| Visual terlalu pink | Terasa melelahkan/childish | Gunakan cream dominan dan 4 pastel pendamping |
| Animasi lag | Pesta terasa murah | Transform/opacity, batas 12 partikel, HP mid-range QA |
| Mikrofon ditolak | Tiup lilin macet | Long-press menjadi jalur utama |
| Foto bocor | Masalah privasi | Repo private, noindex, OG ilustratif |
| Storage diblokir | Gacha/game error | Wrapper aman + fallback in-memory |
| Deadline terlewat | Momen ulang tahun hilang | Bangun P0 dulu; freeze fitur H-2 |
| Kupon tidak realistis | Hadiah terasa kosong | Hanya masukkan hal yang siap ditepati |

---

## 23. Prioritas Pembangunan

### Bangun Pertama

1. Gate.
2. Hero.
3. Birthday Clock.
4. Scrapbook.
5. Letter.
6. Cake + Tiup Lilin.
7. Closing.

### Bangun Kedua

1. Compliment Wall.
2. Tangkap Kado.
3. Balon Harapan.
4. Birthday Quiz.
5. Gacha.
6. Kupon WhatsApp.

### Jika Ada Waktu

1. Memory Match.
2. Photo Booth.
3. Easter eggs tambahan.
4. Shareable cake PNG.
5. Birthday week mode.

---

## 24. Acceptance Criteria Global

### Fungsional

- [ ]  Gate bekerja dan dapat dilewati.
- [ ]  Profil Azkia, panggilan, tanggal lahir, dan tanggal bertemu berasal dari data.
- [ ]  Birthday Mode aktif pada 08 September 2026 dan menampilkan level 19.
- [ ]  Hook 364 hari sejak pertemuan pertama dihitung benar.
- [ ]  Seluruh 15 foto punya alt, caption, ukuran, dan focal point.
- [ ]  Kedua video tampil, playable, dan tidak masuk initial load.
- [ ]  Minimal 12 pujian tampil.
- [ ]  Minimal 5 game berfungsi penuh.
- [ ]  Tidak ada kondisi kalah atau kata bernuansa gagal.
- [ ]  Cake Studio dan Tiup Lilin dapat diselesaikan tanpa izin perangkat.
- [ ]  Surat 350–600 kata, personal, nol typo.
- [ ]  Gacha memiliki ≥ 30 pesan tanpa pengulangan awal.
- [ ]  Kupon dan Reply Card tidak mengirim otomatis.
- [ ]  Closing dapat kembali ke awal tanpa reload.

### Kualitas

- [ ]  Responsif 320–1440px, nol overflow.
- [ ]  Performance ≥ 90; Accessibility ≥ 95.
- [ ]  LCP < 2,0s; CLS < 0,05.
- [ ]  Reduced motion diuji di seluruh game.
- [ ]  Nol error console, nol warning TypeScript, nol `any`.
- [ ]  Uji iPhone Safari dan Android Chrome fisik.

### Privasi

- [ ]  `noindex,nofollow` aktif di meta, header, dan robots.txt.
- [ ]  OG image bukan foto pribadi.
- [ ]  Repo private.
- [ ]  Mikrofon/kamera tidak diminta otomatis.
- [ ]  Tidak ada data sensitif atau analytics invasif.

### Konten

- [ ]  Semua placeholder sudah diganti.
- [ ]  Setiap caption spesifik untuk penerima.
- [ ]  Tidak ada lelucon sensitif.
- [ ]  Panggilan “yang” dan “nek” tetap terasa mesra tetapi sesuai mode `sweet`.
- [ ]  Semua kupon realistis.
- [ ]  Preview WhatsApp sudah aman.

---

## 25. Definition of Done

Website siap dikirim jika:

1. Seluruh acceptance criteria P0 terpenuhi.
2. Pembuat sudah membuka halaman dari awal sampai akhir di HP fisik.
3. Minimal lima game sudah sengaja dimainkan “seburuk mungkin” dan tidak ada jalur yang terasa menghukum.
4. Surat sudah dibaca ulang tiga kali dan diproofread satu orang tepercaya.
5. Tidak ada kalimat yang terasa template atau dapat dikirim ke siapa saja tanpa perubahan.
6. Tone `sweet` terasa mesra dan personal untuk Azkia tanpa menjadi confess yang tidak disengaja.
7. Seluruh 15 foto dan kedua video sudah digunakan, diberi konteks, serta lolos visual/media QA.
8. Kue, lilin, hadiah, dan penutup tetap bermakna tanpa audio.
9. OG preview WhatsApp aman dan tidak membocorkan foto pribadi.
10. Build production lolos, Lighthouse sesuai target, dan bundle game tidak masuk initial load.
11. Link dikirim dengan satu kalimat pengantar yang ringan, misalnya: *“aku bikin pesta kecil yang muat di HP. bukanya pas kamu punya waktu santai ya 🎂”*.

---

## 26. Rekomendasi Akhir

Prioritas keberhasilan website ini bukan jumlah confetti atau banyaknya mini-game. Urutannya adalah:

1. **Detail yang hanya dia kenali.** Satu inside joke yang tepat lebih kuat daripada dua puluh pujian generik.
2. **Ritual ulang tahun yang bisa disentuh.** Merakit kue dan meniup lilin membuat website terasa seperti acara, bukan artikel.
3. **Game yang memberi hadiah, bukan penilaian.** Semua interaksi harus menambah senyum.
4. **Surat yang hangat dan tidak ambigu.** Dia harus merasa dihargai sebagai teman, bukan dibebani membaca maksud tersembunyi.
5. **Visual lucu yang tetap rapi.** Cream dan ruang kosong menjaga pastel, mascot, stiker, dan polaroid tetap aesthetic.

<aside>
🎈

Metrik paling penting: setelah selesai, dia berkata atau berpikir **“aku benar-benar dirayakan hari ini”**—lalu membuka satu gacha lagi hanya karena masih ingin tinggal sebentar di pesta kecil ini.

</aside>