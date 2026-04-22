import type { Metadata } from "next";
import { Reem_Kufi, Cairo } from "next/font/google";
import "./globals.css";
import SettingsProvider from "@/components/SettingsProvider";
import RouteTransitionProvider from "@/components/ui/RouteTransition";
import InitialPaintLoader from "@/components/ui/InitialPaintLoader";

const reemKufi = Reem_Kufi({
  variable: "--font-reem-kufi",
  subsets: ["latin", "arabic"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin", "arabic"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Falcon's Journey Through Science | رحلة الصقر",
  description:
    "A gamified learning path through the Solar System for Grade 4 students, featuring Hurr the falcon as your guide. Built for ADEK.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${reemKufi.variable} ${cairo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body bg-sand-beige text-desert-night">
        {/* Server-rendered loader that paints in the initial HTML so a
            hard refresh never shows a blank screen while client JS is
            hydrating. Removes itself on mount. */}
        <InitialPaintLoader />
        <SettingsProvider>
          <RouteTransitionProvider>{children}</RouteTransitionProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
