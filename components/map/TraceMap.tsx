"use client";

import { useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { TracePoint, TraceKind } from "@/types/trace";
import { SEORAK_CENTER } from "@/lib/traces";
import HeatLayer from "./HeatLayer";

const KIND_COLOR: Record<TraceKind, string> = {
  발자국: "#4d7d3f",
  배설물: "#96643a",
  먹이흔적: "#b07d45",
  목격: "#2f4e28",
  로드킬: "#b91c1c",
};

type Mode = "heat" | "points";

export default function TraceMap({ traces }: { traces: TracePoint[] }) {
  const [mode, setMode] = useState<Mode>("heat");

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode("heat")}
          aria-pressed={mode === "heat"}
          className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
            mode === "heat"
              ? "border-forest-600 bg-forest-600 text-cream"
              : "border-forest-200 bg-white text-forest-600 hover:border-forest-400"
          }`}
        >
          히트맵
        </button>
        <button
          type="button"
          onClick={() => setMode("points")}
          aria-pressed={mode === "points"}
          className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
            mode === "points"
              ? "border-forest-600 bg-forest-600 text-cream"
              : "border-forest-200 bg-white text-forest-600 hover:border-forest-400"
          }`}
        >
          흔적 지점
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-forest-100">
        <MapContainer
          center={SEORAK_CENTER}
          zoom={12}
          scrollWheelZoom={false}
          style={{ height: "60vh", minHeight: 360, width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {mode === "heat" && <HeatLayer traces={traces} />}

          {mode === "points" &&
            traces.map((t) => (
              <CircleMarker
                key={t.id}
                center={[t.lat, t.lng]}
                radius={7}
                pathOptions={{
                  color: KIND_COLOR[t.kind],
                  fillColor: KIND_COLOR[t.kind],
                  fillOpacity: 0.7,
                  weight: 1,
                }}
              >
                <Popup>
                  <div className="text-sm">
                    <strong>{t.speciesName}</strong> · {t.kind}
                    <br />
                    <span className="text-gray-500">{t.observedAt}</span>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
        </MapContainer>
      </div>

      {mode === "points" && (
        <ul className="flex flex-wrap gap-3 text-xs text-forest-700">
          {(Object.keys(KIND_COLOR) as TraceKind[]).map((k) => (
            <li key={k} className="flex items-center gap-1.5">
              <span
                className="inline-block h-3 w-3 rounded-full"
                style={{ backgroundColor: KIND_COLOR[k] }}
              />
              {k}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
