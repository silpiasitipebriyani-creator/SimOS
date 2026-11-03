import { Process, SchedulingAlgorithm, SchedulingResult, GanttSegment, ProcessMetric, TimelineSnapshot } from '../types';

export function runCpuScheduling(
  processes: Process[],
  algorithm: SchedulingAlgorithm,
  timeQuantum: number = 2
): SchedulingResult {
  if (processes.length === 0) {
    return {
      algorithm,
      timeQuantum,
      gantt: [],
      metrics: [],
      avgWaitingTime: 0,
      avgTurnaroundTime: 0,
      avgResponseTime: 0,
      cpuUtilization: 100,
      throughput: 0,
      totalTime: 0,
      timeline: [],
    };
  }

  // Clone processes
  const procs = processes.map((p) => ({
    ...p,
    remainingTime: p.burstTime,
    startTime: -1,
    completionTime: 0,
    waitingTime: 0,
    turnaroundTime: 0,
    responseTime: 0,
    isCompleted: false,
  }));

  const rawGantt: { processId: string; processName: string; startTime: number; endTime: number; color: string; isIdle: boolean }[] = [];
  const timeline: TimelineSnapshot[] = [];

  let currentTime = 0;
  let completedCount = 0;
  const n = procs.length;

  if (algorithm === 'FCFS') {
    // Sort by arrival time, tie breaker by index/name
    const sorted = [...procs].sort((a, b) => a.arrivalTime - b.arrivalTime || a.id.localeCompare(b.id));

    sorted.forEach((p) => {
      // If CPU is idle before process arrives
      if (currentTime < p.arrivalTime) {
        rawGantt.push({
          processId: 'IDLE',
          processName: 'IDLE',
          startTime: currentTime,
          endTime: p.arrivalTime,
          color: '#94a3b8',
          isIdle: true,
        });
        currentTime = p.arrivalTime;
      }

      p.startTime = currentTime;
      p.completionTime = currentTime + p.burstTime;
      p.turnaroundTime = p.completionTime - p.arrivalTime;
      p.waitingTime = p.startTime - p.arrivalTime;
      p.responseTime = p.waitingTime;
      p.isCompleted = true;

      rawGantt.push({
        processId: p.id,
        processName: p.name,
        startTime: currentTime,
        endTime: p.completionTime,
        color: p.color,
        isIdle: false,
      });

      currentTime = p.completionTime;
    });

    // Build timeline snapshots
    buildTimelineSnapshots(sorted, rawGantt, timeline, currentTime);

  } else if (algorithm === 'SJF') {
    // Non-preemptive Shortest Job First
    const completed: typeof procs = [];
    const pool = procs.map(p => ({ ...p }));

    while (completed.length < n) {
      const arrived = pool.filter(p => !p.isCompleted && p.arrivalTime <= currentTime);

      if (arrived.length === 0) {
        // CPU idle until next arrival
        const nextArrival = Math.min(...pool.filter(p => !p.isCompleted).map(p => p.arrivalTime));
        rawGantt.push({
          processId: 'IDLE',
          processName: 'IDLE',
          startTime: currentTime,
          endTime: nextArrival,
          color: '#94a3b8',
          isIdle: true,
        });
        currentTime = nextArrival;
        continue;
      }

      // Pick process with shortest burst time
      arrived.sort((a, b) => a.burstTime - b.burstTime || a.arrivalTime - b.arrivalTime || a.id.localeCompare(b.id));
      const p = arrived[0];

      p.startTime = currentTime;
      p.completionTime = currentTime + p.burstTime;
      p.turnaroundTime = p.completionTime - p.arrivalTime;
      p.waitingTime = p.startTime - p.arrivalTime;
      p.responseTime = p.waitingTime;
      p.isCompleted = true;

      rawGantt.push({
        processId: p.id,
        processName: p.name,
        startTime: currentTime,
        endTime: p.completionTime,
        color: p.color,
        isIdle: false,
      });

      currentTime = p.completionTime;
      completed.push(p);
    }

    buildTimelineSnapshots(completed, rawGantt, timeline, currentTime);

  } else if (algorithm === 'SRTF') {
    // Preemptive Shortest Remaining Time First
    const pool = procs.map(p => ({ ...p, firstCpuTime: -1 }));
    let lastRunningId: string | null = null;
    let segmentStart = 0;
    let segmentColor = '#94a3b8';
    let segmentName = 'IDLE';
    let isCurrentIdle = true;

    while (completedCount < n) {
      const available = pool.filter(p => !p.isCompleted && p.arrivalTime <= currentTime);

      if (available.length === 0) {
        // Idle unit
        if (lastRunningId !== 'IDLE') {
          if (lastRunningId !== null) {
            rawGantt.push({
              processId: lastRunningId,
              processName: segmentName,
              startTime: segmentStart,
              endTime: currentTime,
              color: segmentColor,
              isIdle: isCurrentIdle,
            });
          }
          lastRunningId = 'IDLE';
          segmentStart = currentTime;
          segmentColor = '#94a3b8';
          segmentName = 'IDLE';
          isCurrentIdle = true;
        }
        currentTime++;
        continue;
      }

      // Choose process with smallest remaining time
      available.sort((a, b) => a.remainingTime - b.remainingTime || a.arrivalTime - b.arrivalTime || a.id.localeCompare(b.id));
      const currentProc = available[0];

      if (currentProc.firstCpuTime === -1) {
        currentProc.firstCpuTime = currentTime;
      }

      if (lastRunningId !== currentProc.id) {
        if (lastRunningId !== null) {
          rawGantt.push({
            processId: lastRunningId,
            processName: segmentName,
            startTime: segmentStart,
            endTime: currentTime,
            color: segmentColor,
            isIdle: isCurrentIdle,
          });
        }
        lastRunningId = currentProc.id;
        segmentStart = currentTime;
        segmentColor = currentProc.color;
        segmentName = currentProc.name;
        isCurrentIdle = false;
      }

      currentProc.remainingTime--;
      currentTime++;

      if (currentProc.remainingTime === 0) {
        currentProc.isCompleted = true;
        currentProc.completionTime = currentTime;
        currentProc.turnaroundTime = currentProc.completionTime - currentProc.arrivalTime;
        currentProc.waitingTime = currentProc.turnaroundTime - currentProc.burstTime;
        currentProc.responseTime = currentProc.firstCpuTime - currentProc.arrivalTime;
        completedCount++;
      }
    }

    if (lastRunningId !== null && segmentStart < currentTime) {
      rawGantt.push({
        processId: lastRunningId,
        processName: segmentName,
        startTime: segmentStart,
        endTime: currentTime,
        color: segmentColor,
        isIdle: isCurrentIdle,
      });
    }

    // copy back metrics to procs
    pool.forEach(p => {
      const target = procs.find(orig => orig.id === p.id);
      if (target) {
        target.completionTime = p.completionTime;
        target.turnaroundTime = p.turnaroundTime;
        target.waitingTime = p.waitingTime;
        target.responseTime = p.responseTime;
      }
    });

    buildTimelineSnapshots(pool, rawGantt, timeline, currentTime);

  } else if (algorithm === 'RR') {
    // Round Robin
    const pool = procs.map(p => ({ ...p, firstCpuTime: -1 }));
    const readyQueue: typeof pool = [];
    const inQueue = new Set<string>();

    const q = Math.max(1, timeQuantum);
    let allFinished = false;

    // Check processes arrived at 0
    pool.filter(p => p.arrivalTime <= currentTime).forEach(p => {
      readyQueue.push(p);
      inQueue.add(p.id);
    });

    while (!allFinished) {
      if (readyQueue.length === 0) {
        // Find next arrival
        const pending = pool.filter(p => !p.isCompleted);
        if (pending.length === 0) {
          allFinished = true;
          break;
        }
        const nextArrival = Math.min(...pending.map(p => p.arrivalTime));
        rawGantt.push({
          processId: 'IDLE',
          processName: 'IDLE',
          startTime: currentTime,
          endTime: nextArrival,
          color: '#94a3b8',
          isIdle: true,
        });
        currentTime = nextArrival;

        // Push newly arrived
        pool.filter(p => !p.isCompleted && p.arrivalTime <= currentTime && !inQueue.has(p.id)).forEach(p => {
          readyQueue.push(p);
          inQueue.add(p.id);
        });
        continue;
      }

      const currentProc = readyQueue.shift()!;
      inQueue.delete(currentProc.id);

      if (currentProc.firstCpuTime === -1) {
        currentProc.firstCpuTime = currentTime;
      }

      const runDuration = Math.min(q, currentProc.remainingTime);
      const startT = currentTime;
      const endT = currentTime + runDuration;

      rawGantt.push({
        processId: currentProc.id,
        processName: currentProc.name,
        startTime: startT,
        endTime: endT,
        color: currentProc.color,
        isIdle: false,
      });

      currentTime = endT;
      currentProc.remainingTime -= runDuration;

      // Check newly arrived processes during this quantum slice
      pool.filter(p => !p.isCompleted && p.id !== currentProc.id && p.arrivalTime <= currentTime && !inQueue.has(p.id) && !readyQueue.some(rq => rq.id === p.id)).forEach(p => {
        readyQueue.push(p);
        inQueue.add(p.id);
      });

      if (currentProc.remainingTime > 0) {
        readyQueue.push(currentProc);
        inQueue.add(currentProc.id);
      } else {
        currentProc.isCompleted = true;
        currentProc.completionTime = currentTime;
        currentProc.turnaroundTime = currentProc.completionTime - currentProc.arrivalTime;
        currentProc.waitingTime = currentProc.turnaroundTime - currentProc.burstTime;
        currentProc.responseTime = currentProc.firstCpuTime - currentProc.arrivalTime;
      }

      if (pool.every(p => p.isCompleted)) {
        allFinished = true;
      }
    }

    // copy back metrics
    pool.forEach(p => {
      const target = procs.find(orig => orig.id === p.id);
      if (target) {
        target.completionTime = p.completionTime;
        target.turnaroundTime = p.turnaroundTime;
        target.waitingTime = p.waitingTime;
        target.responseTime = p.responseTime;
      }
    });

    buildTimelineSnapshots(pool, rawGantt, timeline, currentTime);
  }

  // Merge consecutive segments of the exact same process for cleaner visual Gantt
  const mergedGantt: GanttSegment[] = [];
  rawGantt.forEach((seg, idx) => {
    if (mergedGantt.length > 0 && mergedGantt[mergedGantt.length - 1].processId === seg.processId && mergedGantt[mergedGantt.length - 1].isIdle === seg.isIdle) {
      mergedGantt[mergedGantt.length - 1].endTime = seg.endTime;
      mergedGantt[mergedGantt.length - 1].duration = mergedGantt[mergedGantt.length - 1].endTime - mergedGantt[mergedGantt.length - 1].startTime;
    } else {
      mergedGantt.push({
        id: `seg-${idx}-${seg.processId}`,
        processId: seg.processId,
        processName: seg.processName,
        startTime: seg.startTime,
        endTime: seg.endTime,
        duration: seg.endTime - seg.startTime,
        isIdle: seg.isIdle,
        color: seg.color,
      });
    }
  });

  // Calculate metrics
  const metrics: ProcessMetric[] = procs.map(p => ({
    id: p.id,
    name: p.name,
    arrivalTime: p.arrivalTime,
    burstTime: p.burstTime,
    completionTime: p.completionTime,
    turnaroundTime: p.turnaroundTime,
    waitingTime: p.waitingTime,
    responseTime: p.responseTime,
    color: p.color,
  }));

  const totalTime = currentTime;
  const totalWaitingTime = metrics.reduce((sum, m) => sum + m.waitingTime, 0);
  const totalTurnaroundTime = metrics.reduce((sum, m) => sum + m.turnaroundTime, 0);
  const totalResponseTime = metrics.reduce((sum, m) => sum + m.responseTime, 0);
  const totalBurstTime = metrics.reduce((sum, m) => sum + m.burstTime, 0);

  const avgWaitingTime = Number((totalWaitingTime / n).toFixed(2));
  const avgTurnaroundTime = Number((totalTurnaroundTime / n).toFixed(2));
  const avgResponseTime = Number((totalResponseTime / n).toFixed(2));
  const cpuUtilization = totalTime > 0 ? Number(((totalBurstTime / totalTime) * 100).toFixed(1)) : 100;
  const throughput = totalTime > 0 ? Number((n / totalTime).toFixed(3)) : 0;

  return {
    algorithm,
    timeQuantum,
    gantt: mergedGantt,
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

function buildTimelineSnapshots(
  processes: { id: string; name: string; arrivalTime: number; burstTime: number; completionTime: number }[],
  rawGantt: { processId: string; processName: string; startTime: number; endTime: number; color: string; isIdle: boolean }[],
  timeline: TimelineSnapshot[],
  totalTime: number
) {
  // Snapshot for every integer second from t = 0 to totalTime
  for (let t = 0; t <= totalTime; t++) {
    // Find who is executing at time t (or t to t+1)
    const activeSeg = rawGantt.find(g => t >= g.startTime && (t < g.endTime || (t === totalTime && t === g.endTime)));

    const runningId = activeSeg && !activeSeg.isIdle ? activeSeg.processId : null;
    const runningName = activeSeg && !activeSeg.isIdle ? activeSeg.processName : null;

    // Completed processes up to t
    const completed = processes.filter(p => p.completionTime <= t).map(p => p.name);

    // Ready queue at time t
    const readyQueue: { id: string; name: string; remainingTime: number }[] = [];
    processes.forEach(p => {
      if (p.arrivalTime <= t && p.completionTime > t && p.id !== runningId) {
        // approximate remaining time at t
        readyQueue.push({
          id: p.id,
          name: p.name,
          remainingTime: p.burstTime,
        });
      }
    });

    let action = 'Sistem idle, menunggu proses masuk.';
    if (runningName) {
      action = `Proses ${runningName} sedang dialokasikan CPU.`;
    } else if (t === totalTime && totalTime > 0) {
      action = 'Semua proses telah selesai dieksekusi.';
    }

    timeline.push({
      time: t,
      runningProcessId: runningId,
      runningProcessName: runningName,
      readyQueue,
      completedProcesses: completed,
      actionDescription: action,
    });
  }
}
