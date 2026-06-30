import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import { ToastProvider } from "@/components/ui/toast";
import { getSiteSettings } from "@/lib/queries";
import Script from "next/script";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MGL Construction & Interior Designs",
  description: "Professional construction, interior design, drafting, and engineering services. Building your vision from the ground up.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html lang="en" className={`h-full ${playfair.variable} ${inter.variable}`}>
      <body className="min-h-full flex flex-col font-sans">
        {process.env.PLAUSIBLE_URL && (
          <Script defer data-domain={process.env.NEXT_PUBLIC_SITE_URL || ''} src={process.env.PLAUSIBLE_URL} />
        )}
        <ToastProvider>
          <Navbar settings={settings} />
          <main className="flex-1 pt-16">{children}</main>
          <Footer settings={settings} />
          <CookieConsent />
        </ToastProvider>
      </body>
    </html>
  );
}
