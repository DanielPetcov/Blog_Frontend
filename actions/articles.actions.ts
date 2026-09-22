"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import type { GetArticlesQuery } from "@/lib/types/article/article-query.type";
import type { CreateArticleInput } from "@/lib/types/article/create-article.type";
import type {
  CreateArticleActionResult,
  UpdateArticleActionResult,
  GetArticlesActionResult,
  GetArticleActionResult,
  GetDetailedArticlesActionResult,
  GetDetailedArticleActionResult,
} from "@/lib/types/article/results/article-action-result.type";

import {
  createArticleRequest,
  updateArticleRequest,
  getArticleRequest,
  getArticlesRequest,
  getMainPageArticlesRequest,
  getPublicArticleRequest,
} from "@/lib/api/articles";

function isValidArticleInput(input: CreateArticleInput) {
  return (
    input.title.trim().length >= 3 &&
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input.slug) &&
    input.content.length > 0
  );
}

export async function getMainPageArticlesAction(): Promise<GetDetailedArticlesActionResult> {
  return getMainPageArticlesRequest();
}

export async function getPublicArticleAction(
  slug: string,
): Promise<GetDetailedArticleActionResult> {
  return getPublicArticleRequest(slug);
}

export async function getArticleAction(
  slug: string,
): Promise<GetArticleActionResult> {
  const accessToken = (await cookies()).get("access_token")?.value;

  if (!accessToken) {
    return {
      success: false,
      error: "Your session has expired. Please sign in again.",
    };
  }

  return getArticleRequest(accessToken, slug);
}

export async function getArticlesAction(
  query?: GetArticlesQuery,
): Promise<GetArticlesActionResult> {
  const accessToken = (await cookies()).get("access_token")?.value;

  if (!accessToken) {
    return {
      success: false,
      error: "Your session has expired. Please sign in again.",
    };
  }

  return getArticlesRequest(accessToken, query);
}

export async function createArticleAction(
  input: CreateArticleInput,
): Promise<CreateArticleActionResult> {
  if (!isValidArticleInput(input)) {
    return {
      success: false,
      error: "Please check the article details and try again.",
    };
  }

  const accessToken = (await cookies()).get("access_token")?.value;

  if (!accessToken) {
    return {
      success: false,
      error: "Your session has expired. Please sign in again.",
    };
  }

  const result = await createArticleRequest(input, accessToken);

  if (result.success) {
    revalidatePath("/admin");
  }

  return result;
}

export async function updateArticleAction(
  slug: string,
  input: CreateArticleInput,
): Promise<UpdateArticleActionResult> {
  if (!isValidArticleInput(input)) {
    return {
      success: false,
      error: "Please check the article details and try again.",
    };
  }

  const accessToken = (await cookies()).get("access_token")?.value;

  if (!accessToken) {
    return {
      success: false,
      error: "Your session has expired. Please sign in again.",
    };
  }

  const result = await updateArticleRequest(slug, input, accessToken);

  if (result.success) {
    revalidatePath("/admin");
    revalidatePath(`/admin/articles/${slug}/edit`);
    revalidatePath(`/articles/${slug}`);
    if (slug !== input.slug) {
      revalidatePath(`/articles/${input.slug}`);
    }
  }

  return result;
}
