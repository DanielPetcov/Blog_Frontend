import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ArticleFooter() {
  return (
    <footer className="mt-20 border-t border-border pt-8 sm:mt-28">
      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-brand">
        End of note
      </p>
      <Link
        href="/articles"
        className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-navy underline decoration-brand underline-offset-8 transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
      >
        <ArrowLeft className="size-4" /> Back to all articles
      </Link>
    </footer>
  );
}
