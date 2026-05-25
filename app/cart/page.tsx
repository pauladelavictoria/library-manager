"use client";

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, XCircle, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useNotification } from "@/lib/notification-context";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
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

    if (result.success) {
      setPromoInput("");
    }
  };

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const result = await checkout(cart, totalPrice, appliedPromo?.code);
      if (result.success) {
        notify({ type: 'success', title: 'Pedido realizado', message: '¡Tu pedido se ha procesado con éxito!' });
        clearCart();
        router.push("/dashboard");
      } else {
        notify({ type: 'error', title: 'Error en pedido', message: result.error || "No pudimos procesar tu pedido." });
      }
    } catch (error) {
      notify({ type: 'error', title: 'Error inesperado', message: 'Ocurrió un error al procesar el pago.' });
    } finally {
      setIsCheckingOut(false);
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.selling_price || 0) * item.quantity, 0);
  const discount = appliedPromo ? (subtotal * (appliedPromo.discount_amount / 100)) : 0;

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-md py-xl text-center">
        <div className="bg-primary/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-lg animate-pulse">
          <ShoppingBag className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-4xl font-black mb-md tracking-tight">Tu carrito está vacío</h1>
        <p className="text-lg text-muted-foreground mb-lg leading-relaxed">
          Parece que aún no has añadido ningún libro a tu colección. ¡Explora nuestro catálogo y descubre tu próxima aventura literaria!
        </p>
        <Link href="/books">
          <Button variant="primary">
            Explorar Catálogo
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-md py-lg lg:py-xl">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-end gap-4 mb-lg">
          <h1 className="text-5xl font-black tracking-tighter">Tu Carrito</h1>
          <span className="text-2xl text-muted-foreground font-medium mb-xs">({totalItems} {totalItems === 1 ? 'libro' : 'libros'})</span>
        </header>

        <div className="grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-8">
            {cart.map((item) => (
              <div
                key={item.id}
                className="group flex flex-col sm:flex-row gap-6 p-lg rounded-3xl card-background transition-all duration-300 hover:shadow-xl hover:bg-white/60"
              >
                <div className="w-full sm:w-32 h-48 flex-shrink-0 overflow-hidden rounded-2xl  shadow-inner">
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

                <div className="flex flex-col flex-1 py-xs">
                  <div className="flex justify-between items-start gap-4 mb-sm">
                    <div>
                      <h3 className="font-bold text-xl leading-tight line-clamp-2 group-hover:text-primary transition-colors">{item.title}</h3>
                      <p className="text-muted-foreground font-medium">{item.authors?.[0] || "Autor desconocido"}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-sm.5 rounded-full  text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
                      aria-label="Eliminar producto"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="flex items-end justify-between gap-4">
                    <div className="flex justify-center items-center gap-4 p-sm bg-background/80 backdrop-blur-sm rounded-full border border-slate-200 shadow-sm">
                      <Button
                        variant="ghost"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus />
                      </Button>
                      <span className="text-lg font-bold w-6 text-center">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus />
                      </Button>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-muted-foreground mb-xs font-medium uppercase tracking-wider">Subtotal</p>
                      <PriceTag
                        price={(item.selling_price || 0) * item.quantity}
                        size="lg"
                        className="items-end"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-md">
              <Link href="/books">
                <Button variant="primary">
                  <ArrowRight className="mr-sm h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-1" />
                  Continuar Comprando
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 overflow-hidden rounded-[2.5rem] card-background p-xs">
              <div className=" rounded-[2.2rem] p-lg">
                <h2 className="text-2xl font-bold mb-lg flex items-center gap-2">
                  <ShoppingBag className="h-6 w-6 text-primary" />
                  Resumen
                </h2>

                <div className="space-y-5 mb-lg">
                  <div className="flex justify-between text-lg">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-bold">€{subtotal.toFixed(2)}</span>
                  </div>

                  {appliedPromo && (
                    <div className="flex justify-between text-lg text-green-600 font-medium">
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4" />
                        <span>{appliedPromo.code}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>-€{discount.toFixed(2)}</span>

                      </div>
                    </div>
                  )}

                  <div className="flex justify-between text-lg">
                    <span className="text-muted-foreground">Envío</span>
                    <span className="text-primary font-bold bg-primary/10 px-sm py-0.5 rounded-full text-sm">Gratis</span>
                  </div>

                  <div className="flex justify-between text-lg">
                    <span className="text-muted-foreground">Impuestos</span>
                    <span className="font-medium">Incluidos</span>
                  </div>

                  <div className="pt-md pb-sm">
                    {!appliedPromo ? (
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Input
                            placeholder="Código promo"
                            value={promoInput}
                            onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                            onKeyDown={(e) => e.key === 'Enter' && handleApplyPromo()}
                          />
                        </div>
                        <Button
                          variant="ghost"
                          className="rounded-xl px-md"
                          onClick={handleApplyPromo}
                          disabled={isApplying || !promoInput.trim()}
                        >
                          {isApplying ? "..." : "Aplicar"}
                        </Button>
                      </div>
                    ) : (
                      <div className="bg-green-50 border border-green-200 rounded-2xl p-sm flex items-center justify-between">
                        <div className="flex items-center gap-2 text-green-700 text-sm font-bold">
                          <CheckCircle2 className="h-4 w-4" />
                          Código aplicado
                        </div>
                        <Button
                          variant="ghost"
                          className="h-8 text-xs hover:bg-green-100"
                          onClick={removePromo}
                        >
                          Cambiar
                        </Button>
                      </div>
                    )}
                  </div>

                  <Separator className="my-sm" />

                  <div className="flex justify-between items-baseline pt-sm">
                    <span className="text-xl font-bold">Total</span>
                    <div className="text-right">
                      <span className="text-4xl font-black text-primary">
                        €{totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  variant="primary"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? "Procesando..." : "Pagar Ahora"}
                  {!isCheckingOut && <ArrowRight className="ml-sm h-6 w-6 transition-transform group-hover:translate-x-1" />}
                </Button>

                <div className="mt-lg flex flex-col gap-4">
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
