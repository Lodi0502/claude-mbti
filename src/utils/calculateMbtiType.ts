import type { DimensionScore, MbtiTypeCode, QuestionOption } from "../types/mbti";
import { createEmptyScores } from "../types/mbti";

/**
 * 응답 기록(질문 id → 선택된 score)을 입력받아 4개 지표 점수를 누적한다.
 */
export function accumulateScores(answers: Record<string, QuestionOption["score"]>): DimensionScore {
  const scores = createEmptyScores();

  for (const score of Object.values(answers)) {
    switch (score) {
      case "E":
        scores.EI.E += 1;
        break;
      case "I":
        scores.EI.I += 1;
        break;
      case "S":
        scores.SN.S += 1;
        break;
      case "N":
        scores.SN.N += 1;
        break;
      case "T":
        scores.TF.T += 1;
        break;
      case "F":
        scores.TF.F += 1;
        break;
      case "J":
        scores.JP.J += 1;
        break;
      case "P":
        scores.JP.P += 1;
        break;
    }
  }

  return scores;
}

/**
 * 지표별 점수를 비교해 4자리 MBTI 유형 코드를 산출한다.
 * PRD 7.3절: 지표별 3문항(홀수)이므로 동점은 발생하지 않는다.
 */
export function calculateMbtiType(scores: DimensionScore): MbtiTypeCode {
  const ei = scores.EI.E >= scores.EI.I ? "E" : "I";
  const sn = scores.SN.S >= scores.SN.N ? "S" : "N";
  const tf = scores.TF.T >= scores.TF.F ? "T" : "F";
  const jp = scores.JP.J >= scores.JP.P ? "J" : "P";

  return `${ei}${sn}${tf}${jp}` as MbtiTypeCode;
}
