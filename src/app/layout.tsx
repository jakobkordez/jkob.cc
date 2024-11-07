import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/react';
import Header from '@/components/header';
import { Inter } from 'next/font/google';
import './globals.css';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const viewport: Viewport = {
  themeColor: '#12071c',
  colorScheme: 'dark',
};

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
  category: 'portfolio',
  metadataBase: new URL('https://jkob.cc'),
  openGraph: {
    title: {
      default: 'Jakob Kordež',
      template: '%s | Jakob Kordež',
    },
    description: 'Developer and amateur radio enthusiast.',
    url: 'https://jkob.cc',
    siteName: 'Jakob Kordež',
    locale: 'en_US',
    type: 'website',
    images: {
      url: 'https://jkob.cc/images/portrait.jpg',
    },
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
      <body className={inter.className}>
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
