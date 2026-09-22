import type { DividerBlock } from "@/lib/types/article/article-block.type";
import type { BlockEditorProps } from "./types";

export default function DividerBlockEditor(_: BlockEditorProps<DividerBlock>) {
  return (
    <p className="border-y border-border py-4 font-mono text-[10px] uppercase tracking-[0.12em] text-foreground-muted">
      Horizontal divider
    </p>
  );
}
