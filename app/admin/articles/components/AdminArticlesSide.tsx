import { Search } from "lucide-react";

interface AdminArticlesSideProps {
  topics: string[];
}

export default function AdminArticlesSide({ topics }: AdminArticlesSideProps) {
  return (
    <aside className="lg:sticky lg:top-8 lg:self-start">
      <form role="search">
        <label
          htmlFor="admin-article-search"
          className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-navy"
        >
          Search articles
        </label>
        <div className="mt-3 flex border border-navy/20 bg-surface-elevated focus-within:border-brand">
          <input
            id="admin-article-search"
            type="search"
            placeholder="Search title or slug"
            className="min-w-0 flex-1 bg-transparent px-3 py-3 font-mono text-xs text-navy outline-none placeholder:text-foreground-muted"
          />
          <button
            type="button"
            className="grid w-10 place-items-center text-brand transition-colors hover:bg-brand hover:text-white"
            aria-label="Search articles"
          >
            <Search className="size-4" />
          </button>
        </div>
        <p className="mt-2 font-mono text-[9px] leading-4 text-foreground-muted">
          Search will be connected to the archive API.
        </p>
      </form>

      <div className="mt-10">
        <h2 className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-navy">
          Filter by topic
        </h2>
        <div
          className="mt-3 border-b border-border"
          aria-label="Article topic filters"
        >
          {topics.map((topic) => (
            <button
              key={topic}
              type="button"
              className="flex w-full items-center justify-between border-t border-border py-3 text-left font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-navy transition-[padding,background-color,color] hover:bg-brand-soft/50 hover:pl-2 hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            >
              {topic}
              {topic !== "All topics" && (
                <span className="text-foreground-muted">↗</span>
              )}
            </button>
          ))}
        </div>
        <p className="mt-2 font-mono text-[9px] leading-4 text-foreground-muted">
          Topic filtering is awaiting the archive API.
        </p>
      </div>
    </aside>
  );
}
