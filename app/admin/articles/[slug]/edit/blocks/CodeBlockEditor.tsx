import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { CodeBlock } from "@/lib/types/article/article-block.type";
import type { BlockEditorProps } from "./types";

export default function CodeBlockEditor({
  block,
  disabled,
  onChange,
}: BlockEditorProps<CodeBlock>) {
  return (
    <div className="grid gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 font-mono text-[10px] uppercase tracking-[0.1em] text-foreground-muted">
          Language
          <Input
            disabled={disabled}
            value={block.language}
            onChange={(event) =>
              onChange({ ...block, language: event.target.value })
            }
          />
        </label>
        <label className="grid gap-1 font-mono text-[10px] uppercase tracking-[0.1em] text-foreground-muted">
          Filename <span className="normal-case">(optional)</span>
          <Input
            disabled={disabled}
            value={block.filename ?? ""}
            onChange={(event) =>
              onChange({ ...block, filename: event.target.value || undefined })
            }
          />
        </label>
      </div>
      <label className="grid gap-1 font-mono text-[10px] uppercase tracking-[0.1em] text-foreground-muted">
        Code
        <Textarea
          className="min-h-48 font-mono"
          disabled={disabled}
          value={block.code}
          onChange={(event) => onChange({ ...block, code: event.target.value })}
        />
      </label>
    </div>
  );
}
