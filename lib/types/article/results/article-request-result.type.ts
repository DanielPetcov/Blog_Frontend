import {
  GetArticlesResponse,
  GetArticleResponse,
  GetArticleDetailedResponse,
} from "../article-response.type";

export type CreateArticleRequestResult =
  | { success: true; error?: never }
  | { success: false; error: string };

export type UpdateArticleRequestResult = CreateArticleRequestResult;

export type GetArticleDetailedRequestResult =
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

export type GetArticlesDetailedRequestResult =
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

export type GetArticleRequestResult =
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
