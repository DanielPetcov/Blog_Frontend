import "server-only";

import { serverApiRequest } from "@/lib/api/server-api-request";
import type {
  CreateArticleInput,
  UpdateArticleInput,
} from "@/lib/types/article/create-article.type";
import type {
  ArticleListQuery,
  PublicArticleListQuery,
} from "@/lib/types/article/article-query.type";
import type {
  ArticleResponse,
  ArticleListResponse,
} from "@/lib/types/article/article-response.type";
import type { ApiResult } from "@/lib/types/api";

export async function createAdminArticle(
  article: CreateArticleInput,
  accessToken: string,
): Promise<ApiResult<void>> {
  const result = await serverApiRequest<unknown>({
    path: "admin/articles",
    method: "POST",
    accessToken,
    body: article,
    fallbackError: "We couldn’t create the article. Please try again.",
    statusErrors: {
      400: "Please check the article fields and try again.",
      409: "An article with this slug already exists.",
    },
  });

  return result.success ? { success: true, data: undefined } : result;
}

export async function updateAdminArticle(
  slug: string,
  article: UpdateArticleInput,
  accessToken: string,
): Promise<ApiResult<void>> {
  const result = await serverApiRequest<unknown>({
    path: `admin/articles/${slug}`,
    method: "PATCH",
    accessToken,
    body: article,
    fallbackError: "We couldn’t update the article. Please try again.",
    statusErrors: {
      400: "Please check the article fields and try again.",
      409: "An article with this slug already exists.",
    },
  });

  return result.success ? { success: true, data: undefined } : result;
}

export function listPublicArticles(
  query: PublicArticleListQuery = {},
): Promise<ApiResult<ArticleListResponse>> {
  return serverApiRequest<ArticleListResponse>({
    path: "articles",
    method: "GET",
    query,
    fallbackError: "We couldn’t get the articles. Please try again.",
  });
}

export function getPublicArticle(slug: string): Promise<ApiResult<ArticleResponse>> {
  return serverApiRequest<ArticleResponse>({
    path: `articles/${slug}`,
    method: "GET",
    fallbackError: "We couldn’t get the articles. Please try again.",
  });
}

export function listAdminArticles(
  accessToken: string,
  query: ArticleListQuery = {},
): Promise<ApiResult<ArticleListResponse>> {
  return serverApiRequest<ArticleListResponse>({
    path: "admin/articles",
    method: "GET",
    accessToken,
    query,
    fallbackError: "We couldn’t get the articles. Please try again.",
  });
}

export function getAdminArticle(
  accessToken: string,
  slug: string,
): Promise<ApiResult<ArticleResponse>> {
  return serverApiRequest<ArticleResponse>({
    path: `admin/articles/${slug}`,
    method: "GET",
    accessToken,
    fallbackError: "We couldn’t get the article. Please try again.",
  });
}
