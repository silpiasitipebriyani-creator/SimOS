import React from 'react';
import {
  Cpu,
  ShieldAlert,
  ArrowRight,
  GraduationCap,
  Play,
  Sparkles,
  Sun,
  Moon,
  RefreshCw,
  CheckCircle2,
} from 'lucide-react';

interface HomeSelectorProps {
  onSelectModule: (module: 'cpu' | 'deadlock' | 'cpu-quiz' | 'deadlock-quiz') => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onResetData: () => void;
}

export const HomeSelector: React.FC<HomeSelectorProps> = ({
  onSelectModule,
  isDarkMode,
  onToggleDarkMode,
  onResetData,
}) => {
  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-12 space-y-8 animate-fadeIn">
      {/* Title & Introduction */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-900">
          <Sparkles className="w-3.5 h-3.5" />
          Simulator Interaktif Sistem Operasi
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          SimOS
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
          Pilih modul di bawah ini untuk memulai simulasi visual atau menguji pemahaman materi:
        </p>
      </div>

      {/* 2 Main Choice Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Card 1: Penjadwalan CPU */}
        <div className="relative group bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border-2 border-slate-200/80 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 shadow-xl transition-all duration-200 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Cpu className="w-8 h-8" />
              </div>
              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300">
                4 Algoritma
              </span>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Penjadwalan CPU
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Simulasi eksekusi proses CPU menggunakan FCFS, SJF, SRTF, dan Round Robin. Dilengkapi Diagram Gantt interaktif dan kontrol playback per satuan waktu.
              </p>
            </div>

            <div className="space-y-1.5 pt-2 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Visualisasi Diagram Gantt & Playback real-time</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Perhitungan Waiting Time & Turnaround Time</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Dilengkapi kuis evaluasi materi 10 soal</span>
              </div>
            </div>
          </div>

          <div className="pt-8 space-y-2.5">
            <button
              onClick={() => onSelectModule('cpu')}
              className="w-full py-3.5 px-5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all active:scale-98"
            >
              <Play className="w-4 h-4 fill-current" />
              Buka Simulator Penjadwalan CPU
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onSelectModule('cpu-quiz')}
              className="w-full py-2.5 px-4 rounded-xl bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 dark:hover:bg-purple-900/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 font-semibold text-xs flex items-center justify-center gap-2 transition-all active:scale-98"
            >
              <GraduationCap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              Coba Kuis Penjadwalan CPU (10 Soal)
            </button>
          </div>
        </div>

        {/* Card 2: Penanganan Deadlock */}
        <div className="relative group bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border-2 border-slate-200/80 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 shadow-xl transition-all duration-200 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
                Banker's Algorithm
              </span>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Penanganan Deadlock
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Kelola matriks alokasi sumber daya (Allocation, Max, Available, Need) dan jalankan Algoritma Banker untuk mendeteksi Safe State vs Deadlock.
              </p>
            </div>

            <div className="space-y-1.5 pt-2 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Pemeriksaan Keadaan Aman (Safe State) instan</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Rantai Urutan Aman (Safe Sequence) visual</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Dilengkapi kuis evaluasi materi 10 soal</span>
              </div>
            </div>
          </div>

          <div className="pt-8 space-y-2.5">
            <button
              onClick={() => onSelectModule('deadlock')}
              className="w-full py-3.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all active:scale-98"
            >
              <Play className="w-4 h-4 fill-current" />
              Buka Simulator Deadlock
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onSelectModule('deadlock-quiz')}
              className="w-full py-2.5 px-4 rounded-xl bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 dark:hover:bg-purple-900/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 font-semibold text-xs flex items-center justify-center gap-2 transition-all active:scale-98"
            >
              <GraduationCap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              Coba Kuis Deadlock (10 Soal)
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Utility Bar */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 backdrop-blur-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleDarkMode}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold transition-colors"
          >
            {isDarkMode ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span>Mode Terang</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-indigo-600" />
                <span>Mode Gelap</span>
              </>
            )}
          </button>
        </div>

        <div>
          <button
            onClick={onResetData}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-500" />
            Reset Data Preset
          </button>
        </div>
      </div>
    </div>
  );
};