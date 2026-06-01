"use client";

import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/lib/auth-context";
import FuzzySearch from "@/components/global/fuzzy-search";
import UserAuthState from "../user-auth-state";
import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X, Instagram, Facebook } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export default function Header() {
  const { totalItems } = useCart();
  const { user, profile } = useAuth();
  const [isMounted, setIsMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => { setIsMounted(true); }, []);

  // Close menu on route change
  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener("popstate", close);
    return () => window.removeEventListener("popstate", close);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isAdmin = isMounted && user && profile?.is_admin;

  const navLinks = [
    { href: "/books",     label: "Catálogo" },
    { href: "/trivial",   label: "Trivial" },
    { href: "/events",    label: "Eventos" },
    ...(isAdmin ? [{ href: "/inventory", label: "Gestión" }] : []),
    ...(isMounted && user ? [{ href: "/dashboard", label: "Mi perfil" }] : []),
  ];

  return (
    <>
      <header className="sticky top-0 bg-background border-ink-b z-50">
        <div className="page-container grid grid-cols-[1fr_auto_1fr] items-center py-3">

          {/* Left: hamburger + logo + desktop nav */}
          <div className="flex items-center gap-0">
            <button
              onClick={() => setMenuOpen(v => !v)}
              className="md:hidden btn-ghost flex items-center mr-4"
              aria-label="Menu"
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>

            <Link href="/" className="shrink-0 mr-10" onClick={() => setMenuOpen(false)} suppressHydrationWarning>
              <Logo className="h-7 w-[52px]" />
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link href="/books" className="btn-ghost">Catálogo</Link>
              <Link href="/trivial" className="btn-ghost">Trivial</Link>
              <Link href="/events" className="btn-ghost">Eventos</Link>
            </nav>
          </div>

          {/* Center: search — desktop only, truly centered */}
          <div className="hidden lg:flex justify-center">
            <FuzzySearch />
          </div>
          {/* Center placeholder on mobile to keep grid */}
          <div className="lg:hidden" />

          {/* Right group */}
          <div className="flex items-center gap-4 justify-end">
            {/* Search icon — mobile */}
            {!menuOpen && (<div className="lg:hidden">
              <FuzzySearch />
            </div>)}

            {/* Desktop admin + cart + user */}
            <div className="hidden md:flex items-center gap-6">
              {isAdmin && (
                <Link href="/inventory" className="btn-ghost">Gestión</Link>
              )}
              {isMounted && user && (
                <Link href="/cart" className="relative btn-ghost">
                  <ShoppingCart className="h-4 w-4" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-4 label-mono bg-foreground text-background px-1 py-0.5">
                      {totalItems}
                    </span>
                  )}
                </Link>
              )}
              <UserAuthState />
            </div>

            {/* Mobile: cart + user — always visible to lock header height */}
            <div className="flex md:hidden items-center gap-4">
              {!menuOpen && isMounted && user && (
                <Link href="/cart" className="relative btn-ghost" onClick={() => setMenuOpen(false)}>
                  <ShoppingCart className="h-4 w-4" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-4 label-mono bg-foreground text-background px-1 py-0.5">
                      {totalItems}
                    </span>
                  )}
                </Link>
              )}
              <UserAuthState />
            </div>
          </div>

        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col md:hidden",
          "transition-all duration-200 ease-in",
          menuOpen
            ? "opacity-100 translate-x-0 pointer-events-auto"
            : "opacity-0 -translate-x-4 pointer-events-none"
        )}
        style={{
          backgroundColor: "#0F0F0D",
          backgroundImage: "var(--grain)",
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
          backgroundBlendMode: "overlay",
          backgroundAttachment: "fixed",
          top: "calc(var(--header-h, 52px))",
        }}
      >
        <nav className="flex flex-col flex-1 justify-center px-[clamp(1.5rem,6vw,4rem)]">
          {navLinks.map(({ href, label }, i) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="block py-5 font-serif font-bold border-b border-foreground/10 hover:opacity-60"
              style={{
                fontSize: "clamp(32px,10vw,64px)",
                lineHeight: 1,
                color: "#F5F0E8",
                letterSpacing: "-0.02em",
                transition: `opacity 0.2s ease-in-out ${80 + i * 80}ms, transform 0.2s ease-in-out ${80 + i * 80}ms`,
                transform: menuOpen ? "translateX(0)" : "translateX(-50px)",
                opacity: menuOpen ? 1 : 0,
              }}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="px-[clamp(1.5rem,6vw,4rem)] py-8 flex items-center justify-between" style={{ color: "#F5F0E8", borderTop: "1px solid rgba(245,240,232,0.12)" }}>
          <div className="flex items-center gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Instagram className="h-4 w-4 cursor-pointer opacity-60 hover:opacity-100 transition-opacity" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-background text-foreground border-ink body-sans px-3 py-2">
                    Librería Éter no existe... todavia.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Facebook className="h-4 w-4 cursor-pointer opacity-60 hover:opacity-100 transition-opacity" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-background text-foreground border-ink body-sans px-3 py-2">
                    Preferimos el papel fisico.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          <p className="label-mono" style={{ color: "rgba(245,240,232,0.35)" }}>Macondo</p>
        </div>
      </div>
    </>
  );
}
