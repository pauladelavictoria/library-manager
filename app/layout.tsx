import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/query-provider";
import { CartProvider } from "@/lib/cart-context";
import { NotificationProvider } from "@/lib/notification-context";
import GlobalNotification from "@/components/global-notification";
import { CookieConsent } from "@/components/global/cookie-consent";
import { Footer } from "@/components/footer";
import Hero from "@/components/global/hero";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorantGaramond",
  weight: "400",
  style: "normal",
  display: "swap",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Librería Éter",
  description:
    "Librería Éter 📚",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorantGaramond.variable} ${inter.variable} antialiased `}>
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
