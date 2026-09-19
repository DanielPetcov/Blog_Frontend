import { codeToHtml } from "shiki";

interface CodeBlockProps {
  language: string;
  code: string;
  filename?: string;
}

const typescriptAliases = new Set(["ts", "typescript"]);

export default async function CodeBlock({
  language,
  code,
  filename,
}: CodeBlockProps) {
  const isTypeScript = typescriptAliases.has(language.toLowerCase());
  const highlightedCode = isTypeScript
    ? await codeToHtml(code, {
        lang: "typescript",
        theme: "github-light-default",
      })
    : null;

  return (
    <div className="my-10 overflow-hidden border border-navy/20 bg-surface sm:my-14">
      <div className="flex items-center justify-between border-b border-navy/20 bg-navy px-4 py-3 font-mono text-[10px] uppercase tracking-[0.12em] text-brand-soft">
        <span>{filename ?? "snippet"}</span>
        <span>{isTypeScript ? "TypeScript" : language}</span>
      </div>
      {highlightedCode ? (
        <div
          className="[&_pre]:m-0 [&_pre]:overflow-x-auto [&_pre]:p-4 [&_pre]:text-sm [&_pre]:leading-6 [&_pre]:sm:p-5"
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      ) : (
        <pre className="overflow-x-auto p-4 font-mono text-sm leading-6 text-navy sm:p-5">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}
