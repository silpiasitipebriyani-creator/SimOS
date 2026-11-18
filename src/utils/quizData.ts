import { QuizQuestion } from "../types";

export const CPU_QUIZ_QUESTIONS: QuizQuestion[] = [
  // =========================================================================
  // CPU SCHEDULING - MUDAH (20 Soal: 15 PG + 5 Esai)
  // =========================================================================
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
    id: 21,
    category: "CPU Scheduling",
    difficulty: "mudah",
    type: "pg",
    question: "Apa kepanjangan dari SJF dalam algoritma penjadwalan CPU?",
    options: [
      "Shortest Job First",
      "Sequential Job First",
      "System Job Function",
      "Single Job Fetch",
    ],
    correctAnswer: 0,
    explanation:
      "SJF adalah singkatan dari Shortest Job First, algoritma yang mendahulukan proses dengan durasi eksekusi (burst time) terpendek.",
  },
  {
    id: 22,
    category: "CPU Scheduling",
    difficulty: "mudah",
    type: "pg",
    question:
      "Algoritma penjadwalan manakah yang memberikan jatah waktu (time slice) secara bergiliran dan adil kepada setiap proses di ready queue?",
    options: [
      "First-Come, First-Served (FCFS)",
      "Shortest Job First (SJF)",
      "Round Robin (RR)",
      "Highest Response Ratio Next (HRRN)",
    ],
    correctAnswer: 2,
    explanation:
      "Round Robin membagi waktu CPU secara adil dalam potongan time quantum secara melingkar untuk semua proses di ready queue.",
  },
  {
    id: 23,
    category: "CPU Scheduling",
    difficulty: "mudah",
    type: "pg",
    question:
      "Apa singkatan dari algoritma penjadwalan yang mengeksekusi proses berdasarkan urutan waktu kedatangannya?",
    options: ["SRTF", "SJF", "FCFS", "RR"],
    correctAnswer: 2,
    explanation:
      "FCFS (First-Come, First-Served) melayani proses sesuai urutan kedatangan ke dalam sistem.",
  },
  {
    id: 24,
    category: "CPU Scheduling",
    difficulty: "mudah",
    type: "pg",
    question:
      "Pada penjadwalan CPU, total lama waktu yang dibutuhkan sebuah proses untuk mengeksekusi instruksinya di dalam CPU disebut:",
    options: ["Arrival Time", "Burst Time", "Waiting Time", "Idle Time"],
    correctAnswer: 1,
    explanation:
      "Burst Time adalah durasi waktu eksekusi murni yang diperlukan oleh sebuah proses pada CPU.",
  },
  {
    id: 25,
    category: "CPU Scheduling",
    difficulty: "mudah",
    type: "pg",
    question:
      "Komponen sistem operasi yang bertugas memilih proses berikutnya dari ready queue untuk dijalankan oleh CPU disebut:",
    options: [
      "CPU Scheduler (Short-Term Scheduler)",
      "Memory Allocator",
      "Device Driver",
      "File System Manager",
    ],
    correctAnswer: 0,
    explanation:
      "CPU Scheduler (atau Short-Term Scheduler) memilih proses yang siap dieksekusi di memori dan mengalokasikan CPU kepadanya.",
  },
  {
    id: 26,
    category: "CPU Scheduling",
    difficulty: "mudah",
    type: "pg",
    question:
      "Komponen yang secara fisik menyerahkan kendali CPU kepada proses yang telah dipilih oleh short-term scheduler disebut:",
    options: ["Compiler", "Dispatcher", "Linker", "Interrupt Handler"],
    correctAnswer: 1,
    explanation:
      "Dispatcher bertugas melakukan context switch, beralih ke user mode, dan melompat ke lokasi instruksi proses yang baru dipilih.",
  },
  {
    id: 27,
    category: "CPU Scheduling",
    difficulty: "mudah",
    type: "pg",
    question:
      "Kondisi ketika CPU tidak mengeksekusi proses apa pun karena ready queue dalam keadaan kosong disebut:",
    options: ["CPU Burst", "CPU Idle", "Context Switch", "Thrashing"],
    correctAnswer: 1,
    explanation:
      "CPU Idle terjadi saat tidak ada proses yang siap dijalankan sehingga prosesor menganggur menunggu kedatangan proses baru.",
  },
  {
    id: 28,
    category: "CPU Scheduling",
    difficulty: "mudah",
    type: "pg",
    question:
      "Diagram batang horizontal yang digunakan untuk memvisualisasikan urutan dan durasi eksekusi proses pada penjadwalan CPU disebut:",
    options: ["Gantt Chart", "Venn Diagram", "Pie Chart", "Sequence Matrix"],
    correctAnswer: 0,
    explanation:
      "Gantt Chart menampilkan blok waktu eksekusi setiap proses beserta waktu mulai dan selesainya secara kronologis.",
  },
  {
    id: 29,
    category: "CPU Scheduling",
    difficulty: "mudah",
    type: "pg",
    question:
      "Titik waktu ketika sebuah proses pertama kali tiba dan masuk ke dalam ready queue disebut:",
    options: [
      "Completion Time",
      "Turnaround Time",
      "Arrival Time",
      "Response Time",
    ],
    correctAnswer: 2,
    explanation:
      "Arrival Time adalah waktu kedatangan proses ke dalam antrean siap (ready queue).",
  },
  {
    id: 30,
    category: "CPU Scheduling",
    difficulty: "mudah",
    type: "pg",
    question:
      "Manakah algoritma berikut yang bersifat Non-Preemptive secara standar?",
    options: [
      "Round Robin (RR)",
      "Shortest Remaining Time First (SRTF)",
      "First-Come, First-Served (FCFS)",
      "Multilevel Feedback Queue (MLFQ)",
    ],
    correctAnswer: 2,
    explanation:
      "FCFS bersifat non-preemptive: sekali proses mendapat CPU, ia akan memegangnya sampai selesai atau meminta I/O.",
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
    id: 31,
    category: "CPU Scheduling",
    difficulty: "mudah",
    type: "esai",
    question:
      "Antrean tempat proses-proses berada di memori utama dan siap untuk dieksekusi CPU disebut Ready... (satu kata bahasa Inggris)?",
    expectedKeywords: ["queue"],
    explanation:
      "Ready Queue menyimpan daftar seluruh proses yang siap dan menunggu giliran alokasi CPU.",
  },
  {
    id: 32,
    category: "CPU Scheduling",
    difficulty: "mudah",
    type: "esai",
    question:
      "Singkatan 3 huruf dari algoritma penjadwalan non-preemptive yang mendahulukan proses dengan burst time terpendek adalah?",
    expectedKeywords: ["sjf"],
    explanation: "SJF adalah singkatan dari Shortest Job First.",
  },
  {
    id: 33,
    category: "CPU Scheduling",
    difficulty: "mudah",
    type: "esai",
    question:
      "Singkatan 2 huruf dari algoritma penjadwalan yang membagi waktu CPU secara melingkar menggunakan time quantum adalah?",
    expectedKeywords: ["rr"],
    explanation: "RR adalah singkatan dari Round Robin.",
  },
  {
    id: 34,
    category: "CPU Scheduling",
    difficulty: "mudah",
    type: "esai",
    question:
      "Dalam visualisasi penjadwalan proses, diagram batang horizontal yang menunjukkan lini masa eksekusi CPU disebut ... Chart?",
    expectedKeywords: ["gantt"],
    explanation:
      "Gantt Chart digunakan untuk memetakan urutan eksekusi proses dari waktu ke waktu.",
  },

  // =========================================================================
  // CPU SCHEDULING - SEDANG (20 Soal: 15 PG + 5 Esai)
  // =========================================================================
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
    id: 35,
    category: "CPU Scheduling",
    difficulty: "sedang",
    type: "pg",
    question:
      "Rumus yang tepat untuk menghitung Turnaround Time (TAT) sebuah proses adalah:",
    options: [
      "Completion Time - Arrival Time",
      "Burst Time - Arrival Time",
      "Waiting Time - Burst Time",
      "Completion Time + Arrival Time",
    ],
    correctAnswer: 0,
    explanation:
      "Turnaround Time adalah total waktu sejak proses tiba hingga selesai dieksekusi: TAT = Completion Time - Arrival Time.",
  },
  {
    id: 36,
    category: "CPU Scheduling",
    difficulty: "sedang",
    type: "pg",
    question:
      "Rumus yang tepat untuk menghitung Waiting Time (WT) sebuah proses dari Turnaround Time-nya adalah:",
    options: [
      "Turnaround Time + Burst Time",
      "Turnaround Time - Burst Time",
      "Burst Time - Arrival Time",
      "Completion Time - Burst Time",
    ],
    correctAnswer: 1,
    explanation:
      "Waiting Time adalah waktu yang dihabiskan proses hanya untuk menunggu di ready queue: WT = Turnaround Time - Burst Time.",
  },
  {
    id: 37,
    category: "CPU Scheduling",
    difficulty: "sedang",
    type: "pg",
    question:
      'Apa yang dimaksud dengan "Response Time" pada sistem interaktif?',
    options: [
      "Total waktu dari kedatangan proses hingga selesai seluruhnya",
      "Selang waktu dari proses tiba hingga pertama kali mendapatkan respons/eksekusi CPU",
      "Total waktu proses berada di dalam perangkat I/O",
      "Waktu yang dihabiskan dispatcher saat context switch",
    ],
    correctAnswer: 1,
    explanation:
      "Response Time mengukur seberapa cepat sistem mulai merespons permintaan pengguna sejak proses masuk ke ready queue.",
  },
  {
    id: 38,
    category: "CPU Scheduling",
    difficulty: "sedang",
    type: "pg",
    question:
      "Pada Priority Scheduling di mana angka kecil berarti prioritas lebih tinggi, proses mana yang dipilih lebih dulu jika semuanya tiba pada t=0?",
    options: [
      "Proses dengan nilai prioritas = 10",
      "Proses dengan nilai prioritas = 5",
      "Proses dengan nilai prioritas = 1",
      "Proses dengan burst time terbesar",
    ],
    correctAnswer: 2,
    explanation:
      "Dalam konvensi angka rendah = prioritas tinggi (seperti sistem UNIX/Linux), prioritas 1 akan dieksekusi lebih dulu dibanding 5 dan 10.",
  },
  {
    id: 39,
    category: "CPU Scheduling",
    difficulty: "sedang",
    type: "pg",
    question:
      "Waktu yang dibutuhkan oleh dispatcher untuk menghentikan satu proses dan memulai proses lain (saat CPU tidak melakukan kerja berguna) disebut:",
    options: [
      "Dispatch Latency",
      "Seek Time",
      "Rotational Latency",
      "Propagation Delay",
    ],
    correctAnswer: 0,
    explanation:
      "Dispatch Latency adalah jeda waktu pergantian konteks oleh dispatcher yang harus diminimalkan oleh sistem operasi.",
  },
  {
    id: 40,
    category: "CPU Scheduling",
    difficulty: "sedang",
    type: "pg",
    question:
      "Proses yang menghabiskan sebagian besar waktunya untuk melakukan komputasi aritmatika daripada menunggu operasi input/output disebut:",
    options: [
      "I/O-bound process",
      "CPU-bound process",
      "Zombie process",
      "Daemon process",
    ],
    correctAnswer: 1,
    explanation:
      "CPU-bound process memiliki durasi CPU burst yang panjang dan jarang melakukan interupsi I/O.",
  },
  {
    id: 41,
    category: "CPU Scheduling",
    difficulty: "sedang",
    type: "pg",
    question:
      "Algoritma penjadwalan manakah yang paling cocok untuk sistem Time-Sharing interaktif karena menjamin Response Time yang cepat bagi setiap pengguna?",
    options: [
      "First-Come, First-Served (FCFS)",
      "Non-Preemptive SJF",
      "Round Robin (RR)",
      "Batch FIFO",
    ],
    correctAnswer: 2,
    explanation:
      "Round Robin dirancang khusus untuk sistem time-sharing agar setiap proses mendapat giliran CPU secara berkala tanpa menunggu proses lain selesai.",
  },
  {
    id: 42,
    category: "CPU Scheduling",
    difficulty: "sedang",
    type: "pg",
    question:
      "Apa kelemahan utama algoritma Shortest Job First (SJF) dan SRTF terhadap proses yang memiliki burst time sangat panjang?",
    options: [
      "Terjadi Convoy Effect",
      "Proses panjang rentan mengalami Starvation jika proses pendek terus berdatangan",
      "CPU Utilization selalu di bawah 10%",
      "Tidak bisa dijalankan pada sistem single-core",
    ],
    correctAnswer: 1,
    explanation:
      "Karena proses dengan burst time pendek selalu diprioritaskan, proses berdurasi panjang bisa tertunda tanpa batas waktu (starvation).",
  },
  {
    id: 43,
    category: "CPU Scheduling",
    difficulty: "sedang",
    type: "pg",
    question:
      "Kapan keputusan penjadwalan CPU terjadi pada sistem yang murni bersifat Non-Preemptive?",
    options: [
      "Setiap kali timer interrupt berdetak",
      "Setiap kali proses baru masuk ke ready queue",
      "Hanya ketika proses beralih dari running ke waiting (I/O) atau selesai (terminated)",
      "Setiap 10 milidetik sekali secara paksa",
    ],
    correctAnswer: 2,
    explanation:
      "Pada penjadwalan non-preemptive, proses tidak pernah direbut paksa; pergantian hanya terjadi saat proses berhenti sukarela atau selesai.",
  },
  {
    id: 44,
    category: "CPU Scheduling",
    difficulty: "sedang",
    type: "pg",
    question:
      "Pada algoritma Round Robin, apabila sebuah proses selesai sebelum jatah Time Quantum-nya habis, apa yang segera dilakukan oleh CPU scheduler?",
    options: [
      "Membiarkan CPU idle hingga sisa quantum habis",
      "Langsung memilih proses berikutnya dari kepala ready queue tanpa menunggu quantum habis",
      "Mengulang proses yang sama dari awal",
      "Menurunkan nilai time quantum secara permanen",
    ],
    correctAnswer: 1,
    explanation:
      "Proses yang selesai lebih cepat langsung melepaskan CPU sehingga scheduler segera menjadwalkan proses berikutnya di antrean.",
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
    id: 45,
    category: "CPU Scheduling",
    difficulty: "sedang",
    type: "esai",
    question:
      "Teknik menaikkan prioritas proses secara bertahap seiring lamanya waktu tunggu untuk mencegah starvation disebut?",
    expectedKeywords: ["aging"],
    explanation:
      "Aging memastikan setiap proses yang menunggu terlalu lama pada akhirnya memiliki prioritas cukup tinggi untuk dieksekusi.",
  },
  {
    id: 46,
    category: "CPU Scheduling",
    difficulty: "sedang",
    type: "esai",
    question:
      "Metrik penjadwalan yang menghitung jumlah proses yang berhasil diselesaikan per satuan waktu disebut?",
    expectedKeywords: ["throughput"],
    explanation:
      "Throughput menunjukkan banyaknya pekerjaan (proses) yang tuntas dalam satu satuan waktu.",
  },
  {
    id: 47,
    category: "CPU Scheduling",
    difficulty: "sedang",
    type: "esai",
    question:
      "Selisih antara waktu selesai (Completion Time) dengan waktu kedatangan (Arrival Time) disebut ... Time?",
    expectedKeywords: ["turnaround"],
    explanation:
      "Turnaround Time mencakup seluruh waktu proses berada di sistem (waktu tunggu + waktu eksekusi).",
  },

  // =========================================================================
  // CPU SCHEDULING - SULIT (20 Soal: 15 PG + 5 Esai)
  // =========================================================================
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
    id: 48,
    category: "CPU Scheduling",
    difficulty: "sulit",
    type: "pg",
    question:
      "Tiga proses tiba pada t=0 dengan urutan antrean P1 (Burst=8), P2 (Burst=4), P3 (Burst=4) menggunakan Round Robin dengan Time Quantum = 4. Berapakah Completion Time untuk P1?",
    options: ["12", "16", "8", "14"],
    correctAnswer: 1,
    explanation:
      "t=0..4 P1 jalan (sisa 4); t=4..8 P2 selesai; t=8..12 P3 selesai; t=12..16 P1 melanjutkan sisa 4 dan selesai pada t=16.",
  },
  {
    id: 49,
    category: "CPU Scheduling",
    difficulty: "sulit",
    type: "pg",
    question:
      "Diketahui P1 (Arrival=0, Burst=7), P2 (Arrival=2, Burst=4), P3 (Arrival=4, Burst=1) dijadwalkan menggunakan Non-Preemptive SJF. Berapakah Waiting Time dari P2?",
    options: ["0", "2", "6", "8"],
    correctAnswer: 2,
    explanation:
      "P1 berjalan penuh t=0..7. Pada t=7, P3 (Burst=1) lebih pendek dari P2 (Burst=4) sehingga P3 jalan t=7..8, lalu P2 jalan t=8..12. WT P2 = 8 - 2 = 6.",
  },
  {
    id: 50,
    category: "CPU Scheduling",
    difficulty: "sulit",
    type: "pg",
    question:
      "Diketahui P1 (Arrival=0, Burst=7), P2 (Arrival=2, Burst=4), P3 (Arrival=4, Burst=1) dijadwalkan menggunakan Preemptive SRTF. Berapakah Waiting Time dari P2?",
    options: ["1", "3", "5", "0"],
    correctAnswer: 0,
    explanation:
      "t=0..2 P1 (sisa 5); t=2..4 P2 (sisa 2); t=4..5 P3 selesai; t=5..7 P2 selesai. Completion P2 = 7, TAT = 7 - 2 = 5, WT = 5 - 4 = 1.",
  },
  {
    id: 51,
    category: "CPU Scheduling",
    difficulty: "sulit",
    type: "pg",
    question:
      "Dalam prediksi CPU burst berikutnya pada SJF menggunakan rumus Exponential Averaging τ(n+1) = α·t(n) + (1 - α)·τ(n), jika α = 0 maka:",
    options: [
      "Prediksi hanya bergantung pada burst aktual terakhir dan mengabaikan riwayat",
      "Riwayat masa lalu diabaikan dan prediksi konstan bernilai 0",
      "Burst aktual terakhir diabaikan dan prediksi tetap sama dengan prediksi sebelumnya τ(n)",
      "Sistem otomatis beralih ke algoritma Round Robin",
    ],
    correctAnswer: 2,
    explanation:
      "Ketika α = 0, suku α·t(n) menjadi 0 sehingga τ(n+1) = τ(n); riwayat burst aktual terbaru tidak memengaruhi prediksi.",
  },
  {
    id: 52,
    category: "CPU Scheduling",
    difficulty: "sulit",
    type: "pg",
    question:
      "Empat proses memiliki Completion Time masing-masing: P1=5, P2=9, P3=14, P4=20, dan semuanya tiba pada t=0. Berapakah nilai Throughput sistem tersebut?",
    options: [
      "0.20 proses/unit waktu",
      "5.00 proses/unit waktu",
      "0.25 proses/unit waktu",
      "0.80 proses/unit waktu",
    ],
    correctAnswer: 0,
    explanation:
      "Throughput = Jumlah proses selesai / Total waktu eksekusi = 4 / 20 = 0.20 proses per unit waktu.",
  },
  {
    id: 53,
    category: "CPU Scheduling",
    difficulty: "sulit",
    type: "pg",
    question:
      "Jika total waktu eksekusi sistem adalah 25 ms dan selama rentang tersebut CPU mengalami kondisi idle selama 5 ms, berapakah persentase CPU Utilization-nya?",
    options: ["20%", "75%", "80%", "95%"],
    correctAnswer: 2,
    explanation:
      "Waktu aktif CPU = 25 - 5 = 20 ms. CPU Utilization = (20 / 25) × 100% = 80%.",
  },
  {
    id: 54,
    category: "CPU Scheduling",
    difficulty: "sulit",
    type: "pg",
    question:
      "Pada penjadwalan Round Robin dengan Time Quantum = 3, proses P1 (Arrival=0, Burst=10) adalah satu-satunya proses di sistem. Berapa kali quantum habis sehingga memicu pengalihan ulang (tidak termasuk load awal)?",
    options: ["2 kali", "3 kali", "4 kali", "10 kali"],
    correctAnswer: 1,
    explanation:
      "P1 dieksekusi dalam 4 potongan: [0-3], [3-6], [6-9], dan [9-10]. Terjadi 3 kali interupsi habis quantum (pada t=3, t=6, dan t=9).",
  },
  {
    id: 55,
    category: "CPU Scheduling",
    difficulty: "sulit",
    type: "pg",
    question:
      "Diketahui P1 (Arrival=1, Burst=4) dan P2 (Arrival=6, Burst=3) dijadwalkan dengan FCFS. Berapakah total waktu CPU Idle dari t=0 hingga semua proses selesai?",
    options: ["0 unit waktu", "1 unit waktu", "2 unit waktu", "3 unit waktu"],
    correctAnswer: 2,
    explanation:
      "CPU idle pada t=0..1 (1 unit) menunggu P1, lalu P1 jalan t=1..5, kemudian CPU idle lagi pada t=5..6 (1 unit) menunggu P2. Total idle = 2 unit.",
  },
  {
    id: 56,
    category: "CPU Scheduling",
    difficulty: "sulit",
    type: "pg",
    question:
      "Pada algoritma Highest Response Ratio Next (HRRN), rasio respons dihitung dengan rumus (W + S) / S, di mana W = Waiting Time dan S = Burst Time. Mengapa HRRN mampu mencegah Starvation pada proses panjang?",
    options: [
      "Karena nilai W terus bertambah seiring lamanya menunggu sehingga rasio prioritasnya terus naik",
      "Karena proses panjang selalu dipotong setiap 1 milidetik",
      "Karena nilai S dibagi dua setiap kali proses dilewati",
      "Karena HRRN mengabaikan waktu kedatangan proses",
    ],
    correctAnswer: 0,
    explanation:
      "Meskipun S besar, bertambahnya W selama proses mengantre membuat pembilang (W + S) terus membesar hingga akhirnya mengalahkan proses baru.",
  },
  {
    id: 57,
    category: "CPU Scheduling",
    difficulty: "sulit",
    type: "pg",
    question:
      "Dalam penjadwalan prosesor ganda (Multiprocessor Scheduling), pendekatan di mana setiap prosesor memiliki ready queue privatnya sendiri dan menjadwalkan proses secara independen disebut:",
    options: [
      "Asymmetric Multiprocessing",
      "Partitioned / Per-Core Ready Queue Scheduling",
      "Single Global Queue Locking",
      "Cooperative Fiber Scheduling",
    ],
    correctAnswer: 1,
    explanation:
      "Pada pendekatan per-core ready queue, setiap inti prosesor memiliki antrean lokal sendiri sehingga mengurangi contention kunci (lock) global.",
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
  {
    id: 58,
    category: "CPU Scheduling",
    difficulty: "sulit",
    type: "esai",
    question:
      "Waktu yang dibutuhkan oleh modul Dispatcher untuk menghentikan satu proses dan beralih menjalankan proses lain disebut Dispatch... (satu kata bahasa Inggris)?",
    expectedKeywords: ["latency"],
    explanation:
      "Dispatch Latency adalah jeda waktu murni yang dihabiskan dispatcher saat melakukan pergantian proses.",
  },
  {
    id: 59,
    category: "CPU Scheduling",
    difficulty: "sulit",
    type: "esai",
    question:
      "Kecenderungan sebuah proses untuk tetap berjalan pada prosesor/core yang sama guna menjaga validitas isi cache memori disebut Processor... (satu kata bahasa Inggris)?",
    expectedKeywords: ["affinity"],
    explanation:
      "Processor Affinity mempertahankan proses pada core yang sama agar data di cache L1/L2 tidak perlu dimuat ulang dari RAM.",
  },
  {
    id: 60,
    category: "CPU Scheduling",
    difficulty: "sulit",
    type: "esai",
    question:
      "Algoritma penjadwalan non-preemptive yang memilih proses berdasarkan rasio tertinggi dari (Waiting Time + Burst Time) / Burst Time disingkat dengan 4 huruf, yaitu?",
    expectedKeywords: ["hrrn"],
    explanation: "HRRN adalah singkatan dari Highest Response Ratio Next.",
  },
];

