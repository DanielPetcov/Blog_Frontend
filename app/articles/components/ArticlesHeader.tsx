export default function ArticlesHeader() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-brand">
          Technical journal / archive
        </p>
        <h1 className="mt-5 max-w-4xl text-5xl font-medium leading-[0.94] tracking-[-0.075em] text-navy sm:text-6xl lg:text-7xl">
          All articles.
        </h1>
        <p className="mt-7 max-w-xl font-mono text-xs leading-6 tracking-[0.025em] text-foreground-muted sm:text-sm">
          Notes on systems, engineering practice, and the small tools that make
          software easier to build.
        </p>
      </div>
    </header>
  );
}
