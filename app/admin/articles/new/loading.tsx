export default function Loading() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14" aria-label="Loading new article form">
      <div className="h-3 w-20 animate-pulse bg-muted" />
      <div className="mt-8 h-12 w-64 animate-pulse bg-muted" />
      <div className="mt-4 h-4 w-full max-w-xl animate-pulse bg-muted" />
      <div className="mt-8 space-y-7">
        <div className="space-y-5 border border-border bg-surface p-5 sm:p-6">
          {[1, 2, 3, 4].map((item) => <div key={item} className="space-y-2"><div className="h-3 w-24 animate-pulse bg-muted" /><div className="h-9 w-full animate-pulse bg-muted" /></div>)}
        </div>
        <div className="h-64 animate-pulse border border-border bg-surface" />
      </div>
    </main>
  );
}
