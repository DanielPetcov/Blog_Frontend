import { ArticleBlock } from "./article-block.type";
import { Topic } from "../topic";

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

export type ArticleSummary = ArticleBase & {
  published: boolean;
  topic: Topic | null;
};

export type ArticleListItem = ArticleSummary & {
  description: string | null;
};

export type Article = ArticleBase & {
  description: string | null;
  coverImage: string | null;
  content: ArticleBlock[];
  published: boolean;
  author: ArticleAuthor;
  topic: Topic | null;
};
