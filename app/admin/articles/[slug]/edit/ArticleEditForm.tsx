"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  GripVertical,
  LoaderCircle,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";

import {
  deleteArticleAction,
  updateArticleAction,
} from "@/actions/articles.actions";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Article } from "@/lib/types/article/article.type";
import type { ArticleBlock } from "@/lib/types/article/article-block.type";
import type { CreateArticleInput } from "@/lib/types/article/create-article.type";
import type { TopicWithArticleCount } from "@/lib/types/topic";
import BlockEditor from "./blocks/BlockEditor";
import type { EditableBlock } from "./blocks/types";

type ArticleEditFormValues = {
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  topicSlug: string;
  published: boolean;
};

const BLOCK_LABELS: Record<ArticleBlock["type"], string> = {
  paragraph: "Paragraph",
  heading: "Heading",
  image: "Image",
  code: "Code",
  quote: "Quote",
  divider: "Divider",
  diagram: "Mermaid diagram",
};

function createBlock(type: ArticleBlock["type"]): ArticleBlock {
  switch (type) {
    case "paragraph":
      return { type, text: "" };
    case "heading":
      return { type, level: 2, text: "" };
    case "image":
      return { type, src: "", alt: "" };
    case "code":
      return { type, language: "typescript", code: "" };
    case "quote":
      return { type, text: "" };
    case "divider":
      return { type };
    case "diagram":
      return { type, diagramType: "mermaid", content: "" };
  }
}

function createEditableBlock(value: ArticleBlock): EditableBlock {
  return { id: crypto.randomUUID(), value };
}

