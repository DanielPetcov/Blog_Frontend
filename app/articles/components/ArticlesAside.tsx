import { Search } from "lucide-react";
import Link from "next/link";
import type { TopicWithArticleCount } from "@/lib/types/topic";

type ArticlesAsideProps = {
  topics: TopicWithArticleCount[];
  searchQuery?: string;
  selectedTopic?: string;
};

function getArticlesHref({ q, topic }: { q?: string; topic?: string }) {
  const searchParams = new URLSearchParams();
  if (q) searchParams.set("q", q);
  if (topic) searchParams.set("topic", topic);

  return searchParams.size ? `/articles?${searchParams}` : "/articles";
}

export default function ArticlesAside({
  topics,
  searchQuery,
  selectedTopic,
}: ArticlesAsideProps) {
  return (
    <aside className="lg:sticky lg:top-8 lg:self-start">
      <form role="search">
        {selectedTopic && <input type="hidden" name="topic" value={selectedTopic} />}
        <label
          htmlFor="article-search"
          className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-navy"
        >
          Search archive
        </label>
        <div className="mt-3 flex border border-navy/20 bg-surface-elevated focus-within:border-brand">
          <input
            id="article-search"
            name="q"
            type="search"
            defaultValue={searchQuery}
            placeholder="Search notes"
            className="min-w-0 flex-1 bg-transparent px-3 py-3 font-mono text-xs text-navy outline-none placeholder:text-foreground-muted"
          />
          <button
            type="submit"
            className="grid w-10 place-items-center text-brand transition-colors hover:bg-brand hover:text-white"
            aria-label="Search articles"
          >
            <Search className="size-4" />
          </button>
        </div>
      </form>

      <div className="mt-10">
        <h2 className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-navy">
          Browse topics
        </h2>
        <nav
          aria-label="Article topics"
          className="mt-3 border-b border-border"
        >
          <Link
            href={getArticlesHref({ q: searchQuery })}
            aria-current={selectedTopic ? undefined : "page"}
            className="flex items-center justify-between border-t border-border py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-navy transition-[padding,background-color,color] hover:bg-brand-soft/50 hover:pl-2 hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
          >
            All topics
          </Link>
          {topics.map((topic) => (
            <Link
              key={topic.id}
              href={getArticlesHref({ q: searchQuery, topic: topic.slug })}
              aria-current={topic.slug === selectedTopic ? "page" : undefined}
              className={`flex items-center justify-between border-t border-border py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] transition-[padding,background-color,color] hover:bg-brand-soft/50 hover:pl-2 hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand ${topic.slug === selectedTopic ? "bg-brand-soft text-brand" : "text-navy"}`}
            >
              <span>{topic.name}</span>
              <span className="text-foreground-muted">{topic.articleCount}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
