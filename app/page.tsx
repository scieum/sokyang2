import Link from "next/link";
import SpeciesCard from "@/components/SpeciesCard";
import { getAllSpecies } from "@/lib/species";

export default function HomePage() {
  const featured = getAllSpecies().slice(0, 3);

  return (
    <div className="flex flex-col gap-10">
      <section className="rounded-3xl bg-gradient-to-b from-forest-700 to-forest-600 px-6 py-10 text-cream">
        <p className="text-sm font-medium text-forest-100">
          설악의 숨은 생명, 디지털로 깨어나다
        </p>
        <h1 className="mt-2 text-3xl font-bold leading-snug">
          내 손안의 작은 설악산,
          <br />
          생명의 흔적을 따라가다
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-forest-100">
          속초·설악산의 산림 야생동물을 만나보세요. 종의 이름과 특징, 그리고
          우리가 함께 지켜야 할 이야기를 담았습니다.
        </p>
        <Link
          href="/guide"
          className="mt-6 inline-block rounded-full bg-cream px-5 py-2.5 text-sm font-semibold text-forest-800 shadow-sm transition hover:bg-white"
        >
          디지털 도감 둘러보기 →
        </Link>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-xl font-bold text-forest-900">설악의 대표 생명</h2>
          <Link href="/guide" className="text-sm text-forest-600 hover:text-forest-800">
            전체 보기
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {featured.map((s) => (
            <SpeciesCard key={s.id} species={s} />
          ))}
        </div>
      </section>
    </div>
  );
}
