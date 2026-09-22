import ArticleRow from "../components/ArticleRow";
import Link from "next/link";
import { X } from "lucide-react";

import { getRequestedPage } from "@/lib/utils";

import ArticlesPagination from "./components/ArticlesPagination";
import ArticlesAside from "./components/ArticlesAside";
import ArticlesHeader from "./components/ArticlesHeader";
import { listPublicArticlesAction } from "@/actions/articles.actions";
import { listPublicTopicsAction } from "@/actions/topics.actions";

const articlesPerPage = 10;

export default async function BlogListPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string; topic?: string }>;
}) {
  const { page, q, topic } = await searchParams;
  const requestedPage = getRequestedPage(page);

  const [response, topicsResponse] = await Promise.all([
    listPublicArticlesAction({
      page: requestedPage,
      limit: articlesPerPage,
      q,
      topic,
    }),
    listPublicTopicsAction(100),
  ]);
  const articles = response.success ? response.data.data : [];
  const total = response.success ? response.data.pagination.total : 0;
  const pageCount = response.success ? response.data.pagination.totalPages : 0;
  const currentPage = response.success ? response.data.pagination.page : 1;
  const topics = topicsResponse.success ? topicsResponse.data : [];
  const selectedTopic = topics.find((item) => item.slug === topic);
  const hasActiveFilters = Boolean(q || topic);

  const getFilterHref = ({
    q: nextQuery,
    topic: nextTopic,
  }: {
    q?: string;
    topic?: string;
  }) => {
    const searchParams = new URLSearchParams();
    if (nextQuery) searchParams.set("q", nextQuery);
    if (nextTopic) searchParams.set("topic", nextTopic);
    return searchParams.size ? `/articles?${searchParams}` : "/articles";
  };

  return (
    <div>
      <ArticlesHeader />

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-16">
        <ArticlesAside
          topics={topics}
          searchQuery={q}
          selectedTopic={topic}
        />

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
              {total} articles
            </p>
          </div>

          {hasActiveFilters && (
            <div className="mb-6 flex flex-wrap items-center gap-2" aria-label="Active filters">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-foreground-muted">Filters:</span>
              {q && (
                <Link href={getFilterHref({ topic })} className="inline-flex items-center gap-1 border border-border bg-surface px-2 py-1 font-mono text-[10px] text-navy transition-colors hover:border-brand hover:text-brand">
                  Search: {q} <X className="size-3" aria-hidden="true" />
                </Link>
              )}
              {topic && (
                <Link href={getFilterHref({ q })} className="inline-flex items-center gap-1 border border-border bg-surface px-2 py-1 font-mono text-[10px] text-navy transition-colors hover:border-brand hover:text-brand">
                  Topic: {selectedTopic?.name ?? topic} <X className="size-3" aria-hidden="true" />
                </Link>
              )}
              <Link href="/articles" className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-brand hover:text-brand-hover">Clear all</Link>
            </div>
          )}

          <div className="border-b border-border">
            {articles.map((article) => (
              <ArticleRow key={article.id} {...article} />
            ))}
          </div>

          <ArticlesPagination
            currentPage={currentPage}
            pageCount={pageCount}
            q={q}
            topic={topic}
          />
        </section>
      </div>
    </div>
  );
}
