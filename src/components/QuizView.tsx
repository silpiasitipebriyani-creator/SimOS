import React, { useMemo, useState } from "react";
import { QUIZ_QUESTIONS } from "../utils/quizData";
import { QuizQuestion } from "../types";
import {
  DifficultyLevel,
  QuizScore,
  QuizStage,
  calculateQuizStats,
} from "./quiz/quizHelpers";
import { DifficultySelector } from "./quiz/DifficultySelector";
import { QuizQuestionCard } from "./quiz/QuizQuestionCard";
import { QuizResultSummary } from "./quiz/QuizResultSummary";

interface QuizViewProps {
  moduleType: "cpu" | "deadlock";
  quizScore: QuizScore;
  onUpdateScore: (score: QuizScore) => void;
  onBackToSimulator: () => void;
  backLabel: string;
}

export const QuizView: React.FC<QuizViewProps> = ({
  moduleType,
  onUpdateScore,
  onBackToSimulator,
  backLabel,
}) => {
  const [stage, setStage] = useState<QuizStage>("selecting");
  const [difficulty, setDifficulty] = useState<DifficultyLevel>("mudah");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<
    Record<number, number | string>
  >({});
  const [essayDrafts, setEssayDrafts] = useState<Record<number, string>>({});

  const categoryName = moduleType === "cpu" ? "CPU Scheduling" : "Deadlock";

  const questions: QuizQuestion[] = useMemo(() => {
    const byCategory = QUIZ_QUESTIONS.filter(
      (q) => q.category === categoryName,
    );
    const byDifficulty = byCategory.filter((q) => q.difficulty === difficulty);
    return byDifficulty.length > 0 ? byDifficulty : byCategory;
  }, [categoryName, difficulty]);

  const finishQuiz = (finalAnswers = userAnswers) => {
    const { total, correct, wrong } = calculateQuizStats(
      questions,
      finalAnswers,
    );
    setStage("finished");

    onUpdateScore({
      completed: true,
      score: correct,
      total,
      correct,
      wrong,
      difficulty,
    });
  };

  const recordAnswer = (questionId: number, answer: number | string) => {
    const updatedAnswers = { ...userAnswers, [questionId]: answer };
    setUserAnswers(updatedAnswers);

    const isAllAnswered = questions.every(
      (q) => updatedAnswers[q.id] !== undefined && updatedAnswers[q.id] !== "",
    );

    if (isAllAnswered) {
      finishQuiz(updatedAnswers);
    }
  };

  const handleStartQuiz = (selected: DifficultyLevel) => {
    setDifficulty(selected);
    setUserAnswers({});
    setEssayDrafts({});
    setCurrentIndex(0);
    setStage("playing");
  };

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    if (userAnswers[questionId] !== undefined) return;
    recordAnswer(questionId, optionIdx);
  };

  const handleSubmitEssay = (questionId: number) => {
    const trimmed = (essayDrafts[questionId] || "").trim();
    if (!trimmed) return;
    recordAnswer(questionId, trimmed);
  };

  const handleResetToPackages = () => {
    setStage("selecting");
    setUserAnswers({});
    setEssayDrafts({});
    setCurrentIndex(0);
  };

  if (stage === "selecting") {
    return (
      <DifficultySelector
        moduleType={moduleType}
        backLabel={backLabel}
        onBackToSimulator={onBackToSimulator}
        onSelectDifficulty={handleStartQuiz}
      />
    );
  }

  if (stage === "finished") {
    return (
      <QuizResultSummary
        difficulty={difficulty}
        questions={questions}
        userAnswers={userAnswers}
        onResetToPackages={handleResetToPackages}
      />
    );
  }

  return (
    <QuizQuestionCard
      moduleType={moduleType}
      difficulty={difficulty}
      questions={questions}
      currentIndex={currentIndex}
      userAnswers={userAnswers}
      essayDrafts={essayDrafts}
      onSelectOption={handleSelectOption}
      onEssayDraftChange={(id, value) =>
        setEssayDrafts((prev) => ({ ...prev, [id]: value }))
      }
      onSubmitEssay={handleSubmitEssay}
      onNavigate={setCurrentIndex}
      onFinish={() => finishQuiz()}
      onExit={handleResetToPackages}
    />
  );
};
