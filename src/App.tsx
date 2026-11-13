import React, { useState, useEffect, useRef } from "react";
import {
  Moon,
  Sun,
  Cpu,
  ShieldAlert,
  ArrowLeft,
  LogOut,
  User,
  BookmarkCheck,
} from "lucide-react";
import { HomeSelector } from "./components/HomeSelector";
import { CpuSchedulingView } from "./components/CpuSchedulingView";
import { DeadlockView } from "./components/DeadlockView";
import { QuizView } from "./components/QuizView";
import {
  Process,
  SchedulingAlgorithm,
  DeadlockData,
  QuizAttempt,
} from "./types";
import { CPU_PRESETS, DEADLOCK_PRESETS } from "./utils/presets";
import AuthView from "./components/AuthView";
import { ProfileView, SimulatorAttempt } from "./components/ProfileView";

type ActiveModule =
  | "home"
  | "cpu"
  | "deadlock"
  | "cpu-quiz"
  | "deadlock-quiz"
  | "profile";

const STORAGE_KEYS = {
  ACTIVE_MODULE: "simos_active_module_v3",
  PROCESSES: "simos_processes_v3",
  ALGORITHM: "simos_algorithm_v3",
  QUANTUM: "simos_quantum_v3",
  DEADLOCK: "simos_deadlock_v3",
  QUIZ: "simos_quiz_v3",
  QUIZ_HISTORY: "simos_quiz_history_v3",
  DARK_MODE: "simos_dark_mode_v3",
  USER: "simos_user_v3",
  SIMULATOR_HISTORY: "simos_simulator_history_v3",
};

