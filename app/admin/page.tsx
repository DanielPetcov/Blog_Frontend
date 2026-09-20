import CreateArticle from "./components/CreateArticle";
import LogoutButton from "./components/LogoutButton";

export default async function AdminPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Admin Page</h1>
      <p>This page should be protected</p>

      <CreateArticle />

      <LogoutButton />
    </div>
  );
}
