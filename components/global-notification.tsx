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
import { Button } from "./ui/button";

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
    success: <CheckCircle2 className={cn(isLarge ? "h-10 w-10" : "h-6 w-6", "text-green-600 ")} />,
    error: <AlertCircle className={cn(isLarge ? "h-10 w-10" : "h-6 w-6", "text-red-600 ")} />,
    info: <Info className={cn(isLarge ? "h-10 w-10" : "h-6 w-6", "text-blue-600 ")} />,
    cart: <ShoppingCart className={cn(isLarge ? "h-10 w-10" : "h-6 w-6", "text-primary")} />,
  };

  const bgColors = {
    success: "border-green-200 ",
    error: "border-red-200 ",
    info: "border-blue-200 ",
    cart: "border-slate-200 ",
  };

  const tagColors = {
    success: "text-green-600 ",
    error: "text-red-600 ",
    info: "text-blue-600 ",
    cart: "text-primary",
  };

  return (
    <div className={cn("fixed bottom-6 right-6 z-[100] w-full transition-all duration-500 ease-out", isLarge ? "max-w-2xl" : "max-w-sm", isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-12 opacity-0 scale-95 pointer-events-none")}>
      <div className={cn("relative overflow-hidden rounded-[2.5rem] bg-white/90 border backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] ",
        isLarge ? "p-lg" : "p-lg",
        bgColors[type] || bgColors.info
      )}>
        <div className={cn("flex", isLarge ? "gap-8" : "gap-4")}>
          <div className="relative shrink-0">
            {type === 'cart' && data?.cover_url ? (
              <div className={cn("rounded-xl overflow-hidden shadow-md ring-1 ring-black/5", isLarge ? "w-24 h-32" : "w-16 h-20")}>
                <img src={data.cover_url} alt={data.title} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className={cn("rounded-2xl flex items-center justify-center", isLarge ? "w-20 h-20" : "w-12 h-12", type === 'success' ? "bg-green-100 " : type === 'error' ? "bg-red-100 " : type === 'info' ? "bg-blue-100 " : "bg-primary/10")}>
                {icons[type] || icons.info}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-sm">
              <h4 className={cn("font-black uppercase tracking-widest", isLarge ? "text-sm" : "text-[10px]", tagColors[type] || tagColors.info)}>
                {title}
              </h4>
              <Button
                onClick={closeNotification}
                variant="ghost"
              >
                <X />
              </Button>
            </div>
            <h3 className={cn("font-black text-slate-900 leading-tight mb-sm", isLarge ? "text-3xl" : "text-base")}>
              {type === 'cart' ? data?.title : (activeNotification.title === 'Cupón aplicado' ? `¡Código ${data?.code || ''}!` : message)}
            </h3>
            <p className={cn(" font-medium", isLarge ? "text-lg mb-lg" : "text-sm mb-md")}>
              {type === 'cart'
                ? (data?.quantity === 1 ? 'Nuevo ejemplar añadido' : `Ahora tienes ${data?.quantity} unidades`)
                : (activeNotification.title === 'Cupón aplicado' ? message : '')}
              {type !== 'cart' && activeNotification.title !== 'Cupón aplicado' && message}
            </p>

            {(type === 'cart' || (type === 'success' && activeNotification.title === 'Cupón aplicado')) && (
              <div className="flex gap-3">
                <Link href="/cart" className="flex-1" onClick={closeNotification}>
                  <Button variant="ghost">
                    Ver Carrito
                  </Button>
                </Link>
              </div>
            )}

            {data?.showAuth && (
              <div className={cn("flex", isLarge ? "gap-4" : "gap-2")}>
                <Link href="/login" className="flex-1" onClick={closeNotification}>
                  <Button variant="primary">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link href="/register" className="flex-1" onClick={closeNotification}>
                  <Button variant="primary">
                    Crear Cuenta
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
