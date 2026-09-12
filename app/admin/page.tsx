import CreateArticle from "./components/CreateArticle";
import LogoutButton from "./components/LogoutButton";

type Article = {
  id: string;
  title: string;
  body: string;
  dateCreated: string;
};

export default async function AdminPage() {
  const response = await fetch("http://localhost:3001/article");
  const articles: Article[] = await response.json();

  return (
    <div>
      <h1 className="text-2xl font-semibold">Admin Page</h1>
      <p>This page should be protected</p>

      <p>total amount of articles: {articles.length}</p>

      <CreateArticle />

      <LogoutButton />
    </div>
  );
}
