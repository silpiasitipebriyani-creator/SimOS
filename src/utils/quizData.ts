import { QuizQuestion } from '../types';

export const CPU_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: 'CPU Scheduling',
    question: 'Fenomena apa yang terjadi pada algoritma FCFS ketika proses dengan burst time sangat panjang tiba lebih dulu dan menahan banyak proses pendek di belakangnya?',
    options: [
      'Starvation Effect',
      'Convoy Effect (Efek Konvoi)',
      'Aging Phenomenon',
      'Priority Inversion'
    ],
    correctAnswer: 1,
    explanation: 'Convoy Effect adalah fenomena khas FCFS di mana satu proses CPU-bound yang besar memonopoli CPU, sehingga proses-proses I/O-bound atau proses berdurasi pendek harus mengantre lama, menurunkan utilisasi perangkat secara keseluruhan.'
  },
  {
    id: 2,
    category: 'CPU Scheduling',
    question: 'Manakah pernyataan yang BENAR mengenai algoritma Shortest Job First (SJF)?',
    options: [
      'Selalu menjamin tidak akan pernah terjadi starvation pada proses panjang',
      'Secara matematis optimal dalam menghasilkan rata-rata waktu tunggu (Average Waiting Time) minimum',
      'Mudah diimplementasikan secara sempurna pada sistem operasi nyata tanpa perlu memprediksi durasi CPU burst',
      'Merupakan algoritma preemptive murni yang menggunakan time quantum'
    ],
    correctAnswer: 1,
    explanation: 'SJF terbukti secara matematis optimal karena menjadwalkan proses tercepat lebih dulu, yang meminimalkan total akumulasi waktu tunggu. Namun di sistem nyata, durasi burst time berikutnya sulit diprediksi secara presisi dan proses berdurasi panjang berisiko starvation.'
  },
  {
    id: 3,
    category: 'CPU Scheduling',
    question: 'Jika Time Quantum pada algoritma Round Robin (RR) diset bernilai sangat besar (mendekati tak hingga), maka perilaku algoritma tersebut akan identik dengan:',
    options: [
      'Shortest Remaining Time First (SRTF)',
      'First-Come, First-Served (FCFS)',
      'Priority Scheduling Preemptive',
      'Multilevel Feedback Queue'
    ],
    correctAnswer: 1,
    explanation: 'Jika quantum waktu lebih besar daripada burst time proses terpanjang, setiap proses akan selesai dalam satu giliran tanpa pernah dipotong oleh timer. Akibatnya proses dieksekusi murni berdasarkan urutan kedatangan FIFO, persis seperti FCFS.'
  },
  {
    id: 4,
    category: 'CPU Scheduling',
    question: 'Diberikan Proses P1 dengan Arrival Time = 2, Completion Time = 10, dan Burst Time = 5. Berapakah nilai Turnaround Time (TAT) dan Waiting Time (WT)?',
    options: [
      'TAT = 8, WT = 3',
      'TAT = 10, WT = 5',
      'TAT = 12, WT = 7',
      'TAT = 5, WT = 2'
    ],
    correctAnswer: 0,
    explanation: 'Rumus: TAT = Completion Time - Arrival Time = 10 - 2 = 8. Rumus WT = TAT - Burst Time = 8 - 5 = 3. Jadi TAT = 8 unit waktu dan WT = 3 unit waktu.'
  },
  {
    id: 5,
    category: 'CPU Scheduling',
    question: 'Apa konsekuensi buruk jika Time Quantum pada Round Robin diset terlalu kecil (misalnya mendekati 1 mikrodetik)?',
    options: [
      'Terjadi kebocoran memori (memory leak)',
      'Overhead pergantian konteks (context switch) menjadi sangat tinggi sehingga efisiensi kerja CPU anjlok',
      'Proses pendek akan mengalami starvation',
      'Sistem otomatis berubah menjadi FCFS'
    ],
    correctAnswer: 1,
    explanation: 'Context switch membutuhkan siklus CPU untuk menyimpan register proses lama dan memuat register proses baru. Jika quantum terlalu kecil, CPU menghabiskan porsi waktu yang sangat besar hanya untuk berpindah-pindah antar proses daripada mengerjakan instruksi nyata.'
  },
  {
    id: 6,
    category: 'CPU Scheduling',
    question: 'Perbedaan utama antara penjadwalan Preemptive dan Non-Preemptive adalah:',
    options: [
      'Preemptive tidak menggunakan struktur data antrean (queue)',
      'Pada Preemptive, sistem operasi dapat mengambil alih CPU secara paksa dari proses yang sedang berjalan',
      'Non-Preemptive hanya dapat dijalankan pada komputer multicore',
      'Preemptive tidak memerlukan mekanisme context switch'
    ],
    correctAnswer: 1,
    explanation: 'Pada penjadwalan Preemptive, OS dapat menghentikan sementara proses yang sedang memegang CPU (misalnya karena jatah time slice habis atau tiba proses baru dengan prioritas lebih tinggi). Pada Non-preemptive, proses memegang CPU sampai sukarela selesai atau melakukan I/O.'
  },
  {
    id: 7,
    category: 'CPU Scheduling',
    question: 'Bagaimana cara kerja algoritma Shortest Remaining Time First (SRTF) ketika sebuah proses baru tiba di Ready Queue?',
    options: [
      'Proses baru selalu ditaruh di urutan paling belakang tanpa mengecek sisa waktu',
      'Sisa waktu (remaining time) proses baru dibandingkan dengan sisa waktu proses yang sedang berjalan di CPU; jika lebih kecil, CPU langsung direbut (preempt)',
      'CPU langsung menghentikan semua proses dan me-restart simulasi',
      'Proses baru harus menunggu giliran time quantum berikutnya selesai'
    ],
    correctAnswer: 1,
    explanation: 'SRTF adalah versi preemptive dari SJF. Setiap kali proses baru tiba, OS membandingkan sisa waktu proses baru dengan sisa waktu proses yang sedang berjalan. Jika proses baru memiliki sisa waktu lebih pendek, proses yang sedang berjalan di-preempt.'
  },
  {
    id: 8,
    category: 'CPU Scheduling',
    question: 'Teknik apa yang umum digunakan oleh sistem operasi untuk mengatasi masalah Starvation (kelaparan) pada algoritma berbasis prioritas atau SJF?',
    options: [
      'Aging (secara bertahap menaikkan prioritas proses yang sudah lama menunggu di antrean)',
      'Mematikan mekanisme virtual memory',
      'Meningkatkan clock speed CPU secara dinamis',
      'Mengurangi jumlah core processor yang aktif'
    ],
    correctAnswer: 0,
    explanation: 'Aging adalah teknik di mana prioritas suatu proses secara berkala ditingkatkan seiring bertambahnya waktu tunggu di ready queue. Dengan demikian, proses berdurasi panjang pada akhirnya akan mencapai prioritas tertinggi dan dieksekusi.'
  },
  {
    id: 9,
    category: 'CPU Scheduling',
    question: 'Struktur data apa yang paling dasar dan lazim digunakan untuk mengelola antrean proses pada algoritma First-Come, First-Served (FCFS)?',
    options: [
      'FIFO Queue (First-In, First-Out Queue)',
      'LIFO Stack (Last-In, First-Out Stack)',
      'Binary Search Tree',
      'Circular Linked List ganda berbobot'
    ],
    correctAnswer: 0,
    explanation: 'FCFS secara alamiah menggunakan struktur data antrean FIFO (First-In, First-Out). Proses yang tiba lebih awal dimasukkan ke ekor antrean dan proses di kepala antrean selalu diambil pertama kali untuk dialokasikan ke CPU.'
  },
  {
    id: 10,
    category: 'CPU Scheduling',
    question: 'Metrik "Response Time" (Waktu Respon) didefinisikan sebagai selang waktu dari:',
    options: [
      'Proses tiba di sistem hingga proses tersebut pertama kali mendapatkan alokasi CPU',
      'Proses mulai berjalan di CPU hingga proses tersebut selesai tuntas',
      'Proses tiba di sistem hingga proses tersebut selesai tuntas',
      'Proses meminta I/O hingga operasi I/O tersebut selesai'
    ],
    correctAnswer: 0,
    explanation: 'Response Time adalah waktu yang diukur dari saat proses dimasukkan ke dalam sistem (tiba) sampai CPU pertama kali merespons dan mengeksekusinya (First CPU Allocation - Arrival Time). Metrik ini sangat krusial pada sistem interaktif.'
  }
];

