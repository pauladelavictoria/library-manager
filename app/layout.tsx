import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/query-provider";
import Hero from "@/components/hero";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/lib/cart-context";
import { NotificationProvider } from "@/lib/notification-context";
import GlobalNotification from "@/components/global-notification";
import { CookieConsent } from "@/components/cookie-consent";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "library manager",
  description:
    "library manager 📚",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <QueryProvider>
          <NotificationProvider>
            <CartProvider>
              <Hero />
              {children}
              <GlobalNotification />
              <CookieConsent />
              <Footer />
            </CartProvider>
          </NotificationProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
