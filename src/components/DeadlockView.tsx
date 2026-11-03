import React, { useState } from 'react';
import {
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles,
  Info,
  Layers,
  ArrowRight,
  Send,
  HelpCircle,
  Plus,
  Minus,
  GraduationCap,
} from 'lucide-react';
import { DeadlockData, BankerSafetyResult, ResourceRequestTest } from '../types';
import { runBankersSafetyAlgorithm, testResourceRequest, calculateNeedMatrix } from '../utils/bankerAlgorithm';
import { DEADLOCK_PRESETS } from '../utils/presets';

interface DeadlockViewProps {
  deadlockData: DeadlockData;
  onChangeDeadlockData: (data: DeadlockData) => void;
  onOpenQuiz: () => void;
}

export const DeadlockView: React.FC<DeadlockViewProps> = ({
  deadlockData,
  onChangeDeadlockData,
  onOpenQuiz,
}) => {
  // Test request state
  const [selectedProcessIdx, setSelectedProcessIdx] = useState(0);
  const [requestVector, setRequestVector] = useState<number[]>(
    Array(deadlockData.numResources).fill(0)
  );
  const [testResult, setTestResult] = useState<ResourceRequestTest | null>(null);

  // Active step view in Banker's walkthrough
  const [activeStepTab, setActiveStepTab] = useState<'all' | number>('all');

  // Compute Banker's safety result
  const safetyResult: BankerSafetyResult = runBankersSafetyAlgorithm(deadlockData);
  const needMatrix = calculateNeedMatrix(deadlockData.max, deadlockData.allocation);

  // Update Available Vector Cell
  const handleUpdateAvailable = (rIdx: number, val: number) => {
    const updated = [...deadlockData.available];
    updated[rIdx] = Math.max(0, val);
    onChangeDeadlockData({ ...deadlockData, available: updated });
    setTestResult(null);
  };

  // Update Allocation Cell
  const handleUpdateAllocation = (pIdx: number, rIdx: number, val: number) => {
    const updated = deadlockData.allocation.map((row) => [...row]);
    updated[pIdx][rIdx] = Math.max(0, val);
    onChangeDeadlockData({
      ...deadlockData,
      allocation: updated,
      need: calculateNeedMatrix(deadlockData.max, updated),
    });
    setTestResult(null);
  };

  // Update Max Cell
  const handleUpdateMax = (pIdx: number, rIdx: number, val: number) => {
    const updated = deadlockData.max.map((row) => [...row]);
    updated[pIdx][rIdx] = Math.max(0, val);
    onChangeDeadlockData({
      ...deadlockData,
      max: updated,
      need: calculateNeedMatrix(updated, deadlockData.allocation),
    });
    setTestResult(null);
  };

  // Load Preset
  const handleLoadPreset = (presetIndex: number) => {
    const preset = DEADLOCK_PRESETS[presetIndex];
    if (preset) {
      onChangeDeadlockData(JSON.parse(JSON.stringify(preset.data)));
      setRequestVector(Array(preset.data.numResources).fill(0));
      setTestResult(null);
    }
  };

  // Add Process
  const handleAddProcess = () => {
    if (deadlockData.numProcesses >= 6) return;
    const newCount = deadlockData.numProcesses + 1;
    const pName = `P${newCount - 1}`;
    const newProcessNames = [...deadlockData.processNames, pName];
    const newAlloc = [...deadlockData.allocation, Array(deadlockData.numResources).fill(0)];
    const newMax = [...deadlockData.max, Array(deadlockData.numResources).fill(2)];

    onChangeDeadlockData({
      ...deadlockData,
      numProcesses: newCount,
      processNames: newProcessNames,
      allocation: newAlloc,
      max: newMax,
      need: calculateNeedMatrix(newMax, newAlloc),
    });
    setTestResult(null);
  };

  // Remove Process
  const handleRemoveProcess = () => {
    if (deadlockData.numProcesses <= 2) return;
    const newCount = deadlockData.numProcesses - 1;
    const newProcessNames = deadlockData.processNames.slice(0, newCount);
    const newAlloc = deadlockData.allocation.slice(0, newCount);
    const newMax = deadlockData.max.slice(0, newCount);

    onChangeDeadlockData({
      ...deadlockData,
      numProcesses: newCount,
      processNames: newProcessNames,
      allocation: newAlloc,
      max: newMax,
      need: calculateNeedMatrix(newMax, newAlloc),
    });
    if (selectedProcessIdx >= newCount) {
      setSelectedProcessIdx(0);
    }
    setTestResult(null);
  };

  // Handle Run Request Test
  const handleRunRequestTest = (e: React.FormEvent) => {
    e.preventDefault();
    const result = testResourceRequest(deadlockData, selectedProcessIdx, requestVector);
    setTestResult(result);
  };

  // Synchronize request vector length if resources change
  if (requestVector.length !== deadlockData.numResources) {
    setRequestVector(Array(deadlockData.numResources).fill(0));
  }

  return (
    <div className="space-y-6">
      {/* Header & Preset Selector */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 soft-shadow flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <ShieldAlert className="w-4 h-4" />
            </span>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Penanganan Deadlock: Banker's Algorithm
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Uji keadaan aman (Safe State) dan simulasikan algoritma pencegahan deadlock secara interaktif.
          </p>
        </div>

        {/* Presets dropdown & process adjusters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              Preset Kasus:
            </span>
            <select
              onChange={(e) => handleLoadPreset(Number(e.target.value))}
              defaultValue=""
              className="text-xs py-1.5 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            >
              <option value="" disabled>
                Pilih Skenario Kasus...
              </option>
              {DEADLOCK_PRESETS.map((p, idx) => (
                <option key={p.name} value={idx}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-100 dark:bg-slate-800">
            <span className="text-[11px] font-semibold text-slate-500 px-1">Proses:</span>
            <button
              onClick={handleRemoveProcess}
              disabled={deadlockData.numProcesses <= 2}
              className="p-1 rounded-md bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 disabled:opacity-40"
              title="Kurangi Proses"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-bold font-mono px-1">
              {deadlockData.numProcesses}
            </span>
            <button
              onClick={handleAddProcess}
              disabled={deadlockData.numProcesses >= 6}
              className="p-1 rounded-md bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 disabled:opacity-40"
              title="Tambah Proses"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Prominent Quiz Button */}
          <button
            onClick={onOpenQuiz}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-500/20 transition-all active:scale-95 shrink-0"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Coba Kuis Deadlock</span>
          </button>
        </div>
      </div>

      {/* Safety Status Banner */}
      <div
        className={`p-6 rounded-2xl border transition-all duration-300 ${
          safetyResult.isSafe
            ? 'bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-blue-500/10 border-emerald-500/30 dark:border-emerald-500/40'
            : 'bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-red-500/10 border-rose-500/30 dark:border-rose-500/40'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span
                className={`p-2 rounded-xl text-white ${
                  safetyResult.isSafe ? 'bg-emerald-600 shadow-md shadow-emerald-500/20' : 'bg-rose-600 shadow-md shadow-rose-500/20'
                }`}
              >
                {safetyResult.isSafe ? <CheckCircle2 className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h3
                    className={`text-lg font-extrabold ${
                      safetyResult.isSafe ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'
                    }`}
                  >
                    {safetyResult.isSafe ? 'SISTEM BERADA DALAM KEADAAN AMAN (SAFE STATE)' : 'PERINGATAN: SISTEM TIDAK AMAN (UNSAFE STATE)'}
                  </h3>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      safetyResult.isSafe
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200'
                        : 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-200'
                    }`}
                  >
                    {safetyResult.isSafe ? 'Bebas Deadlock' : 'Deadlock / Macet'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 max-w-3xl leading-relaxed">
                  {safetyResult.message}
                </p>
              </div>
            </div>

            {/* Safe Sequence Chain */}
            {safetyResult.isSafe && (
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                  Urutan Eksekusi Aman (Safe Sequence):
                </span>
                <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-emerald-300 dark:border-emerald-800">
                  {safetyResult.safeSequenceNames.map((pName, idx) => (
                    <React.Fragment key={pName}>
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-mono text-xs font-bold shadow-xs">
                        {pName}
                      </span>
                      {idx < safetyResult.safeSequenceNames.length - 1 && (
                        <ArrowRight className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Available Vector Card */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 soft-shadow space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Vektor Sumber Daya Tersedia (Available Vector)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Jumlah unit sumber daya saat ini yang belum dialokasikan dan siap digunakan.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          {deadlockData.resourceNames.map((rName, rIdx) => (
            <div
              key={rName}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between"
            >
              <div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {rName}
                </span>
                <span className="block text-[10px] text-slate-400">Tersedia</span>
              </div>
              <input
                type="number"
                min="0"
                max="99"
                value={deadlockData.available[rIdx]}
                onChange={(e) => handleUpdateAvailable(rIdx, Number(e.target.value))}
                className="w-14 text-center text-sm font-mono font-bold py-1 px-2 rounded-lg bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Allocation, Max, and Need Matrices */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Allocation Matrix */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 soft-shadow space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Matriks Allocation
            </h3>
            <span className="text-[10px] text-slate-400">Sudah dipegang</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-center text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 text-[10px]">
                  <th className="py-2 text-left">Proc</th>
                  {deadlockData.resourceNames.map((r) => (
                    <th key={r} className="py-2 font-mono">
                      {r}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                {deadlockData.processNames.map((pName, pIdx) => (
                  <tr key={pName} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-2 text-left font-sans font-bold text-slate-800 dark:text-slate-200">
                      {pName}
                    </td>
                    {deadlockData.resourceNames.map((_, rIdx) => (
                      <td key={rIdx} className="py-1 px-1">
                        <input
                          type="number"
                          min="0"
                          max="99"
                          value={deadlockData.allocation[pIdx][rIdx]}
                          onChange={(e) => handleUpdateAllocation(pIdx, rIdx, Number(e.target.value))}
                          className="w-10 text-center py-1 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Max Matrix */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 soft-shadow space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              Matriks Max
            </h3>
            <span className="text-[10px] text-slate-400">Klaim Maksimum</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-center text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 text-[10px]">
                  <th className="py-2 text-left">Proc</th>
                  {deadlockData.resourceNames.map((r) => (
                    <th key={r} className="py-2 font-mono">
                      {r}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                {deadlockData.processNames.map((pName, pIdx) => (
                  <tr key={pName} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-2 text-left font-sans font-bold text-slate-800 dark:text-slate-200">
                      {pName}
                    </td>
                    {deadlockData.resourceNames.map((_, rIdx) => {
                      const isInvalid = deadlockData.allocation[pIdx][rIdx] > deadlockData.max[pIdx][rIdx];
                      return (
                        <td key={rIdx} className="py-1 px-1">
                          <input
                            type="number"
                            min="0"
                            max="99"
                            value={deadlockData.max[pIdx][rIdx]}
                            onChange={(e) => handleUpdateMax(pIdx, rIdx, Number(e.target.value))}
                            className={`w-10 text-center py-1 rounded bg-slate-50 dark:bg-slate-800 border ${
                              isInvalid
                                ? 'border-red-500 text-red-500 ring-1 ring-red-400'
                                : 'border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                            } focus:ring-1 focus:ring-purple-500 focus:outline-none`}
                            title={isInvalid ? 'Alokasi tidak boleh melebihi Max!' : ''}
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Need Matrix (Auto Calculated) */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 soft-shadow space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Matriks Need (Otomatis)
            </h3>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold font-mono">
              Max - Alloc
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-center text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 text-[10px]">
                  <th className="py-2 text-left">Proc</th>
                  {deadlockData.resourceNames.map((r) => (
                    <th key={r} className="py-2 font-mono">
                      {r}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                {deadlockData.processNames.map((pName, pIdx) => (
                  <tr key={pName} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-2 text-left font-sans font-bold text-slate-800 dark:text-slate-200">
                      {pName}
                    </td>
                    {deadlockData.resourceNames.map((_, rIdx) => (
                      <td key={rIdx} className="py-2 px-1">
                        <span className="inline-block w-10 py-1 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 font-bold text-emerald-700 dark:text-emerald-300">
                          {needMatrix[pIdx][rIdx]}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Banker's Algorithm Step-by-Step Walkthrough */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 soft-shadow space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-600" />
            Langkah Eksekusi Banker's Algorithm (Safety Walkthrough)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Mekanisme pengecekan kondisi Need ≤ Work dan pembaruan vektor kerja (Work = Work + Allocation).
          </p>
        </div>

        {safetyResult.steps.length > 0 ? (
          <div className="space-y-3">
            {safetyResult.steps.map((st) => (
              <div
                key={st.step}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/80 space-y-2.5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                      {st.step}
                    </span>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      Proses Terpilih: {st.processName}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                      Need ≤ Work Terpenuhi
                    </span>
                  </div>

                  <div className="text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400">
                    Work Akhir: [{st.workAfter.join(', ')}]
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {st.explanation}
                </p>

                {/* Calculation breakdown row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px] font-mono">
                  <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Work Awal:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      [{st.workBefore.join(', ')}]
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Need {st.processName}:</span>
                    <span className="font-bold text-amber-600 dark:text-amber-400">
                      [{st.need.join(', ')}]
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Alokasi yang Dilepas:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      + [{st.allocation.join(', ')}]
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300">
            Tidak ada satu pun proses yang memiliki Need ≤ Work saat ini. Sistem macet total (Deadlock).
          </div>
        )}
      </div>

      {/* Resource Request Algorithm Tester */}
      <div className="p-5 md:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 soft-shadow space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Send className="w-4 h-4 text-blue-600" />
            Uji Permintaan Sumber Daya (Resource-Request Algorithm)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Simulasikan jika proses tertentu mengajukan permintaan tambahan: apakah OS dapat langsung memberikannya atau proses harus menunggu?
          </p>
        </div>

        <form onSubmit={handleRunRequestTest} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Pilih Proses Pemohon:
              </label>
              <select
                value={selectedProcessIdx}
                onChange={(e) => {
                  setSelectedProcessIdx(Number(e.target.value));
                  setTestResult(null);
                }}
                className="w-full text-xs py-2 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
              >
                {deadlockData.processNames.map((name, idx) => (
                  <option key={name} value={idx}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            {deadlockData.resourceNames.map((rName, rIdx) => (
              <div key={rName}>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Minta {rName}:
                </label>
                <input
                  type="number"
                  min="0"
                  max="99"
                  value={requestVector[rIdx] || 0}
                  onChange={(e) => {
                    const updated = [...requestVector];
                    updated[rIdx] = Math.max(0, Number(e.target.value) || 0);
                    setRequestVector(updated);
                    setTestResult(null);
                  }}
                  className="w-full text-xs font-mono text-center py-2 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}

            <div>
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20 transition-all active:scale-95"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Uji Permintaan
              </button>
            </div>
          </div>
        </form>

        {/* Test Result Feedback Box */}
        {testResult && (
          <div
            className={`p-4 rounded-xl border transition-all ${
              testResult.canBeGranted
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
                : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-200'
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="p-1 rounded-lg shrink-0 mt-0.5">
                {testResult.canBeGranted ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                )}
              </span>
              <div className="space-y-1">
                <h4 className="text-xs font-bold">
                  {testResult.canBeGranted ? 'Hasil Uji: Permintaan Disetujui' : 'Hasil Uji: Permintaan Ditahan / Ditolak'}
                </h4>
                <p className="text-xs leading-relaxed">{testResult.reason}</p>
                {testResult.safeSequenceAfterGrant && (
                  <div className="pt-2 flex items-center gap-2 text-[11px] font-mono">
                    <span className="font-bold">Urutan Aman Baru:</span>
                    <span>&lt; {testResult.safeSequenceAfterGrant.join(' ➔ ')} &gt;</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
