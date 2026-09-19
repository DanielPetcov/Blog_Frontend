import { ArrowRight } from "lucide-react";
import Link from "next/link";

export interface TopicRowProps {
  slug: string;
  title: string;
  count: number;
}

export default function TopicRow({ slug, title, count }: TopicRowProps) {
  return (
    <Link
      href={`/articles?topic=${slug}`}
      className="group grid grid-cols-[1fr_auto_auto] items-center gap-4 border-t border-border py-4 font-mono text-[11px] uppercase tracking-[0.1em] transition-[padding,background-color] hover:bg-brand-soft/50 hover:pl-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
    >
      <span className="min-w-0 truncate text-navy">{title}</span>
      <span className="text-foreground-muted">{count} articles</span>
      <ArrowRight className="size-4 text-brand transition-transform group-hover:translate-x-1" />
    </Link>
  );
}
