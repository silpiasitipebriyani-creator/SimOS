import React from "react";
import {
  ArrowLeft,
  User,
  Award,
  Clock,
  Cpu,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export interface QuizAttempt {
  id: string;
  module: string;
  score: number;
  total: number;
  date: string;
}

// Interface baru untuk Riwayat Simulator
export interface SimulatorAttempt {
  id: string;
  type: "CPU Scheduling" | "Deadlock";
  algorithm: string; // Contoh: "Round Robin (Q: 2)" atau "Banker's Algorithm"
  summary: string; // Contoh: "Avg Waiting Time: 4.5ms" atau "Status: Safe (Aman)"
  isSafeOrOptimal: boolean; // Menentukan warna status (sukses/aman vs warning)
  date: string;
}

interface ProfileViewProps {
  username: string;
  onBack: () => void;
  quizHistory: QuizAttempt[];
  simulatorHistory: SimulatorAttempt[]; // Menerima data dinamis riwayat simulator
}

export function ProfileView({
  username,
  onBack,
  quizHistory,
  simulatorHistory,
}: ProfileViewProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profil Utama */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-bl-full -z-10 blur-2xl"></div>

            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-gradient-to-tr from-cyan-600 to-blue-600 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-cyan-900/20 border-4 border-white dark:border-slate-800">
                <User className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                {username}
              </h2>
              <p className="text-sm font-medium text-cyan-600 dark:text-cyan-400 mb-4">
                Pengguna SimOS
              </p>

              <div className="w-full grid grid-cols-2 gap-3 mt-2">
                <div className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl p-3">
                  <div className="text-slate-400 text-xs mb-1 flex justify-center">
                    <Award className="w-4 h-4" />
                  </div>
                  <div className="font-bold text-slate-800 dark:text-slate-200 text-lg">
                    {quizHistory.length}
                  </div>
                  <div className="text-[10px] text-slate-500">Kuis Selesai</div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl p-3">
                  <div className="text-slate-400 text-xs mb-1 flex justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="font-bold text-slate-800 dark:text-slate-200 text-lg">
                    {simulatorHistory.length}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Simulasi Dijalankan
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Riwayat Aktivitas (Kuis & Simulator) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Riwayat Kuis */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              Riwayat Kuis
            </h3>

            <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
              {quizHistory.length === 0 ? (
                <div className="text-center py-6 text-slate-400 text-sm">
                  Belum ada kuis yang diselesaikan.
                </div>
              ) : (
                quizHistory.map((quiz) => {
                  const isPassed = quiz.score >= quiz.total * 0.7;
                  return (
                    <div
                      key={quiz.id}
                      className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-2 rounded-lg ${isPassed ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" : "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"}`}
                        >
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                            {quiz.module}
                          </h4>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {quiz.date}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-black text-slate-900 dark:text-white">
                          {quiz.score}
                          <span className="text-sm font-medium text-slate-400">
                            /{quiz.total}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Riwayat Simulator Dinamis */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-blue-500" />
              Riwayat Simulasi Grafis & Kalkulasi
            </h3>

            <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
              {simulatorHistory.length === 0 ? (
                <div className="text-center py-6 text-slate-400 text-sm">
                  Belum ada simulasi yang dicatat. Coba jalankan simulasi CPU
                  atau Deadlock!
                </div>
              ) : (
                simulatorHistory.map((sim) => (
                  <div
                    key={sim.id}
                    className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${sim.type === "Deadlock" ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" : "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"}`}
                      >
                        {sim.type === "Deadlock" ? (
                          <ShieldAlert className="w-5 h-5" />
                        ) : (
                          <Cpu className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                            {sim.type}
                          </h4>
                          <span className="text-[10px] px-2 py-0.5 bg-slate-200 dark:bg-slate-800 rounded font-semibold text-slate-600 dark:text-slate-300">
                            {sim.algorithm}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1 font-mono">
                          {sim.summary}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold rounded-md mb-1 ${sim.isSafeOrOptimal ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400" : "bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400"}`}
                      >
                        {sim.isSafeOrOptimal ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : (
                          <AlertTriangle className="w-3 h-3" />
                        )}
                        {sim.type === "Deadlock"
                          ? sim.isSafeOrOptimal
                            ? "Safe State"
                            : "Unsafe"
                          : "Optimal"}
                      </span>
                      <p className="text-[10px] text-slate-400">{sim.date}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
