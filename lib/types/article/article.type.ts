import { ArticleBlock } from "./article-block.type";

export type ArticleBase = {
  id: number;
  title: string;
  slug: string;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ArticleAuthor = {
  id: number;
  name: string;
};

export type AdminArticleListItem = ArticleBase & {
  published: boolean;
};

export type ArticleDetail = ArticleBase & {
  description: string | null;
  coverImage: string | null;
  content: ArticleBlock[];
  published: boolean;
  author: ArticleAuthor;
};
