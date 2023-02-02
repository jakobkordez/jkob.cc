"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/hamradio", label: "Amateur Radio" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="py-4 px-6 font-medium tracking-wider drop-shadow-md backdrop-brightness-50 backdrop-saturate-200">
      <nav className="flex space-x-8 text-lg">
        <Link className="mr-auto" href="/">
          <Image
            src="/images/logo_48.png"
            height={48}
            width={48}
            alt="Logo"
            className="h-10 w-10"
          />
        </Link>

        {links.map(({ href, label }) => (
          <Link
            key={href}
            className={`link my-auto ${pathname === href ? "is-active" : ""}`}
            href={href}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
