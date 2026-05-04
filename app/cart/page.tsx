"use client";

import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-md mx-auto">
          <div className="bg-primary/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
            <ShoppingBag className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-black mb-4 tracking-tight">Tu carrito está vacío</h1>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            Parece que aún no has añadido ningún libro a tu colección. ¡Explora nuestro catálogo y descubre tu próxima aventura literaria!
          </p>
          <Link href="/books">
            <Button size="lg" className="rounded-full px-10 py-7 text-lg font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all">
              Explorar Catálogo
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 lg:py-24">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-end gap-4 mb-12">
          <h1 className="text-5xl font-black tracking-tighter">Tu Carrito</h1>
          <span className="text-2xl text-muted-foreground font-medium mb-1">({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
        </header>

        <div className="grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-8">
            {cart.map((item) => (
              <div
                key={item.id}
                className="group flex flex-col sm:flex-row gap-6 p-6 rounded-3xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 shadow-sm transition-all duration-300 hover:shadow-xl hover:bg-white/60 dark:hover:bg-slate-900/60"
              >
                <div className="w-full sm:w-32 h-48 flex-shrink-0 overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 shadow-inner">
                  {item.cover_url ? (
                    <img
                      src={item.cover_url}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">Sin portada</div>
                  )}
                </div>

                <div className="flex flex-col flex-1 py-1">
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <div>
                      <h3 className="font-bold text-xl leading-tight line-clamp-2 group-hover:text-primary transition-colors">{item.title}</h3>
                      <p className="text-muted-foreground font-medium">{item.authors?.[0] || "Autor desconocido"}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
                      aria-label="Eliminar producto"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 bg-background/80 backdrop-blur-sm rounded-full border border-slate-200 dark:border-slate-800 p-1.5 shadow-sm">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-lg font-bold w-6 text-center">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-muted-foreground mb-0.5 font-medium uppercase tracking-wider">Subtotal</p>
                      <p className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                        €{(item.selling_price || 0) * item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-4">
              <Link href="/books">
                <Button variant="ghost" className="rounded-full group font-semibold">
                  <ArrowRight className="mr-2 h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-1" />
                  Continuar Comprando
                </Button>
              </Link>
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 overflow-hidden rounded-[2.5rem] bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-1">
              <div className="bg-white dark:bg-slate-950 rounded-[2.2rem] p-8">
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                  <ShoppingBag className="h-6 w-6 text-primary" />
                  Resumen
                </h2>

                <div className="space-y-5 mb-10">
                  <div className="flex justify-between text-lg">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-bold">€{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="text-muted-foreground">Envío</span>
                    <span className="text-primary font-bold bg-primary/10 px-3 py-0.5 rounded-full text-sm">Gratis</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="text-muted-foreground">Impuestos</span>
                    <span className="font-medium">Incluidos</span>
                  </div>

                  <Separator className="my-2" />

                  <div className="flex justify-between items-baseline pt-2">
                    <span className="text-xl font-bold">Total</span>
                    <div className="text-right">
                      <span className="text-4xl font-black text-primary">
                        €{totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <Button size="lg" className="w-full rounded-2xl py-8 text-xl font-black shadow-xl shadow-primary/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group">
                  Pagar Ahora
                  <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
                </Button>

                <div className="mt-8 flex flex-col gap-4">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground font-medium">
                    <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                    Garantía de satisfacción de 30 días
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground font-medium">
                    <div className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                    Envío seguro y rastreado
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
