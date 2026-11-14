import { useState, useEffect, useRef } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { STORAGE_KEYS } from "../constants/storage";
import {
  ActiveModule,
  DeadlockData,
  Process,
  QuizAttempt,
  QuizDifficulty,
  SchedulingAlgorithm,
  SimulatorAttempt,
} from "../types";
import {
  evaluateDeadlockSafety,
  normalizeDifficulty,
  summarizeCpuSimulation,
} from "../utils/simulationHelpers";

export interface QuizScoreState {
  completed: boolean;
  score: number;
  total: number;
  correct?: number;
  wrong?: number;
  difficulty?: "mudah" | "sedang" | "sulit" | QuizDifficulty;
}

interface UseSimosHistoryParams {
  activeModule: ActiveModule;
  processes: Process[];
  selectedAlgorithm: SchedulingAlgorithm;
  timeQuantum: number;
  deadlockData: DeadlockData;
}

const DEFAULT_QUIZ_SCORE: QuizScoreState = {
  completed: false,
  score: 0,
  total: 10,
};

function formatIndonesianDate() {
  return new Date().toLocaleString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function useSimosHistory({
  activeModule,
  processes,
  selectedAlgorithm,
  timeQuantum,
  deadlockData,
}: UseSimosHistoryParams) {
  const [quizScore, setQuizScore] = useLocalStorage<QuizScoreState>(
    STORAGE_KEYS.QUIZ,
    DEFAULT_QUIZ_SCORE,
  );

  const [quizHistory, setQuizHistory] = useLocalStorage<QuizAttempt[]>(
    STORAGE_KEYS.QUIZ_HISTORY,
    [],
  );

  const [simulatorHistory, setSimulatorHistory] = useLocalStorage<
    SimulatorAttempt[]
  >(STORAGE_KEYS.SIMULATOR_HISTORY, []);

  const [savedNotice, setSavedNotice] = useState<string | null>(null);
  const isFirstCpuMount = useRef(true);
  const isFirstDeadlockMount = useRef(true);

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
      date: formatIndonesianDate(),
    };
    setSimulatorHistory((prev) => [newAttempt, ...prev]);
  };

  const logCurrentCpuSimulation = () => {
    const { algorithm, summary, isSafeOrOptimal } = summarizeCpuSimulation(
      processes,
      selectedAlgorithm,
      timeQuantum,
    );
    recordSimulatorHistory(
      "CPU Scheduling",
      algorithm,
      summary,
      isSafeOrOptimal,
    );
  };

  const logCurrentDeadlockSimulation = () => {
    const { summary, isSafe } = evaluateDeadlockSafety(deadlockData);
    recordSimulatorHistory("Deadlock", "Banker's Algorithm", summary, isSafe);
  };

  // Auto-record CPU simulation setelah 1.5 detik tidak ada perubahan
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

  // Auto-record Deadlock simulation setelah 1.5 detik tidak ada perubahan
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

  // Simpan manual dari tombol top bar simulator
  const handleManualSaveSimulation = (type: "cpu" | "deadlock") => {
    if (type === "cpu") {
      logCurrentCpuSimulation();
    } else {
      logCurrentDeadlockSimulation();
    }
    setSavedNotice("Simulasi berhasil dicatat ke riwayat profil!");
    setTimeout(() => setSavedNotice(null), 2500);
  };

  // Catat hasil kuis ke riwayat
  const handleQuizComplete = (
    moduleType: "cpu" | "deadlock",
    newScore: QuizScoreState,
  ) => {
    setQuizScore(newScore);

    if (newScore.completed) {
      const correctCount = newScore.correct ?? newScore.score;
      const wrongCount =
        newScore.wrong ?? Math.max(0, newScore.total - correctCount);
      const calculatedFinalScore =
        newScore.total > 0
          ? newScore.score > newScore.total
            ? newScore.score
            : Math.round((correctCount / newScore.total) * 100)
          : 0;

      const attempt: QuizAttempt = {
        id: Date.now().toString(),
        module: moduleType === "cpu" ? "Kuis Penjadwalan CPU" : "Kuis Deadlock",
        score: correctCount,
        total: newScore.total,
        correct: correctCount,
        wrong: wrongCount,
        finalScore: calculatedFinalScore,
        difficulty: normalizeDifficulty(newScore.difficulty),
        date: formatIndonesianDate(),
      };

      setQuizHistory((prevHistory) => [attempt, ...prevHistory]);
    }
  };

  // Handler hapus riwayat kuis
  const handleDeleteQuizHistory = (id: string) => {
    setQuizHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearQuizHistory = () => {
    if (window.confirm("Yakin ingin menghapus semua riwayat kuis?")) {
      setQuizHistory([]);
    }
  };

  // Handler hapus riwayat simulasi
  const handleDeleteSimulatorHistory = (id: string) => {
    setSimulatorHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearSimulatorHistory = () => {
    if (window.confirm("Yakin ingin menghapus semua riwayat simulasi?")) {
      setSimulatorHistory([]);
    }
  };

  // Reset skor kuis saat tombol Reset Data di Home diklik
  const resetQuizScore = () => {
    setQuizScore(DEFAULT_QUIZ_SCORE);
    localStorage.removeItem(STORAGE_KEYS.QUIZ);
  };

  return {
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
  };
}
