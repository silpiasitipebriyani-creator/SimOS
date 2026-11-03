import { QuizQuestion } from "../types";

export const CPU_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: "CPU Scheduling",
    difficulty: "mudah",
    type: "pg",
    question:
      "Fenomena apa yang terjadi pada algoritma FCFS ketika proses dengan burst time sangat panjang tiba lebih dulu dan menahan banyak proses pendek di belakangnya?",
    options: [
      "Starvation Effect",
      "Convoy Effect (Efek Konvoi)",
      "Aging Phenomenon",
      "Priority Inversion",
    ],
    correctAnswer: 1,
    explanation:
      "Convoy Effect terjadi pada FCFS ketika satu proses CPU-bound besar memonopoli CPU, menyebabkan proses I/O-bound atau berdurasi pendek mengantre lama.",
  },
  {
    id: 2,
    category: "CPU Scheduling",
    difficulty: "mudah",
    type: "pg",
    question:
      "Struktur data apa yang paling dasar dan lazim digunakan untuk mengelola antrean proses pada algoritma First-Come, First-Served (FCFS)?",
    options: [
      "FIFO Queue (First-In, First-Out)",
      "LIFO Stack",
      "Binary Search Tree",
      "Priority Queue",
    ],
    correctAnswer: 0,
    explanation:
      "FCFS menggunakan antrean FIFO di mana proses yang tiba lebih awal dieksekusi terlebih dahulu dari kepala antrean.",
  },
  {
    id: 3,
    category: "CPU Scheduling",
    difficulty: "mudah",
    type: "pg",
    question:
      "Jika Time Quantum pada algoritma Round Robin (RR) diset bernilai sangat besar (mendekati tak hingga), maka perilaku algoritma tersebut akan identik dengan:",
    options: [
      "Shortest Remaining Time First (SRTF)",
      "First-Come, First-Served (FCFS)",
      "Priority Scheduling Preemptive",
      "Multilevel Feedback Queue",
    ],
    correctAnswer: 1,
    explanation:
      "Jika quantum waktu melebihi burst time semua proses, setiap proses dieksekusi sampai selesai dalam satu giliran seperti FCFS.",
  },
  {
    id: 4,
    category: "CPU Scheduling",
    difficulty: "mudah",
    type: "pg",
    question:
      "Perbedaan utama antara penjadwalan Preemptive dan Non-Preemptive adalah:",
    options: [
      "Preemptive tidak menggunakan antrean",
      "Pada Preemptive, sistem operasi dapat mengambil alih CPU secara paksa dari proses yang berjalan",
      "Non-Preemptive hanya untuk komputer multicore",
      "Preemptive tidak memerlukan context switch",
    ],
    correctAnswer: 1,
    explanation:
      "Penjadwalan Preemptive mengizinkan OS menghentikan proses di tengah eksekusi, sedangkan Non-Preemptive menunggu proses selesai sukarela atau meminta I/O.",
  },
  {
    id: 5,
    category: "CPU Scheduling",
    difficulty: "mudah",
    type: "pg",
    question: 'Metrik "CPU Utilization" mengukur:',
    options: [
      "Persentase waktu CPU bekerja aktif mengeksekusi instruksi pengguna/sistem",
      "Jumlah proses yang selesai per satuan waktu",
      "Waktu tunggu rata-rata di ready queue",
      "Selang waktu dari arrival time hingga completion time",
    ],
    correctAnswer: 0,
    explanation:
      "CPU Utilization adalah persentase efisiensi penggunaan CPU agar tetap sibuk mengeksekusi proses, idealnya berkisar antara 40% hingga 90%.",
  },
  {
    id: 6,
    category: "CPU Scheduling",
    difficulty: "sedang",
    type: "pg",
    question:
      "Manakah pernyataan yang BENAR mengenai algoritma Shortest Job First (SJF)?",
    options: [
      "Selalu menjamin tidak akan pernah terjadi starvation pada proses panjang",
      "Secara matematis optimal dalam menghasilkan rata-rata waktu tunggu minimum",
      "Mudah diimplementasikan secara sempurna pada sistem operasi nyata",
      "Merupakan algoritma preemptive murni yang menggunakan time quantum",
    ],
    correctAnswer: 1,
    explanation:
      "SJF terbukti matematis meminimalkan rata-rata waktu tunggu, namun sulit memprediksi burst time secara presisi di dunia nyata.",
  },
  {
    id: 7,
    category: "CPU Scheduling",
    difficulty: "sedang",
    type: "pg",
    question:
      "Apa konsekuensi buruk jika Time Quantum pada Round Robin diset terlalu kecil (misalnya 1 mikrodetik)?",
    options: [
      "Terjadi kebocoran memori (memory leak)",
      "Overhead context switch menjadi sangat tinggi sehingga efisiensi CPU anjlok",
      "Proses pendek akan mengalami starvation",
      "Sistem otomatis berubah menjadi FCFS",
    ],
    correctAnswer: 1,
    explanation:
      "Context switch membutuhkan waktu CPU. Jika quantum terlalu kecil, CPU habis waktu hanya untuk berpindah antar-proses.",
  },
  {
    id: 8,
    category: "CPU Scheduling",
    difficulty: "sedang",
    type: "pg",
    question:
      "Teknik apa yang umum digunakan oleh sistem operasi untuk mengatasi masalah Starvation pada penjadwalan prioritas?",
    options: [
      "Aging (menaikkan prioritas proses secara berkala seiring waktu tunggu)",
      "Mematikan mekanisme virtual memory",
      "Meningkatkan clock speed CPU secara dinamis",
      "Mengurangi jumlah core processor yang aktif",
    ],
    correctAnswer: 0,
    explanation:
      "Aging secara bertahap menaikkan prioritas proses yang terlalu lama menunggu di ready queue sehingga akhirnya dapat dieksekusi.",
  },
  {
    id: 9,
    category: "CPU Scheduling",
    difficulty: "sedang",
    type: "pg",
    question: 'Metrik "Throughput" pada penjadwalan CPU didefinisikan sebagai:',
    options: [
      "Jumlah total memori yang digunakan oleh proses",
      "Jumlah proses yang berhasil diselesaikan per satu satuan waktu",
      "Waktu yang dibutuhkan proses dari masuk antrean hingga selesai",
      "Lama waktu proses menunggu alokasi I/O",
    ],
    correctAnswer: 1,
    explanation:
      "Throughput mengukur produktivitas sistem operasi dalam menyelesaikan sejumlah proses dalam rentang waktu tertentu.",
  },
  {
    id: 10,
    category: "CPU Scheduling",
    difficulty: "sedang",
    type: "pg",
    question:
      "Apa perbedaan utama Multilevel Feedback Queue (MLFQ) dibandingkan Multilevel Queue standar?",
    options: [
      "MLFQ mengizinkan proses berpindah antar-antrean berdasarkan durasi CPU burst-nya",
      "MLFQ tidak menggunakan algoritma Round Robin sama sekali",
      "Multilevel Queue standar tidak membagi antrean berdasarkan prioritas",
      "MLFQ menghapus kebutuhan akan context switch",
    ],
    correctAnswer: 0,
    explanation:
      "Pada MLFQ, proses dapat naik atau turun antrean tingkat prioritasnya secara dinamis sesuai dengan penggunaan CPU slice dan sifat I/O-nya.",
  },
  {
    id: 11,
    category: "CPU Scheduling",
    difficulty: "sulit",
    type: "pg",
    question:
      "Diberikan Proses P1 dengan Arrival Time = 2, Completion Time = 10, dan Burst Time = 5. Berapakah nilai Turnaround Time (TAT) dan Waiting Time (WT)?",
    options: [
      "TAT = 8, WT = 3",
      "TAT = 10, WT = 5",
      "TAT = 12, WT = 7",
      "TAT = 5, WT = 2",
    ],
    correctAnswer: 0,
    explanation:
      "TAT = Completion Time - Arrival Time = 10 - 2 = 8. WT = TAT - Burst Time = 8 - 5 = 3.",
  },
  {
    id: 12,
    category: "CPU Scheduling",
    difficulty: "sulit",
    type: "pg",
    question:
      "Bagaimana cara kerja algoritma Shortest Remaining Time First (SRTF) ketika sebuah proses baru tiba di Ready Queue?",
    options: [
      "Proses baru selalu ditaruh di antrean paling belakang",
      "Sisa waktu proses baru dibandingkan dengan sisa waktu proses yang berjalan; jika lebih kecil, CPU direbut (preempt)",
      "CPU langsung menghentikan semua proses dan me-restart simulasi",
      "Proses baru harus menunggu giliran time quantum berikutnya",
    ],
    correctAnswer: 1,
    explanation:
      "SRTF adalah versi preemptive dari SJF. Setiap kedatangan proses baru, sisa burst time-nya dibandingkan dengan sisa burst time proses aktif saat itu.",
  },
  {
    id: 13,
    category: "CPU Scheduling",
    difficulty: "sulit",
    type: "pg",
    question:
      "Proses P1 (Burst=6, Arrival=0), P2 (Burst=2, Arrival=1), P3 (Burst=8, Arrival=2) dijadwalkan dengan SRTF. Kapan P1 selesai dieksekusi (Completion Time)?",
    options: ["8", "16", "10", "6"],
    correctAnswer: 0,
    explanation:
      "Pada t=0 P1 berjalan. Pada t=1, P2 tiba (Burst=2 < sisa P1=5), P2 merebut CPU hingga t=3 (selesai). Lalu P1 lanjut (sisa 5) selesai pada t=8.",
  },
  {
    id: 14,
    category: "CPU Scheduling",
    difficulty: "sulit",
    type: "pg",
    question: 'Masalah "Priority Inversion" terjadi ketika:',
    options: [
      "Proses berprioritas tinggi terhalang karena menunggu sumber daya yang ditahan oleh proses berprioritas rendah",
      "Proses berprioritas rendah dieksekusi lebih dulu dari FCFS",
      "Time quantum habis sebelum proses selesai",
      "Sistem kekurangan memori utama",
    ],
    correctAnswer: 0,
    explanation:
      "Priority Inversion adalah skenario di mana proses prioritas tinggi tidak bisa berjalan karena harus menunggu lock sumber daya yang dipegang proses prioritas rendah.",
  },
  {
    id: 15,
    category: "CPU Scheduling",
    difficulty: "sulit",
    type: "pg",
    question:
      "Jika 3 proses tiba bersamaan pada t=0 dengan burst time P1=10, P2=3, P3=7. Berapakah Rata-rata Waktu Tunggu (Average Waiting Time) menggunakan Non-Preemptive SJF?",
    options: [
      "4.33 unit waktu",
      "6.67 unit waktu",
      "5.00 unit waktu",
      "8.33 unit waktu",
    ],
    correctAnswer: 0,
    explanation:
      "Urutan SJF: P2, P3, P1. WT P2=0, WT P3=3, WT P1=10. Total WT = 13. Average WT = 13 / 3 = 4.33.",
  },
  {
    id: 16,
    category: "CPU Scheduling",
    difficulty: "mudah",
    type: "esai",
    question:
      'Algoritma "First-Come, First-Served" umumnya disingkat dengan 4 huruf, yaitu?',
    expectedKeywords: ["fcfs"],
    explanation:
      "FCFS adalah singkatan dari First-Come, First-Served, algoritma paling dasar di mana siapa yang datang pertama dilayani pertama.",
  },
  {
    id: 17,
    category: "CPU Scheduling",
    difficulty: "sedang",
    type: "esai",
    question:
      "Batas jatah potongan waktu yang diberikan CPU pada algoritma Round Robin disebut Time...?",
    expectedKeywords: ["quantum", "slice"],
    explanation:
      "Jatah waktu untuk setiap proses di Round Robin disebut Time Quantum atau Time Slice.",
  },
  {
    id: 18,
    category: "CPU Scheduling",
    difficulty: "sedang",
    type: "esai",
    question:
      'Proses yang tidak pernah dieksekusi karena kalah prioritas terus-menerus mengalami "kelaparan". Istilah bahasa Inggrisnya adalah?',
    expectedKeywords: ["starvation"],
    explanation:
      "Starvation (kelaparan) terjadi saat proses prioritas rendah menunggu tanpa akhir karena CPU selalu diambil proses prioritas tinggi.",
  },
  {
    id: 19,
    category: "CPU Scheduling",
    difficulty: "sulit",
    type: "esai",
    question:
      'Algoritma "Shortest Remaining Time First" merupakan versi preemptif dari SJF. Singkatannya adalah?',
    expectedKeywords: ["srtf"],
    explanation: "SRTF adalah singkatan dari Shortest Remaining Time First.",
  },
  {
    id: 20,
    category: "CPU Scheduling",
    difficulty: "sulit",
    type: "esai",
    question:
      'Perpindahan CPU dari satu proses ke proses lain akibat interupsi atau quantum habis disebut "Context..."?',
    expectedKeywords: ["switch"],
    explanation:
      "Context Switch adalah proses penyimpanan register dari proses lama dan pemuatan register proses baru ke CPU.",
  },
];

