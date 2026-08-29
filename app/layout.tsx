import type { Metadata, Viewport } from "next";
import { Syncopate } from "next/font/google";
import localFont from "next/font/local";
import { Providers } from "@/components/providers";
import { site } from "@/content/site";
import "./globals.css";

const syncopate = Syncopate({
  subsets: ["latin"],
  variable: "--font-syncopate",
  weight: ["400", "700"],
  display: "swap",
});

const lama = localFont({
  src: [
    { path: "./fonts/LamaSans-Light.ttf", weight: "300", style: "normal" },
    { path: "./fonts/LamaSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/LamaSans-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/LamaSans-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/LamaSans-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-lama",
  display: "swap",
});

const lamaExpanded = localFont({
  src: [
    { path: "./fonts/LamaSans-LightExpanded.ttf", weight: "300", style: "normal" },
    { path: "./fonts/LamaSans-RegularExpanded.ttf", weight: "400", style: "normal" },
    { path: "./fonts/LamaSans-MediumExpanded.ttf", weight: "500", style: "normal" },
    { path: "./fonts/LamaSans-SemiBoldExpanded.ttf", weight: "600", style: "normal" },
    { path: "./fonts/LamaSans-BoldExpanded.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-lama-expanded",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://muhammademara.com"),
  title: site.title,
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    images: ["/images/portrait.png"],
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#2c0000",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${syncopate.variable} ${lama.variable} ${lamaExpanded.variable} h-full`}
    >
      <body className="min-h-full bg-[var(--forma-red)] text-white antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
