'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  // { href: '/gallery', label: 'Gallery' },
  { href: '/hamradio', label: 'Amateur Radio' },
];

export default function Header() {
  let pathname = usePathname();
  if (pathname?.startsWith('/projects/')) {
    pathname = '/projects';
  }
  if (pathname?.startsWith('/hamradio/')) {
    pathname = '/hamradio';
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="px-6 py-4 font-medium tracking-wider drop-shadow-md backdrop-brightness-50 backdrop-saturate-200">
      <nav className="flex-none flex-wrap space-y-4 md:flex md:space-x-8 md:space-y-0">
        <div className="flex grow">
          <Link className="mr-auto text-xl font-semibold" href="/">
            Jakob Kordež
          </Link>
          <div className="flex md:hidden">
            <button
              className={`burger-button my-auto h-6 w-6 ${
                isMenuOpen ? 'is-active' : ''
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {links.map(({ href, label }) => (
          <div
            key={href}
            className={`flex ${isMenuOpen ? '' : 'hidden'} md:block`}
          >
            <Link
              className={`link my-auto ${pathname === href ? 'is-active' : ''}`}
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
