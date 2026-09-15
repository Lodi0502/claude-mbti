export type Dimension = "EI" | "SN" | "TF" | "JP";

export type EIType = "E" | "I";
export type SNType = "S" | "N";
export type TFType = "T" | "F";
export type JPType = "J" | "P";

export type MbtiTypeCode =
  | "ISTJ"
  | "ISFJ"
  | "INFJ"
  | "INTJ"
  | "ISTP"
  | "ISFP"
  | "INFP"
  | "INTP"
  | "ESTP"
  | "ESFP"
  | "ENFP"
  | "ENTP"
  | "ESTJ"
  | "ESFJ"
  | "ENFJ"
  | "ENTJ";

export interface QuestionOption {
  id: string;
  text: string;
  dimension: Dimension;
  score: EIType | SNType | TFType | JPType;
}

export interface Question {
  id: string;
  order: number;
  dimension: Dimension;
  text: string;
  options: [QuestionOption, QuestionOption];
}

export interface DimensionScore {
  EI: { E: number; I: number };
  SN: { S: number; N: number };
  TF: { T: number; F: number };
  JP: { J: number; P: number };
}

export interface TestProgress {
  currentQuestionIndex: number;
  answers: Record<string, QuestionOption["score"]>;
  scores: DimensionScore;
}

export interface MbtiTypeContent {
  code: MbtiTypeCode;
  nickname: string;
  emoji: string;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  recommendedJobs: string[];
}

export interface TestHistoryEntry {
  id: string;
  resultType: MbtiTypeCode;
  completedAt: string;
}

export type TestHistory = TestHistoryEntry[];

export interface InProgressSession {
  progress: TestProgress;
  startedAt: string;
}

export interface TypeDistributionStat {
  code: MbtiTypeCode;
  percentage: number;
}

export interface DistributionStats {
  totalParticipants: number;
  distribution: TypeDistributionStat[];
  isMock: boolean;
}

export const TOTAL_QUESTIONS = 12;

export const createEmptyScores = (): DimensionScore => ({
  EI: { E: 0, I: 0 },
  SN: { S: 0, N: 0 },
  TF: { T: 0, F: 0 },
  JP: { J: 0, P: 0 },
});
