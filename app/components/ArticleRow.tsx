import Link from "next/link";

import { ArrowUpRight } from "lucide-react";
import { ArticleDetail } from "@/lib/types/article/article.type";
import { formatDate } from "@/lib/utils";

export default function ArticleRow({
  id,
  slug,
  title,
  description,
  createdAt,
  // topic,
}: ArticleDetail) {
  const formatedDate = formatDate(createdAt);

  return (
    <Link
      href={`/articles/${slug}`}
      className="group grid grid-cols-[2.5rem_1fr_auto] gap-x-4 border-t border-border py-7 transition-[padding,background-color] hover:bg-brand-soft/50 hover:pl-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:grid-cols-[5.5rem_1fr_auto] sm:gap-x-6 sm:py-8"
    >
      <span className="pt-1 font-mono text-[10px] font-medium tracking-[0.14em] text-foreground-muted">
        {String(id).padStart(2, "0")}
      </span>

      <div className="min-w-0">
        {/* <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-brand">
          {topic}
        </p> */}
        <h2 className="max-w-3xl text-2xl font-medium leading-[1.02] tracking-[-0.045em] text-navy sm:text-3xl">
          {title}
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-foreground-muted sm:text-base">
          {description}
        </p>
        <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.1em] text-foreground-muted">
          <time dateTime={formatedDate}>{formatedDate}</time>
        </p>
      </div>

      <ArrowUpRight className="mt-1 size-5 text-navy transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
    </Link>
  );
}
