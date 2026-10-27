import { DeadlockData, BankerSafetyResult, ResourceRequestTest } from '../types';

export function calculateNeedMatrix(max: number[][], allocation: number[][]): number[][] {
  const numProcesses = max.length;
  const numResources = max[0]?.length || 0;
  const need: number[][] = Array.from({ length: numProcesses }, () => Array(numResources).fill(0));

  for (let i = 0; i < numProcesses; i++) {
    for (let j = 0; j < numResources; j++) {
      need[i][j] = Math.max(0, (max[i]?.[j] || 0) - (allocation[i]?.[j] || 0));
    }
  }
  return need;
}

export function runBankersSafetyAlgorithm(data: DeadlockData): BankerSafetyResult {
  const { numProcesses, numResources, available, allocation, max, processNames } = data;
  const need = calculateNeedMatrix(max, allocation);

  let work = [...available];
  const finish: boolean[] = Array(numProcesses).fill(false);
  const safeSequenceIndices: number[] = [];
  const steps: any[] = [];

  let count = 0;
  while (count < numProcesses) {
    let found = false;
    for (let i = 0; i < numProcesses; i++) {
      if (!finish[i]) {
        let canProceed = true;
        for (let j = 0; j < numResources; j++) {
          if ((need[i]?.[j] || 0) > (work[j] || 0)) {
            canProceed = false;
            break;
          }
        }

        if (canProceed) {
          const workBefore = [...work];
          for (let j = 0; j < numResources; j++) {
            work[j] += allocation[i]?.[j] || 0;
          }
          const workAfter = [...work];

          finish[i] = true;
          safeSequenceIndices.push(i);
          found = true;
          count++;

          steps.push({
            step: safeSequenceIndices.length,
            processIndex: i,
            processName: processNames[i] || `P${i}`,
            workBefore,
            need: need[i],
            allocation: allocation[i],
            workAfter,
            explanation: `Proses ${processNames[i]} dapat dieksekusi karena Need ([${need[i]?.join(', ')}]) ≤ Work ([${workBefore.join(', ')}]). Sumber daya dikembalikan, Work menjadi [${workAfter.join(', ')}].`,
          });
        }
      }
    }

    if (!found) {
      break;
    }
  }

  const isSafe = safeSequenceIndices.length === numProcesses;
  const safeSequenceNames = safeSequenceIndices.map((idx) => processNames[idx] || `P${idx}`);

  return {
    isSafe,
    safeSequenceIndices,
    safeSequenceNames,
    steps,
    message: isSafe
      ? `Sistem berada dalam kondisi aman. Urutan valid: < ${safeSequenceNames.join(' ➔ ')} >.`
      : `Sistem dalam kondisi tidak aman (Unsafe). Berisiko terjadi Deadlock.`,
  };
}

export function testResourceRequest(
  data: DeadlockData,
  processIdx: number,
  request: number[]
): ResourceRequestTest {
  const { available, allocation, max, processNames } = data;
  const need = calculateNeedMatrix(max, allocation);
  const pName = processNames[processIdx] || `P${processIdx}`;
  const numResources = data.numResources;

  for (let j = 0; j < numResources; j++) {
    if ((request[j] || 0) > (need[processIdx]?.[j] || 0)) {
      return {
        canBeGranted: false,
        reason: `Permintaan ditolak! Proses ${pName} meminta sumber daya melebihi klaim Need.`,
      };
    }
  }

  for (let j = 0; j < numResources; j++) {
    if ((request[j] || 0) > (available[j] || 0)) {
      return {
        canBeGranted: false,
        reason: `Proses ${pName} harus menunggu karena melebihi jumlah Available.`,
      };
    }
  }

  const tempAvailable = [...available];
  const tempAllocation = allocation.map((row) => [...row]);
  const tempMax = max.map((row) => [...row]);

  for (let j = 0; j < numResources; j++) {
    tempAvailable[j] -= request[j] || 0;
    tempAllocation[processIdx][j] += request[j] || 0;
  }

  const testData: DeadlockData = {
    ...data,
    available: tempAvailable,
    allocation: tempAllocation,
    max: tempMax,
  };

  const safetyTest = runBankersSafetyAlgorithm(testData);

  if (safetyTest.isSafe) {
    return {
      canBeGranted: true,
      reason: `Permintaan untuk ${pName} disetujui. Membawa sistem ke Safe State: < ${safetyTest.safeSequenceNames.join(' ➔ ')} >.`,
      safeSequenceAfterGrant: safetyTest.safeSequenceNames,
    };
  } else {
    return {
      canBeGranted: false,
      reason: `Permintaan ditahan. Alokasi ini membuat sistem masuk ke Unsafe State.`,
    };
  }
}