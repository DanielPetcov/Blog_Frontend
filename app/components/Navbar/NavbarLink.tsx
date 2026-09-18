"use client";

import { usePathname } from "next/navigation";

import { NavLinkType } from "../../data";
import Link from "next/link";
import ActionButton from "../ActionButton";
import { Button } from "@/components/ui/button";

export function NavbarLink({ link }: { link: NavLinkType }) {
  const path = usePathname();

  return (
    <Link href={link.href}>
      {path === link.href ? (
        <ActionButton>{link.name}</ActionButton>
      ) : (
        <Button className="font-mono" variant="ghost">
          {link.name}
        </Button>
      )}
    </Link>
  );
}
