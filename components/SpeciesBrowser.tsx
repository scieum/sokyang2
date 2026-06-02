"use client";

import { useMemo, useState } from "react";
import type { Species, TaxonGroup } from "@/types/species";
import SpeciesCard from "./SpeciesCard";

export default function SpeciesBrowser({
  species,
  groups,
}: {
  species: Species[];
  groups: TaxonGroup[];
}) {
  const [active, setActive] = useState<TaxonGroup | "전체">("전체");

  const filtered = useMemo(
    () => (active === "전체" ? species : species.filter((s) => s.group === active)),
    [species, active]
  );

  const filters: (TaxonGroup | "전체")[] = ["전체", ...groups];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setActive(f)}
            aria-pressed={active === f}
            className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
              active === f
                ? "border-forest-600 bg-forest-600 text-cream"
                : "border-forest-200 bg-white text-forest-600 hover:border-forest-400"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <p className="text-sm text-forest-500">{filtered.length}종</p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {filtered.map((s) => (
          <SpeciesCard key={s.id} species={s} />
        ))}
      </div>
    </div>
  );
}
