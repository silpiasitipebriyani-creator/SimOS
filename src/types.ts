export type SchedulingAlgorithm = 'FCFS' | 'SJF' | 'SRTF' | 'RR';

export interface Process {
  id: string;
  name: string;
  arrivalTime: number;
  burstTime: number;
  color: string;
}

export interface GanttSegment {
  id: string;
  processId: string | null;
  processName: string;
  startTime: number;
  endTime: number;
  duration: number;
  color: string;
  isIdle: boolean;
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
  readyQueue: { id: string; name: string }[];
  completedProcesses: string[];
  actionDescription: string;
}

export interface SchedulingResult {
  gantt: GanttSegment[];
  metrics: ProcessMetric[];
  avgWaitingTime: number;
  avgTurnaroundTime: number;
  avgResponseTime: number;
  cpuUtilization: number;
  throughput: number;
  totalTime: number;
  timeline: Record<number, TimelineSnapshot>;
}

export interface DeadlockData {
  numProcesses: number;
  numResources: number;
  processNames: string[];
  resourceNames: string[];
  available: number[];
  allocation: number[][];
  max: number[][];
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
  explanation: string;
}

export interface BankerSafetyResult {
  isSafe: boolean;
  safeSequenceIndices: number[];
  safeSequenceNames: string[];
  steps: BankerStep[];
  message: string;
}

export interface ResourceRequestTest {
  canBeGranted: boolean;
  reason: string;
  safeSequenceAfterGrant?: string[];
}

export interface QuizQuestion {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}