import "server-only";

import type { CreateArticleInput } from "@/lib/types/create-article";
import { AdminDashboardData } from "../types/admin-dashboard";

type CreateArticleRequestResult =
  | { success: true }
  | { success: false; error: string };

export async function createArticleRequest(
  article: CreateArticleInput,
  accessToken: string,
): Promise<CreateArticleRequestResult> {
  const apiUrl = process.env.API_URL;

  if (!apiUrl) {
    return {
      success: false,
      error: "Article publishing is not configured yet.",
    };
  }

  try {
    const response = await fetch(`${apiUrl}/admin/articles`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(article),
      cache: "no-store",
    });

    if (response.status === 401) {
      return {
        success: false,
        error: "Your session has expired. Please sign in again.",
      };
    }

    if (!response.ok) {
      return {
        success: false,
        error: "We couldn’t create the article. Please try again.",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Unable to create article:", error);

    return {
      success: false,
      error: "We couldn’t reach the server. Please try again.",
    };
  }
}

export type GetArticlesQuery = {
  page?: number;
  limit?: number;
  q?: string;
  topic?: string;
  status?: "all" | "draft" | "published";
  sort?: "updatedAt" | "createdAt" | "publishedAt" | "title";
  order?: "asc" | "desc";
};

export type AdminArticle = {
  id: number;
  title: string;
  slug: string;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type GetArticlesResponse = {
  data: AdminArticle[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type GetArticlesRequestResult =
  | {
      success: true;
      data: GetArticlesResponse;
      error?: never;
    }
  | {
      success: false;
      error: string;
      data?: never;
    };
export async function getArticlesRequest(
  accessToken: string,
  query: GetArticlesQuery = {},
): Promise<GetArticlesRequestResult> {
  const apiUrl = process.env.API_URL;

  if (!apiUrl) {
    return {
      success: false,
      error: "Missing API URL is not configured yet.",
    };
  }

  try {
    const baseUrl = apiUrl.endsWith("/") ? apiUrl : `${apiUrl}/`;
    const url = new URL("admin/articles", baseUrl);

    Object.entries(query).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        return;
      }

      if (typeof value === "string") {
        const normalizedValue = value.trim();

        if (!normalizedValue) {
          return;
        }

        url.searchParams.set(key, normalizedValue);
        return;
      }

      url.searchParams.set(key, String(value));
    });

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (response.status === 401) {
      return {
        success: false,
        error: "Your session has expired. Please sign in again.",
      };
    }

    if (response.status === 403) {
      return {
        success: false,
        error: "You don’t have permission to view these articles.",
      };
    }

    if (!response.ok) {
      return {
        success: false,
        error: "We couldn’t get the articles. Please try again.",
      };
    }

    const data = (await response.json()) as GetArticlesResponse;

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Unable to get articles:", error);

    return {
      success: false,
      error: "We couldn’t reach the server. Please try again.",
    };
  }
}
