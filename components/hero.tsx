"use client";

import Link from "next/link";
import UserAuthState from "./user-auth-state";
import { BookOpen, ShoppingCart, Trophy, Package2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/lib/auth-context";
import FuzzySearch from "./fuzzy-search";


export default function Hero() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const { user, profile } = useAuth();

  const navItems = [
    { name: "Libros", href: "/books", icon: BookOpen },
    { name: "Trivial", href: "/trivial", icon: Trophy },
    user && profile?.is_admin && { name: "Gestión", href: "/admin/inventory", icon: Package2 },
    user && { name: "Carrito", href: "/cart", icon: ShoppingCart },
  ].filter(Boolean) as { name: string; href: string; icon: any }[];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl border-white/10 shadow-lg transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center gap-2 group transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <div className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors shadow-inner">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                Librería Éter
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-1">

              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 scale-100 hover:scale-105 active:scale-95",
                    pathname === item.href
                      ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(var(--primary),0.3)]"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                  {item.href === "/cart" && totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground animate-in zoom-in">
                      {totalItems}
                    </span>
                  )}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden lg:block">
              <FuzzySearch />
            </div>
            <div className="h-8 w-[1px] bg-white/10 hidden md:block" />
            <UserAuthState />
          </div>
        </div>
      </div>

      <div className="md:hidden border-t border-white/5 bg-background/40 overflow-x-auto whitespace-nowrap hide-scrollbar">
        <div className="flex items-center p-2 space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200",
                pathname === item.href
                  ? "bg-primary/20 text-primary"
                  : "text-muted-foreground hover:bg-accent"
              )}
            >
              <item.icon className="h-3 w-3" />
              {item.name}
              {item.href === "/cart" && totalItems > 0 && (
                <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                  {totalItems}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
