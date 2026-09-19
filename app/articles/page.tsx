import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import ArticleRow from "../components/ArticleRow";
import { type Article } from "@/lib/types/article";

type ArticleListItem = Article & { topic: string; readTime: number };

const articleSeeds = [
  ["Building a Message Broker From Scratch", "The boundaries, queues, and trade-offs behind a small but useful broker.", "System design", 12, "2026-08-24"],
  ["Cache Invalidation Without the Hand-Waving", "A practical model for freshness, invalidation, and acceptable stale data.", "Backend", 8, "2026-08-08"],
  ["Small Tools, Big Leverage", "Why focused developer tools often outlast ambitious platforms.", "Building", 6, "2026-07-18"],
  ["A Boring Deployment Pipeline", "The checks and constraints that make a release path predictable.", "DevOps", 9, "2026-07-02"],
  ["Where a Database Index Actually Helps", "A working mental model for indexes before reaching for optimization.", "Databases", 11, "2026-06-19"],
  ["The Cost of a Synchronous Request", "How one convenient call can quietly define your system's limits.", "Backend", 7, "2026-06-04"],
  ["Designing APIs for the Unhappy Path", "Error states are part of the contract, not a detail for later.", "System design", 10, "2026-05-21"],
  ["Keeping Side Projects Small Enough to Finish", "A few constraints for turning a weekend experiment into a shipped thing.", "Building", 5, "2026-05-08"],
  ["Reading Logs Like a Timeline", "A simple approach to tracing an incident without getting lost in noise.", "DevOps", 6, "2026-04-26"],
  ["When a Queue Is Better Than a Cron Job", "A comparison of scheduled work and event-driven work in a growing product.", "System design", 8, "2026-04-11"],
  ["The Useful Shape of a Repository", "How boundaries in a codebase make everyday changes less expensive.", "Architecture", 9, "2026-03-27"],
  ["Postgres Queries I Keep Rewriting", "A small collection of query patterns that appear in ordinary applications.", "Databases", 7, "2026-03-13"],
  ["Make the Slow Path Visible", "Performance work begins with an honest picture of what users wait for.", "Frontend", 6, "2026-02-28"],
  ["Notes on Idempotency", "Retries are inevitable; accidental duplicate work does not have to be.", "Backend", 10, "2026-02-12"],
  ["How I Scope a New Service", "Questions that turn an ambiguous service boundary into a useful one.", "Architecture", 8, "2026-01-29"],
  ["A Tiny CLI for Repetitive Work", "One small command-line tool that removed an irritating daily task.", "Building", 4, "2026-01-16"],
  ["The Difference Between Metrics and Answers", "Why collecting numbers is not the same as making a system observable.", "DevOps", 8, "2025-12-19"],
  ["Schemas Are Product Decisions", "A database schema tells the rest of the application what can exist.", "Databases", 9, "2025-12-05"],
  ["Useful Empty States", "The quiet interface states that make a new product easier to understand.", "Frontend", 5, "2025-11-21"],
  ["A Checklist for a New Integration", "The questions I ask before introducing another external dependency.", "System design", 7, "2025-11-07"],
] as const;

const articles: ArticleListItem[] = articleSeeds.map(
  ([title, description, topic, readTime, publishedAt], index) => ({
    id: index + 1,
    slug: index === 0 ? "building-a-message-broker-from-scratch" : `article-${index + 1}`,
    title,
    description,
    topic,
    readTime,
    coverImage: null,
    content: [],
    published: true,
    publishedAt: `${publishedAt}T09:00:00.000Z`,
    createdAt: `${publishedAt}T09:00:00.000Z`,
    updatedAt: `${publishedAt}T09:00:00.000Z`,
    author: { id: 1, name: "Daniel Petcov" },
  }),
);

const topics = ["All topics", "System design", "Backend", "Databases", "DevOps", "Architecture", "Frontend", "Building"];
const articlesPerPage = 10;

function pageHref(page: number) {
  return page === 1 ? "/articles" : `/articles?page=${page}`;
}

