import { PaginatedResponse } from "../pagination.type";
import { AdminArticleListItem, ArticleDetail } from "./article.type";

export type GetArticlesResponse = PaginatedResponse<AdminArticleListItem>;
export type GetArticleDetailedResponse = ArticleDetail;
export type GetArticleResponse = ArticleDetail;
