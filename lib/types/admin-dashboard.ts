export interface AdminDashboardArticle {
  id: number;
  title: string;
  slug: string;
  published: boolean;
  publishedAt: string | null;
  updatedAt: string;
}

export interface AdminDashboardData {
  counts: {
    total: number;
    published: number;
    drafts: number;
  };
  recentArticles: AdminDashboardArticle[];
  recentDrafts: AdminDashboardArticle[];
}
