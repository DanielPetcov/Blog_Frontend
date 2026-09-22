import "server-only";

import { serverApiRequest } from "@/lib/api/server-api-request";
import type { CreateArticleInput } from "@/lib/types/article/create-article.type";
import type { GetArticlesQuery } from "@/lib/types/article/article-query.type";
import type {
  GetArticleResponse,
  GetArticlesResponse,
  GetArticleDetailedResponse,
} from "@/lib/types/article/article-response.type";
import type {
  CreateArticleRequestResult,
  UpdateArticleRequestResult,
  GetArticleRequestResult,
  GetArticlesRequestResult,
  GetArticlesDetailedRequestResult,
  GetArticleDetailedRequestResult,
} from "@/lib/types/article/results/article-request-result.type";

export async function createArticleRequest(
  article: CreateArticleInput,
  accessToken: string,
): Promise<CreateArticleRequestResult> {
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

  if (!result.success) {
    return result;
  }

  return {
    success: true,
  };
}

export async function updateArticleRequest(
  slug: string,
  article: CreateArticleInput,
  accessToken: string,
): Promise<UpdateArticleRequestResult> {
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

  if (!result.success) {
    return result;
  }

  return { success: true };
}

export function getMainPageArticlesRequest(): Promise<GetArticlesDetailedRequestResult> {
  return serverApiRequest<GetArticleDetailedResponse[]>({
    path: "articles",
    method: "GET",
    fallbackError: "We couldn’t get the articles. Please try again.",
  });
}

export function getPublicArticleRequest(
  slug: string,
): Promise<GetArticleDetailedRequestResult> {
  return serverApiRequest<GetArticleDetailedResponse>({
    path: `articles/${slug}`,
    method: "GET",
    fallbackError: "We couldn’t get the articles. Please try again.",
  });
}

export function getArticlesRequest(
  accessToken: string,
  query: GetArticlesQuery = {},
): Promise<GetArticlesRequestResult> {
  return serverApiRequest<GetArticlesResponse>({
    path: "admin/articles",
    method: "GET",
    accessToken,
    query,
    fallbackError: "We couldn’t get the articles. Please try again.",
  });
}

export function getArticleRequest(
  accessToken: string,
  slug: string,
): Promise<GetArticleRequestResult> {
  return serverApiRequest<GetArticleResponse>({
    path: `admin/articles/${slug}`,
    method: "GET",
    accessToken,
    fallbackError: "We couldn’t get the article. Please try again.",
  });
}
