interface CodeBlockProps {
  language: string;
  code: string;
  filename?: string;
}

export default function CodeBlock({
  language,
  code,
  filename,
}: CodeBlockProps) {
  return (
    <div className="overflow-hidden border border-navy/20 bg-navy text-surface">
      <div className="flex items-center justify-between border-b border-white/15 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.12em] text-brand-soft">
        <span>{filename ?? "snippet"}</span>
        <span>{language}</span>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-6 sm:p-5">
        <code>{code}</code>
      </pre>
    </div>
  );
}
