"use client";

import Link from "next/link";
import UserAuthState from "./user-auth-state";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/lib/auth-context";
import FuzzySearch from "./fuzzy-search";
import { Button } from "./ui/button";


export default function Hero() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const { user, profile } = useAuth();

  const navItems = [
    { name: "Libros", href: "/books" },
    { name: "Trivial", href: "/trivial" },
    user && profile?.is_admin && { name: "Gestión", href: "/admin/inventory" },
    user && { name: "Carrito", href: "/cart" },
  ].filter(Boolean) as { name: string; href: string; }[];

  return (
    <header className="sticky top-0 p-4 pl-8 transition-all duration-300 flex items-center justify-between bg-background">
      <div className="flex items-center gap-8">
        <Link
          href="/"
        >

          <span className="font-serif tracking-[10px] text-5xl">
            éter
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-1 gap-[32px]">

          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
            >
              <Button variant="ghost">
                {item.name}
                {
                  item.href === "/cart" && totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground animate-in zoom-in">
                      {totalItems}
                    </span>
                  )
                }

              </Button>
            </Link>
          ))}
        </nav>
      </div >

      <div className="flex items-center gap-4">
        <div className="hidden lg:block">
          <FuzzySearch />
        </div>
        <div className="h-8 w-[1px] bg-white/10 hidden md:block" />
        <UserAuthState />
      </div>
    </header >
  );
}
