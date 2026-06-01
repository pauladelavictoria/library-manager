"use client";

import { useEffect, useState } from "react";
import { ShoppingCart, X, CheckCircle2, AlertCircle, Info } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useNotification } from "@/lib/notification-context";

const TYPE_ICONS = {
  success: CheckCircle2,
  error:   AlertCircle,
  info:    Info,
  cart:    ShoppingCart,
};

const TYPE_LABEL = {
  success: "Confirmado",
  error:   "Error",
  info:    "Aviso",
  cart:    "Carrito",
};

export default function GlobalNotification() {
  const { notification, closeNotification } = useNotification();
  const [isVisible, setIsVisible] = useState(false);
  const [active, setActive] = useState(notification);

  useEffect(() => {
    if (notification) { setActive(notification); setIsVisible(true); }
    else setIsVisible(false);
  }, [notification]);

  if (!active) return null;

  const { type, title, message, data } = active;
  const Icon = TYPE_ICONS[type] ?? Info;

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-[100] w-full max-w-sm transition-all duration-400 ease-out",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0 pointer-events-none"
      )}
    >
      <div className="bg-background border-2 border-foreground shadow-none">
        {/* Top strip */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-foreground/15 bg-card">
          <div className="flex items-center gap-2">
            <Icon className="h-3.5 w-3.5 text-foreground/40" />
            <span className="label-sans">{TYPE_LABEL[type]}</span>
          </div>
          <button onClick={closeNotification} className="btn-ghost py-0 text-foreground/40 hover:text-foreground">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 flex gap-4">
          {type === "cart" && data?.cover_url ? (
            <div className="w-12 h-16 overflow-hidden shrink-0">
              <img src={data.cover_url} alt={data.title} className="w-full h-full object-cover" />
            </div>
          ) : null}

          <div className="flex-1 min-w-0">
            <p className="display-md mb-1">
              {type === "cart" ? data?.title : title}
            </p>
            <p className="label-mono text-foreground/50">
              {type === "cart"
                ? data?.quantity === 1 ? "Añadido al carrito" : `${data?.quantity} unidades`
                : message}
            </p>

            {/* Actions */}
            {type === "cart" && (
              <div className="mt-4">
                <Link href="/cart" onClick={closeNotification} className="btn-outline inline-flex">
                  Ver carrito
                </Link>
              </div>
            )}

            {data?.showAuth && (
              <div className="flex gap-3 mt-4">
                <Link href="/login" onClick={closeNotification} className="btn-primary">
                  Iniciar sesion
                </Link>
                <Link href="/register" onClick={closeNotification} className="btn-outline">
                  Crear cuenta
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
