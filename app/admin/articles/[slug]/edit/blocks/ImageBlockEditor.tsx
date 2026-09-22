import { Input } from "@/components/ui/input";
import type { ImageBlock } from "@/lib/types/article/article-block.type";
import type { BlockEditorProps } from "./types";

export default function ImageBlockEditor({
  block,
  disabled,
  onChange,
}: BlockEditorProps<ImageBlock>) {
  return (
    <div className="grid gap-3">
      <label className="grid gap-1 font-mono text-[10px] uppercase tracking-[0.1em] text-foreground-muted">
        Image URL
        <Input
          type="url"
          disabled={disabled}
          value={block.src}
          onChange={(event) => onChange({ ...block, src: event.target.value })}
        />
      </label>
      <label className="grid gap-1 font-mono text-[10px] uppercase tracking-[0.1em] text-foreground-muted">
        Alt text
        <Input
          disabled={disabled}
          value={block.alt}
          onChange={(event) => onChange({ ...block, alt: event.target.value })}
        />
      </label>
      <label className="grid gap-1 font-mono text-[10px] uppercase tracking-[0.1em] text-foreground-muted">
        Caption <span className="normal-case">(optional)</span>
        <Input
          disabled={disabled}
          value={block.caption ?? ""}
          onChange={(event) =>
            onChange({ ...block, caption: event.target.value || undefined })
          }
        />
      </label>
    </div>
  );
}
