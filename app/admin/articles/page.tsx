import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  FilePenLine,
  Plus,
  Search,
} from "lucide-react";
import Link from "next/link";
import AdminArticlesHeader from "./components/AdminArticlesHeader";
import AdminArticlesNavigation from "./components/AdminArticlesNavigation";

type AdminArticle = {
  id: number;
  title: string;
  slug: string;
  topic: string;
  published: boolean;
  publishedAt: string | null;
  updatedAt: string;
};

const articles: AdminArticle[] = [
  {
    id: 12,
    title: "A Practical Guide to Error Boundaries",
    slug: "a-practical-guide-to-error-boundaries",
    topic: "Frontend",
    published: false,
    publishedAt: null,
    updatedAt: "2026-09-18T14:25:00.000Z",
  },
  {
    id: 11,
    title: "Building a Message Broker From Scratch",
    slug: "building-a-message-broker-from-scratch",
    topic: "System design",
    published: true,
    publishedAt: "2026-09-12T09:00:00.000Z",
    updatedAt: "2026-09-16T11:40:00.000Z",
  },
  {
    id: 10,
    title: "Notes on Designing a Better CLI",
    slug: "notes-on-designing-a-better-cli",
    topic: "Building",
    published: false,
    publishedAt: null,
    updatedAt: "2026-09-14T08:15:00.000Z",
  },
  {
    id: 9,
    title: "Cache Invalidation Without the Hand-Waving",
    slug: "cache-invalidation-without-the-hand-waving",
    topic: "Backend",
    published: true,
    publishedAt: "2026-09-03T09:00:00.000Z",
    updatedAt: "2026-09-10T16:05:00.000Z",
  },
  {
    id: 8,
    title: "A Small Checklist for Release Days",
    slug: "a-small-checklist-for-release-days",
    topic: "DevOps",
    published: false,
    publishedAt: null,
    updatedAt: "2026-09-08T10:30:00.000Z",
  },
  {
    id: 7,
    title: "Where a Database Index Actually Helps",
    slug: "where-a-database-index-actually-helps",
    topic: "Databases",
    published: true,
    publishedAt: "2026-08-28T09:00:00.000Z",
    updatedAt: "2026-08-28T09:00:00.000Z",
  },
  {
    id: 6,
    title: "The Cost of a Synchronous Request",
    slug: "the-cost-of-a-synchronous-request",
    topic: "Backend",
    published: true,
    publishedAt: "2026-08-14T09:00:00.000Z",
    updatedAt: "2026-08-18T13:10:00.000Z",
  },
  {
    id: 5,
    title: "An Outline for a Better Incident Review",
    slug: "an-outline-for-a-better-incident-review",
    topic: "DevOps",
    published: false,
    publishedAt: null,
    updatedAt: "2026-08-11T08:00:00.000Z",
  },
  {
    id: 4,
    title: "Keeping Side Projects Small Enough to Finish",
    slug: "keeping-side-projects-small-enough-to-finish",
    topic: "Building",
    published: true,
    publishedAt: "2026-07-25T09:00:00.000Z",
    updatedAt: "2026-07-26T09:00:00.000Z",
  },
  {
    id: 3,
    title: "Reading Logs Like a Timeline",
    slug: "reading-logs-like-a-timeline",
    topic: "DevOps",
    published: true,
    publishedAt: "2026-07-12T09:00:00.000Z",
    updatedAt: "2026-07-14T15:30:00.000Z",
  },
  {
    id: 2,
    title: "The Useful Shape of a Repository",
    slug: "the-useful-shape-of-a-repository",
    topic: "Architecture",
    published: true,
    publishedAt: "2026-06-27T09:00:00.000Z",
    updatedAt: "2026-06-27T09:00:00.000Z",
  },
  {
    id: 1,
    title: "Useful Empty States",
    slug: "useful-empty-states",
    topic: "Frontend",
    published: false,
    publishedAt: null,
    updatedAt: "2026-06-16T10:15:00.000Z",
  },
];

const topics = [
  "All topics",
  "System design",
  "Backend",
  "Databases",
  "DevOps",
  "Architecture",
  "Frontend",
  "Building",
];
const articlesPerPage = 8;

function formatDate(timestamp: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(timestamp));
}

function pageHref(page: number) {
  return page === 1 ? "/admin/articles" : `/admin/articles?page=${page}`;
}

export default async function AdminArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const requestedPage = Number.parseInt((await searchParams).page ?? "1", 10);
  const pageCount = Math.ceil(articles.length / articlesPerPage);
  const currentPage = Number.isFinite(requestedPage)
    ? Math.min(Math.max(requestedPage, 1), pageCount)
    : 1;
  const pageArticles = articles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage,
  );

  return (
    <div>
      <AdminArticlesHeader />

      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-16">
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

        <section aria-labelledby="admin-article-list-heading">
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-brand">
                Archive
              </p>
              <h2
                id="admin-article-list-heading"
                className="mt-2 text-2xl font-medium tracking-[-0.045em] text-navy sm:text-3xl"
              >
                Manage articles
              </h2>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-foreground-muted">
              {articles.length} articles
            </p>
          </div>

          <div className="border-y border-border">
            {pageArticles.map((article) => (
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
                    <span className="text-brand">{article.topic}</span>
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
                      View{" "}
                      <ArrowUpRight className="size-3" aria-hidden="true" />
                    </Link>
                  ) : (
                    <span className="text-foreground-muted">Unpublished</span>
                  )}
                </div>
              </article>
            ))}
          </div>

          <AdminArticlesNavigation
            currentPage={currentPage}
            pageCount={pageCount}
          />
        </section>
      </div>
    </div>
  );
}
