import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ArticlesPagination({
  currentPage,
  pageCount,
  q,
  topic,
}: {
  currentPage: number;
  pageCount: number;
  q?: string;
  topic?: string;
}) {
  const getPageHref = (page: number) => {
    const searchParams = new URLSearchParams();

    if (q) {
      searchParams.set("q", q);
    }

    if (topic) {
      searchParams.set("topic", topic);
    }

    if (page > 1) {
      searchParams.set("page", String(page));
    }

    return searchParams.size ? `/articles?${searchParams}` : "/articles";
  };

  return (
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
  );
}
