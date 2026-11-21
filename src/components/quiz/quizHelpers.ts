import { QuizDifficulty, QuizQuestion } from "../../types";

export type DifficultyLevel = "mudah" | "sedang" | "sulit";
export type QuizStage = "selecting" | "playing" | "finished";
export type PaginationItem = number | "ellipsis";

export interface QuizScore {
  completed: boolean;
  score: number;
  total: number;
  correct?: number;
  wrong?: number;
  difficulty?: DifficultyLevel | QuizDifficulty;
}

export interface DifficultyPackage {
  id: DifficultyLevel;
  title: string;
  description: string;
  level: 1 | 2 | 3;
  buttonLabel: string;
  barActiveClass: string;
  buttonClass: string;
  cardHoverClass: string;
  titleHoverClass: string;
}

export const DIFFICULTY_PACKAGES: DifficultyPackage[] = [
  {
    id: "mudah",
    title: "Paket Mudah",
    description:
      "Fokus pada teori dasar, konsep utama, serta definisi istilah dasar.",
    level: 1,
    buttonLabel: "Pilih Mudah",
    barActiveClass: "bg-[#06684A]",
    buttonClass: "bg-[#06684A] group-hover:bg-[#05553C] hover:bg-[#05553C]",
    cardHoverClass:
      "hover:border-[#06684A] dark:hover:border-emerald-500 hover:bg-[#06684A]/[0.03] dark:hover:bg-emerald-950/20 hover:shadow-lg hover:shadow-[#06684A]/10",
    titleHoverClass:
      "group-hover:text-[#06684A] dark:group-hover:text-emerald-400",
  },
  {
    id: "sedang",
    title: "Paket Sedang",
    description:
      "Menguji pemahaman alur kerja algoritma, analisis kasus, dan kelebihan/kekurangan sistem.",
    level: 2,
    buttonLabel: "Pilih Sedang",
    barActiveClass: "bg-[#B44D08]",
    buttonClass: "bg-[#B44D08] group-hover:bg-[#963F06] hover:bg-[#963F06]",
    cardHoverClass:
      "hover:border-[#B44D08] dark:hover:border-amber-500 hover:bg-[#B44D08]/[0.03] dark:hover:bg-amber-950/20 hover:shadow-lg hover:shadow-[#B44D08]/10",
    titleHoverClass:
      "group-hover:text-[#B44D08] dark:group-hover:text-amber-400",
  },
  {
    id: "sulit",
    title: "Paket Sulit",
    description:
      "Perhitungan matematis Turnaround Time, Waiting Time, serta simulasi matriks Banker.",
    level: 3,
    buttonLabel: "Pilih Sulit",
    barActiveClass: "bg-[#BE123C]",
    buttonClass: "bg-[#BE123C] group-hover:bg-[#9F1239] hover:bg-[#9F1239]",
    cardHoverClass:
      "hover:border-[#BE123C] dark:hover:border-rose-500 hover:bg-[#BE123C]/[0.03] dark:hover:bg-rose-950/20 hover:shadow-lg hover:shadow-[#BE123C]/10",
    titleHoverClass:
      "group-hover:text-[#BE123C] dark:group-hover:text-rose-400",
  },
];

export function isQuestionCorrect(
  question: QuizQuestion,
  answer: number | string | undefined,
): boolean {
  if (answer === undefined || answer === "") return false;

  if (question.type === "pg") {
    return answer === question.correctAnswer;
  }

  const normalized = String(answer).toLowerCase().trim();
  const keywords = question.expectedKeywords ?? [];
  const matchCount = keywords.filter((kw) =>
    normalized.includes(kw.toLowerCase()),
  ).length;

  return matchCount >= Math.min(1, keywords.length);
}

export function calculateQuizStats(
  questions: QuizQuestion[],
  answers: Record<number, number | string>,
) {
  const total = questions.length;
  const correct = questions.reduce(
    (count, q) => (isQuestionCorrect(q, answers[q.id]) ? count + 1 : count),
    0,
  );
  const wrong = total - correct;
  const percentage = Math.round((correct / (total || 1)) * 100);

  return { total, correct, wrong, percentage };
}

export function getPaginationItems(
  current: number,
  total: number,
): PaginationItem[] {
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  if (current <= 2) {
    return [1, 2, 3, "ellipsis", total];
  }
  if (current === 3) {
    return [1, 2, 3, 4, "ellipsis", total];
  }
  if (current >= total - 1) {
    return [1, "ellipsis", total - 2, total - 1, total];
  }
  if (current === total - 2) {
    return [1, "ellipsis", total - 3, total - 2, total - 1, total];
  }
  return [1, "ellipsis", current - 1, current, current + 1, "ellipsis", total];
}
