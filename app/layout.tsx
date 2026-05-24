import type { Metadata, Viewport } from "next";
import { Geist, Nerko_One } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import type React from "react";
import LocomotiveScroll from "@/app/components/LocomotiveScroll";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const nerkoOne = Nerko_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-nerko-one",
});

const sfProDisplay = localFont({
  src: [
    {
      path: "./assets/fonts/SFProDisplay-Ultralight.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./assets/fonts/SFProDisplay-UltralightItalic.ttf",
      weight: "100",
      style: "italic",
    },
    {
      path: "./assets/fonts/SFProDisplay-Thin.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./assets/fonts/SFProDisplay-ThinItalic.ttf",
      weight: "200",
      style: "italic",
    },
    {
      path: "./assets/fonts/SFProDisplay-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./assets/fonts/SFProDisplay-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./assets/fonts/SFProDisplay-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./assets/fonts/SFProDisplay-RegularItalic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./assets/fonts/SFProDisplay-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./assets/fonts/SFProDisplay-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./assets/fonts/SFProDisplay-Semibold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./assets/fonts/SFProDisplay-SemiboldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "./assets/fonts/SFProDisplay-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./assets/fonts/SFProDisplay-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "./assets/fonts/SFProDisplay-Heavy.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./assets/fonts/SFProDisplay-HeavyItalic.ttf",
      weight: "800",
      style: "italic",
    },
    {
      path: "./assets/fonts/SFProDisplay-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./assets/fonts/SFProDisplay-BlackItalic.ttf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-sf-pro-display",
});

export const metadata: Metadata = {
  title: "MUMU — The official bull market movement of Solana",
  description:
    "The official bull market movement of Solana. High-energy, premium crypto brand hub for migration, community, and onboarding.",
  applicationName: "MUMU",
  icons: {
    icon: [
      { url: "favicon.ico" },
      { url: "favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "favicon-128x128.png", sizes: "128x128", type: "image/png" },
      { url: "favicon-196x196.png", sizes: "196x196", type: "image/png" },
    ],
    apple: [
      { url: "apple-touch-icon-57x57.png", sizes: "57x57" },
      { url: "apple-touch-icon-60x60.png", sizes: "60x60" },
      { url: "apple-touch-icon-72x72.png", sizes: "72x72" },
      { url: "apple-touch-icon-76x76.png", sizes: "76x76" },
      { url: "apple-touch-icon-114x114.png", sizes: "114x114" },
      { url: "apple-touch-icon-120x120.png", sizes: "120x120" },
      { url: "apple-touch-icon-144x144.png", sizes: "144x144" },
      { url: "apple-touch-icon-152x152.png", sizes: "152x152" },
      { url: "apple-touch-icon-180x180.png", sizes: "180x180" },
      { url: "apple-touch-icon-192x192.png", sizes: "192x192" },
    ],
  },
  manifest: "site.webmanifest",
  openGraph: {
    title: "MUMU — The official bull market movement of Solana",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mumu",
      },
    ],
    description:
      "The official bull market movement of Solana. Migration hub, investor credibility, and community onboarding — all in one place.",
  },
  twitter: {
    card: "summary_large_image",
    title: "MUMU — The official bull market movement of Solana",
    description:
      "Premium, bullish, high-energy brand site for the Solana bull market. Migration hub, community, and onboarding.",
    images: ["/twitter_image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#c15300",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        sfProDisplay.variable,
        nerkoOne.variable,
        "font-sans",
        geist.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <LocomotiveScroll />
        <main data-scroll-container>{children}</main>
      </body>
    </html>
  );
}
