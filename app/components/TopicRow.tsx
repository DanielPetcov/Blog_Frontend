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
      className="flex items-center justify-between max-w-sm gap-20 text-sm hover:text-brand transition-colors"
    >
      <div className="capitalize overflow-hidden text-ellipsis">{title}</div>
      <div className="flex items-center gap-2 text-nowrap">
        {count} articles <ArrowRight className="size-4" />
      </div>
    </Link>
  );
}
