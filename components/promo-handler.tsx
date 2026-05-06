"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/hooks/use-cart";

export function PromoHandler() {
  const searchParams = useSearchParams();
  const { applyPromo, appliedPromo } = useCart();

  useEffect(() => {
    const promoCode = searchParams.get("promo");
    
    if (promoCode && (!appliedPromo || appliedPromo.code !== promoCode)) {
      applyPromo(promoCode);
    }
  }, [searchParams, applyPromo, appliedPromo]);

  return null;
}
