import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import { Article } from "@/lib/types/article/article.type";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export default function ArticleHeader({
  article,
  // readingTime,
}: {
  article: Article;
  // readingTime: number;
}) {
  const publishedDate = article.publishedAt ?? article.createdAt;

  return (
    <header className="border-b border-border">
      <div className="mx-auto max-w-3xl px-5 pb-14 pt-10 sm:px-8 sm:pb-20 sm:pt-14">
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-navy transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
        >
          <ArrowLeft className="size-3" /> All articles
        </Link>

        <div className="mt-14">
          <div className="flex items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-brand">
            <span>Entry / {String(article.id).padStart(2, "0")}</span>
            <span className="text-navy/30">—</span>
            <span>System design</span>
          </div>
          <h1 className="mt-5 text-5xl font-medium leading-[0.94] tracking-[-0.075em] text-navy sm:text-6xl lg:text-7xl">
            {article.title}
          </h1>
          {article.description && (
            <p className="mt-7 max-w-2xl text-lg leading-8 text-foreground-muted sm:text-xl">
              {article.description}
            </p>
          )}
          <div className="mt-9 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-[0.1em] text-foreground-muted">
            <span>By {article.author.name}</span>
            <span className="text-brand">/</span>
            <time dateTime={publishedDate}>{formatDate(publishedDate)}</time>
            {/* <span className="text-brand">/</span>
            <span>{readingTime} min read</span> */}
          </div>
        </div>
      </div>
    </header>
  );
}
