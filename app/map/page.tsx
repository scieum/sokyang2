import type { Metadata } from "next";
import TraceMapClient from "@/components/map/TraceMapClient";
import { getAllTraces } from "@/lib/traces";

export const metadata: Metadata = {
  title: "흔적 히트맵 | 속초 와일드맵",
  description:
    "설악산 야생동물의 발자국·배설물·목격 흔적을 GPS 좌표로 시각화한 생태 지도.",
};

export default function MapPage() {
  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-bold text-forest-900">야생동물 흔적 히트맵</h1>
        <p className="mt-1 text-sm text-forest-600">
          축적된 GPS 흔적 데이터로 야생동물의 주요 이동 경로와 로드킬 다발 구역을
          살펴보세요. 탐방 시 안전 가이드로 활용할 수 있습니다.
        </p>
      </header>

      <TraceMapClient traces={getAllTraces()} />

      <p className="text-xs text-forest-400">
        ※ 현재 표시되는 좌표는 시연용 목업 데이터입니다.
      </p>
    </div>
  );
}
