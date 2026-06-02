import tracesData from "@/data/traces.json";
import type { TracePoint } from "@/types/trace";

const traces = tracesData as TracePoint[];

/** 전체 흔적 좌표 */
export function getAllTraces(): TracePoint[] {
  return traces;
}

/** 설악산 흔적 데이터의 대략적 중심 좌표 */
export const SEORAK_CENTER: [number, number] = [38.145, 128.49];
