"use client";

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Book } from "@/lib/types";

interface AddToCartButtonProps {
  book: Book;
}

export default function AddToCartButton({ book }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  return (
    <Button 
      size="lg" 
      className="rounded-2xl px-10 h-16 text-lg font-black shadow-xl shadow-primary/30 transition-all hover:scale-[1.02] active:scale-[0.98] flex-1 group"
      onClick={() => addToCart(book)}
      disabled={book.stock_quantity <= 0}
    >
      <ShoppingCart className="mr-3 h-6 w-6 transition-transform group-hover:rotate-12" />
      Añadir al carrito
    </Button>
  );
}
