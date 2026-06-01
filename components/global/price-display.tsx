"use client";

import { useCart } from "@/lib/cart-context";
import { Book } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Tag } from "lucide-react";
import PriceTag from "@/components/ui/price-tag";
import AddToCartButton from "./add-to-cart-button";

interface PriceDisplayProps {
  book: Book;
}

export default function PriceDisplay({ book }: PriceDisplayProps) {
  const { appliedPromo } = useCart();
  const originalPrice = book.selling_price || 0;

  return (
    <div className="flex flex-col gap-0">
      <div className="p-6">
        <p className="label-mono mb-2">
          {appliedPromo ? "Precio con descuento" : "Precio"}
        </p>
        <PriceTag price={originalPrice} size="xl" />
      </div>

      <div className="p-6 border-soft-t flex items-center gap-3">
        <span
          className={cn(
            "w-2 h-2 rounded-full flex-shrink-0",
            book.stock_quantity > 0 ? "bg-foreground" : "bg-destructive"
          )}
        />
        <div>
          <p className={cn("label-sans", book.stock_quantity > 0 ? "" : "text-destructive")}>
            {book.stock_quantity > 0 ? "Disponible" : "Agotado"}
          </p>
          <p className="label-mono mt-0.5">{book.stock_quantity} unidades</p>
        </div>
      </div>

      <div className="p-6 border-soft-t">
        <AddToCartButton book={book} variant="primary" text />
      </div>

      {appliedPromo && (
        <div className="p-4 border-soft-t flex items-center gap-2 bg-card">
          <Tag className="h-3 w-3 text-foreground/50" />
          <span className="label-mono">
            Codigo {appliedPromo.code} aplicado (-{appliedPromo.discount_amount}%)
          </span>
        </div>
      )}
    </div>
  );
}
