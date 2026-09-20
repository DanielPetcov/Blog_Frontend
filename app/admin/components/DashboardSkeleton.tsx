function Skeleton({ className }: { className: string }) {
  return <div className={`animate-pulse bg-muted ${className}`} />;
}

export default function DashboardSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
      <Skeleton className="h-10 w-48" />
      <Skeleton className="mt-4 h-4 w-full max-w-md" />

      <div className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-3">
        {["total", "published", "drafts"].map((item) => (
          <div key={item} className="bg-surface p-5 sm:p-6">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="mt-4 h-9 w-12" />
          </div>
        ))}
      </div>

      <section className="mt-12" aria-label="Loading recent articles">
        <Skeleton className="h-7 w-44" />
        <div className="mt-5 border-y border-border">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex items-center justify-between gap-5 border-b border-border px-5 py-5 last:border-b-0">
              <div className="min-w-0 flex-1">
                <Skeleton className="h-5 w-3/5 max-w-sm" />
                <Skeleton className="mt-3 h-3 w-36" />
              </div>
              <Skeleton className="h-8 w-20" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
