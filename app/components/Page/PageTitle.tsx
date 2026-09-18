import { ReactNode } from "react";

export default function PageTitle({ children }: { children: ReactNode }) {
  return <h1 className="text-5xl font-semibold font-mono">{children}</h1>;
}
