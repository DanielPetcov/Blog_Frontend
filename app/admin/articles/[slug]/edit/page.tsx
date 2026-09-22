import { getArticleAction } from "@/actions/articles.actions";
import ArticleEditForm from "./ArticleEditForm";

type ArticlePageEditProps = {
  params: Promise<{ slug: string }>;
};

export default async function ArticlePageEdit({
  params,
}: ArticlePageEditProps) {
  const { slug } = await params;
  const result = await getArticleAction(slug);

  if (!result.success) {
    return <div>{result.error}</div>;
  }

  return <ArticleEditForm article={result.data} />;
}
