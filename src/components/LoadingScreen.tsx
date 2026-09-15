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
      <p className="loading-text">당신의 유형을 분석하는 중</p>
      <div className="loading-rule" aria-hidden="true" />
    </div>
  );
}
