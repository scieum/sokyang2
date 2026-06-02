"use client";

import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { WildReport } from "@/types/report";
import { SEORAK_CENTER } from "@/lib/traces";

function ClickHandler({
  onPick,
}: {
  onPick: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function ReportPicker({
  reports,
  draft,
  onPick,
}: {
  reports: WildReport[];
  draft: { lat: number; lng: number } | null;
  onPick: (lat: number, lng: number) => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-forest-100">
      <MapContainer
        center={SEORAK_CENTER}
        zoom={12}
        scrollWheelZoom={false}
        style={{ height: "45vh", minHeight: 300, width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ClickHandler onPick={onPick} />

        {reports.map((r) => (
          <CircleMarker
            key={r.id}
            center={[r.lat, r.lng]}
            radius={8}
            pathOptions={{
              color: "#b91c1c",
              fillColor: "#ef4444",
              fillOpacity: 0.8,
              weight: 1,
            }}
          >
            <Popup>
              <div className="text-sm">
                <strong>⚠ {r.kind}</strong>
                <br />
                {r.description || "(설명 없음)"}
              </div>
            </Popup>
          </CircleMarker>
        ))}

        {draft && (
          <CircleMarker
            center={[draft.lat, draft.lng]}
            radius={10}
            pathOptions={{
              color: "#2f4e28",
              fillColor: "#4d7d3f",
              fillOpacity: 0.9,
              weight: 2,
            }}
          >
            <Popup>제보할 위치</Popup>
          </CircleMarker>
        )}
      </MapContainer>
    </div>
  );
}
