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