export const DEADLOCK_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 101,
    category: 'Deadlock',
    question: 'Manakah dari berikut ini yang BUKAN merupakan salah satu dari 4 Syarat Coffman terjadinya Deadlock?',
    options: [
      'Mutual Exclusion',
      'Hold and Wait',
      'Preemptive Resource Allocation',
      'Circular Wait'
    ],
    correctAnswer: 2,
    explanation: '4 Syarat Coffman adalah: (1) Mutual Exclusion, (2) Hold and Wait, (3) No Preemption (bukan preemptive!), dan (4) Circular Wait. Keempat syarat ini harus terpenuhi secara simultan agar deadlock dapat terjadi.'
  },
  {
    id: 102,
    category: 'Deadlock',
    question: 'Pada Algoritma Banker (Banker\'s Algorithm), bagaimana rumus perhitungan matriks Kebutuhan (Need Matrix)?',
    options: [
      'Need = Allocation + Available',
      'Need = Max - Allocation',
      'Need = Max + Available',
      'Need = Allocation - Available'
    ],
    correctAnswer: 1,
    explanation: 'Matriks Need menunjukkan sisa sumber daya yang masih mungkin diminta oleh suatu proses untuk menyelesaikan pekerjaannya: Need[i][j] = Max[i][j] - Allocation[i][j].'
  },
  {
    id: 103,
    category: 'Deadlock',
    question: 'Manakah pernyataan yang paling akurat mengenai hubungan antara "Safe State" dan "Deadlock"?',
    options: [
      'Unsafe State selalu berarti sistem saat itu juga telah mengalami deadlock',
      'Safe State menjamin tidak akan terjadi deadlock; Unsafe State berpotensi/berisiko memicu deadlock',
      'Deadlock hanya bisa terjadi di dalam Safe State',
      'Tidak ada perbedaan antara Safe State dan Unsafe State pada Banker\'s Algorithm'
    ],
    correctAnswer: 1,
    explanation: 'Safe State berarti ada minimal satu urutan alokasi (Safe Sequence) yang menjamin semua proses selesai tanpa macet. Unsafe State bukan berarti langsung deadlock, melainkan sistem tidak dapat lagi menjamin pencegahan deadlock jika proses meminta klaim maksimumnya.'
  },
  {
    id: 104,
    category: 'Deadlock',
    question: 'Dalam Algoritma Banker (Safety Algorithm), proses Pi dapat dialokasikan sumber daya dan dieksekusi jika memenuhi syarat:',
    options: [
      'Need[i] ≤ Work (di mana Work diinisialisasi dari Available)',
      'Allocation[i] ≤ Need[i]',
      'Max[i] ≤ Available',
      'Work ≤ Allocation[i]'
    ],
    correctAnswer: 0,
    explanation: 'Kriteria eksekusi: proses Pi yang belum selesai (Finish[i] == false) dapat dijalankan jika sumber daya kerja yang tersedia mencukupi kebutuhan sisanya: Need[i][j] <= Work[j] untuk semua jenis sumber daya j.'
  },
  {
    id: 105,
    category: 'Deadlock',
    question: 'Setelah proses Pi selesai dieksekusi dalam Algoritma Banker, apa yang terjadi pada vektor Work?',
    options: [
      'Work dikurangi sebesar Need[i]',
      'Work ditambah sebesar Allocation[i]',
      'Work direset menjadi 0',
      'Work diganti menjadi nilai Max[i]'
    ],
    correctAnswer: 1,
    explanation: 'Ketika proses selesai, ia melepaskan seluruh sumber daya yang sebelumnya telah dialokasikan kepadanya. Oleh karena itu: Work = Work + Allocation[i].'
  },
  {
    id: 106,
    category: 'Deadlock',
    question: 'Metode penanganan deadlock yang mengizinkan sistem masuk ke status deadlock lalu secara berkala mendeteksinya dan memulihkan sistem disebut:',
    options: [
      'Deadlock Prevention',
      'Deadlock Avoidance (Penghindaran)',
      'Deadlock Detection and Recovery',
      'Mutual Exclusion Protocol'
    ],
    correctAnswer: 2,
    explanation: 'Pendekatan deteksi & pemulihan membiarkan deadlock terjadi tanpa pembatasan ketat saat alokasi, lalu menjalankan algoritma deteksi berkala. Jika ditemukan siklus macet, sistem melakukan abort proses atau preemption sumber daya.'
  },
  {
    id: 107,
    category: 'Deadlock',
    question: 'Bagaimana cara mencegah (Deadlock Prevention) syarat "Hold and Wait" terjadi pada sistem operasi?',
    options: [
      'Mewajibkan proses meminta semua sumber daya yang diperlukannya sekaligus di awal, atau hanya boleh meminta sumber daya baru saat tidak memegang sumber daya apa pun',
      'Mengizinkan setiap proses mengambil alih CPU secara paksa setiap saat',
      'Menghapus matriks Allocation dan Max dari sistem',
      'Membuat semua sumber daya menjadi read-only'
    ],
    correctAnswer: 0,
    explanation: 'Untuk mencegah syarat Hold and Wait, sistem dapat menerapkan protokol: proses harus meminta dan dialokasikan semua sumber daya yang dibutuhkannya sebelum memulai eksekusi, atau proses hanya diizinkan meminta sumber daya tambahan jika saat itu ia tidak sedang memegang sumber daya lain.'
  },
  {
    id: 108,
    category: 'Deadlock',
    question: 'Pada Resource Allocation Graph (RAG), jika setiap jenis sumber daya hanya memiliki tepat SATU instans (single instance), keberadaan siklus (cycle) pada graf menandakan:',
    options: [
      'Deadlock pasti terjadi (syarat perlu dan cukup)',
      'Sistem dipastikan berada dalam Safe State',
      'Deadlock tidak mungkin terjadi',
      'Sistem otomatis melakukan reboot'
    ],
    correctAnswer: 0,
    explanation: 'Jika setiap tipe sumber daya hanya memiliki 1 instans, adanya siklus pada Resource Allocation Graph merupakan syarat perlu dan cukup (necessary and sufficient) bahwa deadlock telah terjadi.'
  },
  {
    id: 109,
    category: 'Deadlock',
    question: 'Pada Uji Permintaan Sumber Daya (Resource-Request Algorithm) Banker, apa syarat pertama yang harus diperiksa sebelum sistem mengecek ketersediaan (Available)?',
    options: [
      'Request[i] ≤ Need[i] (permintaan tidak boleh melebihi klaim maksimum sisa kebutuhan)',
      'Request[i] > Max[i]',
      'Available ≤ Request[i]',
      'Allocation[i] == 0'
    ],
    correctAnswer: 0,
    explanation: 'Pemeriksaan pertama adalah memastikan Request[i] <= Need[i]. Jika proses meminta sumber daya melebihi nilai Need yang telah dideklarasikannya, sistem akan langsung menolak permintaan dengan pesan kesalahan error.'
  },
  {
    id: 110,
    category: 'Deadlock',
    question: 'Strategi pencegahan Circular Wait yang paling praktis dan umum diterapkan adalah:',
    options: [
      'Memberikan nomor urut linear (order number) pada semua sumber daya dan mewajibkan proses meminta sumber daya hanya dalam urutan menaik',
      'Mematikan semua interupsi perangkat keras secara permanen',
      'Menonaktifkan memori virtual dan paging',
      'Membatasi jumlah proses maksimum menjadi tepat 1 proses saja'
    ],
    correctAnswer: 0,
    explanation: 'Havender membuktikan bahwa circular wait dapat dicegah dengan menetapkan penomoran global pada setiap sumber daya. Proses hanya diperbolehkan meminta sumber daya dengan nomor urut yang lebih tinggi dari sumber daya yang sedang dipegangnya.'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  ...CPU_QUIZ_QUESTIONS,
  ...DEADLOCK_QUIZ_QUESTIONS,
];
