import {
  GetArticlesResponse,
  GetArticleDetailedResponse,
  GetArticleResponse,
} from "../article-response.type";

export type CreateArticleActionResult =
  | { success: true; error?: never }
  | { success: false; error: string };

export type UpdateArticleActionResult = CreateArticleActionResult;

export type GetDetailedArticleActionResult =
  | {
      success: true;
      data: GetArticleDetailedResponse;
      error?: never;
    }
  | {
      success: false;
      error: string;
      data?: never;
    };

export type GetDetailedArticlesActionResult =
  | {
      success: true;
      data: GetArticleDetailedResponse[];
      error?: never;
    }
  | {
      success: false;
      error: string;
      data?: never;
    };

export type GetArticlesActionResult =
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

export type GetArticleActionResult =
  | {
      success: true;
      data: GetArticleResponse;
      error?: never;
    }
  | {
      success: false;
      error: string;
      data?: never;
    };
