"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import type { ReportKind, WildReport } from "@/types/report";
import { REPORT_KINDS } from "@/types/report";
import { addReport, loadReports } from "@/lib/reports";

const ReportPicker = dynamic(() => import("./ReportPicker"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[45vh] min-h-[300px] items-center justify-center rounded-2xl border border-forest-100 bg-forest-50 text-sm text-forest-500">
      지도를 불러오는 중…
    </div>
  ),
});

export default function ReportApp() {
  const [reports, setReports] = useState<WildReport[]>([]);
  const [kind, setKind] = useState<ReportKind>("야생동물 목격");
  const [description, setDescription] = useState("");
  const [photoName, setPhotoName] = useState<string | undefined>();
  const [draft, setDraft] = useState<{ lat: number; lng: number } | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setReports(loadReports());
  }, []);

  function useMyLocation() {
    if (!navigator.geolocation) {
      setToast("이 브라우저에서는 위치 정보를 사용할 수 없습니다.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setDraft({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setToast("위치 권한을 확인해 주세요. 지도를 눌러 직접 지정할 수 있습니다.")
    );
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!draft) {
      setToast("지도를 눌러 제보 위치를 먼저 지정해 주세요.");
      return;
    }
    const report: WildReport = {
      id: `r-${Date.now()}`,
      kind,
      description: description.trim(),
      lat: draft.lat,
      lng: draft.lng,
      photoName,
      createdAt: new Date().toISOString(),
    };
    setReports((prev) => addReport(prev, report));
    setDescription("");
    setPhotoName(undefined);
    setDraft(null);
    setToast("제보가 접수되었습니다. 소중한 참여 감사합니다! 🌱");
  }

  return (
    <div className="flex flex-col gap-6">
      <ReportPicker reports={reports} draft={draft} onPick={(lat, lng) => setDraft({ lat, lng })} />

      <form
        onSubmit={submit}
        className="flex flex-col gap-4 rounded-2xl border border-forest-100 bg-white p-5"
      >
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={useMyLocation}
            className="rounded-full border border-forest-300 px-3.5 py-1.5 text-sm font-medium text-forest-700 hover:border-forest-500"
          >
            📍 현재 위치 사용
          </button>
          <span className="text-sm text-forest-500">
            {draft
              ? `선택됨: ${draft.lat.toFixed(4)}, ${draft.lng.toFixed(4)}`
              : "지도를 눌러 위치를 지정하세요"}
          </span>
        </div>

        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-forest-800">제보 유형</span>
          <select
            value={kind}
            onChange={(e) => setKind(e.target.value as ReportKind)}
            className="rounded-lg border border-forest-200 bg-cream px-3 py-2"
          >
            {REPORT_KINDS.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-forest-800">설명</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="발견 상황을 적어주세요. (예: 등산로 옆 올가미 발견)"
            className="rounded-lg border border-forest-200 bg-cream px-3 py-2"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-forest-800">현장 사진 (선택)</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhotoName(e.target.files?.[0]?.name)}
            className="text-sm text-forest-600 file:mr-3 file:rounded-full file:border-0 file:bg-forest-100 file:px-3 file:py-1.5 file:text-forest-700"
          />
          {photoName && (
            <span className="text-xs text-forest-500">첨부: {photoName}</span>
          )}
        </label>

        <button
          type="submit"
          className="rounded-full bg-forest-600 px-5 py-2.5 text-sm font-semibold text-cream transition hover:bg-forest-700"
        >
          와일드 제보 보내기
        </button>

        {toast && (
          <p className="rounded-lg bg-forest-50 px-3 py-2 text-sm text-forest-700">
            {toast}
          </p>
        )}
      </form>

      <section>
        <h2 className="mb-3 text-lg font-bold text-forest-900">
          접수된 제보 {reports.length > 0 && `(${reports.length})`}
        </h2>
        {reports.length === 0 ? (
          <p className="text-sm text-forest-500">
            아직 접수된 제보가 없습니다. 첫 번째 시민 과학자가 되어주세요!
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {reports.map((r) => (
              <li
                key={r.id}
                className="flex items-start justify-between gap-3 rounded-xl border border-forest-100 bg-white p-3 text-sm"
              >
                <div>
                  <p className="font-semibold text-red-700">⚠ {r.kind}</p>
                  {r.description && (
                    <p className="text-forest-700">{r.description}</p>
                  )}
                  <p className="mt-1 text-xs text-forest-400">
                    {r.lat.toFixed(4)}, {r.lng.toFixed(4)} ·{" "}
                    {new Date(r.createdAt).toLocaleString("ko-KR")}
                    {r.photoName ? ` · 📷 ${r.photoName}` : ""}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
