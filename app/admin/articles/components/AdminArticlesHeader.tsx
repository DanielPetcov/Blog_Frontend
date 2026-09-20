import { Plus } from "lucide-react";
import Link from "next/link";

export default function AdminArticlesHeader() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-8 sm:py-14">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-brand">
            Administration / content
          </p>
          <h1 className="mt-3 text-4xl font-medium tracking-[-0.06em] text-navy sm:text-5xl">
            All articles
          </h1>
          <p className="mt-4 max-w-xl font-mono text-xs leading-6 text-foreground-muted">
            Review drafts, update published writing, and keep the archive in
            shape.
          </p>
        </div>
        <Link
          href="/admin/articles/new"
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 border border-brand bg-brand px-4 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
        >
          <Plus className="size-4" aria-hidden="true" />
          New article
        </Link>
      </div>
    </header>
  );
}
