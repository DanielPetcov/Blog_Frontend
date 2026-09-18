import { Button } from "@/components/ui/button";
import { cn } from "cn";
import Link from "next/link";
import { ReactNode } from "react";

export default function ActionButton({
  children,
  href,
}: {
  children: ReactNode;
  href?: string;
}) {
  const glassEffect = "bg-white/20 shadow-md ring-1 ring-black/5";

  if (href)
    return (
      <Link href={href}>
        <Button className={cn("font-mono", glassEffect)} variant={"ghost"}>
          {children}
        </Button>
      </Link>
    );

  return (
    <Button className={cn("font-mono", glassEffect)} variant={"ghost"}>
      {children}
    </Button>
  );
}
