import React from 'react';
import {
  Cpu,
  ShieldAlert,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Layers,
  Lock,
  RotateCcw,
  Zap,
  Info,
} from 'lucide-react';
import { NavTab } from './Sidebar';
import { Process, DeadlockData } from '../types';

interface DashboardViewProps {
  onNavigate: (tab: NavTab) => void;
  processes: Process[];
  deadlockData: DeadlockData;
  isSafeState: boolean;
  quizScore: { completed: boolean; score: number; total: number };
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  processes,
  deadlockData,
  isSafeState,
  quizScore,
}) => {
  return (
    <div className="space-y-6">
      {/* Top Banner / Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-900 text-white p-6 md:p-8 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold text-blue-100 border border-white/20">
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            Simulator Sistem Operasi Interaktif
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            SimOS: Simulator Penjadwalan CPU & Deadlock
          </h2>
          <p className="text-sm md:text-base text-blue-100/90 leading-relaxed">
            Eksplorasi cara kerja inti sistem operasi melalui simulasi visual real-time algoritma
            penjadwalan proses, analisis keamanan sumber daya algoritma Banker, dan uji kompetensi interaktif.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('cpu')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-blue-700 font-bold text-xs shadow-lg hover:bg-blue-50 transition-all active:scale-95"
            >
              <Cpu className="w-4 h-4" />
              Mulai Simulasi CPU
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('deadlock')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-700/60 hover:bg-blue-700/80 text-white font-semibold text-xs border border-white/20 transition-all active:scale-95"
            >
              <ShieldAlert className="w-4 h-4" />
              Analisis Banker Algoritma
            </button>
          </div>
        </div>

        {/* Decorative backdrop shapes */}
        <div className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
        <div className="absolute right-20 top-0 w-48 h-48 rounded-full bg-indigo-400/20 blur-2xl pointer-events-none" />
      </div>

      {/* Bento Grid: 3 Main Modules Quick Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Module 1 Card */}
        <div
          onClick={() => onNavigate('cpu')}
          className="group cursor-pointer p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 soft-shadow hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Cpu className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              {processes.length} Proses Aktif
            </span>
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-2">
            Penjadwalan CPU
            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
            Simulasi visual interaktif algoritma FCFS, SJF Non-Preemptive, SRTF Preemptive, dan Round Robin dilengkapi Gantt chart & playback langkah demi langkah.
          </p>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 text-[11px] font-medium text-blue-600 dark:text-blue-400">
            <span>Buka Simulator Gantt</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Module 2 Card */}
        <div
          onClick={() => onNavigate('deadlock')}
          className="group cursor-pointer p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 soft-shadow hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all duration-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                isSafeState
                  ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                  : 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300'
              }`}
            >
              {isSafeState ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
              {isSafeState ? 'Safe State' : 'Unsafe State'}
            </span>
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex items-center gap-2">
            Penanganan Deadlock
            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
            Algoritma Banker untuk penghindaran deadlock dengan matriks Allocation, Max, Available, Need, serta pengujian permintaan sumber daya (Resource Request).
          </p>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
            <span>Uji Matriks Banker</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Module 3 Card */}
        <div
          onClick={() => onNavigate('quiz')}
          className="group cursor-pointer p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 soft-shadow hover:border-purple-500/50 dark:hover:border-purple-500/50 transition-all duration-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300">
              {quizScore.completed ? `Skor: ${quizScore.score}/${quizScore.total}` : '12 Soal Siap'}
            </span>
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors flex items-center gap-2">
            Kuis & Evaluasi Teori
            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
            Uji pemahaman komprehensif Anda tentang algoritma penjadwalan, konsep preemption, dan mekanisme deadlock dengan penilaian otomatis dan pembahasan teori lengkap.
          </p>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 text-[11px] font-medium text-purple-600 dark:text-purple-400">
            <span>Mulai Uji Kompetensi</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Theory & Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 4 Syarat Coffman Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 soft-shadow space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-rose-500" />
                4 Syarat Coffman Terjadinya Deadlock
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Deadlock hanya dapat terjadi jika keempat kondisi ini terpenuhi secara simultan.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                <span className="w-5 h-5 rounded-md bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center text-[11px]">
                  1
                </span>
                Mutual Exclusion
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Minimal ada satu sumber daya non-shareable yang hanya boleh diakses oleh satu proses dalam satu waktu.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                <span className="w-5 h-5 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center text-[11px]">
                  2
                </span>
                Hold and Wait
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Sebuah proses sedang menahan sumber daya yang sudah dialokasikan sambil menunggu sumber daya tambahan lain.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                <span className="w-5 h-5 rounded-md bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center text-[11px]">
                  3
                </span>
                No Preemption
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Sumber daya tidak bisa diambil paksa oleh sistem operasi; hanya bisa dilepaskan secara sukarela oleh proses pemiliknya.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                <span className="w-5 h-5 rounded-md bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center text-[11px]">
                  4
                </span>
                Circular Wait
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Terdapat rantai siklis proses {'{P0, P1, ..., Pn}'} di mana P0 menunggu sumber daya milik P1, dan Pn menunggu sumber daya milik P0.
              </p>
            </div>
          </div>
        </div>

        {/* Kriteria Kinerja CPU Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 soft-shadow space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              Metrik & Kriteria Penjadwalan CPU
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Formula standar evaluasi efisiensi algoritma penjadwalan.
            </p>
          </div>

          <div className="space-y-2.5">
            <div className="flex items-start justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Turnaround Time (TAT)
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Total selang waktu dari proses tiba hingga proses selesai tuntas.
                </p>
              </div>
              <code className="text-[11px] font-mono px-2 py-1 rounded-md bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 font-semibold shrink-0">
                TAT = CT - AT
              </code>
            </div>

            <div className="flex items-start justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Waiting Time (WT)
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Total waktu yang dihabiskan proses di dalam Ready Queue menunggu giliran CPU.
                </p>
              </div>
              <code className="text-[11px] font-mono px-2 py-1 rounded-md bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-semibold shrink-0">
                WT = TAT - BT
              </code>
            </div>

            <div className="flex items-start justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Response Time (RT)
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Waktu dari saat proses tiba sampai CPU pertama kali dialokasikan kepadanya.
                </p>
              </div>
              <code className="text-[11px] font-mono px-2 py-1 rounded-md bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 font-semibold shrink-0">
                RT = First_CPU - AT
              </code>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 soft-shadow space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-600" />
            Matriks Perbandingan Algoritma Penjadwalan CPU
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Perbandingan komparatif karakteristik 4 algoritma yang disimulasikan.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-2.5 px-3">Algoritma</th>
                <th className="py-2.5 px-3">Tipe Eksekusi</th>
                <th className="py-2.5 px-3">Kelebihan Utama</th>
                <th className="py-2.5 px-3">Kelemahan / Risiko</th>
                <th className="py-2.5 px-3">Risiko Starvation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">
                  FCFS (First-Come, First-Served)
                </td>
                <td className="py-3 px-3">
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-[11px]">
                    Non-Preemptive
                  </span>
                </td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                  Sangat sederhana, adil terhadap urutan antrean, minim overhead.
                </td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                  Rata-rata waktu tunggu tinggi karena rentan <strong className="text-rose-500">Convoy Effect</strong>.
                </td>
                <td className="py-3 px-3">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-medium">
                    Tidak ada
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">
                  SJF (Shortest Job First)
                </td>
                <td className="py-3 px-3">
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-[11px]">
                    Non-Preemptive
                  </span>
                </td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                  Secara matematis optimal menghasilkan <strong>Average Waiting Time</strong> terendah.
                </td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                  Sulit mengetahui Burst Time proses berikutnya di dunia nyata tanpa estimasi.
                </td>
                <td className="py-3 px-3">
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-medium">
                    Ada (Proses Panjang)
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">
                  SRTF (Shortest Remaining Time First)
                </td>
                <td className="py-3 px-3">
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-semibold text-[11px]">
                    Preemptive
                  </span>
                </td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                  Responsif luar biasa untuk proses baru yang pendek, memotong proses panjang.
                </td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                  Overhead pergantian konteks (context switch) lebih tinggi daripada SJF biasa.
                </td>
                <td className="py-3 px-3">
                  <span className="px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-medium">
                    Tinggi (Proses Panjang)
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">
                  Round Robin (RR)
                </td>
                <td className="py-3 px-3">
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-semibold text-[11px]">
                    Preemptive (Time Slice)
                  </span>
                </td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                  Sangat adil untuk sistem interaktif / multi-user, Response Time sangat cepat.
                </td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                  Performa sangat bergantung pada pemilihan nilai <strong>Time Quantum (q)</strong>.
                </td>
                <td className="py-3 px-3">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-medium">
                    Bebas Starvation
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
