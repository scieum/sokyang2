import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "속초 와일드맵 | 설악의 숨은 생명",
  description:
    "속초·설악산 산림 야생동물 디지털 도감. 생명의 흔적을 따라가는 모바일 생태 지도.",
};

export const viewport: Viewport = {
  themeColor: "#2f4e28",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen flex flex-col">
        <header className="sticky top-0 z-10 border-b border-forest-100 bg-cream/90 backdrop-blur">
          <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-3">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl">🏔️</span>
              <span className="font-bold text-forest-800">속초 와일드맵</span>
            </Link>
            <Link
              href="/guide"
              className="text-sm font-medium text-forest-600 hover:text-forest-800"
            >
              도감
            </Link>
          </div>
        </header>

        <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-6">
          {children}
        </main>

        <footer className="border-t border-forest-100 bg-forest-50">
          <div className="mx-auto max-w-3xl px-5 py-6 text-center text-xs text-forest-600">
            <p>“기술은 인간뿐만 아니라 산양의 발걸음도 지켜야 합니다.”</p>
            <p className="mt-1 text-forest-400">
              속초 와일드맵 · 설악의 숨은 생명, 디지털로 깨어나다
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
