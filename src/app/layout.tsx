import type { Metadata, Viewport } from "next";
import { Barlow, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MAF Coffee & Lounge · Armutlu, Yalova",
  description:
    "Şehrin gürültüsünden uzak, bir fincan kahvenin sıcaklığında. MAF Coffee & Lounge — Armutlu, Yalova. Her gün 08:00 – 03:00.",
  metadataBase: new URL("https://maftayiz.com"),
  openGraph: {
    title: "MAF Coffee & Lounge · Armutlu, Yalova",
    description: "Feel The Rituel",
    locale: "tr_TR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#050212",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${cormorant.variable} ${inter.variable} ${barlow.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
