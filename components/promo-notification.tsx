"use client";

import { useCart } from "@/hooks/use-cart";
import { useEffect, useState } from "react";
import { Tag, X, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";

export default function PromoNotification() {
  const { user } = useAuth();
  const { lastPromoStatus, setLastPromoStatus } = useCart();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (lastPromoStatus) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => setLastPromoStatus(null), 500);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [lastPromoStatus, setLastPromoStatus]);

  if (!lastPromoStatus && !isVisible || !user) return null;

  const isSuccess = lastPromoStatus?.success;

  return (
    <div className={cn(
      "fixed bottom-6 right-6 z-[100] w-full max-w-sm transition-all duration-500 ease-out",
      isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-12 opacity-0 scale-95 pointer-events-none"
    )}>
      <div className={cn(
        "relative overflow-hidden rounded-[2rem] border p-6 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]",
        isSuccess 
          ? "bg-white/90 dark:bg-slate-900/90 border-green-200 dark:border-green-800" 
          : "bg-white/90 dark:bg-slate-900/90 border-red-200 dark:border-red-800"
      )}>
        <div className="flex gap-4">
          <div className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0",
            isSuccess 
              ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400" 
              : "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
          )}>
            {isSuccess ? <CheckCircle2 className="h-6 w-6" /> : <AlertCircle className="h-6 w-6" />}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-1">
              <h4 className={cn(
                "text-xs font-black uppercase tracking-widest",
                isSuccess ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              )}>
                {isSuccess ? "Cupón aplicado" : "Error en cupón"}
              </h4>
              <button
                onClick={() => setIsVisible(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">
              {isSuccess ? `¡Código ${lastPromoStatus.code}!` : "Código no válido"}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-4">
              {lastPromoStatus?.message}
            </p>

            {isSuccess && (
              <div className="flex gap-3">
                <Link href="/cart" className="flex-1" onClick={() => setIsVisible(false)}>
                  <button className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-black shadow-lg shadow-primary/30 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2">
                    Ver Carrito
                    <Tag className="h-3 w-3" />
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
