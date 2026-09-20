import Link from "next/link";
import { ArrowUpRight, FilePenLine, Plus } from "lucide-react";

import type {
  AdminDashboardArticle,
  AdminDashboardData,
} from "@/lib/types/admin-dashboard";

function formatDate(timestamp: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(timestamp));
}

function DateLabel({ label, timestamp }: { label: string; timestamp: string }) {
  return (
    <span>
      {label} <time dateTime={timestamp}>{formatDate(timestamp)}</time>
    </span>
  );
}

function ArticleActions({ article }: { article: AdminDashboardArticle }) {
  const editHref = `/admin/articles/${article.slug}/edit`;

  return (
    <div className="flex shrink-0 items-center gap-4 font-mono text-[10px] font-semibold uppercase tracking-[0.1em]">
      <Link href={editHref} className="text-navy transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
        Edit
      </Link>
      {article.published && (
        <Link href={`/articles/${article.slug}`} className="inline-flex items-center gap-1 text-brand transition-colors hover:text-brand-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
          View <ArrowUpRight className="size-3" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}

export default function DashboardContent({ data }: { data: AdminDashboardData }) {
  const hasArticles = data.counts.total > 0;

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
      <header className="flex flex-col gap-6 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-brand">Administration</p>
          <h1 className="mt-3 text-4xl font-medium tracking-[-0.06em] text-navy sm:text-5xl">Dashboard</h1>
          <p className="mt-4 max-w-xl font-mono text-xs leading-6 text-foreground-muted">Manage your articles and track your publishing activity.</p>
        </div>
        <Link href="/admin/articles/new" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 border border-brand bg-brand px-4 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
          <Plus className="size-4" aria-hidden="true" />
          New article
        </Link>
      </header>

      <section className="mt-8" aria-labelledby="article-overview-heading">
        <h2 id="article-overview-heading" className="sr-only">Article overview</h2>
        <div className="grid gap-px border border-border bg-border sm:grid-cols-3">
          {[
            ["Total articles", data.counts.total],
            ["Published", data.counts.published],
            ["Drafts", data.counts.drafts],
          ].map(([label, value]) => (
            <div key={label} className="bg-surface p-5 sm:p-6">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">{label}</p>
              <p className="mt-3 text-4xl font-medium tracking-[-0.06em] text-navy">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12" aria-labelledby="recent-articles-heading">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-brand">Content</p>
            <h2 id="recent-articles-heading" className="mt-2 text-2xl font-medium tracking-[-0.045em] text-navy sm:text-3xl">Recent articles</h2>
          </div>
          <Link href="/admin/articles" className="shrink-0 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-brand hover:text-brand-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">View all articles</Link>
        </div>

        {hasArticles ? (
          <div className="mt-5 border-y border-border">
            {data.recentArticles.map((article) => (
              <article key={article.id} className="flex flex-col gap-4 border-b border-border px-1 py-5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:px-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <Link href={`/admin/articles/${article.slug}/edit`} className="text-lg font-medium tracking-[-0.025em] text-navy hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
                      {article.title}
                    </Link>
                    <span className={`border px-2 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.1em] ${article.published ? "border-brand/30 bg-brand-soft text-navy" : "border-border bg-muted text-navy"}`}>
                      {article.published ? "Published" : "Draft"}
                    </span>
                  </div>
                  <p className="mt-2 font-mono text-[10px] leading-5 text-foreground-muted">
                    <DateLabel label="Updated" timestamp={article.updatedAt} />
                    {article.published && article.publishedAt && <><span aria-hidden="true"> · </span><DateLabel label="Published" timestamp={article.publishedAt} /></>}
                  </p>
                </div>
                <ArticleActions article={article} />
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-5 border border-dashed border-border bg-surface px-5 py-10 text-center sm:px-8">
            <FilePenLine className="mx-auto size-5 text-brand" aria-hidden="true" />
            <p className="mt-4 text-lg font-medium tracking-[-0.025em] text-navy">No articles yet</p>
            <p className="mt-2 font-mono text-xs leading-6 text-foreground-muted">Create your first article to start building the archive.</p>
            <Link href="/admin/articles/new" className="mt-5 inline-flex min-h-10 items-center border border-brand bg-brand px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-white hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">Create your first article</Link>
          </div>
        )}
      </section>

      {data.recentDrafts.length > 0 && (
        <section className="mt-12" aria-labelledby="recent-drafts-heading">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-brand">Unfinished work</p>
          <h2 id="recent-drafts-heading" className="mt-2 text-2xl font-medium tracking-[-0.045em] text-navy sm:text-3xl">Drafts needing attention</h2>
          <div className="mt-5 grid gap-px border border-border bg-border md:grid-cols-3">
            {data.recentDrafts.map((article) => (
              <article key={article.id} className="flex min-w-0 flex-col bg-surface p-5">
                <h3 className="text-lg font-medium tracking-[-0.025em] text-navy">{article.title}</h3>
                <p className="mt-3 font-mono text-[10px] leading-5 text-foreground-muted"><DateLabel label="Updated" timestamp={article.updatedAt} /></p>
                <Link href={`/admin/articles/${article.slug}/edit`} className="mt-6 inline-flex items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-brand hover:text-brand-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">Continue editing <ArrowUpRight className="size-3" aria-hidden="true" /></Link>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
