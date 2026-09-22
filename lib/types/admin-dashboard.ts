import { AdminArticleListItem } from "./article/article.type";

export interface AdminDashboardData {
  counts: {
    total: number;
    published: number;
    drafts: number;
  };
  recentArticles: AdminArticleListItem[];
  recentDrafts: AdminArticleListItem[];
}
