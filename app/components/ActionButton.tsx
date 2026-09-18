import { Button } from "@/components/ui/button";
import { cn } from "cn";
import Link from "next/link";
import { ReactNode } from "react";

export default function ActionButton({
  className,
  children,
  href,
}: {
  className?: string;
  children: ReactNode;
  href?: string;
}) {
  const glassEffect =
    "bg-brand text-brand-soft hover:bg-brand-hover hover:text-brand-soft shadow-md ring-1 ring-black/5";

  if (href)
    return (
      <Link href={href}>
        <Button
          className={cn("font-mono", glassEffect, className)}
          variant={"ghost"}
        >
          {children}
        </Button>
      </Link>
    );

  return (
    <Button
      className={cn("font-mono ", glassEffect, className)}
      variant={"ghost"}
    >
      {children}
    </Button>
  );
}
