// public 디렉터리 자산 경로에 basePath를 붙여준다.
// next/image의 unoptimized 모드와 <img>/url() 등은 basePath를 자동 적용하지 않으므로
// 정적 자산을 참조할 때 이 헬퍼를 사용한다.
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${BASE}${path}`;
}
