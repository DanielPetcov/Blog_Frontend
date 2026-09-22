import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { QuoteBlock } from "@/lib/types/article/article-block.type";
import type { BlockEditorProps } from "./types";

export default function QuoteBlockEditor({
  block,
  disabled,
  onChange,
}: BlockEditorProps<QuoteBlock>) {
  return (
    <div className="grid gap-3">
      <label className="grid gap-1 font-mono text-[10px] uppercase tracking-[0.1em] text-foreground-muted">
        Quote
        <Textarea
          disabled={disabled}
          value={block.text}
          onChange={(event) => onChange({ ...block, text: event.target.value })}
        />
      </label>
      <label className="grid gap-1 font-mono text-[10px] uppercase tracking-[0.1em] text-foreground-muted">
        Author <span className="normal-case">(optional)</span>
        <Input
          disabled={disabled}
          value={block.author ?? ""}
          onChange={(event) =>
            onChange({ ...block, author: event.target.value || undefined })
          }
        />
      </label>
    </div>
  );
}
