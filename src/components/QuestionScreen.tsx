import { useState } from "react";
import type { Question, QuestionOption } from "../types/mbti";
import { ProgressBar } from "./ProgressBar";

interface QuestionScreenProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  previousAnswerId?: string;
  canGoPrevious: boolean;
  onAnswer: (option: QuestionOption) => void;
  onPrevious: () => void;
}

const SELECTION_DELAY_MS = 300;

export function QuestionScreen({
  question,
  questionNumber,
  totalQuestions,
  previousAnswerId,
  canGoPrevious,
  onAnswer,
  onPrevious,
}: QuestionScreenProps) {
  // 부모(App)가 question.id를 key로 넘겨 문항이 바뀔 때마다 이 컴포넌트를 새로
  // 마운트하므로, 선택 상태는 항상 null로 시작한다(별도 초기화 effect 불필요).
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (option: QuestionOption) => {
    if (selectedId) return; // 중복 탭 방지
    setSelectedId(option.id);
    setTimeout(() => onAnswer(option), SELECTION_DELAY_MS);
  };

  const highlightedId = selectedId ?? previousAnswerId ?? null;

  return (
    <div className="screen question-screen">
      <div className="question-header">
        <button
          type="button"
          className="btn-icon btn-previous"
          onClick={onPrevious}
          disabled={!canGoPrevious}
          aria-label="이전 문항으로 이동"
        >
          ←
        </button>
        <ProgressBar current={questionNumber} total={totalQuestions} />
      </div>

      <p className="question-text">{question.text}</p>

      <div className="question-options">
        {question.options.map((option) => (
          <button
            key={option.id}
            type="button"
            className={`option-card${highlightedId === option.id ? " option-card-selected" : ""}`}
            onClick={() => handleSelect(option)}
            disabled={selectedId !== null}
          >
            <span>{option.text}</span>
            {highlightedId === option.id && (
              <span className="option-check" aria-hidden="true">
                ✓
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
