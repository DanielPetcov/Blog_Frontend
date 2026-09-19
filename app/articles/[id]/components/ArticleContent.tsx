import { type ArticleBlock } from "@/lib/types/article";
import CodeBlock from "./CodeBlock";
import MermaidDiagram from "./MermaidDiagram";

const headingStyles = {
  2: "mt-14 text-3xl font-medium leading-[1.02] tracking-[-0.05em] text-navy sm:mt-20 sm:text-4xl",
  3: "mt-11 text-2xl font-medium leading-tight tracking-[-0.04em] text-navy sm:mt-14 sm:text-3xl",
  4: "mt-9 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-navy",
};

function headingId(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function ArticleContent({
  content,
}: {
  content: ArticleBlock[];
}) {
  return (
    <div className="article-content">
      {content.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={index} className="mt-6 text-[1.05rem] leading-8 text-navy/85 sm:text-lg sm:leading-8">
                {block.text}
              </p>
            );

          case "heading": {
            const Heading = `h${block.level}` as "h2" | "h3" | "h4";

            return (
              <Heading key={index} id={headingId(block.text)} className={headingStyles[block.level]}>
                {block.text}
              </Heading>
            );
          }

          case "image":
            return (
              <figure key={index} className="my-10 border border-border bg-surface p-2 sm:my-14 sm:p-3">
                {/* The backend supplies image URLs; this remains intentionally unoptimized until its image policy is defined. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={block.src} alt={block.alt} className="w-full" />

                {block.caption && (
                  <figcaption className="px-1 pt-3 font-mono text-[10px] uppercase tracking-[0.1em] text-foreground-muted">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          case "code":
            return (
              <CodeBlock
                key={index}
                language={block.language}
                code={block.code}
                filename={block.filename}
              />
            );

          case "quote":
            return (
              <blockquote key={index} className="my-10 border-l-2 border-brand pl-6 sm:my-14 sm:pl-8">
                <p className="text-2xl font-medium leading-tight tracking-[-0.04em] text-navy sm:text-3xl">
                  “{block.text}”
                </p>
                {block.author && (
                  <footer className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">
                    — {block.author}
                  </footer>
                )}
              </blockquote>
            );

          case "divider":
            return <hr key={index} className="my-12 border-0 border-t border-border sm:my-16" />;

          case "diagram":
            return block.diagramType === "mermaid" ? (
              <MermaidDiagram key={index} content={block.content} />
            ) : null;

          default:
            return null;
        }
      })}
    </div>
  );
}
