import React, { useMemo, useState } from "react";
import {
  ArrowLeft,
  User,
  Cpu,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Trash2,
  ClipboardCheck,
  TrendingUp,
  Trophy,
  Activity,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { QuizAttempt, QuizDifficulty, SimulatorAttempt } from "../types";

interface ProfileViewProps {
  username: string;
  onBack: () => void;
  quizHistory: QuizAttempt[];
  simulatorHistory: SimulatorAttempt[];
  onDeleteQuizHistory: (id: string) => void;
  onClearQuizHistory: () => void;
  onDeleteSimulatorHistory: (id: string) => void;
  onClearSimulatorHistory: () => void;
}

type QuizFilter = "all" | "cpu" | "deadlock";

const PAGE_SIZE = 2;
const PASS_SCORE = 70;

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500";

const cardClass =
  "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm";

const rowClass =
  "bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl";

const isDeadlockModule = (moduleName: string) =>
  moduleName.toLowerCase().includes("deadlock");

const getFinalScore = (quiz: QuizAttempt) => {
  const correct = quiz.correct ?? quiz.score;
  return (
    quiz.finalScore ??
    (quiz.total > 0 ? Math.round((correct / quiz.total) * 100) : 0)
  );
};

function ClearAllButton({ onConfirm }: { onConfirm: () => void }) {
  const [armed, setArmed] = useState(false);

  if (!armed) {
    return (
      <button
        onClick={() => setArmed(true)}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors ${focusRing}`}
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span>Hapus semua</span>
      </button>
    );
  }

  return (
    <div className="inline-flex items-center gap-1.5">
      <span className="text-xs text-slate-500 dark:text-slate-400">Yakin?</span>
      <button
        onClick={() => {
          onConfirm();
          setArmed(false);
        }}
        className={`px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-600 hover:bg-red-700 text-white transition-colors ${focusRing}`}
      >
        Ya, hapus
      </button>
      <button
        onClick={() => setArmed(false)}
        className={`px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${focusRing}`}
      >
        Batal
      </button>
    </div>
  );
}

function ListToggle({
  total,
  expanded,
  onToggle,
}: {
  total: number;
  expanded: boolean;
  onToggle: () => void;
}) {
  if (total <= PAGE_SIZE) return null;

  return (
    <button
      onClick={onToggle}
      aria-expanded={expanded}
      className={`w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors ${focusRing}`}
    >
      {expanded ? (
        <ChevronUp className="w-4 h-4" />
      ) : (
        <ChevronDown className="w-4 h-4" />
      )}
      <span>{expanded ? "Sembunyikan" : `Tampilkan semua (${total})`}</span>
    </button>
  );
}

function StatCard({
  icon,
  label,
  value,
  hint,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className={`${cardClass} !p-4 sm:!p-5 flex items-center gap-4`}>
      <div className="w-11 h-11 shrink-0 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
          {label}
        </div>
        <div className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">
          {value}
        </div>
        {hint && (
          <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
            {hint}
          </div>
        )}
      </div>
    </div>
  );
}

function ModuleBar({
  label,
  data,
}: {
  label: string;
  data: { avg: number; count: number } | null;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
          {label}
        </span>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {data ? `${data.avg} · ${data.count} kuis` : "Belum ada data"}
        </span>
      </div>
      <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <div
          className="h-full rounded-full bg-blue-600 dark:bg-blue-500 transition-all"
          style={{ width: `${data?.avg ?? 0}%` }}
        />
      </div>
    </div>
  );
}

export function ProfileView({
  username,
  onBack,
  quizHistory,
  simulatorHistory,
  onDeleteQuizHistory,
  onClearQuizHistory,
  onDeleteSimulatorHistory,
  onClearSimulatorHistory,
}: ProfileViewProps) {
  const [filter, setFilter] = useState<QuizFilter>("all");
  const [quizExpanded, setQuizExpanded] = useState(false);
  const [simExpanded, setSimExpanded] = useState(false);

  const difficultyStyle =
    "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700";

  const stats = useMemo(() => {
    const scores = quizHistory.map(getFinalScore);
    const avgOf = (list: number[]) =>
      list.length
        ? Math.round(list.reduce((a, b) => a + b, 0) / list.length)
        : null;

    const byModule = (deadlock: boolean) => {
      const list = quizHistory
        .filter((q) => isDeadlockModule(q.module) === deadlock)
        .map(getFinalScore);
      const avg = avgOf(list);
      return avg === null ? null : { avg, count: list.length };
    };

    return {
      average: avgOf(scores),
      best: scores.length ? Math.max(...scores) : null,
      cpu: byModule(false),
      deadlock: byModule(true),
      trend: [...quizHistory].reverse().slice(-10).map(getFinalScore),
    };
  }, [quizHistory]);

  const counts = useMemo(() => {
    const deadlock = quizHistory.filter((q) =>
      isDeadlockModule(q.module),
    ).length;
    return {
      all: quizHistory.length,
      deadlock,
      cpu: quizHistory.length - deadlock,
    };
  }, [quizHistory]);

  const filteredQuiz = useMemo(
    () =>
      quizHistory.filter((q) => {
        if (filter === "all") return true;
        return isDeadlockModule(q.module) === (filter === "deadlock");
      }),
    [quizHistory, filter],
  );

  const visibleQuiz = quizExpanded
    ? filteredQuiz
    : filteredQuiz.slice(0, PAGE_SIZE);
  const visibleSim = simExpanded
    ? simulatorHistory
    : simulatorHistory.slice(0, PAGE_SIZE);

  const tabs: { id: QuizFilter; label: string }[] = [
    { id: "all", label: "Semua" },
    { id: "cpu", label: "Penjadwalan CPU" },
    { id: "deadlock", label: "Deadlock" },
  ];

  const changeFilter = (next: QuizFilter) => {
    setFilter(next);
    setQuizExpanded(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className={`inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded ${focusRing}`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke beranda</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<ClipboardCheck className="w-5 h-5" />}
          label="Kuis selesai"
          value={quizHistory.length}
        />
        <StatCard
          icon={<TrendingUp className="w-5 h-5" />}
          label="Rata-rata nilai"
          value={stats.average ?? "–"}
          hint={stats.average === null ? undefined : "dari 100"}
        />
        <StatCard
          icon={<Trophy className="w-5 h-5" />}
          label="Nilai tertinggi"
          value={stats.best ?? "–"}
          hint={stats.best === null ? undefined : "dari 100"}
        />
        <StatCard
          icon={<Activity className="w-5 h-5" />}
          label="Simulasi dijalankan"
          value={simulatorHistory.length}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <aside className="space-y-6 lg:col-start-3 lg:row-start-1">
          <div className={cardClass}>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 shrink-0 bg-blue-600 rounded-full flex items-center justify-center border-4 border-white dark:border-slate-800 shadow-md">
                <User className="w-7 h-7 text-white" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white truncate">
                  {username}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Pengguna SimOS
                </p>
              </div>
            </div>
          </div>

          <div className={cardClass}>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
              Performa kuis
            </h3>
            <div className="space-y-4">
              <ModuleBar label="Penjadwalan CPU" data={stats.cpu} />
              <ModuleBar label="Deadlock" data={stats.deadlock} />
            </div>{" "}
          </div>
        </aside>

        <section className="lg:col-span-2 lg:col-start-1 lg:row-start-1">
          <div className={cardClass}>
            <div className="flex flex-wrap items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Riwayat kuis
              </h3>
              {quizHistory.length > 0 && (
                <ClearAllButton onConfirm={onClearQuizHistory} />
              )}
            </div>

            <div
              role="tablist"
              aria-label="Filter riwayat kuis"
              className="flex flex-wrap gap-3 mb-4"
            >
              {tabs.map((tab) => {
                const active = filter === tab.id;
                return (
                  <button
                    key={tab.id}
                    role="tab"
                    aria-selected={active}
                    onClick={() => changeFilter(tab.id)}
                    className={`px-2 py-1 rounded-lg text-xs font-semibold transition-colors ${focusRing} ${
                      active
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                    }`}
                  >
                    {tab.label}
                    <span
                      className={`ml-1.5 ${
                        active ? "text-blue-100" : "text-slate-400"
                      }`}
                    >
                      {counts[tab.id]}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="space-y-3">
              {filteredQuiz.length === 0 ? (
                <div className="text-center py-8 text-slate-500 dark:text-slate-400 text-sm">
                  {quizHistory.length === 0
                    ? "Belum ada kuis yang diselesaikan. Mulai dari halaman modul."
                    : "Belum ada kuis untuk modul ini."}
                </div>
              ) : (
                visibleQuiz.map((quiz) => {
                  const correctCount = quiz.correct ?? quiz.score;
                  const wrongCount =
                    quiz.wrong ?? Math.max(0, quiz.total - correctCount);
                  const finalResult = getFinalScore(quiz);
                  const difficultyLabel: QuizDifficulty =
                    quiz.difficulty ?? "Sedang";
                  const isPassed = finalResult >= PASS_SCORE;

                  return (
                    <div
                      key={quiz.id}
                      className={`flex items-center justify-between gap-3 p-4 ${rowClass}`}
                    >
                      <div className="min-w-0 space-y-1.5">
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <h4 className="font-bold text-slate-800 dark:text-slate-200 text-[16px]">
                            {quiz.module}
                          </h4>
                          <span
                            className={`text-xs px-1 rounded-md font-medium border ${difficultyStyle}`}
                          >
                            {difficultyLabel}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 flex-wrap text-xs">
                          <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                            Betul: {correctCount}
                          </span>
                          <span className="px-2 py-1 rounded bg-rose-500/10 text-rose-700 dark:text-rose-400">
                            Salah: {wrongCount}
                          </span>
                          <span className="text-slate-500 dark:text-slate-400">
                            {quiz.date}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right">
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            Nilai total
                          </div>
                          <div className="flex items-baseline justify-end gap-1">
                            <span
                              className={`text-3xl font-black leading-none ${
                                isPassed
                                  ? "text-emerald-600 dark:text-emerald-400"
                                  : "text-rose-600 dark:text-rose-400"
                              }`}
                            >
                              {finalResult}
                            </span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                              / 100
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => onDeleteQuizHistory(quiz.id)}
                          className={`p-2 rounded-lg text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors ${focusRing}`}
                          title="Hapus riwayat kuis ini"
                          aria-label="Hapus riwayat kuis ini"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}

              <ListToggle
                total={filteredQuiz.length}
                expanded={quizExpanded}
                onToggle={() => setQuizExpanded((v) => !v)}
              />
            </div>
          </div>
        </section>
      </div>

      <section className={cardClass}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Riwayat simulasi grafis & kalkulasi
          </h3>
          {simulatorHistory.length > 0 && (
            <ClearAllButton onConfirm={onClearSimulatorHistory} />
          )}
        </div>

        <div className="space-y-3">
          {simulatorHistory.length === 0 ? (
            <div className="text-center py-8 text-slate-500 dark:text-slate-400 text-sm">
              Belum ada simulasi yang dicatat. Jalankan simulasi CPU atau
              Deadlock untuk mulai.
            </div>
          ) : (
            visibleSim.map((sim) => (
              <div
                key={sim.id}
                className={`flex items-center justify-between gap-3 p-4 ${rowClass}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-lg shrink-0 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    {sim.type === "Deadlock" ? (
                      <ShieldAlert className="w-5 h-5" />
                    ) : (
                      <Cpu className="w-5 h-5" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                        {sim.type}
                      </h4>
                      <span className="text-xs px-2 py-0.5 bg-slate-200 dark:bg-slate-800 rounded font-medium text-slate-600 dark:text-slate-300">
                        {sim.algorithm}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono truncate">
                      {sim.summary}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right space-y-1">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md ${
                        sim.isSafeOrOptimal
                          ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400"
                          : "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400"
                      }`}
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
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {sim.date}
                    </p>
                  </div>

                  <button
                    onClick={() => onDeleteSimulatorHistory(sim.id)}
                    className={`p-2 rounded-lg text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors ${focusRing}`}
                    title="Hapus riwayat simulasi ini"
                    aria-label="Hapus riwayat simulasi ini"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
          <ListToggle
            total={simulatorHistory.length}
            expanded={quizExpanded}
            onToggle={() => setSimExpanded((v) => !v)}
          />
        </div>
      </section>
    </div>
  );
}
