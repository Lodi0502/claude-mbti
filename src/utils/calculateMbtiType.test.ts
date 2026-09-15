import { describe, expect, it } from "vitest";
import { accumulateScores, calculateMbtiType } from "./calculateMbtiType";

describe("accumulateScores", () => {
  it("응답을 지표별로 정확히 누적한다", () => {
    const scores = accumulateScores({
      q1: "E",
      q5: "E",
      q9: "I",
      q2: "S",
      q6: "S",
      q10: "S",
    });

    expect(scores.EI).toEqual({ E: 2, I: 1 });
    expect(scores.SN).toEqual({ S: 3, N: 0 });
    expect(scores.TF).toEqual({ T: 0, F: 0 });
    expect(scores.JP).toEqual({ J: 0, P: 0 });
  });
});

describe("calculateMbtiType", () => {
  it("각 지표에서 더 높은 점수의 문자를 채택해 4자리 코드를 만든다", () => {
    const type = calculateMbtiType({
      EI: { E: 2, I: 1 },
      SN: { S: 0, N: 3 },
      TF: { T: 3, F: 0 },
      JP: { J: 1, P: 2 },
    });

    expect(type).toBe("ENTP");
  });

  it("전부 반대쪽 지표로 응답하면 ISFJ를 산출한다", () => {
    const type = calculateMbtiType({
      EI: { E: 0, I: 3 },
      SN: { S: 3, N: 0 },
      TF: { T: 0, F: 3 },
      JP: { J: 3, P: 0 },
    });

    expect(type).toBe("ISFJ");
  });
});
