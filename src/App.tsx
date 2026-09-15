import { useCallback, useState } from "react";
import "./App.css";
import { IntroScreen } from "./components/IntroScreen";
import { LoadingScreen } from "./components/LoadingScreen";
import { QuestionScreen } from "./components/QuestionScreen";
import { ResultScreen } from "./components/ResultScreen";
import { StatsScreen } from "./components/StatsScreen";
import { mbtiContents } from "./data/mbtiContents";
import { mockDistribution } from "./data/mockDistribution";
import { useMbtiTest } from "./hooks/useMbtiTest";
import { useTestHistory } from "./hooks/useTestHistory";
import type { MbtiTypeCode } from "./types/mbti";

type Screen = "intro" | "question" | "loading" | "result" | "stats" | "error";

const ACTIVE_RESULT_KEY = "mbti_active_result";

function loadActiveResult(): MbtiTypeCode | null {
  try {
    const raw = sessionStorage.getItem(ACTIVE_RESULT_KEY);
    return raw ? (JSON.parse(raw) as MbtiTypeCode) : null;
  } catch {
    return null;
  }
}

function saveActiveResult(type: MbtiTypeCode): void {
  try {
    sessionStorage.setItem(ACTIVE_RESULT_KEY, JSON.stringify(type));
  } catch {
    // 저장 실패는 결과 화면 표시 자체를 막지 않는다.
  }
}

function clearActiveResult(): void {
  try {
    sessionStorage.removeItem(ACTIVE_RESULT_KEY);
  } catch {
    // 무시
  }
}

function App() {
  const test = useMbtiTest();
  const { addEntry } = useTestHistory();

  const [resultType, setResultType] = useState<MbtiTypeCode | null>(() => loadActiveResult());
  const [screen, setScreen] = useState<Screen>(() => {
    // 세션 복구 우선순위(PRD 4.2절): 진행 중인 질문 응답 > 완료된 결과 화면
    if (test.currentQuestionIndex > 0 && !test.isComplete) return "question";
    if (loadActiveResult()) return "result";
    return "intro";
  });

  const handleStart = useCallback(() => setScreen("question"), []);

  const handleLoadingDone = useCallback(() => {
    try {
      if (!test.resultType) throw new Error("결과를 계산할 수 없습니다.");
      addEntry(test.resultType);
      saveActiveResult(test.resultType);
      test.finish();
      setResultType(test.resultType);
      setScreen("result");
    } catch {
      setScreen("error");
    }
  }, [test, addEntry]);

  const handleRestart = useCallback(() => {
    clearActiveResult();
    setResultType(null);
    test.reset();
    setScreen("question");
  }, [test]);

  const handleBackToIntro = useCallback(() => {
    clearActiveResult();
    setResultType(null);
    test.reset();
    setScreen("intro");
  }, [test]);

  const goToStats = useCallback(() => setScreen("stats"), []);
  const backFromStats = useCallback(() => setScreen(resultType ? "result" : "intro"), [resultType]);

  return (
    <main className="app-shell">
      {screen === "intro" && (
        <IntroScreen
          totalParticipants={mockDistribution.totalParticipants}
          onStart={handleStart}
          onViewStats={goToStats}
        />
      )}

      {screen === "question" &&
        (test.currentQuestion ? (
          <QuestionScreen
            key={test.currentQuestion.id}
            question={test.currentQuestion}
            questionNumber={test.currentQuestionNumber}
            totalQuestions={test.totalQuestions}
            previousAnswerId={test.previousAnswerId}
            canGoPrevious={test.currentQuestionIndex > 0}
            onAnswer={(option) => {
              const currentQuestion = test.currentQuestion;
              if (!currentQuestion) return;
              const isLastQuestion = test.currentQuestionIndex + 1 >= test.totalQuestions;
              test.answer(currentQuestion.id, option);
              if (isLastQuestion) setScreen("loading");
            }}
            onPrevious={test.goToPrevious}
          />
        ) : null)}

      {screen === "loading" && <LoadingScreen onDone={handleLoadingDone} />}

      {screen === "result" && resultType && (
        <ResultScreen
          content={mbtiContents[resultType]}
          distribution={mockDistribution}
          onViewStats={goToStats}
          onRestart={handleRestart}
        />
      )}

      {screen === "stats" && (
        <StatsScreen
          distribution={mockDistribution}
          myType={resultType}
          onBack={backFromStats}
          onRetry={() => setScreen("stats")}
        />
      )}

      {screen === "error" && (
        <div className="screen error-screen">
          <p>결과를 계산하지 못했습니다.</p>
          <button type="button" className="btn btn-primary" onClick={handleBackToIntro}>
            처음부터 다시하기
          </button>
        </div>
      )}
    </main>
  );
}

export default App;
