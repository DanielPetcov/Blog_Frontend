import "server-only";

import type { CreateArticleInput } from "@/lib/types/create-article";

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
