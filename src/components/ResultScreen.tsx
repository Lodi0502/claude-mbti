import { toPng } from "html-to-image";
import { useRef, useState } from "react";
import type { DistributionStats, MbtiTypeContent } from "../types/mbti";
import { Toast } from "./Toast";

interface ResultScreenProps {
  content: MbtiTypeContent;
  distribution: DistributionStats;
  onViewStats: () => void;
  onRestart: () => void;
}

declare global {
  interface Window {
    Kakao?: { isInitialized?: () => boolean; Share?: { sendDefault: (opts: unknown) => void } };
  }
}

export function ResultScreen({ content, distribution, onViewStats, onRestart }: ResultScreenProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [imageSaved, setImageSaved] = useState(false);
  const [showLinkFallback, setShowLinkFallback] = useState(false);

  const myPercentage =
    distribution.distribution.find((item) => item.code === content.code)?.percentage ?? 0;

  const handleSaveImage = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 2 });
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `mbti-${content.code}.png`;
      link.click();
      setImageSaved(true);
      setTimeout(() => setImageSaved(false), 1500);
    } catch {
      setToast("이미지 저장에 실패했어요. 화면을 캡처해주세요.");
    }
  };

  const handleShareKakao = () => {
    if (window.Kakao?.isInitialized?.()) {
      window.Kakao.Share?.sendDefault({
        objectType: "feed",
        content: {
          title: `나의 MBTI는 ${content.code} - ${content.nickname}`,
          description: content.summary,
          link: { webUrl: window.location.href, mobileWebUrl: window.location.href },
        },
      });
      return;
    }
    setToast("카카오톡 공유 기능은 준비 중입니다. 링크 복사를 이용해주세요.");
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setToast("링크가 복사되었습니다.");
    } catch {
      setShowLinkFallback(true);
      setToast("자동 복사에 실패했어요. 아래 링크를 직접 복사해주세요.");
    }
  };

  return (
    <div className="screen result-screen">
      <div className="result-card" ref={cardRef}>
        <p className="result-eyebrow">
          <span className="result-emoji" aria-hidden="true">
            {content.emoji}
          </span>
          RESULT
        </p>
        <p className="result-code">{content.code}</p>
        <h2 className="result-nickname">{content.nickname}</h2>
        <p className="result-summary">{content.summary}</p>

        <section className="result-section">
          <h3>강점</h3>
          <ul className="trait-list">
            {content.strengths.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="result-section">
          <h3>약점</h3>
          <ul className="trait-list">
            {content.weaknesses.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="result-section">
          <h3>추천 직업</h3>
          <p className="job-list">{content.recommendedJobs.join("  ·  ")}</p>
        </section>
      </div>

      <button type="button" className="result-stat-link" onClick={onViewStats}>
        전체 참여자 중 내 유형 비율은 {myPercentage}%예요 →
      </button>

      {showLinkFallback && (
        <input
          className="link-fallback-input"
          readOnly
          value={window.location.href}
          onFocus={(e) => e.currentTarget.select()}
        />
      )}

      <div className="result-actions">
        <button type="button" className="btn btn-secondary" onClick={handleSaveImage}>
          {imageSaved ? "저장됨 ✓" : "이미지 저장"}
        </button>
        <button type="button" className="btn btn-secondary" onClick={handleShareKakao}>
          카카오톡 공유
        </button>
        <button type="button" className="btn btn-secondary" onClick={handleCopyLink}>
          링크 복사
        </button>
      </div>
      <button type="button" className="link-button" onClick={onRestart}>
        다시 하기
      </button>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
