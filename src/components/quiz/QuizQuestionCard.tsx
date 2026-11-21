import React, { useMemo } from "react";
import {
  ArrowLeft,
  BookOpen,
  ChevronsLeft,
  ChevronsRight,
  Cpu,
  RotateCcw,
  Send,
  ShieldAlert,
} from "lucide-react";
import { QuizQuestion } from "../../types";
import { DifficultyLevel, getPaginationItems } from "./quizHelpers";

interface QuizQuestionCardProps {
  moduleType: "cpu" | "deadlock";
  difficulty: DifficultyLevel;
  questions: QuizQuestion[];
  currentIndex: number;
  userAnswers: Record<number, number | string>;
  essayDrafts: Record<number, string>;
  onSelectOption: (questionId: number, optionIdx: number) => void;
  onEssayDraftChange: (questionId: number, value: string) => void;
  onSubmitEssay: (questionId: number) => void;
  onNavigate: (index: number) => void;
  onFinish: () => void;
  onExit: () => void;
}

interface ShuffledOption {
  text: string;
  originalIndex: number;
}

function shuffleArray<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const DIFFICULTY_TEXT_CLASSES: Record<DifficultyLevel, string> = {
  mudah: "text-[#06684A] dark:text-emerald-400",
  sedang: "text-[#B44D08] dark:text-amber-400",
  sulit: "text-[#BE123C] dark:text-rose-400",
};

const MODULE_THEME = {
  cpu: {
    optionHover: "hover:border-blue-400 dark:hover:border-blue-500",
    inputFocus: "focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
    submitButton:
      "bg-blue-600 dark:bg-blue-500 text-white dark:text-slate-950 hover:bg-blue-700 dark:hover:bg-blue-400",
    explanationBox:
      "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/50",
    explanationTitle: "text-blue-700 dark:text-blue-400",
    pageCurrent:
      "bg-blue-600 dark:bg-blue-500 border-blue-600 dark:border-blue-500 text-white dark:text-slate-950 font-extrabold shadow-xs",
    pageAnswered:
      "bg-blue-50 dark:bg-blue-950/60 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300 hover:bg-blue-100 hover:border-blue-500 dark:hover:bg-blue-900/70 dark:hover:border-blue-400",
    pageUnanswered:
      "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-700 dark:hover:bg-blue-950/60 dark:hover:border-blue-500 dark:hover:text-blue-300",
    navButtonHover:
      "hover:bg-blue-600 hover:text-white hover:border-blue-600 dark:hover:bg-blue-500 dark:hover:text-slate-950 dark:hover:border-blue-500",
  },
  deadlock: {
    optionHover: "hover:border-emerald-400 dark:hover:border-emerald-500",
    inputFocus: "focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500",
    submitButton:
      "bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-950 hover:bg-emerald-700 dark:hover:bg-emerald-400",
    explanationBox:
      "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/50",
    explanationTitle: "text-emerald-700 dark:text-emerald-400",
    pageCurrent:
      "bg-emerald-600 dark:bg-emerald-500 border-emerald-600 dark:border-emerald-500 text-white dark:text-slate-950 font-extrabold shadow-xs",
    pageAnswered:
      "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 hover:border-emerald-500 dark:hover:bg-emerald-900/70 dark:hover:border-emerald-400",
    pageUnanswered:
      "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 hover:border-emerald-400 hover:text-emerald-700 dark:hover:bg-emerald-950/60 dark:hover:border-emerald-500 dark:hover:text-emerald-300",
    navButtonHover:
      "hover:bg-emerald-600 hover:text-white hover:border-emerald-600 dark:hover:bg-emerald-500 dark:hover:text-slate-950 dark:hover:border-emerald-500",
  },
} as const;

