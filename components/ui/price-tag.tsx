"use client";

import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";

interface PriceTagProps {
  price: number;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showDiscountBadge?: boolean;
}

export default function PriceTag({
  price,
  className,
  size = "md",
  showDiscountBadge = false
}: PriceTagProps) {
  const { appliedPromo } = useCart();

  const discountAmount = appliedPromo ? (price * (appliedPromo.discount_amount / 100)) : 0;
  const finalPrice = Math.max(0, price - discountAmount);
  const hasDiscount = discountAmount > 0;

  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-2xl",
    xl: "text-6xl"
  };

  const originalSizeClasses = {
    sm: "text-[10px]",
    md: "text-xs",
    lg: "text-sm",
    xl: "text-xl"
  };

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex items-baseline gap-2">
        <div className="flex flex-col">
          {hasDiscount && (
            <span className={cn("font-bold text-muted-foreground line-through opacity-50 leading-none mb-1", originalSizeClasses[size])}>
              €{price.toFixed(2)}
            </span>
          )}
          <span className={cn("font-black tracking-tight leading-none", hasDiscount ? "text-primary" : "text-foreground", size === "xl" && "bg-clip-text bg-gradient-to-r from-primary to-primary/60", sizeClasses[size])}>
            €{finalPrice.toFixed(2)}
          </span>
        </div>

        {hasDiscount && showDiscountBadge && (
          <span className="ml-2 px-2 py-0.5 bg-emerald-500/10 text-emerald-600 text-[10px] font-black uppercase tracking-wider rounded-md border border-emerald-500/20">
            -{appliedPromo?.discount_amount}%
          </span>
        )}
      </div>
    </div>
  );
}
