export type Topic = {
  id: number;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
};

export type TopicWithArticleCount = Topic & { articleCount: number };

export type CreateTopicInput = Pick<Topic, "name" | "slug">;
export type UpdateTopicInput = Partial<CreateTopicInput>;
