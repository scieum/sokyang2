"use client";

import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { NewsItem } from "@/types/news";
import { SEORAK_CENTER } from "@/lib/traces";

/** 선택된 뉴스 위치로 지도를 부드럽게 이동 */
function Flyer({ item }: { item: NewsItem | null }) {
  const map = useMap();
  useEffect(() => {
    if (item) map.flyTo([item.lat, item.lng], 14, { duration: 0.8 });
  }, [map, item]);
  return null;
}

export default function NewsMap({
  news,
  selected,
  onSelect,
}: {
  news: NewsItem[];
  selected: NewsItem | null;
  onSelect: (item: NewsItem) => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-forest-100">
      <MapContainer
        center={SEORAK_CENTER}
        zoom={12}
        scrollWheelZoom={false}
        style={{ height: "50vh", minHeight: 320, width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Flyer item={selected} />

        {news.map((item) => {
          const active = selected?.id === item.id;
          return (
            <CircleMarker
              key={item.id}
              center={[item.lat, item.lng]}
              radius={active ? 11 : 8}
              pathOptions={{
                color: active ? "#b07d45" : "#2f4e28",
                fillColor: active ? "#c2935a" : "#4d7d3f",
                fillOpacity: 0.85,
                weight: active ? 3 : 1,
              }}
              eventHandlers={{ click: () => onSelect(item) }}
            >
              <Popup>
                <div className="text-sm">
                  <strong>{item.title}</strong>
                  <br />
                  <span className="text-gray-500">
                    {item.source} · {item.place}
                  </span>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
