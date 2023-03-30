"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/gallery", label: "Gallery" },
  { href: "/hamradio", label: "Amateur Radio" },
];

export default function Header() {
  let pathname = usePathname();
  if (pathname?.startsWith("/projects/")) {
    pathname = "/projects";
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="py-4 px-6 font-medium tracking-wider drop-shadow-md backdrop-brightness-50 backdrop-saturate-200">
      <nav className="flex-none flex-wrap space-y-4 text-lg md:flex md:space-x-8 md:space-y-0">
        <div className="flex grow">
          <Link className="mr-auto" href="/">
            <Image
              src="/images/logo/logo_128.png"
              height={48}
              width={48}
              alt="Logo"
              className="mx-auto h-10 w-10"
            />
          </Link>
          <div className="flex md:hidden">
            <button
              className={`burger-button my-auto h-6 w-6 ${
                isMenuOpen ? "is-active" : ""
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div />
              <div />
              <div />
            </button>
          </div>
        </div>

        {links.map(({ href, label }) => (
          <div
            key={href}
            className={`flex ${isMenuOpen ? "" : "hidden"} md:block`}
          >
            <Link
              className={`link my-auto ${pathname === href ? "is-active" : ""}`}
              href={href}
              onClick={() => setIsMenuOpen(false)}
            >
              {label}
            </Link>
          </div>
        ))}
      </nav>
    </header>
  );
}
