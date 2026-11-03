import { Process, DeadlockData } from '../types';

export const CPU_PRESETS: { name: string; description: string; algorithm: 'FCFS' | 'SJF' | 'SRTF' | 'RR'; quantum: number; processes: Process[] }[] = [
  {
    name: 'Kasus Klasik Buku Teks (Silberschatz)',
    description: 'Contoh 4 proses heterogen yang sering digunakan untuk membandingkan FCFS, SJF, dan SRTF.',
    algorithm: 'FCFS',
    quantum: 2,
    processes: [
      { id: 'p1', name: 'P1', arrivalTime: 0, burstTime: 8, color: '#2563eb' },
      { id: 'p2', name: 'P2', arrivalTime: 1, burstTime: 4, color: '#10b981' },
      { id: 'p3', name: 'P3', arrivalTime: 2, burstTime: 9, color: '#f59e0b' },
      { id: 'p4', name: 'P4', arrivalTime: 3, burstTime: 5, color: '#8b5cf6' },
    ],
  },
  {
    name: 'Demonstrasi Convoy Effect (FCFS)',
    description: 'Proses P1 dengan Burst Time sangat besar (24) tiba lebih dulu, membuat proses kecil menunggu sangat lama.',
    algorithm: 'FCFS',
    quantum: 2,
    processes: [
      { id: 'p1', name: 'P1 (Raksasa)', arrivalTime: 0, burstTime: 24, color: '#ef4444' },
      { id: 'p2', name: 'P2 (Kecil)', arrivalTime: 0, burstTime: 3, color: '#10b981' },
      { id: 'p3', name: 'P3 (Kecil)', arrivalTime: 0, burstTime: 3, color: '#06b6d4' },
    ],
  },
  {
    name: 'Demonstrasi Preemption (SRTF)',
    description: 'Proses P1 mulai jalan, lalu proses lebih pendek (P2 dan P3) tiba dan langsung mengambil alih (preempt) CPU.',
    algorithm: 'SRTF',
    quantum: 2,
    processes: [
      { id: 'p1', name: 'P1', arrivalTime: 0, burstTime: 8, color: '#3b82f6' },
      { id: 'p2', name: 'P2', arrivalTime: 1, burstTime: 4, color: '#10b981' },
      { id: 'p3', name: 'P3', arrivalTime: 2, burstTime: 9, color: '#f59e0b' },
      { id: 'p4', name: 'P4', arrivalTime: 3, burstTime: 5, color: '#ec4899' },
    ],
  },
  {
    name: 'Round Robin Time Slice Demo',
    description: 'Empat proses bersaing dengan Time Quantum = 3 untuk pembagian waktu CPU yang adil dan responsif.',
    algorithm: 'RR',
    quantum: 3,
    processes: [
      { id: 'p1', name: 'P1', arrivalTime: 0, burstTime: 6, color: '#6366f1' },
      { id: 'p2', name: 'P2', arrivalTime: 1, burstTime: 4, color: '#14b8a6' },
      { id: 'p3', name: 'P3', arrivalTime: 2, burstTime: 8, color: '#f97316' },
      { id: 'p4', name: 'P4', arrivalTime: 4, burstTime: 3, color: '#a855f7' },
    ],
  },
];

export const DEADLOCK_PRESETS: { name: string; description: string; data: DeadlockData }[] = [
  {
    name: 'Silberschatz Klasik (Keadaan Aman)',
    description: '5 Proses (P0-P4) dan 3 Sumber Daya (A, B, C). Tersedia urutan aman: < P1 ➔ P3 ➔ P4 ➔ P0 ➔ P2 >.',
    data: {
      numProcesses: 5,
      numResources: 3,
      resourceNames: ['A', 'B', 'C'],
      processNames: ['P0', 'P1', 'P2', 'P3', 'P4'],
      available: [3, 3, 2],
      allocation: [
        [0, 1, 0], // P0
        [2, 0, 0], // P1
        [3, 0, 2], // P2
        [2, 1, 1], // P3
        [0, 0, 2], // P4
      ],
      max: [
        [7, 5, 3], // P0
        [3, 2, 2], // P1
        [9, 0, 2], // P2
        [2, 2, 2], // P3
        [4, 3, 3], // P4
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
    name: 'Kasus Deadlock / Tidak Aman (Unsafe State)',
    description: 'Kebutuhan (Need) dari semua proses melebihi Available yang tersisa, tidak ada proses yang dapat selesai.',
    data: {
      numProcesses: 4,
      numResources: 3,
      resourceNames: ['A', 'B', 'C'],
      processNames: ['P0', 'P1', 'P2', 'P3'],
      available: [1, 0, 0],
      allocation: [
        [2, 1, 1],
        [1, 2, 0],
        [1, 1, 2],
        [2, 0, 1],
      ],
      max: [
        [4, 2, 3],
        [3, 3, 2],
        [2, 3, 4],
        [4, 1, 3],
      ],
      need: [
        [2, 1, 2],
        [2, 1, 2],
        [1, 2, 2],
        [2, 1, 2],
      ],
    },
  },
  {
    name: 'Sistem 4 Sumber Daya (A, B, C, D)',
    description: 'Simulasi sistem modern dengan 4 jenis perangkat (CPU, Memori, Disk, Printer).',
    data: {
      numProcesses: 4,
      numResources: 4,
      resourceNames: ['CPU (A)', 'RAM (B)', 'Disk (C)', 'IO (D)'],
      processNames: ['P0', 'P1', 'P2', 'P3'],
      available: [2, 1, 0, 1],
      allocation: [
        [0, 0, 1, 2],
        [1, 0, 0, 0],
        [1, 3, 5, 4],
        [0, 6, 3, 2],
      ],
      max: [
        [0, 0, 1, 2],
        [1, 7, 5, 0],
        [2, 3, 5, 6],
        [0, 6, 5, 2],
      ],
      need: [
        [0, 0, 0, 0],
        [0, 7, 5, 0],
        [1, 0, 0, 2],
        [0, 0, 2, 0],
      ],
    },
  },
];
