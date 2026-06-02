// 야생동물 흔적(GPS) 데이터 타입

/** 흔적 종류 */
export type TraceKind = "발자국" | "배설물" | "먹이흔적" | "목격" | "로드킬";

export interface TracePoint {
  id: string;
  /** 종 id (types/species.ts의 Species.id와 연결) */
  speciesId: string;
  /** 종 국문명 (표시용 캐시) */
  speciesName: string;
  /** 흔적 종류 */
  kind: TraceKind;
  /** 위도 */
  lat: number;
  /** 경도 */
  lng: number;
  /** 밀도/강도 (히트맵 가중치, 0~1) */
  intensity: number;
  /** 관측 일자 (YYYY-MM-DD) */
  observedAt: string;
}
