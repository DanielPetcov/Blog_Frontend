"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function AdminError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error("Unable to load admin dashboard:", error);
  }, [error]);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
      <div className="border border-dashed border-border bg-surface px-5 py-10 text-center sm:px-8">
        <h1 className="text-2xl font-medium tracking-[-0.04em] text-navy">Dashboard unavailable</h1>
        <p className="mt-3 font-mono text-xs leading-6 text-foreground-muted">We couldn’t load the dashboard. Please try again.</p>
        <Button className="mt-5" onClick={retry}>Try again</Button>
      </div>
    </div>
  );
}
