import { Process, DeadlockData, SchedulingAlgorithm } from '../types';

export interface CpuPreset {
  name: string;
  algorithm: SchedulingAlgorithm;
  quantum: number;
  processes: Process[];
}

export interface DeadlockPreset {
  name: string;
  data: DeadlockData;
}

export const CPU_PRESETS: CpuPreset[] = [
  {
    name: 'Kasus Standar FCFS',
    algorithm: 'FCFS',
    quantum: 2,
    processes: [
      { id: 'p1', name: 'P1', arrivalTime: 0, burstTime: 5, color: '#2563eb' },
      { id: 'p2', name: 'P2', arrivalTime: 1, burstTime: 3, color: '#10b981' },
      { id: 'p3', name: 'P3', arrivalTime: 2, burstTime: 8, color: '#f59e0b' },
      { id: 'p4', name: 'P4', arrivalTime: 3, burstTime: 6, color: '#8b5cf6' },
    ],
  },
  {
    name: 'Skenario Convoy Effect (FCFS vs SJF)',
    algorithm: 'SJF',
    quantum: 2,
    processes: [
      { id: 'p1', name: 'P1', arrivalTime: 0, burstTime: 10, color: '#2563eb' },
      { id: 'p2', name: 'P2', arrivalTime: 1, burstTime: 2, color: '#10b981' },
      { id: 'p3', name: 'P3', arrivalTime: 2, burstTime: 3, color: '#f59e0b' },
    ],
  },
  {
    name: 'Simulasi Round Robin (Quantum = 2)',
    algorithm: 'RR',
    quantum: 2,
    processes: [
      { id: 'p1', name: 'P1', arrivalTime: 0, burstTime: 5, color: '#2563eb' },
      { id: 'p2', name: 'P2', arrivalTime: 1, burstTime: 4, color: '#10b981' },
      { id: 'p3', name: 'P3', arrivalTime: 2, burstTime: 2, color: '#f59e0b' },
    ],
  },
];

export const DEADLOCK_PRESETS: DeadlockPreset[] = [
  {
    name: 'Kondisi Aman (Safe State - Standard OS)',
    data: {
      numProcesses: 5,
      numResources: 3,
      processNames: ['P0', 'P1', 'P2', 'P3', 'P4'],
      resourceNames: ['A', 'B', 'C'],
      available: [3, 3, 2],
      allocation: [
        [0, 1, 0],
        [2, 0, 0],
        [3, 0, 2],
        [2, 1, 1],
        [0, 0, 2],
      ],
      max: [
        [7, 5, 3],
        [3, 2, 2],
        [9, 0, 2],
        [2, 2, 2],
        [4, 3, 3],
      ],
      need: [
        [7, 4, 3],
        [1, 2, 2],
        [6, 0, 0],
        [0, 1, 1],
        [4, 3, 1],
      ],
    },
  },
  {
    name: 'Kondisi Berbahaya / Deadlock (Unsafe State)',
    data: {
      numProcesses: 3,
      numResources: 3,
      processNames: ['P0', 'P1', 'P2'],
      resourceNames: ['A', 'B', 'C'],
      available: [1, 1, 0],
      allocation: [
        [2, 0, 1],
        [1, 2, 1],
        [1, 0, 3],
      ],
      max: [
        [3, 2, 2],
        [2, 3, 2],
        [2, 2, 3],
      ],
      need: [
        [1, 2, 1],
        [1, 1, 1],
        [1, 2, 0],
      ],
    },
  },
];