import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import Header from '@/components/header';
import '@/styles/globals.scss';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

export const metadata: Metadata = {
  title: {
    default: 'Jakob Kordež',
    template: '%s | Jakob Kordež',
  },
  description: 'Developer and amateur radio enthusiast.',
  icons: {
    icon: '/images/logo/logo_bg_256.png',
    shortcut: '/images/logo/logo_bg_256.png',
  },
  manifest: '/manifest.json',
  creator: 'Jakob Kordež',
  keywords: ['Developer', 'Amateur radio', 'Software', 'Next.js'],
  themeColor: '#12071c',
  colorScheme: 'dark',
  category: 'portfolio',
  openGraph: {
    title: 'Jakob Kordež',
    description: 'Developer and amateur radio enthusiast.',
    url: 'https://jkob.cc',
    siteName: 'Jakob Kordež',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'yB3jGzOHglTepIzL1X99RYU1k5Q_N6GvMjVL3rugUSI',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />

        <main>
          <div className="container mx-auto max-w-screen-xl p-8">
            {children}
          </div>
        </main>

        <Analytics />
      </body>
    </html>
  );
}
