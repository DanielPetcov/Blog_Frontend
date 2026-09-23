import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-border bg-surface">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 font-mono text-[10px] uppercase tracking-[0.1em] text-foreground-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© {currentYear} Daniel Petcov</p>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-navy">
          <Link
            href="https://github.com/DanielPetcov"
            target="_blank"
            className="transition-colors hover:text-brand"
          >
            Github ↗
          </Link>
          <Link
            href="https://www.linkedin.com/in/petcov-daniel-431052288"
            target="_blank"
            className="transition-colors hover:text-brand"
          >
            LinkedIn ↗
          </Link>
          <Link
            href="mailto:danielpetcov.work@gmail.com"
            target="_blank"
            className="transition-colors hover:text-brand"
          >
            Email ↗
          </Link>
        </div>
      </div>
    </footer>
  );
}
