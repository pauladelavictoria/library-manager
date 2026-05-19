"use client";

import { useCart } from "@/lib/cart-context";
import { Book } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Tag } from "lucide-react";

interface PriceDisplayProps {
  book: Book;
}

import PriceTag from "@/components/ui/price-tag";
import AddToCartButton from "./add-to-cart-button";

interface PriceDisplayProps {
  book: Book;
}

export default function PriceDisplay({ book }: PriceDisplayProps) {
  const { appliedPromo } = useCart();
  const originalPrice = book.selling_price || 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-10 bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-inner">
        <div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-black mb-2 opacity-60">
            {appliedPromo ? "Precio con Descuento" : "Precio Especial"}
          </p>
          <PriceTag price={originalPrice} size="xl" />
          <div className="mt-6">
            <AddToCartButton book={book} variant="default" text />
          </div>
        </div>
        <div className="h-16 w-px bg-slate-200 dark:bg-white/10" />
        <div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-black mb-2 opacity-60">Disponibilidad</p>
          <div className="flex items-center gap-2">
            <div className={cn(
              "h-3 w-3 rounded-full animate-pulse shadow-[0_0_10px_rgba(var(--color),0.5)]",
              book.stock_quantity > 0 ? "bg-green-500 [--color:34,197,94]" : "bg-destructive [--color:239,68,68]"
            )} />
            <p className={cn(
              "text-xl font-black tracking-tight",
              book.stock_quantity > 0 ? "text-green-500/80" : "text-destructive/80"
            )}>
              {book.stock_quantity > 0 ? "Disponible" : "Agotado"}
            </p>
          </div>
          <p className="text-xs text-muted-foreground mt-1 font-medium">{book.stock_quantity} unidades restantes</p>
        </div>

      </div>

      {appliedPromo && (
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-2xl animate-in fade-in slide-in-from-top-2">
          <Tag className="h-4 w-4" />
          <span className="text-sm font-bold uppercase tracking-wider">
            Código {appliedPromo.code} aplicado (-{appliedPromo.discount_amount}%)
          </span>
        </div>
      )}
    </div>
  );
}
