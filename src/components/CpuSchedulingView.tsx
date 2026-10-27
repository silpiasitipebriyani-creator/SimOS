import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  Plus,
  Trash2,
  Cpu,
  Layers,
  Sparkles,
  Clock,
  Activity,
  GraduationCap,
  ArrowLeft,
} from 'lucide-react';
import { Process, SchedulingAlgorithm, SchedulingResult } from '../types';
import { runCpuScheduling } from '../utils/schedulingAlgorithms';
import { CPU_PRESETS } from '../utils/presets';

interface CpuSchedulingViewProps {
  processes: Process[];
  onChangeProcesses: (procs: Process[]) => void;
  selectedAlgorithm: SchedulingAlgorithm;
  onSelectAlgorithm: (algo: SchedulingAlgorithm) => void;
  timeQuantum: number;
  onChangeTimeQuantum: (q: number) => void;
  onOpenQuiz: () => void;
}

const PRESET_COLORS = [
  '#2563eb', // Blue
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#8b5cf6', // Violet
  '#ec4899', // Pink
  '#06b6d4', // Cyan
  '#f97316', // Orange
  '#64748b', // Slate
];

export const CpuSchedulingView: React.FC<CpuSchedulingViewProps> = ({
  processes,
  onChangeProcesses,
  selectedAlgorithm,
  onSelectAlgorithm,
  timeQuantum,
  onChangeTimeQuantum,
  onOpenQuiz,
}) => {
  const [newName, setNewName] = useState('');
  const [newArrival, setNewArrival] = useState(0);
  const [newBurst, setNewBurst] = useState(4);

  const [currentStepTime, setCurrentStepTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const result: SchedulingResult = runCpuScheduling(processes, selectedAlgorithm, timeQuantum);

  useEffect(() => {
    if (currentStepTime > result.totalTime) {
      setCurrentStepTime(result.totalTime);
    }
  }, [result.totalTime, currentStepTime]);

  useEffect(() => {
    if (isPlaying) {
      const intervalMs = 1000 / playbackSpeed;
      timerRef.current = setInterval(() => {
        setCurrentStepTime((prev) => {
          if (prev >= result.totalTime) {
            setIsPlaying(false);
            return result.totalTime;
          }
          return prev + 1;
        });
      }, intervalMs);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackSpeed, result.totalTime]);

  const handleAddProcess = (e: React.FormEvent) => {
    e.preventDefault();
    const name = newName.trim() || `P${processes.length + 1}`;
    const nextColor = PRESET_COLORS[processes.length % PRESET_COLORS.length];

    const newProc: Process = {
      id: `p-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      name,
      arrivalTime: Math.max(0, Number(newArrival) || 0),
      burstTime: Math.max(1, Number(newBurst) || 1),
      color: nextColor,
    };

    onChangeProcesses([...processes, newProc]);
    setNewName('');
    setNewArrival(0);
    setNewBurst(4);
    setCurrentStepTime(0);
    setIsPlaying(false);
  };

  const handleRemoveProcess = (id: string) => {
    if (processes.length <= 1) return;
    onChangeProcesses(processes.filter((p) => p.id !== id));
    setCurrentStepTime(0);
    setIsPlaying(false);
  };

  const handleUpdateProcess = (id: string, field: 'arrivalTime' | 'burstTime', value: number) => {
    const updated = processes.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          [field]: field === 'burstTime' ? Math.max(1, value) : Math.max(0, value),
        };
      }
      return p;
    });
    onChangeProcesses(updated);
    setCurrentStepTime(0);
    setIsPlaying(false);
  };

  const handleGenerateRandom = () => {
    const count = 4;
    const randomized: Process[] = [];
    for (let i = 0; i < count; i++) {
      randomized.push({
        id: `p-${Date.now()}-${i}`,
        name: `P${i + 1}`,
        arrivalTime: Math.floor(Math.random() * 5),
        burstTime: Math.floor(Math.random() * 8) + 2,
        color: PRESET_COLORS[i % PRESET_COLORS.length],
      });
    }
    onChangeProcesses(randomized);
    setCurrentStepTime(0);
    setIsPlaying(false);
  };

  const handleLoadPreset = (presetIndex: number) => {
    const preset = CPU_PRESETS[presetIndex];
    if (preset) {
      onChangeProcesses(preset.processes);
      onSelectAlgorithm(preset.algorithm);
      onChangeTimeQuantum(preset.quantum);
      setCurrentStepTime(0);
      setIsPlaying(false);
    }
  };

  const currentSnapshot = result.timeline[currentStepTime] || {
    time: currentStepTime,
    runningProcessId: null,
    runningProcessName: null,
    readyQueue: [],
    completedProcesses: [],
    actionDescription: 'Mulai simulasi...',
  };

  return (
    <div className="space-y-6">
      {/* Header with Algorithm Switcher & Quiz Button */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 soft-shadow flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <Cpu className="w-4 h-4" />
            </span>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Simulator Penjadwalan CPU
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Pilih algoritma, sesuaikan proses, dan amati Diagram Gantt.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80">
            {(['FCFS', 'SJF', 'SRTF', 'RR'] as SchedulingAlgorithm[]).map((algo) => {
              const isSelected = selectedAlgorithm === algo;
              return (
                <button
                  key={algo}
                  onClick={() => {
                    onSelectAlgorithm(algo);
                    setCurrentStepTime(0);
                    setIsPlaying(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {algo === 'RR' ? 'Round Robin (RR)' : algo}
                </button>
              );
            })}
          </div>

          <button
            onClick={onOpenQuiz}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-500/20 transition-all active:scale-95 shrink-0"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Coba Kuis CPU</span>
          </button>
        </div>
      </div>

      {/* Preset & Time Quantum Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 shrink-0">
            Pilihan Kasus Preset:
          </span>
          <select
            onChange={(e) => handleLoadPreset(Number(e.target.value))}
            defaultValue=""
            className="text-xs py-1.5 px-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto font-medium"
          >
            <option value="" disabled>
              Pilih Skenario Kasus...
            </option>
            {CPU_PRESETS.map((p, idx) => (
              <option key={p.name} value={idx}>
                {p.name} ({p.algorithm})
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          {selectedAlgorithm === 'RR' && (
            <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60">
              <span className="text-xs font-bold text-blue-700 dark:text-blue-300">
                Time Quantum (q):
              </span>
              <input
                type="number"
                min="1"
                max="20"
                value={timeQuantum}
                onChange={(e) => onChangeTimeQuantum(Math.max(1, Number(e.target.value) || 1))}
                className="w-14 text-center text-xs font-bold py-1 px-1.5 rounded-md bg-white dark:bg-slate-800 border border-blue-300 dark:border-blue-700 text-blue-900 dark:text-blue-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          )}

          <button
            onClick={handleGenerateRandom}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Acak Proses
          </button>
        </div>
      </div>

      {/* Main Grid: Process Table & Inputs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 soft-shadow space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              Daftar Proses Masukan ({processes.length})
            </h3>
            <span className="text-[11px] text-slate-400">
              Klik angka untuk mengubah nilai Arrival/Burst Time secara langsung.
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase text-[10px] tracking-wider">
                  <th className="py-2.5 px-3">Nama Proses</th>
                  <th className="py-2.5 px-3">Arrival Time (AT)</th>
                  <th className="py-2.5 px-3">Burst Time (BT)</th>
                  <th className="py-2.5 px-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {processes.map((proc) => (
                  <tr key={proc.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full shrink-0 shadow-xs"
                          style={{ backgroundColor: proc.color }}
                        />
                        <span className="font-bold text-slate-900 dark:text-white">
                          {proc.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={proc.arrivalTime}
                        onChange={(e) => handleUpdateProcess(proc.id, 'arrivalTime', Number(e.target.value))}
                        className="w-18 py-1 px-2 text-xs rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-mono focus:ring-1 focus:ring-blue-500 focus:outline-none"
                      />
                    </td>
                    <td className="py-2.5 px-3">
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={proc.burstTime}
                        onChange={(e) => handleUpdateProcess(proc.id, 'burstTime', Number(e.target.value))}
                        className="w-18 py-1 px-2 text-xs rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-mono focus:ring-1 focus:ring-blue-500 focus:outline-none"
                      />
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        onClick={() => handleRemoveProcess(proc.id)}
                        disabled={processes.length <= 1}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 disabled:opacity-30 transition-colors"
                        title="Hapus proses"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 soft-shadow space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Plus className="w-4 h-4 text-emerald-600" />
            Tambah Proses Baru
          </h3>

          <form onSubmit={handleAddProcess} className="space-y-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Nama / ID Proses
              </label>
              <input
                type="text"
                placeholder={`Contoh: P${processes.length + 1}`}
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full text-xs py-2 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Arrival Time (AT)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={newArrival}
                  onChange={(e) => setNewArrival(Number(e.target.value))}
                  className="w-full text-xs py-2 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Burst Time (BT)
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={newBurst}
                  onChange={(e) => setNewBurst(Number(e.target.value))}
                  className="w-full text-xs py-2 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              Tambahkan ke Daftar
            </button>
          </form>
        </div>
      </div>

      {/* Gantt Chart & Playback Controls */}
      <div className="p-5 md:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 soft-shadow space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              Diagram Gantt Interaktif (Gantt Chart)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Visualisasi alokasi CPU per satuan waktu dengan kontrol pemutaran langkah demi langkah.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0">
            <button
              onClick={() => {
                setIsPlaying(false);
                setCurrentStepTime(0);
              }}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition-colors"
              title="Reset ke Waktu 0"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setIsPlaying(false);
                setCurrentStepTime((prev) => Math.max(0, prev - 1));
              }}
              disabled={currentStepTime <= 0}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 disabled:opacity-30 transition-colors"
              title="Langkah Sebelumnya"
            >
              <SkipBack className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isPlaying ? 'Jeda' : 'Putar'}</span>
            </button>
            <button
              onClick={() => {
                setIsPlaying(false);
                setCurrentStepTime((prev) => Math.min(result.totalTime, prev + 1));
              }}
              disabled={currentStepTime >= result.totalTime}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 disabled:opacity-30 transition-colors"
              title="Langkah Berikutnya"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live Step Narration Box */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-mono font-bold text-xs shadow-xs">
              Waktu t = {currentStepTime}
            </div>
            <div className="space-y-0.5">
              <div className="text-xs font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Status CPU:</span>
                {currentSnapshot.runningProcessName ? (
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-bold">
                    Sedang Eksekusi {currentSnapshot.runningProcessName}
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold">
                    CPU Menganggur (IDLE)
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {currentSnapshot.actionDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Visual Gantt Chart Bar */}
        {result.gantt.length > 0 && (
          <div className="space-y-2">
            <div className="relative w-full overflow-x-auto pb-4 pt-2">
              <div className="min-w-[600px]">
                <div className="relative flex h-14 w-full rounded-xl overflow-hidden border border-slate-300 dark:border-slate-700 shadow-inner">
                  {result.gantt.map((seg) => {
                    const widthPercent = (seg.duration / result.totalTime) * 100;
                    const isPassed = seg.endTime <= currentStepTime;
                    const isCurrent =
                      currentStepTime >= seg.startTime &&
                      (currentStepTime < seg.endTime ||
                        (currentStepTime === result.totalTime && currentStepTime === seg.endTime));

                    return (
                      <div
                        key={seg.id}
                        style={{
                          width: `${widthPercent}%`,
                          backgroundColor: seg.isIdle ? '#94a3b8' : seg.color,
                        }}
                        className={`relative h-full flex flex-col items-center justify-center text-white border-r border-white/20 transition-all duration-200 ${
                          isCurrent ? 'ring-4 ring-blue-500 z-10 brightness-110 shadow-lg' : ''
                        } ${!isPassed && !isCurrent ? 'opacity-40' : 'opacity-100'}`}
                      >
                        <span className="text-xs font-extrabold tracking-wide truncate px-1">
                          {seg.processName}
                        </span>
                        <span className="text-[10px] font-mono opacity-90">
                          {seg.duration} unit
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="relative flex w-full text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 mt-1.5">
                  <span className="absolute left-0">0</span>
                  {result.gantt.map((seg) => {
                    const rightPercent = (seg.endTime / result.totalTime) * 100;
                    return (
                      <span
                        key={`tick-${seg.id}`}
                        style={{ left: `${rightPercent}%` }}
                        className="absolute -translate-x-1/2"
                      >
                        {seg.endTime}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Output Metrics: 4 Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 soft-shadow">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
            Rata-rata Waktu Tunggu (AWT)
          </span>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-mono">
              {result.avgWaitingTime}
            </span>
            <span className="text-xs text-slate-400">unit</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 soft-shadow">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
            Rata-rata Turnaround (ATAT)
          </span>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">
              {result.avgTurnaroundTime}
            </span>
            <span className="text-xs text-slate-400">unit</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 soft-shadow">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
            Utilisasi CPU (Efficiency)
          </span>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
              {result.cpuUtilization}%
            </span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 soft-shadow">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
            Throughput Sistem
          </span>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 font-mono">
              {result.throughput}
            </span>
            <span className="text-xs text-slate-400">proses/unit</span>
          </div>
        </div>
      </div>
    </div>
  );
};