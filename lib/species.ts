import speciesData from "@/data/species.json";
import type { Species, TaxonGroup } from "@/types/species";

const species = speciesData as Species[];

/** 전체 종 목록 */
export function getAllSpecies(): Species[] {
  return species;
}

/** id로 단일 종 조회 */
export function getSpeciesById(id: string): Species | undefined {
  return species.find((s) => s.id === id);
}

/** 도감에 등장하는 분류군 목록 (필터용) */
export function getGroups(): TaxonGroup[] {
  return Array.from(new Set(species.map((s) => s.group)));
}
