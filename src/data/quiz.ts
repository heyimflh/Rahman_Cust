export interface QuizOption {
  text: string;
  reaction: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export const quizData: QuizQuestion[] = [
  {
    id: "q1",
    question: "Bagian dari pesta kecil ini yang paling cocok sama Azkia?",
    options: [
      { text: "Banyak foto-foto lucu", reaction: "Tentu saja, karena fotonya memang harus banyak!" },
      { text: "Kuenya yang manis", reaction: "Semanis orangnya yang lagi ulang tahun." },
      { text: "Banyak kejutan", reaction: "Kejutan kecil buat yang suka bikin orang tersenyum." }
    ]
  },
  {
    id: "q2",
    question: "Kalau harus pilih satu, mood ulang tahun hari ini kayaknya...",
    options: [
      { text: "Santai tapi happy", reaction: "Setuju, yang penting enjoy aja hari ini." },
      { text: "Banyak senyum", reaction: "Jangan lupa senyumnya difoto juga." },
      { text: "Pengen makan enak", reaction: "Wajib! Hari ini harus makan yang enak-enak." }
    ]
  },
  {
    id: "q3",
    question: "Kue pilihan birthday girl paling cocok dihias dengan...",
    options: [
      { text: "Strawberry yang banyak", reaction: "Fresh dan manis, pilihan bagus!" },
      { text: "Cokelat leleh", reaction: "Classic dan nggak pernah salah." },
      { text: "Bintang-bintang lucu", reaction: "Biar kuenya ikutan bersinar kayak kamu." }
    ]
  },
  {
    id: "q4",
    question: "Di antara semua memori sejauh ini, yang paling kerasa...",
    options: [
      { text: "Pas ketawa bareng", reaction: "Karena ketawamu itu nular." },
      { text: "Pas lagi random", reaction: "Momen random yang nggak bisa diulang." },
      { text: "Pas lagi jalan santai", reaction: "Jalan santai yang obrolannya panjang." }
    ]
  },
  {
    id: "q5",
    question: "Kado paling pas buat hari ini itu...",
    options: [
      { text: "Waktu buat istirahat", reaction: "Silakan istirahat, kamu berhak banget." },
      { text: "Sesuatu yang lucu", reaction: "Kayak website ini? Hehehe." },
      { text: "Quality time", reaction: "Waktu yang dihabiskan bareng itu emang paling berharga." }
    ]
  },
  {
    id: "q6",
    question: "Gaya foto yang paling 'Azkia banget'...",
    options: [
      { text: "Senyum tipis tapi manis", reaction: "Muka santai tapi tetap on point." },
      { text: "Muka konyol random", reaction: "Hahaha, ini sih yang paling bikin kangen." },
      { text: "Peace sign (V)", reaction: "Classic peace sign nggak boleh ketinggalan." }
    ]
  },
  {
    id: "q7",
    question: "Harapan paling penting buat tahun ini...",
    options: [
      { text: "Lebih banyak senyum", reaction: "Amin. Semoga senyumnya nggak luntur." },
      { text: "Lebih sehat dan bahagia", reaction: "Doa terbaik yang selalu dipanjatkan." },
      { text: "Semua hal baik datang", reaction: "Semoga yang baik-baik tahu jalan pulang ke kamu." }
    ]
  }
];
