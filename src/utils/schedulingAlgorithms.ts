import { Process, SchedulingAlgorithm, SchedulingResult, GanttSegment, ProcessMetric, TimelineSnapshot } from '../types';

export function runCpuScheduling(
  processes: Process[],
  algorithm: SchedulingAlgorithm,
  timeQuantum: number = 2
): SchedulingResult {
  if (!processes || processes.length === 0) {
    return {
      gantt: [],
      metrics: [],
      avgWaitingTime: 0,
      avgTurnaroundTime: 0,
      avgResponseTime: 0,
      cpuUtilization: 0,
      throughput: 0,
      totalTime: 0,
      timeline: {},
    };
  }

  switch (algorithm) {
    case 'FCFS':
      return runFCFS(processes);
    case 'SJF':
      return runSJF(processes);
    case 'SRTF':
      return runSRTF(processes);
    case 'RR':
      return runRR(processes, timeQuantum);
    default:
      return runFCFS(processes);
  }
}

function generateTimelineAndMetrics(
  processes: Process[],
  executionLog: { processId: string | null; processName: string | null; startTime: number; endTime: number; color?: string }[]
): SchedulingResult {
  const totalTime = executionLog.length > 0 ? executionLog[executionLog.length - 1].endTime : 0;
  const gantt: GanttSegment[] = executionLog.map((item, index) => ({
    id: `g-${index}-${item.processId || 'idle'}`,
    processId: item.processId,
    processName: item.processName || 'IDLE',
    startTime: item.startTime,
    endTime: item.endTime,
    duration: item.endTime - item.startTime,
    color: item.color || '#94a3b8',
    isIdle: !item.processId,
  }));

  const metricsMap = new Map<string, { completionTime: number; firstResponseTime: number }>();
  
  processes.forEach((p) => {
    let ct = p.arrivalTime;
    let rt = -1;
    executionLog.forEach((log) => {
      if (log.processId === p.id) {
        ct = Math.max(ct, log.endTime);
        if (rt === -1 || log.startTime < rt) {
          rt = log.startTime;
        }
      }
    });
    metricsMap.set(p.id, { completionTime: ct, firstResponseTime: rt === -1 ? p.arrivalTime : rt });
  });

  let totalWaiting = 0;
  let totalTurnaround = 0;
  let totalResponse = 0;
  let totalBurst = 0;

  processes.forEach((p) => {
    totalBurst += p.burstTime;
  });

  const metrics: ProcessMetric[] = processes.map((p) => {
    const data = metricsMap.get(p.id) || { completionTime: p.arrivalTime + p.burstTime, firstResponseTime: p.arrivalTime };
    const turnaroundTime = data.completionTime - p.arrivalTime;
    const waitingTime = Math.max(0, turnaroundTime - p.burstTime);
    const responseTime = Math.max(0, data.firstResponseTime - p.arrivalTime);

    totalWaiting += waitingTime;
    totalTurnaround += turnaroundTime;
    totalResponse += responseTime;

    return {
      id: p.id,
      name: p.name,
      arrivalTime: p.arrivalTime,
      burstTime: p.burstTime,
      completionTime: data.completionTime,
      turnaroundTime,
      waitingTime,
      responseTime,
      color: p.color,
    };
  });

  const n = processes.length;
  const avgWaitingTime = Number((totalWaiting / n).toFixed(2));
  const avgTurnaroundTime = Number((totalTurnaround / n).toFixed(2));
  const avgResponseTime = Number((totalResponse / n).toFixed(2));
  const cpuUtilization = totalTime > 0 ? Number(((totalBurst / totalTime) * 100).toFixed(1)) : 0;
  const throughput = totalTime > 0 ? Number((n / totalTime).toFixed(3)) : 0;

  const timeline: Record<number, TimelineSnapshot> = {};
  for (let t = 0; t <= totalTime; t++) {
    let runningLog = executionLog.find((l) => t >= l.startTime && t < l.endTime);
    let runningProcessId = runningLog ? runningLog.processId : null;
    let runningProcessName = runningLog ? runningLog.processName : null;

    const readyQueue: { id: string; name: string }[] = [];
    processes.forEach((p) => {
      if (p.arrivalTime <= t) {
        const lastExec = executionLog.filter((l) => l.processId === p.id);
        const maxCt = lastExec.length > 0 ? lastExec[lastExec.length - 1].endTime : 0;
        if (t < maxCt && p.id !== runningProcessId) {
          readyQueue.push({ id: p.id, name: p.name });
        }
      }
    });

    const completedProcesses: string[] = [];
    processes.forEach((p) => {
      const lastExec = executionLog.filter((l) => l.processId === p.id);
      const maxCt = lastExec.length > 0 ? lastExec[lastExec.length - 1].endTime : 0;
      if (t >= maxCt) {
        completedProcesses.push(p.name);
      }
    });

    timeline[t] = {
      time: t,
      runningProcessId,
      runningProcessName,
      readyQueue,
      completedProcesses,
      actionDescription: runningProcessName
        ? `Waktu ${t}: CPU sedang mengeksekusi proses ${runningProcessName}.`
        : t >= totalTime
        ? 'Seluruh proses telah selesai dieksekusi.'
        : `Waktu ${t}: CPU menganggur (IDLE) menunggu proses tiba.`,
    };
  }

  return {
    gantt,
    metrics,
    avgWaitingTime,
    avgTurnaroundTime,
    avgResponseTime,
    cpuUtilization,
    throughput,
    totalTime,
    timeline,
  };
}

