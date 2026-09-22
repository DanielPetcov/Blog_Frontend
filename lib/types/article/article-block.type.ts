export type ArticleBlock =
  | ParagraphBlock
  | HeadingBlock
  | ImageBlock
  | CodeBlock
  | QuoteBlock
  | DividerBlock
  | DiagramBlock;

export interface ParagraphBlock {
  type: "paragraph";
  text: string;
}

export interface HeadingBlock {
  type: "heading";
  level: 2 | 3 | 4;
  text: string;
}

export interface ImageBlock {
  type: "image";
  src: string;
  alt: string;
  caption?: string;
}

export interface CodeBlock {
  type: "code";
  language: string;
  code: string;
  filename?: string;
}

export interface QuoteBlock {
  type: "quote";
  text: string;
  author?: string;
}

export interface DividerBlock {
  type: "divider";
}

export interface DiagramBlock {
  type: "diagram";
  diagramType: "mermaid";
  content: string;
}
