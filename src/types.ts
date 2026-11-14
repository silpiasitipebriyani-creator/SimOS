export type SchedulingAlgorithm = "FCFS" | "SJF" | "SRTF" | "RR";

export type ActiveModule =
  | "home"
  | "cpu"
  | "deadlock"
  | "cpu-quiz"
  | "deadlock-quiz"
  | "profile"
  | "about";

export interface Process {
  id: string;
  name: string;
  arrivalTime: number;
  burstTime: number;
  priority?: number;
  color: string;
}

export interface GanttSegment {
  id: string;
  processId: string;
  processName: string;
  startTime: number;
  endTime: number;
  duration: number;
  isIdle: boolean;
  color: string;
}

export interface QuizQuestion {
  id: number;
  category: string;
  difficulty: "mudah" | "sedang" | "sulit";
  type: "pg" | "esai";
  question: string;
  options?: string[];
  correctAnswer?: number;
  expectedKeywords?: string[];
  explanation: string;
}

export type QuizDifficulty = "Mudah" | "Sedang" | "Sulit";

export interface QuizAttempt {
  id: string;
  module: string;
  score: number;
  total: number;
  correct: number;
  wrong: number;
  finalScore: number;
  difficulty: QuizDifficulty;
  date: string;
}

export interface ProcessMetric {
  id: string;
  name: string;
  arrivalTime: number;
  burstTime: number;
  completionTime: number;
  turnaroundTime: number;
  waitingTime: number;
  responseTime: number;
  color: string;
}

export interface TimelineSnapshot {
  time: number;
  runningProcessId: string | null;
  runningProcessName: string | null;
  readyQueue: { id: string; name: string; remainingTime: number }[];
  completedProcesses: string[];
  actionDescription: string;
}

export interface SchedulingResult {
  algorithm: SchedulingAlgorithm;
  timeQuantum: number;
  gantt: GanttSegment[];
  metrics: ProcessMetric[];
  avgWaitingTime: number;
  avgTurnaroundTime: number;
  avgResponseTime: number;
  cpuUtilization: number;
  throughput: number;
  totalTime: number;
  timeline: TimelineSnapshot[];
}

export interface SimulatorAttempt {
  id: string;
  type: "CPU Scheduling" | "Deadlock";
  algorithm: string;
  summary: string;
  isSafeOrOptimal: boolean;
  date: string;
}

export interface DeadlockData {
  numProcesses: number;
  numResources: number;
  resourceNames: string[];
  processNames: string[];
  available: number[];
  max: number[][];
  allocation: number[][];
  need: number[][];
}

export interface BankerStep {
  step: number;
  processIndex: number;
  processName: string;
  workBefore: number[];
  need: number[];
  allocation: number[];
  workAfter: number[];
  isSatisfied: boolean;
  explanation: string;
}

export interface BankerSafetyResult {
  isSafe: boolean;
  safeSequence: number[];
  safeSequenceNames: string[];
  steps: BankerStep[];
  message: string;
  unfinishedProcesses: string[];
}

export interface ResourceRequestTest {
  processIndex: number;
  requestVector: number[];
  canBeGranted: boolean;
  isSafeAfterGrant: boolean;
  safeSequenceAfterGrant?: string[];
  reason: string;
}