function runFCFS(processes: Process[]): SchedulingResult {
  const sorted = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
  const executionLog: { processId: string | null; processName: string | null; startTime: number; endTime: number; color?: string }[] = [];
  let currentTime = 0;

  sorted.forEach((p) => {
    if (currentTime < p.arrivalTime) {
      executionLog.push({ processId: null, processName: 'IDLE', startTime: currentTime, endTime: p.arrivalTime });
      currentTime = p.arrivalTime;
    }
    const startTime = currentTime;
    const endTime = startTime + p.burstTime;
    executionLog.push({ processId: p.id, processName: p.name, startTime, endTime, color: p.color });
    currentTime = endTime;
  });

  return generateTimelineAndMetrics(processes, executionLog);
}

function runSJF(processes: Process[]): SchedulingResult {
  const procs = processes.map((p) => ({ ...p, remaining: p.burstTime, completed: false }));
  const executionLog: { processId: string | null; processName: string | null; startTime: number; endTime: number; color?: string }[] = [];
  let currentTime = 0;
  let completedCount = 0;
  const n = procs.length;

  while (completedCount < n) {
    const available = procs.filter((p) => !p.completed && p.arrivalTime <= currentTime);
    if (available.length === 0) {
      const nextArrival = Math.min(...procs.filter((p) => !p.completed).map((p) => p.arrivalTime));
      executionLog.push({ processId: null, processName: 'IDLE', startTime: currentTime, endTime: nextArrival });
      currentTime = nextArrival;
      continue;
    }

    available.sort((a, b) => a.burstTime - b.burstTime || a.arrivalTime - b.arrivalTime);
    const p = available[0];

    const startTime = currentTime;
    const endTime = startTime + p.burstTime;
    executionLog.push({ processId: p.id, processName: p.name, startTime, endTime, color: p.color });
    currentTime = endTime;
    p.completed = true;
    completedCount++;
  }

  return generateTimelineAndMetrics(processes, executionLog);
}

