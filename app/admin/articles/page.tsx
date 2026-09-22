import AdminArticlesHeader from "./components/AdminArticlesHeader";
import AdminArticlesNavigation from "./components/AdminArticlesNavigation";
import AdminArticlesSide from "./components/AdminArticlesSide";
import AdminArticlesList from "./components/AdminArticlesList";
import AdminArticlesListTitle from "./components/AdminArticlesListTitle";
import { getArticlesAction } from "@/actions/articles.actions";
import {
  getRequestedPage,
  getPageCount,
  getCurrentPage,
  getPageArticles,
} from "@/lib/utils";

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

export default async function AdminArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const result = await getArticlesAction();

  if (!result.success) {
    return <div>something went wrong</div>;
  }

  const articles = result.data.data;

  const requestedPage = getRequestedPage((await searchParams).page);
  const pageCount = getPageCount(articles.length, articlesPerPage);
  const currentPage = getCurrentPage(requestedPage, pageCount);
  const pageArticles = getPageArticles(articles, currentPage, articlesPerPage);

  return (
    <div>
      <AdminArticlesHeader />

      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-16">
        <AdminArticlesSide topics={topics} />
        <section aria-labelledby="admin-article-list-heading">
          <AdminArticlesListTitle length={articles.length} />

          <AdminArticlesList articles={pageArticles} />

          <AdminArticlesNavigation
            currentPage={currentPage}
            pageCount={pageCount}
          />
        </section>
      </div>
    </div>
  );
}
