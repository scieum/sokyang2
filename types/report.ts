// 시민 와일드 제보 데이터 타입

/** 제보 유형 */
export type ReportKind =
  | "밀렵도구 발견"
  | "로드킬 목격"
  | "야생동물 목격"
  | "부상 동물"
  | "기타";

export interface WildReport {
  id: string;
  kind: ReportKind;
  description: string;
  lat: number;
  lng: number;
  /** 첨부 사진 파일명 (목업: 파일 데이터는 저장하지 않음) */
  photoName?: string;
  /** 제보 시각 (ISO) */
  createdAt: string;
}

export const REPORT_KINDS: ReportKind[] = [
  "밀렵도구 발견",
  "로드킬 목격",
  "야생동물 목격",
  "부상 동물",
  "기타",
];
