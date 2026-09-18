import Link from "next/link";

export interface ArticleRowProps {
  id: number;
  slug: string;
  title: string;
  description: string;
  topic: string;
  readTime: number;
  dateCreated: Date;
}

export default function ArticleRow({
  slug,
  title,
  description,
  topic,
  readTime,
  dateCreated,
}: ArticleRowProps) {
  return (
    <Link href={slug} className="max-w-xl space-y-4 block group">
      <h2 className="uppercase font-mono font-semibold text-xl max-w-lg group-hover:text-brand-hover transition-colors">
        {title}
      </h2>
      <div className="font-light max-w-md">{description}</div>
      <div className="uppercase font-mono font-extralight flex items-center justify-between text-xs max-w-md">
        <div>{topic}</div>
        <div>•</div>
        <div>{readTime} MIN READ</div>
        <div>•</div>
        <div>{dateCreated.toDateString()}</div>
      </div>
    </Link>
  );
}
