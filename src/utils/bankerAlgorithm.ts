import { BankerSafetyResult, BankerStep, DeadlockData, ResourceRequestTest } from '../types';

export function calculateNeedMatrix(max: number[][], allocation: number[][]): number[][] {
  return max.map((row, i) =>
    row.map((val, j) => {
      const alloc = allocation[i]?.[j] ?? 0;
      return Math.max(0, val - alloc);
    })
  );
}

export function runBankersSafetyAlgorithm(data: DeadlockData): BankerSafetyResult {
  const { numProcesses, numResources, resourceNames, processNames, available, allocation, max } = data;

  const need = calculateNeedMatrix(max, allocation);
  const work = [...available];
  const finish = Array(numProcesses).fill(false);
  const safeSequence: number[] = [];
  const safeSequenceNames: string[] = [];
  const steps: BankerStep[] = [];

  let count = 0;
  let changed = true;

  while (count < numProcesses && changed) {
    changed = false;

    for (let p = 0; p < numProcesses; p++) {
      if (!finish[p]) {
        // Check if Need[p][j] <= Work[j] for all j
        let canAllocate = true;
        for (let j = 0; j < numResources; j++) {
          if (need[p][j] > work[j]) {
            canAllocate = false;
            break;
          }
        }

        if (canAllocate) {
          const workBefore = [...work];
          const processAllocation = allocation[p];

          // Work = Work + Allocation[p]
          for (let j = 0; j < numResources; j++) {
            work[j] += processAllocation[j];
          }

          finish[p] = true;
          safeSequence.push(p);
          safeSequenceNames.push(processNames[p] || `P${p}`);
          count++;
          changed = true;

          const resourceFormula = resourceNames
            .map((r, idx) => `${r}: Need(${need[p][idx]}) ≤ Work(${workBefore[idx]})`)
            .join(', ');

          const allocAddition = resourceNames
            .map((r, idx) => `${r}: ${workBefore[idx]} + ${processAllocation[idx]} = ${work[idx]}`)
            .join(', ');

          steps.push({
            step: steps.length + 1,
            processIndex: p,
            processName: processNames[p] || `P${p}`,
            workBefore,
            need: need[p],
            allocation: processAllocation,
            workAfter: [...work],
            isSatisfied: true,
            explanation: `Kebutuhan ${processNames[p]} terpenuhi (${resourceFormula}). Proses selesai dan melepaskan alokasinya (${allocAddition}).`,
          });
        }
      }
    }
  }

  const isSafe = count === numProcesses;
  const unfinishedProcesses = processNames.filter((_, idx) => !finish[idx]);

  let message = '';
  if (isSafe) {
    message = `Sistem berada dalam KEADAAN AMAN (Safe State). Ditemukan setidaknya satu urutan eksekusi aman: < ${safeSequenceNames.join(' ➔ ')} > tanpa risiko deadlock.`;
  } else {
    message = `Sistem berada dalam KEADAAN TIDAK AMAN (Unsafe State)! Proses yang tidak dapat dialokasikan sumber daya: [ ${unfinishedProcesses.join(', ')} ]. Risiko terjadinya Deadlock sangat tinggi.`;
  }

  return {
    isSafe,
    safeSequence,
    safeSequenceNames,
    steps,
    message,
    unfinishedProcesses,
  };
}

export function testResourceRequest(
  data: DeadlockData,
  processIndex: number,
  requestVector: number[]
): ResourceRequestTest {
  const { numResources, resourceNames, processNames, available, allocation, max } = data;
  const pName = processNames[processIndex] || `P${processIndex}`;
  const need = calculateNeedMatrix(max, allocation);
  const pNeed = need[processIndex];

  // 1. Check Request <= Need
  for (let j = 0; j < numResources; j++) {
    if (requestVector[j] > pNeed[j]) {
      return {
        processIndex,
        requestVector,
        canBeGranted: false,
        isSafeAfterGrant: false,
        reason: `Ditolak: Permintaan pada ${resourceNames[j]} (${requestVector[j]}) melebihi klaim maksimum Need (${pNeed[j]}). Proses meminta lebih dari batas deklarasi.`,
      };
    }
  }

  // 2. Check Request <= Available
  for (let j = 0; j < numResources; j++) {
    if (requestVector[j] > available[j]) {
      return {
        processIndex,
        requestVector,
        canBeGranted: false,
        isSafeAfterGrant: false,
        reason: `Harus Menunggu: Sumber daya ${resourceNames[j]} yang tersedia (${available[j]}) tidak mencukupi permintaan (${requestVector[j]}). Proses ${pName} harus menunggu dalam antrean.`,
      };
    }
  }

  // 3. Pretend allocation
  const pretendAvailable = [...available];
  const pretendAllocation = allocation.map(row => [...row]);
  const pretendMax = max.map(row => [...row]);

  for (let j = 0; j < numResources; j++) {
    pretendAvailable[j] -= requestVector[j];
    pretendAllocation[processIndex][j] += requestVector[j];
  }

  const pretendData: DeadlockData = {
    ...data,
    available: pretendAvailable,
    allocation: pretendAllocation,
    max: pretendMax,
    need: calculateNeedMatrix(pretendMax, pretendAllocation),
  };

  const safetyResult = runBankersSafetyAlgorithm(pretendData);

  if (safetyResult.isSafe) {
    return {
      processIndex,
      requestVector,
      canBeGranted: true,
      isSafeAfterGrant: true,
      safeSequenceAfterGrant: safetyResult.safeSequenceNames,
      reason: `DAPAT DIBERIKAN SEGERA! Jika alokasi ini diberikan, sistem tetap berada dalam Keadaan Aman (Safe State) dengan urutan aman: < ${safetyResult.safeSequenceNames.join(' ➔ ')} >.`,
    };
  } else {
    return {
      processIndex,
      requestVector,
      canBeGranted: false,
      isSafeAfterGrant: false,
      reason: `TIDAK BOLEH DIBERIKAN SEGERA! Meskipun sumber daya tersedia, pemberian permintaan ini akan menjerumuskan sistem ke Keadaan Tidak Aman (Unsafe State) yang dapat berujung Deadlock. Proses ${pName} harus menunggu.`,
    };
  }
}
