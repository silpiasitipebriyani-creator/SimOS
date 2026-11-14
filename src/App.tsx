import React, { useState } from "react";
import { HomeSelector } from "./components/HomeSelector";
import { CpuSchedulingView } from "./components/CpuSchedulingView";
import { DeadlockView } from "./components/DeadlockView";
import { QuizView } from "./components/QuizView";
import { ProfileView } from "./components/ProfileView";
import { AboutView } from "./components/AboutView";
import { Navbar } from "./components/Navbar";
import { LoginModal } from "./components/LoginModal";
import { SimulatorTopBar } from "./components/SimulatorTopBar";
import {
  ActiveModule,
  DeadlockData,
  Process,
  SchedulingAlgorithm,
} from "./types";
import { CPU_PRESETS, DEADLOCK_PRESETS } from "./utils/presets";
import { STORAGE_KEYS, VALID_MODULES } from "./constants/storage";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useTheme } from "./hooks/useTheme";
import { useSimosHistory } from "./hooks/useSimosHistory";

export default function App() {
  const [currentUser, setCurrentUser] = useState<string | null>(() =>
    localStorage.getItem(STORAGE_KEYS.USER),
  );
  const [showLoginModal, setShowLoginModal] = useState<boolean>(
    () => !localStorage.getItem(STORAGE_KEYS.USER),
  );

  const [rawActiveModule, setActiveModule] = useLocalStorage<ActiveModule>(
    STORAGE_KEYS.ACTIVE_MODULE,
    "home",
  );
  const activeModule: ActiveModule = VALID_MODULES.includes(rawActiveModule)
    ? rawActiveModule
    : "home";

  const { isDarkMode, toggleDarkMode } = useTheme();

  const [processes, setProcesses] = useLocalStorage<Process[]>(
    STORAGE_KEYS.PROCESSES,
    CPU_PRESETS[0].processes,
  );
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useLocalStorage<SchedulingAlgorithm>(STORAGE_KEYS.ALGORITHM, "FCFS");
  const [timeQuantum, setTimeQuantum] = useLocalStorage<number>(
    STORAGE_KEYS.QUANTUM,
    2,
  );
  const [deadlockData, setDeadlockData] = useLocalStorage<DeadlockData>(
    STORAGE_KEYS.DEADLOCK,
    DEADLOCK_PRESETS[0].data,
  );

  const {
    quizScore,
    quizHistory,
    simulatorHistory,
    savedNotice,
    handleManualSaveSimulation,
    handleQuizComplete,
    handleDeleteQuizHistory,
    handleClearQuizHistory,
    handleDeleteSimulatorHistory,
    handleClearSimulatorHistory,
    resetQuizScore,
  } = useSimosHistory({
    activeModule,
    processes,
    selectedAlgorithm,
    timeQuantum,
    deadlockData,
  });

  const handleLoginSuccess = (username: string) => {
    setCurrentUser(username);
    localStorage.setItem(STORAGE_KEYS.USER, username);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_KEYS.USER);
    setActiveModule("home");
    setShowLoginModal(false);
  };

  const handleResetData = () => {
    const confirmReset = window.confirm(
      "Apakah Anda ingin mengembalikan data ke pengaturan preset awal?",
    );
    if (!confirmReset) return;

    setProcesses(CPU_PRESETS[0].processes);
    setSelectedAlgorithm("FCFS");
    setTimeQuantum(2);
    setDeadlockData(DEADLOCK_PRESETS[0].data);
    resetQuizScore();

    localStorage.removeItem(STORAGE_KEYS.PROCESSES);
    localStorage.removeItem(STORAGE_KEYS.ALGORITHM);
    localStorage.removeItem(STORAGE_KEYS.QUANTUM);
    localStorage.removeItem(STORAGE_KEYS.DEADLOCK);
    setActiveModule("home");
  };

  return (
    <div
      className={`min-h-screen relative bg-[#f0f4f8] dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200 flex flex-col ${
        isDarkMode ? "dark" : ""
      }`}
    >
      <Navbar
        activeModule={activeModule}
        onSelectModule={setActiveModule}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        currentUser={currentUser}
        onOpenLogin={() => setShowLoginModal(true)}
        onLogout={handleLogout}
      />

      <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto flex flex-col">
        {activeModule === "home" && (
          <HomeSelector
            onSelectModule={setActiveModule}
            isDarkMode={isDarkMode}
            onToggleDarkMode={toggleDarkMode}
            onResetData={handleResetData}
          />
        )}

        {activeModule === "profile" && currentUser && (
          <ProfileView
            username={currentUser}
            onBack={() => setActiveModule("home")}
            quizHistory={quizHistory}
            simulatorHistory={simulatorHistory}
            onDeleteQuizHistory={handleDeleteQuizHistory}
            onClearQuizHistory={handleClearQuizHistory}
            onDeleteSimulatorHistory={handleDeleteSimulatorHistory}
            onClearSimulatorHistory={handleClearSimulatorHistory}
          />
        )}

        {activeModule === "cpu" && (
          <div className="space-y-4">
            <SimulatorTopBar
              accentColor="blue"
              savedNotice={savedNotice}
              onBack={() => setActiveModule("home")}
              onSave={() => handleManualSaveSimulation("cpu")}
            />
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
            <SimulatorTopBar
              accentColor="emerald"
              savedNotice={savedNotice}
              onBack={() => setActiveModule("home")}
              onSave={() => handleManualSaveSimulation("deadlock")}
            />
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

        {activeModule === "about" && <AboutView />}
      </main>

      <footer className="mt-auto border-t border-slate-200/60 dark:border-slate-800/80 py-4 px-4 text-center text-xs text-slate-400 dark:text-slate-500">
        SimOS • Simulator Penjadwalan CPU dan Deadlock Interaktif
      </footer>

      {!currentUser && showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
}
