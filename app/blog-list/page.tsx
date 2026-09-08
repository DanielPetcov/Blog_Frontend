import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BlogListPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Blog list page</h1>
      <p>here will be a list with all my posted articles</p>
      <Link href="/">
        <Button>Go back home</Button>
      </Link>
    </div>
  );
}
