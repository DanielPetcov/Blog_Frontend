"use client";

import { useEffect, useId, useState } from "react";

export default function MermaidDiagram({ content }: { content: string }) {
  const reactId = useId();
  const diagramId = `diagram-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const [svg, setSvg] = useState<string>();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function renderDiagram() {
      try {
        const { default: mermaid } = await import("mermaid");

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: "base",
          fontFamily: "var(--font-geist-mono), monospace",
          flowchart: { htmlLabels: false },
          themeVariables: {
            background: "#faf7f2",
            primaryColor: "#e9e3ff",
            primaryTextColor: "#10233b",
            primaryBorderColor: "#7257e8",
            lineColor: "#10233b",
            secondaryColor: "#f3eee6",
            tertiaryColor: "#faf7f2",
          },
        });

        const result = await mermaid.render(diagramId, content);
        if (!cancelled) setSvg(result.svg);
      } catch {
        if (!cancelled) setHasError(true);
      }
    }

    void renderDiagram();
    return () => {
      cancelled = true;
    };
  }, [content, diagramId]);

  return (
    <figure className="my-10 overflow-x-auto border border-border bg-surface p-4 sm:my-14 sm:p-7">
      <figcaption className="mb-5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-brand">
        System diagram
      </figcaption>
      {hasError ? (
        <p className="font-mono text-xs leading-6 text-foreground-muted">
          This diagram could not be rendered.
        </p>
      ) : svg ? (
        <div
          className="min-w-136 [&_svg]:h-auto [&_svg]:max-w-none [&_svg]:overflow-visible"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <div
          className="h-40 animate-pulse bg-brand-soft/50"
          aria-label="Loading diagram"
        />
      )}
    </figure>
  );
}
