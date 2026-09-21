interface AdminArticlesListTitleProps {
  length: number;
}

export default function AdminArticlesListTitle({
  length,
}: AdminArticlesListTitleProps) {
  return (
    <div className="mb-7 flex items-end justify-between gap-4">
      <div>
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-brand">
          Archive
        </p>
        <h2
          id="admin-article-list-heading"
          className="mt-2 text-2xl font-medium tracking-[-0.045em] text-navy sm:text-3xl"
        >
          Manage articles
        </h2>
      </div>
      <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-foreground-muted">
        {length} articles
      </p>
    </div>
  );
}
