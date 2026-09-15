import type { DistributionStats, MbtiTypeCode } from "../types/mbti";

interface StatsScreenProps {
  distribution: DistributionStats | null;
  myType: MbtiTypeCode | null;
  onBack: () => void;
  onRetry: () => void;
}

export function StatsScreen({ distribution, myType, onBack, onRetry }: StatsScreenProps) {
  return (
    <div className="screen stats-screen">
      <button
        type="button"
        className="btn-icon btn-previous"
        onClick={onBack}
        aria-label="돌아가기"
      >
        ←
      </button>
      <h2 className="stats-title">유형 분포 통계</h2>

      {!distribution ? (
        <div className="stats-error">
          <p>통계를 불러오지 못했습니다.</p>
          <button type="button" className="btn btn-secondary" onClick={onRetry}>
            다시 시도
          </button>
        </div>
      ) : (
        <>
          <p className="stats-total">
            총 누적 참여자 {distribution.totalParticipants.toLocaleString("ko-KR")}명
          </p>
          <ul className="stats-bar-list">
            {[...distribution.distribution]
              .sort((a, b) => b.percentage - a.percentage)
              .map((item) => (
                <li key={item.code} className="stats-bar-row">
                  <span className="stats-bar-code">{item.code}</span>
                  <div className="stats-bar-track">
                    <div
                      className={`stats-bar-fill${item.code === myType ? " stats-bar-fill-mine" : ""}`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="stats-bar-percent">{item.percentage}%</span>
                </li>
              ))}
          </ul>
          {distribution.isMock && <p className="stats-mock-note">예시 데이터입니다.</p>}
        </>
      )}
    </div>
  );
}
