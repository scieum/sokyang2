import type { Metadata } from "next";
import NewsApp from "@/components/news/NewsApp";
import { getAllNews } from "@/lib/news";

export const metadata: Metadata = {
  title: "뉴스-지도 매핑 | 속초 와일드맵",
  description:
    "설악산·속초 야생동물 관련 뉴스를 발생 위치와 연결해 지도 위에서 살펴보는 서비스.",
};

export default function NewsPage() {
  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-bold text-forest-900">뉴스-지도 매핑</h1>
        <p className="mt-1 text-sm text-forest-600">
          속초·설악산 야생동물 관련 뉴스를 발생 위치와 연결했습니다. 기사를
          선택하면 지도가 해당 지점으로 이동합니다.
        </p>
      </header>

      <NewsApp news={getAllNews()} />

      <p className="text-xs text-forest-400">
        ※ 현재 기사는 시연용 목업 데이터이며, 추후 실시간 뉴스 마이닝으로 대체됩니다.
      </p>
    </div>
  );
}
