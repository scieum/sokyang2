import type { ConservationStatus } from "@/types/species";

const STYLES: Record<ConservationStatus, string> = {
  "멸종위기 I급": "bg-red-100 text-red-800 border-red-200",
  "멸종위기 II급": "bg-amber-100 text-amber-800 border-amber-200",
  "관심 필요": "bg-forest-100 text-forest-700 border-forest-200",
  "정보 부족": "bg-gray-100 text-gray-600 border-gray-200",
};

export default function StatusBadge({
  status,
}: {
  status: ConservationStatus;
}) {
  return (
    <span
      className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-semibold ${STYLES[status]}`}
    >
      {status}
    </span>
  );
}
