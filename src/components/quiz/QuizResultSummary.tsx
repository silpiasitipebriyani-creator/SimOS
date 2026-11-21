import React, { useMemo } from "react";
import { BarChart2 } from "lucide-react";
import { QuizQuestion } from "../../types";
import {
  DifficultyLevel,
  calculateQuizStats,
  isQuestionCorrect,
} from "./quizHelpers";

interface QuizResultSummaryProps {
  moduleType?: "cpu" | "deadlock";
  difficulty: DifficultyLevel;
  questions: QuizQuestion[];
  userAnswers: Record<number, number | string>;
  onResetToPackages: () => void;
}

const DIFFICULTY_TEXT_CLASSES: Record<DifficultyLevel, string> = {
  mudah: "text-[#06684A] dark:text-emerald-400",
  sedang: "text-[#B44D08] dark:text-amber-400",
  sulit: "text-[#BE123C] dark:text-rose-400",
};

const DISCUSSION_THEME = {
  cpu: {
    sectionIcon: "text-blue-600 dark:text-blue-400",
    box: "bg-blue-50/70 dark:bg-blue-950/30 border-l-4 border-blue-600 dark:border-blue-500",
    title: "text-blue-700 dark:text-blue-400",
  },
  deadlock: {
    sectionIcon: "text-emerald-600 dark:text-emerald-400",
    box: "bg-emerald-50/70 dark:bg-emerald-950/30 border-l-4 border-emerald-600 dark:border-emerald-500",
    title: "text-emerald-700 dark:text-emerald-400",
  },
} as const;

export const QuizResultSummary: React.FC<QuizResultSummaryProps> = ({
  moduleType,
  difficulty,
  questions,
  userAnswers,
  onResetToPackages,
}) => {
  const { total, correct, wrong, percentage } = useMemo(
    () => calculateQuizStats(questions, userAnswers),
    [questions, userAnswers],
  );

  const resolvedModule: "cpu" | "deadlock" =
    moduleType ?? (questions[0]?.category === "Deadlock" ? "deadlock" : "cpu");
  const discussionTheme = DISCUSSION_THEME[resolvedModule];

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fadeIn">
      {/* Kartu Ringkasan Skor */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Kuis Selesai! Paket{" "}
              <span className={DIFFICULTY_TEXT_CLASSES[difficulty]}>
                {difficulty.toUpperCase()}
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Berikut adalah ringkasan skor dan riwayat pembahasan lengkap untuk{" "}
              {total} butir soal.
            </p>
          </div>
          <button
            type="button"
            onClick={onResetToPackages}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white dark:bg-blue-500 dark:text-slate-950 font-bold text-xs hover:bg-blue-700 dark:hover:bg-blue-400 transition-all shrink-0 cursor-pointer"
          >
            Pilih Paket Lain
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-blue-50 dark:bg-slate-950/60 border border-blue-200 dark:border-blue-500/30 flex flex-col items-center justify-center text-center space-y-1">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Nilai Akhir
            </span>
            <span className="text-2xl font-black text-blue-600 dark:text-blue-400">
              {percentage}
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500">
              Skor (0-100)
            </span>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-slate-950/60 border border-emerald-200 dark:border-emerald-500/30 flex flex-col items-center justify-center text-center space-y-1">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Jawaban Benar
            </span>
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
              {correct}
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500">
              Soal
            </span>
          </div>

          <div className="p-4 rounded-xl bg-rose-50 dark:bg-slate-950/60 border border-rose-200 dark:border-rose-500/30 flex flex-col items-center justify-center text-center space-y-1">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Jawaban Salah
            </span>
            <span className="text-2xl font-black text-rose-600 dark:text-rose-400">
              {wrong}
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500">
              Soal
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-700/50 flex flex-col items-center justify-center text-center space-y-1">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Total Soal
            </span>
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              {total}
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500">
              15 PG + 5 Isian
            </span>
          </div>
        </div>
      </div>

      {/* Daftar Riwayat Jawaban & Pembahasan */}
      <div className="space-y-4">
        <h4 className="text-ink font-bold flex items-center gap-2">
          <BarChart2 className={`w-5 h-5 ${discussionTheme.sectionIcon}`} />
          Riwayat Jawaban & Pembahasan
        </h4>

        {questions.map((q, idx) => {
          const userAnswer = userAnswers[q.id];
          const isCorrect = isQuestionCorrect(q, userAnswer);
          const displayedAnswer =
            q.type === "pg"
              ? userAnswer !== undefined
                ? q.options?.[Number(userAnswer)]
                : "Tidak dijawab"
              : (userAnswer as string) || "Tidak dijawab";

          return (
            <div
              key={q.id}
              className={`p-5 rounded-xl border bg-white dark:bg-slate-900 shadow-sm space-y-3 transition-colors ${
                isCorrect
                  ? "border-emerald-300 dark:border-emerald-500/40"
                  : "border-rose-300 dark:border-rose-500/40"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {idx + 1}. {q.question}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                    q.type === "pg"
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300"
                      : "bg-purple-100 text-purple-700 dark:bg-purple-900/60 dark:text-purple-300"
                  }`}
                >
                  {q.type}
                </span>
              </div>

              <div className="text-xs space-y-1">
                <p className="text-slate-600 dark:text-slate-400">
                  Jawaban Kamu:{" "}
                  <span
                    className={
                      isCorrect
                        ? "text-emerald-600 dark:text-emerald-400 font-bold"
                        : "text-rose-600 dark:text-rose-400 font-bold"
                    }
                  >
                    {displayedAnswer}
                  </span>
                </p>

                {!isCorrect && q.type === "pg" && (
                  <p className="text-emerald-600 dark:text-emerald-400 font-medium">
                    Jawaban Benar: {q.options?.[q.correctAnswer!]}
                  </p>
                )}

                {!isCorrect && q.type === "esai" && (
                  <p className="text-amber-600 dark:text-amber-400 text-[11px] font-medium">
                    Kata Kunci Diharapkan: {q.expectedKeywords?.join(" / ")}
                  </p>
                )}
              </div>

              <div
                className={`p-3 rounded-lg space-y-1 mt-2 ${discussionTheme.box}`}
              >
                <p
                  className={`text-xs font-bold flex items-center gap-1.5 ${discussionTheme.title}`}
                >
                  Pembahasan:
                </p>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {q.explanation}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
