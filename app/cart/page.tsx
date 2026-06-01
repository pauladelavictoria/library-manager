"use client";

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useNotification } from "@/lib/notification-context";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { toTitleCase } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { checkout } from "./actions";
import PriceTag from "@/components/ui/price-tag";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    totalPrice,
    totalItems,
    appliedPromo,
    applyPromo,
    removePromo,
    clearCart
  } = useCart();
  const [promoInput, setPromoInput] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const { notify } = useNotification();
  const router = useRouter();

  const handleApplyPromo = async () => {
    if (!promoInput.trim()) return;
    setIsApplying(true);
    const result = await applyPromo(promoInput);
    setIsApplying(false);
    if (result.success) setPromoInput("");
  };

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const result = await checkout(cart, totalPrice, appliedPromo?.code);
      if (result.success) {
        notify({ type: "success", title: "Pedido realizado", message: "Tu pedido se ha procesado con exito." });
        clearCart();
        router.push("/dashboard");
      } else {
        notify({ type: "error", title: "Error en pedido", message: result.error || "No pudimos procesar tu pedido." });
      }
    } catch {
      notify({ type: "error", title: "Error inesperado", message: "Ocurrio un error al procesar el pago." });
    } finally {
      setIsCheckingOut(false);
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.selling_price || 0) * item.quantity, 0);
  const discount = appliedPromo ? (subtotal * (appliedPromo.discount_amount / 100)) : 0;

  if (cart.length === 0) {
    return (
      <main className="page-container py-24 flex flex-col items-center text-center">
        <div className="border-soft w-20 h-20 flex items-center justify-center mb-8">
          <ShoppingBag className="h-8 w-8 text-foreground/40" />
        </div>
        <h1 className="display-lg mb-4">Carrito vacio</h1>
        <p className="body-sans text-foreground/60 mb-10 max-w-sm">
          Todavia no has anadido ningun libro. Explora nuestro catalogo.
        </p>
        <Link href="/books" className="btn-primary">
          Explorar catalogo
        </Link>
      </main>
    );
  }

  return (
    <main className="page-container py-12">
      <div className="border-ink-b pb-6 mb-10 flex items-baseline gap-4">
        <h1 className="display-lg">Tu carrito</h1>
        <span className="label-mono">({totalItems} {totalItems === 1 ? "libro" : "libros"})</span>
      </div>

      <div className="grid lg:grid-cols-3 gap-16">
        {/* Items */}
        <div className="lg:col-span-2 space-y-0 border-soft">
          {cart.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col sm:flex-row gap-6 p-6 border-soft-t"
            >
              <div className="w-full sm:w-24 flex-shrink-0 overflow-hidden">
                {item.cover_url ? (
                  <img
                    src={item.cover_url}
                    alt={toTitleCase(item.title)}
                    className="w-full aspect-[2/3] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full aspect-[2/3] bg-card flex items-center justify-center label-mono">Sin portada</div>
                )}
              </div>

              <div className="flex flex-col flex-1">
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div>
                    <h3 className="display-md line-clamp-2">{toTitleCase(item.title)}</h3>
                    <p className="label-mono mt-1">{item.authors?.[0] || "Autor desconocido"}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-foreground/30 hover:text-destructive transition-colors"
                    aria-label="Eliminar"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-end justify-between gap-4 mt-auto">
                  <div className="flex items-center gap-3 border-soft px-3 py-1.5">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="btn-ghost py-0">
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="price-mono text-sm w-4 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="btn-ghost py-0">
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <PriceTag price={(item.selling_price || 0) * item.quantity} size="lg" className="items-end" />
                </div>
              </div>
            </div>
          ))}

          <div className="border-soft-t pt-6">
            <Link href="/books" className="btn-outline inline-flex items-center gap-2">
              <ArrowRight className="h-3.5 w-3.5 rotate-180" />
              Seguir comprando
            </Link>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 border-ink p-6">
            <h2 className="label-sans mb-6 border-ink-b pb-3">Resumen del pedido</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="label-mono">Subtotal</span>
                <span className="price-mono">€{subtotal.toFixed(2)}</span>
              </div>

              {appliedPromo && (
                <div className="flex justify-between text-foreground/60">
                  <div className="flex items-center gap-2 label-mono">
                    <Tag className="h-3 w-3" />
                    {appliedPromo.code}
                  </div>
                  <span className="price-mono">-€{discount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="label-mono">Envio</span>
                <span className="label-mono border-soft px-2 py-0.5">Gratis</span>
              </div>

              <div className="flex justify-between">
                <span className="label-mono">Impuestos</span>
                <span className="label-mono">Incluidos</span>
              </div>

              {/* Promo code */}
              <div className="border-soft-t pt-4">
                {!appliedPromo ? (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Codigo promo"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                      onKeyDown={(e) => e.key === "Enter" && handleApplyPromo()}
                      className="flex-1"
                    />
                    <Button
                      variant="secondary"
                      onClick={handleApplyPromo}
                      disabled={isApplying || !promoInput.trim()}
                    >
                      {isApplying ? "..." : "Aplicar"}
                    </Button>
                  </div>
                ) : (
                  <div className="border-soft p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 label-mono">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Codigo aplicado
                    </div>
                    <button onClick={removePromo} className="btn-ghost text-xs">
                      Cambiar
                    </button>
                  </div>
                )}
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between items-baseline mb-6">
              <span className="label-sans">Total</span>
              <span className="font-mono font-black text-3xl">€{totalPrice.toFixed(2)}</span>
            </div>

            <Button
              variant="primary"
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full"
            >
              {isCheckingOut ? "Procesando..." : "Pagar ahora"}
              {!isCheckingOut && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>

            <div className="mt-6 space-y-2">
              <p className="label-mono">Garantia de satisfaccion 30 dias</p>
              <p className="label-mono">Envio seguro y rastreado</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
