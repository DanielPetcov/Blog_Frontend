import { getPublicArticleAction } from "@/actions/articles.actions";
import ArticleContent from "./components/ArticleContent";
import ArticleFooter from "./components/ArticleFooter";
import ArticleHeader from "./components/ArticleHeader";

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  const result = await getPublicArticleAction(slug);

  if (!result.success) {
    return <div>{result.error}</div>;
  }

  const article = result.data;

  return (
    <article>
      <ArticleHeader
        article={article}
        // readingTime={getReadingTime(article.content)}
      />
      <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
        <ArticleContent content={article.content} />
        <ArticleFooter />
      </div>
    </article>
  );
}
