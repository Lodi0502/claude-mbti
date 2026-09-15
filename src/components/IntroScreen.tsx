interface IntroScreenProps {
  totalParticipants: number;
  onStart: () => void;
  onViewStats: () => void;
}

export function IntroScreen({ totalParticipants, onStart, onViewStats }: IntroScreenProps) {
  return (
    <div className="screen intro-screen">
      <p className="eyebrow">PERSONALITY TEST · No. 16</p>
      <h1 className="intro-title">
        MBTI
        <br />
        성격 유형 테스트
      </h1>
      <p className="intro-tagline">
        12개의 질문, 3분이면 알 수 있는 나의 성격 유형 — 결과를 친구에게 공유하고 비교해보세요.
      </p>
      <p className="intro-meta">약 3분 · 12문항</p>
      <button type="button" className="btn btn-primary btn-large" onClick={onStart}>
        테스트 시작하기
      </button>
      <button type="button" className="intro-counter" onClick={onViewStats}>
        지금까지 {totalParticipants.toLocaleString("ko-KR")}명 참여
      </button>
      <p className="intro-disclaimer">
        본 테스트는 재미를 위한 약식 테스트로, 정식 심리 검사를 대체하지 않습니다.
      </p>
    </div>
  );
}
