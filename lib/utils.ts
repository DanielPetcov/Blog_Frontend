export { cn } from "cn";

export function getRequestedPage(page: string | undefined) {
  return Number.parseInt(page ?? "1", 10);
}

export function getPageHref(page: number) {
  return page === 1 ? "/articles" : `/articles?page=${page}`;
}

export function getPageCount(articlesCount: number, articlesPerPage: number) {
  return Math.ceil(articlesCount / articlesPerPage);
}

export function getCurrentPage(requestedPage: number, pageCount: number) {
  return Number.isFinite(requestedPage)
    ? Math.min(Math.max(requestedPage, 1), pageCount)
    : 1;
}

export function getPageArticles<T>(
  articles: T[],
  currentPage: number,
  articlesPerPage: number,
) {
  return articles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage,
  );
}

export function formatDate(timestamp: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(timestamp));
}
