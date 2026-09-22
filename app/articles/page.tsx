import ArticleRow from "../components/ArticleRow";

import { getRequestedPage } from "@/lib/utils";

import ArticlesPagination from "./components/ArticlesPagination";
import ArticlesAside from "./components/ArticlesAside";
import ArticlesHeader from "./components/ArticlesHeader";
import { listPublicArticlesAction } from "@/actions/articles.actions";

const topics: string[] = [];

const articlesPerPage = 10;

export default async function BlogListPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string; topic?: string }>;
}) {
  const { page, q, topic } = await searchParams;
  const requestedPage = getRequestedPage(page);

  const response = await listPublicArticlesAction({
    page: requestedPage,
    limit: articlesPerPage,
    q,
    topic,
  });
  const articles = response.success ? response.data.data : [];
  const pageCount = response.success ? response.data.pagination.totalPages : 0;
  const currentPage = response.success ? response.data.pagination.page : 1;

  return (
    <div>
      <ArticlesHeader />

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-16">
        <ArticlesAside topics={topics} />

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
