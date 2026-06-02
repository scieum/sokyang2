import newsData from "@/data/news.json";
import type { NewsItem } from "@/types/news";

const news = newsData as NewsItem[];

/** 발행일 최신순 뉴스 목록 */
export function getAllNews(): NewsItem[] {
  return [...news].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
