import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

function pageHref(page: number) {
  return page === 1 ? "/admin/articles" : `/admin/articles?page=${page}`;
}

interface AdminArticlesNavigationProps {
  currentPage: number;
  pageCount: number;
}

export default function AdminArticlesNavigation({
  currentPage,
  pageCount,
}: AdminArticlesNavigationProps) {
  return (
    <nav
      aria-label="Article pages"
      className="mt-10 flex items-center justify-between border-t border-border pt-5"
    >
      {currentPage > 1 ? (
        <Link
          href={pageHref(currentPage - 1)}
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
              href={pageHref(page)}
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
          href={pageHref(currentPage + 1)}
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
