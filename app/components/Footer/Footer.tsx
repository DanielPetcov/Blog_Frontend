import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-foreground text-brand-soft">
      <div className="max-w-4xl mx-auto p-5 text-xs font-light font-mono flex justify-between items-center">
        <div>© {currentYear} Petcov Daniel. All rights reserved.</div>
        <div className="flex gap-2">
          <Link href="#" className="uppercase font-medium">
            github
          </Link>
          <div>•</div>
          <Link href="#" className="uppercase font-medium">
            LinkedIn
          </Link>
          <div>•</div>
          <Link href="#" className="uppercase font-medium">
            Gmail
          </Link>
        </div>
      </div>
    </div>
  );
}
