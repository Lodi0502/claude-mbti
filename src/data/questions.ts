import type { Question } from "../types/mbti";

export const questions: Question[] = [
  {
    id: "q1",
    order: 1,
    dimension: "EI",
    text: "주말에 지친 마음을 채우는 나만의 방법은?",
    options: [
      { id: "q1-a", text: "친구들과 만나서 신나게 논다", dimension: "EI", score: "E" },
      { id: "q1-b", text: "집에서 혼자 조용히 쉰다", dimension: "EI", score: "I" },
    ],
  },
  {
    id: "q2",
    order: 2,
    dimension: "SN",
    text: "새로운 일을 시작할 때 나는?",
    options: [
      {
        id: "q2-a",
        text: "구체적인 절차와 사례부터 확인한다",
        dimension: "SN",
        score: "S",
      },
      {
        id: "q2-b",
        text: "전체적인 아이디어와 가능성부터 떠올린다",
        dimension: "SN",
        score: "N",
      },
    ],
  },
  {
    id: "q3",
    order: 3,
    dimension: "TF",
    text: "친구가 고민을 털어놓을 때 나는?",
    options: [
      { id: "q3-a", text: "원인을 분석하고 해결책을 제시한다", dimension: "TF", score: "T" },
      { id: "q3-b", text: "먼저 마음에 공감하고 위로한다", dimension: "TF", score: "F" },
    ],
  },
  {
    id: "q4",
    order: 4,
    dimension: "JP",
    text: "여행을 떠날 때 나는?",
    options: [
      { id: "q4-a", text: "일정을 미리 꼼꼼하게 계획한다", dimension: "JP", score: "J" },
      { id: "q4-b", text: "그때그때 즉흥적으로 정한다", dimension: "JP", score: "P" },
    ],
  },
  {
    id: "q5",
    order: 5,
    dimension: "EI",
    text: "처음 보는 사람이 많은 모임에 가면 나는?",
    options: [
      { id: "q5-a", text: "먼저 다가가서 인사를 건넨다", dimension: "EI", score: "E" },
      { id: "q5-b", text: "누가 말을 걸 때까지 조용히 기다린다", dimension: "EI", score: "I" },
    ],
  },
  {
    id: "q6",
    order: 6,
    dimension: "SN",
    text: "누군가의 이야기를 들을 때 나는?",
    options: [
      { id: "q6-a", text: "실제로 있었던 사실 위주로 이해한다", dimension: "SN", score: "S" },
      {
        id: "q6-b",
        text: "숨은 의미나 비유를 상상하며 이해한다",
        dimension: "SN",
        score: "N",
      },
    ],
  },
  {
    id: "q7",
    order: 7,
    dimension: "TF",
    text: "중요한 결정을 내릴 때 나는?",
    options: [
      { id: "q7-a", text: "논리와 객관적인 기준을 우선한다", dimension: "TF", score: "T" },
      { id: "q7-b", text: "사람들의 감정과 관계를 우선한다", dimension: "TF", score: "F" },
    ],
  },
  {
    id: "q8",
    order: 8,
    dimension: "JP",
    text: "해야 할 일이 잔뜩 쌓여 있을 때 나는?",
    options: [
      {
        id: "q8-a",
        text: "목록을 만들어 하나씩 끝내야 마음이 편하다",
        dimension: "JP",
        score: "J",
      },
      { id: "q8-b", text: "마감 직전에 몰아서 해도 괜찮다", dimension: "JP", score: "P" },
    ],
  },
  {
    id: "q9",
    order: 9,
    dimension: "EI",
    text: "길고 힘든 하루를 보낸 뒤 나는?",
    options: [
      {
        id: "q9-a",
        text: "사람들과 어울리며 스트레스를 푼다",
        dimension: "EI",
        score: "E",
      },
      {
        id: "q9-b",
        text: "혼자만의 시간을 가지며 회복한다",
        dimension: "EI",
        score: "I",
      },
    ],
  },
  {
    id: "q10",
    order: 10,
    dimension: "SN",
    text: "처음 써보는 물건의 설명서를 볼 때 나는?",
    options: [
      {
        id: "q10-a",
        text: "순서대로 하나씩 차근차근 따라간다",
        dimension: "SN",
        score: "S",
      },
      { id: "q10-b", text: "대충 훑어보고 감으로 시도해본다", dimension: "SN", score: "N" },
    ],
  },
  {
    id: "q11",
    order: 11,
    dimension: "TF",
    text: "누군가에게 듣기 싫은 말을 전해야 할 때 나는?",
    options: [
      { id: "q11-a", text: "사실을 있는 그대로 직접 전달한다", dimension: "TF", score: "T" },
      {
        id: "q11-b",
        text: "상대가 상처받지 않도록 돌려서 말한다",
        dimension: "TF",
        score: "F",
      },
    ],
  },
  {
    id: "q12",
    order: 12,
    dimension: "JP",
    text: "갑자기 계획이 틀어지면 나는?",
    options: [
      { id: "q12-a", text: "혼란스럽고 원래 계획대로 하고 싶다", dimension: "JP", score: "J" },
      { id: "q12-b", text: "오히려 새로운 상황이 흥미롭다", dimension: "JP", score: "P" },
    ],
  },
];
