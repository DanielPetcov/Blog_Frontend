import { ArrowDown, ArrowRight } from "lucide-react";
import ArticleRow from "./components/ArticleRow";
import ActionButton from "./components/ActionButton";
import TopicRow, { TopicRowProps } from "./components/TopicRow";
import { listPublicArticlesAction } from "@/actions/articles.actions";
import { listPublicTopicsAction } from "@/actions/topics.actions";

export default async function Home() {
  const [articlesResponse, topicsResponse] = await Promise.all([
    listPublicArticlesAction({ limit: 3 }),
    listPublicTopicsAction(3),
  ]);
  const articles = articlesResponse.success ? articlesResponse.data.data : [];
  const topics: TopicRowProps[] = topicsResponse.success
    ? topicsResponse.data.map((topic) => ({
        slug: topic.slug,
        title: topic.name,
        count: topic.articleCount,
      }))
    : [];

  console.log(topics);

  return (
    <div>
      <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-24 pt-16 sm:px-8 sm:pb-32 sm:pt-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
        <div>
          <p className="mb-7 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-brand">
            Daniel Petcov / Software notes
          </p>
          <h1 className="max-w-4xl text-5xl font-medium leading-[0.94] tracking-[-0.075em] text-navy sm:text-6xl lg:text-7xl">
            Thoughts on software, systems{" "}
            <span className="text-brand">&amp;</span> building things.
          </h1>
          <p className="mt-8 max-w-xl font-mono text-xs leading-6 tracking-[0.025em] text-foreground-muted sm:text-sm">
            Notes on backend and frontend development, system design, DevOps,
            and the small experiments that teach me how software works.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <ActionButton href="/articles">
              Explore articles <ArrowRight className="size-4" />
            </ActionButton>
            <a
              href="#latest"
              className="inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-navy underline decoration-brand underline-offset-8 transition-colors hover:text-brand"
            >
              Latest notes <ArrowDown className="size-3" />
            </a>
          </div>
        </div>

        {/* <div
          aria-hidden="true"
          className="relative aspect-square max-h-[430px] border border-navy/20 bg-surface"
        >
          <div className="absolute inset-0 bg-[linear-gradient(rgba(16,35,59,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(16,35,59,0.09)_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute left-[12%] top-[14%] size-[23%] border-[10px] border-brand" />
          <div className="absolute bottom-[13%] right-[11%] h-[29%] w-[42%] bg-brand" />
          <div className="absolute bottom-[27%] right-[32%] h-[13%] w-[13%] border-[8px] border-navy bg-background" />
          <div className="absolute left-[22%] top-[55%] h-px w-[53%] -rotate-[28deg] bg-navy" />
          <p className="absolute bottom-4 left-4 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-navy">
            System / 001
          </p>
        </div> */}
      </section>

      <section id="latest" className="border-y border-border bg-surface/70">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="mb-10 flex items-end justify-between gap-5">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-brand">
                Writing
              </p>
              <h2 className="mt-3 text-3xl font-medium tracking-[-0.055em] text-navy sm:text-4xl">
                Latest notes
              </h2>
            </div>
          </div>
          <div className="border-b border-border">
            {articles.map((article) => (
              <ArticleRow key={article.id} {...article} />
            ))}
          </div>
          <ActionButton href="/articles" className="mt-8">
            All articles <ArrowRight className="size-4" />
          </ActionButton>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[0.65fr_1fr] lg:gap-20">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-brand">
            Index
          </p>
          <h2 className="mt-3 text-3xl font-medium tracking-[-0.055em] text-navy sm:text-4xl">
            Explore by topic.
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-6 text-foreground-muted">
            A growing index of the systems and tools I keep returning to.
          </p>
        </div>
        <div className="border-b border-border">
          {topics.map((topic) => (
            <TopicRow key={topic.slug} {...topic} />
          ))}
        </div>
      </section>
    </div>
  );
}
