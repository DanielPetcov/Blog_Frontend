import { ReactNode } from "react";
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
}

export default function PageHero({
  pageTitle,
  pageSubtitle,
  actionButton,
}: PageHeroProps) {
  return (
    <div className="space-y-4">
      <PageTitle>{pageTitle}</PageTitle>

      {pageSubtitle && <PageSubtitle>{pageSubtitle}</PageSubtitle>}

      {actionButton && (
        <ActionButton href={actionButton.href}>
          {actionButton.children}
        </ActionButton>
      )}
    </div>
  );
}
