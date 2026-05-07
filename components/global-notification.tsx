"use client";

import { useEffect, useState } from "react";
import {
  ShoppingCart,
  X,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Info,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useNotification } from "@/lib/notification-context";

export default function GlobalNotification() {
  const { notification, closeNotification } = useNotification();
  const [isVisible, setIsVisible] = useState(false);
  const [activeNotification, setActiveNotification] = useState(notification);

  useEffect(() => {
    if (notification) {
      setActiveNotification(notification);
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [notification]);

  if (!activeNotification) return null;

  const { type, title, message, data, size = "default" } = activeNotification;
  const isLarge = size === "large";

  const icons = {
    success: <CheckCircle2 className={cn(isLarge ? "h-10 w-10" : "h-6 w-6", "text-green-600 dark:text-green-400")} />,
    error: <AlertCircle className={cn(isLarge ? "h-10 w-10" : "h-6 w-6", "text-red-600 dark:text-red-400")} />,
    info: <Info className={cn(isLarge ? "h-10 w-10" : "h-6 w-6", "text-blue-600 dark:text-blue-400")} />,
    cart: <ShoppingCart className={cn(isLarge ? "h-10 w-10" : "h-6 w-6", "text-primary")} />,
  };

  const bgColors = {
    success: "border-green-200 dark:border-green-800",
    error: "border-red-200 dark:border-red-800",
    info: "border-blue-200 dark:border-blue-800",
    cart: "border-slate-200 dark:border-white/10",
  };

  const tagColors = {
    success: "text-green-600 dark:text-green-400",
    error: "text-red-600 dark:text-red-400",
    info: "text-blue-600 dark:text-blue-400",
    cart: "text-primary",
  };

  return (
    <div className={cn(
      "fixed bottom-6 right-6 z-[100] w-full transition-all duration-500 ease-out",
      isLarge ? "max-w-2xl" : "max-w-sm",
      isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-12 opacity-0 scale-95 pointer-events-none"
    )}>
      <div className={cn(
        "relative overflow-hidden rounded-[2.5rem] bg-white/90 dark:bg-slate-900/90 border backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]",
        isLarge ? "p-10" : "p-6",
        bgColors[type] || bgColors.info
      )}>
        <div className={cn("flex", isLarge ? "gap-8" : "gap-4")}>
          <div className="relative shrink-0">
            {type === 'cart' && data?.cover_url ? (
              <div className={cn("rounded-xl overflow-hidden shadow-md ring-1 ring-black/5", isLarge ? "w-24 h-32" : "w-16 h-20")}>
                <img src={data.cover_url} alt={data.title} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className={cn(
                "rounded-2xl flex items-center justify-center",
                isLarge ? "w-20 h-20" : "w-12 h-12",
                type === 'success' ? "bg-green-100 dark:bg-green-900/30" :
                  type === 'error' ? "bg-red-100 dark:bg-red-900/30" :
                    type === 'info' ? "bg-blue-100 dark:bg-blue-900/30" :
                      "bg-primary/10"
              )}>
                {icons[type] || icons.info}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <h4 className={cn(
                "font-black uppercase tracking-widest",
                isLarge ? "text-sm" : "text-[10px]",
                tagColors[type] || tagColors.info
              )}>
                {title}
              </h4>
              <button
                onClick={closeNotification}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1"
              >
                <X className={isLarge ? "h-6 w-6" : "h-4 w-4"} />
              </button>
            </div>
            <h3 className={cn(
              "font-black text-slate-900 dark:text-white leading-tight mb-2",
              isLarge ? "text-3xl" : "text-base"
            )}>
              {type === 'cart' ? data?.title : (activeNotification.title === 'Cupón aplicado' ? `¡Código ${data?.code || ''}!` : message)}
            </h3>
            <p className={cn(
              "text-slate-500 dark:text-slate-400 font-medium",
              isLarge ? "text-lg mb-8" : "text-sm mb-4"
            )}>
              {type === 'cart'
                ? (data?.quantity === 1 ? 'Nuevo ejemplar añadido' : `Ahora tienes ${data?.quantity} unidades`)
                : (activeNotification.title === 'Cupón aplicado' ? message : '')}
              {type !== 'cart' && activeNotification.title !== 'Cupón aplicado' && message}
            </p>

            {(type === 'cart' || (type === 'success' && activeNotification.title === 'Cupón aplicado')) && (
              <div className="flex gap-3">
                <Link href="/cart" className="flex-1" onClick={closeNotification}>
                  <button className={cn(
                    "w-full rounded-2xl bg-primary text-primary-foreground font-black shadow-lg shadow-primary/30 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2",
                    isLarge ? "py-4 text-base" : "py-2.5 text-xs"
                  )}>
                    Ver Carrito
                    <ArrowRight className={isLarge ? "h-5 w-5" : "h-3 w-3"} />
                  </button>
                </Link>
              </div>
            )}

            {data?.showAuth && (
              <div className={cn("flex", isLarge ? "gap-4" : "gap-2")}>
                <Link href="/login" className="flex-1" onClick={closeNotification}>
                  <button className={cn(
                    "w-full rounded-2xl bg-primary text-primary-foreground font-black shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]",
                    isLarge ? "py-4 text-base" : "py-2 text-xs"
                  )}>
                    Iniciar Sesión
                  </button>
                </Link>
                <Link href="/register" className="flex-1" onClick={closeNotification}>
                  <button className={cn(
                    "w-full rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-black border border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]",
                    isLarge ? "py-4 text-base" : "py-2 text-xs"
                  )}>
                    Crear Cuenta
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
