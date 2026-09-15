import { useEffect } from "react";

interface LoadingScreenProps {
  onDone: () => void;
  minDurationMs?: number;
}

export function LoadingScreen({ onDone, minDurationMs = 900 }: LoadingScreenProps) {
  useEffect(() => {
    const timer = setTimeout(onDone, minDurationMs);
    return () => clearTimeout(timer);
  }, [onDone, minDurationMs]);

  return (
    <div className="screen loading-screen">
      <div className="loading-spinner" aria-hidden="true" />
      <p>당신의 유형을 분석하는 중...</p>
    </div>
  );
}
