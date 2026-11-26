import { useState, useEffect, useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { STORAGE_KEYS } from "../constants/storage";
import {
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

const RAW_API_URL = (
  import.meta.env.VITE_API_URL || "https://backend-simos-production.up.railway.app"
).replace(/\/+$/, "");

const API_BASE_URL = RAW_API_URL.endsWith("/api")
  ? RAW_API_URL
  : `${RAW_API_URL}/api`;

export interface QuizScoreState {
  completed: boolean;
  score: number;
  total: number;
  correct?: number;
  wrong?: number;
  difficulty?: "mudah" | "sedang" | "sulit" | QuizDifficulty;
}

interface UseSimosHistoryParams {
  currentUser: string | null;
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

function generateId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function formatIndonesianDate() {
  return new Date().toLocaleString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

async function extractErrorMessage(
  response: Response,
  fallback: string,
): Promise<string> {
  try {
    const data = await response.json();
    if (data && typeof data.error === "string") {
      return data.error;
    }
  } catch {}
  return fallback;
}

export function useSimosHistory({
  currentUser,
  processes,
  selectedAlgorithm,
  timeQuantum,
  deadlockData,
}: UseSimosHistoryParams) {
  const [quizScore, setQuizScore] = useLocalStorage<QuizScoreState>(
    STORAGE_KEYS.QUIZ,
    DEFAULT_QUIZ_SCORE,
  );

  const [quizHistory, setQuizHistory] = useState<QuizAttempt[]>([]);
  const [simulatorHistory, setSimulatorHistory] = useState<SimulatorAttempt[]>(
    [],
  );
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  const fetchUserHistory = useCallback(async (username: string) => {
    setIsLoadingHistory(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/history/${encodeURIComponent(username)}`,
      );
      if (!response.ok) {
        const msg = await extractErrorMessage(
          response,
          "Gagal mengambil riwayat dari server",
        );
        throw new Error(msg);
      }
      const data = await response.json();
      setQuizHistory(Array.isArray(data.quizHistory) ? data.quizHistory : []);
      setSimulatorHistory(
        Array.isArray(data.simulatorHistory) ? data.simulatorHistory : [],
      );
    } catch (error) {
      console.error("Error memuat riwayat dari database:", error);
    } finally {
      setIsLoadingHistory(false);
    }
  }, []);

  useEffect(() => {
    if (!currentUser) {
      setQuizHistory([]);
      setSimulatorHistory([]);
      return;
    }
    fetchUserHistory(currentUser);
  }, [currentUser, fetchUserHistory]);

  const recordSimulatorHistory = async (
    type: "CPU Scheduling" | "Deadlock",
    algorithm: string,
    summary: string,
    isSafeOrOptimal: boolean,
  ): Promise<{ ok: boolean; error?: string }> => {
    if (!currentUser) {
      return { ok: false, error: "Silakan login terlebih dahulu" };
    }

    const newAttempt: SimulatorAttempt = {
      id: generateId(),
      type,
      algorithm,
      summary,
      isSafeOrOptimal,
      date: formatIndonesianDate(),
    };

    try {
      const response = await fetch(`${API_BASE_URL}/simulator-history`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: currentUser,
          ...newAttempt,
        }),
      });

      if (!response.ok) {
        const msg = await extractErrorMessage(
          response,
          "Gagal menyimpan simulasi ke database",
        );
        return { ok: false, error: msg };
      }

      const data = await response.json();
      const savedItem: SimulatorAttempt = data.item ?? newAttempt;
      setSimulatorHistory((prev) => [savedItem, ...prev]);
      return { ok: true };
    } catch (error) {
      console.error("Error menyimpan riwayat simulasi:", error);
      return { ok: false, error: "Tidak dapat terhubung ke server" };
    }
  };

  const logCurrentCpuSimulation = () => {
    const { algorithm, summary, isSafeOrOptimal } = summarizeCpuSimulation(
      processes,
      selectedAlgorithm,
      timeQuantum,
    );
    return recordSimulatorHistory(
      "CPU Scheduling",
      algorithm,
      summary,
      isSafeOrOptimal,
    );
  };

  const logCurrentDeadlockSimulation = () => {
    const { summary, isSafe } = evaluateDeadlockSafety(deadlockData);
    return recordSimulatorHistory(
      "Deadlock",
      "Banker's Algorithm",
      summary,
      isSafe,
    );
  };

  const handleManualSaveSimulation = async (type: "cpu" | "deadlock") => {
    if (!currentUser) return;

    const result =
      type === "cpu"
        ? await logCurrentCpuSimulation()
        : await logCurrentDeadlockSimulation();

    setSavedNotice(
      result.ok
        ? "Simulasi berhasil disimpan ke database!"
        : `Gagal: ${result.error}`,
    );
    setTimeout(() => setSavedNotice(null), 3000);
  };

  const handleQuizComplete = async (
    moduleType: "cpu" | "deadlock",
    newScore: QuizScoreState,
  ) => {
    setQuizScore(newScore);

    if (!newScore.completed || !currentUser) return;

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
      id: generateId(),
      module: moduleType === "cpu" ? "Kuis Penjadwalan CPU" : "Kuis Deadlock",
      score: correctCount,
      total: newScore.total,
      correct: correctCount,
      wrong: wrongCount,
      finalScore: calculatedFinalScore,
      difficulty: normalizeDifficulty(newScore.difficulty),
      date: formatIndonesianDate(),
    };

    try {
      const response = await fetch(`${API_BASE_URL}/quiz-history`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: currentUser,
          ...attempt,
        }),
      });

      if (!response.ok) {
        const msg = await extractErrorMessage(
          response,
          "Gagal menyimpan riwayat kuis ke database",
        );
        throw new Error(msg);
      }

      const data = await response.json();
      const savedItem: QuizAttempt = data.item ?? attempt;
      setQuizHistory((prevHistory) => [savedItem, ...prevHistory]);
    } catch (error) {
      console.error("Error menyimpan riwayat kuis:", error);
    }
  };

  const handleDeleteQuizHistory = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/quiz-history/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Gagal menghapus riwayat kuis");
      }
      setQuizHistory((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error menghapus riwayat kuis:", error);
    }
  };

  const handleClearQuizHistory = async () => {
    if (!currentUser) return;
    try {
      const response = await fetch(
        `${API_BASE_URL}/quiz-history/user/${encodeURIComponent(currentUser)}`,
        { method: "DELETE" },
      );
      if (!response.ok) {
        throw new Error("Gagal menghapus semua riwayat kuis");
      }
      setQuizHistory([]);
    } catch (error) {
      console.error("Error menghapus semua riwayat kuis:", error);
    }
  };

  const handleDeleteSimulatorHistory = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/simulator-history/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Gagal menghapus riwayat simulasi");
      }
      setSimulatorHistory((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error menghapus riwayat simulasi:", error);
    }
  };

  const handleClearSimulatorHistory = async () => {
    if (!currentUser) return;
    try {
      const response = await fetch(
        `${API_BASE_URL}/simulator-history/user/${encodeURIComponent(currentUser)}`,
        { method: "DELETE" },
      );
      if (!response.ok) {
        throw new Error("Gagal menghapus semua riwayat simulasi");
      }
      setSimulatorHistory([]);
    } catch (error) {
      console.error("Error menghapus semua riwayat simulasi:", error);
    }
  };

  const resetQuizScore = () => {
    setQuizScore(DEFAULT_QUIZ_SCORE);
    localStorage.removeItem(STORAGE_KEYS.QUIZ);
  };

  return {
    quizScore,
    quizHistory,
    simulatorHistory,
    isLoadingHistory,
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
