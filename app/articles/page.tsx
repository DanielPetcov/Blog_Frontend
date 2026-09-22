import Link from "next/link";

import { ArrowLeft, ArrowRight, Search } from "lucide-react";

import ArticleRow from "../components/ArticleRow";
import { ArticleDetail } from "@/lib/types/article/article.type";

const articles: ArticleDetail[] = [];

const topics: string[] = [];

const articlesPerPage = 10;

import {
  getPageHref,
  getCurrentPage,
  getPageArticles,
  getPageCount,
  getRequestedPage,
} from "@/lib/utils";

export default async function BlogListPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const requestedPage = getRequestedPage((await searchParams).page);
  const pageCount = getPageCount(articles.length, articlesPerPage);
  const currentPage = getCurrentPage(requestedPage, pageCount);
  const pageArticles = getPageArticles(articles, currentPage, articlesPerPage);

  return (
    <div>
      <header className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-brand">
            Technical journal / archive
          </p>
          <h1 className="mt-5 max-w-4xl text-5xl font-medium leading-[0.94] tracking-[-0.075em] text-navy sm:text-6xl lg:text-7xl">
            All articles.
          </h1>
          <p className="mt-7 max-w-xl font-mono text-xs leading-6 tracking-[0.025em] text-foreground-muted sm:text-sm">
            Notes on systems, engineering practice, and the small tools that
            make software easier to build.
          </p>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-16">
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <form role="search">
            <label
              htmlFor="article-search"
              className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-navy"
            >
              Search archive
            </label>
            <div className="mt-3 flex border border-navy/20 bg-surface-elevated focus-within:border-brand">
              <input
                id="article-search"
                name="query"
                type="search"
                placeholder="Search notes"
                className="min-w-0 flex-1 bg-transparent px-3 py-3 font-mono text-xs text-navy outline-none placeholder:text-foreground-muted"
              />
              <button
                type="submit"
                className="grid w-10 place-items-center text-brand transition-colors hover:bg-brand hover:text-white"
                aria-label="Search articles"
              >
                <Search className="size-4" />
              </button>
            </div>
          </form>

          <div className="mt-10">
            <h2 className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-navy">
              Browse topics
            </h2>
            <nav
              aria-label="Article topics"
              className="mt-3 border-b border-border"
            >
              {topics.map((topic) => {
                const isAllTopics = topic === "All topics";
                const href = isAllTopics
                  ? "/articles"
                  : `/articles?topic=${encodeURIComponent(topic.toLowerCase())}`;

                return (
                  <Link
                    key={topic}
                    href={href}
                    className="flex items-center justify-between border-t border-border py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-navy transition-[padding,background-color,color] hover:bg-brand-soft/50 hover:pl-2 hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
                  >
                    {topic}
                    {!isAllTopics && (
                      <span className="text-foreground-muted">↗</span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        <section aria-labelledby="article-list-heading">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-brand">
                Recent writing
              </p>
              <h2
                id="article-list-heading"
                className="mt-3 text-3xl font-medium tracking-[-0.055em] text-navy sm:text-4xl"
              >
                Latest from the archive
              </h2>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-foreground-muted">
              {articles.length} articles
            </p>
          </div>

          <div className="border-b border-border">
            {pageArticles.map((article) => (
              <ArticleRow
                key={article.id}
                id={article.id}
                slug={article.slug}
                title={article.title}
                description={article.description ?? ""}
                // topic={article.topic}
                dateCreated={new Date(article.publishedAt ?? article.createdAt)}
              />
            ))}
          </div>

          <nav
            aria-label="Article pages"
            className="mt-10 flex items-center justify-between border-t border-border pt-5"
          >
            {currentPage > 1 ? (
              <Link
                href={getPageHref(currentPage - 1)}
                className="inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-navy transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
              >
                <ArrowLeft className="size-3" /> Previous
              </Link>
            ) : (
              <span className="inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground-muted/50">
                <ArrowLeft className="size-3" /> Previous
              </span>
            )}

            <div
              className="flex items-center gap-1"
              aria-label={`Page ${currentPage} of ${pageCount}`}
            >
              {Array.from({ length: pageCount }, (_, index) => index + 1).map(
                (page) => (
                  <Link
                    key={page}
                    href={getPageHref(page)}
                    aria-current={page === currentPage ? "page" : undefined}
                    className={`grid size-8 place-items-center border font-mono text-[10px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand ${page === currentPage ? "border-brand bg-brand text-white" : "border-border text-navy hover:border-brand hover:text-brand"}`}
                  >
                    {page}
                  </Link>
                ),
              )}
            </div>

            {currentPage < pageCount ? (
              <Link
                href={getPageHref(currentPage + 1)}
                className="inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-navy transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
              >
                Next <ArrowRight className="size-3" />
              </Link>
            ) : (
              <span className="inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground-muted/50">
                Next <ArrowRight className="size-3" />
              </span>
            )}
          </nav>
        </section>
      </div>
    </div>
  );
}
