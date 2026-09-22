import { ArticleSummary } from "./article/article.type";

export type AdminDashboardArticle = ArticleSummary;

export interface AdminDashboardData {
  counts: {
    total: number;
    published: number;
    drafts: number;
  };
  recentArticles: AdminDashboardArticle[];
  recentDrafts: AdminDashboardArticle[];
}
