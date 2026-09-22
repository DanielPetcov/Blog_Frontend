import { Textarea } from "@/components/ui/textarea";
import type { DiagramBlock } from "@/lib/types/article/article-block.type";
import type { BlockEditorProps } from "./types";

export default function DiagramBlockEditor({
  block,
  disabled,
  onChange,
}: BlockEditorProps<DiagramBlock>) {
  return (
    <label className="grid gap-1 font-mono text-[10px] uppercase tracking-[0.1em] text-foreground-muted">
      Mermaid definition
      <Textarea
        className="min-h-48 font-mono"
        disabled={disabled}
        value={block.content}
        onChange={(event) =>
          onChange({ ...block, content: event.target.value })
        }
      />
    </label>
  );
}
