// GitHub Pages 프로젝트 페이지(https://scieum.github.io/sokyang2/) 배포 설정
// - 정적 export(out/) 생성
// - 저장소 이름에 맞춘 basePath/assetPrefix (Pages 빌드 시에만 적용)
// - export 환경에서는 이미지 최적화 비활성화
const repo = "sokyang2";
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = isPages ? `/${repo}` : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
  assetPrefix: isPages ? `/${repo}/` : "",
  // unoptimized 이미지/public 자산 src에 수동으로 붙일 basePath를 클라이언트에 노출
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
