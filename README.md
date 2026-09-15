# MBTI 성격 유형 테스트

React 19 + TypeScript 7 + Vite로 만든 MBTI 성격 유형 테스트 웹 서비스입니다.
PRD: [`docs/prd/mbti-personality-test.md`](../docs/prd/mbti-personality-test.md)

## 시작하기

```bash
npm install
npm run dev
```

브라우저에서 안내되는 주소(기본 `http://localhost:5173`)로 접속하면 됩니다.

## 주요 스크립트

| 명령 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 타입 체크 후 프로덕션 빌드 |
| `npm run preview` | 빌드 결과 미리보기 |
| `npm run lint` | Biome 린트 검사 |
| `npm run lint:fix` | Biome 린트 자동 수정 |
| `npm run format` | Biome 포맷 적용 |
| `npm test` | Vitest 테스트 실행 |

## 기능

- 12문항(EI/SN/TF/JP 각 3문항) 응답 후 16가지 MBTI 유형 중 하나를 산출
- 진행 상황 프로그레스 바, 이전 문항 이동
- 결과 화면: 유형 특징 · 강점 · 약점 · 추천 직업
- 결과를 PNG 이미지로 저장, 링크 복사 공유 (카카오톡 공유는 SDK 키 미설정 상태로 자리만 마련)
- 유형 분포 통계(현재는 목업 데이터, PRD 6.3절 참조)
- `sessionStorage` 기반 진행 중 세션 복구, `localStorage` 기반 결과 히스토리

## 프로젝트 구조

```
src/
  components/   # IntroScreen, QuestionScreen, ProgressBar, LoadingScreen,
                # ResultScreen, StatsScreen, Toast
  hooks/        # useMbtiTest(질문/점수 진행), useTestHistory(결과 히스토리)
  types/        # Dimension, Question, MbtiTypeContent 등 공용 타입
  data/         # questions, mbtiContents, mockDistribution 정적 데이터
  utils/        # calculateMbtiType (순수 함수, 단위 테스트 포함)
  App.tsx
  main.tsx
```

## PRD 대비 구현 범위 및 알려진 제약

- **카카오톡 공유**: 카카오 디벨로퍼스 JavaScript 키가 없어 실제 SDK 연동은 비활성 상태입니다.
  버튼은 존재하며 클릭 시 "준비 중" 안내와 함께 링크 복사 대안을 제공합니다. 키 발급 후
  `index.html`에 SDK 스크립트를 추가하고 `Kakao.init()`을 호출하면 바로 동작합니다.
- **유형 분포 통계**: 서버/DB가 없는 프런트엔드 전용 구조이므로 `data/mockDistribution.ts`의
  고정 데이터를 사용합니다(PRD 6.3절에서 이미 이렇게 정의됨).
- **질문 데이터 로드 실패 처리**: 질문 데이터가 번들에 정적으로 포함되어 있어 런타임에
  "로드 실패"가 발생할 수 없으므로 별도 재시도 UI는 구현하지 않았습니다. 결과 계산 오류,
  이미지 저장 실패, 링크 복사 실패 등 실제로 발생 가능한 예외는 처리했습니다.
- **비주얼 디자인 값**(정확한 컬러 팔레트, 일러스트 등)은 PRD 5.11절의 오픈 이슈대로
  기본 파스텔 톤으로 구현했으며, 추후 디자인 확정 시 `App.css`를 조정하면 됩니다.
