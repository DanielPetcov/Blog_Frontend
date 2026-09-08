import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-semibold">Nice to meet you to my blog 👋</h1>
      <Link href="/blog-list">
        <Button>Blog list</Button>
      </Link>
      <Link href="/projects">
        <Button>Projects</Button>
      </Link>
    </div>
  );
}
