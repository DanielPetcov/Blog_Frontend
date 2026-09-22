import { getAdminArticleAction } from "@/actions/articles.actions";
import { listAdminTopicsAction } from "@/actions/topics.actions";
import ArticleEditForm from "./ArticleEditForm";

type ArticlePageEditProps = {
  params: Promise<{ slug: string }>;
};

export default async function ArticlePageEdit({
  params,
}: ArticlePageEditProps) {
  const { slug } = await params;
  const [result, topicsResult] = await Promise.all([
    getAdminArticleAction(slug),
    listAdminTopicsAction(),
  ]);

  if (!result.success) {
    return <div>{result.error}</div>;
  }

  return (
    <ArticleEditForm
      article={result.data}
      topics={topicsResult.success ? topicsResult.data : []}
    />
  );
}
