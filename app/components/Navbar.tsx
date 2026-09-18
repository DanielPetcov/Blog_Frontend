import Link from "next/link";
import { navLinks } from "@/app/data";
import { NavbarLink } from "./NavbarLink";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between py-2 px-5">
      <Link href="/" className="font-mono">
        Home
      </Link>

      <div className="flex items-center justify-between gap-6">
        {navLinks.map((link) => (
          <NavbarLink key={link.href} link={link} />
        ))}
      </div>
    </div>
  );
}
