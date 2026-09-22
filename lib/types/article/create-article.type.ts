import { ArticleBlock } from "./article-block.type";

export interface CreateArticleInput {
  title: string;
  slug: string;
  description?: string | null;
  coverImage?: string | null;
  content: ArticleBlock[];
  published?: boolean;
}
