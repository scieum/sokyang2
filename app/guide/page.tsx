import type { Metadata } from "next";
import SpeciesBrowser from "@/components/SpeciesBrowser";
import { getAllSpecies, getGroups } from "@/lib/species";

export const metadata: Metadata = {
  title: "야생동물 디지털 도감 | 속초 와일드맵",
  description: "설악산 산림 야생동물의 이름과 특징, 보호 이야기를 담은 디지털 도감.",
};

export default function GuidePage() {
  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-bold text-forest-900">야생동물 디지털 도감</h1>
        <p className="mt-1 text-sm text-forest-600">
          설악산에서 살아가는 생명들을 만나보세요. 분류군별로 살펴볼 수 있습니다.
        </p>
      </header>

      <SpeciesBrowser species={getAllSpecies()} groups={getGroups()} />
    </div>
  );
}
