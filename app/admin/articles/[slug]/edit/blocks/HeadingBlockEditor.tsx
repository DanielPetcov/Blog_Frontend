import { Input } from "@/components/ui/input";
import type { HeadingBlock } from "@/lib/types/article/article-block.type";
import type { BlockEditorProps } from "./types";

export default function HeadingBlockEditor({
  block,
  disabled,
  onChange,
}: BlockEditorProps<HeadingBlock>) {
  return (
    <div className="grid gap-3 sm:grid-cols-[8rem_1fr]">
      <label className="grid gap-1 font-mono text-[10px] uppercase tracking-[0.1em] text-foreground-muted">
        Level
        <select
          className="h-8 rounded-lg border border-input bg-transparent px-2 text-sm text-navy"
          disabled={disabled}
          value={block.level}
          onChange={(event) =>
            onChange({
              ...block,
              level: Number(event.target.value) as HeadingBlock["level"],
            })
          }
        >
          <option value={2}>H2</option>
          <option value={3}>H3</option>
          <option value={4}>H4</option>
        </select>
      </label>
      <label className="grid gap-1 font-mono text-[10px] uppercase tracking-[0.1em] text-foreground-muted">
        Heading text
        <Input
          disabled={disabled}
          value={block.text}
          onChange={(event) => onChange({ ...block, text: event.target.value })}
        />
      </label>
    </div>
  );
}
