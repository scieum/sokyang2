import type { Metadata } from "next";
import ReportApp from "@/components/report/ReportApp";

export const metadata: Metadata = {
  title: "와일드 제보 | 속초 와일드맵",
  description:
    "밀렵 도구 발견, 로드킬 목격 등을 위치와 함께 제보하는 시민 과학자 참여 플랫폼.",
};

export default function ReportPage() {
  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-bold text-forest-900">시민 와일드 제보</h1>
        <p className="mt-1 text-sm text-forest-600">
          밀렵 도구(덫·올가미)나 로드킬, 부상 동물을 발견하셨나요? 위치와 함께
          제보해 주세요. 시민의 눈이 곧 생태계를 지키는 힘입니다.
        </p>
      </header>

      <ReportApp />

      <p className="text-xs text-forest-400">
        ※ 시연용입니다. 제보는 이 브라우저에만 저장되며 실제 기관으로 전송되지
        않습니다.
      </p>
    </div>
  );
}
