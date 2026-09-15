import { useCallback, useEffect, useState } from "react";
import { questions } from "../data/questions";
import type { InProgressSession, QuestionOption, TestProgress } from "../types/mbti";
import { createEmptyScores, TOTAL_QUESTIONS } from "../types/mbti";
import { accumulateScores, calculateMbtiType } from "../utils/calculateMbtiType";

const SESSION_STORAGE_KEY = "mbti_test_in_progress";

function createEmptyProgress(): TestProgress {
  return {
    currentQuestionIndex: 0,
    answers: {},
    scores: createEmptyScores(),
  };
}

function loadInProgressSession(): TestProgress | null {
  try {
    const raw = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as InProgressSession;
    return parsed.progress;
  } catch {
    return null;
  }
}

function saveInProgressSession(progress: TestProgress): void {
  try {
    const session: InProgressSession = { progress, startedAt: new Date().toISOString() };
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  } catch {
    // 저장 실패(용량 초과/프라이빗 모드 등)는 진행에 영향을 주지 않는다.
  }
}

function clearInProgressSession(): void {
  try {
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
  } catch {
    // 무시: 세션 정리 실패가 플레이를 막지 않아야 한다.
  }
}

export function useMbtiTest() {
  const [progress, setProgress] = useState<TestProgress>(
    () => loadInProgressSession() ?? createEmptyProgress(),
  );

  useEffect(() => {
    if (progress.currentQuestionIndex > 0 && progress.currentQuestionIndex < TOTAL_QUESTIONS) {
      saveInProgressSession(progress);
    }
  }, [progress]);

  const currentQuestion = questions[progress.currentQuestionIndex] ?? null;
  const isComplete = progress.currentQuestionIndex >= TOTAL_QUESTIONS;

  const answer = useCallback((questionId: string, option: QuestionOption) => {
    setProgress((prev) => {
      const nextAnswers = { ...prev.answers, [questionId]: option.score };
      const nextScores = accumulateScores(nextAnswers);
      return {
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        answers: nextAnswers,
        scores: nextScores,
      };
    });
  }, []);

  const goToPrevious = useCallback(() => {
    setProgress((prev) => {
      if (prev.currentQuestionIndex <= 0) return prev;
      return { ...prev, currentQuestionIndex: prev.currentQuestionIndex - 1 };
    });
  }, []);

  const reset = useCallback(() => {
    clearInProgressSession();
    setProgress(createEmptyProgress());
  }, []);

  const finish = useCallback(() => {
    clearInProgressSession();
  }, []);

  const previousAnswerId = currentQuestion
    ? Object.entries(progress.answers).find(([id]) => id === currentQuestion.id)?.[1]
    : undefined;

  return {
    questions,
    totalQuestions: TOTAL_QUESTIONS,
    currentQuestion,
    currentQuestionNumber: Math.min(progress.currentQuestionIndex + 1, TOTAL_QUESTIONS),
    currentQuestionIndex: progress.currentQuestionIndex,
    previousAnswerId,
    isComplete,
    resultType: isComplete ? calculateMbtiType(progress.scores) : null,
    answer,
    goToPrevious,
    reset,
    finish,
  };
}
