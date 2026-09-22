import ArticleCreateForm from "./ArticleCreateForm";
import { listAdminTopicsAction } from "@/actions/topics.actions";

export default async function ArticleNewPage() {
  const result = await listAdminTopicsAction();
  return <ArticleCreateForm topics={result.success ? result.data : []} />;
}
