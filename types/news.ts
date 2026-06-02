// 뉴스-지도 매핑 데이터 타입

export interface NewsItem {
  id: string;
  /** 기사 제목 */
  title: string;
  /** 언론사 */
  source: string;
  /** 발행일 (YYYY-MM-DD) */
  publishedAt: string;
  /** 요약 */
  summary: string;
  /** 원문 링크 (목업: 빈 값 가능) */
  url: string;
  /** 위도 */
  lat: number;
  /** 경도 */
  lng: number;
  /** 연관 종 id (도감 연결, 선택) */
  speciesId?: string;
  /** 지도 핀 라벨 지명 */
  place: string;
}
