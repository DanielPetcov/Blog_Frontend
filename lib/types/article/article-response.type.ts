import { PaginatedResponse } from "../pagination.type";
import { Article, ArticleListItem } from "./article.type";

export type ArticleListResponse = PaginatedResponse<ArticleListItem>;
export type ArticleResponse = Article;
