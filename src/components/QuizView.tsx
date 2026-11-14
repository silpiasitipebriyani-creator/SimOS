import React, { useState, useMemo } from "react";
import {
  Award,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Cpu,
  ShieldAlert,
  Send,
  RotateCcw,
  BarChart2,
  Sparkles,
  Zap,
  Flame,
  CheckCircle2,
  XCircle,
  HelpCircle,
} from "lucide-react";
import { QUIZ_QUESTIONS } from "../utils/quizData";
import { QuizQuestion, QuizDifficulty } from "../types";

interface QuizViewProps {
  moduleType: "cpu" | "deadlock";
  quizScore: {
    completed: boolean;
    score: number;
    total: number;
    correct?: number;
    wrong?: number;
    difficulty?: "mudah" | "sedang" | "sulit" | QuizDifficulty;
  };
  onUpdateScore: (score: {
    completed: boolean;
    score: number;
    total: number;
    correct?: number;
    wrong?: number;
    difficulty?: "mudah" | "sedang" | "sulit" | QuizDifficulty;
  }) => void;
  onBackToSimulator: () => void;
  backLabel: string;
}

export const QuizView: React.FC<QuizViewProps> = ({
  moduleType,
  quizScore,
  onUpdateScore,
  onBackToSimulator,
  backLabel,
}) => {
  // State Navigasi Alur Kuis
  const [isStarted, setIsStarted] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    "mudah" | "sedang" | "sulit"
  >("mudah");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<
    Record<number, number | string>
  >({});
  const [essayInputs, setEssayInputs] = useState<Record<number, string>>({});
  const [quizFinished, setQuizFinished] = useState(false);

  const categoryName = moduleType === "cpu" ? "CPU Scheduling" : "Deadlock";

  // Filter 20 soal sesuai kategori dan paket kesulitan
  const questions: QuizQuestion[] = useMemo(() => {
    const filtered = QUIZ_QUESTIONS.filter(
      (q) => q.category === categoryName && q.difficulty === selectedDifficulty,
    );
    return filtered.length > 0
      ? filtered
      : QUIZ_QUESTIONS.filter((q) => q.category === categoryName);
  }, [categoryName, selectedDifficulty]);

  const currentQ = questions[currentIndex] || questions[0];

  const handleStartQuiz = (difficulty: "mudah" | "sedang" | "sulit") => {
    setSelectedDifficulty(difficulty);
    setUserAnswers({});
    setEssayInputs({});
    setCurrentIndex(0);
    setQuizFinished(false);
    setIsStarted(true);
  };

  const isQuestionCorrect = (
    q: QuizQuestion,
    answer: number | string | undefined,
  ): boolean => {
    if (answer === undefined || answer === "") return false;
    if (q.type === "pg") {
      return answer === q.correctAnswer;
    } else {
      const lower = String(answer).toLowerCase().trim();
      const keywords = q.expectedKeywords || [];
      const matchCount = keywords.filter((kw) =>
        lower.includes(kw.toLowerCase()),
      ).length;
      return matchCount >= Math.min(1, keywords.length); // Cukup 1 kata kunci cocok untuk isian singkat
    }
  };

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    if (userAnswers[questionId] !== undefined) return;
    const updatedAnswers = { ...userAnswers, [questionId]: optionIdx };
    setUserAnswers(updatedAnswers);
    checkQuizCompletion(updatedAnswers);
  };

  const handleSubmitEssay = (questionId: number) => {
    const text = essayInputs[questionId] || "";
    if (!text.trim()) return;
    const updatedAnswers = { ...userAnswers, [questionId]: text.trim() };
    setUserAnswers(updatedAnswers);
    checkQuizCompletion(updatedAnswers);
  };

  const checkQuizCompletion = (answers: Record<number, number | string>) => {
    const isAllAnswered = questions.every(
      (q) => answers[q.id] !== undefined && answers[q.id] !== "",
    );
    if (isAllAnswered) {
      finishQuiz(answers);
    }
  };

  const finishQuiz = (answers = userAnswers) => {
    setQuizFinished(true);
    let correctCount = 0;
    questions.forEach((q) => {
      if (isQuestionCorrect(q, answers[q.id])) {
        correctCount++;
      }
    });
    const wrongCount = totalQuestions - correctCount;

    onUpdateScore({
      completed: true,
      score: correctCount,
      total: totalQuestions,
      correct: correctCount,
      wrong: wrongCount,
      difficulty: selectedDifficulty,
    });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleBackToPackageSelection = () => {
    setIsStarted(false);
    setQuizFinished(false);
    setUserAnswers({});
    setEssayInputs({});
    setCurrentIndex(0);
  };

  const totalQuestions = questions.length;
  let scoreCount = 0;
  questions.forEach((q) => {
    if (isQuestionCorrect(q, userAnswers[q.id])) {
      scoreCount++;
    }
  });

  const wrongCount = totalQuestions - scoreCount;
  const percentage = Math.round((scoreCount / (totalQuestions || 1)) * 100);
  const isCpu = moduleType === "cpu";
  const defaultBackLabel = isCpu
    ? "Kembali ke Simulator CPU"
    : "Kembali ke Simulator Deadlock";

  if (!isStarted) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto animate-fadeIn">
        <button
          onClick={onBackToSimulator}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-100 dark:text-cyan-500 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{backLabel || defaultBackLabel}</span>
        </button>

        <div className="p-6 rounded-2xl border border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800 shadow-sm space-y-3 transition-colors">
          <div className="flex items-center gap-3">
            <div
              className={`p-3 rounded-xl text-white shadow-lg ${
                isCpu
                  ? "bg-cyan-600 shadow-cyan-500/20"
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            onClick={() => handleStartQuiz("mudah")}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-500/60 cursor-pointer shadow-sm hover:shadow-md transition-all group hover:scale-[1.02] space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                Level Pemula
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Paket Mudah
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Fokus pada teori dasar, konsep utama, serta definisi istilah
                dasar.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>6 Soal (5 PG, 1 Esai)</span>
              <ArrowRight className="w-4 h-4 text-emerald-500 dark:text-emerald-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div
            onClick={() => handleStartQuiz("sedang")}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-400 dark:hover:border-cyan-500/60 cursor-pointer shadow-sm hover:shadow-md transition-all group hover:scale-[1.02] space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                <Zap className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-cyan-100 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/20">
                Level Menengah
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                Paket Sedang
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Menguji pemahaman alur kerja algoritma, analisis kasus, dan
                kelebihan/kekurangan sistem.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>7 Soal (5 PG, 2 Esai)</span>
              <ArrowRight className="w-4 h-4 text-cyan-500 dark:text-cyan-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div
            onClick={() => handleStartQuiz("sulit")}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-rose-400 dark:hover:border-rose-500/60 cursor-pointer shadow-sm hover:shadow-md transition-all group hover:scale-[1.02] space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 flex items-center justify-center text-rose-600 dark:text-rose-400">
                <Flame className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-rose-100 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20">
                Level Lanjut
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                Paket Sulit
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Perhitungan matematis Turnaround Time, Waiting Time, serta
                simulasi matriks Banker.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>7 Soal (5 PG, 2 Esai)</span>
              <ArrowRight className="w-4 h-4 text-rose-500 dark:text-rose-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (quizFinished) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto animate-fadeIn">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Kuis Selesai! Paket {selectedDifficulty.toUpperCase()}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Berikut adalah ringkasan skor dan riwayat pembahasan lengkap
                untuk 20 butir soal.
              </p>
            </div>
            <button
              onClick={handleBackToPackageSelection}
              className="px-4 py-2 rounded-xl bg-cyan-500 text-white dark:text-slate-950 font-bold text-xs hover:bg-cyan-600 dark:hover:bg-cyan-400 transition-all shrink-0"
            >
              Pilih Paket Lain
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Kartu Nilai Akhir */}
            <div className="p-4 rounded-xl bg-cyan-50 dark:bg-slate-950/60 border border-cyan-200 dark:border-cyan-500/30 flex flex-col items-center justify-center text-center space-y-1">
              <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 mb-1">
                <Award className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Nilai Akhir
              </span>
              <span className="text-2xl font-black text-cyan-600 dark:text-cyan-400">
                {percentage}
              </span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">
                Skor (0-100)
              </span>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-slate-950/60 border border-emerald-200 dark:border-emerald-500/30 flex flex-col items-center justify-center text-center space-y-1">
              <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-1">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Jawaban Benar
              </span>
              <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                {scoreCount}
              </span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">
                Soal
              </span>
            </div>

            <div className="p-4 rounded-xl bg-rose-50 dark:bg-slate-950/60 border border-rose-200 dark:border-rose-500/30 flex flex-col items-center justify-center text-center space-y-1">
              <div className="p-2 rounded-lg bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 mb-1">
                <XCircle className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Jawaban Salah
              </span>
              <span className="text-2xl font-black text-rose-600 dark:text-rose-400">
                {wrongCount}
              </span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">
                Soal
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-700/50 flex flex-col items-center justify-center text-center space-y-1">
              <div className="p-2 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 mb-1">
                <HelpCircle className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Total Soal
              </span>
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                {totalQuestions}
              </span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">
                5 PG + 1 Isian
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-cyan-600 dark:text-cyan-500" />{" "}
            Riwayat Jawaban & Pembahasan
          </h4>
          {questions.map((q, idx) => {
            const uAns = userAnswers[q.id];
            const isCorrect = isQuestionCorrect(q, uAns);

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
                      {q.type === "pg"
                        ? uAns !== undefined
                          ? q.options?.[Number(uAns)]
                          : "Tidak dijawab"
                        : (uAns as string) || "Tidak dijawab"}
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

                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950/60 border-l-4 border-cyan-500 space-y-1 mt-2">
                  <p className="text-xs font-bold text-cyan-700 dark:text-cyan-400 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" /> Pembahasan:
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
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fadeIn">
      {/* Top Header Bar */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
        <button
          onClick={handleBackToPackageSelection}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Ganti Paket Soal</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-600 text-white shadow-md">
              {isCpu ? (
                <Cpu className="w-5 h-5" />
              ) : (
                <ShieldAlert className="w-5 h-5" />
              )}
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {isCpu ? "Kuis Penjadwalan CPU" : "Kuis Penanganan Deadlock"}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Paket:{" "}
                <span className="text-cyan-600 dark:text-cyan-400 font-bold capitalize">
                  {selectedDifficulty}
                </span>{" "}
                (Soal {currentIndex + 1} dari {totalQuestions})
              </p>
            </div>
          </div>

          <button
            onClick={handleBackToPackageSelection}
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Keluar / Ganti Paket"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Lembar Pertanyaan Aktif */}
      {currentQ && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-cyan-100 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/20">
              Soal {currentIndex + 1} ({currentQ.type.toUpperCase()})
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Topik: {currentQ.category}
            </span>
          </div>

          <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
            {currentQ.question}
          </h3>

          {/* Input Opsi PG vs Esai (Sekarang Input Single Line) */}
          {currentQ.type === "pg" ? (
            <div className="space-y-2.5">
              {currentQ.options?.map((option, optIdx) => {
                const selectedOpt = userAnswers[currentQ.id];
                const isSelected = selectedOpt === optIdx;
                const isCorrect = optIdx === currentQ.correctAnswer;
                const hasAnswered = selectedOpt !== undefined;

                let style =
                  "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 hover:border-cyan-400 dark:hover:border-cyan-500 text-slate-700 dark:text-slate-200";

                if (hasAnswered) {
                  if (isCorrect) {
                    style =
                      "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 font-bold";
                  } else if (isSelected && !isCorrect) {
                    style =
                      "bg-rose-50 dark:bg-rose-950/60 border-rose-400 dark:border-rose-700 text-rose-800 dark:text-rose-200 font-bold";
                  } else {
                    style =
                      "opacity-50 bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400";
                  }
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(currentQ.id, optIdx)}
                    disabled={hasAnswered}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center gap-3 ${style}`}
                  >
                    <span
                      className={`w-7 h-7 rounded-lg font-mono text-xs font-bold flex items-center justify-center shrink-0 ${
                        hasAnswered && isCorrect
                          ? "bg-emerald-500 text-white"
                          : hasAnswered && isSelected
                            ? "bg-rose-500 text-white"
                            : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <div className="flex-1 text-sm leading-relaxed">
                      {option}
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            /* Input Esai - Sekarang Input Teks Satu Baris */
            <div className="space-y-3">
              <input
                type="text"
                value={
                  essayInputs[currentQ.id] ||
                  (userAnswers[currentQ.id] as string) ||
                  ""
                }
                disabled={userAnswers[currentQ.id] !== undefined}
                onChange={(e) =>
                  setEssayInputs({
                    ...essayInputs,
                    [currentQ.id]: e.target.value,
                  })
                }
                placeholder="Ketik jawaban singkat (1-2 kata)..."
                className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none transition-all disabled:opacity-70"
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    userAnswers[currentQ.id] === undefined
                  ) {
                    handleSubmitEssay(currentQ.id);
                  }
                }}
              />
              {userAnswers[currentQ.id] === undefined && (
                <button
                  onClick={() => handleSubmitEssay(currentQ.id)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 dark:bg-cyan-500 text-white dark:text-slate-950 font-bold text-xs hover:bg-cyan-700 dark:hover:bg-cyan-400 transition-all shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" /> Simpan Jawaban
                </button>
              )}
            </div>
          )}

          {/* Pembahasan Langsung Setelah Dijawab */}
          {userAnswers[currentQ.id] !== undefined && (
            <div className="p-4 rounded-xl bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800/50 space-y-2">
              <p className="text-xs font-bold text-cyan-700 dark:text-cyan-400 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" /> Pembahasan:
              </p>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Navigasi Bawah & Nomor Soal */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-slate-100 dark:border-slate-800 mt-2">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Sebelumnya
            </button>

            <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-[200px] sm:max-w-none">
              {questions.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-7 h-7 rounded-md text-[11px] font-bold font-mono transition-all flex items-center justify-center ${
                    userAnswers[q.id] !== undefined
                      ? "bg-cyan-600 dark:bg-cyan-500 text-white dark:text-slate-950 shadow-sm"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                  } ${idx === currentIndex ? "ring-2 ring-cyan-500 ring-offset-2 dark:ring-offset-slate-900 scale-110" : ""}`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            {currentIndex === questions.length - 1 ? (
              <button
                onClick={() => finishQuiz()}
                className="flex items-center justify-center gap-1.5 px-5 py-2.5 text-xs font-bold rounded-lg bg-emerald-500 text-white dark:text-slate-950 hover:bg-emerald-600 dark:hover:bg-emerald-400 shadow-md transition-all"
              >
                Selesai Kuis
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center justify-center gap-1.5 px-5 py-2.5 text-xs font-semibold rounded-lg bg-cyan-600 dark:bg-cyan-500 text-white dark:text-slate-950 hover:bg-cyan-700 dark:hover:bg-cyan-400 shadow-md transition-all"
              >
                Berikutnya <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
