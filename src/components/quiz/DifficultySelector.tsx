import React from "react";
import { ArrowLeft, ArrowRight, Cpu, ShieldAlert } from "lucide-react";
import { DIFFICULTY_PACKAGES, DifficultyLevel } from "./quizHelpers";

interface DifficultySelectorProps {
  moduleType: "cpu" | "deadlock";
  backLabel: string;
  onBackToSimulator: () => void;
  onSelectDifficulty: (difficulty: DifficultyLevel) => void;
}

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  moduleType,
  backLabel,
  onBackToSimulator,
  onSelectDifficulty,
}) => {
  const isCpu = moduleType === "cpu";
  const resolvedBackLabel =
    backLabel ||
    (isCpu ? "Kembali ke Simulator CPU" : "Kembali ke Simulator Deadlock");

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fadeIn">
      <button
        type="button"
        onClick={onBackToSimulator}
        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{resolvedBackLabel}</span>
      </button>

      <div className="p-6 rounded-2xl border border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800 shadow-sm space-y-3 transition-colors">
        <div className="flex items-center gap-3">
          <div
            className={`p-3 rounded-xl text-white shadow-lg ${
              isCpu
                ? "bg-linear-to-tr from-from to-to"
                : "bg-emerald-600 shadow-emerald-500/20"
            }`}
          >
            {isCpu ? (
              <Cpu className="w-6 h-6" />
            ) : (
              <ShieldAlert className="w-6 h-6" />
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {isCpu ? "Kuis Penjadwalan CPU" : "Kuis Penanganan Deadlock"}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Pilih tingkat kesulitan untuk memulai ujian 20 butir soal (15
              Pilihan Ganda + 5 Isian Singkat).
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {DIFFICULTY_PACKAGES.map((pkg) => (
          <div
            key={pkg.id}
            onClick={() => onSelectDifficulty(pkg.id)}
            className={`group flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 cursor-pointer shadow-sm transition-all duration-200 hover:-translate-y-0.5 ${pkg.cardHoverClass}`}
          >
            <div>
              <h3
                className={`text-xl font-bold tracking-tight text-slate-900 dark:text-white transition-colors ${pkg.titleHoverClass}`}
              >
                {pkg.title}
              </h3>
              <p className="mt-2.5 text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed">
                {pkg.description}
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Tingkat kesulitan
                </span>
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  {[1, 2, 3].map((step) => (
                    <span
                      key={step}
                      className={`h-1.5 w-5 rounded-full transition-colors ${
                        step <= pkg.level
                          ? pkg.barActiveClass
                          : "bg-slate-200 dark:bg-slate-700"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                    20 Soal
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                    15 PG
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                    5 Esai
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectDifficulty(pkg.id);
                }}
                className={`w-full py-3 px-4 rounded-xl text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-xs ${pkg.buttonClass}`}
              >
                <span>{pkg.buttonLabel}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
