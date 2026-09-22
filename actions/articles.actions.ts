"use server";

import { revalidatePath } from "next/cache";

import type {
  ArticleListQuery,
  PublicArticleListQuery,
} from "@/lib/types/article/article-query.type";
import type {
  CreateArticleInput,
  UpdateArticleInput,
} from "@/lib/types/article/create-article.type";
import type {
  ArticleListResponse,
  ArticleResponse,
} from "@/lib/types/article/article-response.type";
import type { ApiResult } from "@/lib/types/api";
import { getAccessToken, sessionExpiredResult } from "./action-auth";

import {
  createAdminArticle,
  getAdminArticle,
  getPublicArticle,
  listAdminArticles,
  listPublicArticles,
  updateAdminArticle,
} from "@/lib/api/articles";

function isValidCreateArticleInput(input: CreateArticleInput) {
  return (
    input.title.trim().length >= 3 &&
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input.slug) &&
    input.content.length > 0
  );
}

function isValidUpdateArticleInput(input: UpdateArticleInput) {
  return (
    Object.keys(input).length > 0 &&
    (input.title === undefined || input.title.trim().length >= 3) &&
    (input.slug === undefined ||
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input.slug)) &&
    (input.content === undefined || input.content.length > 0)
  );
}

export async function listPublicArticlesAction(
  query: PublicArticleListQuery = {},
): Promise<ApiResult<ArticleListResponse>> {
  return await listPublicArticles(query);
}

export async function getPublicArticleAction(
  slug: string,
): Promise<ApiResult<ArticleResponse>> {
  return await getPublicArticle(slug);
}

export async function getAdminArticleAction(
  slug: string,
): Promise<ApiResult<ArticleResponse>> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return sessionExpiredResult();
  }

  return getAdminArticle(accessToken, slug);
}

export async function listAdminArticlesAction(
  query: ArticleListQuery = {},
): Promise<ApiResult<ArticleListResponse>> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return sessionExpiredResult();
  }

  return listAdminArticles(accessToken, query);
}

export async function createArticleAction(
  input: CreateArticleInput,
): Promise<ApiResult<void>> {
  if (!isValidCreateArticleInput(input)) {
    return {
      success: false,
      error: "Please check the article details and try again.",
    };
  }

  const accessToken = await getAccessToken();

  if (!accessToken) {
    return sessionExpiredResult();
  }

  const result = await createAdminArticle(input, accessToken);

  if (result.success) {
    revalidatePath("/admin");
  }

  return result;
}

export async function updateArticleAction(
  slug: string,
  input: UpdateArticleInput,
): Promise<ApiResult<void>> {
  if (!isValidUpdateArticleInput(input)) {
    return {
      success: false,
      error: "Please check the article details and try again.",
    };
  }

  const accessToken = await getAccessToken();

  if (!accessToken) {
    return sessionExpiredResult();
  }

  const result = await updateAdminArticle(slug, input, accessToken);

  if (result.success) {
    revalidatePath("/admin");
    revalidatePath(`/admin/articles/${slug}/edit`);
    revalidatePath(`/articles/${slug}`);
    if (input.slug && slug !== input.slug) {
      revalidatePath(`/articles/${input.slug}`);
    }
  }

  return result;
}
