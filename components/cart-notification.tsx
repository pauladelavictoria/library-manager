"use client";

import { useCart } from "@/hooks/use-cart";
import { useEffect, useState } from "react";
import { ShoppingCart, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";

export default function CartNotification() {
  const { user } = useAuth();
  const { lastAddedItem, setLastAddedItem } = useCart();
  const [isVisible, setIsVisible] = useState(true);

  if (!user) {
    return null;
  }

  useEffect(() => {
    if (lastAddedItem) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => setLastAddedItem(null), 500);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [lastAddedItem, setLastAddedItem]);

  if (!lastAddedItem && !isVisible) return null;

  return (
    <div className={cn(
      "fixed bottom-6 right-6 z-[100] w-full max-w-sm transition-all duration-500 ease-out",
      isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-12 opacity-0 scale-95 pointer-events-none"
    )}>
      <div className="relative overflow-hidden rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 backdrop-blur-xl">

        <div className="flex gap-4">
          <div className="relative">
            <div className="w-16 h-20 rounded-xl overflow-hidden shadow-md ring-1 ring-black/5">
              {lastAddedItem?.cover_url ? (
                <img src={lastAddedItem.cover_url} alt={lastAddedItem.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <ShoppingCart className="h-6 w-6 text-slate-400" />
                </div>
              )}
            </div>

          </div>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-1">
              <h4 className="text-sm font-black uppercase tracking-widest text-primary">Añadido al carrito</h4>
              <button
                onClick={() => setIsVisible(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white line-clamp-1 mb-1">{lastAddedItem?.title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-4">
              {lastAddedItem?.quantity === 1 ? 'Nuevo ejemplar añadido' : `Ahora tienes ${lastAddedItem?.quantity} unidades`}
            </p>

            <div className="flex gap-3">
              <Link href="/cart" className="flex-1" onClick={() => setIsVisible(false)}>
                <button className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-black shadow-lg shadow-primary/30 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2">
                  Ver Carrito
                  <ArrowRight className="h-3 w-3" />
                </button>
              </Link>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
