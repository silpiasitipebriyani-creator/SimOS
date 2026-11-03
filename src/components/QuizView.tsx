import React, { useState } from 'react';
import {
  GraduationCap,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Cpu,
  ShieldAlert,
} from 'lucide-react';
import { CPU_QUIZ_QUESTIONS, DEADLOCK_QUIZ_QUESTIONS } from '../utils/quizData';
import { QuizQuestion } from '../types';

interface QuizViewProps {
  moduleType: 'cpu' | 'deadlock';
  quizScore: { completed: boolean; score: number; total: number };
  onUpdateScore: (score: { completed: boolean; score: number; total: number }) => void;
  onBackToSimulator: () => void;
  backLabel?: string;
}

export const QuizView: React.FC<QuizViewProps> = ({
  moduleType,
  quizScore,
  onUpdateScore,
  onBackToSimulator,
  backLabel,
}) => {
  // 10 questions dedicated strictly to this module
  const questions: QuizQuestion[] =
    moduleType === 'cpu' ? CPU_QUIZ_QUESTIONS : DEADLOCK_QUIZ_QUESTIONS;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<number, boolean>>({});
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = questions[currentIndex] || questions[0];
  const isAnswered = currentQ && userAnswers[currentQ.id] !== undefined;

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    if (userAnswers[questionId] !== undefined) return; // locked once chosen

    const updatedAnswers = { ...userAnswers, [questionId]: optionIdx };
    setUserAnswers(updatedAnswers);
    setShowExplanation({ ...showExplanation, [questionId]: true });

    // Calculate score
    const totalQ = questions.length;
    let correctCount = 0;
    questions.forEach((q) => {
      if (updatedAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const isAllAnswered = questions.every((q) => updatedAnswers[q.id] !== undefined);
    if (isAllAnswered) {
      setQuizFinished(true);
      onUpdateScore({
        completed: true,
        score: correctCount,
        total: totalQ,
      });
    }
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

  const handleResetQuiz = () => {
    setUserAnswers({});
    setShowExplanation({});
    setCurrentIndex(0);
    setQuizFinished(false);
    onUpdateScore({ completed: false, score: 0, total: questions.length });
  };

  const totalQuestions = questions.length;
  const answeredCount = Object.keys(userAnswers).filter((id) =>
    questions.some((q) => q.id === Number(id))
  ).length;

  let scoreCount = 0;
  questions.forEach((q) => {
    if (userAnswers[q.id] === q.correctAnswer) {
      scoreCount++;
    }
  });

  const percentage = Math.round((scoreCount / (totalQuestions || 1)) * 100);

  const isCpu = moduleType === 'cpu';
  const defaultBackLabel = isCpu
    ? 'Kembali ke Simulator CPU'
    : 'Kembali ke Simulator Deadlock';

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fadeIn">
      {/* Top Back Action & Header */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 soft-shadow space-y-3">
        <button
          onClick={onBackToSimulator}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{backLabel || defaultBackLabel}</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
          <div className="flex items-center gap-3">
            <div
              className={`p-2.5 rounded-xl text-white shadow-md ${
                isCpu
                  ? 'bg-blue-600 shadow-blue-500/20'
                  : 'bg-emerald-600 shadow-emerald-500/20'
              }`}
            >
              {isCpu ? <Cpu className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {isCpu ? 'Kuis Penjadwalan CPU (10 Soal)' : 'Kuis Penanganan Deadlock (10 Soal)'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isCpu
                  ? 'Uji pemahaman tentang FCFS, SJF, SRTF, Round Robin, Time Quantum, dan metrik penjadwalan.'
                  : 'Uji pemahaman tentang 4 Syarat Coffman, Banker\'s Algorithm, Safe State, dan deteksi deadlock.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300">
              10 Butir Soal
            </span>
            <button
              onClick={handleResetQuiz}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Reset Jawaban Kuis"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar & Quick Stats */}
      <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 soft-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5 flex-1 max-w-md">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
            <span>Progres: Soal {currentIndex + 1} dari {totalQuestions}</span>
            <span>
              {answeredCount} / {totalQuestions} Terjawab
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                isCpu ? 'bg-blue-600' : 'bg-emerald-600'
              }`}
              style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono font-bold">
          <div>
            <span className="text-slate-400 text-[10px] uppercase block">Jawaban Benar</span>
            <span className="text-emerald-600 dark:text-emerald-400 text-sm">
              {scoreCount} Soal
            </span>
          </div>
        </div>
      </div>

      {/* Completion Banner */}
      {quizFinished && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-bold text-white shadow-inner">
                <Award className="w-7 h-7 text-amber-300" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold tracking-tight">
                  Kuis Selesai! Skor Akhir: {percentage}% ({scoreCount}/{totalQuestions} Benar)
                </h3>
                <p className="text-xs text-purple-100 mt-0.5">
                  {percentage >= 80
                    ? 'Sangat memuaskan! Anda telah menguasai materi ini dengan sangat baik.'
                    : percentage >= 60
                    ? 'Bagus! Anda memahami sebagian besar konsep. Periksa pembahasan di tiap soal untuk pemahaman maksimal.'
                    : 'Terus berlatih! Pelajari kembali pembahasan di bawah dan coba lagi.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetQuiz}
                className="px-4 py-2 rounded-xl bg-white text-purple-700 font-bold text-xs shadow-md hover:bg-purple-50 transition-all shrink-0 active:scale-95"
              >
                Ulangi Kuis
              </button>
              <button
                onClick={onBackToSimulator}
                className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs border border-white/30 transition-all shrink-0 active:scale-95"
              >
                Kembali ke Simulator
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Question Card */}
      {currentQ && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 soft-shadow space-y-6">
          {/* Question Header */}
          <div className="flex items-center justify-between">
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                isCpu
                  ? 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300'
                  : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
              }`}
            >
              Soal {currentIndex + 1} dari {totalQuestions}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Topik: {currentQ.category}
            </span>
          </div>

          <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
            {currentQ.question}
          </h3>

          {/* Options */}
          <div className="space-y-2.5">
            {currentQ.options.map((option, optIdx) => {
              const selectedOpt = userAnswers[currentQ.id];
              const isSelected = selectedOpt === optIdx;
              const isCorrect = optIdx === currentQ.correctAnswer;
              const hasAnswered = selectedOpt !== undefined;

              let style =
                'bg-slate-50 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700/80 hover:bg-purple-50/50 dark:hover:bg-purple-950/20 hover:border-purple-300 text-slate-800 dark:text-slate-200';

              if (hasAnswered) {
                if (isCorrect) {
                  style =
                    'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 font-semibold ring-1 ring-emerald-500';
                } else if (isSelected && !isCorrect) {
                  style =
                    'bg-rose-50 dark:bg-rose-950/60 border-rose-400 dark:border-rose-700 text-rose-900 dark:text-rose-200 font-semibold ring-1 ring-rose-500';
                } else {
                  style =
                    'opacity-50 bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400';
                }
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(currentQ.id, optIdx)}
                  disabled={hasAnswered}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 ${style}`}
                >
                  <span
                    className={`w-6 h-6 rounded-lg font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                      hasAnswered && isCorrect
                        ? 'bg-emerald-600 text-white'
                        : hasAnswered && isSelected && !isCorrect
                        ? 'bg-rose-600 text-white'
                        : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 shadow-xs'
                    }`}
                  >
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <div className="flex-1 text-xs leading-relaxed">{option}</div>
                  {hasAnswered && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  )}
                  {hasAnswered && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {isAnswered && (
            <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/60 space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2 text-xs font-bold text-purple-900 dark:text-purple-300">
                <BookOpen className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>Pembahasan & Teori:</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Soal Sebelumnya
            </button>

            {/* Question Quick Jump Badges */}
            <div className="flex items-center gap-1">
              {questions.map((q, idx) => {
                const ans = userAnswers[q.id];
                const isCur = idx === currentIndex;
                let dotColor = 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300';
                if (ans !== undefined) {
                  dotColor =
                    ans === q.correctAnswer
                      ? 'bg-emerald-500 text-white'
                      : 'bg-rose-500 text-white';
                }
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-6 h-6 rounded-md text-[10px] font-bold font-mono transition-all ${dotColor} ${
                      isCur ? 'ring-2 ring-purple-600' : ''
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleNext}
              disabled={currentIndex === questions.length - 1}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-30 disabled:hover:bg-purple-600 transition-colors shadow-xs"
            >
              Soal Berikutnya
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
