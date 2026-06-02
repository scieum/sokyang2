"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import type { NewsItem } from "@/types/news";

const NewsMap = dynamic(() => import("./NewsMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[50vh] min-h-[320px] items-center justify-center rounded-2xl border border-forest-100 bg-forest-50 text-sm text-forest-500">
      지도를 불러오는 중…
    </div>
  ),
});

export default function NewsApp({ news }: { news: NewsItem[] }) {
  const [selected, setSelected] = useState<NewsItem | null>(news[0] ?? null);

  return (
    <div className="flex flex-col gap-6">
      <NewsMap news={news} selected={selected} onSelect={setSelected} />

      <ul className="flex flex-col gap-3">
        {news.map((item) => {
          const active = selected?.id === item.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => setSelected(item)}
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  active
                    ? "border-earth-400 bg-earth-50"
                    : "border-forest-100 bg-white hover:border-forest-300"
                }`}
              >
                <div className="flex items-center gap-2 text-xs text-forest-500">
                  <span className="rounded-full bg-forest-100 px-2 py-0.5 font-medium text-forest-700">
                    📍 {item.place}
                  </span>
                  <span>
                    {item.source} · {item.publishedAt}
                  </span>
                </div>
                <h3 className="mt-1.5 font-bold text-forest-900">{item.title}</h3>
                <p className="mt-1 text-sm text-forest-600">{item.summary}</p>
                {item.speciesId && (
                  <Link
                    href={`/guide/${item.speciesId}`}
                    onClick={(e) => e.stopPropagation()}
                    className="mt-2 inline-block text-xs font-medium text-moss hover:text-forest-700"
                  >
                    도감에서 이 동물 보기 →
                  </Link>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
