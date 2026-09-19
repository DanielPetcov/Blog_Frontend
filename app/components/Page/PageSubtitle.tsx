import { type ReactNode } from "react";

export default function PageSubtitle({ children }: { children: ReactNode }) {
  return (
    <p className="max-w-xl font-mono text-xs leading-6 tracking-[0.025em] text-foreground-muted sm:text-sm">
      {children}
    </p>
  );
}
