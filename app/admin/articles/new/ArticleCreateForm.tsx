"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, LoaderCircle, Send } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";

import { createArticleAction } from "@/actions/articles.actions";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { CreateArticleInput } from "@/lib/types/article/create-article.type";

type CreateArticleFormValues = {
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  body: string;
  published: boolean;
};

function createSlug(title: string) {
  return title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function ArticleCreateForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateArticleFormValues>({
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      coverImage: "",
      body: "",
      published: false,
    },
  });
  const onSubmit: SubmitHandler<CreateArticleFormValues> = async (values) => {
    clearErrors("root.server");

    const article: CreateArticleInput = {
      title: values.title.trim(),
      slug: values.slug.trim(),
      description: values.description.trim() || null,
      coverImage: values.coverImage.trim() || null,
      content: [{ type: "paragraph", text: values.body.trim() }],
      published: values.published,
    };
    const result = await createArticleAction(article);

    if (!result.success) {
      setError("root.server", { type: "server", message: result.error });
      return;
    }

    router.push("/admin");
  };

  return (
    <main className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
      <Link
        href="/admin"
        className="inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground-muted transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
      >
        <ArrowLeft className="size-3" aria-hidden="true" />
        Dashboard
      </Link>

      <header className="mt-8 border-b border-border pb-8">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-brand">
          New content
        </p>
        <h1 className="mt-3 text-4xl font-medium tracking-[-0.06em] text-navy sm:text-5xl">
          Create article
        </h1>
        <p className="mt-4 max-w-xl font-mono text-xs leading-6 text-foreground-muted">
          Start with the essentials. You can continue refining the article after
          it is saved.
        </p>
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
              placeholder="A clear, specific title"
              aria-invalid={Boolean(errors.title)}
              disabled={isSubmitting}
              {...register("title", {
                required: "Title is required.",
                minLength: {
                  value: 3,
                  message: "Title must be at least 3 characters.",
                },
                onBlur: (event) => {
                  if (!getValues("slug")) {
                    setValue("slug", createSlug(event.target.value), {
                      shouldValidate: true,
                    });
                  }
                },
              })}
            />
            {errors.title && <FieldError>{errors.title.message}</FieldError>}
          </Field>

          <Field data-invalid={Boolean(errors.slug)}>
            <FieldLabel htmlFor="article-slug">Slug</FieldLabel>
            <Input
              id="article-slug"
              placeholder="a-clear-specific-title"
              aria-invalid={Boolean(errors.slug)}
              disabled={isSubmitting}
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
              placeholder="A short summary for article lists and search previews."
              aria-invalid={Boolean(errors.description)}
              disabled={isSubmitting}
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
              placeholder="https://example.com/cover.jpg"
              aria-invalid={Boolean(errors.coverImage)}
              disabled={isSubmitting}
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
        </div>

        <div className="border border-border bg-surface p-5 sm:p-6">
          <Field data-invalid={Boolean(errors.body)}>
            <FieldLabel htmlFor="article-body">Article body</FieldLabel>
            <FieldDescription>
              This first version saves the body as a paragraph content block.
            </FieldDescription>
            <Textarea
              id="article-body"
              className="min-h-56"
              placeholder="Write the opening of your article..."
              aria-invalid={Boolean(errors.body)}
              disabled={isSubmitting}
              {...register("body", {
                required: "Article body is required.",
                validate: (value) =>
                  value.trim().length > 0 || "Article body is required.",
              })}
            />
            {errors.body && <FieldError>{errors.body.message}</FieldError>}
          </Field>
        </div>

        <label className="flex cursor-pointer items-start gap-3 border border-border bg-surface p-5 text-sm text-navy has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-brand">
          <input
            type="checkbox"
            className="mt-0.5 size-4 accent-brand"
            disabled={isSubmitting}
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
          <Link
            href="/admin"
            className="inline-flex min-h-10 items-center justify-center border border-border px-4 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-navy transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
          >
            Cancel
          </Link>
          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting ? (
              <LoaderCircle className="animate-spin" aria-hidden="true" />
            ) : (
              <Send aria-hidden="true" />
            )}
            {isSubmitting ? "Saving article..." : "Create article"}
          </Button>
        </div>
      </form>
    </main>
  );
}
