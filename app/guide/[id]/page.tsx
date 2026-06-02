import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import StatusBadge from "@/components/StatusBadge";
import { getAllSpecies, getSpeciesById } from "@/lib/species";

export function generateStaticParams() {
  return getAllSpecies().map((s) => ({ id: s.id }));
}

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const species = getSpeciesById(params.id);
  if (!species) return { title: "찾을 수 없음 | 속초 와일드맵" };
  return {
    title: `${species.name} | 속초 와일드맵`,
    description: species.tagline,
  };
}

export default function SpeciesDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const species = getSpeciesById(params.id);
  if (!species) notFound();

  return (
    <article className="flex flex-col gap-6">
      <Link href="/guide" className="text-sm text-forest-600 hover:text-forest-800">
        ← 도감으로 돌아가기
      </Link>

      <div className="overflow-hidden rounded-3xl border border-forest-100 bg-white">
        <div className="relative h-56 w-full bg-forest-50">
          <Image
            src={species.image}
            alt={`${species.name} 대표 이미지`}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
          <span
            aria-hidden="true"
            className="absolute bottom-3 right-4 text-5xl drop-shadow"
          >
            {species.emoji}
          </span>
        </div>

        <div className="flex flex-col gap-4 p-6">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold text-forest-900">{species.name}</h1>
            <StatusBadge status={species.status} />
            <span className="rounded-full bg-forest-50 px-2.5 py-0.5 text-xs text-forest-600">
              {species.group}
            </span>
          </div>
          <p className="text-sm italic text-forest-500">{species.scientificName}</p>
          <p className="text-base font-medium text-forest-700">{species.tagline}</p>

          <dl className="rounded-2xl bg-forest-50 p-4 text-sm">
            <dt className="font-semibold text-forest-800">서식지</dt>
            <dd className="mt-1 text-forest-700">{species.habitat}</dd>
          </dl>

          <section>
            <h2 className="mb-2 text-lg font-bold text-forest-900">특징</h2>
            <p className="leading-relaxed text-forest-700">{species.description}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {species.features.map((f) => (
                <li
                  key={f}
                  className="rounded-full bg-earth-100 px-3 py-1 text-xs font-medium text-earth-800"
                >
                  #{f}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-forest-200 bg-forest-50 p-4">
            <h2 className="mb-1 flex items-center gap-2 text-base font-bold text-forest-800">
              <span aria-hidden="true">🌱</span> 함께 지켜요
            </h2>
            <p className="text-sm leading-relaxed text-forest-700">
              {species.protectionMessage}
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
