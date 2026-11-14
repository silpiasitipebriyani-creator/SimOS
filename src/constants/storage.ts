import { ActiveModule } from "../types";

export const STORAGE_KEYS = {
  ACTIVE_MODULE: "simos_active_module_v3",
  PROCESSES: "simos_processes_v3",
  ALGORITHM: "simos_algorithm_v3",
  QUANTUM: "simos_quantum_v3",
  DEADLOCK: "simos_deadlock_v3",
  QUIZ: "simos_quiz_v3",
  QUIZ_HISTORY: "simos_quiz_history_v3",
  DARK_MODE: "simos_dark_mode_v3",
  USER: "simos_user_v3",
  SIMULATOR_HISTORY: "simos_simulator_history_v3",
} as const;

export const VALID_MODULES: readonly ActiveModule[] = [
  "home",
  "cpu",
  "deadlock",
  "cpu-quiz",
  "deadlock-quiz",
  "profile",
  "about",
] as const;
