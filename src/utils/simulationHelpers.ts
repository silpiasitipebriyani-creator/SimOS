// src/utils/simulationHelpers.ts
import {
  DeadlockData,
  Process,
  QuizDifficulty,
  SchedulingAlgorithm,
} from "../types";

export function normalizeDifficulty(
  diff?: "mudah" | "sedang" | "sulit" | QuizDifficulty,
): QuizDifficulty {
  if (!diff) return "Sedang";
  const lower = diff.toLowerCase();
  if (lower === "mudah") return "Mudah";
  if (lower === "sulit") return "Sulit";
  return "Sedang";
}

export function summarizeCpuSimulation(
  processes: Process[],
  algorithm: SchedulingAlgorithm,
  timeQuantum: number,
) {
  const totalBurst = processes.reduce((acc, p) => {
    const item = p as Record<string, any>;
    return acc + Number(item.burstTime ?? item.burst ?? 0);
  }, 0);

  const algoLabel =
    algorithm === "RR" ? `Round Robin (Q: ${timeQuantum})` : algorithm;

  return {
    algorithm: algoLabel,
    summary: `${processes.length} Proses • Total Burst Time: ${totalBurst} ms`,
    isSafeOrOptimal: true,
  };
}

export function evaluateDeadlockSafety(deadlockData: DeadlockData) {
  const dataAny = deadlockData as Record<string, any>;
  const alloc: number[][] | undefined = dataAny.allocation ?? dataAny.allocated;
  const max: number[][] | undefined = dataAny.max ?? dataAny.maximum;
  const avail: number[] | undefined = dataAny.available;

  if (
    !Array.isArray(alloc) ||
    !Array.isArray(max) ||
    !Array.isArray(avail) ||
    alloc.length === 0
  ) {
    return { summary: "Analisis Alokasi Resource", isSafe: true };
  }

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
        const canRun = Array.from({ length: m }).every(
          (_, j) =>
            Number(max[i]?.[j] ?? 0) - Number(alloc[i]?.[j] ?? 0) <= work[j],
        );
        if (canRun) {
          for (let j = 0; j < m; j++) work[j] += Number(alloc[i]?.[j] ?? 0);
          finish[i] = true;
          safeSequence.push(`P${i}`);
          progress = true;
        }
      }
    }
  }

  const isSafe = finish.every(Boolean);
  return {
    isSafe,
    summary: isSafe
      ? `Safe Sequence: ${safeSequence.join(" → ")}`
      : `Unsafe State / Potensi Deadlock (${n} Proses)`,
  };
}
