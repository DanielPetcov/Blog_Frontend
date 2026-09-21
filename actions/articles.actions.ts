"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import {
  createArticleRequest,
  GetArticlesQuery,
  getArticlesRequest,
  GetArticlesRequestResult,
} from "@/lib/api/articles";
import type { CreateArticleInput } from "@/lib/types/create-article";

export type CreateArticleActionResult =
  | { success: true }
  | { success: false; error: string };

function isValidArticleInput(input: CreateArticleInput) {
  return (
    input.title.trim().length >= 3 &&
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input.slug) &&
    input.content.length > 0
  );
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

export async function getArticlesAction(
  query?: GetArticlesQuery,
): Promise<GetArticlesRequestResult> {
  const accessToken = (await cookies()).get("access_token")?.value;

  if (!accessToken) {
    return {
      success: false,
      error: "Your session has expired. Please sign in again.",
    };
  }

  return getArticlesRequest(accessToken, query);
}
