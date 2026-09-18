import { ReactNode } from "react";

export default function PageSubtitle({ children }: { children: ReactNode }) {
  return <p className="font-light font-mono md:w-1/2">{children}</p>;
}
