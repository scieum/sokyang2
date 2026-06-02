"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.heat";
import type { TracePoint } from "@/types/trace";

// leaflet.heat는 타입 정의를 제공하지 않으므로 런타임 함수에 접근하기 위한 캐스팅
type HeatFn = (
  points: [number, number, number][],
  options?: Record<string, unknown>
) => L.Layer;

export default function HeatLayer({ traces }: { traces: TracePoint[] }) {
  const map = useMap();

  useEffect(() => {
    const heat = (L as unknown as { heatLayer: HeatFn }).heatLayer;
    const points = traces.map(
      (t) => [t.lat, t.lng, t.intensity] as [number, number, number]
    );
    const layer = heat(points, {
      radius: 30,
      blur: 22,
      maxZoom: 15,
      gradient: { 0.3: "#9fbf95", 0.6: "#4d7d3f", 0.9: "#b07d45", 1.0: "#b91c1c" },
    });
    layer.addTo(map);
    return () => {
      layer.remove();
    };
  }, [map, traces]);

  return null;
}
