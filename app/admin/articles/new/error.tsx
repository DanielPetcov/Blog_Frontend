"use client";

import { useEffect } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NewArticleError({ error, retry }: { error: Error; retry: () => void }) {
  useEffect(() => {
    console.error("Unable to load the new article page:", error);
  }, [error]);

  return (
    <main className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
      <div className="border border-dashed border-border bg-surface px-5 py-10 text-center sm:px-8">
        <h1 className="text-2xl font-medium tracking-[-0.04em] text-navy">New article unavailable</h1>
        <p className="mt-3 font-mono text-xs leading-6 text-foreground-muted">We couldn’t load the article editor. Please try again.</p>
        <div className="mt-5 flex justify-center gap-3"><Button onClick={retry}>Try again</Button><Link href="/admin" className="inline-flex h-8 items-center border border-border px-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-navy hover:bg-muted">Back to dashboard</Link></div>
      </div>
    </main>
  );
}
