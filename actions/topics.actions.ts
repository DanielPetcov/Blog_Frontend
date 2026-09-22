"use server";

import { revalidatePath } from "next/cache";
import {
  createAdminTopic,
  deleteAdminTopic,
  listAdminTopics,
  listPublicTopics,
  updateAdminTopic,
} from "@/lib/api/topics";
import type { ApiResult } from "@/lib/types/api";
import type {
  CreateTopicInput,
  Topic,
  TopicWithArticleCount,
  UpdateTopicInput,
} from "@/lib/types/topic";
import { getAccessToken, sessionExpiredResult } from "./action-auth";

export async function listPublicTopicsAction(
  limit = 3,
): Promise<ApiResult<TopicWithArticleCount[]>> {
  return await listPublicTopics(limit);
}

export async function listAdminTopicsAction(): Promise<
  ApiResult<TopicWithArticleCount[]>
> {
  const accessToken = await getAccessToken();
  return accessToken ? listAdminTopics(accessToken) : sessionExpiredResult();
}

export async function createTopicAction(
  input: CreateTopicInput,
): Promise<ApiResult<Topic>> {
  const accessToken = await getAccessToken();
  if (!accessToken) return sessionExpiredResult();

  const result = await createAdminTopic(input, accessToken);
  if (result.success) {
    revalidatePath("/");
    revalidatePath("/articles");
  }
  return result;
}

export async function updateTopicAction(
  slug: string,
  input: UpdateTopicInput,
): Promise<ApiResult<Topic>> {
  const accessToken = await getAccessToken();
  if (!accessToken) return sessionExpiredResult();

  const result = await updateAdminTopic(slug, input, accessToken);
  if (result.success) {
    revalidatePath("/");
    revalidatePath("/articles");
  }
  return result;
}

export async function deleteTopicAction(slug: string): Promise<ApiResult<void>> {
  const accessToken = await getAccessToken();
  if (!accessToken) return sessionExpiredResult();

  const result = await deleteAdminTopic(slug, accessToken);
  if (result.success) {
    revalidatePath("/");
    revalidatePath("/articles");
  }
  return result;
}
