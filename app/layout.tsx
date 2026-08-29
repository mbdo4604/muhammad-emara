import type { Metadata, Viewport } from "next";
import { Syncopate, Manrope } from "next/font/google";
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

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const lamaExpanded = localFont({
  src: [
    {
      path: "./fonts/LamaSans-ExtraLightExpanded.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/LamaSans-LightExpanded.ttf",
      weight: "300",
      style: "normal",
    },
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
      className={`${syncopate.variable} ${manrope.variable} ${lamaExpanded.variable} h-full`}
    >
      <body className="min-h-full bg-[var(--forma-red)] text-white antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
