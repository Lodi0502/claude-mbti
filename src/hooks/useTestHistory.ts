import { useCallback, useEffect, useState } from "react";
import type { MbtiTypeCode, TestHistory, TestHistoryEntry } from "../types/mbti";

const HISTORY_STORAGE_KEY = "mbti_test_history";
const MAX_HISTORY_ENTRIES = 20;

function loadHistory(): TestHistory {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as TestHistory;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveHistory(history: TestHistory): void {
  try {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
  } catch {
    // 저장 실패는 게임 진행에 영향을 주지 않는다(PRD 5.4절과 동일한 원칙).
  }
}

export function useTestHistory() {
  const [history, setHistory] = useState<TestHistory>(() => loadHistory());

  useEffect(() => {
    saveHistory(history);
  }, [history]);

  const addEntry = useCallback((resultType: MbtiTypeCode) => {
    const entry: TestHistoryEntry = {
      id: crypto.randomUUID(),
      resultType,
      completedAt: new Date().toISOString(),
    };
    setHistory((prev) => [entry, ...prev].slice(0, MAX_HISTORY_ENTRIES));
    return entry;
  }, []);

  const latestEntry = history[0] ?? null;

  return { history, latestEntry, addEntry };
}
