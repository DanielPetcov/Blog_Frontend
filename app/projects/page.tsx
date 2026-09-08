import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProjectsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Projects page</h1>
      <Link href="/">
        <Button>Go home</Button>
      </Link>
      <p>
        This is a page dedicated to showcasing my own projects that i have
        built.
      </p>
      <p>
        Theoretically here should be standalone projects that i made in my free
        time and projects related to some articles, if i will make longer type
        of tutorials
      </p>
    </div>
  );
}
