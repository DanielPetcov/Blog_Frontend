import { ReactNode } from "react";

export default function PageSubtitle({ children }: { children: ReactNode }) {
  return (
    <p className="text-navy-soft font-light font-mono md:w-1/2">{children}</p>
  );
}