export const DEADLOCK_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 101,
    category: "Deadlock",
    difficulty: "mudah",
    type: "pg",
    question:
      "Manakah dari berikut ini yang BUKAN merupakan salah satu dari 4 Syarat Coffman terjadinya Deadlock?",
    options: [
      "Mutual Exclusion",
      "Hold and Wait",
      "Preemptive Resource Allocation",
      "Circular Wait",
    ],
    correctAnswer: 2,
    explanation:
      "4 Syarat Coffman adalah: (1) Mutual Exclusion, (2) Hold and Wait, (3) No Preemption (bukan Preemptive), dan (4) Circular Wait.",
  },
  {
    id: 102,
    category: "Deadlock",
    difficulty: "mudah",
    type: "pg",
    question:
      "Kondisi di mana minimal satu sumber daya harus dipegang secara non-shareable disebut:",
    options: [
      "Mutual Exclusion",
      "Circular Wait",
      "Hold and Wait",
      "Starvation",
    ],
    correctAnswer: 0,
    explanation:
      "Mutual Exclusion berarti sumber daya tidak dapat dibagi (exclusive lock).",
  },
  {
    id: 103,
    category: "Deadlock",
    difficulty: "mudah",
    type: "pg",
    question:
      "Setelah proses Pi selesai dieksekusi dalam Algoritma Banker, apa yang terjadi pada vektor Work?",
    options: [
      "Work dikurangi sebesar Need[i]",
      "Work ditambah sebesar Allocation[i]",
      "Work direset menjadi 0",
      "Work diganti menjadi nilai Max[i]",
    ],
    correctAnswer: 1,
    explanation:
      "Saat proses selesai, ia melepaskan seluruh sumber dayanya kembali ke sistem: Work = Work + Allocation[i].",
  },
  {
    id: 104,
    category: "Deadlock",
    difficulty: "mudah",
    type: "pg",
    question:
      "Strategi mengabaikan masalah deadlock karena dianggap jarang terjadi (seperti di UNIX/Linux) disebut:",
    options: [
      "Ostrich Algorithm",
      "Banker's Algorithm",
      "Wait-For Graph Protocol",
      "Havender Protocol",
    ],
    correctAnswer: 0,
    explanation:
      "Ostrich Algorithm menyembunyikan kepala seperti burung unta; mengabaikan masalah deadlock karena jarang terjadi.",
  },
  {
    id: 105,
    category: "Deadlock",
    difficulty: "mudah",
    type: "pg",
    question:
      "Struktur data apa yang digunakan untuk mendeteksi deadlock pada sistem single-instance?",
    options: [
      "Wait-For Graph",
      "Need Matrix",
      "Available Vector",
      "Circular Stack",
    ],
    correctAnswer: 0,
    explanation:
      "Wait-For Graph mendeteksi siklus ketergantungan antar-proses pada sistem single-instance.",
  },
  {
    id: 106,
    category: "Deadlock",
    difficulty: "sedang",
    type: "pg",
    question:
      "Pada Algoritma Banker (Banker's Algorithm), bagaimana rumus matriks Kebutuhan (Need)?",
    options: [
      "Need = Allocation + Available",
      "Need = Max - Allocation",
      "Need = Max + Available",
      "Need = Allocation - Available",
    ],
    correctAnswer: 1,
    explanation:
      "Need adalah sisa permintaan maksimum yang belum dialokasikan: Need[i][j] = Max[i][j] - Allocation[i][j].",
  },
  {
    id: 107,
    category: "Deadlock",
    difficulty: "sedang",
    type: "pg",
    question:
      "Metode yang mengizinkan sistem masuk ke deadlock lalu memulihkannya disebut:",
    options: [
      "Deadlock Prevention",
      "Deadlock Avoidance",
      "Deadlock Detection and Recovery",
      "Mutual Exclusion Protocol",
    ],
    correctAnswer: 2,
    explanation:
      "Detection and Recovery membiarkan deadlock terjadi dan menggunakan algoritma untuk menemukan dan memulihkan sistem.",
  },
  {
    id: 108,
    category: "Deadlock",
    difficulty: "sedang",
    type: "pg",
    question: 'Bagaimana OS mencegah syarat "Hold and Wait"?',
    options: [
      "Mewajibkan proses meminta semua sumber daya di awal sebelum berjalan",
      "Mengizinkan proses merampas CPU",
      "Menghapus matriks Allocation dan Max",
      "Membuat sumber daya read-only",
    ],
    correctAnswer: 0,
    explanation:
      "Hold and wait dicegah dengan mengharuskan proses mengambil semua sumber daya sekaligus di awal.",
  },
  {
    id: 109,
    category: "Deadlock",
    difficulty: "sedang",
    type: "pg",
    question: "Strategi pencegahan Circular Wait yang paling umum adalah:",
    options: [
      "Memberikan nomor urut linear dan meminta dalam urutan menaik",
      "Mematikan semua interupsi perangkat keras",
      "Menonaktifkan memori virtual",
      "Membatasi 1 proses saja",
    ],
    correctAnswer: 0,
    explanation:
      "Penomoran urut linier (Resource Ordering) memaksa proses meminta resource secara hierarki searah agar tidak membentuk siklus.",
  },
  {
    id: 110,
    category: "Deadlock",
    difficulty: "sedang",
    type: "pg",
    question:
      "Dua pendekatan utama dalam pemulihan (Recovery) dari deadlock adalah:",
    options: [
      "Process Termination (Abort) dan Resource Preemption",
      "CPU Reboot dan Cache Invalidation",
      "Paging dan Swapping",
      "Aging dan Context Switching",
    ],
    correctAnswer: 0,
    explanation:
      "Recovery dilakukan dengan mematikan proses paksa (Abort) atau merampas resource dari proses (Preemption).",
  },
  {
    id: 111,
    category: "Deadlock",
    difficulty: "sulit",
    type: "pg",
    question: 'Hubungan antara "Safe State" dan "Deadlock" adalah:',
    options: [
      "Unsafe State berarti langsung deadlock saat itu juga",
      "Safe State menjamin tidak deadlock; Unsafe State berisiko memicu deadlock",
      "Deadlock terjadi di dalam Safe State",
      "Tidak ada bedanya",
    ],
    correctAnswer: 1,
    explanation:
      'Safe State berarti ada "Safe Sequence". Unsafe State tidak punya garansi, sehingga bisa (meski tidak selalu) berujung deadlock.',
  },
  {
    id: 112,
    category: "Deadlock",
    difficulty: "sulit",
    type: "pg",
    question:
      "Dalam Algoritma Banker, proses Pi dapat dieksekusi jika memenuhi syarat utama:",
    options: [
      "Need[i] ≤ Work",
      "Allocation[i] ≤ Need[i]",
      "Max[i] ≤ Available",
      "Work ≤ Allocation[i]",
    ],
    correctAnswer: 0,
    explanation:
      "Proses bisa berjalan jika sisa kebutuhannya (Need) tidak lebih dari total sumber daya yang sedang menganggur (Work/Available).",
  },
  {
    id: 113,
    category: "Deadlock",
    difficulty: "sulit",
    type: "pg",
    question:
      "Pada algoritma Permintaan Banker, apa syarat pertama sebelum mengecek Available?",
    options: [
      "Request[i] ≤ Need[i]",
      "Request[i] > Max[i]",
      "Available ≤ Request[i]",
      "Allocation[i] == 0",
    ],
    correctAnswer: 0,
    explanation:
      "Sistem memastikan permintaan baru tidak melewati batas sisa maksimum (Need) yang telah diklaim proses di awal.",
  },
  {
    id: 114,
    category: "Deadlock",
    difficulty: "sulit",
    type: "pg",
    question:
      "Pada RAG (Resource Allocation Graph) jenis Single Instance, keberadaan siklus (cycle) berarti:",
    options: [
      "Deadlock pasti terjadi (syarat perlu dan cukup)",
      "Sistem dalam Safe State",
      "Tidak mungkin deadlock",
      "Proses sedang preemptive",
    ],
    correctAnswer: 0,
    explanation:
      "Jika setiap resource hanya ada 1 unit (Single Instance), maka siklus dalam graf adalah bukti pasti terjadinya deadlock.",
  },
  {
    id: 115,
    category: "Deadlock",
    difficulty: "sulit",
    type: "pg",
    question:
      "Sedangkan pada RAG jenis Multiple Instances, adanya siklus berarti:",
    options: [
      "Deadlock berpotensi terjadi, tapi belum tentu",
      "Deadlock pasti terjadi",
      "100% aman dari deadlock",
      "Semua proses selesai",
    ],
    correctAnswer: 0,
    explanation:
      "Jika ada multiple instances, siklus tidak cukup membuktikan deadlock karena unit dari tipe resource yang sama bisa dibebaskan oleh proses di luar siklus.",
  },
  {
    id: 116,
    category: "Deadlock",
    difficulty: "mudah",
    type: "esai",
    question:
      "Grafik berarah yang digunakan OS untuk mendeteksi siklus dan memvisualisasikan status sumber daya disebut Resource Allocation...?",
    expectedKeywords: ["graph", "graf"],
    explanation:
      "Resource Allocation Graph (RAG) adalah visualisasi proses dan sumber daya.",
  },
  {
    id: 117,
    category: "Deadlock",
    difficulty: "sedang",
    type: "esai",
    question:
      'Syarat Coffman di mana proses-proses saling menunggu dalam bentuk rantai tertutup/melingkar disebut "Circular..."?',
    expectedKeywords: ["wait"],
    explanation:
      "Circular Wait adalah satu dari 4 syarat mutlak terjadinya deadlock.",
  },
  {
    id: 118,
    category: "Deadlock",
    difficulty: "sedang",
    type: "esai",
    question:
      "Status di mana OS dapat menemukan minimal 1 urutan eksekusi yang menjamin seluruh proses selesai tanpa deadlock dinamakan status...?",
    expectedKeywords: ["safe", "aman"],
    explanation:
      'Safe State berarti ada "Safe Sequence" yang menghindarkan OS dari tabrakan deadlock.',
  },
  {
    id: 119,
    category: "Deadlock",
    difficulty: "sulit",
    type: "esai",
    question:
      "Kondisi macet total di mana beberapa proses saling mengunci dan menunggu satu sama lain untuk selamanya disebut?",
    expectedKeywords: ["deadlock"],
    explanation:
      "Deadlock adalah kebuntuan sistem karena tidak ada proses yang bisa maju.",
  },
  {
    id: 120,
    category: "Deadlock",
    difficulty: "sulit",
    type: "esai",
    question:
      'Nama matriks pada Algoritma Banker yang mendata "Batas maksimal sumber daya yang mungkin diminta oleh setiap proses" adalah matriks...?',
    expectedKeywords: ["max", "maksimum"],
    explanation:
      "Matriks Max mendefinisikan klaim maksimum setiap proses sejak awal sebelum mulai berjalan.",
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  ...CPU_QUIZ_QUESTIONS,
  ...DEADLOCK_QUIZ_QUESTIONS,
];
