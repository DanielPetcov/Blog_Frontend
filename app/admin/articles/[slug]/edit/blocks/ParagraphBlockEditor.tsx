import { Textarea } from "@/components/ui/textarea";
import type { ParagraphBlock } from "@/lib/types/article/article-block.type";
import type { BlockEditorProps } from "./types";

export default function ParagraphBlockEditor({
  block,
  disabled,
  onChange,
}: BlockEditorProps<ParagraphBlock>) {
  return (
    <Textarea
      aria-label="Paragraph text"
      className="min-h-36"
      disabled={disabled}
      value={block.text}
      onChange={(event) => onChange({ ...block, text: event.target.value })}
    />
  );
}
