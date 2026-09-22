import Link from "next/link";

import { navLinks } from "@/app/data";
import { NavbarLink } from "./NavbarLink";

export default function Navbar() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="group flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-navy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
        >
          <span className="grid size-7 place-items-center bg-brand text-xs tracking-normal text-white transition-transform group-hover:rotate-90">
            D
          </span>
          <span className="hidden sm:inline">Daniel Petcov</span>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="flex items-center gap-1 sm:gap-4"
        >
          {navLinks.map((link) => (
            <NavbarLink key={link.href} link={link} />
          ))}
        </nav>
      </div>
    </header>
  );
}
