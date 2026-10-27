import React, { useState, useEffect } from 'react';
import {
  Moon,
  Sun,
  Cpu,
  ShieldAlert,
  ArrowLeft,
} from 'lucide-react';
import { HomeSelector } from './components/HomeSelector';
import { CpuSchedulingView } from './components/CpuSchedulingView';
import { DeadlockView } from './components/DeadlockView';
import { QuizView } from './components/QuizView';
import { Process, SchedulingAlgorithm, DeadlockData } from './types';
import { CPU_PRESETS, DEADLOCK_PRESETS } from './utils/presets';

type ActiveModule = 'home' | 'cpu' | 'deadlock' | 'cpu-quiz' | 'deadlock-quiz';

const STORAGE_KEYS = {
  ACTIVE_MODULE: 'simos_active_module_v3',
  PROCESSES: 'simos_processes_v3',
  ALGORITHM: 'simos_algorithm_v3',
  QUANTUM: 'simos_quantum_v3',
  DEADLOCK: 'simos_deadlock_v3',
  QUIZ: 'simos_quiz_v3',
  DARK_MODE: 'simos_dark_mode_v3',
};

export default function App() {
  const [activeModule, setActiveModule] = useState<ActiveModule>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_MODULE);
      if (saved && ['home', 'cpu', 'deadlock', 'cpu-quiz', 'deadlock-quiz'].includes(saved)) {
        return saved as ActiveModule;
      }
    } catch {}
    return 'home';
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DARK_MODE);
    if (saved !== null) {
      return saved === 'true';
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_MODULE, activeModule);
  }, [activeModule]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem(STORAGE_KEYS.DARK_MODE, 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem(STORAGE_KEYS.DARK_MODE, 'false');
    }
  }, [isDarkMode]);

  const [processes, setProcesses] = useState<Process[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROCESSES);
      if (saved) return JSON.parse(saved);
    } catch {}
    return CPU_PRESETS[0].processes;
  });

  const [selectedAlgorithm, setSelectedAlgorithm] = useState<SchedulingAlgorithm>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ALGORITHM);
      if (saved) return saved as SchedulingAlgorithm;
    } catch {}
    return 'FCFS';
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

  const [quizScore, setQuizScore] = useState<{ completed: boolean; score: number; total: number }>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.QUIZ);
      if (saved) return JSON.parse(saved);
    } catch {}
    return { completed: false, score: 0, total: 10 };
  });

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

  const handleResetData = () => {
    const confirmReset = window.confirm(
      'Apakah Anda ingin mengembalikan data ke pengaturan preset awal?'
    );
    if (confirmReset) {
      setProcesses(CPU_PRESETS[0].processes);
      setSelectedAlgorithm('FCFS');
      setTimeQuantum(2);
      setDeadlockData(DEADLOCK_PRESETS[0].data);
      setQuizScore({ completed: false, score: 0, total: 10 });
      localStorage.clear();
      setActiveModule('home');
    }
  };

  return (
    <div className={`min-h-screen bg-[#f0f4f8] dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200 flex flex-col ${isDarkMode ? 'dark' : ''}`}>
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 sm:px-8 py-3.5 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 sm:gap-6">
            <button
              onClick={() => setActiveModule('home')}
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
                onClick={() => setActiveModule('home')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeModule === 'home'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Pilih Modul
              </button>

              <button
                onClick={() => setActiveModule('cpu')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeModule === 'cpu' || activeModule === 'cpu-quiz'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>Penjadwalan CPU</span>
              </button>

              <button
                onClick={() => setActiveModule('deadlock')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeModule === 'deadlock' || activeModule === 'deadlock-quiz'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
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
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
        {activeModule === 'home' && (
          <HomeSelector
            onSelectModule={(mod) => setActiveModule(mod)}
            isDarkMode={isDarkMode}
            onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
            onResetData={handleResetData}
          />
        )}

        {activeModule === 'cpu' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setActiveModule('home')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali ke Pilihan Modul</span>
              </button>
            </div>

            <CpuSchedulingView
              processes={processes}
              onChangeProcesses={setProcesses}
              selectedAlgorithm={selectedAlgorithm}
              onSelectAlgorithm={setSelectedAlgorithm}
              timeQuantum={timeQuantum}
              onChangeTimeQuantum={setTimeQuantum}
              onOpenQuiz={() => setActiveModule('cpu-quiz')}
            />
          </div>
        )}

        {activeModule === 'deadlock' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setActiveModule('home')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali ke Pilihan Modul</span>
              </button>
            </div>

            <DeadlockView
              deadlockData={deadlockData}
              onChangeDeadlockData={setDeadlockData}
              onOpenQuiz={() => setActiveModule('deadlock-quiz')}
            />
          </div>
        )}

        {activeModule === 'cpu-quiz' && (
          <div className="space-y-4">
            <QuizView
              moduleType="cpu"
              quizScore={quizScore}
              onUpdateScore={setQuizScore}
              onBackToSimulator={() => setActiveModule('cpu')}
              backLabel="Kembali ke Simulator Penjadwalan CPU"
            />
          </div>
        )}

        {activeModule === 'deadlock-quiz' && (
          <div className="space-y-4">
            <QuizView
              moduleType="deadlock"
              quizScore={quizScore}
              onUpdateScore={setQuizScore}
              onBackToSimulator={() => setActiveModule('deadlock')}
              backLabel="Kembali ke Simulator Deadlock"
            />
          </div>
        )}
      </main>

      <footer className="mt-auto border-t border-slate-200/60 dark:border-slate-800/80 py-4 px-4 text-center text-xs text-slate-400 dark:text-slate-500">
        SimOS • Simulator Penjadwalan CPU dan Deadlock Interaktif
      </footer>
    </div>
  );
}