import "server-only";

import { serverApiRequest } from "./server-api-request";
import type { ApiResult } from "@/lib/types/api";
import type {
  CreateTopicInput,
  Topic,
  TopicWithArticleCount,
  UpdateTopicInput,
} from "@/lib/types/topic";

export function listPublicTopics(
  limit = 3,
): Promise<ApiResult<TopicWithArticleCount[]>> {
  return serverApiRequest<TopicWithArticleCount[]>({
    path: "topics",
    query: { limit },
    fallbackError: "Unable to load topics.",
  });
}

export function listAdminTopics(
  accessToken: string,
): Promise<ApiResult<TopicWithArticleCount[]>> {
  return serverApiRequest<TopicWithArticleCount[]>({
    path: "admin/topics",
    accessToken,
    fallbackError: "Unable to load topics.",
  });
}

export async function createAdminTopic(
  topic: CreateTopicInput,
  accessToken: string,
): Promise<ApiResult<Topic>> {
  return serverApiRequest<Topic>({
    path: "admin/topics",
    method: "POST",
    accessToken,
    body: topic,
    fallbackError: "Unable to create the topic.",
    statusErrors: { 409: "A topic with this slug already exists." },
  });
}

export function updateAdminTopic(
  slug: string,
  topic: UpdateTopicInput,
  accessToken: string,
): Promise<ApiResult<Topic>> {
  return serverApiRequest<Topic>({
    path: `admin/topics/${slug}`,
    method: "PATCH",
    accessToken,
    body: topic,
    fallbackError: "Unable to update the topic.",
    statusErrors: { 409: "A topic with this slug already exists." },
  });
}

export async function deleteAdminTopic(
  slug: string,
  accessToken: string,
): Promise<ApiResult<void>> {
  const result = await serverApiRequest<unknown>({
    path: `admin/topics/${slug}`,
    method: "DELETE",
    accessToken,
    fallbackError: "Unable to delete the topic.",
  });

  return result.success ? { success: true, data: undefined } : result;
}
