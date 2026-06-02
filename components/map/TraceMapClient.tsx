"use client";

import dynamic from "next/dynamic";
import type { TracePoint } from "@/types/trace";

// Leaflet은 window에 의존하므로 SSR을 비활성화하고 클라이언트에서만 로드
const TraceMap = dynamic(() => import("./TraceMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[60vh] min-h-[360px] items-center justify-center rounded-2xl border border-forest-100 bg-forest-50 text-sm text-forest-500">
      지도를 불러오는 중…
    </div>
  ),
});

export default function TraceMapClient({ traces }: { traces: TracePoint[] }) {
  return <TraceMap traces={traces} />;
}
