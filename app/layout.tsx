import type { Metadata } from "next";
import { Playfair_Display, Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/query-provider";
import { CartProvider } from "@/lib/cart-context";
import { NotificationProvider } from "@/lib/notification-context";
import GlobalNotification from "@/components/global-notification";
import { CookieConsent } from "@/components/global/cookie-consent";
import { Footer } from "@/components/footer";
import Header from "@/components/global/header";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  weight: ["400", "500", "700"],
  display: "swap",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Librería Éter",
  description: "Librería Éter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${playfair.variable} ${spaceGrotesk.variable} ${spaceMono.variable} antialiased`}>
        {/* Grain on dark surfaces */}
        <div className="grain fixed inset-0 pointer-events-none" style={{ opacity: 0.35, zIndex: 9999 }} />
        {/* Grain on light surfaces — multiply only darkens light areas */}
        <div className="grain fixed inset-0 pointer-events-none" style={{ opacity: 0.35, mixBlendMode: "multiply", zIndex: 9999 }} />
        <QueryProvider>
          <NotificationProvider>
            <CartProvider>
              <Header />
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
