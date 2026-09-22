import type { ReactNode } from "react";

import PageSubtitle from "./PageSubtitle";
import PageTitle from "./PageTitle";
import ActionButton from "../ActionButton";

interface PageHeroProps {
  pageTitle: ReactNode;
  pageSubtitle?: ReactNode;
  actionButton?: {
    children: ReactNode;
    href?: string;
  };
  className?: string;
}

export default function PageHero({
  pageTitle,
  pageSubtitle,
  actionButton,
  className,
}: PageHeroProps) {
  return (
    <section
      className={`mx-auto max-w-7xl space-y-7 px-5 py-20 sm:px-8 sm:py-28 ${className ?? ""}`}
    >
      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-brand">
        Personal notes / 01
      </p>
      <PageTitle>{pageTitle}</PageTitle>

      {pageSubtitle && <PageSubtitle>{pageSubtitle}</PageSubtitle>}

      {actionButton && (
        <ActionButton href={actionButton.href}>
          {actionButton.children}
        </ActionButton>
      )}
    </section>
  );
}
