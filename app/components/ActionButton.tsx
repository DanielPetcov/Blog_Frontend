import type { ReactNode } from "react";
import Link from "next/link";

import { cn } from "cn";

export default function ActionButton({
  className,
  children,
  href,
}: {
  className?: string;
  children: ReactNode;
  href?: string;
}) {
  const actionClassName =
    "inline-flex min-h-11 items-center justify-center gap-3 border border-brand bg-brand px-4 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand";

  if (href)
    return (
      <Link href={href} className={cn(actionClassName, className)}>
        {children}
      </Link>
    );

  return <button className={cn(actionClassName, className)}>{children}</button>;
}
