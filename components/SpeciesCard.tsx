import Link from "next/link";
import type { Species } from "@/types/species";
import StatusBadge from "./StatusBadge";

export default function SpeciesCard({ species }: { species: Species }) {
  return (
    <Link
      href={`/guide/${species.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-forest-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex h-32 items-center justify-center bg-forest-50 text-5xl">
        <span aria-hidden="true">{species.emoji}</span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-bold text-forest-900">{species.name}</h3>
          <StatusBadge status={species.status} />
        </div>
        <p className="text-sm text-forest-600">{species.tagline}</p>
        <span className="mt-auto pt-2 text-xs font-medium text-moss group-hover:text-forest-700">
          {species.group} · 자세히 보기 →
        </span>
      </div>
    </Link>
  );
}