function runSRTF(processes: Process[]): SchedulingResult {
  const procs = processes.map((p) => ({ ...p, remaining: p.burstTime }));
  const executionLog: { processId: string | null; processName: string | null; startTime: number; endTime: number; color?: string }[] = [];
  let currentTime = 0;
  let completedCount = 0;
  const n = procs.length;
  const maxTime = Math.max(...procs.map((p) => p.arrivalTime + p.burstTime * 3)) + 50;

  let lastProcessId: string | null = null;
  let segStart = 0;

  while (completedCount < n && currentTime < maxTime) {
    const available = procs.filter((p) => p.remaining > 0 && p.arrivalTime <= currentTime);
    if (available.length === 0) {
      if (lastProcessId !== null) {
        executionLog.push({ processId: lastProcessId, processName: procs.find((p) => p.id === lastProcessId)?.name || null, startTime: segStart, endTime: currentTime, color: procs.find((p) => p.id === lastProcessId)?.color });
        lastProcessId = null;
      }
      const uncompleted = procs.filter((p) => p.remaining > 0);
      if (uncompleted.length === 0) break;
      const nextArr = Math.min(...uncompleted.map((p) => p.arrivalTime));
      if (nextArr > currentTime) {
        executionLog.push({ processId: null, processName: 'IDLE', startTime: currentTime, endTime: nextArr });
        currentTime = nextArr;
      } else {
        currentTime++;
      }
      segStart = currentTime;
      continue;
    }

    available.sort((a, b) => a.remaining - b.remaining || a.arrivalTime - b.arrivalTime);
    const currentP = available[0];

    if (lastProcessId !== currentP.id) {
      if (lastProcessId !== null) {
        const prevP = procs.find((p) => p.id === lastProcessId);
        executionLog.push({ processId: lastProcessId, processName: prevP?.name || null, startTime: segStart, endTime: currentTime, color: prevP?.color });
      }
      segStart = currentTime;
      lastProcessId = currentP.id;
    }

    currentP.remaining--;
    currentTime++;

    if (currentP.remaining === 0) {
      completedCount++;
      executionLog.push({ processId: currentP.id, processName: currentP.name, startTime: segStart, endTime: currentTime, color: currentP.color });
      lastProcessId = null;
      segStart = currentTime;
    }
  }

  return generateTimelineAndMetrics(processes, executionLog);
}

function runRR(processes: Process[], quantum: number): SchedulingResult {
  const procs = processes.map((p) => ({ ...p, remaining: p.burstTime, inQueue: false }));
  const executionLog: { processId: string | null; processName: string | null; startTime: number; endTime: number; color?: string }[] = [];
  let currentTime = 0;
  const queue: typeof procs = [];

  const addArrived = (time: number) => {
    procs.forEach((p) => {
      if (!p.inQueue && p.remaining > 0 && p.arrivalTime <= time) {
        queue.push(p);
        p.inQueue = true;
      }
    });
  };

  addArrived(currentTime);

  if (queue.length === 0 && procs.length > 0) {
    const minArr = Math.min(...procs.map((p) => p.arrivalTime));
    if (minArr > currentTime) {
      executionLog.push({ processId: null, processName: 'IDLE', startTime: currentTime, endTime: minArr });
      currentTime = minArr;
      addArrived(currentTime);
    }
  }

  let safetyCounter = 0;
  while (procs.some((p) => p.remaining > 0) && safetyCounter < 1000) {
    safetyCounter++;
    if (queue.length === 0) {
      const uncompleted = procs.filter((p) => p.remaining > 0);
      if (uncompleted.length === 0) break;
      const nextArr = Math.min(...uncompleted.map((p) => p.arrivalTime));
      executionLog.push({ processId: null, processName: 'IDLE', startTime: currentTime, endTime: nextArr });
      currentTime = nextArr;
      addArrived(currentTime);
      continue;
    }

    const currentP = queue.shift()!;
    const execTime = Math.min(quantum, currentP.remaining);
    const startTime = currentTime;
    const endTime = startTime + execTime;

    executionLog.push({ processId: currentP.id, processName: currentP.name, startTime, endTime, color: currentP.color });
    currentTime = endTime;
    currentP.remaining -= execTime;

    procs.forEach((p) => {
      if (!p.inQueue && p.remaining > 0 && p.arrivalTime <= currentTime) {
        queue.push(p);
        p.inQueue = true;
      }
    });

    if (currentP.remaining > 0) {
      queue.push(currentP);
    } else {
      currentP.inQueue = false;
    }
  }

  return generateTimelineAndMetrics(processes, executionLog);
}