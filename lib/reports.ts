"use client";

import type { WildReport } from "@/types/report";

const KEY = "sokcho-wildmap-reports";

/** 저장된 제보 목록 로드 (클라이언트 전용) */
export function loadReports(): WildReport[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as WildReport[]) : [];
  } catch {
    return [];
  }
}

/** 제보 목록 저장 */
export function saveReports(reports: WildReport[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(reports));
}

/** 새 제보 추가 후 갱신된 목록 반환 */
export function addReport(reports: WildReport[], report: WildReport): WildReport[] {
  const next = [report, ...reports];
  saveReports(next);
  return next;
}
