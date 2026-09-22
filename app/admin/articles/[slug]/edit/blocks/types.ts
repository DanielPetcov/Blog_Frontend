import type { ArticleBlock } from "@/lib/types/article/article-block.type";

export type EditableBlock = {
  id: string;
  value: ArticleBlock;
};

export type BlockEditorProps<T extends ArticleBlock> = {
  block: T;
  disabled?: boolean;
  onChange: (block: T) => void;
};