export default async function BlogListPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const requestedPage = Number.parseInt((await searchParams).page ?? "1", 10);
  const pageCount = Math.ceil(articles.length / articlesPerPage);
  const currentPage = Number.isFinite(requestedPage)
    ? Math.min(Math.max(requestedPage, 1), pageCount)
    : 1;
  const pageArticles = articles.slice((currentPage - 1) * articlesPerPage, currentPage * articlesPerPage);

  return (
    <div>
      <header className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-brand">Technical journal / archive</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-medium leading-[0.94] tracking-[-0.075em] text-navy sm:text-6xl lg:text-7xl">All articles.</h1>
          <p className="mt-7 max-w-xl font-mono text-xs leading-6 tracking-[0.025em] text-foreground-muted sm:text-sm">Notes on systems, engineering practice, and the small tools that make software easier to build.</p>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-16">
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <form role="search">
            <label htmlFor="article-search" className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-navy">Search archive</label>
            <div className="mt-3 flex border border-navy/20 bg-surface-elevated focus-within:border-brand">
              <input id="article-search" name="query" type="search" placeholder="Search notes" className="min-w-0 flex-1 bg-transparent px-3 py-3 font-mono text-xs text-navy outline-none placeholder:text-foreground-muted" />
              <button type="submit" className="grid w-10 place-items-center text-brand transition-colors hover:bg-brand hover:text-white" aria-label="Search articles"><Search className="size-4" /></button>
            </div>
          </form>

          <div className="mt-10">
            <h2 className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-navy">Browse topics</h2>
            <nav aria-label="Article topics" className="mt-3 border-b border-border">
              {topics.map((topic) => {
                const isAllTopics = topic === "All topics";
                const href = isAllTopics ? "/articles" : `/articles?topic=${encodeURIComponent(topic.toLowerCase())}`;

                return (
                  <Link key={topic} href={href} className="flex items-center justify-between border-t border-border py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-navy transition-[padding,background-color,color] hover:bg-brand-soft/50 hover:pl-2 hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
                    {topic}
                    {!isAllTopics && <span className="text-foreground-muted">↗</span>}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        <section aria-labelledby="article-list-heading">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-brand">Recent writing</p>
              <h2 id="article-list-heading" className="mt-3 text-3xl font-medium tracking-[-0.055em] text-navy sm:text-4xl">Latest from the archive</h2>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-foreground-muted">{articles.length} articles</p>
          </div>

          <div className="border-b border-border">
            {pageArticles.map((article) => (
              <ArticleRow key={article.id} id={article.id} slug={article.slug} title={article.title} description={article.description ?? ""} topic={article.topic} readTime={article.readTime} dateCreated={new Date(article.publishedAt ?? article.createdAt)} />
            ))}
          </div>

          <nav aria-label="Article pages" className="mt-10 flex items-center justify-between border-t border-border pt-5">
            {currentPage > 1 ? (
              <Link href={pageHref(currentPage - 1)} className="inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-navy transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"><ArrowLeft className="size-3" /> Previous</Link>
            ) : (
              <span className="inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground-muted/50"><ArrowLeft className="size-3" /> Previous</span>
            )}

            <div className="flex items-center gap-1" aria-label={`Page ${currentPage} of ${pageCount}`}>
              {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => (
                <Link key={page} href={pageHref(page)} aria-current={page === currentPage ? "page" : undefined} className={`grid size-8 place-items-center border font-mono text-[10px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand ${page === currentPage ? "border-brand bg-brand text-white" : "border-border text-navy hover:border-brand hover:text-brand"}`}>
                  {page}
                </Link>
              ))}
            </div>

            {currentPage < pageCount ? (
              <Link href={pageHref(currentPage + 1)} className="inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-navy transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">Next <ArrowRight className="size-3" /></Link>
            ) : (
              <span className="inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground-muted/50">Next <ArrowRight className="size-3" /></span>
            )}
          </nav>
        </section>
      </div>
    </div>
  );
}
