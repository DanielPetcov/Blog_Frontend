import { ArrowUpRight, FilePenLine } from "lucide-react";
import Link from "next/link";

import { AdminArticle } from "@/lib/api/articles";

function formatDate(timestamp: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(timestamp));
}

interface AdminArticlesListProps {
  articles: AdminArticle[];
}

export default function AdminArticlesList({
  articles,
}: AdminArticlesListProps) {
  if (articles.length === 0) {
    return (
      <div className="border border-dashed border-border bg-surface px-5 py-12 text-center sm:px-8 sm:py-16">
        <FilePenLine
          className="mx-auto size-6 text-brand"
          aria-hidden="true"
        />
        <p className="mt-4 text-xl font-medium tracking-[-0.035em] text-navy">
          No articles yet
        </p>
        <p className="mx-auto mt-2 max-w-sm font-mono text-xs leading-6 text-foreground-muted">
          Create your first article to start building the archive.
        </p>
        <Link
          href="/admin/articles/new"
          className="mt-6 inline-flex min-h-10 items-center border border-brand bg-brand px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
        >
          Create your first article
        </Link>
      </div>
    );
  }

  return (
    <div className="border-y border-border">
      {articles.map((article) => (
        <article
          key={article.id}
          className="flex flex-col gap-5 border-b border-border py-6 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-3"
        >
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[10px] font-medium tracking-[0.14em] text-foreground-muted">
                {String(article.id).padStart(2, "0")}
              </span>
              <span
                className={`border px-2 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.1em] ${article.published ? "border-brand/30 bg-brand-soft text-navy" : "border-border bg-muted text-navy"}`}
              >
                {article.published ? "Published" : "Draft"}
              </span>
            </div>
            <h3 className="mt-3 text-xl font-medium tracking-[-0.035em] text-navy sm:text-2xl">
              {article.title}
            </h3>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.1em] text-foreground-muted">
              <span className="text-brand">{"topic"}</span>
              <span className="mx-2 text-brand">/</span>
              Updated{" "}
              <time dateTime={article.updatedAt}>
                {formatDate(article.updatedAt)}
              </time>
              {article.publishedAt && (
                <>
                  <span className="mx-2 text-brand">/</span>Published{" "}
                  <time dateTime={article.publishedAt}>
                    {formatDate(article.publishedAt)}
                  </time>
                </>
              )}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-5 font-mono text-[10px] font-semibold uppercase tracking-[0.1em]">
            <Link
              href={`/admin/articles/${article.slug}/edit`}
              className="inline-flex items-center gap-1 text-navy transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            >
              <FilePenLine className="size-3" aria-hidden="true" /> Edit
            </Link>
            {article.published ? (
              <Link
                href={`/articles/${article.slug}`}
                className="inline-flex items-center gap-1 text-brand transition-colors hover:text-brand-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
              >
                View <ArrowUpRight className="size-3" aria-hidden="true" />
              </Link>
            ) : (
              <span className="text-foreground-muted">Unpublished</span>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
