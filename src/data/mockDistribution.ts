import type { DistributionStats } from "../types/mbti";

// MVP 범위: 실제 참여자 집계 서버가 없으므로(PRD 6.3절), 그럴듯한 고정 비율의
// 목업 데이터를 사용한다. isMock=true로 UI에서 "예시 데이터" 안내를 노출한다.
export const mockDistribution: DistributionStats = {
  totalParticipants: 128_493,
  isMock: true,
  distribution: [
    { code: "ISFJ", percentage: 13.8 },
    { code: "ESFJ", percentage: 12.3 },
    { code: "ISTJ", percentage: 11.6 },
    { code: "ISFP", percentage: 8.8 },
    { code: "ESFP", percentage: 8.5 },
    { code: "ENFP", percentage: 8.1 },
    { code: "ESTJ", percentage: 8.7 },
    { code: "ISTP", percentage: 5.4 },
    { code: "INFP", percentage: 4.4 },
    { code: "ESTP", percentage: 4.3 },
    { code: "ENTP", percentage: 3.2 },
    { code: "ENFJ", percentage: 2.5 },
    { code: "INTP", percentage: 3.3 },
    { code: "INFJ", percentage: 1.5 },
    { code: "ENTJ", percentage: 1.8 },
    { code: "INTJ", percentage: 2.1 },
  ],
};
