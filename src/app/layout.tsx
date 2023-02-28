import type { Metadata } from "next";
import { AnalyticsWrapper } from "@/components/analytics";
import Header from "@/components/header";
import "@/styles/globals.scss";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

export const metadata: Metadata = {
  title: {
    default: "Jakob Kordež",
    template: "%s | Jakob Kordež",
  },
  description: "Developer and amateur radio enthusiast.",
  icons: {
    icon: "/images/logo_bg_256.png",
    shortcut: "/images/logo_bg_256.png",
  },
  creator: "Jakob Kordež",
  keywords: ["Developer", "Amateur radio", "Software", "Next.js"],
  themeColor: "#12071c",
  colorScheme: "dark",
  category: "portfolio",
  openGraph: {
    title: "Jakob Kordež",
    description: "Developer and amateur radio enthusiast.",
    url: "https://jkob.cc",
    siteName: "Jakob Kordež",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
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

        <AnalyticsWrapper />
      </body>
    </html>
  );
}
