"use client";

import { usePathname } from "next/navigation";

import { NavLinkType } from "../../data";
import Link from "next/link";

export function NavbarLink({ link }: { link: NavLinkType }) {
  const path = usePathname();

  return (
    <Link
      href={link.href}
      aria-current={path === link.href ? "page" : undefined}
      className={`border-b px-1 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:px-2 sm:text-[11px] ${
        path === link.href
          ? "border-brand text-brand"
          : "border-transparent text-navy hover:border-navy hover:text-brand"
      }`}
    >
      {link.name}
    </Link>
  );
}