export default function App() {
  const [currentUser, setCurrentUser] = useState<string | null>(() => {
    return localStorage.getItem(STORAGE_KEYS.USER);
  });

  const [activeModule, setActiveModule] = useState<ActiveModule>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_MODULE);
      if (
        saved &&
        [
          "home",
          "cpu",
          "deadlock",
          "cpu-quiz",
          "deadlock-quiz",
          "profile",
        ].includes(saved)
      ) {
        return saved as ActiveModule;
      }
    } catch {}
    return "home";
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DARK_MODE);
    if (saved !== null) {
      return saved === "true";
    }
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_MODULE, activeModule);
  }, [activeModule]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem(STORAGE_KEYS.DARK_MODE, "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem(STORAGE_KEYS.DARK_MODE, "false");
    }
  }, [isDarkMode]);

  const [processes, setProcesses] = useState<Process[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROCESSES);
      if (saved) return JSON.parse(saved);
    } catch {}
    return CPU_PRESETS[0].processes;
  });

  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<SchedulingAlgorithm>(() => {
      try {
        const saved = localStorage.getItem(STORAGE_KEYS.ALGORITHM);
        if (saved) return saved as SchedulingAlgorithm;
      } catch {}
      return "FCFS";
    });

  const [timeQuantum, setTimeQuantum] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.QUANTUM);
      if (saved) return Number(saved) || 2;
    } catch {}
    return 2;
  });

  const [deadlockData, setDeadlockData] = useState<DeadlockData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DEADLOCK);
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEADLOCK_PRESETS[0].data;
  });

  const [quizScore, setQuizScore] = useState<{
    completed: boolean;
    score: number;
    total: number;
  }>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.QUIZ);
      if (saved) return JSON.parse(saved);
    } catch {}
    return { completed: false, score: 0, total: 10 };
  });

  const [quizHistory, setQuizHistory] = useState<QuizAttempt[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.QUIZ_HISTORY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  const [simulatorHistory, setSimulatorHistory] = useState<SimulatorAttempt[]>(
    () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEYS.SIMULATOR_HISTORY);
        if (saved) return JSON.parse(saved);
      } catch {}
      return [];
    },
  );

  const isFirstCpuMount = useRef(true);
  const isFirstDeadlockMount = useRef(true);
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.SIMULATOR_HISTORY,
      JSON.stringify(simulatorHistory),
    );
  }, [simulatorHistory]);

  const recordSimulatorHistory = (
    type: "CPU Scheduling" | "Deadlock",
    algorithm: string,
    summary: string,
    isSafeOrOptimal: boolean,
  ) => {
    const newAttempt: SimulatorAttempt = {
      id: Date.now().toString(),
      type,
      algorithm,
      summary,
      isSafeOrOptimal,
      date: new Date().toLocaleString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setSimulatorHistory((prev) => [newAttempt, ...prev]);
  };

  const logCurrentCpuSimulation = () => {
    const totalBurst = processes.reduce((acc, p) => {
      const item = p as Record<string, any>;
      return acc + Number(item.burstTime ?? item.burst ?? 0);
    }, 0);

    const algoLabel =
      selectedAlgorithm === "RR"
        ? `Round Robin (Q: ${timeQuantum})`
        : selectedAlgorithm;

    const summary = `${processes.length} Proses • Total Burst Time: ${totalBurst} ms`;
    recordSimulatorHistory("CPU Scheduling", algoLabel, summary, true);
  };

  const logCurrentDeadlockSimulation = () => {
    const dataAny = deadlockData as Record<string, any>;
    const alloc: number[][] | undefined =
      dataAny.allocation ?? dataAny.allocated;
    const max: number[][] | undefined = dataAny.max ?? dataAny.maximum;
    const avail: number[] | undefined = dataAny.available;

    if (
      Array.isArray(alloc) &&
      Array.isArray(max) &&
      Array.isArray(avail) &&
      alloc.length > 0
    ) {
      const n = alloc.length;
      const m = avail.length;
      const work = avail.map(Number);
      const finish = Array(n).fill(false);
      const safeSequence: string[] = [];

      let progress = true;
      while (progress) {
        progress = false;
        for (let i = 0; i < n; i++) {
          if (!finish[i]) {
            let canRun = true;
            for (let j = 0; j < m; j++) {
              const need =
                Number(max[i]?.[j] ?? 0) - Number(alloc[i]?.[j] ?? 0);
              if (need > work[j]) {
                canRun = false;
                break;
              }
            }
            if (canRun) {
              for (let j = 0; j < m; j++) {
                work[j] += Number(alloc[i]?.[j] ?? 0);
              }
              finish[i] = true;
              safeSequence.push(`P${i}`);
              progress = true;
            }
          }
        }
      }

      const isSafe = finish.every(Boolean);
      const summary = isSafe
        ? `Safe Sequence: ${safeSequence.join(" → ")}`
        : `Unsafe State / Potensi Deadlock (${n} Proses)`;

      recordSimulatorHistory("Deadlock", "Banker's Algorithm", summary, isSafe);
    } else {
      recordSimulatorHistory(
        "Deadlock",
        "Banker's Algorithm",
        "Analisis Alokasi Resource",
        true,
      );
    }
  };

  useEffect(() => {
    if (isFirstCpuMount.current) {
      isFirstCpuMount.current = false;
      return;
    }
    if (activeModule !== "cpu") return;

    const timer = setTimeout(() => {
      logCurrentCpuSimulation();
    }, 1500);

    return () => clearTimeout(timer);
  }, [processes, selectedAlgorithm, timeQuantum]);

  useEffect(() => {
    if (isFirstDeadlockMount.current) {
      isFirstDeadlockMount.current = false;
      return;
    }
    if (activeModule !== "deadlock") return;

    const timer = setTimeout(() => {
      logCurrentDeadlockSimulation();
    }, 1500);

    return () => clearTimeout(timer);
  }, [deadlockData]);

  const handleManualSaveSimulation = (type: "cpu" | "deadlock") => {
    if (type === "cpu") {
      logCurrentCpuSimulation();
    } else {
      logCurrentDeadlockSimulation();
    }
    setSavedNotice("Simulasi berhasil dicatat ke riwayat profil!");
    setTimeout(() => setSavedNotice(null), 2500);
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROCESSES, JSON.stringify(processes));
  }, [processes]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ALGORITHM, selectedAlgorithm);
  }, [selectedAlgorithm]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.QUANTUM, timeQuantum.toString());
  }, [timeQuantum]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DEADLOCK, JSON.stringify(deadlockData));
  }, [deadlockData]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.QUIZ, JSON.stringify(quizScore));
  }, [quizScore]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.QUIZ_HISTORY,
      JSON.stringify(quizHistory),
    );
  }, [quizHistory]);

  const handleLoginSuccess = (username: string) => {
    setCurrentUser(username);
    localStorage.setItem(STORAGE_KEYS.USER, username);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_KEYS.USER);
    setActiveModule("home");
  };

  const handleQuizComplete = (
    moduleType: "cpu" | "deadlock",
    newScore: { completed: boolean; score: number; total: number },
  ) => {
    setQuizScore(newScore);

    if (newScore.completed) {
      const attempt: QuizAttempt = {
        id: Date.now().toString(),
        module: moduleType === "cpu" ? "Kuis Penjadwalan CPU" : "Kuis Deadlock",
        score: newScore.score,
        total: newScore.total,
        date: new Date().toLocaleString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setQuizHistory((prevHistory) => [attempt, ...prevHistory]);
    }
  };

  const handleResetData = () => {
    const confirmReset = window.confirm(
      "Apakah Anda ingin mengembalikan data ke pengaturan preset awal?",
    );
    if (confirmReset) {
      setProcesses(CPU_PRESETS[0].processes);
      setSelectedAlgorithm("FCFS");
      setTimeQuantum(2);
      setDeadlockData(DEADLOCK_PRESETS[0].data);
      setQuizScore({ completed: false, score: 0, total: 10 });
      localStorage.removeItem(STORAGE_KEYS.PROCESSES);
      localStorage.removeItem(STORAGE_KEYS.ALGORITHM);
      localStorage.removeItem(STORAGE_KEYS.QUANTUM);
      localStorage.removeItem(STORAGE_KEYS.DEADLOCK);
      localStorage.removeItem(STORAGE_KEYS.QUIZ);
      setActiveModule("home");
    }
  };

  return (
    <div
      className={`min-h-screen relative bg-[#f0f4f8] dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200 flex flex-col ${
        isDarkMode ? "dark" : ""
      }`}
    >
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 sm:px-8 py-3.5 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 sm:gap-6">
            <button
              onClick={() => setActiveModule("home")}
              className="flex items-center gap-2.5 text-left group"
              title="Kembali ke Beranda"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="hidden sm:block">
                <span className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white block leading-tight">
                  SimOS
                </span>
                <span className="text-[10px] text-slate-400 font-medium block">
                  Simulator CPU & Deadlock
                </span>
              </div>
            </button>

            <nav className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80">
              <button
                onClick={() => setActiveModule("home")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeModule === "home"
                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Pilih Modul
              </button>

              <button
                onClick={() => setActiveModule("cpu")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeModule === "cpu" || activeModule === "cpu-quiz"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>Penjadwalan CPU</span>
              </button>

              <button
                onClick={() => setActiveModule("deadlock")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeModule === "deadlock" ||
                  activeModule === "deadlock-quiz"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Deadlock</span>
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all border border-slate-200 dark:border-slate-700 shadow-xs"
              title="Ganti Mode Gelap / Terang"
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="hidden sm:inline">Terang</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-600 fill-indigo-600" />
                  <span className="hidden sm:inline">Gelap</span>
                </>
              )}
            </button>

            {currentUser && (
              <div className="pl-2 ml-1 border-l border-slate-300 dark:border-slate-700 flex items-center gap-3">
                <button
                  onClick={() => setActiveModule("profile")}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                >
                  <User className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {currentUser}
                  </span>
                </button>
                <button
                  onClick={handleLogout}
                  className="p-1.5 rounded-xl bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 transition-colors border border-red-200 dark:border-red-800/50"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto flex flex-col">
        {activeModule === "home" && (
          <HomeSelector
            onSelectModule={(mod) => setActiveModule(mod)}
            isDarkMode={isDarkMode}
            onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
            onResetData={handleResetData}
          />
        )}

        {activeModule === "profile" && currentUser && (
          <ProfileView
            username={currentUser}
            onBack={() => setActiveModule("home")}
            quizHistory={quizHistory}
            simulatorHistory={simulatorHistory}
          />
        )}

        {activeModule === "cpu" && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <button
                onClick={() => setActiveModule("home")}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali ke Pilihan Modul</span>
              </button>

              <div className="flex items-center gap-2">
                {savedNotice && (
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    {savedNotice}
                  </span>
                )}
                <button
                  onClick={() => handleManualSaveSimulation("cpu")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors"
                >
                  <BookmarkCheck className="w-3.5 h-3.5" />
                  <span>Simpan ke Riwayat Profil</span>
                </button>
              </div>
            </div>

            <CpuSchedulingView
              processes={processes}
              onChangeProcesses={setProcesses}
              selectedAlgorithm={selectedAlgorithm}
              onSelectAlgorithm={setSelectedAlgorithm}
              timeQuantum={timeQuantum}
              onChangeTimeQuantum={setTimeQuantum}
              onOpenQuiz={() => setActiveModule("cpu-quiz")}
            />
          </div>
        )}

        {activeModule === "deadlock" && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <button
                onClick={() => setActiveModule("home")}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali ke Pilihan Modul</span>
              </button>

              <div className="flex items-center gap-2">
                {savedNotice && (
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    {savedNotice}
                  </span>
                )}
                <button
                  onClick={() => handleManualSaveSimulation("deadlock")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors"
                >
                  <BookmarkCheck className="w-3.5 h-3.5" />
                  <span>Simpan ke Riwayat Profil</span>
                </button>
              </div>
            </div>

            <DeadlockView
              deadlockData={deadlockData}
              onChangeDeadlockData={setDeadlockData}
              onOpenQuiz={() => setActiveModule("deadlock-quiz")}
            />
          </div>
        )}

        {activeModule === "cpu-quiz" && (
          <div className="space-y-4">
            <QuizView
              moduleType="cpu"
              quizScore={quizScore}
              onUpdateScore={(score) => handleQuizComplete("cpu", score)}
              onBackToSimulator={() => setActiveModule("cpu")}
              backLabel="Kembali ke Simulator Penjadwalan CPU"
            />
          </div>
        )}

        {activeModule === "deadlock-quiz" && (
          <div className="space-y-4">
            <QuizView
              moduleType="deadlock"
              quizScore={quizScore}
              onUpdateScore={(score) => handleQuizComplete("deadlock", score)}
              onBackToSimulator={() => setActiveModule("deadlock")}
              backLabel="Kembali ke Simulator Deadlock"
            />
          </div>
        )}
      </main>

      <footer className="mt-auto border-t border-slate-200/60 dark:border-slate-800/80 py-4 px-4 text-center text-xs text-slate-400 dark:text-slate-500">
        SimOS • Simulator Penjadwalan CPU dan Deadlock Interaktif
      </footer>

      {/* POPUP MODAL UNTUK MANDATORY LOGIN */}
      {!currentUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
          <div className="w-full max-w-md h-[550px] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
            <AuthView onLoginSuccess={handleLoginSuccess} />
          </div>
        </div>
      )}
    </div>
  );
}
