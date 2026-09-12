import { Button } from "@/components/ui/button";
import Link from "next/link";

type Article = {
  id: string;
  title: string;
  body: string;
  dateCreated: string;
};

export default async function BlogListPage() {
  const response = await fetch("http://localhost:3001/article");
  const articles: Article[] = await response.json();

  return (
    <div>
      <h1 className="text-2xl font-semibold">Blog list page</h1>
      <p>here will be a list with all my posted articles</p>
      <Link href="/">
        <Button>Go back home</Button>
      </Link>

      <div>
        {articles.map((article) => (
          <div key={article.id} className="p-4 rounded-md bg-red-100">
            <div>title: {article.title}</div>
            <div>date created: {article.dateCreated}</div>

            <Link href={`/articles/${article.id}`}>Check the article</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
