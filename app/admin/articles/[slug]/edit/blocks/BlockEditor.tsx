import type { ArticleBlock } from "@/lib/types/article/article-block.type";
import CodeBlockEditor from "./CodeBlockEditor";
import DiagramBlockEditor from "./DiagramBlockEditor";
import DividerBlockEditor from "./DividerBlockEditor";
import HeadingBlockEditor from "./HeadingBlockEditor";
import ImageBlockEditor from "./ImageBlockEditor";
import ParagraphBlockEditor from "./ParagraphBlockEditor";
import QuoteBlockEditor from "./QuoteBlockEditor";

export default function BlockEditor({
  block,
  disabled,
  onChange,
}: {
  block: ArticleBlock;
  disabled?: boolean;
  onChange: (block: ArticleBlock) => void;
}) {
  switch (block.type) {
    case "paragraph":
      return (
        <ParagraphBlockEditor
          block={block}
          disabled={disabled}
          onChange={onChange}
        />
      );
    case "heading":
      return (
        <HeadingBlockEditor
          block={block}
          disabled={disabled}
          onChange={onChange}
        />
      );
    case "image":
      return (
        <ImageBlockEditor
          block={block}
          disabled={disabled}
          onChange={onChange}
        />
      );
    case "code":
      return (
        <CodeBlockEditor
          block={block}
          disabled={disabled}
          onChange={onChange}
        />
      );
    case "quote":
      return (
        <QuoteBlockEditor
          block={block}
          disabled={disabled}
          onChange={onChange}
        />
      );
    case "divider":
      return (
        <DividerBlockEditor
          block={block}
          disabled={disabled}
          onChange={onChange}
        />
      );
    case "diagram":
      return (
        <DiagramBlockEditor
          block={block}
          disabled={disabled}
          onChange={onChange}
        />
      );
  }
}
