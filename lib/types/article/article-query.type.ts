export type ArticleListQuery = {
  page?: number;
  limit?: number;
  q?: string;
  topic?: string;
  status?: "all" | "draft" | "published";
  sort?: "updatedAt" | "createdAt" | "publishedAt" | "title";
  order?: "asc" | "desc";
};

export type PublicArticleListQuery = Omit<ArticleListQuery, "status">;