export const QuizQuestionCard: React.FC<QuizQuestionCardProps> = ({
  moduleType,
  difficulty,
  questions,
  currentIndex,
  userAnswers,
  essayDrafts,
  onSelectOption,
  onEssayDraftChange,
  onSubmitEssay,
  onNavigate,
  onFinish,
  onExit,
}) => {
  const isCpu = moduleType === "cpu";
  const theme = MODULE_THEME[moduleType];
  const currentQ = questions[currentIndex] || questions[0];
  const totalQuestions = questions.length;

  const shuffledOptionsMap = useMemo(() => {
    const map: Record<number, ShuffledOption[]> = {};
    for (const q of questions) {
      if (q.type === "pg" && q.options) {
        map[q.id] = shuffleArray(
          q.options.map((text, originalIndex) => ({
            text,
            originalIndex,
          })),
        );
      }
    }
    return map;
  }, [questions]);

  const paginationItems = useMemo(
    () => getPaginationItems(currentIndex + 1, totalQuestions),
    [currentIndex, totalQuestions],
  );

  if (!currentQ) return null;

  const currentAnswer = userAnswers[currentQ.id];
  const isAnswered = currentAnswer !== undefined;
  const currentOptions =
    shuffledOptionsMap[currentQ.id] ??
    currentQ.options?.map((text, originalIndex) => ({
      text,
      originalIndex,
    })) ??
    [];

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fadeIn">
      <button
        type="button"
        onClick={onExit}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Ganti Paket Soal</span>
      </button>

      {/* Header Bar */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="text-white">
              {isCpu ? (
                <div className="bg-linear-to-tr from-from to-to p-2.5 rounded-xl">
                  <Cpu className="w-5 h-5" />
                </div>
              ) : (
                <div className="bg-emerald-600 shadow-emerald-500/20 p-2.5 rounded-xl">
                  <ShieldAlert className="w-5 h-5" />
                </div>
              )}
            </div>
            <div className="">
              <h2 className="text-lg font-bold text-ink">
                {isCpu ? "Kuis Penjadwalan CPU" : "Kuis Penanganan Deadlock"}
              </h2>
              <p className="text-xs text-muted">
                Paket:{" "}
                <span
                  className={`${DIFFICULTY_TEXT_CLASSES[difficulty]} font-bold capitalize`}
                >
                  {difficulty}
                </span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onExit}
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Keluar / Ganti Paket"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Lembar Pertanyaan Aktif */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
        <h3 className="text-ink font-bold leading-snug">
          {currentIndex + 1}. {currentQ.question}
        </h3>

        {currentQ.type === "pg" ? (
          <div className="space-y-2.5">
            {currentOptions.map((item, visualIdx) => {
              const isSelected = currentAnswer === item.originalIndex;
              const isCorrect = item.originalIndex === currentQ.correctAnswer;

              let style = `bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 ${theme.optionHover} text-slate-700 dark:text-slate-200`;

              if (isAnswered) {
                if (isCorrect) {
                  style =
                    "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 font-bold";
                } else if (isSelected) {
                  style =
                    "bg-rose-50 dark:bg-rose-950/60 border-rose-400 dark:border-rose-700 text-rose-800 dark:text-rose-200 font-bold";
                } else {
                  style =
                    "opacity-50 bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400";
                }
              }

              return (
                <button
                  key={item.originalIndex}
                  type="button"
                  onClick={() =>
                    onSelectOption(currentQ.id, item.originalIndex)
                  }
                  disabled={isAnswered}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center gap-3 ${style}`}
                >
                  <span
                    className={`w-7 h-7 rounded-lg font-mono text-xs font-bold flex items-center justify-center shrink-0 ${
                      isAnswered && isCorrect
                        ? "bg-emerald-500 text-white"
                        : isAnswered && isSelected
                          ? "bg-rose-500 text-white"
                          : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    {String.fromCharCode(65 + visualIdx)}
                  </span>
                  <div className="flex-1 text-sm leading-relaxed">
                    {item.text}
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="space-y-3">
            <input
              type="text"
              value={
                essayDrafts[currentQ.id] ?? (currentAnswer as string) ?? ""
              }
              disabled={isAnswered}
              onChange={(e) => onEssayDraftChange(currentQ.id, e.target.value)}
              placeholder="Ketik jawaban singkat (1-2 kata)..."
              className={`w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-200 ${theme.inputFocus} focus:outline-none transition-all disabled:opacity-70`}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isAnswered) {
                  onSubmitEssay(currentQ.id);
                }
              }}
            />
            {!isAnswered && (
              <button
                type="button"
                onClick={() => onSubmitEssay(currentQ.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl ${theme.submitButton} font-bold text-xs transition-all shadow-sm`}
              >
                <Send className="w-3.5 h-3.5" /> Simpan Jawaban
              </button>
            )}
          </div>
        )}

        {/* Pembahasan Langsung */}
        {isAnswered && (
          <div
            className={`p-4 rounded-xl border space-y-2 ${theme.explanationBox}`}
          >
            <p
              className={`text-xs font-bold flex items-center gap-1.5 ${theme.explanationTitle}`}
            >
              <BookOpen className="w-4 h-4" /> Pembahasan:
            </p>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {currentQ.explanation}
            </p>
          </div>
        )}

        {/* Navigasi Nomor Soal */}
        <nav
          aria-label="Navigasi nomor soal"
          className="flex flex-wrap items-center justify-center gap-1.5 pt-5 border-t border-slate-100 dark:border-slate-800 mt-2"
        >
          {currentIndex > 0 && (
            <button
              type="button"
              onClick={() => onNavigate(currentIndex - 1)}
              className={`h-8 px-3 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 ${theme.navButtonHover} inline-flex items-center gap-1 transition-colors cursor-pointer`}
            >
              <ChevronsLeft className="w-3.5 h-3.5" />
              <span>Sebelumnya</span>
            </button>
          )}

          {paginationItems.map((item, idx) => {
            if (item === "ellipsis") {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="h-8 px-2.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center justify-center select-none"
                >
                  ...
                </span>
              );
            }

            const targetIndex = item - 1;
            const targetQuestion = questions[targetIndex];
            const isCurrent = targetIndex === currentIndex;
            const isTargetAnswered =
              targetQuestion && userAnswers[targetQuestion.id] !== undefined;

            let itemClass: string = theme.pageUnanswered;

            if (isCurrent) {
              itemClass = theme.pageCurrent;
            } else if (isTargetAnswered) {
              itemClass = theme.pageAnswered;
            }

            return (
              <button
                key={item}
                type="button"
                onClick={() => onNavigate(targetIndex)}
                aria-current={isCurrent ? "page" : undefined}
                className={`h-8 min-w-[32px] px-2.5 rounded-md border text-xs font-bold font-mono transition-colors cursor-pointer ${itemClass}`}
              >
                {item}
              </button>
            );
          })}

          {currentIndex < totalQuestions - 1 ? (
            <button
              type="button"
              onClick={() => onNavigate(currentIndex + 1)}
              className={`h-8 px-3 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 ${theme.navButtonHover} inline-flex items-center gap-1 transition-colors cursor-pointer`}
            >
              <span>Berikutnya</span>
              <ChevronsRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onFinish}
              className="h-8 px-3.5 rounded-md bg-emerald-600 dark:bg-emerald-500 border border-emerald-600 dark:border-emerald-500 text-xs font-bold text-white dark:text-slate-950 hover:bg-emerald-700 dark:hover:bg-emerald-400 transition-colors shadow-xs cursor-pointer"
            >
              Selesai Kuis
            </button>
          )}
        </nav>
      </div>
    </div>
  );
};