export default function ArticleEditForm({
  article,
  topics,
}: {
  article: Article;
  topics: TopicWithArticleCount[];
}) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [blocks, setBlocks] = useState<EditableBlock[]>(() =>
    article.content.map(createEditableBlock),
  );
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(
    () => blocks[0]?.id ?? null,
  );
  const [newBlockType, setNewBlockType] =
    useState<ArticleBlock["type"]>("paragraph");
  const [draggedBlockId, setDraggedBlockId] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<ArticleEditFormValues>({
    defaultValues: {
      title: article.title,
      slug: article.slug,
      description: article.description ?? "",
      coverImage: article.coverImage ?? "",
      topicSlug: article.topic?.slug ?? "",
      published: article.published,
    },
  });

  const onSubmit: SubmitHandler<ArticleEditFormValues> = async (values) => {
    clearErrors("root.server");

    if (blocks.length === 0) {
      setError("root.server", {
        type: "server",
        message: "Add at least one content block.",
      });
      return;
    }

    const input: CreateArticleInput = {
      title: values.title.trim(),
      slug: values.slug.trim(),
      description: values.description.trim() || null,
      coverImage: values.coverImage.trim() || null,
      topicSlug: values.topicSlug.trim() || null,
      content: blocks.map(({ value }) => value),
      published: values.published,
    };
    const result = await updateArticleAction(article.slug, input);

    if (!result.success) {
      setError("root.server", { type: "server", message: result.error });
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  const selectedBlock = blocks.find((block) => block.id === selectedBlockId);
  const isBusy = isSubmitting || isDeleting;

  const updateBlock = (id: string, value: ArticleBlock) => {
    setBlocks((currentBlocks) =>
      currentBlocks.map((block) =>
        block.id === id ? { ...block, value } : block,
      ),
    );
  };

  const addBlock = () => {
    const block = createEditableBlock(createBlock(newBlockType));
    setBlocks((currentBlocks) => [...currentBlocks, block]);
    setSelectedBlockId(block.id);
  };

  const removeBlock = (id: string) => {
    const index = blocks.findIndex((block) => block.id === id);
    const nextBlocks = blocks.filter((block) => block.id !== id);
    setBlocks(nextBlocks);

    if (selectedBlockId === id) {
      setSelectedBlockId(nextBlocks[Math.max(0, index - 1)]?.id ?? null);
    }
  };

  const moveBlock = (sourceId: string, targetId: string) => {
    if (sourceId === targetId) return;

    setBlocks((currentBlocks) => {
      const sourceIndex = currentBlocks.findIndex(
        (block) => block.id === sourceId,
      );
      const targetIndex = currentBlocks.findIndex(
        (block) => block.id === targetId,
      );
      if (sourceIndex < 0 || targetIndex < 0) return currentBlocks;

      const nextBlocks = [...currentBlocks];
      const [movedBlock] = nextBlocks.splice(sourceIndex, 1);
      nextBlocks.splice(targetIndex, 0, movedBlock);
      return nextBlocks;
    });
  };

  const onDelete = async () => {
    if (!window.confirm(`Delete “${article.title}”? This cannot be undone.`)) {
      return;
    }

    clearErrors("root.server");
    setIsDeleting(true);
    const result = await deleteArticleAction(article.id);
    setIsDeleting(false);

    if (!result.success) {
      setError("root.server", { type: "server", message: result.error });
      return;
    }

    router.push("/admin/articles");
    router.refresh();
  };

  return (
    <main className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
      <Link
        href="/admin"
        className="inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground-muted transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
      >
        <ArrowLeft className="size-3" aria-hidden="true" /> Dashboard
      </Link>

      <header className="mt-8 border-b border-border pb-8">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-brand">
          Edit content
        </p>
        <h1 className="mt-3 text-4xl font-medium tracking-[-0.06em] text-navy sm:text-5xl">
          Edit article
        </h1>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 space-y-7"
        noValidate
      >
        <div className="space-y-5 border border-border bg-surface p-5 sm:p-6">
          <Field data-invalid={Boolean(errors.title)}>
            <FieldLabel htmlFor="article-title">Title</FieldLabel>
            <Input
              id="article-title"
              aria-invalid={Boolean(errors.title)}
              disabled={isSubmitting || isDeleting}
              {...register("title", {
                required: "Title is required.",
                minLength: {
                  value: 3,
                  message: "Title must be at least 3 characters.",
                },
              })}
            />
            {errors.title && <FieldError>{errors.title.message}</FieldError>}
          </Field>

          <Field data-invalid={Boolean(errors.slug)}>
            <FieldLabel htmlFor="article-slug">Slug</FieldLabel>
            <Input
              id="article-slug"
              aria-invalid={Boolean(errors.slug)}
              disabled={isSubmitting || isDeleting}
              {...register("slug", {
                required: "Slug is required.",
                minLength: {
                  value: 3,
                  message: "Slug must be at least 3 characters.",
                },
                pattern: {
                  value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                  message:
                    "Use lowercase letters, numbers, and single hyphens only.",
                },
              })}
            />
            <FieldDescription>
              The public URL will use this value.
            </FieldDescription>
            {errors.slug && <FieldError>{errors.slug.message}</FieldError>}
          </Field>

          <Field data-invalid={Boolean(errors.description)}>
            <FieldLabel htmlFor="article-description">
              Description{" "}
              <span className="font-normal text-muted-foreground">
                (optional)
              </span>
            </FieldLabel>
            <Textarea
              id="article-description"
              aria-invalid={Boolean(errors.description)}
              disabled={isSubmitting || isDeleting}
              {...register("description", {
                maxLength: {
                  value: 320,
                  message: "Description must be 320 characters or fewer.",
                },
              })}
            />
            {errors.description && (
              <FieldError>{errors.description.message}</FieldError>
            )}
          </Field>

          <Field data-invalid={Boolean(errors.coverImage)}>
            <FieldLabel htmlFor="article-cover-image">
              Cover image URL{" "}
              <span className="font-normal text-muted-foreground">
                (optional)
              </span>
            </FieldLabel>
            <Input
              id="article-cover-image"
              type="url"
              aria-invalid={Boolean(errors.coverImage)}
              disabled={isSubmitting || isDeleting}
              {...register("coverImage", {
                validate: (value) =>
                  !value ||
                  /^https?:\/\//i.test(value) ||
                  "Enter a full http:// or https:// URL.",
              })}
            />
            {errors.coverImage && (
              <FieldError>{errors.coverImage.message}</FieldError>
            )}
          </Field>

          <Field data-invalid={Boolean(errors.topicSlug)}>
            <FieldLabel htmlFor="article-topic">Topic</FieldLabel>
            <Input
              id="article-topic"
              list="article-topic-options"
              placeholder="system-design"
              aria-invalid={Boolean(errors.topicSlug)}
              disabled={isSubmitting || isDeleting}
              {...register("topicSlug", {
                pattern: {
                  value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                  message:
                    "Use lowercase letters, numbers, and single hyphens only.",
                },
              })}
            />
            <datalist id="article-topic-options">
              {topics.map((topic) => (
                <option key={topic.id} value={topic.slug}>
                  {topic.name}
                </option>
              ))}
            </datalist>
            <FieldDescription>
              Select an existing topic or enter a new lowercase slug.
            </FieldDescription>
            {errors.topicSlug && (
              <FieldError>{errors.topicSlug.message}</FieldError>
            )}
          </Field>
        </div>

        <section
          className="grid gap-5 border border-border bg-surface p-5 sm:p-6 lg:grid-cols-[13rem_minmax(0,1fr)]"
          aria-label="Article content blocks"
        >
          <aside className="border-b border-border pb-5 lg:sticky lg:top-6 lg:self-start lg:border-b-0 lg:border-r lg:pb-0 lg:pr-5">
            <div className="flex items-center justify-between">
              <h2 className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-navy">
                Blocks
              </h2>
              <span className="font-mono text-[10px] text-foreground-muted">
                {blocks.length}
              </span>
            </div>
            <p className="mt-2 font-mono text-[10px] leading-5 text-foreground-muted">
              Drag blocks to reorder them.
            </p>
            <ol className="mt-4 space-y-1">
              {blocks.map((block, index) => (
                <li
                  key={block.id}
                  draggable={!isBusy}
                  onDragStart={() => setDraggedBlockId(block.id)}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={() => {
                    if (draggedBlockId) moveBlock(draggedBlockId, block.id);
                    setDraggedBlockId(null);
                  }}
                  onDragEnd={() => setDraggedBlockId(null)}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedBlockId(block.id)}
                    className={`flex w-full items-center gap-2 border px-2 py-2 text-left font-mono text-[10px] uppercase tracking-[0.08em] transition-colors ${selectedBlockId === block.id ? "border-brand bg-brand-soft text-navy" : "border-transparent text-foreground-muted hover:border-border hover:text-navy"}`}
                  >
                    <GripVertical
                      className="size-3 shrink-0 cursor-grab"
                      aria-hidden="true"
                    />
                    <span className="text-brand">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="truncate">
                      {BLOCK_LABELS[block.value.type]}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
            <div className="mt-5 grid gap-2">
              <select
                value={newBlockType}
                disabled={isBusy}
                onChange={(event) =>
                  setNewBlockType(event.target.value as ArticleBlock["type"])
                }
                className="h-9 rounded-lg border border-input bg-transparent px-2 font-mono text-[10px] uppercase tracking-[0.08em] text-navy"
              >
                {Object.entries(BLOCK_LABELS).map(([type, label]) => (
                  <option key={type} value={type}>
                    {label}
                  </option>
                ))}
              </select>
              <Button
                type="button"
                variant="outline"
                onClick={addBlock}
                disabled={isBusy}
              >
                <Plus aria-hidden="true" /> Add block
              </Button>
            </div>
          </aside>

          <div className="min-w-0">
            {selectedBlock ? (
              <div>
                <div className="mb-4 flex items-center justify-between gap-4 border-b border-border pb-3">
                  <div>
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-brand">
                      Block{" "}
                      {String(
                        blocks.findIndex(
                          (block) => block.id === selectedBlock.id,
                        ) + 1,
                      ).padStart(2, "0")}
                    </p>
                    <h2 className="mt-1 text-xl font-medium tracking-[-0.03em] text-navy">
                      {BLOCK_LABELS[selectedBlock.value.type]}
                    </h2>
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeBlock(selectedBlock.id)}
                    disabled={isBusy}
                  >
                    <Trash2 aria-hidden="true" /> Remove
                  </Button>
                </div>
                <BlockEditor
                  block={selectedBlock.value}
                  disabled={isBusy}
                  onChange={(value) => updateBlock(selectedBlock.id, value)}
                />
              </div>
            ) : (
              <div className="grid min-h-48 place-items-center border border-dashed border-border p-6 text-center">
                <p className="font-mono text-xs text-foreground-muted">
                  Add a block to start writing.
                </p>
              </div>
            )}
          </div>
        </section>

        <label className="flex cursor-pointer items-start gap-3 border border-border bg-surface p-5 text-sm text-navy has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-brand">
          <input
            type="checkbox"
            className="mt-0.5 size-4 accent-brand"
            disabled={isSubmitting || isDeleting}
            {...register("published")}
          />
          <span>
            <span className="font-medium">Publish immediately</span>
            <span className="mt-1 block font-mono text-[10px] leading-5 text-foreground-muted">
              Leave this unchecked to save the article as a draft.
            </span>
          </span>
        </label>

        {errors.root?.server && (
          <FieldError>{errors.root.server.message}</FieldError>
        )}

        <div className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Button
            type="button"
            variant="destructive"
            onClick={onDelete}
            disabled={isSubmitting || isDeleting}
          >
            {isDeleting ? (
              <LoaderCircle className="animate-spin" aria-hidden="true" />
            ) : (
              <Trash2 aria-hidden="true" />
            )}
            {isDeleting ? "Deleting..." : "Delete article"}
          </Button>
          <Link
            href="/admin"
            className="inline-flex min-h-10 items-center justify-center border border-border px-4 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-navy transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
          >
            Cancel
          </Link>
          <Button type="submit" size="lg" disabled={isSubmitting || isDeleting}>
            {isSubmitting ? (
              <LoaderCircle className="animate-spin" aria-hidden="true" />
            ) : (
              <Save aria-hidden="true" />
            )}
            {isSubmitting ? "Saving changes..." : "Save changes"}
          </Button>
        </div>
      </form>
    </main>
  );
}