export const DEADLOCK_QUIZ_QUESTIONS: QuizQuestion[] = [
  // =========================================================================
  // DEADLOCK - MUDAH (20 Soal: 15 PG + 5 Esai)
  // =========================================================================
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
    id: 121,
    category: "Deadlock",
    difficulty: "mudah",
    type: "pg",
    question:
      "Berapa jumlah syarat mutlak (Syarat Coffman) yang harus terpenuhi secara bersamaan agar deadlock dapat terjadi?",
    options: ["2 syarat", "3 syarat", "4 syarat", "5 syarat"],
    correctAnswer: 2,
    explanation:
      "Keempat syarat Coffman (Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait) harus berlaku serentak agar deadlock muncul.",
  },
  {
    id: 122,
    category: "Deadlock",
    difficulty: "mudah",
    type: "pg",
    question:
      "Syarat Coffman yang menyatakan bahwa sumber daya tidak dapat diambil secara paksa dari proses yang sedang memegangnya (harus dilepas sukarela) adalah:",
    options: [
      "Mutual Exclusion",
      "Hold and Wait",
      "No Preemption",
      "Circular Wait",
    ],
    correctAnswer: 2,
    explanation:
      "No Preemption berarti resource hanya bisa dilepaskan oleh proses yang memegangnya setelah tugasnya selesai.",
  },
  {
    id: 123,
    category: "Deadlock",
    difficulty: "mudah",
    type: "pg",
    question:
      "Syarat Coffman di mana sebuah proses sedang memegang minimal satu sumber daya sambil menunggu sumber daya tambahan yang dipegang proses lain disebut:",
    options: [
      "Hold and Wait",
      "No Preemption",
      "Mutual Exclusion",
      "Safe Sequence",
    ],
    correctAnswer: 0,
    explanation:
      "Hold and Wait menggambarkan proses yang menahan resource yang sudah didapat sembari meminta resource lain.",
  },
  {
    id: 124,
    category: "Deadlock",
    difficulty: "mudah",
    type: "pg",
    question:
      "Pada Resource Allocation Graph (RAG), bentuk bangun datar apakah yang digunakan untuk merepresentasikan sebuah Proses?",
    options: [
      "Lingkaran (Circle)",
      "Persegi panjang (Rectangle)",
      "Segitiga (Triangle)",
      "Belah ketupat (Diamond)",
    ],
    correctAnswer: 0,
    explanation:
      "Dalam notasi graf RAG, simpul Proses digambarkan sebagai lingkaran, sedangkan Tipe Resource digambarkan sebagai persegi panjang.",
  },
  {
    id: 125,
    category: "Deadlock",
    difficulty: "mudah",
    type: "pg",
    question:
      "Pada Resource Allocation Graph (RAG), bentuk bangun datar apakah yang digunakan untuk merepresentasikan Tipe Sumber Daya (Resource Type)?",
    options: [
      "Lingkaran (Circle)",
      "Persegi panjang (Rectangle)",
      "Elips (Oval)",
      "Garis putus-putus",
    ],
    correctAnswer: 1,
    explanation:
      "Tipe Resource digambarkan sebagai persegi panjang dengan titik-titik di dalamnya yang menunjukkan jumlah instance.",
  },
  {
    id: 126,
    category: "Deadlock",
    difficulty: "mudah",
    type: "pg",
    question:
      "Dalam Resource Allocation Graph (RAG), panah berarah dari Proses Pi menuju Resource Rj (Pi → Rj) menandakan:",
    options: [
      "Assignment Edge (Rj sedang dialokasikan ke Pi)",
      "Request Edge (Pi sedang meminta Rj)",
      "Release Edge (Pi melepas Rj)",
      "Preemption Edge",
    ],
    correctAnswer: 1,
    explanation:
      "Panah dari Proses ke Resource (Pi → Rj) adalah Request Edge yang menunjukkan Pi sedang menunggu alokasi dari Rj.",
  },
  {
    id: 127,
    category: "Deadlock",
    difficulty: "mudah",
    type: "pg",
    question:
      "Dalam Resource Allocation Graph (RAG), panah berarah dari Resource Rj menuju Proses Pi (Rj → Pi) menandakan:",
    options: [
      "Request Edge (Pi meminta Rj)",
      "Assignment Edge (sebuah unit Rj sedang dialokasikan ke Pi)",
      "Deadlock Cycle",
      "Available Vector",
    ],
    correctAnswer: 1,
    explanation:
      "Panah dari Resource ke Proses (Rj → Pi) adalah Assignment Edge yang menunjukkan satu instance Rj sedang dipegang oleh Pi.",
  },
  {
    id: 128,
    category: "Deadlock",
    difficulty: "mudah",
    type: "pg",
    question:
      "Siapakah ilmuwan komputer yang mengembangkan Algoritma Banker (Banker's Algorithm) untuk penghindaran deadlock?",
    options: [
      "Edsger Dijkstra",
      "Alan Turing",
      "Linus Torvalds",
      "Ken Thompson",
    ],
    correctAnswer: 0,
    explanation:
      "Edsger W. Dijkstra merancang Algoritma Banker untuk memastikan sistem selalu berada dalam Safe State.",
  },
  {
    id: 129,
    category: "Deadlock",
    difficulty: "mudah",
    type: "pg",
    question:
      "Vektor pada Algoritma Banker yang mencatat jumlah unit masing-masing sumber daya yang saat ini bebas dan siap dialokasikan adalah:",
    options: ["Allocation", "Max", "Available", "Need"],
    correctAnswer: 2,
    explanation:
      "Vektor Available merepresentasikan stok unit resource yang sedang menganggur di sistem.",
  },
  {
    id: 130,
    category: "Deadlock",
    difficulty: "mudah",
    type: "pg",
    question: "Perbedaan mendasar antara Deadlock dan Starvation adalah:",
    options: [
      "Pada deadlock proses terblokir permanen karena saling menunggu; pada starvation proses tertunda lama karena kalah prioritas/giliran",
      "Deadlock hanya terjadi pada CPU, sedangkan starvation hanya pada hard disk",
      "Starvation membutuhkan 4 syarat Coffman, sedangkan deadlock tidak",
      "Deadlock selalu sembuh sendiri tanpa intervensi, sedangkan starvation tidak",
    ],
    correctAnswer: 0,
    explanation:
      "Deadlock adalah kebuntuan saling mengunci antar-proses, sedangkan starvation adalah penundaan akibat kebijakan penjadwalan yang tidak adil.",
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
    id: 131,
    category: "Deadlock",
    difficulty: "mudah",
    type: "esai",
    question:
      "Algoritma penghindaran deadlock yang dinamai berdasarkan cara bankir mengalokasikan uang tunai agar tetap likuid disebut ... Algorithm?",
    expectedKeywords: ["banker", "bankers", "bankir"],
    explanation:
      "Banker's Algorithm memastikan alokasi sumber daya tidak pernah membawa sistem ke kondisi tidak aman (unsafe).",
  },
  {
    id: 132,
    category: "Deadlock",
    difficulty: "mudah",
    type: "esai",
    question:
      "Vektor pada Algoritma Banker yang menyimpan jumlah unit sumber daya yang saat ini tersedia/bebas di sistem adalah vektor... (satu kata bahasa Inggris)?",
    expectedKeywords: ["available"],
    explanation:
      "Available mencatat jumlah resource bebas yang dapat langsung diberikan ke proses.",
  },
  {
    id: 133,
    category: "Deadlock",
    difficulty: "mudah",
    type: "esai",
    question:
      "Matriks pada Algoritma Banker yang mencatat jumlah sumber daya yang saat ini sudah dipegang oleh tiap proses adalah matriks... (satu kata bahasa Inggris)?",
    expectedKeywords: ["allocation"],
    explanation:
      "Matriks Allocation menyimpan data resource yang sedang dialokasikan ke masing-masing proses.",
  },
  {
    id: 134,
    category: "Deadlock",
    difficulty: "mudah",
    type: "esai",
    question:
      "Strategi menangani deadlock dengan cara mengabaikannya seolah-olah tidak pernah terjadi (seperti burung unta) disebut ... Algorithm?",
    expectedKeywords: ["ostrich"],
    explanation:
      "Ostrich Algorithm mengabaikan deadlock demi performa karena kejadiannya dianggap sangat jarang.",
  },

  // =========================================================================
  // DEADLOCK - SEDANG (20 Soal: 15 PG + 5 Esai)
  // =========================================================================
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
    id: 135,
    category: "Deadlock",
    difficulty: "sedang",
    type: "pg",
    question:
      "Apa perbedaan utama antara Deadlock Prevention dan Deadlock Avoidance?",
    options: [
      "Prevention memastikan minimal satu syarat Coffman tidak terpenuhi; Avoidance memeriksa setiap permintaan resource secara dinamis agar tetap di Safe State",
      "Prevention menggunakan Algoritma Banker; Avoidance mematikan proses secara acak",
      "Prevention hanya untuk single-core; Avoidance untuk multi-core",
      "Tidak ada perbedaan; keduanya adalah sinonim",
    ],
    correctAnswer: 0,
    explanation:
      "Prevention membatasi cara permintaan resource secara struktural, sedangkan Avoidance mengevaluasi state alokasi secara dinamis sebelum menyetujui permintaan.",
  },
  {
    id: 136,
    category: "Deadlock",
    difficulty: "sedang",
    type: "pg",
    question:
      'Mengapa syarat "Mutual Exclusion" umumnya tidak bisa dicegah begitu saja pada semua jenis sumber daya?',
    options: [
      "Karena beberapa sumber daya (seperti printer atau mutex lock) secara intrinsik tidak dapat dibagi bersamaan",
      "Karena akan membuat kapasitas RAM berkurang setengah",
      "Karena sistem operasi melarang penggunaan file read-only",
      "Karena mutual exclusion wajib ada agar CPU bisa booting",
    ],
    correctAnswer: 0,
    explanation:
      "Sumber daya non-shareable memang harus digunakan secara eksklusif oleh satu proses pada satu waktu agar data tidak korup.",
  },
  {
    id: 137,
    category: "Deadlock",
    difficulty: "sedang",
    type: "pg",
    question:
      'Bagaimana cara mencegah syarat "No Preemption" ketika sebuah proses yang sedang memegang resource meminta resource lain yang tidak tersedia?',
    options: [
      "Semua resource yang sedang dipegang proses tersebut otomatis dilepaskan (preempted) dan baru diminta ulang nanti",
      "Proses tersebut dinaikkan prioritasnya ke level tertinggi",
      "Sistem operasi menggandakan jumlah resource fisik secara virtual",
      "Proses diperbolehkan menunggu tanpa batas waktu",
    ],
    correctAnswer: 0,
    explanation:
      "Jika permintaan baru gagal dipenuhi, resource lama milik proses tersebut dilepaskan secara implisit sehingga tidak menahan proses lain.",
  },
  {
    id: 138,
    category: "Deadlock",
    difficulty: "sedang",
    type: "pg",
    question:
      "Informasi tambahan apa yang wajib dideklarasikan setiap proses di awal sebelum berjalan agar Deadlock Avoidance (seperti Algoritma Banker) dapat bekerja?",
    options: [
      "Jumlah maksimum (Max) dari setiap tipe sumber daya yang mungkin akan dimintanya",
      "Ukuran file executable dalam kilobyte",
      "Nama pengguna yang menjalankan proses",
      "Daftar alamat IP tujuan",
    ],
    correctAnswer: 0,
    explanation:
      "Deklarasi klaim maksimum (Max) di awal memungkinkan sistem menghitung potensi skenario terburuk sebelum mengabulkan permintaan.",
  },
  {
    id: 139,
    category: "Deadlock",
    difficulty: "sedang",
    type: "pg",
    question:
      "Urutan eksekusi proses <P1, P2, ..., Pn> di mana setiap proses Pi dapat memenuhi kebutuhan sumber dayanya dari sumber daya tersedia ditambah milik proses sebelumnya disebut:",
    options: [
      "Safe Sequence",
      "Circular Chain",
      "Interrupt Vector",
      "Critical Section",
    ],
    correctAnswer: 0,
    explanation:
      "Safe Sequence adalah urutan penyelesaian proses yang menjamin tidak akan terjadi kebuntuan sumber daya.",
  },
  {
    id: 140,
    category: "Deadlock",
    difficulty: "sedang",
    type: "pg",
    question: "Pada Wait-For Graph, edge Pi → Pj terbentuk apabila:",
    options: [
      "Proses Pi sedang menunggu proses Pj melepaskan sumber daya yang dibutuhkan Pi",
      "Proses Pi sedang mengirimkan pesan jaringan ke Pj",
      "Proses Pj adalah induk (parent) dari proses Pi",
      "Proses Pi memiliki prioritas lebih rendah dari Pj",
    ],
    correctAnswer: 0,
    explanation:
      "Wait-For Graph menyederhanakan RAG dengan menghilangkan simpul resource sehingga panah langsung menghubungkan proses penunggu ke pemegang resource.",
  },
  {
    id: 141,
    category: "Deadlock",
    difficulty: "sedang",
    type: "pg",
    question:
      "Seberapa sering algoritma Deadlock Detection sebaiknya dijalankan oleh sistem operasi?",
    options: [
      "Bergantung pada seberapa sering deadlock terjadi dan berapa banyak proses yang terdampak (bisa berkala atau saat CPU utilization turun drastis)",
      "Setiap satu siklus clock CPU (nanodetik)",
      "Hanya satu kali saat komputer pertama kali dinyalakan",
      "Hanya ketika pengguna menekan tombol Ctrl+Alt+Del",
    ],
    correctAnswer: 0,
    explanation:
      "Menjalankan deteksi terlalu sering menimbulkan overhead CPU, sehingga biasanya dijalankan berkala atau ketika utilisasi CPU anjlok.",
  },
  {
    id: 142,
    category: "Deadlock",
    difficulty: "sedang",
    type: "pg",
    question:
      "Dalam pemulihan deadlock melalui Resource Preemption, masalah apa yang muncul jika proses yang sama selalu dipilih sebagai korban (victim) untuk dirampas sumber dayanya?",
    options: [
      "Starvation",
      "Thrashing",
      "Fragmentasi Internal",
      "Race Condition",
    ],
    correctAnswer: 0,
    explanation:
      "Jika pemilihan victim hanya berdasarkan biaya minimum tanpa memperhitungkan riwayat rollback, proses yang sama akan terus dikorbankan (starvation).",
  },
  {
    id: 143,
    category: "Deadlock",
    difficulty: "sedang",
    type: "pg",
    question:
      "Untuk mencegah Starvation saat melakukan Resource Preemption pada pemulihan deadlock, faktor apa yang harus dimasukkan ke dalam perhitungan pemilihan korban?",
    options: [
      "Jumlah berapa kali sebuah proses telah di-rollback (semakin sering, semakin kecil peluang dipilih lagi)",
      "Warna ikon aplikasi di layar",
      "Urutan abjad nama proses",
      "Ukuran resolusi monitor",
    ],
    correctAnswer: 0,
    explanation:
      "Memasukkan jumlah rollback ke dalam cost factor memastikan suatu proses tidak dikorbankan berulang kali tanpa batas.",
  },
  {
    id: 144,
    category: "Deadlock",
    difficulty: "sedang",
    type: "pg",
    question:
      "Pada pemulihan deadlock dengan Process Termination, apa kelemahan jika sistem memilih menghentikan proses satu per satu (abort one by one) hingga siklus deadlock hilang?",
    options: [
      "Overhead tinggi karena algoritma deteksi deadlock harus dijalankan ulang setiap kali satu proses dimatikan",
      "Seluruh data di hard disk akan terformat otomatis",
      "Sistem operasi langsung mengalami kernel panic",
      "Tidak ada proses yang bisa dimatikan saat deadlock",
    ],
    correctAnswer: 0,
    explanation:
      "Setiap terminasi satu proses mengharuskan OS memanggil ulang algoritma deteksi untuk memeriksa apakah sistem sudah bebas dari deadlock.",
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
    id: 145,
    category: "Deadlock",
    difficulty: "sedang",
    type: "esai",
    question:
      "Matriks pada Algoritma Banker yang diperoleh dari pengurangan Max - Allocation adalah matriks... (satu kata bahasa Inggris)?",
    expectedKeywords: ["need"],
    explanation:
      "Matriks Need menyatakan sisa kebutuhan sumber daya yang masih diperlukan tiap proses untuk selesai.",
  },
  {
    id: 146,
    category: "Deadlock",
    difficulty: "sedang",
    type: "esai",
    question:
      "Urutan eksekusi proses yang menjamin seluruh proses dapat diselesaikan tanpa memicu deadlock disebut Safe... (satu kata bahasa Inggris)?",
    expectedKeywords: ["sequence"],
    explanation:
      "Safe Sequence membuktikan bahwa sistem berada dalam kondisi aman (Safe State).",
  },
  {
    id: 147,
    category: "Deadlock",
    difficulty: "sedang",
    type: "esai",
    question:
      "Pada pemulihan deadlock dengan menghentikan proses atau merampas resource, proses yang dipilih untuk dikorbankan disebut... (satu kata bahasa Inggris)?",
    expectedKeywords: ["victim"],
    explanation:
      "Victim adalah proses korban yang dipilih berdasarkan pertimbangan biaya terendah (minimum cost).",
  },

  // =========================================================================
  // DEADLOCK - SULIT (20 Soal: 15 PG + 5 Esai)
  // =========================================================================
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
    id: 148,
    category: "Deadlock",
    difficulty: "sulit",
    type: "pg",
    question:
      "Diketahui proses P0 memiliki Max = [7, 5, 3] dan Allocation = [0, 1, 0]. Berapakah vektor Need untuk P0?",
    options: ["[7, 4, 3]", "[7, 6, 3]", "[0, 1, 0]", "[7, 5, 3]"],
    correctAnswer: 0,
    explanation:
      "Need[0] = Max[0] - Allocation[0] = [7 - 0, 5 - 1, 3 - 0] = [7, 4, 3].",
  },
  {
    id: 149,
    category: "Deadlock",
    difficulty: "sulit",
    type: "pg",
    question:
      "Diketahui total sumber daya sistem adalah [10, 5, 7] dan total jumlah seluruh kolom Allocation dari semua proses adalah [7, 2, 5]. Berapakah nilai vektor Available saat ini?",
    options: ["[3, 3, 2]", "[17, 7, 12]", "[3, 2, 2]", "[2, 3, 3]"],
    correctAnswer: 0,
    explanation:
      "Available = Total Resource - Total Allocation = [10 - 7, 5 - 2, 7 - 5] = [3, 3, 2].",
  },
  {
    id: 150,
    category: "Deadlock",
    difficulty: "sulit",
    type: "pg",
    question:
      "Pada Algoritma Banker, tersedia Available = [3, 3, 2]. Tiga proses memiliki Need: P0=[7, 4, 3], P1=[1, 2, 2], P2=[6, 0, 0]. Proses manakah yang dapat dieksekusi pertama kali?",
    options: ["Hanya P1", "Hanya P0", "Hanya P2", "P0 dan P2"],
    correctAnswer: 0,
    explanation:
      "Hanya P1 yang memenuhi syarat Need <= Available karena [1, 2, 2] <= [3, 3, 2], sedangkan P0 (7>3) dan P2 (6>3) melebihi Available.",
  },
  {
    id: 151,
    category: "Deadlock",
    difficulty: "sulit",
    type: "pg",
    question:
      "Melanjutkan kondisi Work = [3, 3, 2]: jika P1 (Allocation = [2, 0, 0], Need = [1, 2, 2]) dieksekusi hingga selesai, berapakah nilai vektor Work yang baru?",
    options: ["[5, 3, 2]", "[2, 1, 0]", "[4, 5, 4]", "[3, 3, 2]"],
    correctAnswer: 0,
    explanation:
      "Setelah P1 selesai, Allocation[1] dikembalikan ke sistem: Work = [3, 3, 2] + [2, 0, 0] = [5, 3, 2].",
  },
  {
    id: 152,
    category: "Deadlock",
    difficulty: "sulit",
    type: "pg",
    question:
      "Proses P1 mengajukan Request1 = [1, 0, 2]. Diketahui Need1 = [1, 2, 2] dan Available = [3, 3, 2]. Jika sistem melakukan simulasi alokasi sementara (pretend allocation), berapakah nilai sementara Available dan Need1?",
    options: [
      "Available = [2, 3, 0] dan Need1 = [0, 2, 0]",
      "Available = [4, 3, 4] dan Need1 = [2, 2, 4]",
      "Available = [2, 3, 0] dan Need1 = [1, 2, 2]",
      "Available = [3, 3, 2] dan Need1 = [0, 2, 0]",
    ],
    correctAnswer: 0,
    explanation:
      "Available dikurangi Request1 ([3-1, 3-0, 2-2] = [2, 3, 0]) dan Need1 dikurangi Request1 ([1-1, 2-0, 2-2] = [0, 2, 0]).",
  },
  {
    id: 153,
    category: "Deadlock",
    difficulty: "sulit",
    type: "pg",
    question:
      "Apa kompleksitas waktu (time complexity) dari Safety Algorithm pada Algoritma Banker jika terdapat n proses dan m tipe sumber daya?",
    options: ["O(m × n²)", "O(n log n)", "O(m + n)", "O(2ⁿ)"],
    correctAnswer: 0,
    explanation:
      "Safety Algorithm membutuhkan paling banyak O(m × n²) operasi untuk memverifikasi apakah terdapat Safe Sequence.",
  },
  {
    id: 154,
    category: "Deadlock",
    difficulty: "sulit",
    type: "pg",
    question:
      "Pada strategi pencegahan Circular Wait dengan memberikan nomor unik F(Ri) ke setiap tipe sumber daya, aturan apa yang harus dipatuhi proses saat meminta sumber daya?",
    options: [
      "Proses hanya boleh meminta resource dengan nomor urut F(Rj) lebih besar daripada semua resource yang sedang dipegangnya",
      "Proses wajib meminta resource dari nomor urut terbesar ke terkecil",
      "Proses bebas meminta resource dalam urutan acak asalkan kurang dari 3 unit",
      "Proses harus melepaskan CPU setiap kali nomor urut resource genap",
    ],
    correctAnswer: 0,
    explanation:
      "Aturan urutan menaik secara ketat (strictly increasing order) secara matematis memustahilkan terbentuknya siklus tunggu melingkar.",
  },
  {
    id: 155,
    category: "Deadlock",
    difficulty: "sulit",
    type: "pg",
    question:
      'Mengapa state yang berada di dalam kategori "Unsafe State" belum tentu langsung mengalami deadlock pada detik itu juga?',
    options: [
      "Karena proses-proses mungkin melepaskan sebagian resource-nya sebelum benar-benar meminta hingga batas maksimum (Max) yang diklaim di awal",
      "Karena Unsafe State sebenarnya adalah bagian dari Safe State",
      "Karena OS otomatis menambah kapasitas RAM fisik saat memasuki Unsafe State",
      "Karena deadlock hanya bisa terjadi jika Available bernilai negatif",
    ],
    correctAnswer: 0,
    explanation:
      "Algoritma Banker menghitung skenario terburuk (semua proses meminta hingga Max). Jika proses tidak meminta hingga batas Max, deadlock bisa terhindari.",
  },
  {
    id: 156,
    category: "Deadlock",
    difficulty: "sulit",
    type: "pg",
    question:
      "Dalam Algoritma Deteksi Deadlock untuk Multiple Instances (yang menggunakan vektor Work dan Finish), kapan sebuah proses Pi diinisialisasi dengan Finish[i] = true sebelum iterasi pengecekan dimulai?",
    options: [
      "Ketika vektor Allocation[i] bernilai 0 (proses tidak sedang memegang resource apa pun)",
      "Ketika vektor Request[i] lebih besar dari Work",
      "Ketika proses memiliki nilai Max terbesar di sistem",
      "Semua proses selalu diinisialisasi dengan Finish[i] = true",
    ],
    correctAnswer: 0,
    explanation:
      "Proses yang tidak memegang resource sama sekali (Allocation[i] == 0) tidak mungkin ikut mengunci proses lain sehingga langsung ditandai Finish[i] = true.",
  },
  {
    id: 157,
    category: "Deadlock",
    difficulty: "sulit",
    type: "pg",
    question:
      "Ketika melakukan Rollback pada proses korban (victim) untuk memulihkan sistem dari deadlock, pendekatan Total Rollback berarti:",
    options: [
      "Menghentikan (abort) proses korban sepenuhnya dan me-restart-nya kembali dari awal eksekusi",
      "Mengembalikan proses hanya satu baris instruksi ke belakang",
      "Me-restart seluruh sistem operasi dan hardware komputer",
      "Menghapus riwayat log proses tanpa melepaskan resource-nya",
    ],
    correctAnswer: 0,
    explanation:
      "Total Rollback adalah metode paling sederhana karena OS tidak perlu menyimpan checkpoint state menengah dari proses korban.",
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
  {
    id: 158,
    category: "Deadlock",
    difficulty: "sulit",
    type: "esai",
    question:
      "Mengembalikan eksekusi proses korban ke titik aman sebelumnya (checkpoint) atau ke awal untuk memulihkan sistem dari deadlock disebut... (satu kata bahasa Inggris)?",
    expectedKeywords: ["rollback"],
    explanation:
      "Rollback membatalkan status proses korban agar sumber daya yang dipegangnya dapat dibebaskan kembali.",
  },
  {
    id: 159,
    category: "Deadlock",
    difficulty: "sulit",
    type: "esai",
    question:
      "Kondisi kebuntuan di mana dua atau lebih proses terus-menerus mengubah statusnya sebagai respons terhadap perubahan proses lain tanpa menghasilkan progres berguna disebut?",
    expectedKeywords: ["livelock"],
    explanation:
      "Berbeda dengan deadlock yang diam/terblokir, pada livelock proses terus aktif bergerak namun saling menghalangi secara berulang.",
  },
  {
    id: 160,
    category: "Deadlock",
    difficulty: "sulit",
    type: "esai",
    question:
      "Dalam Algoritma Deteksi Deadlock untuk single-instance resource, graf yang diturunkan dari RAG dengan menghapus simpul resource dan menyisakan simpul proses saja disebut Wait-For... (satu kata bahasa Inggris)?",
    expectedKeywords: ["graph", "graf"],
    explanation:
      "Wait-For Graph hanya memuat simpul proses dan panah ketergantungan antar-proses.",
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  ...CPU_QUIZ_QUESTIONS,
  ...DEADLOCK_QUIZ_QUESTIONS,
];
