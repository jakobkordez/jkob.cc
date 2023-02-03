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
      <nav className="flex-none flex-wrap space-y-4 text-lg md:flex md:space-x-8 md:space-y-0">
        <Link className="md:mr-auto" href="/">
          <Image
            src="/images/logo_128.png"
            height={48}
            width={48}
            alt="Logo"
            className="mx-auto h-10 w-10"
          />
        </Link>

        {links.map(({ href, label }) => (
          <div key={href} className="flex">
            <Link
              className={`link my-auto ${pathname === href ? "is-active" : ""}`}
              href={href}
            >
              {label}
            </Link>
          </div>
        ))}
      </nav>
    </header>
  );
}
