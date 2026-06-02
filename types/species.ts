// 야생동물 도감 데이터 타입 정의

/** 멸종위기 등급 */
export type ConservationStatus =
  | "멸종위기 I급"
  | "멸종위기 II급"
  | "관심 필요"
  | "정보 부족";

/** 분류군 */
export type TaxonGroup = "포유류" | "조류" | "파충류" | "양서류" | "곤충";

export interface Species {
  /** URL 슬러그 (예: 'goral') */
  id: string;
  /** 국문명 */
  name: string;
  /** 학명 */
  scientificName: string;
  /** 분류군 */
  group: TaxonGroup;
  /** 멸종위기 등급 */
  status: ConservationStatus;
  /** 한 줄 요약 (카드용) */
  tagline: string;
  /** 주요 서식지 */
  habitat: string;
  /** 특징 설명 문단 */
  description: string;
  /** 핵심 특징 태그 */
  features: string[];
  /** 보호 메시지 */
  protectionMessage: string;
  /** 대표 이미지 경로 (목업: placeholder) */
  image: string;
  /** 카드/상세 배경 이모지 (이미지 준비 전 플레이스홀더) */
  emoji: string;
}
