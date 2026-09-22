"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, LoaderCircle, Save } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";

import { updateArticleAction } from "@/actions/articles.actions";
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
import type { CreateArticleInput } from "@/lib/types/article/create-article.type";

type ArticleEditFormValues = {
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  body: string;
  published: boolean;
};

function getEditableBody(article: Article) {
  return article.content
    .filter((block) => block.type === "paragraph")
    .map((block) => block.text)
    .join("\n\n");
}

export default function ArticleEditForm({ article }: { article: Article }) {
  const router = useRouter();
  const originalBody = getEditableBody(article);
  const hasEditableParagraphs = article.content.some(
    (block) => block.type === "paragraph",
  );
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
      body: originalBody,
      published: article.published,
    },
  });

  const onSubmit: SubmitHandler<ArticleEditFormValues> = async (values) => {
    clearErrors("root.server");

    const body = values.body.trim();
    const input: CreateArticleInput = {
      title: values.title.trim(),
      slug: values.slug.trim(),
      description: values.description.trim() || null,
      coverImage: values.coverImage.trim() || null,
      // Preserve rich blocks when only article metadata is changed.
      content:
        body === originalBody
          ? article.content
          : [{ type: "paragraph", text: body }],
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

  return (
    <main className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
      <Link href="/admin" className="inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground-muted transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
        <ArrowLeft className="size-3" aria-hidden="true" /> Dashboard
      </Link>

      <header className="mt-8 border-b border-border pb-8">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-brand">Edit content</p>
        <h1 className="mt-3 text-4xl font-medium tracking-[-0.06em] text-navy sm:text-5xl">Edit article</h1>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-7" noValidate>
        <div className="space-y-5 border border-border bg-surface p-5 sm:p-6">
          <Field data-invalid={Boolean(errors.title)}>
            <FieldLabel htmlFor="article-title">Title</FieldLabel>
            <Input id="article-title" aria-invalid={Boolean(errors.title)} disabled={isSubmitting} {...register("title", { required: "Title is required.", minLength: { value: 3, message: "Title must be at least 3 characters." } })} />
            {errors.title && <FieldError>{errors.title.message}</FieldError>}
          </Field>

          <Field data-invalid={Boolean(errors.slug)}>
            <FieldLabel htmlFor="article-slug">Slug</FieldLabel>
            <Input id="article-slug" aria-invalid={Boolean(errors.slug)} disabled={isSubmitting} {...register("slug", { required: "Slug is required.", minLength: { value: 3, message: "Slug must be at least 3 characters." }, pattern: { value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/, message: "Use lowercase letters, numbers, and single hyphens only." } })} />
            <FieldDescription>The public URL will use this value.</FieldDescription>
            {errors.slug && <FieldError>{errors.slug.message}</FieldError>}
          </Field>

          <Field data-invalid={Boolean(errors.description)}>
            <FieldLabel htmlFor="article-description">Description <span className="font-normal text-muted-foreground">(optional)</span></FieldLabel>
            <Textarea id="article-description" aria-invalid={Boolean(errors.description)} disabled={isSubmitting} {...register("description", { maxLength: { value: 320, message: "Description must be 320 characters or fewer." } })} />
            {errors.description && <FieldError>{errors.description.message}</FieldError>}
          </Field>

          <Field data-invalid={Boolean(errors.coverImage)}>
            <FieldLabel htmlFor="article-cover-image">Cover image URL <span className="font-normal text-muted-foreground">(optional)</span></FieldLabel>
            <Input id="article-cover-image" type="url" aria-invalid={Boolean(errors.coverImage)} disabled={isSubmitting} {...register("coverImage", { validate: (value) => !value || /^https?:\/\//i.test(value) || "Enter a full http:// or https:// URL." })} />
            {errors.coverImage && <FieldError>{errors.coverImage.message}</FieldError>}
          </Field>
        </div>

        <div className="border border-border bg-surface p-5 sm:p-6">
          <Field data-invalid={Boolean(errors.body)}>
            <FieldLabel htmlFor="article-body">Article body</FieldLabel>
            <FieldDescription>Editing the body replaces it with a paragraph block. Leave it unchanged to preserve rich content blocks.</FieldDescription>
            <Textarea id="article-body" className="min-h-56" aria-invalid={Boolean(errors.body)} disabled={isSubmitting} {...register("body", { validate: (value) => !hasEditableParagraphs || value.trim().length > 0 || "Article body is required." })} />
            {errors.body && <FieldError>{errors.body.message}</FieldError>}
          </Field>
        </div>

        <label className="flex cursor-pointer items-start gap-3 border border-border bg-surface p-5 text-sm text-navy has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-brand">
          <input type="checkbox" className="mt-0.5 size-4 accent-brand" disabled={isSubmitting} {...register("published")} />
          <span><span className="font-medium">Publish immediately</span><span className="mt-1 block font-mono text-[10px] leading-5 text-foreground-muted">Leave this unchecked to save the article as a draft.</span></span>
        </label>

        {errors.root?.server && <FieldError>{errors.root.server.message}</FieldError>}

        <div className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/admin" className="inline-flex min-h-10 items-center justify-center border border-border px-4 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-navy transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">Cancel</Link>
          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting ? <LoaderCircle className="animate-spin" aria-hidden="true" /> : <Save aria-hidden="true" />}
            {isSubmitting ? "Saving changes..." : "Save changes"}
          </Button>
        </div>
      </form>
    </main>
  );
}
